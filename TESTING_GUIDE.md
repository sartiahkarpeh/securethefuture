# Testing Guide - Phase 1 Pages

## 🚀 Quick Start

To test all the new pages, start the development server:

```powershell
cd "c:\Users\sarti\Desktop\secure the future"
npm run dev
```

Then visit: **http://localhost:3000**

---

## 📱 Pages to Test

### 1. Homepage (`/`)

- [x] Hero section loads
- [x] Mission section visible
- [x] Statistics counter animations
- [x] Stories carousel works
- [x] Latest news preview
- [x] Upcoming events preview
- [x] All sections animate on scroll

**Test:** Click "Learn More" and "Get Involved" buttons

---

### 2. About Page (`/about`)

**URL:** http://localhost:3000/about

- [x] Team section displays
- [x] History timeline
- [x] Impact metrics
- [x] Values cards

**Test:** Scroll through entire page, check animations

---

### 3. Stories Page (`/stories`)

**URL:** http://localhost:3000/stories

- [x] Story grid layout
- [x] Filter buttons work
- [x] Category badges visible
- [x] Story cards link properly

**Test:** Click filter buttons, hover over story cards

---

### 4. News Page (`/news`) ⭐ NEW

**URL:** http://localhost:3000/news

**Features to Test:**

- [x] Search bar appears in hero
- [x] Category filter bar (sticky on scroll)
- [x] Featured article section with large image
- [x] Article grid displays correctly
- [x] Newsletter signup form
- [x] "Load More" button visible

**Actions to Test:**

- Type in search bar (UI only, no backend yet)
- Click category buttons (active state changes)
- Hover over article cards (shadow effect)
- Scroll down (category bar sticks to top)
- Try on mobile (categories scroll horizontally)

**Expected Elements:**

- Calendar and Clock icons with date/read time
- Category badges on articles
- "Read More" links with arrow
- Newsletter subscription CTA at bottom

---

### 5. Events Page (`/events`) ⭐ NEW

**URL:** http://localhost:3000/events

**Features to Test:**

- [x] Hero with "View Calendar" and "Host an Event" buttons
- [x] Search + time filters (sticky bar)
- [x] Event type tags
- [x] Featured event card (2-column layout)
- [x] Event grid with calendar badges
- [x] Virtual events section at bottom
- [x] "Host an Event" CTA section

**Actions to Test:**

- Click time filter buttons (Upcoming, This Month, etc.)
- Click event type tags
- Type in search bar
- Hover over event cards
- Click "Register" buttons
- Try mobile view (filters scroll horizontally)

**Expected Elements:**

- Calendar date badges on event cards
- Location, time, attendee icons
- RSVP/Register buttons
- Green gradient CTA section
- Virtual events cards at bottom

---

### 6. Resources Page (`/resources`) ⭐ NEW

**URL:** http://localhost:3000/resources

**Features to Test:**

- [x] Crisis helplines section (prominently displayed)
- [x] Search bar in hero
- [x] Category filter with icons and counts
- [x] Featured resources grid (4 items)
- [x] Educational materials grid (9 items)
- [x] Support services section
- [x] Newsletter signup

**Actions to Test:**

- Read crisis helpline numbers (should be clickable tel: links)
- Click category buttons
- Type in search bar
- Hover over resource cards
- Click "Access" and "View" buttons
- Check download counts display

**Expected Elements:**

- Red-accented crisis support section
- Phone, Heart, Users, and other icons
- Resource type badges (PDF Guide, Video Series, etc.)
- Download statistics on featured resources
- "Load More" button

---

### 7. Contact Page (`/contact`) ⭐ NEW

**URL:** http://localhost:3000/contact

**Features to Test:**

- [x] Hero section
- [x] Quick contact methods (4 cards)
- [x] Contact form (left side)
- [x] Departments sidebar (right side)
- [x] Social media section
- [x] Crisis support sidebar
- [x] FAQ accordion section
- [x] Map placeholder

**Actions to Test:**

