<?php
// Verificar que los campos requeridos no estén vacíos y que el email sea válido
if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500); // Enviar código de error HTTP 500 si la validación falla
    exit();
}

// Sanitizar los datos del formulario
$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$m_subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

// Configurar los detalles del correo electrónico
$to = "isaaccueva2003@gmail.com"; // Cambia esta dirección de correo a la tuya
$subject = "$m_subject: $name";
$body = "Has recibido un nuevo mensaje del formulario de contacto de tu sitio web.\n\n".
        "Aquí están los detalles:\n\n".
        "Nombre: $name\n\n".
        "Correo electrónico: $email\n\n".
        "Asunto: $m_subject\n\n".
        "Mensaje: $message";
$header = "De: $email";
$header .= "Responder a: $email";

// Intentar enviar el correo y manejar el resultado
if(!mail($to, $subject, $body, $header)) {
    http_response_code(500); // Enviar código de error HTTP 500 si el envío del correo falla
}
?>
