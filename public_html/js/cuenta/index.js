var typeA;
var idEdit;
var idEliminar;
$(function() {
    $.getJSON("http://localhost:3000/accountType", function(data) {
        $.each(data, function(index, item) {
            $("#inputTCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
        });
        typeA = data[0]._id;
        $("#new_inputTipo").val(data[0].name);
        $("#edit_inputTipo").val(data[0].name);
        listadoTabla();
    });

});
$("#inputTCuenta").change(function() {
    typeA = $("#inputTCuenta").val();
    $.getJSON("http://localhost:3000/accountType/" + typeA, function(data) {
        $("#new_inputTipo").val(data.name);
        $("#edit_inputTipo").val(data.name);
    });
    listadoTabla();
});
$("#form_new_cuenta_cancel").click(function() {
    $("#new_nombre").removeClass("has-success");
    $("#new_nombre").removeClass("has-error");
    $("#new_saldo").removeClass("has-success");
    $("#new_saldo").removeClass("has-error");
    $("#new_inputNombre").val("");
    $("#new_inputSaldo").val("");
    $("#form_new_cuenta").modal('hide');

});
$("#form_edit_cuenta_cancel").click(function() {
    $("#edit_nombre").removeClass("has-success");
    $("#edit_nombre").removeClass("has-error");
    $("#edit_saldo").removeClass("has-success");
    $("#edit_saldo").removeClass("has-error");
    $("#edit_inputNombre").val("");
    $("#edit_inputSaldo").val("");
    $("#form_edit_cuenta").modal('hide');

});
$("#new_inputSaldo").change(function() {
    var valor = $("#new_inputSaldo").val();
    valor = parseFloat(valor).toFixed(2);
    $("#new_inputSaldo").val(valor);
});
$("#edit_inputSaldo").change(function() {
    var valor = $("#edit_inputSaldo").val();
    valor = parseFloat(valor).toFixed(2);
    $("#edit_inputSaldo").val(valor);
});
$("#form_new_cuenta").submit(function(e) {

    e.preventDefault();
    var error = 0;

    $("#new_nombre").removeClass("has-success");
    $("#new_nombre").removeClass("has-error");
    $("#new_saldo").removeClass("has-success");
    $("#new_saldo").removeClass("has-error");

    var nombre = $("#new_inputNombre").val();

    if (nombre != "") {
        $("#new_nombre").addClass("has-success");
    } else {
        $("#new_nombre").addClass("has-error");
        error = error + 1;
    }

    var saldo = $("#new_inputSaldo").val();

    if (saldo != "") {
        $("#new_saldo").addClass("has-success");
    } else {
        $("#new_saldo").addClass("has-error");
        error = error + 1;
    }
    $.gritter.removeAll();

    if (error < 1) {
        var request = $.ajax({
            url: "http://localhost:3000/account?name=" + nombre + "&balance=" + saldo + "&type=" + typeA,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        });

        request.done(function(msg) {
            $("#new_nombre").removeClass("has-success");
            $("#new_saldo").removeClass("has-success");
            $("#new_inputNombre").val("");
            $("#new_inputSaldo").val("");

            $("table tbody").append('<tr id="fila_' + msg._id + '"><td>' + msg.name + '</td><td>' + msg.balance.toFixed(2) + '</td><td> <a href="../transaccion/index_transaccion.html?TC=' + typeA + '&Cu=' + msg._id + '" class="btn btn-success">Ver Transacciones</a> <button onclick="editar(\'' + msg._id + '\')" class="btn btn-primary">Editar</button> <button onclick="eliminar(\'' + msg._id + '\')" class="btn btn-danger delete">Eliminar</button></td></tr>');
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Cuenta Guardada',
                // (string | mandatory) the text inside the notification
                text: 'La cuenta ha sido guardada correctamente.',
                // (string | optional) the image to display on the left
                image: '../icon/ok.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#form_new_cuenta").modal('hide');
        });

        request.fail(function(jqXHR, textStatsoundsus) {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Ha ocurrido un error',
                // (string | mandatory) the text inside the notification
                text: 'Hay un problema actualmente al guardar la cuenta, por favor intente otra vez.',
                // (string | optional) the image to display on the left
                image: '../icon/error.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#form_new_cuenta").modal('hide');
        });
    }

    return false;
});
$("#form_edit_cuenta").submit(function(e) {

    e.preventDefault();
    var error = 0;

    $("#edit_nombre").removeClass("has-success");
    $("#edit_nombre").removeClass("has-error");
    $("#edit_saldo").removeClass("has-success");
    $("#edit_saldo").removeClass("has-error");

    var nombre = $("#edit_inputNombre").val();

    if (nombre != "") {
        $("#edit_nombre").addClass("has-success");
    } else {
        $("#edit_nombre").addClass("has-error");
        error = error + 1;
    }

    var saldo = $("#edit_inputSaldo").val();

    if (saldo != "") {
        $("#edit_saldo").addClass("has-success");
    } else {
        $("#edit_saldo").addClass("has-error");
        error = error + 1;
    }
    $.gritter.removeAll();

    if (error < 1) {
        var request = $.ajax({
            url: "http://localhost:3000/account/" + idEdit + "/?name=" + nombre + "&balance=" + saldo,
            type: "PUT",
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        });

        request.done(function(msg) {
            $("#edit_nombre").removeClass("has-success");
            $("#nedit_saldo").removeClass("has-success");
            $("#edit_inputNombre").val("");
            $("#edit_inputSaldo").val("");
            $("#fila_" + idEdit).remove();
            $("table tbody").append('<tr id="fila_' + msg._id + '"><td>' + msg.name + '</td><td>' + msg.balance.toFixed(2) + '</td><td> <a href="../transaccion/index_transaccion.html?TC=' + typeA + '&Cu=' + msg._id + '" class="btn btn-success">Ver Transacciones</a> <button onclick="editar(\'' + msg._id + '\')" class="btn btn-primary">Editar</button> <button onclick="eliminar(\'' + msg._id + '\')" class="btn btn-danger delete">Eliminar</button></td></tr>');
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Cuenta Guardada',
                // (string | mandatory) the text inside the notification
                text: 'La cuenta ha sido guardada correctamente.',
                // (string | optional) the image to display on the left
                image: '../icon/ok.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#form_edit_cuenta").modal('hide');
        });

        request.fail(function(jqXHR, textStatsoundsus) {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Ha ocurrido un error',
                // (string | mandatory) the text inside the notification
                text: 'Hay un problema actualmente al guardar la cuenta, por favor intente otra vez.',
                // (string | optional) the image to display on the left
                image: '../icon/error.png',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                time: 1000,
                // (string | optional) the class name you want to apply directly to the notification for custom styling
                class_name: 'my_notify'
            });
            $("#edit_cuenta").modal('hide');
        });
    }

    return false;
});
function listadoTabla() {
    $("table tbody").empty();
    $.getJSON("http://localhost:3000/account/listType/" + typeA, function(data) {
        $.each(data, function(index, item) {
            $("table").append('<tr id="fila_' + item._id + '"><td>' + item.name + '</td><td>' + item.balance.toFixed(2) + '</td><td> <a href="../transaccion/index_transaccion.html?TC=' + typeA + '&Cu=' + item._id + '" class="btn btn-success">Ver Transacciones</a> <button onclick="editar(\'' + item._id + '\')" class="btn btn-primary">Editar</button> <button onclick="eliminar(\'' + item._id + '\')" class="btn btn-danger delete">Eliminar</button></td></tr>');
        });

    });
}
function editar(id) {
    $.getJSON("http://localhost:3000/account/" + id, function(data) {
        $("#edit_inputNombre").val(data.name);
        $("#edit_inputSaldo").val(data.balance.toFixed(2));
        $("#form_edit_cuenta").modal('show');
    });
    idEdit = id;
}
function eliminar(id) {
    idEliminar = id;
    $("#form_eliminar").modal('show');
}
function confirmarEliminar() {
    var id = idEliminar;
    $.gritter.removeAll();
    var request = $.ajax({
        url: "http://localhost:3000/account/" + id,
        type: "DELETE"
    });
    request.done(function(msg) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Eliminación exitosa',
            // (string | mandatory) the text inside the notification
            text: 'La cuenta ha sido eliminada con exito.',
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
            text: 'Hay un problema actualmente al eliminar la cuenta, por favor intente otra vez.',
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