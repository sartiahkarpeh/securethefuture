/**
 * Firebase Connection Test Script
 * Run this to verify your Firebase configuration is working correctly
 * 
 * Usage: node scripts/test-firebase.js
 * or: npm run test:firebase (after adding to package.json scripts)
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// This file uses CommonJS for easy Node.js execution
const admin = require('firebase-admin');

async function testFirebaseConnection() {
  console.log('🔥 Testing Firebase Connection...\n');

  try {
    // Check environment variables
    console.log('📋 Checking environment variables...');
    const hasBase64 = !!process.env.FIREBASE_SERVICE_ACCOUNT;
    const hasIndividual = !!process.env.FIREBASE_PROJECT_ID;

    if (!hasBase64 && !hasIndividual) {
      console.error('❌ Missing Firebase credentials!');
      console.log('\n💡 You need either:');
      console.log('   - FIREBASE_SERVICE_ACCOUNT (base64 encoded)');
      console.log('   - OR: FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY');
      process.exit(1);
    }

    console.log('✅ Environment variables found');
    console.log(`   Using ${hasBase64 ? 'base64 service account' : 'individual credentials'}\n`);

    // Initialize Firebase Admin
    console.log('🔧 Initializing Firebase Admin SDK...');
    
    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Using base64 encoded service account
      const serviceAccount = JSON.parse(
        Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8')
      );
      credential = admin.credential.cert(serviceAccount);
    } else if (process.env.FIREBASE_PRIVATE_KEY) {
      // Using individual environment variables
      credential = admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    } else {
      console.error('❌ No Firebase credentials found!');
      console.log('\n💡 You need to add either:');
      console.log('   - FIREBASE_SERVICE_ACCOUNT (base64 encoded)');
      console.log('   - OR: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
      console.log('\nSee FIREBASE_SETUP_INSTRUCTIONS.md for details');
      process.exit(1);
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential,
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    }

    console.log('✅ Firebase Admin SDK initialized\n');

    // Test Firestore connection
    console.log('📊 Testing Firestore connection...');
    const db = admin.firestore();
    
    // Try to read from a collection (will work even if collection doesn't exist)
    const testCollection = await db.collection('_test').limit(1).get();
    console.log('✅ Firestore connection successful\n');

    // Try to write a test document
    console.log('✏️  Testing write operation...');
    const testDocRef = db.collection('_test').doc('connection_test');
    await testDocRef.set({
      message: 'Connection test successful',
      timestamp: admin.firestore.Timestamp.now(),
      environment: process.env.NODE_ENV || 'development',
    });
    console.log('✅ Write operation successful\n');

    // Try to read the test document
    console.log('📖 Testing read operation...');
    const testDoc = await testDocRef.get();
    if (testDoc.exists) {
      console.log('✅ Read operation successful');
      console.log('   Data:', testDoc.data());
    }
    console.log('');

    // Clean up test document
    console.log('🧹 Cleaning up test data...');
    await testDocRef.delete();
    console.log('✅ Cleanup complete\n');

    // Display project info
    console.log('📋 Firebase Project Info:');
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        const decoded = JSON.parse(
          Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf-8')
        );
        console.log('   Project ID:', decoded.project_id);
        console.log('   Client Email:', decoded.client_email);
      } catch (e) {
        console.log('   Using service account (details encrypted)');
      }
    } else {
      console.log('   Project ID:', process.env.FIREBASE_PROJECT_ID);
      console.log('   Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
    }
    console.log('');

    // Success summary
    console.log('🎉 All tests passed!');
    console.log('✅ Your Firebase configuration is working correctly');
    console.log('');
    console.log('Next steps:');
    console.log('1. Create Firestore database in Firebase Console (if not done)');
    console.log('2. Set up security rules');
    console.log('3. Create initial admin user');
    console.log('4. Convert remaining API routes');
    console.log('');
    console.log('See FIREBASE_SETUP_INSTRUCTIONS.md for detailed guidance');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Firebase connection test failed!\n');
    console.error('Error:', error.message);
    
    if (error.code === 'app/invalid-credential') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   1. Check that you generated a service account key from Firebase Console');
      console.log('   2. Verify FIREBASE_PRIVATE_KEY is properly formatted with \\n characters');
      console.log('   3. Ensure FIREBASE_CLIENT_EMAIL matches your service account');
      console.log('   4. Check that the service account has Firestore permissions');
    } else if (error.code === 'app/no-app') {
      console.log('\n💡 Firebase Admin SDK initialization failed');
      console.log('   Check your credential configuration in .env.local');
    } else {
      console.log('\n💡 Check the error message above for details');
      console.log('   See FIREBASE_SETUP_INSTRUCTIONS.md for setup guidance');
    }
    
    console.log('');
    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Run the test
testFirebaseConnection();
