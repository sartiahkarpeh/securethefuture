# 🔐 Admin Panel Login Instructions

## Login Credentials

The admin panel now has **3 test users** seeded in Firebase:

### 1. System Administrator (Full Access)

- **Email:** `admin@securethefuture.org`
- **Password:** `Admin123!`
- **Role:** ADMIN
- **Permissions:** Full access to all features

### 2. Content Editor

- **Email:** `editor@securethefuture.org`
- **Password:** `Editor123!`
- **Role:** EDITOR
- **Permissions:** Can create, edit, and publish content

### 3. Content Viewer

- **Email:** `viewer@securethefuture.org`
- **Password:** `Viewer123!`
- **Role:** VIEWER
- **Permissions:** Read-only access

## How to Access the Admin Panel

1. **Start the development server** (if not already running):

   ```bash
   npm run dev
   ```

2. **Navigate to the admin login page:**

   - Open your browser
   - Go to: `http://localhost:3000/admin/login`

3. **Login with admin credentials:**

   - Email: `admin@securethefuture.org`
   - Password: `Admin123!`

4. **Explore the dashboard:**
   - After successful login, you'll be redirected to `/admin`
   - The dashboard displays real-time statistics from Firebase:
     - Resources count
     - Stories count
     - News articles count
     - Events count
     - Contact messages count
     - Newsletter subscribers count

## Features of the New Admin Panel

### 🎨 Professional Dashboard

- **Real-time Statistics:** Live data fetched from Firebase APIs
- **Interactive Stat Cards:** 6 cards with hover animations and color coding
- **Quick Actions:** 4 primary action buttons with gradient backgrounds
  - Create New Resource
  - Create News Article
  - Create Event
  - Create Story
- **System Status Panel:** Monitor website, Firebase, backup, and security status
- **Site Info Widget:** Analytics overview with engagement metrics

### 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **HTTP-only Cookies:** Tokens stored securely in HTTP-only cookies
- **Bcrypt Password Hashing:** All passwords hashed with bcrypt (10 salt rounds)
- **Role-based Access Control:** ADMIN, EDITOR, VIEWER roles
- **Protected Routes:** Admin routes automatically redirect if not authenticated

### 📊 Dashboard Components

- **Loading States:** Skeleton loaders while fetching data
- **Error Handling:** Graceful error messages
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Dark Sidebar:** Professional navigation with active route highlighting
- **User Profile Section:** Shows logged-in user info with logout button

## Troubleshooting

### Login Not Working?

1. **Check Firebase connection:**

   ```bash
   node scripts/check-users.js
   ```

   This should show 3 users in Firebase.

2. **Check browser console:**

   - Open Developer Tools (F12)
   - Look for error messages
   - Check Network tab for API responses

3. **Check server logs:**

   - Look at the terminal where `npm run dev` is running
   - You should see detailed login logs with 🔐, 🔍, ✅, and ❌ emojis

4. **Verify .env.local file:**
   - Make sure all Firebase credentials are present
   - Check that FIREBASE_PRIVATE_KEY is properly formatted

### Still Having Issues?

Check the terminal output for detailed logs. The login endpoint now logs:

- Login attempt with email
- User lookup in Firebase
- Password comparison result
- Any errors that occur

## Next Steps

Once logged in, you can:

1. **View Real Statistics:** See actual counts from your Firebase database
2. **Navigate Admin Sections:** Use the sidebar to access different content types
3. **Create Content:** Click Quick Action buttons to create new content
4. **Monitor System Status:** Check that all services are running properly

## Technical Details

### Authentication Flow

1. User enters email/password
2. Frontend sends POST request to `/api/auth/login`
3. Backend verifies credentials against Firebase
4. If valid, generates JWT token
5. Token stored in HTTP-only cookie
6. User redirected to `/admin` dashboard
7. Dashboard fetches real-time stats from Firebase

### API Endpoints Used

- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Check authentication status
- `POST /api/auth/logout` - Clear session
- `GET /api/resources` - Fetch resources count
- `GET /api/contact` - Fetch contact messages count
- `GET /api/newsletter/subscribers` - Fetch subscribers count

### Database Collections

- `users` - Admin users with roles and hashed passwords
- `resources` - Educational resources
- `stories` - Community stories
- `news_articles` - News and updates
- `events` - Upcoming events
- `contact_messages` - Contact form submissions
- `newsletter_subscribers` - Email newsletter subscribers

---

**Ready to login!** 🚀

Go to: http://localhost:3000/admin/login
