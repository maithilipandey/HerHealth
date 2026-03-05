'use client';

export interface PeriodEntry {
  date: string;
  flowIntensity: 'light' | 'medium' | 'heavy' | 'none';
}

export interface MoodEntry {
  date: string;
  mood: number; // 1-5
  notes: string;
  energy: number; // 1-5
}

export interface ForumPost {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  category: 'general' | 'symptoms' | 'wellness' | 'support';
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

export interface UserProfile {
  id: string;
  displayName: string;
  cycleLength: number;
  periodLength: number;
  lastPeriodDate: string;
}

const STORAGE_KEYS = {
  PERIOD_ENTRIES: 'herhealth_period_entries',
  MOOD_ENTRIES: 'herhealth_mood_entries',
  FORUM_POSTS: 'herhealth_forum_posts',
  USER_PROFILE: 'herhealth_user_profile',
};

export function getPeriodEntries(): PeriodEntry[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.PERIOD_ENTRIES);
  return data ? JSON.parse(data) : [];
}

export function savePeriodEntry(entry: PeriodEntry) {
  if (typeof window === 'undefined') return;
  const entries = getPeriodEntries();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  if (existingIndex > -1) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  localStorage.setItem(STORAGE_KEYS.PERIOD_ENTRIES, JSON.stringify(entries));
}

export function getMoodEntries(): MoodEntry[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
  return data ? JSON.parse(data) : [];
}

export function saveMoodEntry(entry: MoodEntry) {
  if (typeof window === 'undefined') return;
  const entries = getMoodEntries();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  if (existingIndex > -1) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));
}

export function getForumPosts(): ForumPost[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.FORUM_POSTS);
  return data ? JSON.parse(data) : [];
}

export function saveForumPost(post: ForumPost) {
  if (typeof window === 'undefined') return;
  const posts = getForumPosts();
  posts.unshift(post);
  localStorage.setItem(STORAGE_KEYS.FORUM_POSTS, JSON.stringify(posts));
}

export function addForumReply(postId: string, reply: ForumReply) {
  if (typeof window === 'undefined') return;
  const posts = getForumPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.replies.push(reply);
    localStorage.setItem(STORAGE_KEYS.FORUM_POSTS, JSON.stringify(posts));
  }
}

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return getDefaultProfile();
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : getDefaultProfile();
}

export function saveUserProfile(profile: UserProfile) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function getDefaultProfile(): UserProfile {
  return {
    id: Math.random().toString(36).substr(2, 9),
    displayName: 'You',
    cycleLength: 28,
    periodLength: 5,
    lastPeriodDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  };
}

export function generateAnonymousName(): string {
  const adjectives = ['Happy', 'Calm', 'Bright', 'Peaceful', 'Gentle', 'Kind', 'Wise', 'Strong', 'Brave', 'Free'];
  const animals = ['Butterfly', 'Dove', 'Swan', 'Deer', 'Phoenix', 'Eagle', 'Wolf', 'Fox', 'Owl', 'Lion'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${animal}`;
}
