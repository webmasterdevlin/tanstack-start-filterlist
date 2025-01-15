# TanStack Filter List based on the Next.js 15 Filter List of @aurorascharff a.k.a. The RSC Queen 👸

Link to the Next.js 15 Filter List of @aurorascharff:
- https://github.com/aurorascharff/next15-filterlist

An interactive, progressively enhanced (not fully) project task manager with filtering using TanStack Start with Tailwind CSS and Prisma. It's been purposely slowed down to showcase the handling of loading state.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma Setup

You need decide between prisma local development with `sqlite` or a real database with for example `sqlserver`. Define it in the `schema.prisma` file.

Consider adding a `.env` file to the root of the project and using these inside `schema.prisma` with `env("DATABASE_URL")`, refer to `.env.sample`.

After switching, delete the `prisma/migrations` folder before running the migration command.

When using sqlserver, you need to migrate the database schema with:

```bash
npm run prisma.migrate
```

When using sqlite, initialize with:

```bash
npm run prisma.push
```

Seed prisma/seed.ts for initial data:

```sh
npm run prisma.seed
```

## Deploy on Vercel
- https://tanstack.com/router/latest/docs/framework/react/start/hosting
