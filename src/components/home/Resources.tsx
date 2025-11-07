import Card from '@/components/ui/Card';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { Book, Phone, Users, FileText, Heart, Search } from 'lucide-react';

const resources = [
  {
    icon: Phone,
    title: '24/7 Crisis Helpline',
    description: 'Immediate support for those in crisis. Trained counselors available around the clock.',
    link: '/resources/helplines',
    cta: 'Call Now: 1-800-662-HELP',
    color: 'red',
  },
  {
    icon: Search,
    title: 'Treatment Finder',
    description: 'Find accredited treatment centers, therapists, and support groups in your area.',
    link: '/resources/treatment',
    cta: 'Search Providers',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Support Groups',
    description: 'Connect with peer support groups for individuals and families affected by addiction.',
    link: '/resources/support-groups',
    cta: 'Find a Group',
    color: 'hope',
  },
  {
    icon: Book,
    title: 'Educational Materials',
    description: 'Evidence-based guides, articles, and videos on addiction, prevention, and recovery.',
    link: '/resources/education',
    cta: 'Browse Library',
    color: 'primary',
  },
  {
    icon: FileText,
    title: 'Recovery Resources',
    description: 'Tools and worksheets to support your recovery journey, including relapse prevention plans.',
    link: '/resources/recovery',
    cta: 'Download Resources',
    color: 'hope',
  },
  {
    icon: Heart,
    title: 'Family Support',
    description: 'Resources for families and loved ones supporting someone through addiction and recovery.',
    link: '/resources/family',
    cta: 'Get Support',
    color: 'primary',
  },
];

export default function Resources() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll animation="slide-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-serious-900 mb-4">
              Resources & Support
            </h2>
            <p className="text-lg text-serious-600">
              Whether you're seeking help for yourself or a loved one, we're here to support you with comprehensive resources and guidance.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Resources Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <AnimateOnScroll key={resource.title} animation="scale" delay={index * 100}>
              <Card 
                hoverable 
                className={`h-full border-l-4 ${
                  resource.color === 'red' 
                    ? 'border-l-red-600' 
                    : resource.color === 'hope' 
                    ? 'border-l-hope-600' 
                    : 'border-l-primary-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  resource.color === 'red'
                    ? 'bg-red-100'
                    : resource.color === 'hope'
                    ? 'bg-hope-100'
                    : 'bg-primary-100'
                }`}>
                  <resource.icon className={`w-6 h-6 ${
                    resource.color === 'red'
                      ? 'text-red-600'
                      : resource.color === 'hope'
                      ? 'text-hope-600'
                      : 'text-primary-600'
                  }`} />
                </div>

                <h3 className="text-xl font-bold text-serious-900 mb-2">
                  {resource.title}
                </h3>

                <p className="text-serious-600 mb-4">
                  {resource.description}
                </p>

                <a 
                  href={resource.link}
                  className={`font-semibold hover:underline ${
                    resource.color === 'red'
                      ? 'text-red-600'
                      : resource.color === 'hope'
                      ? 'text-hope-600'
                      : 'text-primary-600'
                  }`}
                >
                  {resource.cta} →
                </a>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Emergency Notice */}
        <AnimateOnScroll animation="fade" delay={600}>
          <div className="mt-12 bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">In Case of Emergency</h3>
                <p className="text-red-800 mb-3">
                  If you or someone you know is experiencing a medical emergency or suicidal crisis, call 911 immediately or contact:
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>National Suicide Prevention Lifeline:</strong>{' '}
                    <a href="tel:988" className="underline hover:no-underline">988</a>
                  </div>
                  <div>
                    <strong>SAMHSA National Helpline:</strong>{' '}
                    <a href="tel:1-800-662-4357" className="underline hover:no-underline">1-800-662-HELP (4357)</a>
                  </div>
                  <div>
                    <strong>Crisis Text Line:</strong> Text HOME to{' '}
                    <a href="sms:741741" className="underline hover:no-underline">741741</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
