import { Metadata } from 'next';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Target, Users, Heart, Shield, Award, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Secure the Future',
  description: 'Learn about our mission, vision, and commitment to raising awareness about drug abuse and addiction while supporting recovery and hope.',
};

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We approach every individual with empathy, understanding that addiction is a disease, not a choice.',
  },
  {
    icon: Shield,
    title: 'Breaking Stigma',
    description: 'We work tirelessly to eliminate the shame and discrimination surrounding addiction.',
  },
  {
    icon: Lightbulb,
    title: 'Evidence-Based',
    description: 'Our approaches are grounded in scientific research and proven treatment methodologies.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in the power of connection and peer support in the recovery journey.',
  },
  {
    icon: Target,
    title: 'Empowerment',
    description: 'We provide tools, resources, and knowledge to help individuals reclaim their lives.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards in all our programs, services, and advocacy efforts.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-900 via-serious-900 to-serious-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-up">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Our Story, Mission & Values
              </h1>
              <p className="text-xl text-serious-300 mb-8">
                Since 2019, Secure the Future has been at the forefront of the fight against addiction in Liberia, providing hope, resources, and support to Liberians affected by substance abuse.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimateOnScroll animation="slide-right">
              <Card className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-serious-900 mb-4">Our Mission</h2>
                <p className="text-lg text-serious-600 leading-relaxed">
                  To raise awareness about the devastating impact of drug abuse and addiction in Liberia, while providing comprehensive support and resources to Liberian individuals, families, and communities affected by substance use disorders. We strive to break stigma, promote evidence-based treatment, and empower every Liberian on their path to recovery.
                </p>
              </Card>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slide-up" delay={100}>
              <Card className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-hope-500 to-hope-600 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-serious-900 mb-4">Our Vision</h2>
                <p className="text-lg text-serious-600 leading-relaxed">
                  A Liberia where addiction is understood as a treatable medical condition, where every Liberian has access to compassionate, evidence-based care, and where our communities are equipped with the knowledge and resources to prevent substance abuse and support recovery.
                </p>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-serious-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-serious-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-serious-600 max-w-2xl mx-auto">
                These principles guide everything we do, from our programs to our advocacy efforts.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimateOnScroll key={value.title} animation="scale" delay={index * 100}>
                <Card hoverable className="h-full">
                  <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-serious-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-serious-600">
                    {value.description}
                  </p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-serious-900 mb-4">
                Our Impact in Liberia
              </h2>
              <p className="text-lg text-serious-600 max-w-2xl mx-auto">
                Together, we're making a real difference in the fight against addiction in Liberia.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { value: '500+', label: 'Liberians Helped' },
              { value: '100+', label: 'Stories Shared' },
              { value: '50+', label: 'Local Resources' },
              { value: '5+', label: 'Years Serving Liberia' },
            ].map((stat, index) => (
              <AnimateOnScroll key={stat.label} animation="scale" delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-serious-600 font-medium">{stat.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll animation="fade" delay={400}>
            <div className="bg-gradient-to-br from-primary-600 to-hope-600 rounded-2xl p-8 lg:p-12 text-white text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Join Us in Making a Difference in Liberia
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Whether through volunteering, donating, or sharing your story, you can be part of the solution for Liberia's future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Get Involved
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
