const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');

async function saveImage(message) {
    const stream = await downloadContentFromMessage(message.imageMessage, 'image');
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    fs.writeFileSync('imagen.jpg', buffer);
}

module.exports = { saveImage };
