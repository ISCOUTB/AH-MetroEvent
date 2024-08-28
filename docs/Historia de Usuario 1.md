#Historia de usuario 1

**Registro De Usuario**

Como **cliente**, quiero poder visualizar y rellenar el formulario de registro para poder ser un usuario de la plataforma

**Criterio de aceptación:**

**1. La interfaz debe mostrar un formulario de registro con los siguientes campos obligatorios:**

   - Correo electrónico
   - Contraseña
   - Nombre de usuario
   - Dirección
        
**2. El formulario debe validar que:**

   - El correo electrónico tiene un formato válido.
   - La contraseña tenga al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
   - El nombre de usuario no esté vacío y sea único en la plataforma.
   - La dirección esté completa y válida (Considerar posibilidad de incluir validación por medio de una API de direcciones).
          
**3. El sistema debe enviar un correo de verificación al usuario una vez registrado, y el usuario debe confirmar su correo               antes de poder iniciar sesión.**

**4. El usuario debe poder ver un mensaje de error si alguno de los campos no se completa correctamente o si el nombre de usuario o correo electrónico ya están en uso.**

**5. Después de un registro exitoso, el usuario debe ser redirigido a una página de bienvenida o su perfil.**


