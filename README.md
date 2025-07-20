project:
  name: WEB-EPMAPS
  description: >
    Repositorio monorepo para la gestión de turnos y pagos de la Empresa Pública Metropolitana de Agua Potable y Saneamiento (EPMAPS).
  structure:
    - backend/
    - frontend/
    - .gitignore
    - README.md

backend:
  description: Backend hecho en C# (ASP.NET, arquitectura N capas)
  files:
    - GUIPagosPSA.sln
    - GUIPagos_PSA/
  technologies:
    - C#
    - ASP.NET MVC
    - SQL Server
    - Arquitectura N capas

frontend:
  description: Frontend web estático (HTML, CSS, JS, SCSS)
  folders:
    - css/
    - img/
    - js/
    - scss/
    - mail/
  files:
    - "*.html"
  technologies:
    - HTML5
    - CSS3
    - SCSS
    - JavaScript
    - JQuery
    - Bootstrap

features:
  - Asignación de turnos de atención para usuarios
  - Carrito de compras y manejo de pagos online
  - CRUD de servicios y usuarios
  - Visualización de datos estadísticos
  - Notificaciones y gestión de correo electrónico

how_to_run:
  backend:
    - "Abre /backend/GUIPagosPSA.sln en Visual Studio"
    - "Restaura los paquetes NuGet si es necesario"
    - "Configura la conexión a la base de datos en web.config o appsettings"
    - "Ejecuta el proyecto (F5)"
  frontend:
    - "Navega a la carpeta /frontend"
    - "Abre los archivos .html directamente en tu navegador o usa un servidor estático (Live Server en VS Code, etc.)"

team:
  - Isaac Cueva
  # Agrega tus compañeros aquí

license: "Proyecto universitario. Uso educativo. Licencia sugerida: MIT o similar"

notes:
  - "Puedes agregar imágenes o capturas de pantalla para ilustrar el funcionamiento."
  - "README.md principal sigue en formato Markdown para compatibilidad con GitHub."
