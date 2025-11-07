# Firebase Setup Instructions for "The Future" Project

## ✅ Configuration Complete!

Your Firebase project credentials have been configured:

- **Project ID:** `the-future-7eb56`
- **Project Name:** The Future
- **Client Configuration:** ✅ Added to `.env.local`

## 🔐 Important: Generate Service Account Key

To enable server-side operations (required for API routes), you need to generate a service account key:

### Step 1: Go to Firebase Console

1. Open: https://console.firebase.google.com/project/the-future-7eb56/settings/serviceaccounts/adminsdk
2. Or navigate to: **Project Settings** → **Service Accounts** tab

### Step 2: Generate Private Key

1. Click the **"Generate new private key"** button
2. Click **"Generate key"** in the confirmation dialog
3. A JSON file will be downloaded to your computer

### Step 3: Update .env.local

You have two options:

#### Option A: Individual Fields (Easier)

1. Open the downloaded JSON file
2. Copy the values and update `.env.local`:

```env
FIREBASE_PROJECT_ID=the-future-7eb56
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@the-future-7eb56.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Actual_Private_Key\n-----END PRIVATE KEY-----\n"
```

**Important:** Keep the quotes around the private key and preserve the `\n` characters!

#### Option B: Base64 Encoded (Recommended for Production)

1. Encode the entire JSON file to base64
2. Update `.env.local`:

```env
FIREBASE_SERVICE_ACCOUNT=your_base64_encoded_json_here
```

To encode on Windows PowerShell:

```powershell
$content = Get-Content -Path "path\to\your\service-account.json" -Raw
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
```

### Step 4: Update JWT Secret

Generate a secure random string for JWT authentication:

```powershell
# PowerShell command to generate secure random string
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

Update in `.env.local`:

```env
JWT_SECRET=your_generated_secure_random_string
```

## 📊 Enable Firestore Database

1. Go to: https://console.firebase.google.com/project/the-future-7eb56/firestore
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll configure rules later)
4. Select your preferred location (e.g., `us-central1`)
5. Click **"Enable"**

## 🔒 Configure Firestore Security Rules

After creating the database, set up security rules:

1. Go to: https://console.firebase.google.com/project/the-future-7eb56/firestore/rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper function to check if content is published
    function isPublished() {
      return resource.data.published == true;
    }

    // Stories collection
    match /stories/{storyId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    // News articles collection
    match /news_articles/{articleId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    // Events collection
    match /events/{eventId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    // Resources collection
    match /resources/{resourceId} {
      allow read: if isPublished() || isAuthenticated();
      allow write: if isAuthenticated();
    }

    // RSVPs collection
    match /rsvps/{rsvpId} {
      allow create: if true; // Anyone can create RSVP
      allow read, update, delete: if isAuthenticated();
    }

    // Contact messages collection
    match /contact_messages/{messageId} {
      allow create: if true; // Anyone can submit contact form
      allow read, update, delete: if isAuthenticated();
    }

    // Newsletter subscribers collection
    match /newsletter_subscribers/{subscriberId} {
      allow create: if true; // Anyone can subscribe
      allow read, update, delete: if isAuthenticated();
    }

    // Tags collection
    match /tags/{tagId} {
      allow read: if true; // Public read
      allow write: if isAuthenticated();
    }

    // Users collection
    match /users/{userId} {
      allow read, write: if isAuthenticated();
    }

    // Media items collection
    match /media_items/{itemId} {
      allow read: if true; // Public read
      allow write: if isAuthenticated();
    }
  }
}
```

3. Click **"Publish"**

## 📁 Enable Firebase Storage (Optional)

For file uploads (images, documents, etc.):

1. Go to: https://console.firebase.google.com/project/the-future-7eb56/storage
2. Click **"Get started"**
3. Choose **"Start in production mode"**
4. Click **"Next"** → **"Done"**

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /documents/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🧪 Test Your Configuration

1. Restart your development server:

