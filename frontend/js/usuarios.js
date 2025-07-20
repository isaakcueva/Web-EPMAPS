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
    $('#usuarioList').empty();
    paginatedItems.forEach(function (usuario) {
        $('#usuarioList').append('<tr><td>' + usuario.CedulaIdentidad + '</td><td>' + usuario.Nombre + '</td><td>' + usuario.Direccion + '</td><td>' + usuario.Email + '</td><td>' + usuario.Telefono + '</td><td class="text-center">' + // Agrega la clase text-center al contenedor de los botones
            '<div class="d-flex justify-content-center">' + // Agrega la clase d-flex y justify-content-center
            '<button class="btn btn-primary btn-sm mr-2" onclick="loadUpdateForm(\'' + usuario.CedulaIdentidad + '\')">Editar</button> ' + // Agrega mr-2 para el margen
            '<button class="btn btn-warning btn-sm mr-2" onclick="loadViewForm(\'' + usuario.CedulaIdentidad + '\')">Detalles</button> ' + // Agrega mr-2 para el margen
            '<button class="btn btn-danger btn-sm" onclick="loadDeleteForm(\'' + usuario.CedulaIdentidad + '\')">Eliminar</button>' +
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
        url: 'http://localhost:8083/api/usuario/Listar/',
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
    $.get('http://localhost:8083/api/usuario/Listar/' + id, function (data) {
        currentNotificaciones = [data];
        displayUsuarios(1);
        $('#searchId').val("");
    }).fail(function () {
        $('#errorMessage').show().text('Usuario no encontrado.');
    });
}

function addUsuario() {
    var id = $('#addId').val().trim();
    var nombre = $('#addNombre').val().trim();
    var direccion = $('#addDireccion').val().trim();
    var email = $('#addEmail').val().trim();
    var telefono = $('#addTelefono').val().trim();
    var usuarioActivo = $('#addUsuarioActivo').val() === '1';

    if (!id || !nombre || !direccion || !email || !telefono) {
        alert('Por favor, complete todos los campos');
        return;
    }

    $.ajax({
        url: "http://localhost:8083/api/usuario/Insertar",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            CedulaIdentidad: id,
            Nombre: nombre,
            Direccion: direccion,
            Email: email,
            Telefono: telefono,
            UsuarioActivo: usuarioActivo
        }),
        success: function (data) {
            var alertSuccess = $('<div class="alert alert-success position-fixed bottom-0 start-0" role="alert">¡Usuario creado exitosamente!</div>');
            $('body').append(alertSuccess);
            alertSuccess.fadeIn();

            setTimeout(function() {
                alertSuccess.fadeOut(function() {
                    alertSuccess.remove();
                });
            }, 3000);

            getNotificacion();
            $('#addId').val('');
            $('#addNombre').val('');
            $('#addDireccion').val('');
            $('#addEmail').val('');
            $('#addTelefono').val('');
            $('#addUsuarioActivo').val('');
            showSection('list');
        },
        error: function (xhr, status, error) {
            console.error('Error al agregar usuario:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al agregar usuario: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function viewUsuario(id) {
    const usuario = currentNotificaciones.find(u => u.CedulaIdentidad === id);
    if (usuario) {
        alert('ID: ' + usuario.CedulaIdentidad + '\nNombre: ' + usuario.Nombre + '\nDireccion: ' + usuario.Direccion + '\nEmail: ' + usuario.Email + '\nTelefono: ' + usuario.Telefono + '\nUsuario Activo: ' + (usuario.UsuarioActivo ? 'Sí' : 'No'));
    }
}

function updateUsuario() {
    var id = $('#updateId').val().trim();
    var nombre = $('#updateNombre').val().trim();
    var direccion = $('#updateDireccion').val().trim();
    var email = $('#updateEmail').val().trim();
    var telefono = $('#updateTelefono').val().trim();

    if (!id || !nombre || !direccion || !email || !telefono) {
        alert('Por favor, complete todos los campos');
        return;
    }

    // Obtener el estado actual del usuario
    $.ajax({
        url: "http://localhost:8083/api/usuario/Listar/" + id, // Endpoint para obtener un usuario por su ID
        method: "GET",
        success: function (usuario) {
            // Obtener el valor actual de UsuarioActivo
            var usuarioActivo = usuario.UsuarioActivo;

            // Enviar la solicitud PUT con el valor actual de UsuarioActivo
            $.ajax({
                url: "http://localhost:8083/api/usuario/Actualizar",
                method: "PUT",
                data: JSON.stringify({
                    CedulaIdentidad: id,
                    Nombre: nombre,
                    Direccion: direccion,
                    Email: email,
                    Telefono: telefono,
                    UsuarioActivo: usuarioActivo // Usar el valor actual de UsuarioActivo
                }),
                contentType: "application/json",
                success: function (result) {
                    var alertSuccess = $('<div class="alert alert-info position-fixed bottom-0 start-0" role="alert">¡Usuario actualizado exitosamente!</div>');
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
                    console.error('Error al actualizar usuario:', xhr.status, xhr.statusText, xhr.responseText, status, error);
                    alert('Error al actualizar usuario: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener el usuario:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al obtener el usuario: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
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
        url: 'http://localhost:8083/api/usuario/Eliminar/' + id,
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
            console.error('Error al eliminar usuario:', xhr.status, xhr.statusText, xhr.responseText, status, error);
            alert('Error al eliminar usuario: ' + xhr.status + ' ' + xhr.statusText + ' ' + xhr.responseText + ' ' + status + ' ' + error);
        }
    });
}

function loadUpdateForm(id) {
    const usuario = currentNotificaciones.find(u => u.CedulaIdentidad === id);
    if (usuario) {
        $('#updateId').val(usuario.CedulaIdentidad);
        $('#updateNombre').val(usuario.Nombre);
        $('#updateDireccion').val(usuario.Direccion);
        $('#updateEmail').val(usuario.Email);
        $('#updateTelefono').val(usuario.Telefono);
        $('#updateUsuarioActivo').val(usuario.UsuarioActivo ? '1' : '0');
        showSection('update');
    }
}

function loadViewForm(id) {
    const usuario = currentNotificaciones.find(u => u.CedulaIdentidad === id);
    if (usuario) {
        $('#viewId').val(usuario.CedulaIdentidad);
        $('#viewNombre').val(usuario.Nombre);
        $('#viewDireccion').val(usuario.Direccion);
        $('#viewEmail').val(usuario.Email);
        $('#viewTelefono').val(usuario.Telefono);
        $('#viewUsuarioActivo').val(usuario.UsuarioActivo ? '1' : '0');
        showSection('view');
    }
}

function loadDeleteForm(id) {
    const usuario = currentNotificaciones.find(u => u.CedulaIdentidad === id);
    if (usuario) {
        $('#deleteId').val(usuario.CedulaIdentidad);
        $('#deleteNombre').val(usuario.Nombre);
        $('#deleteDireccion').val(usuario.Direccion);
        $('#deleteEmail').val(usuario.Email); // Aquí se agrega para llenar el campo de email
        $('#deleteTelefono').val(usuario.Telefono);
        
        showSection('delete');
    }
}

$(document).ready(function() {
    getNotificacion();
});
