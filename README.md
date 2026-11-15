# Dashboard de Ventas

Panel administrativo en **React + TypeScript** para gestionar productos, pedidos y usuarios de una tienda, con indicadores (KPI) y gráficos de ventas.

## Funcionalidades
- Inicio de sesión y registro de usuarios con **roles** (administrador, visualizador…) y permisos por sección.
- CRUD de productos con persistencia en `localStorage`.
- Tarjetas KPI y gráficos de líneas, áreas, barras y circular con **Recharts**.
- Gestión de usuarios y cambio de rol (solo administrador).
- Estado global de autenticación con **React Context**.

## Tecnologías
React 19 · TypeScript · Vite · Recharts · ESLint

## Estructura
```
dashboard-ventas/src
├── components/   # Sidebar, Header, tarjetas KPI, gráficos, tablas
├── context/      # AuthContext (sesión, roles y permisos)
├── data/         # Datos iniciales de ventas y usuarios
├── pages/        # Inicio, Productos, Pedidos, Análisis, Usuarios, Login…
├── types/        # Tipos de TypeScript
└── utils/        # Persistencia en localStorage
```

## Cómo ejecutarlo
```bash
git clone https://github.com/Alex959R/dashboard-ventas.git
cd dashboard-ventas/dashboard-ventas
npm install
npm run dev
```

> Proyecto de práctica de frontend: los datos se guardan en el navegador, no hay backend.

## Autor
Jhon Alex Rosero Gallego — Aprendiz SENA, Tecnólogo en Análisis y Desarrollo de Software.
