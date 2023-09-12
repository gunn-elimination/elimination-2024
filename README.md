[![Netlify Status](https://api.netlify.com/api/v1/badges/5193f97d-be1d-4953-967c-093aad0c8d28/deploy-status)](https://app.netlify.com/sites/gunn-elimination-2024/deploys)

# Gunn Elimination 2024

The 2024 Elimination website is developed using the SUKIT tech stack (Supabase + SvelteKit). I'm not using Firebase cuz FKIT. Please open a pull request if you want to contribute.

## Getting Started

> [!IMPORTANT]
> You'll need some environment variables to connect to the database and develop locally. Contact [@ThePickleGawd](https://github.com/ThePickleGawd) if you'd like to contribute. Copy them into a new file called `.env` in the root directory.

See our [wiki!](https://github.com/gunn-elimination/elimination-2024/wiki)

See [Supabase API Docs](https://supabase.com/dashboard/project/yihigqyfdifpodmnguxr/api) for our project! (requires project access)

## Developing

Install Dependences
```bash
npm install
```
Run Development Server
```bash
npm run dev
```

## Building

We have CI/CD setup with Netlify so that pushing to the main branch will build and deploy to the website.

## TODOs

- Make sure it is production ready. See [Supabase email rate limits](https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits)
- Loading indicators to make it feel responsive
