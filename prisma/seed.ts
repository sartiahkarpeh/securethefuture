import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@securethefuture.org' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@securethefuture.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'addiction' },
      update: {},
      create: { name: 'Addiction', slug: 'addiction' },
    }),
    prisma.tag.upsert({
      where: { slug: 'recovery' },
      update: {},
      create: { name: 'Recovery', slug: 'recovery' },
    }),
    prisma.tag.upsert({
      where: { slug: 'prevention' },
      update: {},
      create: { name: 'Prevention', slug: 'prevention' },
    }),
    prisma.tag.upsert({
      where: { slug: 'support' },
      update: {},
      create: { name: 'Support', slug: 'support' },
    }),
    prisma.tag.upsert({
      where: { slug: 'family' },
      update: {},
      create: { name: 'Family', slug: 'family' },
    }),
  ]);

  console.log('✅ Tags created:', tags.length);

  // Create sample stories
  const story1 = await prisma.story.create({
    data: {
      title: "From Darkness to Light: Sarah's Journey",
      slug: 'sarah-recovery-journey',
      name: 'Sarah M.',
      age: 32,
      type: 'VIDEO',
      category: 'Recovery Story',
      excerpt: 'After 10 years of struggling with addiction, Sarah found hope and a path to recovery. Her story inspires thousands.',
      content: 'Full story content here...',
      image: '/images/stories/sarah.jpg',
      videoUrl: 'https://youtube.com/watch?v=example',
      duration: '12:34',
      featured: true,
      published: true,
      authorId: adminUser.id,
    },
  });

  const story2 = await prisma.story.create({
    data: {
      title: 'A Father\'s Fight: Tom\'s Story of Redemption',
      slug: 'tom-redemption-story',
      name: 'Tom R.',
      age: 45,
      type: 'TEXT',
      category: 'Family Impact',
      excerpt: 'Tom shares how addiction affected his family and the long road to rebuilding trust and relationships.',
      content: 'Full story content here...',
      image: '/images/stories/tom.jpg',
      featured: false,
      published: true,
      authorId: adminUser.id,
    },
  });

  console.log('✅ Stories created:', 2);

  // Create sample news articles
  const news1 = await prisma.newsArticle.create({
    data: {
      title: 'New Study Reveals Breakthrough in Addiction Treatment',
      slug: 'new-addiction-treatment-breakthrough-2025',
      excerpt: 'Researchers have discovered a promising new approach to treating opioid addiction with fewer side effects.',
      content: 'Full article content here...',
      category: 'RESEARCH',
      image: '/images/news/research.jpg',
      readTime: '5 min read',
      featured: true,
      published: true,
      authorId: adminUser.id,
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[2].id }],
      },
    },
  });

  const news2 = await prisma.newsArticle.create({
    data: {
      title: 'Community Rally Raises $50,000 for Recovery Programs',
      slug: 'community-rally-raises-funds-2025',
      excerpt: 'Local community comes together in support of addiction recovery programs, exceeding fundraising goals.',
      content: 'Full article content here...',
      category: 'COMMUNITY',
      image: '/images/news/rally.jpg',
      readTime: '3 min read',
      featured: false,
      published: true,
      authorId: adminUser.id,
      tags: {
        connect: [{ id: tags[1].id }, { id: tags[3].id }],
      },
    },
  });

  console.log('✅ News articles created:', 2);

  // Create sample events
  const event1 = await prisma.event.create({
    data: {
      title: 'Annual Recovery Walk 2025',
      slug: 'recovery-walk-2025',
      description: 'Join us for our annual recovery walk celebrating hope, healing, and community support. All are welcome!',
      type: 'COMMUNITY_EVENT',
      date: new Date('2025-11-15T10:00:00Z'),
      time: '10:00 AM - 2:00 PM',
      location: 'Central Park',
      address: '123 Park Avenue, Hope City, HC 12345',
      image: '/images/events/walk.jpg',
      organizer: 'Secure the Future',
      contactEmail: 'events@securethefuture.org',
      attendees: 250,
      maxAttendees: 500,
      featured: true,
      published: true,
      registrationRequired: true,
      organizerId: adminUser.id,
      tags: {
        connect: [{ id: tags[1].id }, { id: tags[3].id }],
      },
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Addiction Prevention Workshop',
      slug: 'prevention-workshop-november-2025',
      description: 'Learn evidence-based strategies for preventing substance abuse in your community.',
      type: 'WORKSHOP',
      date: new Date('2025-11-20T18:00:00Z'),
      time: '6:00 PM - 8:00 PM',
      location: 'Community Center',
      address: '456 Main Street, Hope City, HC 12345',
      virtualLink: 'https://zoom.us/j/example',
      image: '/images/events/workshop.jpg',
      organizer: 'Secure the Future',
      contactEmail: 'events@securethefuture.org',
      attendees: 45,
      maxAttendees: 50,
      featured: false,
      published: true,
      registrationRequired: true,
      organizerId: adminUser.id,
      tags: {
        connect: [{ id: tags[2].id }],
      },
    },
  });

  console.log('✅ Events created:', 2);

  // Create sample resources
  const resource1 = await prisma.resource.create({
    data: {
      title: 'Understanding Addiction: A Comprehensive Guide',
      slug: 'understanding-addiction-guide',
      description: 'A complete guide to understanding the science of addiction, risk factors, and pathways to recovery.',
      category: 'EDUCATION',
      type: 'PDF',
      fileUrl: '/resources/addiction-guide.pdf',
      image: '/images/resources/guide.jpg',
      featured: true,
      published: true,
      downloads: 1247,
      views: 5432,
      creatorId: adminUser.id,
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[2].id }],
      },
    },
  });

  const resource2 = await prisma.resource.create({
    data: {
      title: 'Family Support Toolkit',
      slug: 'family-support-toolkit',
      description: 'Practical resources and strategies for families supporting a loved one in recovery.',
      category: 'FAMILY',
      type: 'PDF',
      fileUrl: '/resources/family-toolkit.pdf',
      image: '/images/resources/family.jpg',
      featured: true,
      published: true,
      downloads: 892,
      views: 3210,
      creatorId: adminUser.id,
      tags: {
        connect: [{ id: tags[4].id }, { id: tags[3].id }],
      },
    },
  });

  console.log('✅ Resources created:', 2);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
