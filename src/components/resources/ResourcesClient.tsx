'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Search, 
  Filter,
  ExternalLink,
  FileText,
  Video,
  Headphones,
  BookOpen,
  Link as LinkIcon,
  Wrench,
  Image as ImageIcon
} from 'lucide-react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const categoryIcons: any = {
  PDF: FileText,
  VIDEO: Video,
  AUDIO: Headphones,
  ARTICLE: BookOpen,
  EXTERNAL_LINK: LinkIcon,
  TOOL: Wrench,
  INFOGRAPHIC: ImageIcon,
};

const categoryColors: any = {
  EDUCATION: 'primary',
  TREATMENT: 'urgent',
  RECOVERY: 'hope',
  FAMILY: 'serious',
  PROFESSIONAL: 'primary',
  PREVENTION: 'hope',
  HELPLINES: 'urgent',
  SUPPORT_GROUPS: 'hope',
};

interface Resource {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: string;
  description: string;
  author?: string;
  publisher?: string;
  duration?: string;
  downloads: number;
  url?: string;
  fileUrl?: string;
  image?: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ResourcesClientProps {
  initialResources?: Resource[];
}

export default function ResourcesClient({ initialResources = [] }: ResourcesClientProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    { value: 'all', label: 'All Resources', count: resources?.length || 0 },
    { value: 'EDUCATION', label: 'Education', count: resources?.filter(r => r.category === 'EDUCATION').length || 0 },
    { value: 'TREATMENT', label: 'Treatment', count: resources?.filter(r => r.category === 'TREATMENT').length || 0 },
    { value: 'RECOVERY', label: 'Recovery', count: resources?.filter(r => r.category === 'RECOVERY').length || 0 },
    { value: 'FAMILY', label: 'Family Support', count: resources?.filter(r => r.category === 'FAMILY').length || 0 },
    { value: 'PROFESSIONAL', label: 'Professional', count: resources?.filter(r => r.category === 'PROFESSIONAL').length || 0 },
    { value: 'PREVENTION', label: 'Prevention', count: resources?.filter(r => r.category === 'PREVENTION').length || 0 },
  ];

  // Fetch resources from API
  const fetchResources = async (search?: string, category?: string, pageNum?: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'all') params.append('category', category);
      if (pageNum) params.append('page', pageNum.toString());
      params.append('limit', '12');

      const response = await fetch(`/api/resources?${params}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();

      // Check if data has the expected structure
      if (!data || !data.resources) {
        console.error('Invalid API response:', data);
        setResources([]);
        setHasMore(false);
        return;
      }

      if (pageNum && pageNum > 1) {
        setResources(prev => [...prev, ...(data.resources || [])]);
      } else {
        setResources(data.resources || []);
      }

      // Safely check pagination
      if (data.pagination) {
        setHasMore(data.pagination.page < data.pagination.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResources([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Load initial resources
  useEffect(() => {
    if (initialResources.length === 0) {
      fetchResources();
    } else {
      setLoading(false);
    }
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchResources(searchQuery, selectedCategory, 1);
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    fetchResources(searchQuery, category, 1);
  };

  // Load more resources
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResources(searchQuery, selectedCategory, nextPage);
  };

  // Filter featured resources
  const featuredResources = resources?.filter(r => r.featured) || [];

  // Show loading state
  if (loading && resources.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search Bar */}
      <AnimateOnScroll delay={0.2}>
        <div className="max-w-2xl mt-12">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources, guides, videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </form>
        </div>
      </AnimateOnScroll>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.label}</span>
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <AnimateOnScroll>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-serious-900 mb-2">Featured Resources</h2>
                <p className="text-gray-600">Most popular and highly recommended materials</p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredResources.map((resource, index) => {
                const Icon = categoryIcons[resource.type] || FileText;
                const color = categoryColors[resource.category] || 'primary';
                
                return (
                  <AnimateOnScroll key={resource.id} delay={index * 0.1}>
                    <Card className="group h-full hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <div className={`w-16 h-16 rounded-lg bg-${color}-100 text-${color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon size={32} />
                      </div>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded mb-3">
                        {resource.type}
                      </span>
                      <h3 className="text-lg font-bold text-serious-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Download size={14} />
                          <span>{resource.downloads.toLocaleString()}</span>
                        </div>
                        <Link href={`/resources/${resource.slug}`}>
                          <Button variant="ghost" size="sm" className="text-primary-600">
                            View Details
                            <ExternalLink size={14} />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-serious-900 mb-2">
                  {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.value === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600">Browse our complete library of resources</p>
              </div>
            </div>
          </AnimateOnScroll>

          {loading && (!resources || resources.length === 0) ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading resources...</p>
            </div>
          ) : !resources || resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No resources found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <AnimateOnScroll key={resource.id} delay={index * 0.05}>
                    <div className="group bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          {resource.category.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">{resource.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-serious-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {resource.description}
                      </p>
                      {resource.author && (
                        <p className="text-xs text-gray-500 mb-3">By {resource.author}</p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-600">{resource.duration || 'View'}</span>
                        <Link href={`/resources/${resource.slug}`}>
                          <Button variant="ghost" size="sm" className="text-primary-600">
                            View Details
                            <ExternalLink size={14} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              {hasMore && (
                <AnimateOnScroll delay={0.3}>
                  <div className="flex justify-center mt-12">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={loadMore}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Load More Resources'}
                    </Button>
                  </div>
                </AnimateOnScroll>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
