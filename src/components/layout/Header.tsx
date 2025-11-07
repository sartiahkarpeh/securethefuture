'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Heart, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Stories', href: '/stories' },
  { name: 'News', href: '/news' },
  { name: 'Events', href: '/events' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-slate-900/5 border-b border-slate-200/50' 
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-24 items-center justify-between lg:justify-start">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 lg:mr-auto absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <div className="relative w-40 h-20">
              <Image
                src="/images/logo1.png"
                alt="Secure the Future Logo"
                fill
                sizes="160px"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300',
                  scrolled
                    ? 'text-slate-700 hover:text-cyan-600 hover:bg-cyan-50'
                    : 'text-white hover:text-cyan-300 hover:bg-white/10'
                )}
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              className={clsx(
                'p-3 rounded-xl transition-all duration-300',
                scrolled
                  ? 'text-slate-700 hover:text-cyan-600 hover:bg-cyan-50'
                  : 'text-white hover:text-cyan-300 hover:bg-white/10'
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link 
              href="/donate"
              className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Heart className="w-4 h-4" fill="currentColor" />
                Donate
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={clsx(
              'lg:hidden p-2 rounded-xl transition-all duration-300 relative z-10',
              scrolled
                ? 'text-slate-700 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={clsx(
          'lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-out',
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}>
          <div className="mx-4 mt-2 p-6 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200">
            <div className="flex flex-col gap-2">
              {navigation.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative px-6 py-4 text-lg font-semibold text-slate-700 hover:text-cyan-600 rounded-2xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                <button 
                  className="w-full px-6 py-4 text-left text-lg font-semibold text-slate-700 hover:text-cyan-600 rounded-2xl hover:bg-cyan-50 transition-all duration-300 flex items-center gap-3"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
                
                <Link 
                  href="/donate"
                  className="block w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white text-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Donate Now
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
