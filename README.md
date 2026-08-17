# Mário Serafim — Portfolio MVP

Editorial portfolio for creative direction, art direction, branding and digital experiences.

## Development

Requires Node.js 22. Install dependencies and run the development script defined in `package.json`. Run the production build before deployment.

## Content and assets

- Project records live in `data/projects.ts`.
- Product records live in `data/products.ts`.
- Every gray image/video area is an intentional placeholder. Its label states the expected role or aspect ratio.
- Add final assets under `public/projects/<slug>/` or `public/products/<slug>/`, then replace the matching placeholder with `next/image` or an accessible video element.

## Adding projects and products

Add a project record to `data/projects.ts`; Work, Archive and the case route all use that source. Add products to `data/products.ts`. Products can remain `coming-soon` until files and checkout are ready. Never place paid downloads under `public`.

## Stripe — future phase

Copy `.env.example` to `.env.local` and add real values only when checkout is implemented. The current checkout and webhook endpoints intentionally return a demonstration response. Future paid downloads should use private storage and expiring signed URLs.

## Deployment

The project is configured for OpenAI Sites and a Cloudflare-compatible build. Replace the temporary `example.com` base in `app/sitemap.ts` and `app/robots.ts` with the production domain before launch.
