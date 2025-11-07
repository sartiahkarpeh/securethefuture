# Development Guide - Secure the Future

## 🚀 Quick Start

Your development server is already running at **http://localhost:3000**

### Available Pages

#### Public Pages

- **Homepage**: http://localhost:3000/
- **About**: http://localhost:3000/about
- **Stories**: http://localhost:3000/stories
- (More pages to be added)

#### Admin Panel

- **Dashboard**: http://localhost:3000/admin

---

## 📂 Project Structure Explained

### `/src/app` - Next.js App Router Pages

```
app/
├── layout.tsx              # Root layout (Header + Footer wrapper)
├── page.tsx                # Homepage
├── globals.css             # Global styles & Tailwind
├── about/
│   └── page.tsx           # About page
├── stories/
│   └── page.tsx           # Stories listing page
└── admin/
    ├── layout.tsx         # Admin-specific layout (sidebar)
    └── page.tsx           # Admin dashboard
```

### `/src/components` - React Components

```
components/
├── ui/                    # Reusable UI components
│   ├── Button.tsx        # Button with variants
│   ├── Card.tsx          # Card container
│   ├── Input.tsx         # Form input
│   ├── Textarea.tsx      # Form textarea
│   ├── AnimateOnScroll.tsx  # Scroll animation wrapper
│   └── Counter.tsx       # Animated number counter
│
├── home/                 # Homepage sections
│   ├── Hero.tsx          # Hero section
│   ├── Mission.tsx       # Mission & values
│   ├── Statistics.tsx    # Stats with counters
│   ├── Stories.tsx       # Stories preview
│   ├── LatestNews.tsx    # News cards
│   ├── UpcomingEvents.tsx # Events showcase
│   ├── Resources.tsx     # Resource links
│   ├── GetInvolved.tsx   # Ways to help
│   └── Partners.tsx      # Partners & endorsements
│
└── layout/               # Layout components
    ├── Header.tsx        # Site header/navigation
    └── Footer.tsx        # Site footer
```

### `/src/lib` - Utilities & Data

```
lib/
├── utils.ts              # Utility functions
└── data.ts               # Sample/mock data
```

### `/src/types` - TypeScript Definitions

```
types/
└── index.ts              # All TypeScript interfaces
```

---

## 🎨 Using the Design System

### Colors

```tsx
// Primary (Blue) - Trust, stability
className = "bg-primary-600 text-primary-100";

// Hope (Green) - Recovery, growth
className = "bg-hope-600 text-hope-100";

// Serious (Gray) - Professional
className = "bg-serious-900 text-serious-100";
```

### Typography

```tsx
// Headings
<h1 className="text-4xl font-bold text-serious-900">
<h2 className="text-3xl font-bold text-serious-900">
<h3 className="text-xl font-bold text-serious-900">

// Body text
<p className="text-lg text-serious-600">
<p className="text-base text-serious-600">
```

### Using Components

```tsx
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

// Button examples
<Button variant="primary" size="lg">Click Me</Button>
<Button variant="outline">Secondary Action</Button>

// Card example
<Card hoverable className="custom-class">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

// Animation example
<AnimateOnScroll animation="slide-up" delay={100}>
  <YourContent />
</AnimateOnScroll>
```

---

## 🧩 Adding New Pages

### 1. Create a new page file

```tsx
// src/app/your-page/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Page | Secure the Future",
  description: "Page description for SEO",
};

export default function YourPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Your Page</h1>
        </div>
      </section>
    </div>
  );
}
```

### 2. Add to navigation

Edit `src/components/layout/Header.tsx`:

```tsx
const navigation = [
  { name: "Home", href: "/" },
  { name: "Your Page", href: "/your-page" }, // Add here
  // ... rest
];
```

---

## 🎭 Animation Patterns

### Scroll Animations

