import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const footerLinks = {
  about: [
    { name: 'Our Mission', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Partners', href: '/about/partners' },
    { name: 'Annual Reports', href: '/about/reports' },
  ],
  resources: [
    { name: 'Help & Support', href: '/resources' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Events', href: '/events' },
    { name: 'Contact Us', href: '/contact' },
  ],
  getInvolved: [
    { name: 'Volunteer', href: '/get-involved/volunteer' },
    { name: 'Donate', href: '/donate' },
    { name: 'Fundraise', href: '/get-involved/fundraise' },
    { name: 'Share Your Story', href: '/stories/share' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-red-600 via-gray-100 to-blue-600 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center group mb-4">
              <div className="relative w-40 h-20">
                <Image
                  src="/images/logo1.png"
                  alt="Secure the Future Logo"
                  fill
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-gray-800 mb-6 max-w-md">
              Dedicated to raising awareness about drug abuse and addiction in Liberia, providing support resources to Liberian communities, and building a nation of hope and recovery.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Sinkor, Monrovia, Montserrado County, Liberia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+231770123456" className="hover:text-blue-700 transition-colors">
                  +231 770 123 456
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@securethefuture.org" className="hover:text-blue-700 transition-colors">
                  info@securethefuture.org
                </a>
              </div>
            </div>

            {/* Crisis Helpline */}
            <div className="mt-6 p-4 bg-red-700 border border-red-800 rounded-lg">
              <p className="font-semibold text-white mb-1">24/7 Liberia Crisis Helpline</p>
              <a href="tel:+231886123456" className="text-xl font-bold text-white hover:text-gray-200 transition-colors">
                +231 886 123 456
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Get Involved</h3>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-400">
          <div className="max-w-md">
            <h3 className="font-semibold text-gray-900 mb-2">Stay Informed</h3>
            <p className="text-sm text-gray-700 mb-4">
              Subscribe to our newsletter for updates, resources, and stories of hope from Liberia.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                aria-label="Email address"
              />
              <Button type="submit" size="md">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-sm text-gray-700">Follow us:</span>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-700 hover:text-blue-700 hover:bg-white/50 rounded-lg transition-all"
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700">
              © {new Date().getFullYear()} Secure the Future. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {footerLinks.legal.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-blue-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-gray-400">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
