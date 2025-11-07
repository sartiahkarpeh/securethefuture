// Common types used throughout the application

export interface Story {
  id: string;
  title: string;
  slug: string;
  name: string;
  age: number;
  type: 'video' | 'audio' | 'text';
  category: string;
  excerpt: string;
  content?: string;
  image: string;
  videoUrl?: string;
  audioUrl?: string;
  duration?: string;
  featured?: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Research' | 'Announcements' | 'Events' | 'Policy' | 'Community';
  author: string;
  image: string;
  readTime: string;
  featured?: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: 'Community Event' | 'Support Group' | 'Education' | 'Fundraiser' | 'Workshop';
  date: Date;
  time: string;
  endTime?: string;
  location: string;
  address?: string;
  virtualLink?: string;
  attendees: number;
  maxAttendees?: number;
  image: string;
  organizer: string;
  contactEmail?: string;
  contactPhone?: string;
  featured?: boolean;
  registrationRequired: boolean;
  registrationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'Helplines' | 'Treatment' | 'Support Groups' | 'Education' | 'Recovery' | 'Family';
  type: 'PDF' | 'Video' | 'Audio' | 'Article' | 'External Link' | 'Tool';
  url?: string;
  fileUrl?: string;
  image?: string;
  featured?: boolean;
  downloads?: number;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt?: string;
  caption?: string;
  uploadedBy: string;
  createdAt: Date;
  tags: string[];
}

export interface Analytics {
  period: 'day' | 'week' | 'month' | 'year';
  pageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ page: string; views: number }>;
  averageSessionDuration: number;
  bounceRate: number;
}
