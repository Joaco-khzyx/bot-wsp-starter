# 🔍 Comandos para Consultar Datos Guardados en Better-SQLite3

Después de guardar usuarios en la base de datos local, es útil que el bot pueda responder con información guardada cuando se lo consultes mediante comandos personalizados.

---

## 📌 Ejemplo: Comando `!usuarios`

Este comando devolverá una lista con los IDs y nombres de los usuarios registrados.

---

## 📋 Código para el comando

Dentro del evento que procesa mensajes:

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const texto = msg.message.conversation;
        if (!texto) return;

        if (texto.startsWith('!')) {
            const comando = texto.slice(1).split(' ')[0].toLowerCase();

            if (comando === 'usuarios') {
                // Consultar usuarios en DB
                const rows = db.prepare('SELECT whatsappId, nombre FROM usuarios').all();

                if (rows.length === 0) {
                    await sock.sendMessage(msg.key.remoteJid, { text: 'No hay usuarios registrados aún.' });
                } else {
                    // Construir texto con lista de usuarios
                    let respuesta = 'Usuarios registrados:\n\n';
                    rows.forEach((u, i) => {
                        respuesta += `${i + 1}. ${u.nombre} - ${u.whatsappId}\n`;
                    });

                    await sock.sendMessage(msg.key.remoteJid, { text: respuesta });
                }
            }
        }
    });

---

## 📌 Tips

- Puedes añadir más comandos para buscar o filtrar datos.
- Recuerda siempre validar que la base de datos esté abierta antes de hacer consultas.

---

## 📦 Próximo paso: Manejar errores y mejorar respuestas
