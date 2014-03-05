$(function() {
    $.getJSON("http://localhost:3000/tarjetadebito", function(data) {
        $.each(data, function(index, item) {
            var indice = index + 1;
            $("table").append("<tr id='fila_" + item.id + "'><td>" + indice + "</td><td>" + item.nombre + "</td><td>" + item.numero + "</td><td><a href='./movimiento_debito.html?id="+item.id+"' class='btn btn-primary'>Ver Movimientos</a> <a href='./edit_tarjeta_debito.html?id=" + item.id + "' class='btn btn-primary'>Editar</a> <button onclick='eliminar(\"" + item.id + "\")' class='btn btn-danger delete'>Eliminar</button></td></tr>");
        });
    });
});

function eliminar(id) {
    var request = $.ajax({
        url: "http://localhost:3000/tarjetadebito/"+id,
        type: "DELETE"
    });
    request.done(function(msg) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Eliminación exitosa',
            // (string | mandatory) the text inside the notification
            text: 'La tarjeta de debito ha sido eliminado con exito.',
            // (string | optional) the image to display on the left
            image: '../icon/ok.png',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out (milliseconds)
            time: 5000,
            // (string | optional) the class name you want to apply directly to the notification for custom styling
            class_name: 'my_notify'
        });
        $("#fila_"+id).hide();
        
    });
    request.fail(function(jqXHR, textStatsoundsus) {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Ha ocurrido un error',
            // (string | mandatory) the text inside the notification
            text: 'Hay un problema actualmente al eliminar la tarjeta de debito, por favor intente otra vez.',
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