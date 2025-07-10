# 🔄 Reconexión Automática y Gestión de Sesiones en tu Bot de WhatsApp

Para que tu bot sea estable y no pierda conexión, es vital manejar adecuadamente la sesión y reconectar cuando sea necesario.

---

## 📌 ¿Por qué manejar sesiones?

- WhatsApp cierra la sesión si la sesión no se guarda o pierde la conexión.
- Evita que tengas que escanear el código QR cada vez que reinicies el bot.
- Mantiene la sesión activa para recibir y enviar mensajes sin interrupciones.

---

## 📋 Guardar y cargar la sesión con Baileys

Baileys permite guardar la autenticación en archivos para reutilizarlos.

Ejemplo básico:

    const { useMultiFileAuthState } = require('@whiskeysockets/baileys');

    // Dentro de una función async para inicializar el socket
    const { state, saveState } = await useMultiFileAuthState('auth_info');

    const sock = makeWASocket({
        auth: state,
        // otras opciones...
    });

    sock.ev.on('creds.update', saveState);

---

## 📋 Manejar reconexión automática

Escucha el evento `connection.update` para detectar desconexiones y reconectar:

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if(connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;

            if(statusCode !== DisconnectReason.loggedOut) {
                console.log('Conexión perdida, reconectando...');
                startSock(); // Función para inicializar el socket
            } else {
                console.log('El usuario cerró sesión, requiere re-autenticación.');
            }
        }

        if(connection === 'open') {
            console.log('Conectado a WhatsApp');
        }
    });

---

## 📌 Notas importantes

- `useMultiFileAuthState` guarda la sesión en varios archivos dentro de la carpeta `auth_info`.
- Define la función `startSock` para crear el socket y manejar eventos.
- La reconexión automática evita caídas prolongadas.

---

## 📦 Próximo paso: Añadir funcionalidad multimedia y archivos al bot
