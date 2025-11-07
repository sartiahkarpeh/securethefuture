# Firebase Migration Guide

## Overview

This guide outlines the migration from Prisma/SQLite to Firebase Firestore for the Secure the Future application.

## What Changed

### Database System

- **Before:** Prisma ORM with SQLite
- **After:** Firebase Firestore (NoSQL document database)

### Key Changes

1. **Database Library:** Replaced `@prisma/client` with `firebase` and `firebase-admin`
2. **Query Syntax:** Changed from Prisma queries to Firestore queries
3. **Data Model:** Migrated from relational tables to Firestore collections
4. **Authentication:** Still using JWT, but data storage moved to Firestore

## Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Get Firebase Configuration

#### Client Configuration (Public)

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Copy the configuration values

#### Server Configuration (Private)

1. In Firebase Console, go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. You can either:
   - Base64 encode the entire JSON file
   - OR extract individual values (project_id, client_email, private_key)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Client-side Firebase config (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Server-side Firebase Admin config (Private - KEEP SECRET!)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# OR use base64 encoded service account
# FIREBASE_SERVICE_ACCOUNT=base64_encoded_service_account_json

# JWT Secret
JWT_SECRET=your_secure_random_string_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode" or "Start in test mode"
4. Select a location (choose closest to your users)

### 5. Configure Security Rules

In Firestore, set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to published content
    match /stories/{story} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null;
    }

    match /news_articles/{article} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null;
    }

    match /events/{event} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null;
    }

    match /resources/{resource} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null;
    }

    match /rsvps/{rsvp} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    match /contact_messages/{message} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    match /newsletter_subscribers/{subscriber} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    match /tags/{tag} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /users/{user} {
      allow read, write: if request.auth != null;
    }

    match /media_items/{item} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Firestore Collections Structure

### Collections Overview

```
/users
  - id (auto-generated)
  - email
  - name
  - password (hashed)
  - role (ADMIN, EDITOR, VIEWER)
  - avatar
  - createdAt (timestamp)
  - updatedAt (timestamp)
  - lastLogin (timestamp)

/stories
  - id (auto-generated)
  - title
  - slug (unique)
  - name
  - age
  - type (VIDEO, AUDIO, TEXT)
  - category
  - excerpt
  - content
  - image
  - videoUrl
  - audioUrl
  - duration
  - featured (boolean)
  - published (boolean)
  - publishedAt (timestamp)
  - authorId (reference)
  - createdAt (timestamp)
  - updatedAt (timestamp)

/news_articles
  - id (auto-generated)
  - title
  - slug (unique)
  - excerpt
  - content
  - category
  - image
  - readTime
  - featured (boolean)
  - published (boolean)
  - publishedAt (timestamp)
  - authorId (reference)
  - tags (array of tag IDs)
  - createdAt (timestamp)
  - updatedAt (timestamp)

/events
  - id (auto-generated)
  - title
  - slug (unique)
  - description
  - type (COMMUNITY_EVENT, SUPPORT_GROUP, etc.)
  - date (timestamp)
  - time
  - endTime
  - location
  - address
  - virtualLink
  - attendees
  - maxAttendees
  - image
  - organizer
  - contactEmail
  - contactPhone
  - featured (boolean)
  - published (boolean)
  - registrationRequired (boolean)
  - registrationUrl
  - organizerId (reference)
  - tags (array of tag IDs)
  - createdAt (timestamp)
  - updatedAt (timestamp)

/rsvps
  - id (auto-generated)
  - eventId (reference)
  - name
  - email
  - phone
  - message
  - createdAt (timestamp)

/resources
  - id (auto-generated)
  - title
  - slug (unique)
  - description
  - category
  - type (PDF, VIDEO, AUDIO, etc.)
  - url
  - fileUrl
  - image
  - featured (boolean)
  - published (boolean)
  - downloads
  - views
  - creatorId (reference)
  - tags (array of tag IDs)
  - createdAt (timestamp)
  - updatedAt (timestamp)

/media_items
  - id (auto-generated)
  - filename
  - originalName
  - mimeType
  - size
  - url
  - alt
  - caption
  - width
  - height
  - uploadedById (reference)
  - tags (array of tag IDs)
  - createdAt (timestamp)

/tags
  - id (auto-generated)
  - name (unique)
  - slug (unique)
  - createdAt (timestamp)

/contact_messages
  - id (auto-generated)
  - firstName
  - lastName
  - email
  - phone
  - subject
  - message
  - newsletter (boolean)
  - status (UNREAD, READ, REPLIED, ARCHIVED)
  - createdAt (timestamp)

/newsletter_subscribers
  - id (auto-generated)
  - email (unique)
  - name
  - active (boolean)
  - confirmedAt (timestamp)
  - createdAt (timestamp)
  - updatedAt (timestamp)
```

