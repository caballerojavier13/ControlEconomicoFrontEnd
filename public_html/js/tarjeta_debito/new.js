$("form").submit(function(e) {
    e.preventDefault();
    var error = 0;

    $("#nombre").removeClass("has-success");
    $("#nombre").removeClass("has-error");
    $("#numero").removeClass("has-success");
    $("#numero").removeClass("has-error");
    $("#saldo_inicial").removeClass("has-success");
    $("#saldo_inicial").removeClass("has-error");


    var nombre = $("#inputNombre").val();

    if (nombre != "") {
        $("#nombre").addClass("has-success");
    } else {
        $("#nombre").addClass("has-error");
        error = error + 1;
    }



    var numero = $("#inputNumero").val();

    if (numero != "") {
        if (validarNumero(numero)) {
            $("#numero").addClass("has-success");
        } else {
            $("#numero").addClass("has-error");
            error = error + 1;
        }
    } else {
        $("#numero").addClass("has-error");
        error = error + 1;
    }


    var saldoInicial = $("#inputSaldoInicial").val();

    if (saldoInicial != "") {
        $("#saldo_inicial").addClass("has-success");
        saldoInicial = parseFloat(saldoInicial);
    } else {
        $("#saldo_inicial").addClass("has-error");
        error = error + 1;
    }

    if (error < 1) {
        var request = $.ajax({
            url: "http://localhost:3000/tarjetadebito",
            type: "POST",
            data: {nombre: nombre, numero: numero, saldoInicial: saldoInicial},
            dataType: "json"
        });

        request.done(function(msg) {
            window.location.href = "./index_tarjeta_debito.html";
        });

        request.fail(function(jqXHR, textStatsoundsus) {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Ha ocurrido un error',
                // (string | mandatory) the text inside the notification
                text: 'Hay un problema actualmente al guardar la tarjeta de debito, por favor intente otra vez.',
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
function validarNumero(numero) {
    var filter = /^((67\d{2})|(4\d{3})|(5[1-5]\d{2})|(6011))(-?\s?\d{4}){3}|(3[4,7])\ d{2}-?\s?\d{6}-?\s?\d{5}$/;
    // utilizamos test para comprobar si el parametro valor cumple la regla
    if (filter.test(numero)) {
        return true;
    } else {
        return false;
    }
}