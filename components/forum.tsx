'use client';

import { useEffect, useState } from 'react';
import { ForumPost, getForumPosts, saveForumPost, addForumReply, generateAnonymousName } from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send } from 'lucide-react';
import { format } from 'date-fns';

export function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'general' | 'symptoms' | 'wellness' | 'support'>('general');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const loaded = getForumPosts();
    setPosts(loaded);
  }, []);

  function handleCreatePost() {
    if (!newPostContent.trim()) return;
    
    const post: ForumPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: generateAnonymousName(),
      content: newPostContent,
      timestamp: Date.now(),
      category: newPostCategory,
      replies: [],
    };
    
    saveForumPost(post);
    const updated = getForumPosts();
    setPosts(updated);
    setNewPostContent('');
  }

  function handleAddReply(postId: string) {
    const content = replyContent[postId];
    if (!content?.trim()) return;
    
    const reply = {
      id: Math.random().toString(36).substr(2, 9),
      author: generateAnonymousName(),
      content,
      timestamp: Date.now(),
    };
    
    addForumReply(postId, reply);
    const updated = getForumPosts();
    setPosts(updated);
    setReplyContent({ ...replyContent, [postId]: '' });
  }

  const categories = [
    { value: 'general', label: 'General', color: 'bg-blue-100 text-blue-800' },
    { value: 'symptoms', label: 'Symptoms', color: 'bg-pink-100 text-pink-800' },
    { value: 'wellness', label: 'Wellness', color: 'bg-green-100 text-green-800' },
    { value: 'support', label: 'Support', color: 'bg-purple-100 text-purple-800' },
  ];

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.value === category)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Community Forum</h2>
        <p className="text-muted-foreground">Share experiences and support each other anonymously</p>
      </div>

      <Card className="p-6 border-primary/20">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Start a Discussion
        </h3>
        
        <div className="space-y-4">
          <Textarea
            placeholder="Share your thoughts, questions, or experiences..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="min-h-24"
          />
          
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setNewPostCategory(cat.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  newPostCategory === cat.value
                    ? `${cat.color} ring-2 ring-offset-2 ring-current`
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <Button
            onClick={handleCreatePost}
            disabled={!newPostContent.trim()}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Discussion
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No discussions yet. Be the first to start one!</p>
          </Card>
        ) : (
          posts.map(post => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm text-muted-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(post.timestamp, 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                  {categories.find(c => c.value === post.category)?.label}
                </span>
              </div>

              <p className="text-foreground mb-4">{post.content}</p>

              <button
                onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                className="text-primary text-sm font-semibold hover:underline"
              >
                {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
              </button>

              {expandedPostId === post.id && (
                <div className="mt-4 space-y-4 pt-4 border-t">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="bg-muted/50 p-3 rounded-lg">
                      <p className="font-semibold text-sm text-muted-foreground mb-1">{reply.author}</p>
                      <p className="text-sm text-foreground">{reply.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(reply.timestamp, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  ))}

                  <div className="space-y-2 mt-4">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent[post.id] || ''}
                      onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                      className="min-h-20"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddReply(post.id)}
                      disabled={!replyContent[post.id]?.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
