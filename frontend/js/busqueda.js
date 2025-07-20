document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('searchInput').value.trim();
    
    if (isCedula(query)) {
        // Ejecutar la búsqueda específica de cédulas
        getUsuarioById(query);
    } else if (isSpecificKeyword(query)) {
        // Lógica de redirección basada en palabras clave
        redirectBasedOnKeywords(query.toLowerCase());
    } else {
        // Realizar la búsqueda por nombre
        searchByName(query);
    }
});

function isCedula(query) {
    // Asumiendo que una cédula tiene un formato específico, como sólo números y una longitud definida
    return /^\d{8,10}$/.test(query);
}

function isSpecificKeyword(query) {
    var lowerQuery = query.toLowerCase();
    return lowerQuery.includes('usuarios') || lowerQuery.includes('usu') || lowerQuery.includes('suario') ||
           lowerQuery.includes('servicios') || lowerQuery.includes('servi') || lowerQuery.includes('vicio') ||
           lowerQuery.includes('pagos') || lowerQuery.includes('pago') ||
           lowerQuery.includes('notificaciones') || lowerQuery.includes('noti') || lowerQuery.includes('ficacion') ||
           lowerQuery.includes('estadísticas') || lowerQuery.includes('estad') || lowerQuery.includes('tística') ||
           lowerQuery.includes('administración') || lowerQuery.includes('admin') ||
           lowerQuery.includes('inicio') || lowerQuery.includes('ini') ||
           lowerQuery.includes('contacto') || lowerQuery.includes('conta') || lowerQuery.includes('acto') ||
           lowerQuery.includes('cart') || lowerQuery.includes('car') ||
           lowerQuery.includes('service') || lowerQuery.includes('service');
}

function redirectBasedOnKeywords(lowerQuery) {
    if (lowerQuery.includes('usuarios') || lowerQuery.includes('usu') || lowerQuery.includes('suario')) {
        window.location.href = 'usuarios.html';
    } else if (lowerQuery.includes('servicios') || lowerQuery.includes('servi') || lowerQuery.includes('vicio')) {
        window.location.href = 'servicios.html';
    } else if (lowerQuery.includes('pagos') || lowerQuery.includes('pago')) {
        window.location.href = 'pagos.html';
    } else if (lowerQuery.includes('notificaciones') || lowerQuery.includes('noti') || lowerQuery.includes('ficacion')) {
        window.location.href = 'notificaciones.html';
    } else if (lowerQuery.includes('estadísticas') || lowerQuery.includes('estad') || lowerQuery.includes('tística') || lowerQuery.includes('administración') || lowerQuery.includes('admin')) {
        window.location.href = 'administracion.html';
    } else if (lowerQuery.includes('inicio') || lowerQuery.includes('ini')) {
        window.location.href = 'index.html';
    } else if (lowerQuery.includes('contacto') || lowerQuery.includes('conta') || lowerQuery.includes('acto')) {
        window.location.href = 'contact.html';
    } else if (lowerQuery.includes('cart') || lowerQuery.includes('car')) {
        window.location.href = 'cart2.html';
    } else if (lowerQuery.includes('service') || lowerQuery.includes('service')) {
        window.location.href = 'service.html';
    } else {
        alert('Página no encontrada');
    }
}

function getUsuarioById(cedula) {
    $.get('http://localhost:8083/api/Notificaciones/Buscar?busqueda=' + cedula, function(data) {
        currentNotificaciones = [data];  // Asumiendo que la respuesta es un único objeto
        displayUsuarios(1);
    }).fail(function() {
        $('#busquedalist').empty();
        $('#busquedalist').append('<tr><td colspan="5" class="text-center">Usuario no encontrado.</td></tr>');
    });
}

function searchByName(name) {
    $.get('http://localhost:8083/api/Notificaciones/BuscarPorNombre?nombre=' + name, function(data) {
        currentNotificaciones = data;  // Asumiendo que la respuesta es un array de objetos
        displayUsuarios(1);
    }).fail(function() {
        $('#busquedalist').empty();
        $('#busquedalist').append('<tr><td colspan="5" class="text-center">No se encontraron usuarios con ese nombre.</td></tr>');
    });
}

// La función displayUsuarios y loadViewForm seguirían igual que antes
