import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Download, 
  ExternalLink, 
  Calendar,
  User,
  Building2,
  Clock,
  FileText,
  Video,
  Headphones,
  BookOpen,
  Link as LinkIcon,
  Wrench,
  Image as ImageIcon,
  ArrowLeft,
  Share2
} from 'lucide-react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';

const typeIcons: any = {
  PDF: FileText,
  VIDEO: Video,
  AUDIO: Headphones,
  ARTICLE: BookOpen,
  EXTERNAL_LINK: LinkIcon,
  TOOL: Wrench,
  INFOGRAPHIC: ImageIcon,
};

interface ResourcePageProps {
  params: {
    slug: string;
  };
}

async function getResource(slug: string) {
  try {
    // In server components, we can directly import and use the database
    const { getDocByField, COLLECTIONS } = await import('@/lib/firestore-helpers');
    
    const resource = await getDocByField(COLLECTIONS.RESOURCES, 'slug', slug);
    
    if (!resource || !resource.published) {
      return null;
    }

    return resource;
  } catch (error) {
    console.error('Error fetching resource:', error);
    return null;
  }
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const resource = await getResource(params.slug);

  if (!resource) {
    return {
      title: 'Resource Not Found | Secure the Future',
    };
  }

  return {
    title: `${resource.title} | Resources | Secure the Future`,
    description: resource.description || 'Access valuable resources for addiction prevention, treatment, and recovery.',
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const resource = await getResource(params.slug);

  if (!resource) {
    notFound();
  }

  const Icon = typeIcons[resource.type] || FileText;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-serious-900 text-white py-12">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Resources
            </Link>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimateOnScroll delay={0.1}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {resource.category.replace('_', ' ')}
                      </span>
                      <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {resource.title}
                    </h1>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.2}>
                <p className="text-xl text-primary-100 mb-6">
                  {resource.description}
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  {resource.fileUrl && (
                    <a 
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Button variant="secondary" size="lg">
                        <Download size={20} />
                        Download Resource
                      </Button>
                    </a>
                  )}
                  {resource.externalUrl && (
                    <a 
                      href={resource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                        <ExternalLink size={20} />
                        View External Link
                      </Button>
                    </a>
                  )}
                  {resource.url && !resource.fileUrl && !resource.externalUrl && (
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary" size="lg">
                        <ExternalLink size={20} />
                        Access Resource
                      </Button>
                    </a>
                  )}
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                    <Share2 size={20} />
                    Share
                  </Button>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <AnimateOnScroll delay={0.4}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg mb-4">Resource Details</h3>
                  
                  {resource.author && (
                    <div className="flex items-start gap-3">
                      <User size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-primary-200">Author</p>
                        <p className="font-medium">{resource.author}</p>
                      </div>
                    </div>
                  )}

                  {resource.publisher && (
                    <div className="flex items-start gap-3">
                      <Building2 size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-primary-200">Publisher</p>
                        <p className="font-medium">{resource.publisher}</p>
                      </div>
                    </div>
                  )}

                  {resource.duration && (
                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-primary-200">Duration</p>
                        <p className="font-medium">{resource.duration}</p>
                      </div>
                    </div>
                  )}

                  {resource.publishedDate && (
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-primary-200">Published</p>
                        <p className="font-medium">
                          {new Date(resource.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {resource.downloads > 0 && (
                    <div className="flex items-start gap-3">
                      <Download size={20} className="text-primary-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-primary-200">Downloads</p>
                        <p className="font-medium">{resource.downloads.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>

              {resource.tags && resource.tags.length > 0 && (
                <AnimateOnScroll delay={0.5}>
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag: string) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-white/20 text-white text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {resource.content && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <AnimateOnScroll>
                <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
                  <h2 className="text-3xl font-bold text-serious-900 mb-6">About This Resource</h2>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: resource.content }}
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* Related Resources CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-serious-900 mb-4">
                Explore More Resources
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Browse our complete library of educational materials, guides, and tools.
              </p>
              <Link href="/resources">
                <Button variant="primary" size="lg">
                  View All Resources
                </Button>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
