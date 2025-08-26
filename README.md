# SIMD Tracking Frontend

A modern web application for tracking and visualizing Solana Improvement Documents (SIMDs) voting status and validator participation.

## Overview

This Next.js application provides a comprehensive interface for monitoring SIMD proposals in the Solana ecosystem, displaying voting metrics, validator votes, and proposal statuses in real-time.

## Features

- **SIMD Dashboard**: Browse and filter all SIMD proposals
- **Detailed SIMD Views**: View individual SIMD details, voting metrics, and validator participation
- **Validator Tracking**: Monitor how validators vote on different proposals
- **Visual Analytics**: Interactive charts showing voting distribution and participation rates
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd simd-tracking-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=your-api-endpoint-here
NEXT_PUBLIC_USE_MOCK_DATA=false
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint | Required (no default) |
| `NEXT_PUBLIC_USE_MOCK_DATA` | Use mock data for development | `false` |

## Project Structure

```
simd-tracking-frontend/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── simd/              # SIMD routes
│       └── [title]/       # Dynamic SIMD detail pages
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── simd/             # SIMD-specific components
│   └── validators/       # Validator components
├── lib/                   # Utility functions and API
│   ├── api/              # API client and hooks
│   ├── formatters.ts     # Data formatting utilities
│   └── utils.ts          # General utilities (includes cn helper)
├── public/               # Static assets
└── components.json       # shadcn/ui configuration
```

## API Integration

The application connects to a backend API for SIMD data. The API client is configured in `lib/api/client.ts` and provides the following endpoints:

- `GET /simds` - List all SIMDs
- `GET /simd/{title}` - Get SIMD details
- `GET /simd/{title}/validators` - Get validator votes for a SIMD

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
