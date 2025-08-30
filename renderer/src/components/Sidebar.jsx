import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { auth, database } from '../config/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const SidebarContainer = styled(Box)(({ theme, open }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: open ? '280px' : '0',
  background: 'linear-gradient(145deg, #0f172a, #1e293b)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  overflow: 'hidden',
  zIndex: 1000,
  borderRight: '1px solid rgba(59, 130, 246, 0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 4px 0 20px rgba(0, 0, 0, 0.3)',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '12px',
  top: '12px',
  color: '#60a5fa',
  backgroundColor: 'rgba(96, 165, 250, 0.15)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  transition: 'all 0.3s ease',
  zIndex: 1001,
  width: '36px',
  height: '36px',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    transform: 'scale(1.08)',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    color: '#93c5fd',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const NewChatButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 18px',
  margin: '18px',
  background: 'linear-gradient(135deg, #1e293b, #334155)',
  borderRadius: '12px',
  cursor: 'pointer',
  color: '#e2e8f0',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  transition: 'all 0.3s ease',
  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.2)',
  fontWeight: '600',
  fontSize: '14px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #334155, #3b82f6)',
    transform: 'translateY(-2px)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 6px 20px rgba(59, 130, 246, 0.2)',
    borderColor: '#3b82f6',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
}));

const ChatList = styled(Box)(({ theme }) => ({
  marginTop: '10px',
  overflowY: 'auto',
  height: 'calc(100vh - 140px)',
  padding: '0 8px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(30, 41, 59, 0.3)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(to bottom, #3b82f6, #2563eb)',
    borderRadius: '3px',
    transition: 'all 0.3s ease',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'linear-gradient(to bottom, #60a5fa, #3b82f6)',
  },
}));

const ChatItem = styled(Box)(({ theme, active }) => ({
  padding: '14px 16px',
  margin: '6px 8px',
  background: active 
    ? 'linear-gradient(135deg, #1e293b, #3b82f6)' 
    : 'rgba(30, 41, 59, 0.6)',
  borderRadius: '12px',
  cursor: 'pointer',
  color: '#e2e8f0',
  transition: 'all 0.3s ease',
  border: `1px solid ${active ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)'}`,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: active 
    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 15px rgba(59, 130, 246, 0.2)' 
    : 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: active ? '0' : '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
    transition: 'left 0.4s ease',
  },
  '&:hover': {
    background: active 
      ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' 
      : 'linear-gradient(135deg, #334155, #475569)',
    transform: 'translateX(4px)',
    borderColor: '#3b82f6',
    boxShadow: active 
      ? 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(59, 130, 246, 0.3)' 
      : 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 4px 15px rgba(59, 130, 246, 0.1)',
    '&::before': {
      left: '100%',
    },
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}));

const ChatTitle = styled(Box)(({ theme }) => ({
  fontSize: '15px',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#f1f5f9',
  textShadow: '0 0 8px rgba(241, 245, 249, 0.1)',
  letterSpacing: '0.02em',
}));

const LastMessage = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  color: '#94a3b8',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  opacity: 0.8,
  lineHeight: 1.4,
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: '20px 18px 10px',
  borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
  marginBottom: '10px',
  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.02))',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
}));

const SidebarTitle = styled(Box)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: '700',
  color: '#f1f5f9',
  background: 'linear-gradient(45deg, #3b82f6, #60a5fa)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
  letterSpacing: '0.02em',
  marginTop: '30px',
}));

const Sidebar = ({ open, onToggle, onChatSelect, currentChatId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const chatsRef = collection(database, 'Users', auth.currentUser.uid, 'chats');
    const q = query(chatsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatList);
    });

    return () => unsubscribe();
  }, []);

  const handleNewChat = async () => {
    if (!auth.currentUser) return;

    const chatsRef = collection(database, 'Users', auth.currentUser.uid, 'chats');
    const newChat = {
      title: 'New Chat',
      lastMessage: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(chatsRef, newChat);
    onChatSelect(docRef.id);
  };

  return (
    <SidebarContainer open={open}>
      <CloseButton onClick={onToggle} size="small">
        <CloseIcon />
      </CloseButton>
      
      <SidebarHeader>
        <SidebarTitle>Chat History</SidebarTitle>
      </SidebarHeader>

      <NewChatButton onClick={handleNewChat}>
        <AddIcon sx={{ 
          fontSize: '20px',
          filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))'
        }} />
        New Chat
      </NewChatButton>

      <ChatList>
        {chats.map((chat) => (
          <ChatItem 
            key={chat.id} 
            active={chat.id === currentChatId}
            onClick={() => onChatSelect(chat.id)}
          >
            <ChatTitle>{chat.title}</ChatTitle>
            <LastMessage>{chat.lastMessage || 'No messages yet'}</LastMessage>
          </ChatItem>
        ))}
      </ChatList>
    </SidebarContainer>
  );
};

export default Sidebar;