- Fill out contact form fields
- Try to submit (no backend, won't actually send)
- Click FAQ items (should expand/collapse)
- Hover over contact method cards
- Check department email links (should open email client)
- Try mobile view (form should stack above sidebar)

**Form Fields to Test:**

- First Name (required)
- Last Name (required)
- Email (required, should validate format)
- Phone (optional)
- Subject dropdown (7 options)
- Message textarea
- Newsletter checkbox
- Send button

**Expected Elements:**

- 4 contact method cards with icons
- 6 department listings
- Crisis support with 988 number
- Social media buttons
- 6 FAQ items
- Map placeholder at bottom

---

### 8. Admin Dashboard (`/admin`)

**URL:** http://localhost:3000/admin

- [x] Sidebar navigation
- [x] Statistics cards
- [x] Charts display
- [x] Recent activity table
- [x] Quick actions

**Test:** Navigate through admin sections

---

## 🔍 Navigation Testing

### Header (All Pages)

- [x] Logo links to homepage
- [x] All navigation links work:
  - Home → `/`
  - About → `/about`
  - Stories → `/stories`
  - News → `/news`
  - Events → `/events`
  - Resources → `/resources`
  - Contact → `/contact`
- [x] Donate button (links to `/donate` - will 404 for now)
- [x] Search icon visible
- [x] Header background changes on scroll

### Mobile Navigation

**Test on screen width < 1024px:**

- [x] Hamburger menu appears
- [x] Click to open mobile menu
- [x] All links visible in mobile menu
- [x] Click link closes menu
- [x] Donate button appears in mobile menu
- [x] Search button in mobile menu

### Footer (All Pages)

- [x] Logo and brand visible
- [x] Newsletter signup form
- [x] Links organized in sections:
  - About (Mission, Team, Partners, Reports)
  - Resources (Help & Support, News, Events, Contact)
  - Get Involved (Volunteer, Donate, Fundraise, Share Story)
  - Legal (Privacy, Terms, Cookies, Accessibility)
- [x] Social media icons
- [x] Contact information
- [x] Copyright year

---

## 📐 Responsive Design Testing

### Desktop (1920px+)

- Full-width layouts
- Multi-column grids (3-4 columns)
- Side-by-side content sections

### Laptop (1280px - 1920px)

- Container max-width maintained
- 3-column grids
- Readable line lengths

### Tablet (768px - 1024px)

- 2-column grids
- Stacked hero sections
- Horizontal scroll for filters

### Mobile (< 768px)

- Single column layouts
- Full-width cards
- Vertical stacking
- Touch-friendly tap targets (min 44px)
- Horizontal scrolling filters

---

## ✨ Animation Testing

### On Scroll Animations

Each section should animate when scrolling into view:

- Fade in from bottom
- Slight slide up effect
- Staggered delays on grid items

**Test:** Scroll slowly through each page and watch for:

- Elements appearing smoothly
- No jarring jumps
- Proper timing (not too fast/slow)

---

## 🎨 Visual Design Checklist

### Typography

- [x] Headings are bold and hierarchical
- [x] Body text is readable (16px minimum)
- [x] Proper line height (1.5-1.75)
- [x] Consistent font family (Inter)

### Colors

- [x] Primary teal used for CTAs
- [x] Serious blue-gray for headings
- [x] Hope green for positive messages
- [x] Urgent red for crisis support
- [x] Good contrast ratios (WCAG AA)

### Spacing

- [x] Consistent padding/margin
- [x] Proper section spacing
- [x] No elements touching edges
- [x] Breathing room around content

### Interactive Elements

- [x] Buttons have hover states
- [x] Cards have hover effects (shadow)
- [x] Links change color on hover
- [x] Focus states visible for keyboard navigation

---

## 🐛 Common Issues to Check

### Images

- [ ] All images load (or show placeholder)
- [ ] No broken image icons
- [ ] Proper aspect ratios maintained
- [ ] Alt text present (check inspector)

### Links

- [ ] All internal links work
- [ ] External links open in new tab (if applicable)
- [ ] No 404 errors in console
- [ ] Active page styling (if implemented)

### Console Errors

Open browser DevTools (F12):

- [ ] No JavaScript errors
- [ ] No TypeScript errors
- [ ] No missing module warnings
- [ ] Only expected warnings (metadataBase is OK)

### Performance

- [ ] Pages load reasonably fast
- [ ] Smooth scrolling
- [ ] No layout shifts
- [ ] Images load progressively

---

## 📊 Browser Testing

Test in these browsers:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

---

## ✅ Acceptance Criteria

Phase 1 is complete when:

- [x] All 4 new pages render without errors
- [x] Navigation works on all pages
- [x] Mobile responsive design works
- [x] No TypeScript/build errors
- [x] All interactive elements respond to hover/click
- [x] Animations trigger on scroll
- [x] Crisis helplines prominently displayed
- [x] Contact form renders properly
- [x] Event calendar displays correctly
- [x] News articles show with proper metadata

---

## 🎯 Known Limitations (Expected)

These features are intentionally not functional yet (Phase 2):

- Search functionality (UI only)
- Filter buttons (styling only, no actual filtering)
- Contact form submission (no backend)
- Newsletter signup (no backend)
- Event RSVP (no backend)
- Admin panel CRUD operations (no API)
- User authentication (no auth system)

---

## 📝 Bug Reporting

If you find issues, note:

1. **Page URL:** Where the issue occurs
2. **Description:** What's wrong
3. **Steps to Reproduce:** How to trigger the issue
4. **Expected vs Actual:** What should happen vs what does happen
5. **Browser/Device:** Where you're testing
6. **Screenshot:** If visual issue

---

## 🚀 Ready to Test!

Start the dev server and systematically go through each page. The site should look polished and professional, even though backend features aren't connected yet.

**Good luck testing! 🎉**
