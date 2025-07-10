const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp');

async function createSticker(sock, msg) {
    if (!msg.message.imageMessage) return;

    const stream = await downloadContentFromMessage(msg.message.imageMessage, 'image');
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    const webpBuffer = await sharp(buffer)
        .resize(512, 512, { fit: 'contain', background: { r:0, g:0, b:0, alpha: 0 } })
        .webp()
        .toBuffer();

    await sock.sendMessage(msg.key.remoteJid, { sticker: webpBuffer });
}

module.exports = { createSticker };
