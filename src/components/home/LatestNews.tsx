'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  publishedAt: string;
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const response = await fetch('/api/news?limit=3&published=true');
      const result = await response.json();
      
      if (result.success && result.data) {
        setNews(result.data);
      }
    } catch (error) {
      console.error('Error fetching latest news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-serious-600">Loading latest news...</div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null; // Don't show section if no news
  }
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll animation="slide-up">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-serious-900 mb-2">
                Latest News & Updates
              </h2>
              <p className="text-lg text-serious-600">
                Stay informed about addiction research, advocacy, and community initiatives
              </p>
            </div>
            <Link href="/news">
              <Button variant="ghost" className="hidden lg:flex">
                View All
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <AnimateOnScroll key={article.id} animation="slide-up" delay={index * 100}>
              <Link href={`/news/${article.slug}`}>
                <Card hoverable padding="none" className="overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-primary-100 to-serious-100">
                    {article.image && (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary-600">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-serious-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-serious-900 mb-3 hover:text-primary-600 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-serious-600 mb-4 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-2 group">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Mobile View All Button */}
        <AnimateOnScroll animation="fade" delay={300}>
          <div className="mt-12 text-center lg:hidden">
            <Link href="/news">
              <Button variant="outline">
                View All News
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
