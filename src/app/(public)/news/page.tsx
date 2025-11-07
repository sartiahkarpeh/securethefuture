'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';

const categories = [
  'All News',
  'Research',
  'Community',
  'Events',
  'Policy',
  'Success Stories',
  'Prevention',
  'Treatment',
  'Crisis',
  'Education',
  'Support',
];

export default function NewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All News');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams();
      params.append('published', 'true');
      params.append('limit', '50');

      const response = await fetch(`/api/news?${params.toString()}`);
      if (response.ok) {
        const result = await response.json();
        const newsData = result.data || result.news || [];
        setArticles(newsData);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All News' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
  const otherArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white py-20">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              News & Updates
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Stay informed with the latest research, community stories, and developments
              in addiction prevention, treatment, and recovery support.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mt-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news articles..."
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === selectedCategory
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-600">No articles found.</p>
          <p className="text-gray-500 mt-2">Check back soon for updates!</p>
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featuredArticle && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="text-teal-600" size={20} />
                    <span className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Latest Headlines</h2>
                </div>

                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredArticle.image && (
                      <div className="relative h-80 md:h-auto overflow-hidden">
                        <img
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                          {featuredArticle.category}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-teal-600 font-semibold">
                        Read Full Article
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Article Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">All Articles</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.slug}`}
                    className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {article.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded-full">
                            {article.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold">
                        Read More
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="text-xl text-teal-100 mb-8">
                  Get the latest news, research, and stories delivered to your inbox weekly.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button
                    type="submit"
                    className="px-6 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-teal-100 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
