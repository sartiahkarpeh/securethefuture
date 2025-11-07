// Firebase Admin SDK configuration for server-side operations
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let app: App;

// Initialize Firebase Admin SDK
if (!getApps().length) {
  try {
    // Check if we're using service account file or environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Using service account JSON file
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8')
      );
      
      app = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      // Using individual environment variables
      app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    throw new Error('Failed to initialize Firebase Admin SDK');
  }
} else {
  app = getApps()[0];
}

// Export Firestore and Auth instances
export const adminDB: Firestore = getFirestore(app);
export const adminAuth = getAuth(app);

// Collection names for type safety
export const COLLECTIONS = {
  USERS: 'users',
  STORIES: 'stories',
  NEWS_ARTICLES: 'news_articles',
  EVENTS: 'events',
  RSVPS: 'rsvps',
  RESOURCES: 'resources',
  MEDIA_ITEMS: 'media_items',
  TAGS: 'tags',
  CONTACT_MESSAGES: 'contact_messages',
  NEWSLETTER_SUBSCRIBERS: 'newsletter_subscribers',
} as const;

export default app;
