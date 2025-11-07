// Script to create Firestore indexes
// Note: This script provides the index configuration and instructions
// Firestore indexes must be created via Firebase Console or Firebase CLI

require('dotenv').config({ path: '.env.local' });

const indexes = [
  {
    collection: 'resources',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ],
    queryScope: 'COLLECTION'
  },
  {
    collection: 'resources',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'category', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ],
    queryScope: 'COLLECTION'
  },
  {
    collection: 'resources',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'type', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ],
    queryScope: 'COLLECTION'
  },
  {
    collection: 'resources',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'featured', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ],
    queryScope: 'COLLECTION'
  },
  {
    collection: 'news_articles',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'publishedAt', order: 'DESCENDING' }
    ],
    queryScope: 'COLLECTION'
  },
  {
    collection: 'stories',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ],
    queryScope: 'COLLECTION'
  },
  {
    collection: 'events',
    fields: [
      { fieldPath: 'published', order: 'ASCENDING' },
      { fieldPath: 'startDate', order: 'ASCENDING' }
    ],
    queryScope: 'COLLECTION'
  }
];

console.log('📋 Firestore Indexes Configuration\n');
console.log('═'.repeat(70));
console.log('\n🔧 Required Indexes for Secure The Future:\n');

indexes.forEach((index, i) => {
  console.log(`\n${i + 1}. Collection: ${index.collection}`);
  console.log('   Fields:');
  index.fields.forEach(field => {
    console.log(`   - ${field.fieldPath} (${field.order})`);
  });
});

console.log('\n\n═'.repeat(70));
console.log('\n📖 HOW TO CREATE INDEXES:\n');

console.log('Method 1: Firebase Console (Recommended - Easiest)');
console.log('─'.repeat(70));
console.log('1. Go to Firebase Console: https://console.firebase.google.com');
console.log('2. Select your project: the-future-7eb56');
console.log('3. Navigate to: Firestore Database → Indexes');
console.log('4. Click "Create Index" for each index above');
console.log('5. Or click the link from error messages (auto-creates index)\n');

console.log('Method 2: Firebase CLI');
console.log('─'.repeat(70));
console.log('1. Install Firebase CLI: npm install -g firebase-tools');
console.log('2. Login: firebase login');
console.log('3. Create firestore.indexes.json in project root');
console.log('4. Run: firebase deploy --only firestore:indexes\n');

console.log('Method 3: Click Error Link (Easiest!)');
console.log('─'.repeat(70));
console.log('1. Run your app and trigger a query that needs an index');
console.log('2. Check the error message for a URL');
console.log('3. Click the URL to auto-create the index in Firebase Console');
console.log('4. Wait 5-10 minutes for index to build\n');

console.log('\n═'.repeat(70));
console.log('\n📝 Firestore indexes.json Configuration:\n');

const firestoreIndexesJson = {
  indexes: indexes.map(index => ({
    collectionGroup: index.collection,
    queryScope: index.queryScope,
    fields: index.fields
  }))
};

console.log(JSON.stringify(firestoreIndexesJson, null, 2));

console.log('\n\n═'.repeat(70));
console.log('\n🚀 QUICK START:\n');
console.log('For Resources API, click this link to create the primary index:');
console.log('\n' + '─'.repeat(70));
console.log('https://console.firebase.google.com/v1/r/project/the-future-7eb56/firestore/indexes?create_composite=ClJwcm9qZWN0cy90aGUtZnV0dXJlLTdlYjU2L2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9yZXNvdXJjZXMvaW5kZXhlcy9fEAEaDQoJcHVibGlzaGVkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg');
console.log('─'.repeat(70));

console.log('\n\n✅ After creating indexes:');
console.log('1. Wait 5-10 minutes for indexes to build');
console.log('2. Uncomment orderBy in /api/resources/route.ts');
console.log('3. Restart your dev server');
console.log('4. Resources will display in chronological order\n');