```tsx
// Fade in
<AnimateOnScroll animation="fade">
  <Content />
</AnimateOnScroll>

// Slide up
<AnimateOnScroll animation="slide-up" delay={100}>
  <Content />
</AnimateOnScroll>

// Scale in
<AnimateOnScroll animation="scale" delay={200}>
  <Content />
</AnimateOnScroll>
```

### Hover Effects

```tsx
// Buttons
className = "hover:bg-primary-700 transition-colors";

// Cards
className = "hover:shadow-lg hover:-translate-y-1 transition-all";

// Links
className = "hover:text-primary-600 transition-colors";
```

---

## 📊 Working with Data

### Sample Data Usage

```tsx
import { sampleStories, sampleNews, sampleEvents } from "@/lib/data";

export default function Page() {
  return (
    <div>
      {sampleStories.map((story) => (
        <div key={story.id}>
          <h3>{story.title}</h3>
          <p>{story.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### Type Safety

```tsx
import { Story } from "@/types";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return <div>{story.title}</div>;
}
```

---

## 🎯 Common Tasks

### Add a new section to homepage

1. Create component in `src/components/home/YourSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to the page component

```tsx
// src/app/page.tsx
import YourSection from "@/components/home/YourSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <YourSection /> {/* Add here */}
      {/* ... rest */}
    </>
  );
}
```

### Create a reusable component

```tsx
// src/components/ui/YourComponent.tsx
interface YourComponentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function YourComponent({
  title,
  description,
  children,
}: YourComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h3 className="font-bold">{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
```

### Add a utility function

```tsx
// src/lib/utils.ts
export function yourUtilityFunction(param: string): string {
  // Your logic here
  return result;
}

// Usage
import { yourUtilityFunction } from "@/lib/utils";
const result = yourUtilityFunction("test");
```

---

## 🔍 Debugging Tips

### Check the terminal

Your dev server shows compilation errors and warnings

### Check the browser console

Press F12 to see runtime errors

### TypeScript errors

```bash
# Check all TypeScript errors
npx tsc --noEmit
```

### Lint issues

```bash
npm run lint
```

---

## 📱 Testing Responsive Design

### Browser DevTools

1. Press F12
2. Click the device toggle button
3. Test different screen sizes:
   - Mobile: 375px, 414px
   - Tablet: 768px, 1024px
   - Desktop: 1280px, 1920px

### Breakpoints in Code

```tsx
// Tailwind breakpoints
sm:  // 640px
md:  // 768px
lg:  // 1024px
xl:  // 1280px

// Example
<div className="px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
```

---

## ⚡ Performance Tips

### Optimize Images

```tsx
import Image from "next/image";

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={600}
  height={400}
  loading="lazy"
/>;
```

### Lazy Load Components

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});
```

---

## 🐛 Common Issues & Solutions

### Port already in use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Tailwind classes not working

1. Check `tailwind.config.ts` includes your files
2. Restart dev server
3. Make sure classes are not dynamic strings

---

## 📚 Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Icons

- [Lucide Icons](https://lucide.dev) - All icons used in project

### Color Palette

- Primary: #0ea5e9 (blue-500)
- Hope: #22c55e (green-500)
- Serious: #0f172a (slate-900)

---

## 🎓 Learning Path

### Beginner

1. Learn React basics
2. Understand Next.js routing
3. Master Tailwind utility classes
4. Practice with TypeScript

### Intermediate

1. State management
2. API integration
3. Form handling
4. Authentication

### Advanced

1. Performance optimization
2. SEO best practices
3. Server components
4. Database integration

---

## 💡 Pro Tips

1. **Use TypeScript**: Catch errors before runtime
2. **Component composition**: Build small, reusable components
3. **Consistent spacing**: Use Tailwind's spacing scale
4. **Accessibility**: Test with keyboard navigation
5. **Mobile first**: Design for mobile, then scale up
6. **Git commits**: Make small, focused commits
7. **Code comments**: Explain "why", not "what"

---

**Happy coding! 🚀**

For questions or issues, check the PROJECT_SUMMARY.md or README.md files.
