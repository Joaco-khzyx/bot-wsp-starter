# 📸 Enviar y Recibir Archivos Multimedia con tu Bot de WhatsApp

Agregar soporte para multimedia hará tu bot más interactivo y versátil. Aquí te muestro cómo enviar y recibir imágenes, audios y documentos.

---

## 📌 Enviar imágenes

Para enviar una imagen, primero importa `fs` para leer archivos locales:

    const fs = require('fs');

Luego, envía la imagen con el método `sendMessage`:

    await sock.sendMessage(chatId, {
        image: fs.readFileSync('./ruta/a/tu/imagen.jpg'),
        caption: 'Aquí tienes una imagen'
    });

---

## 📌 Enviar documentos

Para enviar un documento (pdf, txt, etc.):

    await sock.sendMessage(chatId, {
        document: fs.readFileSync('./ruta/a/tu/documento.pdf'),
        fileName: 'documento.pdf',
        mimetype: 'application/pdf',
        caption: 'Aquí tienes un documento'
    });

---

## 📌 Enviar audios

Para enviar audios (mp3, wav, etc.):

    await sock.sendMessage(chatId, {
        audio: fs.readFileSync('./ruta/a/tu/audio.mp3'),
        mimetype: 'audio/mpeg',
        ptt: false // pon true si es un mensaje de voz (push-to-talk)
    });

---

## 📌 Recibir archivos multimedia

En el evento de mensajes:

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        // Detectar si el mensaje tiene imagen
        if (msg.message.imageMessage) {
            console.log('Recibiste una imagen');
            // Puedes descargar o procesar la imagen aquí
        }

        // Detectar documento
        if (msg.message.documentMessage) {
            console.log('Recibiste un documento');
        }

        // Detectar audio
        if (msg.message.audioMessage) {
            console.log('Recibiste un audio');
        }
    });

---

## 📌 Nota

- Para guardar archivos recibidos, necesitas descargar el contenido usando el método `downloadContent` de Baileys.
- Esto permite que tu bot procese o guarde los archivos.

---

## 📦 Próximo paso: Crear Stickers con imágenes!
