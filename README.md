# South Florida Caterers — Website

Production-ready catering website built with Next.js 14, Tailwind CSS, Framer Motion, and React Hook Form.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup Steps

### Step 1 — Connect the Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — copy the form ID (looks like `xabc1234`)
3. In `components/InquiryForm.tsx`, replace `REPLACE_WITH_YOUR_ID` with your form ID
4. All inquiries will arrive at southfloridacaterers@gmail.com

### Step 2 — Set Up Google Voice

1. Go to [voice.google.com](https://voice.google.com) using the southfloridacaterers@gmail.com account
2. Choose a South Florida area code (305 or 954)
3. Replace `(XXX) XXX-XXXX` in `components/Footer.tsx` with your Google Voice number

### Step 3 — Deploy to Vercel

```bash
npm run build
npx vercel deploy
```

Or connect this repo to [vercel.com](https://vercel.com) for automatic deploys on push.

### Step 4 — Add Real Photos

Replace the chef photo placeholder in `components/About.tsx` with an actual image. Add food photography as desired.

### Step 5 — Update Pricing

Menu prices are listed as "From market price" — update in `components/Menu.tsx` with real pricing once finalized.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with custom design tokens
- **Forms:** React Hook Form + Zod validation + Formspree
- **Animations:** Framer Motion
- **Fonts:** Playfair Display (headings) + DM Sans (body)
- **Deployment:** Vercel
