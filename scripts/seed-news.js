// Seed news articles to Firebase
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
const COLLECTIONS = {
  NEWS_ARTICLES: 'news_articles',
  USERS: 'users',
};

// Get admin user ID
async function getAdminUser() {
  const usersSnapshot = await db
    .collection(COLLECTIONS.USERS)
    .where('role', '==', 'ADMIN')
    .limit(1)
    .get();
  
  if (usersSnapshot.empty) {
    throw new Error('No admin user found. Please run seed:users first.');
  }
  
  const adminDoc = usersSnapshot.docs[0];
  return {
    id: adminDoc.id,
    ...adminDoc.data(),
  };
}

const newsArticles = [
  {
    title: 'Rising Addiction Rates Among Youth: A Call to Action',
    slug: 'rising-addiction-rates-youth',
    excerpt: 'New research shows alarming trends in substance abuse among teenagers and young adults.',
    content: `<h2>Understanding the Crisis</h2>
<p>Recent studies have revealed a concerning increase in substance abuse among teenagers and young adults. This trend demands immediate attention from parents, educators, and community leaders.</p>

<h3>Key Findings</h3>
<ul>
<li>30% increase in substance abuse among teens aged 13-17</li>
<li>Social media and peer pressure identified as major factors</li>
<li>Mental health issues often co-occur with addiction</li>
<li>Early intervention programs show promising results</li>
</ul>

<h3>What Parents Can Do</h3>
<p>Open communication, education, and vigilance are key to prevention. Our organization offers free resources and workshops for families.</p>

<h3>Community Response</h3>
<p>Local communities are coming together to address this crisis through prevention programs, support groups, and treatment facilities.</p>`,
    category: 'Research',
    image: '/images/logo1.png', // Using existing logo as placeholder
    readTime: '6 min read',
    featured: true,
    published: true,
    publishedAt: new Date('2024-10-15'),
    tagIds: ['prevention', 'youth', 'research'],
  },
  {
    title: 'Community Recovery Walk: A Success Story',
    slug: 'community-recovery-walk-success',
    excerpt: 'Over 500 participants joined our annual recovery walk, celebrating sobriety and supporting those in recovery.',
    content: `<h2>A Day of Hope and Healing</h2>
<p>Our annual Community Recovery Walk brought together over 500 individuals, families, and supporters to celebrate recovery and raise awareness about addiction.</p>

<h3>Event Highlights</h3>
<ul>
<li>500+ participants from all walks of life</li>
<li>$50,000 raised for treatment programs</li>
<li>20 recovery stories shared on stage</li>
<li>Community resource fair with 30+ organizations</li>
</ul>

<h3>Impact on the Community</h3>
<p>The event not only raised crucial funds but also helped reduce stigma and foster a supportive community for those in recovery.</p>

<h3>Looking Forward</h3>
<p>Plans are already underway for next year's event, with an expanded program and more community involvement.</p>`,
    category: 'Events',
    image: '/images/logo1.png',
    readTime: '4 min read',
    featured: false,
    published: true,
    publishedAt: new Date('2024-10-10'),
    tagIds: ['events', 'community', 'recovery'],
  },
  {
    title: 'New Treatment Program Shows Promising Results',
    slug: 'new-treatment-program-results',
    excerpt: 'Innovative approach to addiction treatment demonstrates 75% success rate in first year.',
    content: `<h2>Revolutionary Treatment Approach</h2>
<p>A new holistic treatment program combining therapy, medication, and community support has shown remarkable success rates in its first year.</p>

<h3>Program Components</h3>
<ul>
<li>Evidence-based cognitive behavioral therapy</li>
<li>Medication-assisted treatment when appropriate</li>
<li>Peer support groups and mentoring</li>
<li>Family therapy and education</li>
<li>Job training and life skills development</li>
</ul>

<h3>Success Metrics</h3>
<p>After one year, 75% of participants remained sober, compared to the national average of 40% for traditional programs.</p>

<h3>Availability</h3>
<p>The program is now accepting new participants. Contact us for enrollment information and eligibility requirements.</p>`,
    category: 'Treatment',
    image: '/images/logo1.png',
    readTime: '5 min read',
    featured: true,
    published: true,
    publishedAt: new Date('2024-10-05'),
    tagIds: ['treatment', 'research', 'recovery'],
  },
  {
    title: 'Understanding Co-Occurring Disorders',
    slug: 'understanding-co-occurring-disorders',
    excerpt: 'Learn about the relationship between mental health and substance abuse.',
    content: `<h2>The Connection Between Mental Health and Addiction</h2>
<p>Many individuals struggling with addiction also face mental health challenges. Understanding this relationship is crucial for effective treatment.</p>

<h3>Common Co-Occurring Disorders</h3>
<ul>
<li>Depression and substance abuse</li>
<li>Anxiety disorders and addiction</li>
<li>PTSD and substance dependence</li>
<li>Bipolar disorder and addiction</li>
</ul>

<h3>Integrated Treatment</h3>
<p>Treating both conditions simultaneously leads to better outcomes. Our programs address both addiction and mental health.</p>

<h3>Getting Help</h3>
<p>If you or a loved one is struggling with both addiction and mental health issues, specialized treatment is available.</p>`,
    category: 'Education',
    image: '/images/logo1.png',
    readTime: '7 min read',
    featured: false,
    published: true,
    publishedAt: new Date('2024-09-28'),
    tagIds: ['mental-health', 'education', 'treatment'],
  },
  {
    title: 'Family Support Groups: Why They Matter',
    slug: 'family-support-groups-importance',
    excerpt: 'Addiction affects the whole family. Discover how support groups can help.',
    content: `<h2>The Family Impact of Addiction</h2>
<p>Addiction doesn't just affect the individual – it impacts the entire family system. Support groups provide crucial assistance for family members.</p>

<h3>Benefits of Family Support Groups</h3>
<ul>
<li>Understanding addiction as a disease</li>
<li>Learning healthy boundaries</li>
<li>Connecting with others in similar situations</li>
<li>Access to resources and expert guidance</li>
<li>Emotional support and validation</li>
</ul>

<h3>Our Support Groups</h3>
<p>We offer weekly support groups for families, with separate sessions for parents, spouses, and children of those struggling with addiction.</p>

<h3>Join Us</h3>
<p>All support groups are free and confidential. No registration required – just show up.</p>`,
    category: 'Support',
    image: '/images/logo1.png',
    readTime: '5 min read',
    featured: false,
    published: true,
    publishedAt: new Date('2024-09-20'),
    tagIds: ['family', 'support', 'education'],
  },
  {
    title: 'Opioid Crisis: Latest Updates and Resources',
    slug: 'opioid-crisis-updates-resources',
    excerpt: 'Stay informed about the ongoing opioid crisis and available help.',
    content: `<h2>Current State of the Opioid Crisis</h2>
<p>The opioid crisis continues to affect communities across the country. Here's what you need to know and how to get help.</p>

<h3>Recent Statistics</h3>
<ul>
<li>Over 80,000 opioid-related deaths annually</li>
<li>Fentanyl involved in majority of overdoses</li>
<li>Naloxone access has saved thousands of lives</li>
<li>Treatment availability is increasing</li>
</ul>

<h3>Prevention Efforts</h3>
<p>Communities are implementing prescription monitoring programs, increasing Naloxone distribution, and expanding treatment access.</p>

<h3>Get Help Now</h3>
<p>If you or someone you know is struggling with opioid addiction, help is available 24/7 through our crisis hotline.</p>`,
    category: 'Crisis',
    image: '/images/logo1.png',
    readTime: '6 min read',
    featured: true,
    published: true,
    publishedAt: new Date('2024-09-15'),
    tagIds: ['opioids', 'crisis', 'prevention'],
  },
];

