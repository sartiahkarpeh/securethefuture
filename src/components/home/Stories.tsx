'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { Play, Quote, ArrowRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    slug: 'finding-light-in-the-darkness',
    name: 'Maria Rodriguez',
    age: 32,
    type: 'video',
    title: 'Finding Light in the Darkness',
    excerpt: 'After 10 years of struggling with opioid addiction, Maria found hope through community support and treatment. Today, she\'s 3 years sober and helps others on their recovery journey.',
    video: '/images/video.mp4',
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
  },
];

export default function Stories() {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [videoDurations, setVideoDurations] = useState<{ [key: number]: string }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get video duration when metadata loads
  const handleLoadedMetadata = (storyId: number, video: HTMLVideoElement) => {
    if (video.duration && !isNaN(video.duration)) {
      setVideoDurations(prev => ({
        ...prev,
        [storyId]: formatDuration(video.duration)
      }));
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-serious-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll animation="slide-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-hope-100 border border-hope-300 rounded-full text-hope-800 text-sm font-medium mb-4">
              <Quote className="w-4 h-4" />
              <span>Stories of Hope & Recovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-serious-900 mb-4">
              Real People, Real Stories
            </h2>
            <p className="text-lg text-serious-600">
              Every journey is unique. These courageous individuals share their experiences with addiction and recovery to inspire hope and break the stigma.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <AnimateOnScroll key={story.id} animation="scale" delay={index * 100}>
              <Card 
                hoverable 
                padding="none" 
                className="overflow-hidden h-full flex flex-col"
              >
                {/* Video */}
                <div 
                  className="relative aspect-[4/3] bg-gradient-to-br from-primary-200 to-hope-200 cursor-pointer"
                  onClick={(e) => {
                    const video = videoRefs.current[story.id];
                    if (video) {
                      if (video.paused) {
                        video.play();
                        setPlayingVideo(story.id);
                      } else {
                        video.pause();
                        setPlayingVideo(null);
                      }
                    }
                  }}
                >
                  {story.video && (
                    <video 
                      ref={(el) => {
                        videoRefs.current[story.id] = el;
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      src={story.video}
                      loop
                      playsInline
                      preload="metadata"
                      controls={playingVideo === story.id}
                      onLoadedMetadata={(e) => handleLoadedMetadata(story.id, e.currentTarget)}
                    />
                  )}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-all ${playingVideo === story.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {videoDurations[story.id] && playingVideo !== story.id && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-serious-900/80 backdrop-blur-sm rounded text-white text-xs font-medium">
                      {videoDurations[story.id]}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                      {story.type} story
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-serious-900 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-serious-700 font-medium mb-2">
                    {story.name}, {story.age}
                  </p>
                  <p className="text-serious-600 mb-4 flex-1">
                    {story.excerpt}
                  </p>
                  <Link 
                    href={`/stories/${story.slug}`}
                    className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-2 group"
                  >
                    Read Story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Testimonial */}
        <AnimateOnScroll animation="fade" delay={300}>
          <div className="bg-primary-600 rounded-2xl p-8 lg:p-12 text-white relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-24 h-24 text-white/10" />
            <div className="relative max-w-3xl">
              <p className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed">
                "I never thought I'd find hope again. The support I received from Secure the Future helped me rebuild my life, reconnect with my family, and rediscover my purpose. Recovery is possible, and you don't have to do it alone."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg font-bold">JD</span>
                </div>
                <div>
                  <div className="font-semibold">John Davis</div>
                  <div className="text-sm text-primary-200">5 years in recovery</div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* CTA */}
        <AnimateOnScroll animation="slide-up" delay={400}>
          <div className="mt-12 text-center">
            <Link href="/stories">
              <Button size="lg" variant="outline">
                View All Stories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
