function showSection(sectionId) {
    $('.content-section').hide();
    $('#' + sectionId).show();
}

var currentNotificaciones = [];
var currentPage = 1;
var rowsPerPage = 10;

function displayUsuarios(page) {
    var startIndex = (page - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    var paginatedItems = currentNotificaciones.slice(startIndex, endIndex);
    $('#notificacionList').empty();
    paginatedItems.forEach(function (notificacion) {
        $('#notificacionList').append('<tr><td>' + notificacion.NotificacionID + '</td><td>' + notificacion.CedulaIdentidad + '</td><td>' + notificacion.Descripcion + '</td><td>' + notificacion.FechaRegistro + '</td><td>' + notificacion.EstadoNotificacion + '</td><td class="text-center">' + // Agrega la clase text-center al contenedor de los botones
            '<div class="d-flex justify-content-center">' + // Agrega la clase d-flex y justify-content-center
            '<button class="btn btn-primary btn-sm mr-2" onclick="loadUpdateForm(\'' + notificacion.NotificacionID + '\')">Editar</button> ' + // Agrega mr-2 para el margen
            '<button class="btn btn-warning btn-sm mr-2" onclick="loadViewForm(\'' + notificacion.NotificacionID + '\')">Detalles</button> ' + // Agrega mr-2 para el margen
            '<button class="btn btn-danger btn-sm" onclick="loadDeleteForm(\'' + notificacion.NotificacionID + '\')">Eliminar</button>' +
            '</div>' +
            '</td></tr>');
    });

    setupPagination(currentNotificaciones.length, page);
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

    var startButton = '<li class="' + startClass + '"><a class="page-link" href="#" onclick="displayUsuarios(1)">Inicio</a></li>';
    var endButton = '<li class="' + endClass + '"><a class="page-link" href="#" onclick="displayUsuarios(' + totalPages + ')">Final</a></li>';

    $('#pagination').append('<ul class="pagination justify-content-center">');

    $('#pagination ul').append(startButton);

    for (var i = startPage; i <= endPage; i++) {
        var liClass = currentPage == i ? 'page-item active' : 'page-item';
        var pageItem = '<li class="' + liClass + '"><a class="page-link" href="#" onclick="displayUsuarios(' + i + ')">' + i + '</a></li>';
        $('#pagination ul').append(pageItem);
    }

    $('#pagination ul').append(endButton);
}

function getNotificacion() {
    $.ajax({
        url: 'http://localhost:8083/api/notificaciones/Listar/',
        type: 'GET',
        success: function (data) {
            currentNotificaciones = data;
            if (data.length) {
                displayUsuarios(1);
                $('#errorMessage').hide();
            } else {
                $('#errorMessage').show().text('No hay usuarios');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener usuarios:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al obtener usuarios: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function getUsuarioById() {
    var id = $('#searchId').val().trim();
    if (!id) {
        getNotificacion();
        return;
    }
    $.get('http://localhost:8083/api/notificaciones/Listar/' + id, function (data) {
        currentNotificaciones = [data];
        displayUsuarios(1);
        $('#searchId').val("");
    }).fail(function () {
        $('#errorMessage').show().text('Usuario no encontrado.');
    });
}

function addNotificacion() {
    var id = ''; // ID se establece como null
    var cedula= $('#addCedula').val().trim();
    var descripcion = $('#addDescripcion').val().trim();
    var fechaRegistro = $('#addFechaRegistro').val().trim();
    var estadoNotificacion = $('#addEstado').val().trim();
    var comentariosResolucion = ''; // Comentarios de resolución se establecen como null
    var notificacionActivo = true; // Notificación activa se establece como true
    

    if (!cedula || !descripcion || !fechaRegistro || !estadoNotificacion) {
        alert('Por favor, complete todos los campos');
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/notificaciones/Insertar/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            ID: id,
            CedulaIdentidad: cedula,
            Descripcion: descripcion,
            FechaRegistro: fechaRegistro,
            EstadoNotificacion: estadoNotificacion,
            ComentariosResolucion: comentariosResolucion,
            NotificacionActiva: notificacionActivo
        }),
        success: function (data) {
            var alertSuccess = $('<div class="alert alert-success position-fixed bottom-0 start-0" role="alert">¡Notificación creada exitosamente!</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);

            getNotificacion();
            $('#addId').val('');
            $('#addCedula').val('');
            $('#addDescripcion').val('');
            $('#addFechaRegistro').val('');
            $('#addEstadoNotificacion').val('');
            $('#addComentariosResolucion').val('');
            $('#addNotificacionActiva').val('');
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al agregar notificación:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al agregar notificación: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}



// function viewNotificacion(id) {
//     const notificacion = currentNotificaciones.find(u => u.CedulaIdentidad === id);
//     if (notificacion) {
//         alert('ID: ' + notificacion.NotificacionID + '\nCedula: ' + notificacion.CedulaIdentidad + '\nDescripcion: ' + notificacion.Descripcion + '\nFechaRegistro: ' + notificacion.FechaRegistro + '\nEstadoNotificacion: ' + notificacion.EstadoNotificacion + '\nComentariosResolucion: ' + notificacion.ComentariosResolucion + '\nNotificacionActiva: ' + (notificacion.NotificacionActiva ? 'Sí' : 'No'));
//     }
    
// }

function updateNotificacion() {
    var id = $('#updateId').val().trim();
    var cedula = $('#updateCedula').val().trim();
    var descripcion = $('#updateDescripcion').val().trim();
    var fechaRegistro = $('#updateFechaRegistro').val().trim();
    var estadoNotificacion = $('#updateEstadoNotificacion').val().trim();


    if (!id || !cedula || !descripcion || !fechaRegistro || !estadoNotificacion) {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Obtener el estado actual del usuario
    $.ajax({
        url: "http://localhost:8083/api/notificaciones/Listar/" + id, // Endpoint para obtener una notificación por su ID
        method: "GET",
        success: function (notificacion) {

             // Obtener el valor actual de ComentariosResolucion
             // Obtener el valor actual de NotificacionActiva

            // Enviar la solicitud PUT con el valor actual de NotificacionActiva
            $.ajax({
                url: "http://localhost:8083/api/notificaciones/Actualizar",
                method: "PUT",
                data: JSON.stringify({
                    NotificacionID: id,
                    CedulaIdentidad: cedula,
                    Descripcion: descripcion,
                    FechaRegistro: fechaRegistro,
                    EstadoNotificacion: estadoNotificacion,
                    ComentariosResolucion: "", // Usar el valor actual de ComentariosResolucion
                    NotificacionActiva: 1
                     // Usar el valor actual de NotificacionActiva
                }),
                contentType: "application/json",
                success: function (result) {
                    var alertSuccess = $('<div class="alert alert-info position-fixed bottom-0 start-0" role="alert">¡Notificación actualizada exitosamente!</div>');
                    $('body').append(alertSuccess);
                    alertSuccess.fadeIn();

                    setTimeout(function() {
                        alertSuccess.fadeOut(function() {
                            alertSuccess.remove();
                        });
                    }, 3000);
                    getNotificacion();
                    showSection('list');
                },
                error: function (xhr, status, error) {
                    console.error('Error al actualizar notificación:', xhr.status, xhr.statusText, xhr.responseText, status, error);
                    alert('Error al actualizar notificación: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener notificación:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al obtener notificación: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}


function deleteUsuario() {

    var id = $('#deleteId').val().trim();
    if (!id) {
        alert('Por favor, proporcione un ID');
        return;
    }
    $.ajax({
        url: 'http://localhost:8083/api/notificaciones/Eliminar/' + id,
        method: 'DELETE',
        contentType: "application/json",
        success: function (result) {
            var alertSuccess = $('<div class="alert alert-warning position-fixed bottom-0 start-0" role="alert">El usuario ha sido eliminado.</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);
            getNotificacion();
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al eliminar la notificación:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al eliminar notificación: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function loadUpdateForm(id) {
    const notificacion = currentNotificaciones.find(u => u.NotificacionID == id);
    if (notificacion) {
        $('#updateId').val(notificacion.NotificacionID);
        $('#updateCedula').val(notificacion.CedulaIdentidad);
        $('#updateDescripcion').val(notificacion.Descripcion);
        $('#updateFechaRegistro').val(notificacion.FechaRegistro);
        $('#updateEstado').val(notificacion.EstadoNotificacion);
        $('#updateComentariosResolucion').val(notificacion.ComentariosResolucion);
        
        showSection('update');
    }
}

function loadViewForm(id) {
    const notificacion = currentNotificaciones.find(u => u.NotificacionID == id);
    if (notificacion) {
        $('#viewId').val(notificacion.NotificacionID);
        $('#viewCedula').val(notificacion.CedulaIdentidad);
        $('#viewDescripcion').val(notificacion.Descripcion);
        $('#viewFechaRegistro').val(notificacion.FechaRegistro);
        $('#viewEstado').val(notificacion.EstadoNotificacion);
        $('#viewComentariosResolucion').val(notificacion.ComentariosResolucion);
        showSection('view');
    }
}

function loadDeleteForm(id) {
    const notificacion = currentNotificaciones.find(u => u.NotificacionID == id);
    if (notificacion) {
        $('#deleteId').val(notificacion.NotificacionID);
        $('#deleteCedula').val(notificacion.CedulaIdentidad);
        $('#deleteDescripcion').val(notificacion.Descripcion);
        $('#deleteFechaRegistro').val(notificacion.FechaRegistro);
        $('#deleteEstado').val(notificacion.EstadoNotificacion);
        $('#deleteComentariosResolucion').val(notificacion.ComentariosResolucion);
        showSection('delete');
    }
}

$(document).ready(function() {
    getNotificacion();
});
