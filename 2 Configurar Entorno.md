# ⚙️ Configuración del Entorno de Desarrollo para Bots de WhatsApp

Antes de empezar a programar nuestros bots con Baileys, necesitamos tener nuestro entorno de desarrollo correctamente configurado. Este documento te guiará paso a paso.

---

## 📌 1️⃣ Instalación de Node.js y npm/yarn

Baileys funciona sobre **Node.js**. Si aún no lo tienes instalado, descárgalo desde el sitio oficial:

👉 https://nodejs.org/

La instalación de Node.js incluye **npm** (Node Package Manager). Como alternativa, puedes usar **yarn**:

👉 https://classic.yarnpkg.com/en/docs/install

### 📋 Verificar Instalación

Abre tu terminal y ejecuta:

- `node -v`
- `npm -v`
- Si usas Yarn: `yarn -v`

Deberías ver las versiones instaladas en pantalla.

---

## 📌 2️⃣ Crear un Nuevo Proyecto

Crea una carpeta para tu proyecto y navega dentro de ella:

- `mkdir mi-bot-whatsapp`
- `cd mi-bot-whatsapp`

Inicializa el proyecto con:

- `npm init -y`
- o con Yarn: `yarn init -y`

Esto generará el archivo `package.json` donde se gestionarán las dependencias de tu proyecto.

---

## 📌 3️⃣ Instalar Baileys

Agrega Baileys como dependencia:

- `npm install @whiskeysockets/baileys`
- o con Yarn: `yarn add @whiskeysockets/baileys`

**Nota:** El nombre correcto del paquete es `@whiskeysockets/baileys`. Evita errores de escritura.

---

## 📌 4️⃣ Verificar Instalación

Crea un archivo llamado `index.js` con el siguiente contenido:

    const { default: makeWASocket } = require('@whiskeysockets/baileys');

    console.log("✅ Baileys instalado y listo para usar!");

Ejecuta el archivo con:

- `node index.js`

Deberías ver en pantalla:

    ✅ Baileys instalado y listo para usar!

---

## 📌 5️⃣ (Opcional) Configurar TypeScript

Si deseas trabajar con **TypeScript** desde el inicio:

### 📦 Instalar TypeScript y los tipos necesarios:

- `npm install --save-dev typescript @types/node`
- o con Yarn: `yarn add -D typescript @types/node`

### 📦 Crear un archivo de configuración `tsconfig.json`:

- `npx tsc --init`

Esto generará una configuración base para TypeScript.

### 📦 Crear archivo `src/index.ts` de prueba:

    import makeWASocket from '@whiskeysockets/baileys';

    console.log("✅ Baileys con TypeScript listo para usar!");

### 📦 Compilar y ejecutar:

- `npx tsc`
- `node dist/index.js`

---

## 📦 Estructura de Carpetas Recomendada

Se sugiere organizar así tu proyecto:

    mi-bot-whatsapp/
    │
    ├── src/
    │   └── index.js  o  index.ts
    │
    ├── dist/                  # Solo si usas TypeScript
    ├── package.json
    ├── tsconfig.json          # Solo si usas TypeScript
    └── node_modules/

---

## 📦 .gitignore recomendado

Si vas a subir este proyecto a **GitHub**, añade un archivo `.gitignore` con:

    node_modules/
    dist/
    .env

---

## ✅ Listo para empezar

Con esto tienes todo el entorno configurado para comenzar a desarrollar bots de WhatsApp usando **Baileys** 🚀.

---

## 📌 Próximo paso: Elegir Lenguaje de programación 👉 *(3 Elegir Lenguaje de programación.md)*
