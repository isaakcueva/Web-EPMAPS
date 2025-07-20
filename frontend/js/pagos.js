function showSection(sectionId) {
    $('.content-section').hide();
    $('#' + sectionId).show();
}

var currentPagos = [];
var currentPage = 1;
var rowsPerPage = 10;

function displayPagos(page) {
    var startIndex = (page - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    var paginatedItems = currentPagos.slice(startIndex, endIndex);
    $('#pagosList').empty();
    paginatedItems.forEach(function (pago) {
        $('#pagosList').append(
            '<tr><td>' + pago.PagosID + '</td><td>' + pago.CedulaIdentidad + '</td><td>' + pago.ServiciosID + '</td><td>' + pago.FechaEmision + '</td><td>' + pago.MontoTotal + '</td><td>' + pago.Estado + '</td><td>' + pago.cod_pago + '</td><td class="text-center">' + 
            '<div class="d-flex justify-content-center">' + 
            '<button class="btn btn-primary btn-sm mr-2" onclick="loadUpdateForm(' + pago.PagosID + ')">Editar</button> ' + 
            '<button class="btn btn-warning btn-sm mr-2" onclick="loadViewForm(' + pago.PagosID + ')">Detalles</button> ' + 
            '<button class="btn btn-danger btn-sm" onclick="loadDeleteForm(' + pago.PagosID + ')">Eliminar</button>' +
            '</div>' +
            '</td></tr>'
        );
    });

    setupPagination(currentPagos.length, page);
}

function setupPagination(totalItems, currentPage) {
    var totalPages = Math.ceil(totalItems / rowsPerPage);
    var maxPagesToShow = 10;

    $('#pagination').empty();

    var startPage, endPage;
    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        var halfPagesToShow = Math.floor(maxPagesToShow / 2);
        if (currentPage <= halfPagesToShow) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + halfPagesToShow >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfPagesToShow;
            endPage = currentPage + halfPagesToShow;
        }
    }

    var startClass = currentPage === 1 ? 'page-item disabled' : 'page-item';
    var endClass = currentPage === totalPages ? 'page-item disabled' : 'page-item';

    var startButton = '<li class="' + startClass + '"><a class="page-link" href="#" onclick="displayPagos(1)">Inicio</a></li>';
    var endButton = '<li class="' + endClass + '"><a class="page-link" href="#" onclick="displayPagos(' + totalPages + ')">Final</a></li>';

    $('#pagination').append('<ul class="pagination justify-content-center">');

    $('#pagination ul').append(startButton);

    for (var i = startPage; i <= endPage; i++) {
        var liClass = currentPage == i ? 'page-item active' : 'page-item';
        var pageItem = '<li class="' + liClass + '"><a class="page-link" href="#" onclick="displayPagos(' + i + ')">' + i + '</a></li>';
        $('#pagination ul').append(pageItem);
    }

    $('#pagination ul').append(endButton);
}

