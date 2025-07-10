# 📷 Enviar Imágenes, Stickers y Audios con Baileys

Ahora que tu bot ya responde a mensajes de texto y reconoce tipos de mensajes, vamos a enseñarle a **enviar imágenes, stickers y audios** de forma programada o como respuesta.

---

## 📌 Enviar una Imagen

Para enviar una imagen, necesitas:

- Tener el archivo de imagen en tu proyecto.
- Indicar su ruta al momento de enviarla.

Ejemplo:

    await sock.sendMessage(to, {
        image: { url: './imagen.jpg' },
        caption: 'Aquí tienes una imagen 📸'
    });

📌 Explicación:
- `to`: número o grupo a donde se envía.
- `image: { url: './imagen.jpg' }`: indica la ubicación de la imagen.
- `caption`: mensaje de pie de foto.

---

## 📌 Enviar un Sticker

Para enviar un sticker, también necesitas el archivo en formato `.webp`.

Ejemplo:

    await sock.sendMessage(to, {
        sticker: { url: './sticker.webp' }
    });

📌 Notas:
- El archivo debe estar en formato `.webp`.
- Puedes convertir imágenes a `.webp` con herramientas online o desde terminal.

---

## 📌 Enviar un Audio

Para enviar un audio, usa la propiedad `audio` indicando su ruta.

Ejemplo:

    await sock.sendMessage(to, {
        audio: { url: './audio.mp3' },
        mimetype: 'audio/mpeg',
        ptt: true
    });

📌 Explicación:
- `mimetype`: indica el tipo de archivo de audio.
- `ptt: true`: si quieres que se envíe como nota de voz (push-to-talk).

---

## 📌 Ejemplo Completo: Responder con Imagen y Audio

En este ejemplo:

- Si alguien escribe "foto", se envía una imagen.
- Si escribe "audio", se envía un audio.

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const texto = msg.message.conversation;

        if (texto === 'foto') {
            await sock.sendMessage(msg.key.remoteJid, {
                image: { url: './imagen.jpg' },
                caption: '¡Aquí tienes una foto!'
            });
        }

        if (texto === 'audio') {
            await sock.sendMessage(msg.key.remoteJid, {
                audio: { url: './audio.mp3' },
                mimetype: 'audio/mpeg',
                ptt: true
            });
        }
    });

---

## 📌 Notas Importantes

- Todos los archivos deben estar en la misma carpeta que tu bot o indicar su ruta completa.
- Puedes usar URLs de internet en lugar de archivos locales.
- Verifica siempre la extensión y el tipo de archivo.

---

## 📦 Próximo paso: Crear Comandos Personalizados para tu Bot 👉 *(8 Crear Comandos Personalizados.md)*
