# 💾 Conectar Base de Datos Local con Better-SQLite3 para tu Bot de WhatsApp

Si prefieres una base de datos local, ligera y fácil de usar, **better-sqlite3** es una excelente opción para principiantes.

---

## 📌 ¿Por qué Better-SQLite3?

- Base de datos SQL embebida, no necesita servidor.
- Muy rápida y simple de usar en Node.js.
- Fácil de instalar y manejar con comandos SQL básicos.
- Ideal para proyectos pequeños y prototipos.

---

## 📋 Pasos para usar Better-SQLite3

### 1. Instalar la librería

    npm install better-sqlite3

---

### 2. Crear o abrir la base de datos

En tu archivo principal (`index.js` o `index.ts`):

    const Database = require('better-sqlite3');
    const db = new Database('mi-bot-whatsapp.db');

Esto crea (o abre si existe) un archivo `mi-bot-whatsapp.db` en la carpeta del proyecto.

---

### 3. Crear una tabla para guardar usuarios

Ejemplo para guardar ID de WhatsApp y nombre:

    db.prepare(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            whatsappId TEXT UNIQUE,
            nombre TEXT,
            fechaRegistro TEXT
        )
    `).run();

---

### 4. Insertar o actualizar usuarios cuando envían mensaje

Dentro del evento de mensajes:

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const idUsuario = msg.key.remoteJid;
        const nombre = 'Desconocido'; // O extraer si tienes dato

        // Insertar o ignorar si ya existe
        const stmt = db.prepare(`
            INSERT OR IGNORE INTO usuarios (whatsappId, nombre, fechaRegistro)
            VALUES (?, ?, ?)
        `);

        stmt.run(idUsuario, nombre, new Date().toISOString());
    });

---

### 5. Consultar usuarios guardados

Ejemplo para listar todos los usuarios:

    const rows = db.prepare('SELECT * FROM usuarios').all();
    console.log(rows);

---

## 📌 Notas

- Better-SQLite3 es síncrono, lo que simplifica la programación para principiantes.
- Puedes usar consultas SQL para gestionar y modificar datos.
- Perfecto para bots locales o pequeños proyectos.

---

## 📦 Próximo paso: Añadir comandos para consultar datos guardados
