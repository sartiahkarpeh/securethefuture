# Firestore Indexes Required

Firebase Firestore requires composite indexes when querying on multiple fields. This document lists the indexes needed for this application.

## How to Create Indexes

You can create indexes in two ways:

### Method 1: Click the Auto-Generated Links

When you see an error like "The query requires an index", Firebase provides a direct link in the error message. Click that link to automatically create the index in the Firebase Console.

### Method 2: Manual Creation in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **the-future-7eb56**
3. Click **Firestore Database** in the left sidebar
4. Click the **Indexes** tab
5. Click **Create Index**
6. Configure the index as specified below

## Required Indexes

### Resources Collection

**Index 1: published + createdAt (for sorting resources by date)**

- Collection ID: `resources`
- Fields:
  - `published` - Ascending
  - `createdAt` - Descending
- Query scope: Collection

**Auto-generated link from error:**

```
https://console.firebase.google.com/v1/r/project/the-future-7eb56/firestore/indexes?create_composite=ClJwcm9qZWN0cy90aGUtZnV0dXJlLTdlYjU2L2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9yZXNvdXJjZXMvaW5kZXhlcy9fEAEaDQoJcHVibGlzaGVkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg
```

**Status:** ⚠️ REQUIRED - Temporarily disabled orderBy in API to avoid this requirement

## Temporary Workaround

Currently, the `orderBy('createdAt', 'desc')` line in `/src/app/api/resources/route.ts` is commented out to allow the app to function without the index. Resources will be returned in an unspecified order until the index is created.

## To Enable Sorting:

1. Click the link above or manually create the index in Firebase Console
2. Wait 5-10 minutes for the index to build
3. Uncomment the orderBy line in `/src/app/api/resources/route.ts`:

   ```typescript
   // Change this:
   // query = query.orderBy('createdAt', 'desc');

   // To this:
   query = query.orderBy("createdAt", "desc");
   ```

4. Restart your development server

## Future Indexes

As you add more complex queries to other collections (stories, news, events), you'll need to create additional indexes. Firebase will provide auto-generated links in the error messages when these are needed.
