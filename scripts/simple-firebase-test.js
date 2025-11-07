// Simple Firebase Admin test
const admin = require('firebase-admin');

async function simpleTest() {
  try {
    console.log('Initializing...');
    
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    
    console.log('✅ Initialized');
    console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
    
    const db = admin.firestore();
    console.log('✅ Got Firestore instance');
    
    // Try to write a simple document
    console.log('Attempting write...');
    await db.collection('_test').doc('test').set({
      message: 'hello',
      timestamp: admin.firestore.Timestamp.now()
    });
    
    console.log('✅ SUCCESS! Firestore is working!');
    
    // Clean up
    await db.collection('_test').doc('test').delete();
    console.log('✅ Cleaned up test data');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Code:', error.code);
    process.exit(1);
  }
}

require('dotenv').config({ path: '.env.local' });
simpleTest();
