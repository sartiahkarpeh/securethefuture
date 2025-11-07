'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Play, Quote } from 'lucide-react';

// Sample stories data - in production, this would come from your database
const storiesData = [
  {
    id: 1,
    slug: 'finding-light-in-the-darkness',
    name: 'Maria Rodriguez',
    age: 32,
    type: 'video',
    title: 'Finding Light in the Darkness',
    excerpt: 'After 10 years of struggling with opioid addiction, Maria found hope through community support and treatment. Today, she\'s 3 years sober and helps others on their recovery journey.',
    video: '/images/video.mp4',
    content: `
      <p>My name is Maria Rodriguez, and I'm 32 years old. For over a decade, I struggled with opioid addiction that nearly cost me everything - my family, my career, and almost my life.</p>
      
      <h2>The Beginning</h2>
      <p>It started innocently enough with a prescription for back pain after a car accident. What began as legitimate pain management slowly spiraled into dependency. Before I knew it, I was taking more than prescribed, and when the prescriptions ran out, I found other ways to feed my addiction.</p>
      
      <h2>The Darkest Days</h2>
      <p>My addiction affected every aspect of my life. I lost my job, my relationships deteriorated, and I found myself isolated and alone. The turning point came when my younger sister confronted me with tears in her eyes, begging me to get help. That moment of clarity, seeing the pain I was causing those who loved me, finally broke through the fog of addiction.</p>
      
      <h2>Finding Hope</h2>
      <p>I reached out to Secure the Future, and they connected me with a treatment program that understood addiction as a disease, not a moral failing. The combination of medical support, counseling, and peer support groups gave me the tools I needed to begin my recovery journey.</p>
      
      <h2>Recovery and Beyond</h2>
      <p>Today, I'm 3 years sober. Recovery isn't a straight line - there have been challenges and moments of doubt. But with the support system I've built and the coping strategies I've learned, I face each day with hope and purpose.</p>
      
      <p>I now volunteer with Secure the Future, sharing my story with others who are struggling. If my experience can help even one person find the courage to seek help, then everything I went through will have meaning.</p>
      
      <h2>A Message of Hope</h2>
      <p>If you're reading this and struggling with addiction, please know that recovery is possible. You are not alone, and you are not defined by your addiction. Reach out for help - it's the bravest thing you can do. There is light in the darkness, and there are people ready to walk with you toward it.</p>
    `,
    publishedAt: '2025-10-08',
  },
  {
    id: 2,
    slug: 'a-familys-journey-to-healing',
    name: 'James Chen',
    age: 28,
    type: 'video',
    title: 'A Family\'s Journey to Healing',
    excerpt: 'James shares his family\'s experience supporting his brother through addiction recovery, highlighting the importance of compassion and understanding.',
    video: '/images/video.mp4',
    content: `
      <p>My name is James Chen, and this is the story of how my family navigated my brother David's struggle with addiction and found our way to healing together.</p>
      
      <h2>The Shock</h2>
      <p>We never saw it coming. David was always the golden child - good grades, athletic, popular. When we discovered he was using drugs, our family was devastated. We didn't know how to help, and our initial reactions - anger, denial, shame - only made things worse.</p>
      
      <h2>Learning to Understand</h2>
      <p>Through Secure the Future's family support program, we learned that addiction is a disease that affects the whole family. We attended support groups where we met other families going through similar experiences. It was eye-opening to realize we weren't alone.</p>
      
      <h2>The Role of Family</h2>
      <p>We learned about enabling versus supporting, about setting healthy boundaries while still showing love. We discovered that our love and support could be powerful tools in David's recovery, but we also had to take care of our own mental health.</p>
      
      <h2>David's Recovery</h2>
      <p>David entered treatment and began his recovery journey. It hasn't been easy - there have been setbacks and relapses. But through it all, our family has remained united in our support, armed with the knowledge and tools we gained through education and counseling.</p>
      
      <h2>Healing Together</h2>
      <p>Today, David is in recovery, and our family is stronger than ever. We've learned to communicate better, to express our feelings openly, and to support each other through challenges. The experience, while painful, has brought us closer together.</p>
      
      <h2>For Other Families</h2>
      <p>If your family is dealing with a loved one's addiction, please know that help is available. Education, support groups, and counseling can make a tremendous difference. Remember that recovery is a family journey, and you don't have to walk it alone.</p>
      
      <p>Compassion, understanding, and boundaries - these are the keys to supporting a loved one in recovery while taking care of yourself.</p>
    `,
    publishedAt: '2025-10-05',
  },
  {
    id: 3,
    slug: 'from-despair-to-hope',
    name: 'Sarah Williams',
    age: 45,
    type: 'video',
    title: 'From Despair to Hope',
    excerpt: 'A mother of two shares her powerful story of overcoming prescription drug addiction and rebuilding her life, one day at a time.',
    video: '/images/video.mp4',
    content: `
      <p>I'm Sarah Williams, 45 years old, mother of two beautiful children. This is my story of falling into the trap of prescription drug addiction and finding my way back to hope and purpose.</p>
      
      <h2>A Mother's Struggle</h2>
      <p>As a working mother juggling career and family, I was prescribed anti-anxiety medication to help me cope with stress. What started as a solution became a prison. I found myself depending on the medication not just to manage anxiety, but to function at all.</p>
      
      <h2>The Breaking Point</h2>
      <p>My addiction progressed to the point where I was doctor shopping, lying to my family, and putting my children at risk. The moment I knew I had to change was when my 12-year-old daughter asked me, "Mom, are you okay? You're different lately." The innocence and concern in her voice shattered my denial.</p>
      
      <h2>Seeking Help</h2>
      <p>Admitting I had a problem was the hardest thing I've ever done. I feared judgment, feared losing my children, feared what people would think. But the fear of continuing down this path was greater. I reached out to Secure the Future, and they connected me with resources designed specifically for working mothers in recovery.</p>
      
      <h2>The Recovery Process</h2>
      <p>Treatment taught me that addiction doesn't discriminate. It affects people from all walks of life - doctors, lawyers, stay-at-home parents, everyone. I learned healthy coping mechanisms for stress, rebuilt my relationship with my children, and discovered a strength I didn't know I had.</p>
      
      <h2>One Day at a Time</h2>
      <p>Recovery is not a destination but a daily choice. Some days are harder than others, but I've built a support network of other women in recovery, and I attend regular counseling sessions. My children are proud of me for getting help, and our family is healing together.</p>
      
      <h2>Finding Purpose</h2>
      <p>Today, I speak at schools and community centers about prescription drug addiction. I want other mothers to know that seeking help is not a sign of weakness but of strength. I want them to know that recovery is possible, and that their children need them healthy more than they need them to be perfect.</p>
      
      <h2>A Message to Others</h2>
      <p>If you're struggling with prescription drug addiction, please don't wait until you hit rock bottom. Reach out for help today. Your life, your family, and your future are worth fighting for. Recovery gave me back my life, my children, and my hope. It can do the same for you.</p>
    `,
    publishedAt: '2025-10-01',
  },
];

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [story, setStory] = useState<typeof storiesData[0] | null>(null);
  const [playingVideo, setPlayingVideo] = useState(false);

  useEffect(() => {
    // Find the story by slug
    const foundStory = storiesData.find(s => s.slug === slug);
    if (foundStory) {
      setStory(foundStory);
    }
  }, [slug]);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story not found</h1>
          <Link href="/stories" className="text-primary-600 hover:text-primary-700">
            ← Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-serious-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-hope-600 text-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/stories"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stories
          </Link>
          
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              {story.type.toUpperCase()} STORY
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {story.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{story.name}, {story.age}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(story.publishedAt).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {story.video && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
          <div 
            className="relative aspect-video bg-gradient-to-br from-primary-200 to-hope-200 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            onClick={() => {
              const video = document.getElementById('story-video') as HTMLVideoElement;
              if (video) {
                if (video.paused) {
                  video.play();
                  setPlayingVideo(true);
                } else {
                  video.pause();
                  setPlayingVideo(false);
                }
              }
            }}
          >
            <video 
              id="story-video"
              className="w-full h-full object-cover"
              src={story.video}
              controls={playingVideo}
              playsInline
            />
            {!playingVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                  <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
          {/* Excerpt */}
          <div className="mb-8 p-6 bg-gradient-to-br from-primary-50 to-hope-50 border-l-4 border-primary-600 rounded-lg">
            <Quote className="w-8 h-8 text-primary-600 mb-4" />
            <p className="text-lg text-serious-700 italic">
              {story.excerpt}
            </p>
          </div>

          {/* Story Content */}
          <div 
            className="prose prose-lg prose-primary max-w-none"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          {/* Call to Action */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-br from-primary-600 to-hope-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Do You Need Support?
              </h3>
              <p className="text-lg mb-6 text-white/90">
                If you or someone you know is struggling with addiction, help is available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/resources"
                  className="px-8 py-3 bg-white text-primary-700 rounded-xl font-bold hover:bg-white/90 transition-all"
                >
                  Find Resources
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold border-2 border-white/20 hover:bg-white/20 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* More Stories */}
        <div className="mt-12 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Stories
          </Link>
        </div>
      </div>
    </div>
  );
}
