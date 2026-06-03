import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, VideoOff, Mic, MicOff, ScreenShare, Share2, MessageSquare, 
  Users, Palette, Hand, Heart, ThumbsUp, Smile, Award, X, Copy, 
  Check, Play, Send, LayoutGrid, MonitorPlay, HelpCircle, PhoneOff 
} from 'lucide-react';
import { Participant, ChatMessage } from '../types';

interface MeetingRoomProps {
  meetingCode: string;
  isHost: boolean;
  onLeaveMeeting: () => void;
}

export default function MeetingRoom({ meetingCode, isHost, onLeaveMeeting }: MeetingRoomProps) {
  // Toggle states
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  
  // Custom class interactions
  const [handRaised, setHandRaised] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string>('host');

  // Interactive Whiteboard Canvas variables
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(3);
  
  // Chat dynamic messages
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'System', content: 'Meeting room created with one-time security code.', timestamp: '11:00 AM', isSystem: true },
    { id: '2', sender: 'Professor Caleb', content: 'Welcome everyone! Today we will discuss how Super Apps organize social streams and video classes.', timestamp: '11:01 AM' },
    { id: '3', sender: 'Amiya (Student)', content: 'Wow, is this built inside MeetPark? The resolution is crisp!', timestamp: '11:02 AM' },
    { id: '4', sender: 'Tariq', content: 'Can we draw ideas on the blackboard together?', timestamp: '11:02 AM' }
  ]);

  // Floating Reactions emitters
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; symbol: string; style: React.CSSProperties }[]>([]);
  let reactionIdCounter = useRef(0);

  // List of participants in the Zoom class
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'host', name: isHost ? 'You (Instructor)' : 'You', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop', role: 'host', isMuted: !isMicOn, isVideoOn: isVideoOn, isRaisingHand: handRaised, talking: true },
    { id: 'p2', name: 'Professor Caleb', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop', role: 'presenter', isMuted: false, isVideoOn: true, isRaisingHand: false, talking: false },
    { id: 'p3', name: 'Amiya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', role: 'student', isMuted: false, isVideoOn: true, isRaisingHand: false, talking: false },
    { id: 'p4', name: 'Tariq Evans', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', role: 'student', isMuted: true, isVideoOn: false, isRaisingHand: false, talking: false },
    { id: 'p5', name: 'Chloe Vance', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', role: 'student', isMuted: false, isVideoOn: true, isRaisingHand: false, talking: true }
  ]);

  // Synchronize host states with participants list
  useEffect(() => {
    setParticipants(prev => prev.map(p => {
      if (p.id === 'host') {
        return { ...p, isMuted: !isMicOn, isVideoOn: isVideoOn, isRaisingHand: handRaised, name: isHost ? 'You (Instructor)' : 'You' };
      }
      return p;
    }));
  }, [isMicOn, isVideoOn, handRaised, isHost]);

  // Copy code helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText(meetingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Simulated lesson slides
  const lessonSlides = [
    { title: "MeetPark Super Ecosystem", description: "Seamless transition between localized profiles and interactive video spaces." },
    { title: "Core Architecture", description: "Bridges WebSockets for latency-free whiteboards and audio streams." },
    { title: "User Sandbox Environment", description: "Secure sandbox containers allow anyone to create a class with custom links." }
  ];

  // Simulated Speaker Switcher loop (makes the class feel alive)
  useEffect(() => {
    const interval = setInterval(() => {
      const activeIds = ['host', 'p2', 'p5'];
      const randomSpeakerId = activeIds[Math.floor(Math.random() * activeIds.length)];
      setActiveSpeakerId(randomSpeakerId);

      setParticipants(prev => prev.map(p => ({
        ...p,
        talking: p.id === randomSpeakerId && !p.isMuted
      })));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Simulated bot response so the class really responds!
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const myMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'You',
      content: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, myMessage]);
    setChatInput('');

    // Trigger simulation reply after a small wait
    setTimeout(() => {
      const bots = [
        { sender: 'Professor Caleb', reply: "Great point! Let's highlight this concept on the whiteboard." },
        { sender: 'Amiya Lin', reply: "I'll join with my tablet now so I can help label the diagrams." },
        { sender: 'Tariq Evans', reply: "Check out the reaction emojis stream guys, this is incredible!" }
      ];
      const selectedBot = bots[Math.floor(Math.random() * bots.length)];

      const botMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: selectedBot.sender,
        content: selectedBot.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  // Emitter of floating emojis over meeting room
  const triggerReaction = (symbol: string) => {
    const id = reactionIdCounter.current++;
    const randomLeft = Math.floor(Math.random() * 60) + 20; // range 20% to 80%
    const newReaction = {
      id,
      symbol,
      style: {
        left: `${randomLeft}%`,
        bottom: '80px',
      }
    };
    setFloatingReactions(prev => [...prev, newReaction]);

    // Clear after animation completes
    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== id));
    }, 4000);
  };

  // --- WHITEBOARD GRAPHICS LOGIC ---
  useEffect(() => {
    if (isWhiteboardOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // Draw initial coordinate background grids
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        // Grid vertical lines
        for (let x = 0; x < canvas.width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        // Grid horizontal lines
        for (let y = 0; y < canvas.height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
    }
  }, [isWhiteboardOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = brushSize;
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearWhiteboard = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Re-draw coordinates grid lines
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0C] text-slate-100 overflow-hidden font-sans select-none relative">
      {/* Mesh Glimmer Layers */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Meeting Info Banner */}
      <header className="bg-[#0A0A0C]/85 backdrop-blur-md border-b border-white/5 px-4 md:px-6 py-3 flex items-center justify-between z-10">
        
        {/* Logo and Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
            MPK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">MeetPark Classroom Sandbox</span>
              <span className="hidden sm:inline bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] px-2 py-0.5 rounded-full font-medium">
                Live Simulator
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono hidden sm:block">Status: Connected to Virtual Signal Tower</p>
          </div>
        </div>

        {/* Security One-Time Code Generator Display Box */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl py-1 px-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold font-mono">Class Code:</span>
          <span className="font-mono text-xs font-black text-indigo-300 tracking-wider select-text">{meetingCode}</span>
          <button 
            onClick={handleCopyCode}
            aria-label="Copy meeting code"
            className="p-1 hover:bg-white/5 rounded-md transition text-slate-400 hover:text-white cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Quick Leave Shortcut button */}
        <button
          onClick={onLeaveMeeting}
          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer"
        >
          <PhoneOff className="w-3.5 h-3.5" />
          <span className="hidden md:inline">End Sandbox</span>
        </button>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Floating Reactions Overlay elements rendering */}
        <div className="absolute inset-x-0 bottom-24 pointer-events-none z-30 overflow-hidden">
          <AnimatePresence>
            {floatingReactions.map(fr => (
              <motion.div
                key={fr.id}
                initial={{ opacity: 0, y: 15, scale: 0.5 }}
                animate={{ opacity: 1, y: -240, scale: [1, 1.4, 0.9] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.5, ease: "easeOut" }}
                style={fr.style}
                className="absolute text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] select-none pointer-events-none"
              >
                {fr.symbol}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Left Side: Workspace Presentation & Student Feeds Grid */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4">

          {/* Active Primary Content view (Whiteboard, Screen Share, or Speaker Grid) */}
          <div className="flex-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center">
            
            {/* 1. Whiteboard Screen Overlay */}
            {isWhiteboardOpen && (
              <div className="absolute inset-0 bg-[#0F0F14]/95 text-slate-100 flex flex-col z-15 transition-all">
                <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Palette className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-xs text-slate-200">Dynamic Class Whiteboards</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Brush Colors */}
                    <div className="flex items-center gap-1.5">
                      {['#6366f1', '#10b981', '#ef4444', '#f59e0b', '#ffffff'].map(col => (
                        <button
                          key={col}
                          onClick={() => setDrawColor(col)}
                          className={`w-4 h-4 rounded-full border transition ${drawColor === col ? 'scale-125 border-slate-350 ring-2 ring-indigo-500/30' : 'border-transparent'}`}
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>
                    {/* Brush sizes */}
                    <select 
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="text-xs bg-white/5 border border-white/10 text-slate-350 outline-none rounded px-2 py-1"
                    >
                      <option value="2" className="bg-[#0F0F14]">Fine</option>
                      <option value="4" className="bg-[#0F0F14]">Bold</option>
                      <option value="8" className="bg-[#0F0F14]">Thick</option>
                    </select>

                    <button 
                      onClick={clearWhiteboard}
                      className="text-xs font-semibold px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition"
                    >
                      Clear
                    </button>
                    <button 
                      onClick={() => setIsWhiteboardOpen(false)}
                      className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Canvas element */}
                <div className="flex-1 relative cursor-crosshair bg-white">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute bottom-3 right-3 bg-indigo-950/90 text-white rounded px-2.5 py-1 text-[10px] pointer-events-none">
                    Students can sketch ideas dynamically!
                  </div>
                </div>
              </div>
            )}

            {/* 2. Screen Sharing Overlay */}
            {isScreenSharing && (
              <div className="absolute inset-0 bg-[#0A0A0C]/90 backdrop-blur-2xl flex flex-col z-10">
                <div className="bg-white/[0.01] py-2 px-4 border-b border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <ScreenShare className="w-4 h-4 animate-pulse" />
                    <span className="font-bold">You are presenting to the class</span>
                  </div>
                  <button 
                    onClick={() => setIsScreenSharing(false)}
                    className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white px-2.5 py-1 rounded transition text-[10px] font-bold"
                  >
                    Stop Share
                  </button>
                </div>
                {/* Presenting mock Slide */}
                <div className="flex-1 flex flex-col justify-center items-center p-8 text-center max-w-xl mx-auto">
                  <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full font-bold mb-3">Slide {currentSlideIndex + 1} of {lessonSlides.length}</span>
                  <motion.h2 
                    key={currentSlideIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-extrabold text-white tracking-tight"
                  >
                    {lessonSlides[currentSlideIndex].title}
                  </motion.h2>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                    {lessonSlides[currentSlideIndex].description}
                  </p>

                  <div className="mt-8 flex gap-2">
                    <button
                      onClick={() => setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : lessonSlides.length - 1))}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-xs text-slate-305 transition"
                    >
                      ← Previous Slide
                    </button>
                    <button
                      onClick={() => setCurrentSlideIndex(prev => (prev < lessonSlides.length - 1 ? prev + 1 : 0))}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold text-white transition"
                    >
                      Next Slide →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Default Layout: Big Speaker video widget */}
            <div className="absolute inset-0 flex flex-col p-4 justify-between">
              <div className="flex items-center justify-between">
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold border border-white/5 text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  Active Lecturer View
                </span>
                <span className="text-xs bg-black/40 backdrop-blur-md px-2.5 py-1 rounded border border-white/5 text-slate-400 font-mono">
                  1080p Stream HD
                </span>
              </div>

              {/* Speaker visuals */}
              {participants.find(p => p.id === activeSpeakerId)?.isVideoOn ? (
                <div className="flex flex-col items-center justify-center pointer-events-none transform -translate-y-2">
                  <div className="relative">
                    <img 
                      src={participants.find(p => p.id === activeSpeakerId)?.avatar} 
                      referrerPolicy="no-referrer"
                      alt="Speaker" 
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-indigo-500 shadow-2xl shadow-indigo-500/20 object-cover" 
                    />
                    {participants.find(p => p.id === activeSpeakerId)?.talking && (
                      <span className="absolute -inset-1.5 rounded-full border border-indigo-400 animate-ping opacity-65" />
                    )}
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-slate-100 flex items-center gap-1.5">
                    {participants.find(p => p.id === activeSpeakerId)?.name}
                    {participants.find(p => p.id === activeSpeakerId)?.talking && (
                      <span className="text-indigo-400 flex items-center gap-0.5 text-xs">
                        {/* Audio dynamic bars placeholder */}
                        <span className="inline-block w-1 h-3.5 bg-indigo-400 animate-pulse rounded-full" />
                        <span className="inline-block w-1 h-2 bg-indigo-400 animate-pulse rounded-full" />
                        <span className="inline-block w-1 h-4 bg-indigo-400 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
                      </span>
                    )}
                  </h3>
                </div>
              ) : (
                <div className="text-center text-slate-500 pointer-events-none">
                  <VideoOff className="w-12 h-12 mx-auto mb-2 text-slate-600 animate-pulse" />
                  <p className="text-xs font-medium">Camera feeds are toggled off by standard settings</p>
                </div>
              )}

              {/* Subtitles simulator at bottom */}
              <div className="bg-[#0F0F14]/90 backdrop-blur-md text-[#e2effd] text-center max-w-lg mx-auto py-2.5 px-6 rounded-xl border border-white/5 text-xs sm:text-sm leading-relaxed whitespace-normal shadow-lg">
                {activeSpeakerId === 'host' ? (
                  <span>&ldquo;Let's take a look at the slide diagram now to understand the micro flows.&rdquo;</span>
                ) : activeSpeakerId === 'p2' ? (
                  <span>&ldquo;Welcome Class. We will design interactive interfaces featuring dynamic canvas whiteboard elements today.&rdquo;</span>
                ) : (
                  <span>&ldquo;The audio fidelity on this MeetPark stream is surprisingly professional!&rdquo;</span>
                )}
              </div>
            </div>

          </div>

          {/* Peer participant cards flow rendering at standard footer */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {participants.map(p => (
              <div 
                key={p.id}
                onClick={() => setActiveSpeakerId(p.id)}
                className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-white/[0.02] backdrop-blur-md border transition-all ${p.id === activeSpeakerId ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-white/5 hover:border-white/10'}`}
              >
                {p.isVideoOn ? (
                  <div className="absolute inset-0 bg-slate-950 grid place-items-center">
                    <img src={p.avatar} referrerPolicy="no-referrer" alt={p.name} className="w-full h-full object-cover opacity-80" />
                    {/* Ring indicator if speaking */}
                    {p.talking && !p.isMuted && (
                      <div className="absolute inset-0 border-2 border-indigo-500 rounded-xl" />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#161622] to-[#0A0A0C] flex flex-col items-center justify-center p-2 text-center">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 text-xs font-semibold">
                      {p.name.charAt(0)}
                    </div>
                  </div>
                )}

                {/* Overlaid indicators */}
                <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded-md text-[10px] text-slate-300 font-semibold max-w-[80%] truncate">
                  {p.name}
                </div>

                <div className="absolute top-2 right-2 flex gap-1.5">
                  {p.isMuted ? (
                    <span className="p-0.5 rounded bg-red-500/80 text-white text-[9px]"><MicOff className="w-2.5 h-2.5" /></span>
                  ) : (
                    <span className="p-0.5 rounded bg-emerald-500/80 text-white text-[9px]"><Mic className="w-2.5 h-2.5" /></span>
                  )}
                  {p.isRaisingHand && (
                    <span className="p-0.5 rounded bg-amber-500 text-slate-900 text-[9px] animate-bounce"><Hand className="w-2.5 h-2.5" /></span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side Pane: Chat log and Classroom QA */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-[#0B0B11]/90 backdrop-blur-2xl border-l border-white/5 flex flex-col z-10 w-[340px] shrink-0"
            >
              {/* Box title */}
              <div className="bg-white/[0.01] p-4 border-b border-white/5 flex items-center justify-between">
                <span className="font-bold text-xs flex items-center gap-2 tracking-wide text-slate-300">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  Live Chat Stream
                </span>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {chatMessages.map(msg => (
                  <div key={msg.id} className="text-xs">
                    {msg.isSystem ? (
                      <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center text-slate-400 italic font-medium">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`${msg.sender === 'You' ? 'text-indigo-450 text-indigo-300' : 'text-blue-300'} font-bold`}>{msg.sender}</span>
                          <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                        </div>
                        <div className="bg-white/[0.03] py-2 px-3 rounded-lg border border-white/5 text-slate-200 break-words leading-relaxed">
                          {msg.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Composer Bar */}
              <form onSubmit={sendChatMessage} className="p-3 border-t border-white/5 bg-[#0A0A0C]/40 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask public question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-xs text-white outline-none focus:border-indigo-500"
                />
                <button 
                  type="submit"
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Primary Video / Audio Meeting Control Toolbar (Zoom style) */}
      <footer className="bg-[#0A0A0C]/90 backdrop-blur-xl border-t border-white/5 px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4 z-20 select-none">
        
        {/* Toggle Controls */}
        <div className="flex items-center gap-2">
          {/* Mic */}
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-3 rounded-xl border transition cursor-pointer ${isMicOn ? 'bg-white/10 border-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 border-red-500/35 text-red-400 hover:bg-red-500/30'}`}
            title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Camera toggle */}
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-xl border transition cursor-pointer ${isVideoOn ? 'bg-white/10 border-white/10 text-white hover:bg-white/20' : 'bg-red-500/20 border-red-500/35 text-red-400 hover:bg-red-500/30'}`}
            title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>
        </div>

        {/* Feature Triggers - Drawing canvas, screen presentation, raise hand */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-2xl">
          
          <button
            onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-semibold cursor-pointer transition ${isWhiteboardOpen ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-white/5'}`}
            title="Scribble lessons on whiteboard"
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Whiteboard</span>
          </button>

          <button
            onClick={() => {
              setIsScreenSharing(!isScreenSharing);
              // Toggle whiteboard off during screenshare
              if (!isScreenSharing) setIsWhiteboardOpen(false);
            }}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-semibold cursor-pointer transition ${isScreenSharing ? 'bg-indigo-650 bg-indigo-700 text-white font-bold' : 'text-slate-300 hover:bg-white/5'}`}
            title="Present lesson slides to peers"
          >
            <ScreenShare className="w-3.5 h-3.5" />
            <span>Present Slides</span>
          </button>

          <button
            onClick={() => setHandRaised(!handRaised)}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-semibold cursor-pointer transition ${handRaised ? 'bg-indigo-600 text-white font-bold animate-pulse' : 'text-slate-300 hover:bg-white/5'}`}
            title="Raise hand to ask question"
          >
            <Hand className="w-3.5 h-3.5" />
            <span>Raise Hand</span>
          </button>
        </div>

        {/* Reaction overlays palette triggers & Drawers Toggles */}
        <div className="flex items-center gap-3">
          
          {/* Reaction bubbles emitters container */}
          <div className="flex gap-1 border-r border-white/5 pr-3 mr-1">
            {['❤️', '👏', '🔥', '🎓', '🎉'].map(sym => (
              <button
                key={sym}
                onClick={() => triggerReaction(sym)}
                className="hover:scale-125 transition text-md p-1.5 hover:bg-white/5 rounded-md cursor-pointer"
              >
                {sym}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-2.5 rounded-xl transition cursor-pointer relative ${isChatOpen ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-white/10 border border-white/10 text-slate-300 hover:bg-white/15'}`}
            title="Chat Drawer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Connected student count badge */}
          <div className="text-slate-500 text-[11px] leading-tight text-right hidden sm:block">
            <span className="block font-bold text-slate-300">5 Joined</span>
            <span>Instructing</span>
          </div>

        </div>

      </footer>
    </div>
  );
}
