import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Video, Calendar, Folder, MessageSquare, TrendingUp, Bell, Search, 
  Plus, LogOut, Heart, MessageCircle, Share2, Sparkles, User, Settings, Check, ArrowRight 
} from 'lucide-react';
import { Post } from '../types';

interface DashboardProps {
  currentUsername: string;
  onLogout: () => void;
  onCreateMeeting: () => void;
  onJoinMeetingByCode: (code: string) => void;
}

export default function Dashboard({
  currentUsername,
  onLogout,
  onCreateMeeting,
  onJoinMeetingByCode
}: DashboardProps) {
  const [newPostText, setNewPostText] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'meetings' | 'docs'>('feed');
  const [joinInputCode, setJoinInputCode] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Dr. Sarah Jenkins',
        username: 'sarah_neuro',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop'
      },
      content: 'Just finalized our weekly Interactive Neural Design lecture notes! We will draw the node hierarchies together on the MeetPark shared blackboard. Grab a link in the calendar widget.',
      likes: 42,
      comments: 6,
      shares: 3,
      timestamp: '2 hours ago',
      hasLiked: false
    },
    {
      id: '2',
      author: {
        name: 'Tariq Evans',
        username: 'tariq_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop'
      },
      content: 'Loving the speed of MeetPark! Having super-fast static server configurations and fully bundled CommonJS outputs for the Express backend makes video buffers nonexistent. 🚀 #superapp #build',
      likes: 19,
      comments: 2,
      shares: 1,
      timestamp: '4 hours ago',
      hasLiked: false
    }
  ]);

  // Story avatars list
  const stories = [
    { id: 1, name: 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop', viewed: false, isUser: true },
    { id: 2, name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop', viewed: false },
    { id: 3, name: 'Tariq', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop', viewed: true },
    { id: 4, name: 'Chloe', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop', viewed: false },
    { id: 5, name: 'Professor C', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop', viewed: true }
  ];

  // Post dynamic status
  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const post: Post = {
      id: String(Date.now()),
      author: {
        name: currentUsername.slice(0, 15),
        username: currentUsername.toLowerCase().replace(/\s+/g, '_'),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'
      },
      content: newPostText.trim(),
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Just now',
      hasLiked: false
    };

    setPosts([post, ...posts]);
    setNewPostText('');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.hasLiked ? p.likes - 1 : p.likes + 1,
          hasLiked: !p.hasLiked
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 font-sans flex select-none relative overflow-hidden">
      {/* Dynamic Frosted Glimmer Mesh Layers */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[#0] w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Dynamic Left sidebar Navigation */}
      <aside className="w-64 bg-[#0F0F14]/75 backdrop-blur-3xl border-r border-white/5 hidden lg:flex flex-col justify-between p-6 z-10">
        <div className="space-y-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center text-white font-black shadow-md shadow-indigo-550/20">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Meet<span className="text-indigo-400 font-extrabold">Park</span></span>
          </div>

          {/* Connected User Profile badge */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" referrerPolicy="no-referrer" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <span className="block font-bold text-white text-sm truncate">@{currentUsername}</span>
              <span className="text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 px-1.5 py-0.5 rounded-md font-semibold">Active Citizen</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('feed')}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'feed' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Home className="w-4 h-4" />
              <span>Social Grid Feed</span>
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'meetings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Video className="w-4 h-4" />
              <span>Interactive Zoom Rooms</span>
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === 'docs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Folder className="w-4 h-4" />
              <span>Shared Documents</span>
            </button>
          </nav>
        </div>

        {/* Logout widget */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2.5 py-2 px-3 text-red-400 hover:bg-red-500/10 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Workspace</span>
        </button>
      </aside>

      {/* Main Workspace Feed Layout */}
      <div className="flex-1 flex flex-col min-w-0 z-10">

        {/* Global top navigation banner */}
        <header className="bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-650 bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm">M</div>
            <span className="font-extrabold text-white tracking-tight">MeetPark</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 w-72">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search posts, hashtags, or users..." 
              className="bg-transparent border-none text-xs outline-none text-white placeholder-slate-500 w-full"
            />
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-3.5">
            <button 
              onClick={onCreateMeeting}
              className="flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all shadow-indigo-500/10 border border-indigo-400/25"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Start Class</span>
            </button>

            <button 
              onClick={onLogout}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Layout Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-7xl w-full mx-auto">
          
          {/* Main Stream Area */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            
            {/* 1. Stories Row slider */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-4 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Social Parks active status</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-thin">
                {stories.map(st => (
                  <div key={st.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
                    <div className={`p-0.5 rounded-full border-2 transition ${st.viewed ? 'border-white/10' : 'border-indigo-500 animate-pulse'}`}>
                      <img src={st.avatar} referrerPolicy="no-referrer" alt={st.name} className="w-11 h-11 rounded-full object-cover border-2 border-[#121218]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-400 transition truncate w-14 text-center">
                      {st.isUser ? 'Your Park' : st.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Render tabs contents --- */}
            {activeTab === 'feed' && (
              <>
                {/* 2. Write Post interactive block */}
                <form onSubmit={handleCreatePostSubmit} className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl space-y-4">
                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" referrerPolicy="no-referrer" alt="You" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <textarea
                      placeholder={`What is happening in the park today, ${currentUsername}?`}
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      rows={3}
                      className="w-full text-sm text-slate-100 placeholder-slate-500 outline-none resize-none border-b border-white/5 pb-2 bg-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">Posts with markdown automatically formatted</span>
                    <button
                      type="submit"
                      className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-md transition"
                    >
                      Post Update
                    </button>
                  </div>
                </form>

                {/* 3. Feeds Stream */}
                <div className="space-y-4">
                  {posts.map(p => (
                    <motion.article 
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl space-y-4"
                    >
                      {/* Author Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={p.author.avatar} referrerPolicy="no-referrer" alt={p.author.name} className="w-11 h-11 rounded-full object-cover border border-white/10" />
                          <div>
                            <span className="block font-bold text-white text-sm leading-tight">{p.author.name}</span>
                            <span className="text-xs text-slate-500">@{p.author.username}</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{p.timestamp}</span>
                      </div>

                      {/* Content */}
                      <p className="text-sm text-slate-300 leading-relaxed break-words whitespace-pre-wrap select-text">
                        {p.content}
                      </p>

                      {/* Interactions foot bar */}
                      <div className="flex items-center gap-6 border-t border-white/5 pt-4 text-xs text-slate-400 font-bold select-none">
                        <button 
                          onClick={() => handleLikePost(p.id)}
                          className={`flex items-center gap-1.5 hover:text-red-400 transition cursor-pointer ${p.hasLiked ? 'text-red-400' : ''}`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                          <span>{p.likes} Likes</span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4 text-indigo-400" />
                          <span>{p.comments} comments</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Share2 className="w-4 h-4" />
                          <span>{p.shares} share</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'meetings' && (
              <div className="space-y-4">
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl text-center max-w-xl mx-auto py-10">
                  <Video className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-white">Launch a premium class</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">Create a secure virtual classroom with real-time blackboard sketches, automated meet code generator, student widgets and floating reaction streams.</p>
                  
                  <button
                    onClick={onCreateMeeting}
                    className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-md transition cursor-pointer"
                  >
                    Generate Meet Code & Launch Classroom
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-2xl">
                <h3 className="font-bold text-white text-sm mb-4">Workspace Materials & Diagrams</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-3 hover:border-indigo-500/50 hover:bg-white/10 transition cursor-pointer">
                    <Folder className="w-8 h-8 text-indigo-400" />
                    <div>
                      <span className="font-bold text-xs block text-slate-200">Digital Whiteboards History</span>
                      <span className="text-[10px] text-slate-500">PDF • 1.2 MB</span>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-3 hover:border-indigo-500/50 hover:bg-white/10 transition cursor-pointer">
                    <Folder className="w-8 h-8 text-indigo-400" />
                    <div>
                      <span className="font-bold text-xs block text-slate-200">Lecture Slides: Super Apps Intro</span>
                      <span className="text-[10px] text-slate-500">PPTX • 4.5 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Side Widgets container */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            
            {/* 1. Enter Meet Code Directly */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Join Class Directly</span>
              <p className="text-[11px] text-slate-450 text-slate-400 mb-3">Found an active lecture code? Enter it to sync streams instantly.</p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. MPK-ZOM-992"
                  value={joinInputCode}
                  onChange={(e) => setJoinInputCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 text-xs font-mono bg-[#161622]/50 border border-white/10 rounded-lg outline-none uppercase font-bold focus:border-indigo-500 text-white"
                />
                <button
                  onClick={() => {
                    if (joinInputCode.trim()) {
                      onJoinMeetingByCode(joinInputCode.trim());
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 rounded-lg transition text-xs cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>

            {/* 2. Active Lectures Sandbox schedule lists */}
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Class Sandbox</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-3.5 text-white">
                <div className="text-xs flex items-start gap-2.5">
                  <div className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 p-2 rounded-lg font-bold text-[10px] uppercase text-center w-11">
                    03 <span className="block text-[8px] font-normal font-sans">JUN</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block text-xs">AI Coding Best Practices</span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Room ID: <code>MPK-AI-999</code></span>
                    <button 
                      onClick={() => onJoinMeetingByCode('MPK-AI-999')}
                      className="text-xs text-indigo-400 hover:text-indigo-350 hover:text-indigo-300 font-semibold underline mt-2 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Join Lecture Room</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-xs flex items-start gap-2.5">
                  <div className="bg-indigo-500/10 text-indigo-300 border border-indigo-550/20 border-indigo-500/20 p-2 rounded-lg font-bold text-[10px] uppercase text-center w-11">
                    04 <span className="block text-[8px] font-normal font-sans">JUN</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block text-xs">Advanced CJS Bundling Mechanics</span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Room ID: <code>MPK-DEV-001</code></span>
                    <button 
                      onClick={() => onJoinMeetingByCode('MPK-DEV-001')}
                      className="text-xs text-indigo-400 hover:text-indigo-350 hover:text-indigo-300 font-semibold underline mt-2 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Pre-register Session</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Global Stats Widget */}
            <div className="bg-gradient-to-br from-[#12121A]/95 to-[#1F1F35]/70 backdrop-blur-xl border border-white/10 text-white rounded-2xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-indigo-500/10 rounded-tl-full pointer-events-none" />
              <div className="flex items-center gap-2 mb-3 text-indigo-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Network Highlights</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 select-text">
                MeetPark uses localized micro servers to stream real-time webcams without frame rate loss.
              </p>
              <div className="border-t border-white/5 pt-3 flex justify-between text-xs font-semibold">
                <span className="text-slate-400">Total Classes Streams</span>
                <span className="text-indigo-300 font-mono">1,402 Today</span>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
