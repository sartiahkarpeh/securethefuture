// Script to check users in Firebase
require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = admin.firestore();

async function checkUsers() {
  console.log('🔍 Checking users in Firebase...\n');
  
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    
    if (snapshot.empty) {
      console.log('❌ No users found in Firebase!');
      return;
    }
    
    console.log(`✅ Found ${snapshot.size} users:\n`);
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`User ID: ${doc.id}`);
      console.log(`  Email: ${data.email}`);
      console.log(`  Name: ${data.name}`);
      console.log(`  Role: ${data.role}`);
      console.log(`  Password (hashed): ${data.password ? data.password.substring(0, 20) + '...' : 'MISSING'}`);
      console.log(`  Created At: ${data.createdAt?.toDate().toISOString()}`);
      console.log('');
    });
    
    // Test getting user by email
    console.log('\n🧪 Testing getDocByField for admin@securethefuture.org...');
    const adminSnapshot = await usersRef.where('email', '==', 'admin@securethefuture.org').limit(1).get();
    
    if (adminSnapshot.empty) {
      console.log('❌ Admin user not found with email query!');
    } else {
      const adminDoc = adminSnapshot.docs[0];
      const adminData = adminDoc.data();
      console.log('✅ Admin user found:');
      console.log(`  ID: ${adminDoc.id}`);
      console.log(`  Email: ${adminData.email}`);
      console.log(`  Has password: ${!!adminData.password}`);
      console.log(`  Password starts with: ${adminData.password ? adminData.password.substring(0, 7) : 'N/A'}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkUsers();
