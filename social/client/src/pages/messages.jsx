import React, { useState, useEffect } from 'react';
import { getAllConversations } from '../apiCalls/authCalls';
import { useSocket } from '../context/SocketContext';
import Chat from '../components/Chat';
import { useLocation } from 'react-router-dom';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { onlineUsers } = useSocket();
  const location = useLocation();

  useEffect(() => {
    loadConversations();
    
    // Check if a user was passed from navigation
    if (location.state?.selectedUser) {
      setSelectedUser(location.state.selectedUser);
    }
  }, [location.state]);

  const loadConversations = async () => {
    try {
      const data = await getAllConversations();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffInHours = (now - d) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (selectedUser) {
    return (
      <div className="h-full">
        <Chat selectedUser={selectedUser} onClose={() => setSelectedUser(null)} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="w-full h-[70px] flex items-center px-6 border-b border-neutral-200 flex-shrink-0">
        <h1 className="text-neutral-800 text-lg font-semibold">Messages</h1>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {conversations.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg font-semibold mb-2">No conversations yet</p>
            <p className="text-sm">Visit someone's profile and click "Message" to start chatting!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.user._id}
                onClick={() => setSelectedUser(conversation.user)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <div className="relative">
                  <img
                    src={conversation.user.profileImage || '/default-avatar.png'}
                    alt={conversation.user.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {isUserOnline(conversation.user._id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {conversation.user.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;