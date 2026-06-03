import React from 'react';
import { motion } from 'motion/react';
import BackgroundGlow from './BackgroundGlow';
import { Sparkles, ArrowRight, Video, Users, MessageSquare } from 'lucide-react';

interface TeaserPageProps {
  onExplore: () => void;
  onCreateInstantMeeting: () => void;
}

export default function TeaserPage({ onExplore, onCreateInstantMeeting }: TeaserPageProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-8 md:p-16 select-none bg-[#0A0A0C] text-white">
      {/* Background with accurate blue gradient layers */}
      <BackgroundGlow />

      {/* Embedded overlapping circles to emulate the frosted glass flowing card shape */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/[0.01] backdrop-blur-3xl border-l border-white/5 rounded-l-[100vw] shadow-2xl overflow-hidden hidden md:block z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-indigo-500/[0.02]" />
      </div>

      {/* Top Bar Navigation */}
      <header className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg">
            <div className="w-4 h-4 border-2 border-white rounded-sm" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Meet<span className="text-indigo-400 font-extrabold">Park</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onCreateInstantMeeting}
            className="flex items-center gap-2 cursor-pointer transition-all duration-300 font-semibold text-xs bg-indigo-500/10 text-indigo-300 hover:bg-indigo-600 hover:text-white px-4 py-2.5 rounded-full border border-indigo-500/20 shadow-sm"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Create meeting (Zoom-like)</span>
          </button>
          <button
            type="button"
            onClick={onExplore}
            className="cursor-pointer font-semibold text-xs text-indigo-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-4 py-2.5 rounded-full"
          >
            Login / Join
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto w-full max-w-7xl mx-auto">
        {/* Left Side Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left max-w-lg"
        >
          {/* Main Title Matching Image 2 style perfectly */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight select-text">
            MeetPark
          </h1>
          <p className="mt-3 text-lg md:text-2xl text-slate-400 font-light select-text">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 font-semibold">global park</span>
          </p>

          <p className="mt-6 text-slate-400 leading-relaxed max-w-md select-text text-sm">
            A high-profile social media platform fused with digital classroom spaces, interactive audio/video, real-time whiteboards, and immersive social feeds.
          </p>

          {/* Sizable Action Button Matching Image 2 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExplore}
              className="group flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg py-4 px-8 rounded-2xl cursor-pointer shadow-xl shadow-indigo-500/20 transition-all duration-300 w-full sm:w-auto min-w-[240px]"
            >
              <span>Explore MeetPark</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 w-full border-t border-white/5 pt-8">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-blue-400">4K</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Video Classes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-indigo-400">100%</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Interactive Board</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-purple-400">Stable</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">Social space</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side Visual Cards Representing Super App features */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex flex-col gap-4 items-center justify-center p-4"
        >
          {/* Floating Widget 1: Interactive class simulator teaser in Frosted Glass */}
          <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full" />
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Super Room</h4>
                <p className="text-xs text-slate-500">Class MPK_STABLE_V2</p>
              </div>
              <span className="ml-auto flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" referrerPolicy="no-referrer" alt="User" className="w-6 h-6 rounded-full" />
              </div>
              <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" referrerPolicy="no-referrer" alt="User" className="w-6 h-6 rounded-full" />
              </div>
              <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/10">
                <span className="text-slate-500 font-semibold text-xs">+16</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-400">Teaching: AI Mechanics</span>
              <button 
                onClick={onCreateInstantMeeting}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-all"
              >
                Join Now
              </button>
            </div>
          </div>

          {/* Floating Widget 2: Social media super app feeds in Frosted Glass */}
          <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/10 hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Global Park Grid</h4>
                <p className="text-xs text-slate-500">Social feed posts</p>
              </div>
            </div>
            
            <div className="mt-4 border-l-2 border-indigo-500/30 pl-3 py-1">
              <p className="text-xs font-medium text-slate-300 italic select-text">
                &ldquo;Just launched our class space in MeetPark! The live drawing whiteboard makes math learning extremely interactive.&rdquo;
              </p>
              <span className="text-[10px] text-slate-500 mt-1 block">— Dr. Sarah Jenkins</span>
            </div>
          </div>

          {/* Sparkles effect */}
          <div className="absolute top-[10%] right-[5%] text-indigo-400 animate-pulse hidden lg:block">
            <Sparkles className="w-8 h-8" />
          </div>
        </motion.div>
      </main>

      {/* Footer information conforming to footer design block */}
      <footer className="relative z-10 w-full px-4 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center shrink-0 text-[10px] text-slate-500 uppercase tracking-[2px]">
        <div className="flex space-x-6">
          <a href="#privacy" onClick={(e) => {e.preventDefault(); onExplore();}} className="hover:text-white transition">Privacy Policy</a>
          <a href="#terms" onClick={(e) => {e.preventDefault(); onExplore();}} className="hover:text-white transition">Terms of Service</a>
          <a href="#help" onClick={(e) => {e.preventDefault(); onExplore();}} className="hover:text-white transition">Help Center</a>
        </div>
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          <span>Global Cluster: MPK-STABLE</span>
        </div>
      </footer>
    </div>
  );
}
