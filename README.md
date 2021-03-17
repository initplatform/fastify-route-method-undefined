# Fastify Route Method Undefined issue

Route Methods are showing as `undefined` with `printRoutes()` for fastify > 3.12.0 and node v14.15.4

## Quick Start

```bash
npm install
npm run build
npm start
```

## Issue

The package.json lists fastify@3.12.0 for the initial install.
When you start the server, you will correctly see:

```bash
└── /
    ├── /
    ├── * (OPTIONS)
    └── health-
        ├── a/health (GET)
        ├── b/health (GET)
```

but if you then install fastify 3.14.0

```bash
npm i fastify@3.14.0
npm run build
npm start
```

you will then incorrectly see:

```bash
└── /
    ├── /
    ├── * (OPTIONS)
    └── health-
        ├── a/health (undefined)
        └── b/health (GET)
```

`a/health` is `undefined` instead of `GET`
