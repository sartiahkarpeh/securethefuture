import { Metadata } from 'next';
import { 
  Phone, 
  MessageCircle,
  Users,
  Heart,
} from 'lucide-react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';
import ResourcesClient from '@/components/resources/ResourcesClient';

export const metadata: Metadata = {
  title: 'Resources & Support | Secure the Future',
  description: 'Access comprehensive resources for addiction prevention, treatment, and recovery. Find helplines, educational materials, and support services.',
};

const crisisHelplines = [
  {
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    description: '24/7 free and confidential support for people in distress',
    availability: '24/7',
  },
  {
    name: 'SAMHSA National Helpline',
    number: '1-800-662-4357',
    description: 'Treatment referral and information service',
    availability: '24/7',
  },
  {
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Free, 24/7 support for those in crisis',
    availability: '24/7',
  },
  {
    name: 'National Hopeline Network',
    number: '1-800-784-2433',
    description: 'Support for those experiencing suicidal thoughts',
    availability: '24/7',
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-serious-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Resources & Support
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Access evidence-based information, educational materials, and support resources
                for prevention, treatment, and recovery from substance abuse.
              </p>
            </div>
          </AnimateOnScroll>

          <ResourcesClient />
        </div>
      </section>

      <section className="py-12 bg-urgent-50 border-b-4 border-urgent-600">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-urgent-600 text-white">
                <Phone size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-serious-900">Need Immediate Help?</h2>
                <p className="text-gray-600">24/7 crisis support is available</p>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {crisisHelplines.map((helpline, index) => (
              <AnimateOnScroll key={helpline.name} delay={index * 0.1}>
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-urgent-600 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-serious-900 mb-2 text-sm">{helpline.name}</h3>
                  <a 
                    href={`tel:${helpline.number.replace(/\D/g, '')}`}
                    className="text-2xl font-bold text-urgent-600 hover:text-urgent-700 mb-2 block"
                  >
                    {helpline.number}
                  </a>
                  <p className="text-xs text-gray-600 mb-2">{helpline.description}</p>
                  <span className="inline-block px-2 py-1 bg-hope-100 text-hope-700 text-xs font-medium rounded">
                    {helpline.availability}
                  </span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-hope-600 to-hope-800 text-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold mb-4">Additional Support Services</h2>
              <p className="text-xl text-hope-100">
                Connect with professional support tailored to your needs
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Peer Support Groups',
                description: 'Connect with others who understand your journey',
                cta: 'Find a Group',
              },
              {
                icon: Users,
                title: 'Professional Counseling',
                description: 'Licensed therapists specializing in addiction',
                cta: 'Get Matched',
              },
              {
                icon: Heart,
                title: 'Treatment Locator',
                description: 'Find treatment centers and services near you',
                cta: 'Search Now',
              },
            ].map((service, index) => (
              <AnimateOnScroll key={service.title} delay={index * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-all">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 text-white mb-6">
                    <service.icon size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-hope-100 mb-6">{service.description}</p>
                  <Button variant="secondary" className="w-full">
                    {service.cta}
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Get New Resources in Your Inbox</h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Subscribe to receive the latest educational materials, research updates, and support resources.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button variant="secondary" size="lg" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
