var typeA;
var account;
var idEdit;
var edit_importe;
$(function() {
    $.getJSON("http://localhost:3000/accountType", function(data) {
        $.each(data, function(index, item) {
            $("#inputTCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
        });
        $("#inputTCuenta").val(getUrlParameter("TC"));
        typeA = $("#inputTCuenta").val();
        $.getJSON("http://localhost:3000/account/listType/" + getUrlParameter("TC"), function(data) {
            $.each(data, function(index, item) {
                $("#inputCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
            });
            $("#inputCuenta").val(getUrlParameter("Cu"));
            $.getJSON("http://localhost:3000/account/" + getUrlParameter("Cu"), function(data) {
                $(".titulo").html("Transacciones de la cuenta: <br/> " + data.name);
                $("#inputSaldoCuenta").html("$ " + data.balance.toFixed(2));
                $("#new_inputSaldoAn").val(data.balance.toFixed(2));
                $("#edit_inputSaldoAn").val(data.balance.toFixed(2));
                $("#new_inputSaldoAc").val(data.balance.toFixed(2));
                $("#edit_inputSaldoAc").val(data.balance.toFixed(2));
            });
        });
        listadoTabla();
        $.getJSON("http://localhost:3000/transactionType/listType/" + getUrlParameter("TC"), function(data) {
            $.each(data, function(index, item) {
                $("#new_inputTipoTransaccion").append('<option value="' + item._id + '" >' + item.name + '</option>');
                $("#edit_inputTipoTransaccion").append('<option value="' + item._id + '" >' + item.name + '</option>');
            });
            if (data[0].allowConcept) {
                $("#new_concepto").show();
                $("#edit_concepto").show();
            } else {
                $("#new_concepto").hide();
                $("#edit_concepto").hide();
            }
            if (data[0].allowPlace) {
                $("#new_lugar").show();
                $("#edit_lugar").show();
            } else {
                $("#new_lugar").hide();
                $("#edit_lugar").hide();
            }
        });
    });
    $.getJSON("http://localhost:3000/place", function(data) {
        $.each(data, function(index, item) {
            $("#new_inputLugar").append("<option value='" + item._id + "'>" + item.name + "</option>");
            $("#edit_inputLugar").append("<option value='" + item._id + "'>" + item.name + "</option>");
        });
    });
    $('#new_inputFecha').datetimepicker({
        pickTime: false,
        language: 'es',
        defaultDate: new Date()
    });
    $('#edit_inputFecha').datetimepicker({
        pickTime: false,
        language: 'es',
        defaultDate: new Date()
    });
});
$("#inputTCuenta").change(function() {
    typeA = $("#inputTCuenta").val();
    $.getJSON("http://localhost:3000/account/listType/" + typeA, function(data) {
        $("#inputCuenta").empty();
        $.each(data, function(index, item) {
            $("#inputCuenta").append('<option value="' + item._id + '">' + item.name + '</option');
        });
        $('#inputCuenta option:eq(0)').prop('selected', true);
        $.getJSON("http://localhost:3000/account/" + $("#inputCuenta").val(), function(data) {
            $(".titulo").html("Transacciones de la cuenta: <br/> " + data.name);
            $("#inputSaldoCuenta").html("$ " + data.balance.toFixed(2));
            $("#new_inputSaldoAn").val(data.balance.toFixed(2));
            $("#new_inputSaldoAc").val(data.balance.toFixed(2));
            $("#edit_inputSaldoAn").val(data.balance.toFixed(2));
            $("#edit_inputSaldoAc").val(data.balance.toFixed(2));
        });
        listadoTabla($("#inputCuenta").val());
    });
    $.getJSON("http://localhost:3000/transactionType/listType/" + typeA, function(data) {
        $("#new_inputTipoTransaccion").empty();
        $("#edit_inputTipoTransaccion").empty();
        $.each(data, function(index, item) {
            $("#new_inputTipoTransaccion").append('<option value="' + item._id + '" >' + item.name + '</option>');
            $("#edit_inputTipoTransaccion").append('<option value="' + item._id + '" >' + item.name + '</option>');
        });
        if (data[0].allowConcept) {
            $("#new_concepto").show();
            $("#edit_concepto").show();
        } else {
            $("#new_concepto").hide();
            $("#edit_concepto").hide();
        }
        if (data[0].allowPlace) {
            $("#new_lugar").show();
            $("#edit_lugar").show();
        } else {
            $("#new_lugar").hide();
            $("#edit_lugar").hide();
        }
    });
});
$("#inputCuenta").change(function() {
    listadoTabla($("#inputCuenta").val());
    $.getJSON("http://localhost:3000/account/" + $("#inputCuenta").val(), function(data) {
        $(".titulo").html("Transacciones de la cuenta: <br/> " + data.name);
        $("#inputSaldoCuenta").html("$ " + data.balance.toFixed(2));
        $("#new_inputSaldoAn").val(data.balance.toFixed(2));
        $("#new_inputSaldoAc").val(data.balance.toFixed(2));
        $("#edit_inputSaldoAn").val(data.balance.toFixed(2));
        $("#edit_inputSaldoAc").val(data.balance.toFixed(2));
    });
});
$("#new_inputTipoTransaccion").change(function() {
    $.getJSON("http://localhost:3000/transactionType/" + $("#new_inputTipoTransaccion").val(), function(data) {

        if (data.allowConcept) {
            $("#new_concepto").show('blind', 1000);
        } else {
            $("#new_concepto").hide('blind', 1000);
        }
        if (data.allowPlace) {
            $("#new_lugar").show('blind', 1000);
        } else {
            $("#new_lugar").hide('blind', 1000);
        }
    });
});
$("#edit_inputTipoTransaccion").change(function() {

    $.getJSON("http://localhost:3000/transactionType/" + $("#edit_inputTipoTransaccion").val(), function(data) {
        if (data.allowConcept) {
            $("#edit_concepto").show('blind', 1000);
        } else {
            $("#edit_concepto").hide('blind', 1000);
        }
        if (data.allowPlace) {
            $("#edit_lugar").show('blind', 1000);
        } else {
            $("#edit_lugar").hide('blind', 1000);
        }
    });
});
$("#new_inputImporte").change(function() {
    $.getJSON("http://localhost:3000/transactionType/" + $("#new_inputTipoTransaccion").val(), function(data) {
        if ($("#new_inputImporte").val() < 0) {
            var valor = $("#new_inputImporte").val();
            valor = valor * (-1);
            valor = parseFloat(valor).toFixed(2);
            $("#new_inputImporte").val(valor);
            var importe = $("#new_inputSaldoAn").val();
            importe = parseFloat(importe) + parseFloat(data.sign * valor);
            $("#new_inputSaldoAc").val(importe.toFixed(2));
        } else {
            var valor = $("#new_inputImporte").val();
            valor = parseFloat(valor).toFixed(2);
            $("#new_inputImporte").val(valor);
            var importe = $("#new_inputSaldoAn").val();
            importe = parseFloat(importe) + parseFloat(data.sign * valor);
            $("#new_inputSaldoAc").val(importe.toFixed(2));
        }
    });
});
$("#edit_inputImporte").change(function() {
    $.getJSON("http://localhost:3000/transactionType/" + $("#edit_inputTipoTransaccion").val(), function(data) {
        if ($("#edit_inputImporte").val() < 0) {
            var valor = $("#edit_inputImporte").val();
            valor = valor * (-1);
            valor = parseFloat(valor).toFixed(2);
            $("#edit_inputImporte").val(valor);
            var importe = $("#edit_inputSaldoAn").val();
            importe = parseFloat(importe) + parseFloat(data.sign * valor) - parseFloat(edit_importe);
            $("#edit_inputSaldoAc").val(importe.toFixed(2));
        } else {
            var valor = $("#edit_inputImporte").val();
            valor = parseFloat(valor).toFixed(2);
            $("#edit_inputImporte").val(valor);
            var importe = $("#edit_inputSaldoAn").val();
            importe = parseFloat(importe) + parseFloat(data.sign * valor) - parseFloat(edit_importe);
            $("#edit_inputSaldoAc").val(importe.toFixed(2));
        }
    });
});
$("#new_form_trans_cancel").click(function() {
    resetFormulario();
});
$("#form_new_transaccion form").submit(function(e) {
    e.preventDefault();
    $("#new_concepto").removeClass("has-error");
    $("#new_concepto").removeClass("has-success");
    $("#new_importe").removeClass("has-error");
    $("#new_importe").removeClass("has-success");

    $.getJSON("http://localhost:3000/transactionType/" + $("#new_inputTipoTransaccion").val(), function(data) {
        var error = 0;
        var concepto = $("#new_inputConcepto").val();
        if (data.allowConcept) {
            if (concepto == "") {
                error = error + 1;
                $("#new_concepto").addClass("has-error");
            } else {
                $("#new_concepto").addClass("has-success");
            }
        }


        var cuenta = $("#inputCuenta").val();
        var importe = $("#new_inputImporte").val();
        if (importe > 0) {

            $("#new_importe").addClass("has-success");
        } else {
            error = error + 1;
            $("#new_importe").addClass("has-error");
        }

        var lugar = $("#new_inputLugar").val();
        var tipoTransaccion = $("#new_inputTipoTransaccion").val();
        var fecha = $("#new_inputFecha").val();
        var dia = fecha.substring(0, 2);
        var mes = fecha.substring(3, 5);
        var año = fecha.substring(6, 10);
        $.gritter.removeAll();
        if (error < 1) {
            var request = $.ajax({
                url: "http://localhost:3000/transaction?concept=" + concepto + "&id_Account=" + cuenta + "&amount=" + importe + "&id_TransactionType=" + tipoTransaccion + "&id_Place=" + lugar + "&day=" + dia + "&month=" + mes + "&year=" + año,
                type: "POST",
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function(msg) {
                saldoCuenta($("#new_inputSaldoAc").val());
                resetFormulario();
                agregaElementoTabla(msg);
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Transacción Guardada',
                    // (string | mandatory) the text inside the notification
                    text: 'La transacción ha sido guardada correctamente.',
                    // (string | optional) the image to display on the left
                    image: '../icon/ok.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: false,
                    // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                    time: 1000,
                    // (string | optional) the class name you want to apply directly to the notification for custom styling
                    class_name: 'my_notify'
                });
                $("#form_new_transaccion").modal('hide');
            });
            request.fail(function(jqXHR, textStatsoundsus) {
                saldoCuenta($("#new_inputSaldoAn").val());
                resetFormulario();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Ha ocurrido un error',
                    // (string | mandatory) the text inside the notification
                    text: 'Hay un problema actualmente al guardar la transacción, por favor intente otra vez.',
                    // (string | optional) the image to display on the left
                    image: '../icon/error.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: false,
                    // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                    time: 1000,
                    // (string | optional) the class name you want to apply directly to the notification for custom styling
                    class_name: 'my_notify'
                });
                $("#form_new_transaccion").modal('hide');
            });
        }

        return false;
    });
});
$("#form_edit_transaccion form").submit(function(e) {
    e.preventDefault();
    $("#edit_concepto").removeClass("has-error");
    $("#edit_concepto").removeClass("has-success");
    $("#edit_importe").removeClass("has-error");
    $("#edit_importe").removeClass("has-success");

    $.getJSON("http://localhost:3000/transactionType/" + $("#edit_inputTipoTransaccion").val(), function(data) {
        var error = 0;
        var concepto = $("#edit_inputConcepto").val();
        if (data.allowConcept) {
            if (concepto == "") {
                error = error + 1;
                $("#edit_concepto").addClass("has-error");
            } else {
                $("#edit_concepto").addClass("has-success");
            }
        }

        var cuenta = $("#inputCuenta").val();
        var importe = $("#edit_inputImporte").val();
        if (importe > 0) {
            $("#edit_importe").addClass("has-success");
        } else {
            error = error + 1;
            $("#edit_importe").addClass("has-error");
        }

        var lugar = $("#edit_inputLugar").val();
        var tipoTransaccion = $("#edit_inputTipoTransaccion").val();
        var fecha = $("#edit_inputFecha").val();
        var dia = fecha.substring(0, 2);
        var mes = fecha.substring(3, 5);
        var año = fecha.substring(6, 10);
        $.gritter.removeAll();
        if (error < 1) {
            var request = $.ajax({
                url: "http://localhost:3000/transaction/" + idEdit + "?concept=" + concepto + "&id_Account=" + cuenta + "&amount=" + importe + "&id_TransactionType=" + tipoTransaccion + "&id_Place=" + lugar + "&day=" + dia + "&month=" + mes + "&year=" + año,
                type: "PUT",
                dataType: "json",
                contentType: 'application/json; charset=utf-8'
            });
            request.done(function(msg) {
                //$("#edit_inputSaldoAn").val($("#edit_inputSaldoAc").val());
                //$("#inputSaldoCuenta").html("$ " + $("#edit_inputSaldoAc").val());
                resetFormulario();
                saldoCuenta($("#edit_inputSaldoAc").val());
                $("#fila_" + idEdit).remove();
                agregaElementoTabla(msg);
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Transacción Guardada',
                    // (string | mandatory) the text inside the notification
                    text: 'La transacción ha sido guardada correctamente.',
                    // (string | optional) the image to display on the left
                    image: '../icon/ok.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: false,
                    // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                    time: 1000,
                    // (string | optional) the class name you want to apply directly to the notification for custom styling
                    class_name: 'my_notify'
                });
                $("#form_edit_transaccion").modal('hide');
            });
            request.fail(function(jqXHR, textStatsoundsus) {
                saldoCuenta($("#edit_inputSaldoAn").val());
                resetFormulario();
                $.gritter.add({
                    // (string | mandatory) the heading of the notification
                    title: 'Ha ocurrido un error',
                    // (string | mandatory) the text inside the notification
                    text: 'Hay un problema actualmente al guardar la transacción, por favor intente otra vez.',
                    // (string | optional) the image to display on the left
                    image: '../icon/error.png',
                    // (bool | optional) if you want it to fade out on its own or just sit there
                    sticky: false,
                    // (int | optional) the time you want it to be alive for before fading out (milliseconds)
                    time: 1000,
                    // (string | optional) the class name you want to apply directly to the notification for custom styling
                    class_name: 'my_notify'
                });
                $("#form_edit_transaccion").modal('hide');
            });
        }

        return false;
    });
});
function listadoTabla(parametro) {
    if (parametro == null) {
        parametro = getUrlParameter("Cu");
    }
    $(".my_table-striped tbody").empty();
    $.getJSON("http://localhost:3000/transaction/listAccount/" + parametro, function(data) {
        $.each(data, function(index, item) {
            agregaElementoTabla(item);
        });
    });
}
function resetFormulario() {
    $("#new_concepto").removeClass("has-error");
    $("#new_concepto").removeClass("has-success");
    $("#new_importe").removeClass("has-error");
    $("#new_importe").removeClass("has-success");
    $("#new_inputConcepto").val("");
    $("#new_inputImporte").val("");
    $('#new_inputFecha').data("DateTimePicker").setDate(new Date());

    $("#edit_concepto").removeClass("has-error");
    $("#edit_concepto").removeClass("has-success");
    $("#edit_importe").removeClass("has-error");
    $("#edit_importe").removeClass("has-success");
    $("#edit_inputConcepto").val("");
    $("#edit_inputImporte").val("");
}
function getUrlParameter(key) {
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
}
function agregaElementoTabla(elemento) {
    var monto = elemento.amount * elemento.id_TransactionType.sign;
    monto = monto.toFixed(2);
    var mov = elemento.id_TransactionType.name;
    var fecha = "";
    if (elemento.id_My_Date.day < 10) {
        fecha = "0" + elemento.id_My_Date.day + "/";
    } else {
        fecha = elemento.id_My_Date.day + "/";
    }
    if (elemento.id_My_Date.month < 10) {
        fecha = fecha + "0" + elemento.id_My_Date.month + "/";
    } else {
        fecha = fecha + elemento.id_My_Date.month + "/";
    }
    fecha = fecha + elemento.id_My_Date.year;
    if (elemento.id_TransactionType.sign > 0) {
        $(".my_table-striped tbody").append('<tr id="fila_' + elemento._id + '"><td>' + mov + '</td><td class="text-success">$ ' + monto + '</td><td>' + fecha + '</td><td> <button onclick="ver(\'' + elemento._id + '\')" class="btn btn-success" >Ver Detalles</button> <button onclick="editar(\'' + elemento._id + '\')" class="btn btn-primary">Editar</button> <button onclick="eliminar(\'' + elemento._id + '\')" class="btn btn-danger">Eliminar</button> </td></tr>');
    } else {
        $(".my_table-striped tbody").append('<tr id="fila_' + elemento._id + '"><td>' + mov + '</td><td class="text-danger">$ ' + monto + '</td><td>' + fecha + '</td><td> <button onclick="ver(\'' + elemento._id + '\')" class="btn btn-success" >Ver Detalles</button> <button onclick="editar(\'' + elemento._id + '\')" class="btn btn-primary">Editar</button> <button onclick="eliminar(\'' + elemento._id + '\')" class="btn btn-danger">Eliminar</button> </td></tr>');
    }

}
function eliminar(id) {
    $.gritter.removeAll();
    var request = $.ajax({
        url: "http://localhost:3000/transaction/" + id,
        type: "DELETE"
    });
    request.done(function(msg) {
        $.getJSON("http://localhost:3000/account/" + $("#inputCuenta").val(), function(data) {
            $("#inputSaldoCuenta").html("$ " + data.balance.toFixed(2));
            $("#new_inputSaldoAn").val(data.balance.toFixed(2));
            $("#new_inputSaldoAc").val(data.balance.toFixed(2));
        });
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'Eliminación exitosa',
            // (string | mandatory) the text inside the notification
            text: 'La transacciòn ha sido eliminada con exito.',
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
            text: 'Hay un problema actualmente al eliminar la transacción, por favor intente otra vez.',
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
function editar(id) {
    idEdit = id;
    $.getJSON("http://localhost:3000/transaction/" + id, function(data) {

        if (data.id_TransactionType.allowConcept) {
            $("#edit_concepto").show();
            $("#edit_inputConcepto").val(data.concept);
        } else {
            $("#edit_concepto").hide();
        }
        if (data.id_TransactionType.allowPlace) {
            $("#edit_luegar").show();
            $("#edit_inputLugar").val(data.id_Place._id);
        } else {
            $("#edit_lugar").hide();
        }
        $("#edit_inputImporte").val(data.amount.toFixed(2));
        edit_importe = data.amount.toFixed(2) * data.id_TransactionType.sign;

        $("#edit_inputTipoTransaccion").val(data.id_TransactionType._id);
        $('#edit_inputFecha').data("DateTimePicker").setDate(new Date(data.id_My_Date.year, (data.id_My_Date.month - 1), data.id_My_Date.day));

        $("#form_edit_transaccion").modal('show');
    });

}
function ver(id) {
    $.getJSON("http://localhost:3000/transaction/" + id, function(data) {
        if (data.id_TransactionType.allowConcept) {
            $("#view_concepto").show();
            $("#view_inputConcepto").val(data.concept);
        } else {
            $("#view_concepto").hide();
        }
        $("#view_inputImporte").val(data.amount.toFixed(2));

        $("#view_inputTipoTransaccion").val(data.id_TransactionType.name);
        var fecha = "";
        if (data.id_My_Date.day < 10) {
            fecha = "0" + data.id_My_Date.day + "/";
        } else {
            fecha = data.id_My_Date.day + "/";
        }
        if (data.id_My_Date.month < 10) {
            fecha = fecha + "0" + data.id_My_Date.month + "/";
        } else {
            fecha = fecha + data.id_My_Date.month + "/";
        }
        fecha = fecha + data.id_My_Date.year;

        $("#view_inputFecha").val(fecha);
        if (data.id_TransactionType.allowPlace) {
            $("#view_lugar").show();
            $("#view_inputLugar").val(data.id_Place.name);
        } else {
            $("#view_lugar").hide();
        }

        $("#form_view_transaccion").modal('show');
    });

}
function saldoCuenta(monto) {
    monto = parseFloat(monto);
    $("#inputSaldoCuenta").html("$ " + monto.toFixed(2));
    $("#new_inputSaldoAn").val(monto.toFixed(2));
    $("#new_inputSaldoAc").val(monto.toFixed(2));
    $("#edit_inputSaldoAn").val(monto.toFixed(2));
    $("#edit_inputSaldoAc").val(monto.toFixed(2));
}