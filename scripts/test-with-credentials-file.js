/**
 * Test Firebase connection using credentials file
 * This test uses a temporary credentials file instead of environment variables
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

async function testWithCredentialsFile() {
  console.log('\n🔧 Testing Firebase with credentials file...\n');

  // Create a temporary service account file
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: "dummy-key-id",
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: "dummy-client-id",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.FIREBASE_CLIENT_EMAIL)}`
  };

  const tempPath = path.join(__dirname, 'temp-service-account.json');
  
  try {
    // Write temporary credentials file
    fs.writeFileSync(tempPath, JSON.stringify(serviceAccount, null, 2));
    console.log('✅ Created temporary credentials file');

    // Initialize Firebase Admin with credentials file
    admin.initializeApp({
      credential: admin.credential.cert(tempPath),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    console.log('✅ Firebase Admin initialized');

    // Get Firestore instance
    const db = admin.firestore();
    console.log('✅ Got Firestore instance');

    // Try to write a test document
    console.log('\n📝 Attempting to write test document...');
    const testRef = db.collection('_test').doc('connection_test');
    await testRef.set({
      message: 'Connection test',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('✅ Successfully wrote test document!');

    // Try to read it back
    console.log('\n📖 Attempting to read test document...');
    const doc = await testRef.get();
    if (doc.exists) {
      console.log('✅ Successfully read test document!');
      console.log('   Data:', doc.data());
    }

    // Clean up
    await testRef.delete();
    console.log('✅ Cleaned up test document');

    console.log('\n✅ ALL TESTS PASSED! Firebase connection is working!\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.code) {
      console.error('   Error code:', error.code);
    }
    console.error('\n   Full error:', error);
  } finally {
    // Clean up temp file
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
      console.log('\n🧹 Cleaned up temporary credentials file');
    }
  }
}

// Run the test
testWithCredentialsFile().catch(console.error);
