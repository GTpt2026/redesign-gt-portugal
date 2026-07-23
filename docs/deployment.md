# Deployment — Vercel

GT Portugal is hosted on Vercel. Every push to `main` triggers an automatic deployment.

---

## First-time setup

1. Go to [vercel.com](https://vercel.com) and sign in (or create a free account)
2. Click **Add New → Project**
3. Import the `gt-portugal` repository from GitHub
4. Vercel will auto-detect Next.js — no build settings needed
5. Before deploying, add environment variables (see below)
6. Click **Deploy**

---

## Environment variables on Vercel

Vercel needs the same variables as your local `.env` file.

1. Go to your project on Vercel → **Settings → Environment Variables**
2. Add each variable from `.env.example` with its real value
3. Set the environment to **Production** (and **Preview** if you want them in preview deployments too)
4. Redeploy after adding variables — they don't apply to existing deployments

---

## Preview deployments

Every pull request automatically gets its own preview URL (e.g. `gt-portugal-abc123.vercel.app`).
Use these to review changes before merging to `main`.

---

## Custom domain

1. Vercel → **Settings → Domains**
2. Add your domain (e.g. `gtportugal.com`)
3. Follow the DNS instructions Vercel provides — you'll update records with your domain registrar
4. HTTPS is automatic once DNS propagates (usually under 24 hours)

---

## Useful commands

```bash
npm run build     # Test the production build locally before deploying
npm run start     # Run the production build locally at http://localhost:3000
```

Always run `npm run build` before pushing to `main` to catch any build errors early.
