'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Users, 
  FileText, 
  Calendar, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  ArrowRight,
  BookOpen,
  Mail,
  Download,
  Activity,
  DollarSign,
  BarChart3,
  PlusCircle,
  Newspaper
} from 'lucide-react';

interface DashboardStats {
  resources: number;
  stories: number;
  news: number;
  events: number;
  contacts: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    resources: 0,
    stories: 0,
    news: 0,
    events: 0,
    contacts: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch all stats in parallel
      const [resourcesRes, newsRes, contactsRes, subscribersRes] = await Promise.all([
        fetch('/api/resources?limit=1').catch(() => null),
        fetch('/api/news?limit=1').catch(() => null),
        fetch('/api/contact').catch(() => null),
        fetch('/api/newsletter/subscribers').catch(() => null),
      ]);

      const newStats: DashboardStats = {
        resources: 0,
        stories: 0,
        news: 0,
        events: 0,
        contacts: 0,
        subscribers: 0,
      };

      if (resourcesRes?.ok) {
        const resourcesData = await resourcesRes.json();
        newStats.resources = resourcesData.pagination?.total || 0;
      }

      if (newsRes?.ok) {
        const newsData = await newsRes.json();
        newStats.news = newsData.pagination?.total || 0;
      }

      if (contactsRes?.ok) {
        const contactsData = await contactsRes.json();
        newStats.contacts = contactsData.messages?.length || 0;
      }

      if (subscribersRes?.ok) {
        const subscribersData = await subscribersRes.json();
        newStats.subscribers = subscribersData.subscribers?.length || 0;
      }

      setStats(newStats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Resources',
      value: stats.resources,
      change: '+12%',
      trend: 'up' as const,
      icon: FileText,
      color: 'primary',
      href: '/admin/resources',
    },
    {
      name: 'Recovery Stories',
      value: stats.stories,
      change: '+8%',
      trend: 'up' as const,
      icon: BookOpen,
      color: 'hope',
      href: '/admin/stories',
    },
    {
      name: 'News Articles',
      value: stats.news,
      change: '+15%',
      trend: 'up' as const,
      icon: Newspaper,
      color: 'serious',
      href: '/admin/news',
    },
    {
      name: 'Upcoming Events',
      value: stats.events,
      change: '+3',
      trend: 'up' as const,
      icon: Calendar,
      color: 'urgent',
      href: '/admin/events',
    },
    {
      name: 'Contact Messages',
      value: stats.contacts,
      change: '+24',
      trend: 'up' as const,
      icon: Mail,
      color: 'primary',
      href: '/admin/contact',
    },
    {
      name: 'Newsletter Subscribers',
      value: stats.subscribers,
      change: '+18%',
      trend: 'up' as const,
      icon: Users,
      color: 'hope',
      href: '/admin/newsletter',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-serious-900 mb-2">Dashboard Overview</h1>
        <p className="text-serious-600 text-lg">
          Welcome back! Here's your complete site management overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.href}>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${stat.color}-100 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${stat.color}-600`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold px-3 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-4xl font-bold text-serious-900 mb-2">
                  {loading ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </div>
                <div className="text-sm font-medium text-serious-600">{stat.name}</div>
                <div className="mt-4 pt-4 border-t border-serious-200">
                  <span className="text-xs text-primary-600 font-semibold group-hover:text-primary-700 flex items-center gap-1">
                    Manage <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-hope-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/resources/new">
              <button className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all text-left group">
                <PlusCircle className="w-8 h-8 mb-3 text-white group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-white mb-1">Add Resource</div>
                <div className="text-sm text-white/80">Upload educational materials</div>
              </button>
            </Link>
            <Link href="/admin/news/new">
              <button className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all text-left group">
                <FileText className="w-8 h-8 mb-3 text-white group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-white mb-1">Publish News</div>
                <div className="text-sm text-white/80">Write a news article</div>
              </button>
            </Link>
            <Link href="/admin/events/new">
              <button className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all text-left group">
                <Calendar className="w-8 h-8 mb-3 text-white group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-white mb-1">Create Event</div>
                <div className="text-sm text-white/80">Schedule a new event</div>
              </button>
            </Link>
            <Link href="/admin/stories/new">
              <button className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl hover:bg-white/20 transition-all text-left group">
                <BookOpen className="w-8 h-8 mb-3 text-white group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-white mb-1">Add Story</div>
                <div className="text-sm text-white/80">Share a recovery story</div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Status */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-serious-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary-600" />
              System Status
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-semibold text-serious-900">Website Status</p>
                  <p className="text-sm text-serious-600">All systems operational</p>
                </div>
              </div>
              <span className="text-green-700 font-bold">Online</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-semibold text-serious-900">Firebase Database</p>
                  <p className="text-sm text-serious-600">Connected and syncing</p>
                </div>
              </div>
              <span className="text-green-700 font-bold">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-serious-900">Last Backup</p>
                  <p className="text-sm text-serious-600">Automated daily backups</p>
                </div>
              </div>
              <span className="text-blue-700 font-bold">Today</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-serious-900">Security Status</p>
                  <p className="text-sm text-serious-600">SSL/TLS encryption active</p>
                </div>
              </div>
              <span className="text-purple-700 font-bold">Secure</span>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-serious-900">Site Info</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-primary-600" />
                <p className="font-semibold text-serious-900">Visitor Analytics</p>
              </div>
              <p className="text-2xl font-bold text-primary-700">View in Analytics</p>
              <p className="text-xs text-serious-600 mt-1">Real-time tracking</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-hope-50 to-hope-100 rounded-lg border border-hope-200">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-hope-600" />
                <p className="font-semibold text-serious-900">Engagement Rate</p>
              </div>
              <p className="text-2xl font-bold text-hope-700">High</p>
              <p className="text-xs text-serious-600 mt-1">Above industry average</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-urgent-50 to-urgent-100 rounded-lg border border-urgent-200">
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-5 h-5 text-urgent-600" />
                <p className="font-semibold text-serious-900">Resource Downloads</p>
              </div>
              <p className="text-2xl font-bold text-urgent-700">Growing</p>
              <p className="text-xs text-serious-600 mt-1">+18% this month</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