async function seedNewsArticles() {
  console.log('🌱 Starting to seed news articles...\n');
  
  try {
    // Get admin user
    const adminUser = await getAdminUser();
    console.log(`✅ Found admin user: ${adminUser.email}\n`);
    
    let added = 0;
    let skipped = 0;
    
    for (const article of newsArticles) {
      // Check if article already exists
      const existing = await db
        .collection(COLLECTIONS.NEWS_ARTICLES)
        .where('slug', '==', article.slug)
        .limit(1)
        .get();
      
      if (!existing.empty) {
        console.log(`⏭️  Skipped: ${article.title} (already exists)`);
        skipped++;
        continue;
      }
      
      // Add article with admin as author
      const articleData = {
        ...article,
        authorId: adminUser.id,
        authorName: adminUser.name,
        authorEmail: adminUser.email,
        publishedAt: admin.firestore.Timestamp.fromDate(article.publishedAt),
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
      };
      
      const docRef = await db.collection(COLLECTIONS.NEWS_ARTICLES).add(articleData);
      console.log(`✅ Added: ${article.title}`);
      console.log(`   ID: ${docRef.id}`);
      console.log(`   Slug: ${article.slug}`);
      console.log(`   Category: ${article.category}`);
      console.log('');
      added++;
    }
    
    console.log('\n📊 Seeding complete!');
    console.log(`Successfully added: ${added} articles`);
    console.log(`Skipped (already exist): ${skipped} articles\n`);
    
  } catch (error) {
    console.error('❌ Error seeding news articles:', error);
    process.exit(1);
  }
}

seedNewsArticles();
