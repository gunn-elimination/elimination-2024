[![Netlify Status](https://api.netlify.com/api/v1/badges/5193f97d-be1d-4953-967c-093aad0c8d28/deploy-status)](https://app.netlify.com/sites/gunn-elimination-2024/deploys)

# Gunn Elimination 2024

The 2024 Elimination website is developed using the SUKIT tech stack (Supabase + SvelteKit). I'm not using Firebase cuz FKIT. Please open a pull request if you want to contribute.

## Getting Started

You'll need access to the Supabase keys in order to test the backend locally. Contact [@ThePickleGawd]("https://github.com/ThePickleGawd) if you'd like to contribute. Copy them into `.env` in the root directory.

## Developing

Once you've cloned the project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

We have CI/CD setup with Netlify so that pushing to the main branch will build and deploy to the website.

## TODOs

- Make sure it is production ready. See [Supabase email rate limits](https://supabase.com/docs/guides/platform/going-into-prod#auth-rate-limits)
