function showSection(sectionId) {
    $('.content-section').hide();
    $('#' + sectionId).show();
}

var currentServicios = [];
var currentPage = 1;
var rowsPerPage = 10;

function displayServicios(page) {
    var startIndex = (page - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    var paginatedItems = currentServicios.slice(startIndex, endIndex);
    $('#servicioList').empty();
    paginatedItems.forEach(function (servicio) {
        $('#servicioList').append('<tr><td>' + servicio.ServiciosID + '</td><td>' + servicio.Descripcion + '</td><td>' + servicio.MontoServicio + '</td><td class="text-center">' +
            '<div class="d-flex justify-content-center">' +
            '<button class="btn btn-primary btn-sm mr-2" onclick="loadUpdateForm(\'' + servicio.ServiciosID + '\')">Editar</button> ' +
            '<button class="btn btn-warning btn-sm mr-2" onclick="loadViewForm(\'' + servicio.ServiciosID + '\')">Detalles</button> ' +
            '<button class="btn btn-danger btn-sm" onclick="loadDeleteForm(\'' + servicio.ServiciosID + '\')">Eliminar</button>' +
            '</div>' +
            '</td></tr>');
    });

    setupPagination(currentServicios.length, page);
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

    var startButton = '<li class="' + startClass + '"><a class="page-link" href="#" onclick="displayServicios(1)">Inicio</a></li>';
    var endButton = '<li class="' + endClass + '"><a class="page-link" href="#" onclick="displayServicios(' + totalPages + ')">Final</a></li>';

    $('#pagination').append('<ul class="pagination justify-content-center">');

    $('#pagination ul').append(startButton);

    for (var i = startPage; i <= endPage; i++) {
        var liClass = currentPage == i ? 'page-item active' : 'page-item';
        var pageItem = '<li class="' + liClass + '"><a class="page-link" href="#" onclick="displayServicios(' + i + ')">' + i + '</a></li>';
        $('#pagination ul').append(pageItem);
    }

    $('#pagination ul').append(endButton);
}

function getServicios() {
    $.ajax({
        url: 'http://localhost:8083/api/servicios/Listar/',
        type: 'GET',
        success: function (data) {
            currentServicios = data;
            if (data.length) {
                displayServicios(1);
                $('#errorMessage').hide();
            } else {
                $('#errorMessage').show().text('No hay servicios');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener servicios:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al obtener servicios: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function getServicioById() {
    var id = $('#searchId').val().trim();
    if (!id) {
        getServicios();
        return;
    }
    $.get('http://localhost:8083/api/servicios/Listar/' + id, function (data) {
        currentServicios = [data];
        displayServicios(1);
        $('#searchId').val("");
    }).fail(function () {
        $('#errorMessage').show().text('Servicio no encontrado.');
    });
}

function addServicio() {
    var descripcion = $('#addDescripcion').val().trim();
    var montoServicio = $('#addMontoServicio').val().trim();

    if (!descripcion || !montoServicio) {
        alert('Por favor, complete todos los campos');
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/servicios/Insertar",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            Descripcion: descripcion,
            MontoServicio: montoServicio
        }),
        success: function (data) {
            var alertSuccess = $('<div class="alert alert-success position-fixed bottom-0 start-0" role="alert">¡Servicio creado exitosamente!</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);

            getServicios();
            $('#addDescripcion').val('');
            $('#addMontoServicio').val('');
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al agregar servicio:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al agregar servicio: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function viewServicio(id) {
    const servicio = currentServicios.find(s => s.ServiciosID === id);
    if (servicio) {
        alert('Código de Servicio: ' + servicio.ServiciosID + '\nDescripción: ' + servicio.Descripcion + '\nMonto: ' + servicio.MontoServicio + '\nServicio Activo: ' + (usuario.ServicioActivo ? 'Sí' : 'No'));
    }
}

function updateServicio() {
    var id = $('#updateId').val().trim();
    var descripcion = $('#updateDescripcion').val().trim();
    var montoServicio = $('#updateMonto').val().trim();

    if (!id || !descripcion || !montoServicio) {
        alert('Por favor, complete todos los campos');
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/servicios/Listar/" + id, // Endpoint para obtener un usuario por su ID
        method: "GET",
        success: function (servicio) {
            // Obtener el valor actual de ServicioActivo
            var servicioActivo = servicio.ServicioActivo;

            // Enviar la solicitud PUT con el valor actual de ServicioActivo
            $.ajax({
                url: "http://localhost:8083/api/servicios/Actualizar",
                method: "PUT",
                data: JSON.stringify({
                    ServiciosID: id,
                    Descripcion: descripcion,
                    MontoServicio: montoServicio,
                    ServicioActivo: servicioActivo // Usar el valor actual de ServicioActivo
                }),
                contentType: "application/json",
                success: function (result) {
                    var alertSuccess = $('<div class="alert alert-info position-fixed bottom-0 start-0" role="alert">¡Servicio actualizado exitosamente!</div>');
                    $('body').append(alertSuccess);
                    alertSuccess.fadeIn();

                    setTimeout(function() {
                        alertSuccess.fadeOut(function() {
                            alertSuccess.remove();
                        });
                    }, 3000);
                    getServicios();
                    showSection('list');
                },
                error: function (xhr, status, error) {
                    console.error('Error al actualizar servicio:', xhr.status, xhr.statusText, xhr.responseText, status, error);
                    alert('Error al actualizar servicio: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
                }
            });
       
        },
        error: function (xhr, status, error) {
            console.error('Error al actualizar servicio:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al actualizar servicio: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function deleteServicio() {
    var id = $('#deleteId').val().trim();
    if (!id) {
        alert('Por favor, proporcione un ID');
        return;
    }
    $.ajax({
        url: 'http://localhost:8083/api/servicios/Eliminar/' + id,
        method: 'DELETE',
        contentType: "application/json",
        success: function (result) {
            var alertSuccess = $('<div class="alert alert-warning position-fixed bottom-0 start-0" role="alert">El servicio ha sido eliminado.</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);
            getServicios();
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar servicio:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al eliminar servicio: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function loadUpdateForm(id) {
    const servicio = currentServicios.find(s => s.ServiciosID == id);
    if (servicio) {
        $('#updateId').val(servicio.ServiciosID);
        $('#updateDescripcion').val(servicio.Descripcion);
        $('#updateMonto').val(servicio.MontoServicio);
        
        showSection('update');
    }
}

function loadViewForm(id) {
    const servicio = currentServicios.find(s => s.ServiciosID == id);
    if (servicio) {
        $('#viewId').val(servicio.ServiciosID);
        $('#viewDescripcion').val(servicio.Descripcion);
        $('#viewMonto').val(servicio.MontoServicio);
        
        showSection('view');
    }
}

function loadDeleteForm(id) {
    const servicio = currentServicios.find(s => s.ServiciosID == id);
    if (servicio) {
        $('#deleteId').val(servicio.ServiciosID);
        $('#deleteDescripcion').val(servicio.Descripcion);
        $('#deleteMonto').val(servicio.MontoServicio);
        showSection('delete');
    }
}

$(document).ready(function() {
    getServicios();
});
