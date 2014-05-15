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
    $.gritter.removeAll();

    if (error < 1) {
        var request = $.ajax({
            url: "http://localhost:3000/place?name="+nombre+"&description="+descripcion,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8'
        });

        request.done(function(msg) {
            window.location.href = "./index_lugar.html";
        });

        request.fail(function(jqXHR, textStatsoundsus) {
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: 'Ha ocurrido un error',
                // (string | mandatory) the text inside the notification
                text: 'Hay un problema actualmente al guardar el lugar, por favor intente otra vez.',
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