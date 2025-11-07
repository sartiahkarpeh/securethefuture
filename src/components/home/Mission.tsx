import { Target, Eye, Award, Zap, Globe, Users } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To raise awareness about the devastating impact of drug abuse and addiction in Liberia, while providing comprehensive support and resources to Liberian individuals, families, and communities affected by substance use disorders.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'A Liberia where addiction is understood, treated with compassion, and where every Liberian has access to the support and resources they need to recover and thrive.',
  },
  {
    icon: Award,
    title: 'Our Values',
    description: 'Compassion, Hope, Evidence-based care, Community support, Breaking stigma, Empowerment through education, and unwavering commitment to recovery.',
  },
];

export default function Mission() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-xl">
            <Zap className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-bold text-cyan-700">Our Mission in Liberia</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-tight">
            Understanding Drug Abuse &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
              Addiction in Liberia
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Addiction is a chronic disease affecting thousands of Liberians. It's not a choice or moral failing—
            <span className="font-semibold text-slate-900"> it's a complex condition</span> requiring compassion, understanding, and comprehensive support tailored to our communities.
          </p>
        </div>

        {/* Key Facts - Modern Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              value: '12%',
              label: 'Of Liberian youth affected by substance abuse',
              source: 'Ministry of Health, 2024',
              gradient: 'from-cyan-500 to-blue-600',
              icon: Users
            },
            {
              value: '1 in 10',
              label: 'Liberian households impacted by addiction',
              source: 'LISGIS Survey, 2024',
              gradient: 'from-blue-500 to-purple-600',
              icon: Globe
            },
            {
              value: '85%',
              label: "Don't receive the treatment they need",
              source: 'Liberia Health Report, 2024',
              gradient: 'from-purple-500 to-pink-600',
              icon: Target
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-6 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="relative">
                <div className="text-5xl font-black text-slate-900 mb-3">{stat.value}</div>
                <div className="text-base font-medium text-slate-700 mb-3 leading-snug">{stat.label}</div>
                <div className="text-sm text-slate-500 italic">{stat.source}</div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          ))}
        </div>

        {/* Mission Cards - Premium Design */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-cyan-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

              {/* Icon with gradient */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-cyan-600" />
                  </div>
                </div>
              </div>

              <h3 className="relative text-2xl font-bold text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                {value.title}
              </h3>
              <p className="relative text-slate-600 leading-relaxed">
                {value.description}
              </p>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* What We Do - Dark Premium Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 lg:p-16 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-4">
                What We Do in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Liberia</span>
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Awareness & Education',
                  icon: '🎓',
                  color: 'cyan',
                  items: [
                    'Community outreach in all 15 counties',
                    'Culturally-sensitive educational programs',
                    'Breaking stigma through Liberian stories'
                  ]
                },
                {
                  title: 'Support & Resources',
                  icon: '🤝',
                  color: 'blue',
                  items: [
                    'Local helpline and crisis support',
                    'Directory of Liberian treatment centers',
                    'Support groups across Monrovia and counties'
                  ]
                },
                {
                  title: 'Advocacy',
                  icon: '📢',
                  color: 'purple',
                  items: [
                    'Working with Liberian government on policy',
                    'Increasing access to treatment nationwide',
                    'Fighting discrimination in our communities'
                  ]
                },
                {
                  title: 'Community Building',
                  icon: '🌟',
                  color: 'emerald',
                  items: [
                    'Peer support networks in local communities',
                    'Recovery events and celebrations',
                    'Volunteer opportunities for Liberians'
                  ]
                }
              ].map((section, idx) => (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{section.icon}</span>
                    <h4 className={`text-xl font-bold text-${section.color}-400`}>{section.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 group-hover:text-white transition-colors">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${section.color}-400 flex-shrink-0`} />
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
