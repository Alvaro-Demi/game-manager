# 🎮 Game Manager

Aplicación web desarrollada con **Next.js, React y TypeScript** para gestionar un catálogo de videojuegos.

El proyecto combina una interfaz web con rutas API integradas en Next.js y un servidor JSON utilizado como fuente de datos durante el desarrollo.

## ✨ Funcionalidades

* 🎮 Catálogo de videojuegos
* 🔎 Consulta de videojuegos
* 📄 Páginas de detalle
* ➕ Creación de videojuegos
* ✏️ Edición de videojuegos
* 🗑️ Eliminación de registros
* ⭐ Sistema de favoritos
* 🧩 Componentes reutilizables
* 🔀 Rutas dinámicas
* 🌐 API Routes de Next.js
* 💾 Persistencia mediante JSON Server

## 🛠️ Tecnologías

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend / datos

* Next.js API Routes
* JSON Server
* REST API

### Herramientas

* ESLint
* Git
* GitHub
* npm

## 🏗️ Estructura del proyecto

```text
game-manager/
├── app/
│   ├── api/
│   │   └── games/
│   ├── components/
│   ├── favorites/
│   └── games/
├── lib/
│   └── types.ts
├── db.json
└── ...
```

## 🔌 API

El proyecto utiliza **API Routes de Next.js** para gestionar diferentes operaciones relacionadas con los videojuegos.

Entre las operaciones disponibles se encuentran:

* Obtener videojuegos
* Obtener un videojuego por ID
* Crear videojuegos
* Actualizar videojuegos
* Eliminar videojuegos

Durante el desarrollo se utiliza **JSON Server** como fuente de datos.

## 🎯 Objetivo

El objetivo del proyecto fue desarrollar una aplicación web utilizando **Next.js, React y TypeScript**, trabajando con:

* Componentes reutilizables
* Rutas dinámicas
* Formularios
* Operaciones CRUD
* API Routes
* Gestión de datos
* Navegación entre páginas
* Diseño mediante Tailwind CSS

## 💻 Instalación

Clona el repositorio:

```bash
git clone https://github.com/Alvaro-Demi/game-manager.git
```

Accede al proyecto:

```bash
cd game-manager
```

Instala las dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Este comando inicia simultáneamente:

* Next.js
* JSON Server

La aplicación estará disponible en:

```text
http://localhost:3000
```

## 📌 Estado del proyecto

Proyecto académico desarrollado durante el ciclo de **Desarrollo de Aplicaciones Web (DAW)**.

El repositorio se mantiene como muestra de trabajo con Next.js, React, TypeScript, API Routes, CRUD, rutas dinámicas y Tailwind CSS.
