require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');

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

const users = [
  {
    email: 'admin@securethefuture.org',
    password: 'Admin123!',
    name: 'System Administrator',
    role: 'ADMIN',
    avatar: null,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
    lastLogin: null,
    active: true,
  },
  {
    email: 'editor@securethefuture.org',
    password: 'Editor123!',
    name: 'Content Editor',
    role: 'EDITOR',
    avatar: null,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
    lastLogin: null,
    active: true,
  },
  {
    email: 'viewer@securethefuture.org',
    password: 'Viewer123!',
    name: 'Content Viewer',
    role: 'VIEWER',
    avatar: null,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
    lastLogin: null,
    active: true,
  },
];

async function seedUsers() {
  console.log('🌱 Starting to seed users...\n');

  let addedCount = 0;
  let skippedCount = 0;

  for (const userData of users) {
    try {
      // Check if user already exists
      const existingUser = await db
        .collection('users')
        .where('email', '==', userData.email)
        .limit(1)
        .get();

      if (!existingUser.empty) {
        console.log(`⏭️  Skipped: ${userData.email} (already exists)`);
        skippedCount++;
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create user document
      const userDoc = {
        ...userData,
        password: hashedPassword,
      };

      const docRef = await db.collection('users').add(userDoc);

      console.log(`✅ Added: ${userData.name} (${userData.email})`);
      console.log(`   ID: ${docRef.id}`);
      console.log(`   Role: ${userData.role}`);
      console.log(`   Password: ${userData.password}\n`);

      addedCount++;
    } catch (error) {
      console.error(`❌ Error adding ${userData.email}:`, error.message);
    }
  }

  console.log('\n📊 Seeding complete!');
  console.log(`Successfully added: ${addedCount} users`);
  console.log(`Skipped (already exist): ${skippedCount} users`);
  console.log('\n🔐 Login Credentials:');
  console.log('Admin: admin@securethefuture.org / Admin123!');
  console.log('Editor: editor@securethefuture.org / Editor123!');
  console.log('Viewer: viewer@securethefuture.org / Viewer123!');

  process.exit(0);
}

seedUsers().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
