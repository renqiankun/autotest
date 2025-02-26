[English](README.md) | [中文](README.zh.md)

# 🚀 Electron + Vite + Drizzle ORM + Better-SQLite3

A modern desktop application template based on **Electron + Vite + Drizzle ORM + Better-SQLite3**.

## ✨ Features
- **Drizzle ORM** - A modern, lightweight ORM solution
- **Vue 3** - Used as the UI layer (can be replaced as needed)
- **Electron v34.0.0** + **Node.js v20.18.0**
- **Better-SQLite3** - A high-performance, synchronous SQLite database library

---

## 📂 Directory Structure

```bash
📦 Project Root
├── assets                 # Static resources (includes app icons after packaging)
├── common                 # Shared code for both renderer & main processes
├── electron               # Electron-related code
│   ├── main               # Main process code
│   │   ├── db             # Database-related code
│   │   ├── router         # Routes (exposes database access interfaces)
│   │   ├── utils.ts       # Utility functions
│   │   ├── dbServicesInit.ts  # Database initialization logic
│   │   ├── index.ts       # Main process entry file
│   ├── preload            # Preload directory
├── migrations             # Database migration files
├── public                 # Vue static resources
├── src                    # Vue application source code
├── drizzle.config.ts       # Drizzle ORM migration configuration file
├── electron-builder.json   # Electron packaging configuration
├── vite.config.ts          # Vite build configuration
```

---

## ⚙️ Environment Setup

1. **Node.js** version `v20.18.0`
2. **Visual Studio 2022** (requires **Desktop development with C++** component)
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
npm rebuild                  # Rebuild native dependencies
# Adapt Electron native modules, optionally specify the module name, e.g., better-sqlite3.
npx electron-rebuild -f -w better-sqlite3 
npm run dev                  # Start development mode
npm run build                # Build the project
```

---

## 🔨 Development Guide

### **📌 Local Database Synchronization**
- **After modifying the database schema, run:**
  ```sh
  npm run syncSchema
  ```
  This command includes three steps:
  1. `npm rebuild` - Rebuilds `better-sqlite3` to match the local Node.js version
  2. `npx drizzle-kit push` - Directly syncs `schema` to the local database
  3. `npx electron-rebuild -f -w better-sqlite3` - Rebuilds `better-sqlite3` to be compatible with Electron

### **📌 Database Migration When Packaging**
1. Generate migration files:
   ```sh
   npm run generateSchema
   ```
2. Build the project:
   ```sh
   npm run build
   ```

---

## ✅ Development Notes

### **📌 Preload File Handling**
1. **In `webPreferences`, disable Node.js in the renderer, enable context isolation, but do not enable sandbox mode.** Native modules or IPC communication should be exposed in the preload script.
2. **Preload directory files are compiled as ES `.mjs`** and use `import` syntax for module imports.

### **📌 Database Migration Methods**
Database migrations are handled differently in **development** and **production** environments:

#### **1️⃣ Production Environment**
- **Migration files are automatically generated during packaging**, no manual steps are required.
- Ensure that `databasePath` in `drizzle.config.ts` correctly points to the local database file.

#### **2️⃣ Development Environment**
- **After modifying the schema, run:**
  ```sh
  npm run syncSchema
  ```
  **This command does the following:**
  - Rebuilds `better-sqlite3`
  - Pushes schema updates using `drizzle-kit push`
  - Rebuilds `better-sqlite3` for Electron compatibility

#### **3️⃣ Migration File Management**
- The `migrations` directory stores database migration files.
- **Do not delete these files arbitrarily**, as this may cause data loss.

---

## 📌 To-Do List
✅ **Database communication example**
✅ **Multi-window example**

---

🎉 **Enjoy coding with Electron + Vite + Drizzle ORM!** 🚀

