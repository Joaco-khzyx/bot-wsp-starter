# 🤖 Crear tu Primer Bot Básico con Baileys

Ahora que tienes tu entorno configurado, ya elegiste un lenguaje y entendés cómo funciona Baileys, es momento de crear tu primer bot.

Este bot será muy simple: se conectará a WhatsApp, esperará un mensaje y responderá automáticamente si detecta un mensaje específico.

---

## 📦 Requisitos Previos

- Tener Node.js instalado.
- Haber creado un proyecto con `npm init -y`.
- Tener instalada la librería de Baileys:

    npm install @whiskeysockets/baileys

---

## 📁 Estructura Básica del Proyecto

Crea una estructura de carpetas simple para empezar:

    mi-bot-whatsapp/
    ├── node_modules/
    ├── package.json
    ├── index.js (o index.ts si usas TypeScript)

---

## 📌 Crear el Archivo Principal

Dentro de tu carpeta de proyecto, crea el archivo:

    index.js

(o `index.ts` si decidiste trabajar con TypeScript)

---

## 📌 Código Explicado Paso a Paso

A continuación te explico qué hará nuestro bot:

1️⃣ Importará Baileys.  
2️⃣ Configurará una conexión con WhatsApp.  
3️⃣ Mostrará un código QR en consola para escanear con tu teléfono.  
4️⃣ Esperará mensajes.  
5️⃣ Si recibe "Hola", responderá "¡Hola! ¿Cómo estás?".

---

## 📋 Ejemplo de Código en JavaScript

    // Importar Baileys
    const { default: makeWASocket } = require('@whiskeysockets/baileys');
    const { useMultiFileAuthState } = require('@whiskeysockets/baileys');

    // Autenticación
    const { state, saveCreds } = await useMultiFileAuthState('./session');

    // Crear conexión
    const sock = makeWASocket({
        auth: state
    });

    // Mostrar QR
    sock.ev.on('connection.update', (update) => {
        const { qr } = update;
        if (qr) {
            console.log('Escanea este QR desde WhatsApp:');
            console.log(qr);
        }
    });

    // Escuchar mensajes
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const texto = msg.message.conversation;
        if (texto === 'Hola') {
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Hola! ¿Cómo estás?' });
        }
    });

    // Guardar credenciales
    sock.ev.on('creds.update', saveCreds);

---

## 📋 Ejecución

En tu terminal, ejecuta:

    node index.js

(o `ts-node index.ts` si estás usando TypeScript)

Escanea el código QR que aparecerá en consola con tu teléfono desde **WhatsApp Web**.  

Una vez conectado, si alguien te escribe "Hola", el bot responderá "¡Hola! ¿Cómo estás?".

---

## 📌 Notas Importantes

- La primera vez que lo ejecutes, se generará una carpeta llamada `session/` donde se guardan tus credenciales para no tener que escanear el QR en cada sesión.
- Si quieres cerrar sesión, borra la carpeta `session/` y vuelve a ejecutar el bot.
- Si usas TypeScript, necesitarás instalar `ts-node` y `typescript`:

    npm install --save-dev typescript ts-node @types/node

Luego compilar y correr con:

    npx ts-node index.ts

---

## 📦 Próximo paso: Responder a más tipos de mensajes 👉 *(6 Responder a Más Tipos de Mensajes.md)*
