$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var query = urlParams.get('query');

    if (query) {
        $('#searchInput').val(query); // Set the search input value for visibility
        getUsuarioById(query);
    }
});

function getUsuarioById(cedula) {
    $.get('http://localhost:8083/api/Notificaciones/Buscar?busqueda=' + cedula, function(data) {
        currentNotificaciones = data;
        displayUsuarios(1);
    }).fail(function() {
        $('#busquedalist').empty();
        $('#busquedalist').append('<tr><td colspan="5" class="text-center">Usuario no encontrado.</td></tr>');
    });
}

function displayUsuarios(page) {
    var startIndex = (page - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    var paginatedItems = currentNotificaciones.slice(startIndex, endIndex);
    $('#busquedalist').empty();
    paginatedItems.forEach(function(notificacion) {
        $('#busquedalist').append('<tr><td>' + notificacion.CedulaIdentidad + '</td><td>' + (notificacion.Nombre || '') + '</td><td>' + (notificacion.Telefono || '') + '</td><td>' + (notificacion.Email || '') + '</td><td>' + notificacion.Detalle + '</td><td class="text-center">' +
            '<button class="btn btn-warning btn-sm mr-2" onclick="loadViewForm(\'' + notificacion.CedulaIdentidad + '\')">Ver</button></td></tr>');
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

function loadViewForm(cedula) {
    const notificacion = currentNotificaciones.find(u => u.CedulaIdentidad == cedula);
    if (notificacion) {
        $('#viewCedula').val(notificacion.CedulaIdentidad);
        $('#viewNombre').val(notificacion.Nombre || '');
        $('#viewTelefono').val(notificacion.Telefono || '');
        $('#viewEmail').val(notificacion.Email || '');
        $('#viewDetalle').val(notificacion.Detalle);
        showSection('view');
    }
}

function showSection(sectionId) {
    $('.content-section').hide();
    $('#' + sectionId).show();
}

var currentNotificaciones = [];
var currentPage = 1;
var rowsPerPage = 10;
