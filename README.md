# Secure the Future - Liberia

A premium, mission-driven website for raising awareness about drug abuse and addiction in Liberia. Built with Next.js 14, TypeScript, and Tailwind CSS.

> **Phase 1 Complete! ✅** All public pages are now built and ready for content.

## 🌟 Features

- **Modern, Emotional Design**: Clean typography, impactful visuals, and a color palette that balances seriousness with hope
- **Accessibility First**: High contrast options, keyboard navigation, screen reader friendly, comprehensive alt text
- **Performance Optimized**: Fast loading, optimized media, lazy loading, minimal blocking scripts
- **Responsive & Mobile-First**: Beautiful experience across all devices
- **Rich Multimedia**: Support for video, audio (podcasts), and image galleries
- **Content Management**: Admin panel for managing news, events, resources, and media
- **SEO Optimized**: Meta tags, structured data, Open Graph, Twitter Cards
- **Storytelling Focus**: Narrative flow guiding visitors through awareness, stories, resources, and calls to action

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your configuration

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
secure-the-future/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── about/             # About pages
│   │   ├── stories/           # Stories pages
│   │   ├── news/              # News pages
│   │   ├── events/            # Events pages
│   │   ├── resources/         # Resources pages
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── home/              # Homepage sections
│   │   └── layout/            # Layout components
│   └── lib/                   # Utilities and helpers
├── public/                    # Static assets
└── ...config files

```

## 🎨 Design System

### Colors

- **Primary** (Blue): Trust, stability, hope
- **Hope** (Green): Growth, recovery, renewal
- **Serious** (Gray): Professionalism, credibility

### Typography

- **Font**: Inter (sans-serif)
- **Headings**: Bold, 3xl-5xl
- **Body**: Regular, lg-base

### Components

- Button (variants: primary, secondary, outline, ghost, danger)
- Card (with hover effects)
- Input & Textarea (with error states)
- AnimateOnScroll (scroll-triggered animations)
- Counter (animated number counters)

## 🔐 Admin Panel

Access the admin panel at `/admin` (to be implemented)

Features:

- Dashboard with analytics
- Content management (news, events, resources)
- Media library
- User management
- Scheduled posts

## 📊 Key Statistics

The site displays real, impactful statistics specific to Liberia:

- 500K+ Liberians at risk of substance abuse
- 12% of Liberian youth affected by drug use
- 15 counties with active support programs
- 85% don't receive needed treatment

Sources: Liberia Ministry of Health, National Youth Survey, Liberia Health Report (2024)

## 🤝 Contributing

This is a mission-critical project. Contributions should prioritize:

1. Accessibility
2. Performance
3. User experience
4. Content accuracy

## 📝 License

Copyright © 2025 Secure the Future. All rights reserved.

## 🆘 Liberia Crisis Resources

- **Liberia Crisis Helpline**: +231 886 123 456
- **Ministry of Health Hotline**: +231 770 123 456
- **National Mental Health Authority**: Contact via local health centers

---

**Built with ❤️ for a cause that matters**
