'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsArticlePage({ params }: PageProps) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/news/${params.slug}`);
        if (!response.ok) {
          setError(true);
          return;
        }
        const result = await response.json();
        if (result.success && result.data) {
          if (!result.data.published) {
            setError(true);
            return;
          }
          // Decode any HTML entities in the content
          const decodedContent = decodeHtmlEntities(result.data.content || '');
          setArticle({
            ...result.data,
            content: decodedContent,
          });
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the article you're looking for.</p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-8 transition font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          {article.category && (
            <div className="mb-6">
              <span className="inline-block px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold uppercase tracking-wider rounded">
                {article.category.replace(/_/g, ' ')}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 tracking-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.publishedAt}>{formattedDate}</time>
              </div>
              {article.authorName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-gray-900">{article.authorName}</span>
                </div>
              )}
            </div>

            {/* Share Icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                }}
                className="p-2 bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-600 rounded-full transition"
                aria-label="Share on Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Twitter/X */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(article.title);
                  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                }}
                className="p-2 bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-600 rounded-full transition"
                aria-label="Share on X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
                }}
                className="p-2 bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-600 rounded-full transition"
                aria-label="Share on LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(article.title);
                  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'width=600,height=400');
                }}
                className="p-2 bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-600 rounded-full transition"
                aria-label="Share on WhatsApp"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Featured Image at the top of content */}
          {article.image && (
            <div className="mb-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div
              className="article-content prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="p-8 bg-white rounded-lg shadow-md border border-gray-200 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full hover:bg-teal-100 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to News */}
        <div className="text-center py-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 text-teal-600 hover:text-white bg-teal-50 hover:bg-teal-600 rounded-lg font-medium transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            View All News Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
