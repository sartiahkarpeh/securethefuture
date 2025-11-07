require('dotenv').config({ path: '.env.local' });
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function checkArticle() {
  try {
    const slug = 'the-man-the-myth-the-legend';
    console.log(`Checking for article with slug: ${slug}`);
    
    const snapshot = await db.collection('NEWS_ARTICLES')
      .where('slug', '==', slug)
      .get();
    
    if (snapshot.empty) {
      console.log('❌ Article not found in Firebase');
      
      // Check all articles
      const allArticles = await db.collection('NEWS_ARTICLES').get();
      console.log(`\nTotal articles in collection: ${allArticles.size}`);
      
      if (allArticles.size > 0) {
        console.log('\nExisting articles:');
        allArticles.forEach(doc => {
          const data = doc.data();
          console.log(`- ${data.slug} (published: ${data.published})`);
        });
      }
    } else {
      console.log('✅ Article found!');
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log('\nArticle data:');
        console.log(JSON.stringify(data, null, 2));
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkArticle();