```powershell
npm run dev
```

2. Check for any Firebase initialization errors in the console

3. Test a simple Firestore operation to verify connection

## 📈 Create Firestore Indexes

For complex queries, you'll need composite indexes. Create them as needed when you see errors like:

> "The query requires an index"

Firebase will provide a direct link to create the required index.

Common indexes you'll need:

### Stories

- Collection: `stories`
- Fields: `published` (Ascending), `featured` (Ascending), `publishedAt` (Descending)

### News Articles

- Collection: `news_articles`
- Fields: `published` (Ascending), `category` (Ascending), `publishedAt` (Descending)

### Events

- Collection: `events`
- Fields: `published` (Ascending), `date` (Ascending)

### Resources

- Collection: `resources`
- Fields: `published` (Ascending), `category` (Ascending)

Create indexes at: https://console.firebase.google.com/project/the-future-7eb56/firestore/indexes

## ✅ Verification Checklist

- [ ] `.env.local` created with all credentials
- [ ] Service account key generated and added
- [ ] JWT_SECRET generated and added
- [ ] Firestore database created
- [ ] Firestore security rules configured
- [ ] Firebase Storage enabled (if needed)
- [ ] Development server restarted
- [ ] No Firebase errors in console

## 🚀 Next Steps

After completing the above:

1. **Create initial admin user** - You'll need to manually add a user document to Firestore
2. **Test authentication** - Try logging in with the admin user
3. **Migrate existing data** - Import data from SQLite to Firestore
4. **Convert remaining API routes** - Follow the `API_CONVERSION_GUIDE.md`
5. **Test all functionality** - Ensure everything works as expected

## 📝 Creating Your First Admin User

Until you convert all routes, you can manually create an admin user in Firestore:

1. Go to Firestore Console: https://console.firebase.google.com/project/the-future-7eb56/firestore/data
2. Click **"Start collection"**
3. Collection ID: `users`
4. Add document with these fields:
   - `email`: your-email@example.com (string)
   - `name`: Your Name (string)
   - `password`: Use bcrypt to hash your password (string)
   - `role`: ADMIN (string)
   - `avatar`: null
   - `createdAt`: Current timestamp
   - `updatedAt`: Current timestamp
   - `lastLogin`: null

To generate bcrypt hash for your password, run in Node:

```javascript
const bcrypt = require("bcryptjs");
console.log(bcrypt.hashSync("your-password", 10));
```

## 🆘 Troubleshooting

### Error: "Missing or insufficient permissions"

- Check Firestore security rules
- Ensure user is authenticated
- Verify rule conditions match your data structure

### Error: "The query requires an index"

- Click the link in the error message to create the index
- Or manually create it in Firebase Console

### Error: "Firebase Admin initialization error"

- Verify service account credentials in `.env.local`
- Ensure private key has proper formatting with `\n`
- Check that all required environment variables are set

### Error: "Failed to initialize Firebase"

- Verify all `NEXT_PUBLIC_*` variables are set
- Check for typos in configuration
- Restart development server

## 📚 Resources

- **Firebase Console:** https://console.firebase.google.com/project/the-future-7eb56
- **Firestore Database:** https://console.firebase.google.com/project/the-future-7eb56/firestore
- **Authentication:** https://console.firebase.google.com/project/the-future-7eb56/authentication
- **Storage:** https://console.firebase.google.com/project/the-future-7eb56/storage
- **Usage & Billing:** https://console.firebase.google.com/project/the-future-7eb56/usage

## 💰 Free Tier Limits

Monitor your usage to stay within free tier:

- **Firestore Reads:** 50,000/day
- **Firestore Writes:** 20,000/day
- **Firestore Deletes:** 20,000/day
- **Storage:** 1 GB
- **Bandwidth:** 10 GB/month

Check usage: https://console.firebase.google.com/project/the-future-7eb56/usage

---

**Your Firebase project is ready to use!** 🎉

Just complete the service account setup above and you're good to go!