## Data Migration

### Option 1: Manual Data Import (Recommended for Small Datasets)

1. Export data from SQLite using Prisma Studio
2. Format data for Firestore
3. Import using Firebase Console or admin SDK

### Option 2: Automated Migration Script

Create a migration script (`scripts/migrate-to-firebase.ts`):

```typescript
// This script would read from SQLite and write to Firestore
// Implementation depends on your specific data
```

## API Routes Updates

All API routes have been updated to use Firestore instead of Prisma:

- `/api/auth/login` - Updated to use `getDocByField` and `updateDoc`
- `/api/auth/me` - Updated to use `getDocById`
- `/api/events` - Updated to use Firestore queries
- `/api/news` - Updated to use Firestore queries
- `/api/resources` - Updated to use Firestore queries
- `/api/stories` - Updated to use Firestore queries
- `/api/contact` - Updated to use Firestore queries
- `/api/newsletter` - Updated to use Firestore queries
- `/api/tags` - Updated to use Firestore queries

## Common Firestore Operations

### Create Document

```typescript
import { createDoc, COLLECTIONS } from "@/lib/firestore-helpers";

const newStory = await createDoc(COLLECTIONS.STORIES, {
  title: "My Story",
  slug: "my-story",
  // ... other fields
});
```

### Read Document

```typescript
import { getDocById, COLLECTIONS } from "@/lib/firestore-helpers";

const story = await getDocById(COLLECTIONS.STORIES, storyId);
```

### Update Document

```typescript
import { updateDoc, COLLECTIONS } from "@/lib/firestore-helpers";

await updateDoc(COLLECTIONS.STORIES, storyId, {
  title: "Updated Title",
});
```

### Delete Document

```typescript
import { deleteDoc, COLLECTIONS } from "@/lib/firestore-helpers";

await deleteDoc(COLLECTIONS.STORIES, storyId);
```

### Query Documents

```typescript
import { adminDB, COLLECTIONS } from "@/lib/firestore-helpers";

const stories = await adminDB
  .collection(COLLECTIONS.STORIES)
  .where("published", "==", true)
  .where("featured", "==", true)
  .orderBy("publishedAt", "desc")
  .limit(10)
  .get();

const data = stories.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
```

## Removing Prisma

After successful migration, you can remove Prisma:

```bash
npm uninstall @prisma/client prisma
```

Remove these files/folders:

- `/prisma` folder
- `prisma/dev.db` file

Update `package.json` to remove Prisma scripts:

- `db:generate`
- `db:migrate`
- `db:seed`
- `db:studio`
- `db:reset`

## Testing

1. Test authentication (login/logout)
2. Test CRUD operations for all entities
3. Test API endpoints
4. Test admin panel functionality
5. Test public-facing pages

## Rollback Plan

If you need to rollback:

1. Keep your SQLite database backup
2. Keep the Prisma schema file
3. Reinstall Prisma: `npm install @prisma/client prisma`
4. Restore old API route files from git

## Performance Considerations

### Firestore Best Practices

1. **Denormalize data** - Duplicate data when needed for faster reads
2. **Use composite indexes** - Create indexes for complex queries
3. **Limit query results** - Always use `.limit()` for pagination
4. **Batch operations** - Use batch writes for multiple updates
5. **Avoid deep collections** - Keep collection structure flat

### Indexes

Create composite indexes in Firebase Console for:

- Stories: `published` + `featured` + `publishedAt`
- News: `published` + `category` + `publishedAt`
- Events: `published` + `date`
- Resources: `published` + `category`

## Cost Optimization

Firebase has free tier limits:

- 50K reads/day
- 20K writes/day
- 20K deletes/day
- 1GB stored
- 10GB/month bandwidth

To stay within limits:

1. Cache data on client side
2. Use pagination
3. Implement read/write optimizations
4. Monitor usage in Firebase Console

## Support

For issues:

1. Check Firebase Console logs
2. Review Firestore security rules
3. Verify environment variables
4. Check API route logs

## Next Steps

After completing this migration:

1. Set up Firebase Storage for file uploads
2. Consider Firebase Authentication for enhanced auth
3. Implement Firebase Analytics
4. Set up Firebase Hosting for deployment
5. Configure backup/export strategies

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guides](https://firebase.google.com/docs/firestore)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Security Rules Reference](https://firebase.google.com/docs/firestore/security/get-started)
