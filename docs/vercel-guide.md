# Vercel deployment guide

This guide explains how to deploy your own private instance of
GitHub Readme Streak Stats – Vercel Fork.
Each user runs their own serverless API, with no shared limits and no dependency on external servers.

## 🎯 Why deploy your own instance?

The original project (and many forks) still route requests through a shared backend.

This causes:
- rate limit issues
- concurrency problems
- inconsistent streak data
- random failures

This fork is designed for true self‑hosting:
- every user gets their own API
- every user uses their own GitHub rate limits
- no shared traffic
- no bottlenecks
- no dependency on the original author
Deploying your own instance ensures 100% reliability.



## Prerrequisites
- Account in [Vercel](https://vercel.com) (free)
- Account in GitHub
- This repository fork (optional but recommended)
No GitHub token is required.
No database is required.
No configuration is required.

## Methode 1: Deploy with one click (RECOMENDED)

Click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/FlavioKde/github-readme-streak-stats)

Deploy with Vercel (vercel.com)
Vercel will:
1. 	Clone the repository
2. 	Create a new project
3. 	Configure everything automatically
4. 	Deploy your API in seconds
When finished, your API will be available at:

```bash

https://<your-project>.vercel.app/api/streak/svg?user=YOUR_GITHUB_USERNAME

```

## Method 2: Manual deployment
```bash
# 1. Clone this fork
git clone https://github.com/FlavioKde/github-readme-streak-stats.git

# 2. Install Vercel CLI
npm i -g vercel

# 3. Deployment init
vercel

# 4. Follow the instruccions
(Vercel will ask for project name, scope, etc.)

# 5. To producción:
vercel --prod

```
Your production URL will look like:

```bash

https://<your-project>.vercel.app

```

## 🧪 Testing your deployment

Try opening:

```bash

https://<your-project>.vercel.app/api/streak/svg?user=YOUR_USERNAME

```

## 🧩 Using it in your GitHub README

Add this to your README:

```bash

![GitHub Streak](https://<your-project>.vercel.app/api/streak/svg?user=YOUR_USERNAME&theme=dark)

```

## ⚙️ Optional configuration

This fork does not require environment variables.
Everything works out of the box.

## ⚙️ Optional: Environment Variables (Advanced Users)

This project works without any environment variables.

All GitHub contribution data is fetched using public GraphQL queries, so no authentication is required.
However, advanced users may optionally configure:
 (optional)

Use this if you want:
-	higher GitHub rate limits
- 	more stable development
-	to bypass GitHub’s anonymous request throttling
 (optional)

Useful only for local testing.
If these variables are not set, the project will still work normally.

## 🔐 GitHub Token (Optional but recommended)

This project works without a GitHub token using public GraphQL queries.

However, providing a token is recommended for:

- higher rate limits
- better reliability
- avoiding anonymous request throttling

To configure it:

```bash

GITHUB_TOKEN=your_token_here

```

## 🧯 Troubleshooting

❌ The SVG shows an error
Check that:
• 	the  parameter is correct
• 	your GitHub username exists
• 	your Vercel project is deployed correctly
❌ Vercel shows a 500 error
Try redeploying:

```bash

vercel --prod

```

## ❌ The SVG does not update

GitHub caches images aggressively.

Use the  parameter:

```bash

&v=2

```

## ❓ FAQ

**Do I need a GitHub token?**
No. This fork uses public GitHub GraphQL queries.

**Does this consume my GitHub rate limit?**
Yes — but only for your own instance, not shared with others.

**Can I use this in my GitHub README?**
Yes, that’s the main purpose.

**Does it cost money?**
No.
Vercel’s free tier is more than enough.

## 🎉 Done!
Your private instance is ready.
You now have a reliable, fast, serverless GitHub streak API — fully under your control.