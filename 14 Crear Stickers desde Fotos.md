# 🏷️ Crear Stickers a partir de Fotos en tu Bot de WhatsApp

Aprende a convertir fotos recibidas en stickers para enviar respuestas divertidas y personalizadas.

---

## 📌 ¿Qué necesitas?

- Baileys para manejar los mensajes.
- `sharp` para procesar imágenes y convertirlas a WebP.
- `fs` para manejar archivos locales.

---

## 📋 Instalación de dependencias

    npm install sharp

---

## 📋 Ejemplo para recibir foto y responder con sticker

const fs = require('fs');
const sharp = require('sharp');

sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    // Detectar imagen enviada
    if (msg.message.imageMessage) {
        const stream = await downloadContentFromMessage(msg.message.imageMessage, 'image');

        let buffer = Buffer.alloc(0);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Convertir imagen a WebP para sticker
        const webpBuffer = await sharp(buffer)
            .resize(512, 512, { fit: 'contain', background: { r:0, g:0, b:0, alpha: 0 } })
            .webp()
            .toBuffer();

        // Enviar sticker
        await sock.sendMessage(msg.key.remoteJid, { sticker: webpBuffer });
    }
});

📌 Notas importantes
- El sticker debe ser WebP, 512x512 px máximo.

- downloadContentFromMessage es función de Baileys para obtener el contenido multimedia.

- Puedes mejorar la función añadiendo texto o personalización.

📦 Próximo paso: Añadir comandos para crear stickers a partir de imágenes enviadas