# 📝 Crear Comandos Personalizados en tu Bot de WhatsApp

Los **comandos personalizados** permiten que tu bot ejecute acciones específicas cuando detecta un mensaje que empieza con un prefijo determinado, como `!`, `/` o cualquier otro símbolo que definas.

Esto te permitirá organizar mejor las funciones de tu bot y evitar respuestas automáticas no deseadas.

---

## 📌 ¿Qué es un Prefijo?

Un **prefijo** es el símbolo o conjunto de caracteres que se coloca al inicio de un mensaje para identificarlo como un comando.

Ejemplos comunes:

    !hola
    /menu
    .ping

Puedes elegir el que prefieras. En este ejemplo usaremos `!`

---

## 📋 Detectar Comandos Personalizados

Lo primero es identificar si el mensaje empieza con ese prefijo.

Ejemplo:

    const texto = msg.message.conversation;

    if (texto.startsWith('!')) {
        // Es un comando, se procesa aquí
    }

---

## 📌 Obtener el Nombre del Comando

Para extraer solo el nombre del comando:

    const comando = texto.slice(1).split(' ')[0].toLowerCase();

📌 Explicación:
- `slice(1)`: quita el prefijo `!`
- `split(' ')[0]`: toma solo la primera palabra.
- `toLowerCase()`: convierte a minúsculas para evitar errores de mayúsculas.

---

## 📋 Crear Respuestas Personalizadas

Una vez que detectamos el comando, podemos usar un `switch` o `if` para responder según el nombre.

Ejemplo:

    if (texto.startsWith('!')) {
        const comando = texto.slice(1).split(' ')[0].toLowerCase();

        if (comando === 'hola') {
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Hola, bienvenido al bot!' });
        }

        if (comando === 'info') {
            await sock.sendMessage(msg.key.remoteJid, {
                text: 'Este bot está desarrollado con Baileys y Node.js 🚀'
            });
        }
    }

---

## 📋 Ejemplo Completo: Bot con Comandos `!hola` y `!info`

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const texto = msg.message.conversation;
        if (!texto) return;

        if (texto.startsWith('!')) {
            const comando = texto.slice(1).split(' ')[0].toLowerCase();

            if (comando === 'hola') {
                await sock.sendMessage(msg.key.remoteJid, { text: '¡Hola, bienvenido al bot!' });
            }

            if (comando === 'info') {
                await sock.sendMessage(msg.key.remoteJid, {
                    text: 'Este bot está desarrollado con Baileys y Node.js 🚀'
                });
            }
        }
    });

---

## 📌 Personalización

Puedes añadir más comandos duplicando las condiciones `if` o usando `switch`:

    switch (comando) {
        case 'menu':
            // Acción
            break;
        case 'hora':
            // Acción
            break;
    }

---

## 📦 Próximo paso: Conectar Base de Datos para Guardar Información 👉 *(9 Conectar Base de Datos.md)*
