'use client';

import { TrendingUp, Users, Heart, Globe, BarChart3, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  {
    icon: Globe,
    value: 500000,
    suffix: '+',
    label: 'Liberians at risk of substance abuse',
    source: 'Liberia Ministry of Health, 2024',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    value: 12,
    suffix: '%',
    label: 'Of Liberian youth affected by drug use',
    source: 'National Youth Survey, 2024',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Users,
    value: 15,
    suffix: '',
    label: 'Counties with active support programs',
    source: 'Secure the Future, 2024',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Heart,
    value: 85,
    suffix: '%',
    label: 'Don\'t receive the treatment they need',
    source: 'Liberia Health Report, 2024',
    gradient: 'from-purple-500 to-indigo-600',
  },
];

export default function Statistics() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const counter = setInterval(() => {
        currentStep++;
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.min(Math.floor(increment * currentStep), stat.value);
          return newCounts;
        });

        if (currentStep >= steps) {
          clearInterval(counter);
        }
      }, interval);
    });
  }, []);

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl top-10 -left-20 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl bottom-10 -right-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`max-w-4xl mx-auto text-center mb-20 space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-300">Impact Data</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
            The Reality of Addiction
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              in Liberia
            </span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the scope of the crisis in our nation is the first step toward meaningful change.
            These statistics underscore the urgent need for awareness, compassion, and action in Liberia.
          </p>
        </div>

        {/* Stats Grid - Premium Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                {/* Gradient glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Value */}
                <div className="relative mb-4">
                  <div className="text-5xl lg:text-6xl font-black text-white mb-1">
                    {counts[index]}{stat.suffix}
                  </div>
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${stat.gradient}`} />
                </div>

                {/* Label */}
                <p className="relative text-sm text-slate-300 mb-4 leading-relaxed font-medium">
                  {stat.label}
                </p>

                {/* Source */}
                <p className="relative text-xs text-slate-500 italic flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  {stat.source}
                </p>

                {/* Corner decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-3xl`} />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
            <p className="text-2xl lg:text-3xl text-white font-bold mb-4">
              Behind every statistic is a Liberian person, a Liberian family, a Liberian community in need of support.
            </p>
            <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">
              Together, we can change these numbers and secure Liberia's future.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
      `}</style>
    </section>
  );
}
