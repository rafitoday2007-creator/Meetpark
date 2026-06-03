import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, X, Sparkles, LogIn, ChevronRight, HelpCircle, Lock, User as UserIcon, Calendar, Check } from 'lucide-react';
import BackgroundGlow from './BackgroundGlow';

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
  onJoinMeetingByCode: (code: string) => void;
  onCreateMeeting: () => void;
  onBackToTeaser: () => void;
}

export default function LoginPage({
  onLoginSuccess,
  onJoinMeetingByCode,
  onCreateMeeting,
  onBackToTeaser
}: LoginPageProps) {
  // Credentials input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  // Modals / Overlays
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  
  // Custom states for interactive mockups
  const [meetingCode, setMeetingCode] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<'student' | 'presenter'>('student');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorText('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setErrorText('Please enter your password');
      return;
    }
    // Grant access 
    onLoginSuccess(username.trim());
  };

  const handleJoinMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingCode.trim()) return;
    onJoinMeetingByCode(meetingCode.trim());
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0A0C] text-white select-none p-4 md:p-8">
      {/* Visual Background with gradient layers and floating crosses */}
      <BackgroundGlow />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Frosted Half-moon / Crescent shaped visual containing "MeetPark" */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex items-center justify-center lg:justify-start"
        >
          {/* Overlapping white circular crescent containing MeetPark branding */}
          <div className="relative w-full max-w-md lg:max-w-xl aspect-square md:aspect-[4/3] lg:aspect-square bg-white/[0.03] backdrop-blur-2xl rounded-3xl lg:rounded-r-[400px] lg:rounded-l-3xl shadow-2xl flex flex-col justify-center px-10 py-16 text-left border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.02] to-transparent pointer-events-none" />
            
            {/* Soft decorative background circles details */}
            <div className="absolute top-4 left-4 text-xs text-indigo-400 font-extrabold tracking-widest flex items-center gap-1.5 opacity-80">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>GLOBAL PARK NETWORK</span>
            </div>
            
            <button 
              onClick={onBackToTeaser}
              className="absolute right-6 top-6 text-xs font-semibold text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all px-3 py-1.5 rounded-full pointer-events-auto"
            >
              ← Back
            </button>

            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              MeetPark
            </h1>
            <p className="mt-3 text-lg md:text-xl text-slate-400 font-light select-text">
              Explore the global park
            </p>

            <div className="mt-8 space-y-4 text-slate-300 select-text hidden md:block">
              <div className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold mt-1 text-sm">✓</span>
                <p className="text-sm">Instant interactive video calls without software installs.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold mt-1 text-sm">✓</span>
                <p className="text-sm">Real-time collaboration whiteboard, document sharing, and notes.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold mt-1 text-sm">✓</span>
                <p className="text-sm">Modern social feeds, posts, channels, and group chat systems.</p>
              </div>
            </div>

            {/* Quick stats on left card */}
            <div className="mt-12 flex gap-6 border-t border-white/5 pt-6">
              <div>
                <span className="block text-xl font-bold text-white">50k+</span>
                <span className="text-xs text-slate-500 font-medium">Active Citizens</span>
              </div>
              <div className="border-r border-white/5" />
              <div>
                <span className="block text-xl font-bold text-white">99.9%</span>
                <span className="text-xs text-slate-500 font-medium">Class Uptime</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Primary Actions Form & Credentials Area */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center w-full max-w-xl mx-auto">
          
          {/* Top Bar Navigation Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 w-full">
            {/* Create account button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSignupModal(true)}
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 font-bold tracking-wide px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 text-xs sm:text-sm cursor-pointer border border-indigo-500/35"
            >
              Create a new Account
            </motion.button>

            {/* Join a meeting or class button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowJoinModal(true)}
              className="bg-white/5 hover:bg-white/10 text-white font-bold tracking-wide px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 text-xs sm:text-sm cursor-pointer border border-white/10"
            >
              Join a meeting or class
            </motion.button>
          </div>

          {/* Form Credentials Section with SVG curly brace */}
          <div className="relative w-full flex items-center justify-center pl-1 sm:pl-8">
            
            {/* Curly Brace svg facing right */}
            <div className="absolute left-0 top-[10%] bottom-[10%] w-10 hidden sm:flex items-center justify-center text-indigo-500/30">
              <svg 
                viewBox="0 0 20 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-full w-full opacity-80"
              >
                <path d="M 20, 5 C 10,5 5,15 5,25 L 5,45 C 5,48 2,50 0,50 C 2,50 5,52 5,55 L 5,75 C 5,85 10,95 20,95" />
              </svg>
            </div>

            {/* Dynamic Form fields block */}
            <form onSubmit={handleLoginSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm ml-2">
              
              {/* Username field */}
              <div className="w-full relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Type your Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorText('');
                  }}
                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-white font-medium placeholder-slate-500 outline-none shadow-sm transition-all focus:ring-4 focus:ring-indigo-500/20 focus:bg-white/10"
                />
              </div>

              {/* Password field */}
              <div className="w-full relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Type your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorText('');
                  }}
                  className="w-full pl-11 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500 text-white font-medium placeholder-slate-500 outline-none shadow-sm transition-all focus:ring-4 focus:ring-indigo-500/20 focus:bg-white/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Error messages if any */}
              {errorText && (
                <div className="text-red-400 text-xs font-semibold text-center border bg-red-500/10 border-red-500/25 py-2 px-3 rounded-xl w-full">
                  {errorText}
                </div>
              )}

              {/* Forget password link */}
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(true);
                  setRecoverySuccess(false);
                }}
                className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-md border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Forget username or password
              </button>

              {/* Login Button with rich deep gradient */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold tracking-wide py-4 px-6 rounded-2xl shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/25 cursor-pointer text-center text-sm uppercase transition-all mt-2 border-t border-white/10"
              >
                Log In
              </motion.button>

              {/* Instant meeting helper */}
              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">Want to teach/join a class instantly?</span>
                <button
                  type="button"
                  onClick={onCreateMeeting}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
                >
                  Create a Direct Meeting Room (Zoom Simulation)
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

      {/* --- Sign Up Modal Popup --- */}
      <AnimatePresence>
        {showSignupModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F0F14]/95 backdrop-blur-3xl rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative border border-white/10 text-white"
            >
              <button 
                onClick={() => setShowSignupModal(false)}
                className="absolute right-4 top-4 p-1.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  MP
                </div>
                <h3 className="text-xl font-bold text-white">Become a Park Citizen</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">Create your universal credentials to join classes, write social updates, and share workspace files.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Choose Username</label>
                  <input 
                    type="text" 
                    placeholder="e.g. joshua_meet"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">E-mail Address</label>
                  <input 
                    type="email" 
                    placeholder="yourname@gmail.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm text-white focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm text-white focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1.5">Define Your Primary Role</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSignupRole('student')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition border ${signupRole === 'student' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-white/5 text-slate-300 border-white/5'}`}
                    >
                      Class / Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupRole('presenter')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold transition border ${signupRole === 'presenter' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-white/5 text-slate-300 border-white/5'}`}
                    >
                      Teacher / Speaker
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (signupUsername) {
                      onLoginSuccess(signupUsername);
                    } else {
                      onLoginSuccess('ParkMember');
                    }
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-indigo-500/10 text-xs sm:text-sm text-center mt-2 cursor-pointer"
                >
                  Create & Log In Instantly
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Pass Recovery Modal --- */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F0F14]/95 backdrop-blur-3xl rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative border border-white/10 text-white"
            >
              <button 
                onClick={() => setShowResetModal(false)}
                className="absolute right-4 top-4 p-1.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-2">Recover Credentials</h3>
              <p className="text-xs text-slate-400 mb-4">Input your registered email to request password reset code.</p>

              {recoverySuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
                  <span className="mx-auto w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">✓</span>
                  <p className="text-xs text-emerald-300 font-medium font-sans">Reset instructions sent to recovery email link.</p>
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="mt-3 text-xs font-semibold text-slate-400 underline hover:text-white"
                  >
                    Close Portal
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Type your email address"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 outline-none text-sm text-white focus:border-indigo-500"
                  />
                  <button
                    onClick={() => setRecoverySuccess(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition"
                  >
                    Send Recovery Email
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Join Meeting Code Modal --- */}
      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F0F14]/95 backdrop-blur-3xl rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative border border-white/10 text-white"
            >
              <button 
                onClick={() => setShowJoinModal(false)}
                className="absolute right-4 top-4 p-1.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="text-lg font-bold text-white">Join Zoom Class</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">Input any generated MeetPark code (e.g. <code>MPK-CLASS-101</code>) to enter the online sandbox stream.</p>

              <form onSubmit={handleJoinMeetingSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="e.g. MPK-CLASS-101"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-center font-mono font-bold text-white tracking-wider text-sm focus:border-indigo-500 uppercase"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition text-xs sm:text-sm"
                  >
                    Join Room
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowJoinModal(false);
                      onCreateMeeting();
                    }}
                    className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 font-semibold py-2.5 px-3 rounded-lg transition text-xs"
                  >
                    Create New
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer System Info */}
      <footer className="relative z-10 w-full text-center text-[10px] text-slate-500 uppercase tracking-[2px] mt-8 pt-6 border-t border-white/5">
        <p>MeetPark Super App • Premium Frosted Glass Interface</p>
      </footer>
    </div>
  );
}
