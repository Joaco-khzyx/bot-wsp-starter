async function detectResponse(sock, msg) {
    if (!msg.message) return;

    const context = msg.message.extendedTextMessage?.contextInfo;

    if (context && context.stanzaId) {
        const repliedId = context.stanzaId;
        const from = msg.key.remoteJid;

        if (repliedId === 'ID_ESPECIAL') {
            await sock.sendMessage(from, { text: 'Respuesta detectada. Acción ejecutada.' });
        }
    }
}

module.exports = { detectResponse };
