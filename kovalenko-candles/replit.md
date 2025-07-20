# Kovalenko Candles E-commerce Application

## Overview

This is a full-stack e-commerce application for Kovalenko Candles, built with React, Express, and PostgreSQL. The application tells the story of a Ukrainian family selling handmade candles, with an emotional narrative about supporting war-affected families. The frontend uses modern React with shadcn/ui components, while the backend provides REST API endpoints for products, orders, and payments via Stripe integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Ukrainian/sunflower theme colors
- **Routing**: Wouter for client-side routing
- **State Management**: Zustand for cart state with persistence
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Payment Processing**: Stripe integration for checkout
- **Session Management**: Express sessions with PostgreSQL store

## Key Components

### Database Schema
- **Users**: Customer accounts with Stripe customer ID integration
- **Products**: Candle inventory with categories, pricing, and featured flags
- **Orders**: Order management with customer details and payment status
- **Order Items**: Line items for each order
- **Newsletter Subscribers**: Email subscription management
- **Contact Messages**: Customer inquiries storage

### API Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `GET /api/products/featured` - Fetch featured products
- `POST /api/orders` - Create new order
- `POST /api/checkout/create-payment-intent` - Stripe payment setup
- `POST /api/newsletter` - Newsletter subscription
- `POST /api/contact` - Contact form submission

### Frontend Pages
- **Home**: Hero section, family story, featured products, testimonials
- **Products**: Product catalog with category filtering
- **Product Detail**: Individual product pages with add to cart
- **Cart**: Shopping cart management
- **Checkout**: Stripe payment integration
- **Contact**: Contact form
- **Account**: User order history and profile management

## Data Flow

1. **Product Display**: Products are fetched from the database via API and displayed with React Query caching
2. **Cart Management**: Cart state is managed with Zustand and persisted to localStorage
3. **Order Processing**: Orders are created in the database, then Stripe payment intents are generated
4. **Payment Flow**: Stripe Elements handle secure payment processing
5. **Email Collection**: Newsletter subscriptions and contact messages are stored in the database

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **drizzle-orm**: TypeScript ORM for database operations
- **stripe**: Payment processing integration
- **@tanstack/react-query**: Server state management
- **zustand**: Client state management

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds the React application to `dist/public`
2. **Backend**: esbuild bundles the Express server to `dist/index.js`
3. **Database**: Drizzle manages schema migrations via `drizzle-kit push`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe secret key for payments
- `VITE_STRIPE_PUBLIC_KEY`: Stripe public key for frontend

### Production Setup
- The application is designed for deployment on platforms like Replit
- Database migrations are handled through Drizzle Kit
- Static assets are served from the Express server in production
- Development mode uses Vite's dev server with HMR

## Recent Changes

### July 16, 2025 - Checkout Process Fixed
- Fixed "failed to set named property 'href' on 'location'" error in checkout
- Updated Stripe payment confirmation to use `redirect: "if_required"` instead of return_url
- Created order confirmation page at `/order-confirmation` route
- Successfully tested order creation and payment flow

The application emphasizes emotional storytelling around the Ukrainian family's journey while maintaining a professional e-commerce experience with modern web technologies.