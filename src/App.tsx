import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TeaserPage from './components/TeaserPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import MeetingRoom from './components/MeetingRoom';

type AppView = 'teaser' | 'login' | 'dashboard' | 'meeting';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('teaser');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeMeetingCode, setActiveMeetingCode] = useState('');
  const [activeMeetingIsHost, setActiveMeetingIsHost] = useState(false);
  const [previousView, setPreviousView] = useState<AppView>('teaser');

  // Generator of one-time class code (Zoom-like)
  const generateMeetCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // eye-safe characters
    let part1 = '';
    let part2 = '';
    let part3 = '';
    for (let i = 0; i < 3; i++) {
      part1 += chars.charAt(Math.floor(Math.random() * chars.length));
      part2 += chars.charAt(Math.floor(Math.random() * chars.length));
      part3 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `MPK-${part1}-${part2}-${part3}`;
  };

  // Nav actions
  const handleLaunchMeeting = (isHost: boolean, code?: string) => {
    setPreviousView(currentView);
    const selectedCode = code || generateMeetCode();
    setActiveMeetingCode(selectedCode);
    setActiveMeetingIsHost(isHost);
    setCurrentView('meeting');
  };

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleLeaveMeeting = () => {
    // If the user was logged in before, return to dashboard; otherwise return to teaser or login
    if (currentUser) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-50 overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* Render TeaserPage */}
        {currentView === 'teaser' && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <TeaserPage
              onExplore={() => setCurrentView('login')}
              onCreateInstantMeeting={() => handleLaunchMeeting(true)}
            />
          </motion.div>
        )}

        {/* Render LoginPage */}
        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onJoinMeetingByCode={(code) => handleLaunchMeeting(false, code)}
              onCreateMeeting={() => handleLaunchMeeting(true)}
              onBackToTeaser={() => setCurrentView('teaser')}
            />
          </motion.div>
        )}

        {/* Render Dashboard */}
        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Dashboard
              currentUsername={currentUser || 'Explorer'}
              onLogout={handleLogout}
              onCreateMeeting={() => handleLaunchMeeting(true)}
              onJoinMeetingByCode={(code) => handleLaunchMeeting(false, code)}
            />
          </motion.div>
        )}

        {/* Render MeetingRoom */}
        {currentView === 'meeting' && (
          <motion.div
            key="meeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <MeetingRoom
              meetingCode={activeMeetingCode}
              isHost={activeMeetingIsHost}
              onLeaveMeeting={handleLeaveMeeting}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