function getPagos() {
    $.ajax({
        url: 'http://localhost:8083/api/pagos/Listar/',
        type: 'GET',
        success: function (data) {
            currentPagos = data;
            if (data.length) {
                displayPagos(1);
                $('#errorMessage').hide();
            } else {
                $('#errorMessage').show().text('No hay pagos');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener pagos:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al obtener pagos: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function getPagoById() {
    var cedulaIdentidad = $('#searchId').val().trim();
    if (!cedulaIdentidad) {
        getPagos();
        return;
    }
    $.get('http://localhost:8083/api/pagos/ListarPorCedula/' + cedulaIdentidad, function (data) {
        if (Array.isArray(data)) {
            currentPagos = data;
        } else {
            currentPagos = [data];
        }
        displayPagos(1);
        $('#searchId').val("");
    }).fail(function () {
        $('#errorMessage').show().text('Pagos no encontrados.');
    });
}


function addPago() {
    var cedulaIdentidad = $('#addCedulaIdentidad').val().trim();
    var serviciosId = $('#addServiciosId').val().trim();
    var fechaEmision = $('#addFechaEmision').val().trim();
    var fechaVencimiento = $('#addFechaVencimiento').val().trim();
    var montoTotal = $('#addMontoTotal').val().trim();
    var estado = $('#addEstado').val().trim();
    var codPago = '';

    if (!cedulaIdentidad || !serviciosId || !fechaEmision || !fechaVencimiento || !montoTotal || !estado) {
        alert('Por favor, complete todos los campos');
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/pagos/Insertar",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            cedulaIdentidad: cedulaIdentidad,
            serviciosId: serviciosId,
            fechaEmision: fechaEmision,
            fechaVencimiento: fechaVencimiento,
            montoTotal: montoTotal,
            estado: estado,
            codPago: codPago
        }),
        success: function (data) {
            var alertSuccess = $('<div class="alert alert-success position-fixed bottom-0 start-0" role="alert">¡Pago creado exitosamente!</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);

            getPagos();
            $('#addCedulaIdentidad').val('');
            $('#addServiciosId').val('');
            $('#addFechaEmision').val('');
            $('#addFechaVencimiento').val('');
            $('#addMontoTotal').val('');
            $('#addEstado').val('');
            $('#addCodPago').val('');
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al agregar pago:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al agregar pago: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function viewPago(id) {
    const pago = currentPagos.find(p => p.idPago === id);
    if (pago) {
        alert('ID: ' + pago.idPago + '\nCedula Identidad: ' + pago.cedulaIdentidad + '\nServicios ID: ' + pago.serviciosId + '\nFecha Emision: ' + pago.fechaEmision + '\nMonto Total: ' + pago.montoTotal + '\nEstado: ' + pago.estado + '\nCodigo Pago: ' + pago.codPago);
    }
}

function updatePago() {
    var idPago = $('#updateId').val().trim();
    var cedulaIdentidad = $('#updateCedulaIdentidad').val().trim();
    var serviciosId = $('#updateServiciosId').val().trim();
    var fechaEmision = $('#updateFechaEmision').val().trim();
    var fechaVencimiento = $('#updateFechaVencimiento').val().trim();
    var montoTotal = $('#updateMontoTotal').val().trim();
    var estado = $('#updateEstado').val().trim();
   

    if (!idPago || !cedulaIdentidad || !serviciosId || !fechaEmision || !fechaVencimiento || !montoTotal || !estado) {
        alert('Por favor, complete todos los campos');
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/pagos/Listar/" + idPago, // Endpoint para obtener un usuario por su ID
        method: "GET",
        success: function (pago) {
            // Obtener el valor actual de PagoActivo
            var pagoActivo = pago.PagosActivos;
            var codPago = pago.cod_pago;

            // Enviar la solicitud PUT con el valor actual de PagoActivo
            $.ajax({
                url: "http://localhost:8083/api/pagos/Actualizar",
                method: "PUT",
                data: JSON.stringify({
                    PagosID: idPago,
                    CedulaIdentidad: cedulaIdentidad,
                    ServiciosID: serviciosId,
                    FechaEmision: fechaEmision,
                    FechaVencimiento: fechaVencimiento,
                    MontoTotal: montoTotal,
                    Estado: estado,
                    cod_pago: codPago,
                    PagosActivos: pagoActivo // Usar el valor actual de PagoActivo
                }),
                contentType: "application/json",
                success: function (result) {
                    var alertSuccess = $('<div class="alert alert-info position-fixed bottom-0 start-0" role="alert">¡Pago actualizado exitosamente!</div>');
                    $('body').append(alertSuccess);
                    alertSuccess.fadeIn();

                    setTimeout(function() {
                        alertSuccess.fadeOut(function() {
                            alertSuccess.remove();
                        });
                    }, 3000);
                    getPagos();
                    showSection('list');
                },
                error: function (xhr, status, error) {
                    console.error('Error al actualizar pago:', xhr.status, xhr.statusText, xhr.responseText, status, error);
                    alert('Error al actualizar pago: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
                }
            });
       
        }
    });
}

function deletePago() {
    var idPago = $('#deleteId').val().trim();
    if (!idPago) {
        alert('Por favor, proporcione un ID');
        return;
    }
    $.ajax({
        url: 'http://localhost:8083/api/pagos/Eliminar/' + idPago,
        method: 'DELETE',
        contentType: "application/json",
        success: function (result) {
            var alertSuccess = $('<div class="alert alert-warning position-fixed bottom-0 start-0" role="alert">El pago ha sido eliminado.</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);
            getPagos();
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar pago:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al eliminar pago: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function loadUpdateForm(id) {
    const pago = currentPagos.find(p => p.PagosID == id);
    if (pago) {
        $('#updateId').val(pago.PagosID);
        $('#updateCedulaIdentidad').val(pago.CedulaIdentidad);
        $('#updateServiciosId').val(pago.ServiciosID);
        $('#updateFechaEmision').val(pago.FechaEmision);
        $('#updateFechaVencimiento').val(pago.FechaVencimiento);
        $('#updateMontoTotal').val(pago.MontoTotal);
        $('#updateEstado').val(pago.Estado);
        $('#updateCodPago').val(pago.cod_pago);
        showSection('update');
    }
}

function loadViewForm(id) {
    const pago = currentPagos.find(p => p.PagosID == id);
    if (pago) {
        $('#viewId').val(pago.PagosID);
        $('#viewCedulaIdentidad').val(pago.CedulaIdentidad);
        $('#viewServiciosId').val(pago.ServiciosID);
        $('#viewFechaEmision').val(pago.FechaEmision);
        $('#viewFechaVencimiento').val(pago.FechaVencimiento);
        $('#viewMontoTotal').val(pago.MontoTotal);
        $('#viewEstado').val(pago.Estado);
        $('#viewCodPago').val(pago.cod_pago);
        showSection('view');
    }
}

function loadDeleteForm(id) {
    const pago = currentPagos.find(p => p.PagosID == id);
    if (pago) {
        $('#deleteId').val(pago.PagosID);
        $('#deleteCedulaIdentidad').val(pago.CedulaIdentidad);
        $('#deleteServiciosId').val(pago.ServiciosID);
        $('#deleteFechaEmision').val(pago.FechaEmision);
        $('#deleteFechaVencimiento').val(pago.FechaVencimiento);
        $('#deleteMontoTotal').val(pago.MontoTotal);
        $('#deleteEstado').val(pago.Estado);
        $('#deleteCodPago').val(pago.cod_pago);
        showSection('delete');
    }
}

$(document).ready(function() {
    getPagos();
});
