# 💬 Responder a Más Tipos de Mensajes con Baileys

Ahora que ya tienes tu primer bot básico funcionando, es momento de ampliarlo. WhatsApp permite enviar y recibir diferentes tipos de mensajes, y con Baileys podemos detectarlos y responder según el tipo.

---

## 📋 Tipos de Mensajes que Puedes Detectar

Con Baileys puedes manejar:

- Mensajes de texto.
- Imágenes.
- Stickers.
- Audios.
- Videos.
- Ubicaciones.
- Contactos.

Cada uno de estos llega como una propiedad dentro del objeto `message`.

---

## 📌 ¿Cómo Saber Qué Tipo de Mensaje Llegó?

Cada mensaje recibido contiene un objeto con una propiedad `message`, dentro de la cual se indica el tipo.

Por ejemplo:

    msg.message.conversation            // Para texto normal.
    msg.message.imageMessage            // Para imágenes.
    msg.message.audioMessage            // Para audios.
    msg.message.stickerMessage          // Para stickers.

---

## 📋 Ejemplo de Detección y Respuesta según el Tipo

En este ejemplo:

- Si recibe texto: responde con un saludo.
- Si recibe una imagen: responde agradeciendo.
- Si recibe un audio: responde diciendo que lo recibió.

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        // Mensaje de texto
        if (msg.message.conversation) {
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Gracias por tu mensaje de texto!' });
        }

        // Mensaje de imagen
        if (msg.message.imageMessage) {
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Recibí tu imagen! 📷' });
        }

        // Mensaje de audio
        if (msg.message.audioMessage) {
            await sock.sendMessage(msg.key.remoteJid, { text: '¡Escuché tu audio! 🎧' });
        }
    });

---

## 📌 Notas Adicionales

- Puedes usar `console.log(msg.message)` para ver la estructura de cualquier mensaje recibido y detectar su tipo.
- Desde ahí puedes crear bots que respondan de forma distinta según el contenido.

---

## 📋 Tipos de Respuesta que Puedes Enviar

Baileys permite responder no solo con texto, también con:

- Imágenes.
- Stickers.
- Audios.
- Videos.
- Archivos.
- Ubicaciones.
- Contactos.
- Reacciones (emojis a mensajes específicos).

Por ejemplo, para enviar una imagen:

    await sock.sendMessage(to, {
        image: { url: './imagen.jpg' },
        caption: 'Aquí tienes una imagen 📸'
    });

---

## 📦 Próximo paso: Enviar Imágenes, Stickers y Audios 👉 *(7 Enviar Imágenes, Stickers y Audios.md)*
