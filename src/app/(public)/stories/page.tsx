import { Metadata } from 'next';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Quote, Play, ArrowRight, Filter, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Stories of Recovery | Secure the Future',
  description: 'Read, watch, and listen to powerful stories of hope and recovery from individuals and families affected by addiction.',
};

const stories = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    age: 32,
    type: 'video',
    category: 'Recovery',
    title: 'Finding Light in the Darkness',
    excerpt: 'After 10 years of struggling with opioid addiction, Maria found hope through community support and treatment. Today, she\'s 3 years sober and helps others on their recovery journey.',
    image: '/api/placeholder/600/400',
    duration: '8:24',
    featured: true,
  },
  {
    id: 2,
    name: 'James Chen',
    age: 28,
    type: 'audio',
    category: 'Family Support',
    title: 'A Family\'s Journey to Healing',
    excerpt: 'James shares his family\'s experience supporting his brother through addiction recovery.',
    image: '/api/placeholder/600/400',
    duration: '12:45',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    age: 45,
    type: 'text',
    category: 'Recovery',
    title: 'From Despair to Hope',
    excerpt: 'A mother of two shares her powerful story of overcoming prescription drug addiction.',
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    name: 'Michael Johnson',
    age: 35,
    type: 'video',
    category: 'Long-term Recovery',
    title: '10 Years of Freedom',
    excerpt: 'Michael celebrates a decade of sobriety and reflects on his journey from rock bottom to redemption.',
    image: '/api/placeholder/600/400',
    duration: '15:30',
  },
  {
    id: 5,
    name: 'Emily Davis',
    age: 26,
    type: 'text',
    category: 'Youth Recovery',
    title: 'Reclaiming My Future',
    excerpt: 'A young woman shares how early intervention and support helped her overcome teenage addiction.',
    image: '/api/placeholder/600/400',
  },
  {
    id: 6,
    name: 'Robert Martinez',
    age: 52,
    type: 'audio',
    category: 'Late Recovery',
    title: 'It\'s Never Too Late',
    excerpt: 'After 30 years of addiction, Robert found recovery at age 50 and wants others to know it\'s never too late.',
    image: '/api/placeholder/600/400',
    duration: '18:20',
  },
];

const categories = ['All Stories', 'Recovery', 'Family Support', 'Youth Recovery', 'Long-term Recovery', 'Late Recovery'];

export default function StoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-hope-900 via-primary-900 to-serious-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-up">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
                <Quote className="w-4 h-4" />
                <span>Real People, Real Journeys</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Stories of Hope & Recovery
              </h1>
              <p className="text-xl text-serious-300 mb-8">
                Every journey is unique. These courageous individuals share their experiences with addiction and recovery to inspire hope, break stigma, and show that recovery is possible.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-40 bg-white border-b border-serious-200 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-serious-300 hover:bg-primary-50 hover:border-primary-300 hover:text-primary-700 transition-colors whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-serious-400" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-serious-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-serious-300 rounded-lg hover:bg-serious-50 transition-colors">
                <Filter className="w-5 h-5 text-serious-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {stories.filter(s => s.featured).map((story) => (
        <section key={story.id} className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll animation="fade">
              <div className="mb-4">
                <span className="px-3 py-1 bg-hope-100 text-hope-700 rounded-full text-sm font-semibold">
                  Featured Story
                </span>
              </div>
              <Card padding="none" className="overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto bg-gradient-to-br from-primary-200 to-hope-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {story.duration && (
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-serious-900/80 backdrop-blur-sm rounded text-white text-sm font-medium">
                        {story.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {story.category}
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-serious-900 mb-4">
                      {story.title}
                    </h2>
                    <div className="flex items-center gap-2 text-serious-600 mb-6">
                      <span className="font-semibold">{story.name}</span>
                      <span>•</span>
                      <span>{story.age} years old</span>
                    </div>
                    <p className="text-lg text-serious-600 mb-8 leading-relaxed">
                      {story.excerpt}
                    </p>
                    <Button size="lg">
                      Watch Full Story
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          </div>
        </section>
      ))}

      {/* All Stories Grid */}
      <section className="py-20 bg-serious-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-up">
            <h2 className="text-3xl font-bold text-serious-900 mb-12">
              More Stories
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.filter(s => !s.featured).map((story, index) => (
              <AnimateOnScroll key={story.id} animation="scale" delay={index * 100}>
                <Card hoverable padding="none" className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-200 to-hope-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {story.type === 'video' && (
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                          <Play className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" />
                        </div>
                      )}
                      {story.type === 'audio' && (
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer">
                          <Play className="w-6 h-6 text-hope-600 ml-1" fill="currentColor" />
                        </div>
                      )}
                      {story.type === 'text' && (
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <Quote className="w-6 h-6 text-serious-600" />
                        </div>
                      )}
                    </div>
                    {story.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-serious-900/80 backdrop-blur-sm rounded text-white text-xs font-medium">
                        {story.duration}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                        {story.category}
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
                    <button className="text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-2 group">
                      {story.type === 'video' ? 'Watch' : story.type === 'audio' ? 'Listen' : 'Read'} Story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="scale">
            <div className="bg-gradient-to-br from-primary-600 to-hope-600 rounded-2xl p-8 lg:p-16 text-white text-center">
              <Quote className="w-16 h-16 mx-auto mb-6 opacity-50" />
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Share Your Story of Recovery
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Your journey can inspire hope and help others who are struggling. By sharing your story, you become part of the solution.
              </p>
              <Button size="lg" variant="secondary">
                Share Your Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
