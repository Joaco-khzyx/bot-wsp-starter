# 🏷️ Comando para Crear Stickers a partir de Fotos en tu Bot

Este comando permite que el usuario envíe una imagen junto con el comando `!sticker` y el bot responderá con esa imagen convertida en sticker.

---

## 📋 Código para el comando `!sticker`

Dentro del evento de mensajes:

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        // Obtener texto y verificar comando
        const texto = msg.message.conversation || '';
        const isStickerCommand = texto.trim().toLowerCase() === '!sticker';

        // Verificar que el mensaje tenga imagen adjunta
        const imageMessage = msg.message.imageMessage;

        if (isStickerCommand && imageMessage) {
            try {
                // Descargar contenido de la imagen
                const stream = await downloadContentFromMessage(imageMessage, 'image');

                let buffer = Buffer.alloc(0);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }

                // Convertir imagen a WebP para sticker con sharp
                const webpBuffer = await sharp(buffer)
                    .resize(512, 512, { fit: 'contain', background: { r:0, g:0, b:0, alpha: 0 } })
                    .webp()
                    .toBuffer();

                // Enviar sticker al chat
                await sock.sendMessage(msg.key.remoteJid, { sticker: webpBuffer });

            } catch (error) {
                console.error('Error creando sticker:', error);
                await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ No pude crear el sticker. Por favor, intenta de nuevo.' });
            }
        } else if (isStickerCommand && !imageMessage) {
            await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Para crear un sticker, envía una imagen junto con el comando !sticker.' });
        }
    });

---

## 📌 Notas

- El comando funciona solo si el mensaje tiene imagen adjunta.
- `downloadContentFromMessage` es función de Baileys para obtener contenido multimedia.
- Usa `sharp` para procesar la imagen y convertirla a WebP.
- Ajusta el tamaño a 512x512 para cumplir con el estándar de stickers.

---
