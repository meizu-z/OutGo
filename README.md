# OutGo - Personal Expense Tracker

A sleek, mobile-first expense tracking application built with React and Supabase.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Phosphor Icons
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Render

## Design System

- **Background (Cream)**: `#E8D1A7`
- **Text/Dark (Espresso)**: `#442D1C`
- **Borders (Bronze)**: `#84592B`
- **Accents (Rust)**: `#743014`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env`
3. Fill in your Supabase credentials in `.env`

### 3. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the SQL to create tables and RLS policies

### 4. Run Development Server

```bash
npm run dev
```

## Features

### Wizard Flow (6 Steps)

1. **Amount**: Large number input for expense amount
2. **Category**: Grid of icon-based categories (Coffee, Transport, Utilities, Shopping, Health, Entertainment)
3. **Payment**: Select payment method (Cash, Card, Wallet)
4. **Date**: Quick select for Today/Yesterday or pick custom date
5. **Description**: Add optional note about the expense
6. **Success**: Confirmation with options to track another or finish

### Analytics Dashboard

- View spending by period (Today, Week, Month, Year)
- Transaction ledger with category icons
- Quick insights into spending patterns

## Database Schema

### Tables

- **payment_sources**: Store payment methods with privacy protection
- **transactions**: Track all expenses with full details

### Security

Row Level Security (RLS) ensures users can only access their own data.

## Deployment

Build for production:

```bash
npm run build
```

Deploy the `dist` folder to Render or your preferred hosting platform.
