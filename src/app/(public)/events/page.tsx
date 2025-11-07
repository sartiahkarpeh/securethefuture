import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Users, ArrowRight, Filter, Search } from 'lucide-react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Button from '@/components/ui/Button';
import { sampleEvents } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Events & Programs | Secure the Future',
  description: 'Join our community events, workshops, and support programs. Together we can make a difference in preventing addiction and supporting recovery.',
};

const eventTypes = ['All Events', 'Workshops', 'Support Groups', 'Fundraisers', 'Awareness Campaigns', 'Training'];
const timeFilters = ['Upcoming', 'This Month', 'Next 3 Months', 'Past Events'];

export default function EventsPage() {
  // In a real app, this would come from an API with filters
  const upcomingEvents = [...sampleEvents, ...sampleEvents.map((e, i) => ({
    ...e,
    id: `${e.id}-${i}`,
    title: `${e.title} ${i + 2}`,
  }))];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hope-900 via-hope-800 to-primary-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Events & Programs
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Join us for workshops, support groups, fundraising events, and community gatherings.
                Together, we're building a future free from addiction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" size="lg">
                  View Calendar
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Host an Event
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Time Filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {timeFilters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === 'Upcoming'
                      ? 'bg-hope-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Type Filter Button */}
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
              <Filter size={20} />
              <span className="font-medium">Filter</span>
            </button>
          </div>

          {/* Event Type Tags */}
          <div className="flex gap-2 overflow-x-auto mt-4 scrollbar-hide">
            {eventTypes.map((type) => (
              <button
                key={type}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  type === 'All Events'
                    ? 'bg-primary-100 text-primary-700 border border-primary-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-urgent-100 text-urgent-700 text-sm font-semibold rounded-full mb-2">
                Featured Event
              </span>
              <h2 className="text-3xl font-bold text-serious-900">Don't Miss This</h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative h-64 md:h-full">
                  <Image
                    src={upcomingEvents[0].image}
                    alt={upcomingEvents[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white rounded-lg p-3 text-center shadow-lg">
                      <div className="text-3xl font-bold text-serious-900">
                        {new Date(upcomingEvents[0].date).getDate()}
                      </div>
                      <div className="text-sm text-gray-600 uppercase">
                        {new Date(upcomingEvents[0].date).toLocaleString('default', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 p-8 lg:p-12">
                  <span className="inline-block px-3 py-1 bg-hope-100 text-hope-700 text-sm font-medium rounded-full mb-4">
                    {upcomingEvents[0].type}
                  </span>
                  <h3 className="text-3xl font-bold text-serious-900 mb-4">
                    {upcomingEvents[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {upcomingEvents[0].description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="text-primary-600" size={20} />
                      <span className="font-medium">{formatDate(upcomingEvents[0].date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="text-primary-600" size={20} />
                      <span className="font-medium">{upcomingEvents[0].time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="text-primary-600" size={20} />
                      <span className="font-medium">{upcomingEvents[0].location}</span>
                    </div>
                    {upcomingEvents[0].attendees && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Users className="text-primary-600" size={20} />
                        <span className="font-medium">{upcomingEvents[0].attendees} attending</span>
                      </div>
                    )}
                  </div>

                  <Button size="lg" className="w-full sm:w-auto">
                    Register Now
                    <ArrowRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-serious-900 mb-12">Upcoming Events</h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.slice(1).map((event, index) => (
              <AnimateOnScroll key={event.id} delay={index * 0.1}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white rounded-lg p-2 text-center shadow-md">
                        <div className="text-2xl font-bold text-serious-900">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-gray-600 uppercase">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-serious-900 text-xs font-medium rounded-full">
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-serious-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock size={16} className="text-gray-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users size={16} className="text-gray-400" />
                          <span>{event.attendees} attending</span>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Load More */}
          <AnimateOnScroll delay={0.3}>
            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                Load More Events
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Host Event CTA */}
      <section className="py-16 bg-gradient-to-br from-hope-600 to-hope-800 text-white">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Want to Host an Event?</h2>
              <p className="text-xl text-hope-100 mb-8">
                Partner with us to organize workshops, fundraisers, or awareness campaigns
                in your community. We provide resources and support every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  View Guidelines
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Virtual Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-serious-900 mb-4">
                Can't Attend in Person?
              </h2>
              <p className="text-gray-600">
                Join our virtual events and support groups from anywhere in the world.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Weekly Support Group',
                time: 'Every Thursday, 7:00 PM EST',
                description: 'Safe space for sharing and support',
                icon: Users,
              },
              {
                title: 'Monthly Webinar Series',
                time: 'First Monday, 6:00 PM EST',
                description: 'Expert talks on addiction and recovery',
                icon: Calendar,
              },
              {
                title: '24/7 Online Community',
                time: 'Always Available',
                description: 'Connect with peers anytime',
                icon: Clock,
              },
            ].map((item, index) => (
              <AnimateOnScroll key={item.title} delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-serious-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-600 font-medium mb-2">{item.time}</p>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Online
                  </Button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
