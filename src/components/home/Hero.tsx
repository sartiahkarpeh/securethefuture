'use client';

import { ArrowRight, Heart, Users, BookOpen, Sparkles, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg'
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Slideshow timer
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl animate-pulse"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl animate-pulse"
          style={{
            bottom: '10%',
            right: '5%',
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-3xl animate-pulse"
          style={{
            top: '50%',
            left: '50%',
            animationDelay: '2s',
            transform: `translate(-50%, -50%)`
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Transforming Lives in Liberia</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                Every Life
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                  Deserves Hope
                </span>
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            </div>

            {/* Description */}
            <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
              Leading the fight against drug abuse and addiction across all 15 counties of Liberia.
              <span className="text-white font-semibold"> Empowering communities</span> with evidence-based support,
              resources, and a path to lasting recovery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/resources"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">Get Help Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/about"
                className="group px-8 py-4 rounded-xl font-bold text-white border-2 border-white/20 backdrop-blur-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Our Mission</span>
                <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { icon: Users, value: '15+', label: 'Counties', color: 'cyan' },
                { icon: Heart, value: '500+', label: 'Lives Changed', color: 'blue' },
                { icon: BookOpen, value: '50+', label: 'Resources', color: 'purple' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <stat.icon className={`w-5 h-5 mb-2 text-${stat.color}-400`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                  <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* 3D Card */}
            <div className="relative group perspective-1000">
              <div className="relative p-8 rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
                {/* Slideshow Background */}
                <div className="absolute inset-0 rounded-3xl">
                  {slides.map((slide, index) => (
                    <div
                      key={slide}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        backgroundImage: `url(${slide})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/80" />
                    </div>
                  ))}
                </div>
                
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-2xl" />

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Large Icon */}
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-2xl shadow-cyan-500/50">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <Heart className="w-16 h-16 text-cyan-400" fill="currentColor" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold text-white">
                      Hope • Recovery • Support
                    </h3>
                    <p className="text-slate-400">
                      Building a stronger, healthier Liberia
                    </p>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-3 pt-6">
                    {[
                      { label: 'Community Reach', value: 85, color: 'cyan' },
                      { label: 'Success Rate', value: 92, color: 'blue' },
                      { label: 'Active Programs', value: 78, color: 'purple' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-white font-bold">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full animate-load-bar`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-8 -left-8 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/90 to-teal-500/90 backdrop-blur-xl shadow-2xl shadow-emerald-500/50 animate-float">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-8 -right-8 p-4 rounded-2xl bg-gradient-to-br from-violet-500/90 to-purple-500/90 backdrop-blur-xl shadow-2xl shadow-violet-500/50 animate-float" style={{ animationDelay: '1s' }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 animate-bounce">
          <div className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes load-bar {
          from { width: 0%; }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        .animate-load-bar {
          animation: load-bar 2s ease-out forwards;
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
