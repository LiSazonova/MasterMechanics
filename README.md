# Master Mechanics

Landing page for an auto repair shop in Odesa. React + Vite, three languages (EN / UA / RU), online booking via Vercel serverless → Telegram.

**Live:** [https://master-mechanics-yxq6.vercel.app](https://master-mechanics-yxq6.vercel.app)

## Stack

React · Vite · JavaScript · Custom i18n · Vercel Serverless · Telegram Bot API · Responsive Design

## Run locally

```bash
npm install
cp .env.example .env
# Fill TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env
npm run dev
```

Optional: set `VITE_SITE_URL` if it differs from production.

### Telegram setup

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the **token**.
2. Send any message to the bot (or add it to a group), then open  
   `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy **chat.id** into `TELEGRAM_CHAT_ID`.

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

- Build: `npm run build`
- Output: `dist`
- Environment variables (Production):
  - `VITE_SITE_URL=https://master-mechanics-yxq6.vercel.app`
  - `TELEGRAM_BOT_TOKEN` — bot token (server only, no `VITE_` prefix)
  - `TELEGRAM_CHAT_ID` — where booking messages are sent

Redeploy after adding or changing Telegram variables.
