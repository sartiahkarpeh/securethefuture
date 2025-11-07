'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  image?: string;
  featured?: boolean;
  _count?: {
    rsvps: number;
  };
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch('/api/events?limit=3&upcoming=true&published=true');
      const result = await response.json();
      
      if (result.success && result.data) {
        setEvents(result.data);
      }
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-br from-serious-50 to-primary-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-serious-600">Loading upcoming events...</div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null; // Don't show section if no events
  }

  const featuredEvents = events.filter(e => e.featured);
  const regularEvents = events.filter(e => !e.featured);

  // Helper function to format event type for display
  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-serious-50 to-primary-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll animation="slide-up">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-serious-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-serious-600">
              Connect with our community through educational workshops, support groups, and awareness events
            </p>
          </div>
        </AnimateOnScroll>

        {/* Featured Event */}
        {featuredEvents.map((event) => (
          <AnimateOnScroll key={event.id} animation="scale" delay={100}>
            <Link href={`/events/${event.slug}`}>
              <Card className="mb-8 overflow-hidden bg-gradient-to-br from-primary-600 to-hope-600 text-white border-0 cursor-pointer hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/3">
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                      {formatEventType(event.type)} • Featured Event
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                      {event.title}
                    </h3>
                    <p className="text-lg text-white/90 mb-6">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <div>
                          <div className="font-semibold">
                            {new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </div>
                          <div className="text-sm text-white/80">
                            {event.time}{event.endTime && ` - ${event.endTime}`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <div>
                          <div className="font-semibold">{event.location}</div>
                        </div>
                      </div>
                      {event._count && (
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">{event._count.rsvps} attending</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-white/90">
                      Register Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                  <div className="lg:w-1/3 flex items-center justify-center">
                    {event.image ? (
                      <div className="relative w-full h-64 lg:h-full">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                        <Calendar className="w-24 h-24 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          </AnimateOnScroll>
        ))}

        {/* Other Events */}
        {regularEvents.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {regularEvents.map((event, index) => (
              <AnimateOnScroll key={event.id} animation="slide-up" delay={index * 100 + 200}>
                <Link href={`/events/${event.slug}`}>
                  <Card hoverable className="h-full">
                    {event.image && (
                      <div className="relative w-full h-48 mb-4 -mt-6 -mx-6 rounded-t-lg overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                        {formatEventType(event.type)}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-sm text-serious-600 uppercase">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-serious-900 mb-3">
                      {event.title}
                    </h3>

                    <p className="text-serious-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm text-serious-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-600" />
                        <span>{event.time}{event.endTime && ` - ${event.endTime}`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        <span>{event.location}</span>
                      </div>
                      {event._count && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary-600" />
                          <span>{event._count.rsvps} attending</span>
                        </div>
                      )}
                    </div>

                    <Button variant="outline" fullWidth>
                      Learn More
                    </Button>
                  </Card>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        )}

        {/* View All */}
        <AnimateOnScroll animation="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link href="/events">
              <Button size="lg" variant="primary">
                View All Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
