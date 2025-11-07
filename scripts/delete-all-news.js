const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const db = admin.firestore();

async function deleteAllNews() {
  try {
    console.log('Fetching all news articles...');
    const snapshot = await db.collection('NEWS_ARTICLES').get();
    
    if (snapshot.empty) {
      console.log('No news articles found.');
      return;
    }

    console.log(`Found ${snapshot.size} news articles. Deleting...`);

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log('✓ All news articles deleted successfully!');
  } catch (error) {
    console.error('Error deleting news articles:', error);
  } finally {
    process.exit(0);
  }
}

deleteAllNews();
