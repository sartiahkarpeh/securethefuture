import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { Heart, Users, Megaphone, DollarSign, Share2, Calendar } from 'lucide-react';

const ways = [
  {
    icon: DollarSign,
    title: 'Donate',
    description: 'Your financial support helps us provide resources, support services, and awareness programs.',
    action: 'Make a Donation',
    link: '/donate',
  },
  {
    icon: Users,
    title: 'Volunteer',
    description: 'Join our team of dedicated volunteers making a difference in the lives of those affected by addiction.',
    action: 'Volunteer Today',
    link: '/get-involved/volunteer',
  },
  {
    icon: Megaphone,
    title: 'Advocate',
    description: 'Help us fight stigma and advocate for policy changes that improve access to treatment and support.',
    action: 'Get Involved',
    link: '/get-involved/advocate',
  },
  {
    icon: Share2,
    title: 'Share Your Story',
    description: 'Your journey can inspire hope and help others. Share your story of recovery and resilience.',
    action: 'Share Now',
    link: '/stories/share',
  },
  {
    icon: Calendar,
    title: 'Attend Events',
    description: 'Participate in awareness events, fundraisers, and community gatherings throughout the year.',
    action: 'See Events',
    link: '/events',
  },
  {
    icon: Heart,
    title: 'Spread Awareness',
    description: 'Follow us on social media and help spread awareness about addiction and recovery in your community.',
    action: 'Follow Us',
    link: '#footer',
  },
];

export default function GetInvolved() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-hope-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll animation="slide-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get Involved
            </h2>
            <p className="text-lg text-primary-100">
              Together, we can create lasting change. There are many ways you can support our mission and make a difference in the fight against addiction.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Ways to Help */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ways.map((way, index) => (
            <AnimateOnScroll key={way.title} animation="scale" delay={index * 100}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <way.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {way.title}
                </h3>

                <p className="text-primary-100 mb-4">
                  {way.description}
                </p>

                <a 
                  href={way.link}
                  className="inline-flex items-center font-semibold text-white hover:text-primary-200 transition-colors"
                >
                  {way.action} →
                </a>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA Section */}
        <AnimateOnScroll animation="fade" delay={600}>
          <div className="bg-white rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-serious-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-serious-600 mb-8 max-w-2xl mx-auto">
              Every contribution, no matter how small, helps us reach more people and save more lives. Join us in creating a future free from the devastation of addiction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Donate Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More About Our Work
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
