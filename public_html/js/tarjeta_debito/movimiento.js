var nuevo = true;
var id;
var TarjetaDebito;
var signo = 1;
var indice;
$(function() {
    $('#inputFecha').datetimepicker({
        pickTime: false,
        language: 'es',
        defaultDate: new Date()
    });
});
$("#inputImporte").change(function() {
    validarSigno();
});
$("#inputTipo").change(function() {
    $.getJSON("http://localhost:3000/tipomovimiento/" + ($(this).val()), function(data) {
        signo = data.signo;
        validarSigno();
    });

});
function validarSigno() {
    var importe = $("#inputImporte").val();
    if (importe > 0) {
        if (signo < 0) {
            $("#inputImporte").val(importe * signo);
        }
    } else {
        if (signo > 0) {
            $("#inputImporte").val(importe * (-1));
        }
    }
}
$("#form_movimiento_cancel").click(function(e) {
    e.preventDefault();
    $("#form_movimiento").modal('hide');
    $("#inputImporte").val("");
    return false;
});

$("#nuevo_movimiento").click(function() {
    nuevo = true;
});
function editar(id_edit) {
    nuevo = false;
    id = id_edit;
    $("#form_movimiento").modal('show');

}

$("form").submit(function(e) {
    e.preventDefault();

    var tipo = $("#inputTipo").val();

    var importe = $("#inputImporte").val();
    
    var dia = $("#inputFecha").val().substr(0, 2);

    var mes = $("#inputFecha").val().substr(3,2);

    var año = $("#inputFecha").val().substr(6,4);

    if (nuevo) {
        var request = $.ajax({
            url: "http://localhost:3000/movimientodebito",
            type: "POST",
            data: {dia: dia, mes: mes, año: año, importe: importe, tipo: tipo,tarjetadebito: TarjetaDebito},
            dataType: "json"
        });
    } else {
        var request = $.ajax({
            url: "http://localhost:3000/movimientodebito/" + id,
            type: "PUT",
            data: {dia: dia, mes: mes, año: año, importe: importe, tipo: tipo,tarjetadebito: TarjetaDebito},
            dataType: "json"
        });
    }

    request.done(function(msg) {
        $("#form_movimiento").modal('hide');
        if (nuevo) {
//            indice = indice + 1;

        } else {
            msg = msg[0];
            var index = $("#fila_" + id).find('td').eq(0).text();
//                $("#fila_" + id).hide();

        }

        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Guardado exitoso',
            // (string | mandatory) the text inside the notification
            text: 'El tipo de movimiento fue correctamente guardado.',
            // (string | optional) the image to display on the left
            image: '../icon/ok.png',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out (milliseconds)
            time: 10000,
            // (string | optional) the class name you want to apply directly to the notification for custom styling
            class_name: 'my_notify'
        });
        $("#inputImporte").val("");
    });

    request.fail(function(jqXHR, textStatsoundsus) {
        $("#form_movimiento").modal('hide');
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Ha ocurrido un error',
            // (string | mandatory) the text inside the notification
            text: 'Hay un problema actualmente al guardar el tipo de movimiento, por favor intente otra vez.',
            // (string | optional) the image to display on the left
            image: '../icon/error.png',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out (milliseconds)
            time: 10000,
            // (string | optional) the class name you want to apply directly to the notification for custom styling
            class_name: 'my_notify'
        });
    });

    return false;
});

$(function() {
    TarjetaDebito = GetURLParameter("id");
    $.getJSON("http://localhost:3000/tarjetadebito/" + TarjetaDebito, function(data) {
        $(".titulo").append(" " + data.nombre);
    });
    $.getJSON("http://localhost:3000/tipomovimiento", function(data) {
        signo = data[0].signo;
        $.each(data, function(index, item) {
            $("#inputTipo").append("<option value='" + item.id + "'>" + item.nombre + "</option>");
        });
    });

    $.getJSON("http://0.0.0.0:3000/tarjetadebito/" + TarjetaDebito + "/movimientos", function(data) {
        $.each(data, function(index, item) {
            indice = index + 1;
            $("table").append("<tr id='fila_" + item.id + "'><td>" + indice + "</td><td>" + item.importe + "</td><td>" + item.importe  + "</td><td><button class='btn btn-primary' onclick='editar(\"" + item.id + "\")'>Editar</button> <button onclick='eliminar(\"" + item.id + "\")' class='btn btn-danger delete'>Eliminar</button></td></tr>");
        });
    });
});

function eliminar(id) {
    var request = $.ajax({
        url: "http://localhost:3000/movimientodebito/" + id,
        type: "DELETE"
    });
    request.done(function(msg) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Eliminación exitosa',
            // (string | mandatory) the text inside the notification
            text: 'El movimiento ha sido eliminado con exito.',
            // (string | optional) the image to display on the left
            image: '../icon/ok.png',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out (milliseconds)
            time: 5000,
            // (string | optional) the class name you want to apply directly to the notification for custom styling
            class_name: 'my_notify'
        });
        $("#fila_" + id).hide();

    });
    request.fail(function(jqXHR, textStatsoundsus) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Ha ocurrido un error',
            // (string | mandatory) the text inside the notification
            text: 'Hay un problema actualmente al eliminar el movimiento, por favor intente otra vez.',
            // (string | optional) the image to display on the left
            image: '../icon/error.png',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out (milliseconds)
            time: 10000,
            // (string | optional) the class name you want to apply directly to the notification for custom styling
            class_name: 'my_notify'
        });
    });
}
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}