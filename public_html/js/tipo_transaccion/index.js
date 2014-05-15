var typeA;
var idEdit;

$(function() {

    $.getJSON("http://localhost:3000/accountType", function(data) {
        $.each(data, function(index, item) {
            $("#new_inputTipoCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
            $("#edit_inputTipoCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
            $("#inputTCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
        });
    });
    $.getJSON("http://localhost:3000/transactionType", function(data) {
        $.each(data, function(index, item) {
            agregarElementoTabla(item);
        });
    });
});
$("#inputTCuenta").change(function() {
    typeA = $("#inputTCuenta").val();
    if (typeA < 0) {
        $("table tbody").empty();
        $.getJSON("http://localhost:3000/transactionType", function(data) {
            $.each(data, function(index, item) {
                agregarElementoTabla(item);
            });
            
        });
    } else {
        $("table tbody").empty();
        $.getJSON("http://localhost:3000/transactionType/listType/" + typeA, function(data) {
            $.each(data, function(index, item) {
                agregarElementoTabla(item);
            });
            $("#new_inputTipoCuenta").val(typeA);
        });
    }
});
$("#form_new_tipo_transaccion_cancel").click(function() {
    $("#form_new_tipo_transaccion").modal('hide');
    resetFormulario();
});
$("#form_edit_tipo_transaccion_cancel").click(function() {
    $("#form_edit_tipo_transaccion").modal('hide');
    resetFormulario()
});
$("#form_new_tipo_transaccion").submit(function(e) {

    e.preventDefault();
    var error = 0;

    $("#new_nombre").removeClass("has-success");
    $("#new_nombre").removeClass("has-error");

    var nombre = $("#new_inputNombre").val();

    if (nombre != "") {
        $("#new_nombre").addClass("has-success");
    } else {
        $("#new_nombre").addClass("has-error");
        error = error + 1;
    }
    var tipo = $("#new_inputTipo").val();
    var tipoCuenta = $("#new_inputTipoCuenta").val();
    var si_Lugar = $("#new_inputSiLugar").is(':checked');
    var si_Concepto = $("#new_inputSiConcepto").is(':checked');
    var afecta_efectivo = $("#new_inputAfectaEfectivo").is(':checked');
    $.gritter.removeAll();

    if (error < 1) {
        var request = $.ajax({
            url: "http://localhost:3000/transactionType?name=" + nombre + "&sign=" + tipo + "&allowPlace=" + si_Lugar + "&allowConcept=" + si_Concepto + "&id_AccountType=" + tipoCuenta,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        });

        request.done(function(msg) {
            resetFormulario();
            agregarElementoTabla(msg);
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Tipo de transacción Guardado',
                // (string | mandatory) the text inside the notification
                text: 'El tipo de transacción ha sido guardado correctamente.',
                // (string | optional) the image to display on the left
                image: '../icon/ok.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#form_new_tipo_transaccion").modal('hide');
        });

        request.fail(function(jqXHR, textStatsoundsus) {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Ha ocurrido un error',
                // (string | mandatory) the text inside the notification
                text: 'Hay un problema actualmente al guardar el tipo de transacción, por favor intente otra vez.',
                // (string | optional) the image to display on the left
                image: '../icon/error.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#form_tipo_transaccion").modal('hide');
        });
    }

    return false;
});
$("#form_edit_tipo_transaccion").submit(function(e) {

    e.preventDefault();
    var error = 0;

    $("#edit_nombre").removeClass("has-success");
    $("#edit_nombre").removeClass("has-error");

    var nombre = $("#edit_inputNombre").val();

    if (nombre != "") {
        $("#edit_nombre").addClass("has-success");
    } else {
        $("#edit_nombre").addClass("has-error");
        error = error + 1;
    }
    var tipo = $("#edit_inputTipo").val();
    var tipoCuenta = $("#edit_inputTipoCuenta").val();
    var si_Lugar = $("#edit_inputSiLugar").is(':checked');
    var si_Concepto = $("#edit_inputSiConcepto").is(':checked');
    var afecta_efectivo = $("#edit_inputAfectaEfectivo").is(':checked');

    $.gritter.removeAll();

    if (error < 1) {
        var request = $.ajax({
            url: "http://localhost:3000/transactionType/" + idEdit + "/?name=" + nombre + "&sign=" + tipo + "&allowPlace=" + si_Lugar + "&allowConcept=" + si_Concepto + "&id_AccountType=" + tipoCuenta,
            type: "PUT",
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        });

        request.done(function(msg) {
            $("#edit_nombre").removeClass("has-success");
            $("#nedit_saldo").removeClass("has-success");
            resetFormulario();
            $("#fila_" + idEdit).remove();
            agregarElementoTabla(msg);
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Tipo de Transacción Guardado',
                // (string | mandatory) the text inside the notification
                text: 'El tipo de transacción ha sido guardado correctamente.',
                // (string | optional) the image to display on the left
                image: '../icon/ok.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#form_edit_tipo_transaccion").modal('hide');
        });

        request.fail(function(jqXHR, textStatsoundsus) {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Ha ocurrido un error',
                // (string | mandatory) the text inside the notification
                text: 'Hay un problema actualmente al guardar el tipo de transacción, por favor intente otra vez.',
                // (string | optional) the image to display on the left
                image: '../icon/error.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#edit_tipo_transaccion").modal('hide');
        });
    }

    return false;
});

function editar(id) {
    $.getJSON("http://localhost:3000/transactionType/" + id, function(data) {
        $("#edit_inputNombre").val(data.name);
        $("#edit_inputSiLugar").prop('checked', data.allowPlace);
        $("#edit_inputSiConcepto").prop('checked', data.allowConcept);
        $('#edit_inputTipoCuenta').val(data.id_AccountType._id);
        $('#edit_inputTipo').val(data.sign);
        $("#form_edit_tipo_transaccion").modal('show');
    });
    idEdit = id;
}
function eliminar(id) {
    var request = $.ajax({
        url: "http://localhost:3000/transactionType/" + id,
        type: "DELETE"
    });
    request.done(function(msg) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Eliminación exitosa',
            // (string | mandatory) the text inside the notification
            text: 'El tipo de transaccion ha sido eliminado con exito.',
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
            text: 'Hay un problema actualmente al eliminar el tipo de transacción, por favor intente otra vez.',
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
function resetFormulario() {
    $("#new_nombre").removeClass("has-success");
    $("#new_nombre").removeClass("has-error");
    $("#new_inputNombre").val("");
    $("#new_inputSiLugar").prop('checked', false);
    $("#new_inputSiConcepto").prop('checked', false);
    $("#new_inputAfectaEfectivo").prop('checked', false);
    $("#new_inputTipoCuenta").val(typeA);
    $('#new_inputTipo option:eq(0)').prop('selected', true);


    $("#edit_nombre").removeClass("has-success");
    $("#edit_nombre").removeClass("has-error");
    $("#edit_inputNombre").val("");
}
function agregarElementoTabla(elemento) {
    var tipo = "Haber";
    if (elemento.sign < 0) {
        tipo = "Debe";
    }
    var si_lugar = "No";
    if (elemento.allowPlace) {
        si_lugar = "Si"
    }
    var si_concepto = "No";
    if (elemento.allowConcept) {
        si_concepto = "Si"
    }
    $("table").append('<tr id="fila_' + elemento._id + '"><td>' + elemento.name + '</td><td>' + elemento.id_AccountType.name + '</td><td>' + tipo + '</td><td>' + si_lugar + '</td><td>' + si_concepto + '</td><td><button onclick="editar(\'' + elemento._id + '\')" class="btn btn-primary">Editar</button> <button onclick="eliminar(\'' + elemento._id + '\')" class="btn btn-danger delete">Eliminar</button></td></tr>');
}