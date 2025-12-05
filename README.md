This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## iPhone / PWA notes

This app includes a minimal `public/manifest.json` and web app meta tags in `app/layout.tsx` to enable "Add to Home Screen" behavior on iOS and Android. For best results on iPhone:

- Add proper PNG icons in `public/` (recommended sizes: 192x192, 512x512, and `apple-touch-icon.png` at 180x180). Replace the temporary `file.svg` references in `public/manifest.json` and `app/layout.tsx` with those PNGs.
 - Add proper PNG icons in `public/` (recommended sizes: 192x192, 512x512, and `apple-touch-icon.png` at 180x180). Replace the temporary `file.svg` references in `public/manifest.json` and `app/layout.tsx` with those PNGs.
	 You can generate placeholder icons with:

```bash
npm run generate-icons
```

	This creates small placeholder PNGs in `public/` you should replace with designed icons before production.
- Test by opening the site in Safari on iPhone and choosing "Add to Home Screen". If you want a full PWA experience (offline, service worker), add a service worker and more complete manifest entries.

Environment variables of note:
- `NEXTAUTH_SECRET` — used by NextAuth for signing JWTs.
- `COACH_SECRET` — used by the Credentials provider to authenticate coach role (for local/dev only). Set a secure value in production.

If you want, I can add PNG placeholders and a simple service worker setup next.
