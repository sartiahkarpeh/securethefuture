import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building, Users } from 'lucide-react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export const metadata: Metadata = {
  title: 'Contact Us | Secure the Future',
  description: 'Get in touch with Secure the Future. We\'re here to help with questions about our programs, partnerships, or how to get involved.',
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    details: '+1 (555) 123-4567',
    subtext: 'Mon-Fri, 9:00 AM - 6:00 PM EST',
    color: 'primary',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: 'info@securethefuture.org',
    subtext: 'We typically respond within 24 hours',
    color: 'hope',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: '123 Recovery Street, Hope City, HC 12345',
    subtext: 'Open by appointment',
    color: 'serious',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: 'Monday - Friday: 9:00 AM - 6:00 PM',
    subtext: 'Saturday: 10:00 AM - 2:00 PM',
    color: 'urgent',
  },
];

const departments = [
  {
    name: 'General Inquiries',
    email: 'info@securethefuture.org',
    description: 'Questions about our mission and programs',
  },
  {
    name: 'Partnerships',
    email: 'partnerships@securethefuture.org',
    description: 'Collaboration and sponsorship opportunities',
  },
  {
    name: 'Media Relations',
    email: 'press@securethefuture.org',
    description: 'Press inquiries and interview requests',
  },
  {
    name: 'Volunteer Program',
    email: 'volunteer@securethefuture.org',
    description: 'Information about volunteering',
  },
  {
    name: 'Support Services',
    email: 'support@securethefuture.org',
    description: 'Help finding resources and services',
  },
  {
    name: 'Events',
    email: 'events@securethefuture.org',
    description: 'Event registration and hosting',
  },
];

const faqs = [
  {
    question: 'How can I get help for myself or a loved one?',
    answer: 'Call our support line at 1-800-662-4357 (SAMHSA National Helpline) for free, confidential help 24/7. We can also connect you with local treatment resources.',
  },
  {
    question: 'How can I volunteer or get involved?',
    answer: 'We have various volunteer opportunities including event support, peer mentoring, and community outreach. Visit our Get Involved page or email volunteer@securethefuture.org.',
  },
  {
    question: 'Do you offer educational programs for schools?',
    answer: 'Yes! We provide free prevention programs, workshops, and educational materials for schools and youth organizations. Contact us to schedule a program.',
  },
  {
    question: 'How can my organization partner with you?',
    answer: 'We welcome partnerships with healthcare providers, schools, businesses, and community organizations. Email partnerships@securethefuture.org to discuss opportunities.',
  },
  {
    question: 'Are your services confidential?',
    answer: 'Absolutely. We maintain strict confidentiality for all individuals seeking support or information. Your privacy is our priority.',
  },
  {
    question: 'Do you accept donations?',
    answer: 'Yes, donations help us expand our programs and reach more people. Visit our Donate page or contact us for information about major gifts and corporate sponsorships.',
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-serious-900 via-serious-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-300">
                Have questions? Need support? Want to partner with us? 
                We're here to help and would love to hear from you.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <AnimateOnScroll key={method.title} delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${method.color}-100 text-${method.color}-600 mb-4`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-serious-900 mb-2">{method.title}</h3>
                    <p className="text-serious-900 font-semibold mb-1">{method.details}</p>
                    <p className="text-sm text-gray-600">{method.subtext}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-serious-900 mb-2">Send Us a Message</h2>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                    />

                    <Input
                      label="Phone Number (Optional)"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        required
                      >
                        <option value="">Select a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support Services</option>
                        <option value="volunteer">Volunteer Opportunities</option>
                        <option value="partnership">Partnership/Sponsorship</option>
                        <option value="media">Media Inquiry</option>
                        <option value="events">Events</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Tell us how we can help..."
                      rows={6}
                      required
                    />

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="newsletter"
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                        I'd like to receive updates, news, and resources via email
                      </label>
                    </div>

                    <Button size="lg" className="w-full">
                      <Send size={20} />
                      Send Message
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              {/* Departments */}
              <AnimateOnScroll delay={0.2}>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Building className="text-primary-600" size={24} />
                    <h3 className="text-xl font-bold text-serious-900">Departments</h3>
                  </div>
                  <div className="space-y-4">
                    {departments.map((dept) => (
                      <div key={dept.name} className="pb-4 border-b border-gray-100 last:border-0">
                        <h4 className="font-semibold text-serious-900 mb-1">{dept.name}</h4>
                        <a 
                          href={`mailto:${dept.email}`}
                          className="text-sm text-primary-600 hover:text-primary-700 block mb-1"
                        >
                          {dept.email}
                        </a>
                        <p className="text-xs text-gray-600">{dept.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Social Media */}
              <AnimateOnScroll delay={0.3}>
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl shadow-md p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-white" size={24} />
                    <h3 className="text-xl font-bold">Connect With Us</h3>
                  </div>
                  <p className="text-primary-100 mb-6 text-sm">
                    Follow us on social media for daily inspiration, updates, and community stories.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                      <Button
                        key={platform}
                        variant="secondary"
                        size="sm"
                        className="w-full"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Emergency Support */}
              <AnimateOnScroll delay={0.4}>
                <div className="bg-urgent-50 border-l-4 border-urgent-600 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="text-urgent-600" size={24} />
                    <h3 className="text-lg font-bold text-serious-900">Crisis Support</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    If you or someone you know is in crisis, please call:
                  </p>
                  <a 
                    href="tel:988"
                    className="block text-2xl font-bold text-urgent-600 hover:text-urgent-700 mb-2"
                  >
                    988
                  </a>
                  <p className="text-xs text-gray-600">
                    National Suicide Prevention Lifeline - Available 24/7
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                <MessageSquare size={32} />
              </div>
              <h2 className="text-4xl font-bold text-serious-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to common questions. Can't find what you're looking for? Contact us!
              </p>
            </div>
          </AnimateOnScroll>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <AnimateOnScroll key={faq.question} delay={index * 0.05}>
                <details className="group bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-semibold text-serious-900 pr-8">
                      {faq.question}
                    </h3>
                    <span className="flex-shrink-0 text-primary-600 group-open:rotate-180 transition-transform">
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Button variant="outline" size="lg">
                View All FAQs
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-serious-900 mb-2">Our Location</h2>
              <p className="text-gray-600">Visit us at our headquarters</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg" style={{ height: '400px' }}>
              {/* In production, replace with actual map embed (Google Maps, Mapbox, etc.) */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-serious-100">
                <div className="text-center">
                  <MapPin className="mx-auto text-primary-600 mb-4" size={48} />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Recovery Street, Hope City, HC 12345</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
