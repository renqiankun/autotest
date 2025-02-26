[ 中文](README.md) | [ English](README.en.md)


# 🚀 Electron + Vite + Drizzle ORM + Better-SQLite3

A modern desktop application template based on **Electron + Vite + Drizzle ORM + Better-SQLite3**.

## ✨ Features
- **Drizzle ORM** - A modern, lightweight ORM solution
- **Vue 3** - Used for the UI layer (can be replaced as needed)
- **Electron v34.0.0** + **Node.js v20.18.0**
- **Better-SQLite3** - High-performance, synchronous SQLite database library

---

## 📂 Project Structure

```bash
📦 Project Root
├── assets                 # Static assets (includes packaged app icons, Windows only)
├── common                 # Shared code between renderer & main process
├── electron               # Electron-related code
│   ├── main               # Main process code
│   │   ├── db             # Database-related code
│   │   ├── router         # Routes (providing database access APIs)
│   │   ├── utils.ts       # Utility functions
│   │   ├── dbServicesInit.ts  # Database initialization logic
│   │   ├── index.ts       # Main process entry file
│   ├── preload            # Preload directory
├── migrations             # Database migration files
├── public                 # Vue assets directory
├── src                    # Vue source code
├── drizzle.config.ts       # Drizzle ORM migration configuration
├── electron-builder.json   # Electron packaging configuration
├── vite.config.tsn         # vite build
```

---

## ⚙️ Environment Setup

1. **Node.js** v20.18.0
2. **Visual Studio 2022** (Install **Desktop Development with C++**)
3. **Python 3.7**
4. **Configure environment variables**
   ```sh
   npm config edit
   ```
   Add the following:
   ```ini
   msvs_version=2022
   python=python3.7
   ```
5. **Install `node-gyp` globally**
   ```sh
   npm install -g node-gyp
   ```

---

## 🚀 Start the Project

```sh
npm install                  # Install dependencies
npm rebuild                  # Rebuild local dependencies
npx electron-rebuild -f -w better-sqlite3  # Adapt Electron native modules
npm run dev                  # Start the project
npm run build                # Build the project
```

---

## 🔨 Development Guide

### **📌 Sync Local Database**
- **After modifying the database schema, run:**
  ```sh
  npm run syncSchema
  ```
  This command includes three steps:
  1. `npm rebuild` - Recompile `better-sqlite3` for the local Node.js version
  2. `npx drizzle-kit push` - Sync `schema` directly to the local database
  3. `npx electron-rebuild -f -w better-sqlite3` - Recompile `better-sqlite3` for Electron

### **📌 Database Migration During Packaging**
1. Generate database migration files:
   ```sh
   npm run generateSchema
   ```
2. Build the project:
   ```sh
   npm run build
   ```

---

## ✅ Development Notes

### **📌 Preload File Imports**
1. **For internal imports within the Preload directory**, use `import`
2. **For Preload importing files from `main` directory**, use `import`
3. **For Preload importing native modules**, use `require`, e.g.:
   ```js
   const { contextBridge } = require('electron');
   ```

### **📌 Database Migration Strategy**
Database migrations are divided into **development** and **production** environments:

#### **1️⃣ Production Environment**
- **Migrations are automatically generated during packaging**, no manual handling is required
- Ensure `drizzle.config.ts` contains the correct `databasePath` pointing to the local database file

#### **2️⃣ Development Environment**
- **After modifying the schema, run:**
  ```sh
  npm run syncSchema
  ```
  **This performs:**
  - Rebuilding `better-sqlite3`
  - Syncing schema directly using `drizzle-kit push`
  - Re-adapting Electron version

#### **3️⃣ Migration File Management**
- The `migrations` directory stores database migration files
- **Do not delete** this directory arbitrarily, as it may lead to data loss

---

## 📌 To-Do List
✅ **Database communication example**
✅ **Multi-window example**

---

🎉 **Enjoy coding with Electron + Vite + Drizzle ORM!** 🚀

