$(function() {
    id = GetURLParameter('id');
    $.getJSON("http://localhost:3000/place/" + id, function(data) {
        $("#inputNombre").val(data.name);
        $("#inputDescripcion").val(data.description);
    });
});

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
        $("#Nombre").addClass("has-error");
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
            url: "http://localhost:3000/place/"+ id+"?name="+nombre+"&description="+descripcion,
            type: "PUT",
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