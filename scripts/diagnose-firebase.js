/**
 * Comprehensive Firebase Diagnostic Script
 * This will help identify exactly what's wrong with the connection
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');
const https = require('https');

async function diagnoseFirebase() {
  console.log('\n🔍 Firebase Diagnostic Tool\n');
  console.log('='.repeat(60));
  
  // Step 1: Check environment variables
  console.log('\n1️⃣  Environment Variables Check:');
  console.log('-'.repeat(60));
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  console.log(`   Project ID: ${projectId ? '✅ ' + projectId : '❌ Missing'}`);
  console.log(`   Client Email: ${clientEmail ? '✅ ' + clientEmail : '❌ Missing'}`);
  console.log(`   Private Key: ${privateKey ? `✅ ${privateKey.length} characters` : '❌ Missing'}`);
  
  if (!projectId || !clientEmail || !privateKey) {
    console.log('\n❌ Missing required credentials!');
    return;
  }
  
  // Step 2: Check private key format
  console.log('\n2️⃣  Private Key Format Check:');
  console.log('-'.repeat(60));
  const hasBeginMarker = privateKey.includes('-----BEGIN PRIVATE KEY-----');
  const hasEndMarker = privateKey.includes('-----END PRIVATE KEY-----');
  const hasNewlines = privateKey.includes('\n');
  
  console.log(`   Has BEGIN marker: ${hasBeginMarker ? '✅' : '❌'}`);
  console.log(`   Has END marker: ${hasEndMarker ? '✅' : '❌'}`);
  console.log(`   Has newlines: ${hasNewlines ? '✅' : '❌'}`);
  console.log(`   First 50 chars: ${privateKey.substring(0, 50)}...`);
  
  // Step 3: Test Firebase Admin initialization
  console.log('\n3️⃣  Firebase Admin SDK Initialization:');
  console.log('-'.repeat(60));
  
  try {
    const credential = admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    });
    
    const app = admin.initializeApp({
      credential,
      databaseURL: `https://${projectId}.firebaseio.com`
    });
    
    console.log('   ✅ Firebase Admin SDK initialized successfully');
    console.log(`   App name: ${app.name}`);
  } catch (error) {
    console.log(`   ❌ Initialization failed: ${error.message}`);
    return;
  }
  
  // Step 4: Check Firebase project status via REST API
  console.log('\n4️⃣  Firebase Project Status (REST API):');
  console.log('-'.repeat(60));
  
  try {
    const token = await admin.credential.applicationDefault().getAccessToken();
    console.log('   ✅ Got access token');
    console.log(`   Token preview: ${token.access_token.substring(0, 20)}...`);
  } catch (error) {
    console.log(`   ⚠️  Could not get access token: ${error.message}`);
  }
  
  // Step 5: Test Firestore connection
  console.log('\n5️⃣  Firestore Connection Test:');
  console.log('-'.repeat(60));
  
  try {
    const db = admin.firestore();
    console.log('   ✅ Got Firestore instance');
    
    // Try to list collections
    console.log('   Attempting to list collections...');
    const collections = await db.listCollections();
    console.log(`   ✅ Successfully listed ${collections.length} collections`);
    collections.forEach(col => console.log(`      - ${col.id}`));
    
  } catch (error) {
    console.log(`   ❌ Firestore operation failed`);
    console.log(`   Error code: ${error.code || 'N/A'}`);
    console.log(`   Error message: ${error.message}`);
    
    // Provide specific guidance based on error
    console.log('\n💡 Troubleshooting:');
    if (error.code === 16 || error.message.includes('UNAUTHENTICATED')) {
      console.log('   This error usually means:');
      console.log('   1. Service account doesn\'t have permissions');
      console.log('   2. Firestore API is not enabled');
      console.log('   3. Service account key is invalid or expired');
      console.log('   4. Project billing is not set up correctly');
    }
  }
  
  // Step 6: Try direct Firestore REST API call
  console.log('\n6️⃣  Direct Firestore REST API Test:');
  console.log('-'.repeat(60));
  
  try {
    const credential = admin.credential.applicationDefault();
    const accessToken = await credential.getAccessToken();
    
    const options = {
      hostname: 'firestore.googleapis.com',
      path: `/v1/projects/${projectId}/databases/(default)/documents`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, data }));
      });
      req.on('error', reject);
      req.end();
    });
    
    console.log(`   HTTP Status: ${response.status}`);
    if (response.status === 200) {
      console.log('   ✅ Direct REST API call successful!');
    } else {
      console.log(`   ❌ REST API call failed`);
      console.log(`   Response: ${response.data}`);
    }
    
  } catch (error) {
    console.log(`   ⚠️  REST API test failed: ${error.message}`);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Diagnostic complete!\n');
}

diagnoseFirebase().catch(error => {
  console.error('\n❌ Diagnostic script error:', error);
  process.exit(1);
});
