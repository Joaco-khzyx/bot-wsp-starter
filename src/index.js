const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');
const sock = makeWASocket({
    auth: state
});
sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === 'close') {
        if(lastDisconnect.error?.output?.statusCode !== 401) {
            startSock();
        }
    } else if(connection === 'open') {
        console.log('Conectado a WhatsApp');
    }
});
sock.ev.on('creds.update', saveState);
