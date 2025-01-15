# TanStack Filter List based on the Next.js 15 Filter List of @aurorascharff a.k.a. The RSC Queen 👸

An interactive, progressively enhanced (not fully) project task manager with filtering using Next.js 15 with Tailwind CSS and Prisma. It's been purposely slowed down to showcase the handling of loading state.

See `filter-provider` branch for a context API version, which batches all filters into a single state, fixing the problem of them being discarded when toggling across multiple.

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

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
