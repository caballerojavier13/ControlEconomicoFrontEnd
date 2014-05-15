$(function() {

    $.getJSON("http://localhost:3000/accountType", function(data) {
        $.each(data, function(index, item) {
            $("#inputTCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
        });
    });
});
$("#form_trans_1_submit").click(function() {
    $("#form_trans_1").modal('hide');
    $("#form_trans_2").modal('show');
});
$("#form_trans_2_back").click(function() {
    $("#form_trans_2").modal('hide');
    $("#form_trans_1").modal('show');
});
$("#form_trans_1_submit").click(function() {
    $("#inputCuenta").empty();
    $.getJSON("http://localhost:3000/account/listType/" + $("#inputTCuenta").val(), function(data) {
        $.each(data, function(index, item) {
            $("#inputCuenta").append('<option value="' + item._id + '" >' + item.name + '</option>');
        });
    });
    $.getJSON("http://localhost:3000/transactionType/listType/" + $("#inputTCuenta").val(), function(data) {
        $("#inputTipoTransaccion").empty();
        $.each(data, function(index, item) {
            $("#inputTipoTransaccion").append('<option value="' + item._id + '" >' + item.name + '</option>');
        });
    });
});
$("#form_trans_2_submit").click(function() {
    
   var url = "./transaccion/index_transaccion.html?TC=" +  $("#inputTCuenta").val() + "&Cu=" +  $("#inputCuenta").val();
   window.location = url;
});