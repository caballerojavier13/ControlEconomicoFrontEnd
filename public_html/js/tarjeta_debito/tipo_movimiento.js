var nuevo = true;
var id = true;
$("#form_movimiento_cancel").click(function(e) {
    e.preventDefault();
    $("#form_movimiento").modal('hide');
    $("#inputNombre").val("");
    $("#inputDescripcion").val("");
    return false;
});

$("#nuevo_movimiento").click(function() {
    nuevo = true;
    $("#nombre").removeClass("has-success");
    $("#nombre").removeClass("has-error");
    $("#descripcion").removeClass("has-success");
    $("#descripcion").removeClass("has-error");
});
function editar(id_edit) {
    $("#nombre").removeClass("has-success");
    $("#nombre").removeClass("has-error");
    $("#descripcion").removeClass("has-success");
    $("#descripcion").removeClass("has-error");
    nuevo = false;
    id = id_edit;
    $.getJSON("http://localhost:3000/tipomovimiento/" + id, function(data) {
        $("#inputNombre").val(data.nombre);
        $("#inputDescripcion").val(data.descripcion);
        $("#inputSigno option[value=" + data.signo + "]").attr("selected", true);
    });
    $("#form_movimiento").modal('show');

}

$("form").submit(function(e) {
    e.preventDefault();

    var error = 0;

    $("#nombre").removeClass("has-success");
    $("#nombre").removeClass("has-error");
    $("#descripcion").removeClass("has-success");
    $("#descripcion").removeClass("has-error");



    var nombre = $("#inputNombre").val();

    if (nombre != "") {
        $("#nombre").addClass("has-success");
    } else {
        $("#nombre").addClass("has-error");
        error = error + 1;
    }



    var descripcion = $("#inputDescripcion").val();

    if (descripcion != "") {
        $("#descripcion").addClass("has-success");
    } else {
        $("#descripcion").addClass("has-error");
        error = error + 1;
    }

    var signo = $("#inputSigno").val();

    if (error < 1) {
        if (nuevo) {
            var request = $.ajax({
                url: "http://localhost:3000/tipomovimiento",
                type: "POST",
                data: {nombre: nombre, descripcion: descripcion, signo: signo},
                dataType: "json"
            });
        } else {
            var request = $.ajax({
                url: "http://localhost:3000/tipomovimiento/" + id,
                type: "PUT",
                data: {nombre: nombre, descripcion: descripcion, signo: signo},
                dataType: "json"
            });
        }

        request.done(function(msg) {
            $("#form_movimiento").modal('hide');
            if (nuevo) {
                indice = indice + 1;
                var tipo;
                if (msg.signo > 0) {
                    tipo = "Haber";
                } else {
                    tipo = "Debe";
                }
                $("table").append("<tr id='fila_" + msg.id + "'><td>" + indice + "</td><td>" + msg.nombre + "</td><td>" + tipo + "</td><td><button class='btn btn-primary' onclick='editar(\"" + msg.id + "\")'>Editar</button> <button onclick='eliminar(\"" + msg.id + "\")' class='btn btn-danger delete'>Eliminar</button></td></tr>");
            } else {
                msg = msg[0];
                var index = $("#fila_"+id).find('td').eq(0).text();
                $("#fila_"+id).hide();
                var tipo;
                if (msg.signo > 0) {
                    tipo = "Haber";
                } else {
                    tipo = "Debe";
                }
                $("table").append("<tr id='fila_" + msg.id + "'><td>" + index + "</td><td>" + msg.nombre + "</td><td>" + tipo + "</td><td><button class='btn btn-primary' onclick='editar(\"" + msg.id + "\")'>Editar</button> <button onclick='eliminar(\"" + msg.id + "\")' class='btn btn-danger delete'>Eliminar</button></td></tr>");
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
            $("#inputNombre").val("");
            $("#inputDescripcion").val("");
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
    }

    return false;
});

$(function() {
    $.getJSON("http://localhost:3000/tipomovimiento", function(data) {
        $.each(data, function(index, item) {
            indice = index + 1;
            var tipo;
            if (item.signo > 0) {
                tipo = "Haber";
            } else {
                tipo = "Debe";
            }

            $("table").append("<tr id='fila_" + item.id + "'><td>" + indice + "</td><td>" + item.nombre + "</td><td>" + tipo + "</td><td><button class='btn btn-primary' onclick='editar(\"" + item.id + "\")'>Editar</button> <button onclick='eliminar(\"" + item.id + "\")' class='btn btn-danger delete'>Eliminar</button></td></tr>");
        });
    });
});

function eliminar(id) {
    var request = $.ajax({
        url: "http://localhost:3000/tipomovimiento/" + id,
        type: "DELETE"
    });
    request.done(function(msg) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Eliminación exitosa',
            // (string | mandatory) the text inside the notification
            text: 'El tipo de movimiento ha sido eliminado con exito.',
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
            text: 'Hay un problema actualmente al eliminar el tipo de movimiento, por favor intente otra vez.',
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