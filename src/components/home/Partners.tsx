'use client';

import { Award, Users, Building2, Sparkles, Quote } from 'lucide-react';

const partners = [
  { name: 'Liberia Ministry of Health', logo: 'MOH', color: 'from-cyan-500 to-blue-600' },
  { name: 'National Mental Health Authority', logo: 'NMHA', color: 'from-blue-500 to-indigo-600' },
  { name: 'Liberia National Police', logo: 'LNP', color: 'from-indigo-500 to-purple-600' },
  { name: 'Carter Center Liberia', logo: 'CC', color: 'from-purple-500 to-pink-600' },
  { name: 'Liberia Medical & Dental Council', logo: 'LMDC', color: 'from-emerald-500 to-teal-600' },
  { name: 'Partners In Health Liberia', logo: 'PIH', color: 'from-rose-500 to-orange-600' },
];

const testimonials = [
  {
    quote: 'Secure the Future is doing incredible work to break down barriers and provide life-saving resources to Liberians who need them most.',
    author: 'Dr. Wilhelmina Jallah',
    title: 'Minister of Health, Republic of Liberia',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    quote: 'Their commitment to evidence-based approaches and compassionate care is transforming how we address addiction in Liberian communities.',
    author: 'Marcus Wleh',
    title: 'Director, Liberia Mental Health Program',
    gradient: 'from-purple-500 to-pink-600',
  },
];

export default function Partners() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl">
            <Building2 className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-bold text-cyan-700">Trusted Partners</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
            Our Liberian Partners &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
              Supporters
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're proud to collaborate with leading Liberian organizations committed to ending addiction and supporting recovery in our nation.
          </p>
        </div>

        {/* Partners Grid - Premium Design */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative p-6 bg-white rounded-2xl border border-slate-200 hover:border-cyan-300 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Logo */}
                <div className="relative mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-xl bg-gradient-to-br ${partner.color} p-0.5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                      <span className={`text-transparent bg-clip-text bg-gradient-to-br ${partner.color} font-black text-sm`}>
                        {partner.logo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <p className="relative text-center text-xs font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {partner.name}
                </p>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials - Premium Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="group relative p-10 bg-white rounded-3xl border border-slate-200 hover:border-cyan-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Quote icon */}
              <div className="relative mb-6">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${testimonial.gradient}`}>
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Quote text */}
              <p className="relative text-xl text-slate-700 mb-8 leading-relaxed font-medium">
                "{testimonial.quote}"
              </p>

              {/* Author info */}
              <div className="relative flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.gradient} p-0.5 flex-shrink-0`}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <Users className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.title}</div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-bl-3xl`} />
            </div>
          ))}
        </div>

        {/* Impact Stats - Premium Design */}
        <div className="relative p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-0 left-0 animate-pulse" />
            <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Content */}
          <div className="relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-cyan-300">Our Impact</span>
              </div>
              <h3 className="text-3xl font-black text-white">
                Making a Difference in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Liberia</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: '5+', label: 'Years Serving Liberia', icon: Award, color: 'cyan' },
                { value: '500+', label: 'Liberians Helped', icon: Users, color: 'blue' },
                { value: '15', label: 'Counties Reached', icon: Building2, color: 'purple' },
                { value: '20+', label: 'Liberian Partners', icon: Sparkles, color: 'pink' },
              ].map((stat, idx) => (
                <div key={idx} className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <stat.icon className={`w-8 h-8 mx-auto mb-4 text-${stat.color}-400`} />
                  <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
                  <div className={`h-1 w-16 mx-auto mt-4 rounded-full bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
