export interface User {
  username: string;
  isLoggedIn: boolean;
  avatar?: string;
  displayName?: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: 'host' | 'presenter' | 'student';
  isMuted: boolean;
  isVideoOn: boolean;
  isRaisingHand: boolean;
  talking?: boolean;
}

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  hasLiked?: boolean;
}

export interface DirectMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
}
