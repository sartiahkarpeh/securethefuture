/**
 * Seed Resources Data to Firestore
 * Run with: node scripts/seed-resources.js
 */

require('dotenv').config({ path: '.env.local' });

const admin = require('firebase-admin');
const { Timestamp } = require('firebase-admin/firestore');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

const sampleResources = [
  {
    title: 'Understanding Addiction: A Comprehensive Guide',
    slug: 'understanding-addiction-guide',
    category: 'EDUCATION',
    type: 'PDF',
    description: 'Learn about the science of addiction, risk factors, and pathways to recovery.',
    author: 'Dr. Sarah Johnson',
    publisher: 'National Institute on Drug Abuse',
    duration: '45 pages',
    downloads: 12450,
    fileUrl: '/resources/understanding-addiction.pdf',
    image: '/images/resources/addiction-guide.jpg',
    featured: true,
    published: true,
    tags: ['addiction', 'education', 'science', 'recovery'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Recovery Toolkit for Families',
    slug: 'recovery-toolkit-families',
    category: 'FAMILY',
    type: 'PDF',
    description: 'Practical strategies for supporting a loved one in recovery.',
    author: 'Family Support Network',
    publisher: 'Secure the Future',
    duration: '32 pages',
    downloads: 8930,
    fileUrl: '/resources/family-toolkit.pdf',
    image: '/images/resources/family-toolkit.jpg',
    featured: true,
    published: true,
    tags: ['family', 'support', 'recovery', 'toolkit'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Prevention Workshop Series',
    slug: 'prevention-workshop-series',
    category: 'EDUCATION',
    type: 'VIDEO',
    description: '10-part video series on preventing substance abuse in communities.',
    author: 'Prevention Team',
    publisher: 'Secure the Future',
    duration: '10 videos',
    downloads: 15200,
    url: 'https://youtube.com/playlist?list=example',
    image: '/images/resources/workshop-series.jpg',
    featured: true,
    published: true,
    tags: ['prevention', 'education', 'video', 'community'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Professional Training Modules',
    slug: 'professional-training-modules',
    category: 'PROFESSIONAL',
    type: 'ARTICLE',
    description: 'Certification course for healthcare and education professionals.',
    author: 'Dr. Michael Chen',
    publisher: 'Professional Development Institute',
    duration: '8 weeks',
    downloads: 5670,
    url: '/resources/professional-training',
    image: '/images/resources/professional-training.jpg',
    featured: true,
    published: true,
    tags: ['professional', 'training', 'certification', 'healthcare'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'The Science of Addiction',
    slug: 'science-of-addiction',
    category: 'EDUCATION',
    type: 'ARTICLE',
    description: 'Understanding how addiction affects the brain and body.',
    author: 'Research Team',
    publisher: 'Secure the Future',
    duration: '10 min read',
    downloads: 7800,
    url: '/resources/science-of-addiction',
    image: '/images/resources/science.jpg',
    featured: false,
    published: true,
    tags: ['science', 'education', 'brain', 'research'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Recognizing Warning Signs',
    slug: 'recognizing-warning-signs',
    category: 'PREVENTION',
    type: 'INFOGRAPHIC',
    description: 'Visual guide to identifying early signs of substance abuse.',
    author: 'Prevention Team',
    publisher: 'Secure the Future',
    duration: 'Quick view',
    downloads: 9200,
    fileUrl: '/resources/warning-signs.pdf',
    image: '/images/resources/warning-signs.jpg',
    featured: false,
    published: true,
    tags: ['prevention', 'warning signs', 'infographic'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Talking to Your Teen About Drugs',
    slug: 'talking-teen-about-drugs',
    category: 'FAMILY',
    type: 'PDF',
    description: 'Conversation starters and tips for parents.',
    author: 'Parenting Experts',
    publisher: 'Family Support Network',
    duration: '15 min read',
    downloads: 11500,
    fileUrl: '/resources/teen-talk.pdf',
    image: '/images/resources/teen-talk.jpg',
    featured: false,
    published: true,
    tags: ['family', 'teens', 'prevention', 'parenting'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Recovery Success Stories',
    slug: 'recovery-success-stories',
    category: 'RECOVERY',
    type: 'VIDEO',
    description: 'Inspiring stories from people in long-term recovery.',
    author: 'Community Team',
    publisher: 'Secure the Future',
    duration: '25 minutes',
    downloads: 6800,
    url: 'https://youtube.com/watch?v=example',
    image: '/images/resources/success-stories.jpg',
    featured: false,
    published: true,
    tags: ['recovery', 'stories', 'inspiration', 'video'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Medication-Assisted Treatment Options',
    slug: 'medication-assisted-treatment',
    category: 'TREATMENT',
    type: 'ARTICLE',
    description: 'Overview of evidence-based medication options for addiction treatment.',
    author: 'Medical Team',
    publisher: 'Treatment Research Institute',
    duration: '12 min read',
    downloads: 5400,
    url: '/resources/mat-options',
    image: '/images/resources/mat.jpg',
    featured: false,
    published: true,
    tags: ['treatment', 'medication', 'evidence-based'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Building a Support Network',
    slug: 'building-support-network',
    category: 'RECOVERY',
    type: 'TOOL',
    description: 'Interactive worksheet for mapping your recovery support system.',
    author: 'Recovery Team',
    publisher: 'Secure the Future',
    duration: 'Interactive',
    downloads: 4200,
    fileUrl: '/resources/support-network.pdf',
    image: '/images/resources/support-network.jpg',
    featured: false,
    published: true,
    tags: ['recovery', 'support', 'worksheet', 'tools'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Coping Strategies for Triggers',
    slug: 'coping-strategies-triggers',
    category: 'RECOVERY',
    type: 'PDF',
    description: 'Practical techniques for managing cravings and triggers.',
    author: 'Clinical Team',
    publisher: 'Recovery Institute',
    duration: '8 min read',
    downloads: 8700,
    fileUrl: '/resources/coping-strategies.pdf',
    image: '/images/resources/coping.jpg',
    featured: false,
    published: true,
    tags: ['recovery', 'coping', 'triggers', 'strategies'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    title: 'Understanding Dual Diagnosis',
    slug: 'understanding-dual-diagnosis',
    category: 'TREATMENT',
    type: 'ARTICLE',
    description: 'Information about co-occurring mental health and substance use disorders.',
    author: 'Dr. Lisa Martinez',
    publisher: 'Mental Health Institute',
    duration: '14 min read',
    downloads: 6100,
    url: '/resources/dual-diagnosis',
    image: '/images/resources/dual-diagnosis.jpg',
    featured: false,
    published: true,
    tags: ['treatment', 'mental health', 'dual diagnosis'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

async function seedResources() {
  console.log('\n🌱 Starting to seed resources...\n');

  try {
    const resourcesRef = db.collection('resources');
    let successCount = 0;
    let errorCount = 0;

    for (const resource of sampleResources) {
      try {
        // Check if resource already exists
        const existing = await resourcesRef.where('slug', '==', resource.slug).limit(1).get();
        
        if (!existing.empty) {
          console.log(`⏭️  Skipping "${resource.title}" - already exists`);
          continue;
        }

        // Add resource
        const docRef = await resourcesRef.add(resource);
        console.log(`✅ Added: "${resource.title}" (ID: ${docRef.id})`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error adding "${resource.title}":`, error.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Seeding complete!`);
    console.log(`   ✅ Successfully added: ${successCount} resources`);
    console.log(`   ⏭️  Skipped (already exist): ${sampleResources.length - successCount - errorCount}`);
    if (errorCount > 0) {
      console.log(`   ❌ Errors: ${errorCount}`);
    }
    console.log('');

  } catch (error) {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seedResources()
  .then(() => {
    console.log('✨ Seeding process completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding process failed:', error);
    process.exit(1);
  });
