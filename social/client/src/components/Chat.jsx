import React, { useState, useEffect, useRef } from 'react';
import { IoSend, IoClose } from 'react-icons/io5';
import { useSocket } from '../context/SocketContext';
import { getConversation, markMessagesAsRead } from '../apiCalls/authCalls';
import { useSelector } from 'react-redux';

function Chat({ selectedUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocket();
  const { userData } = useSelector((state) => state.user);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      loadConversation();
      markMessagesAsRead(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        if (
          (message.sender._id === selectedUser?._id && message.receiver._id === userData?._id) ||
          (message.sender._id === userData?._id && message.receiver._id === selectedUser?._id)
        ) {
          setMessages((prev) => [...prev, message]);
          scrollToBottom();
        }
      });

      socket.on('messageSent', (message) => {
        // Message already added via optimistic update
      });

      socket.on('userTyping', (data) => {
        if (data.userId === selectedUser?._id) {
          setIsTyping(data.isTyping);
        }
      });

      return () => {
        socket.off('receiveMessage');
        socket.off('messageSent');
        socket.off('userTyping');
      };
    }
  }, [socket, selectedUser, userData]);

  const loadConversation = async () => {
    try {
      const conversation = await getConversation(selectedUser._id);
      setMessages(conversation);
      scrollToBottom();
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const messageData = {
      receiverId: selectedUser._id,
      message: newMessage.trim(),
    };

    console.log(messageData)

    // Optimistic update
    const tempMessage = {
      _id: Date.now(),
      sender: { _id: userData._id, userName: userData.userName, profileImage: userData.profileImage },
      receiver: selectedUser,
      message: newMessage.trim(),
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    socket.emit('sendMessage', messageData);
    setNewMessage('');
    handleTyping(false);
    scrollToBottom();
  };

  const handleTyping = (typing) => {
    if (!socket) return;

    socket.emit('typing', {
      receiverId: selectedUser._id,
      isTyping: typing,
    });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing
    handleTyping(true);

    // Stop typing after 2 seconds of no input
    typingTimeoutRef.current = setTimeout(() => {
      handleTyping(false);
    }, 2000);
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profileImage || '/default-avatar.png'}
            alt={selectedUser.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{selectedUser.userName}</h3>
            {isTyping && <p className="text-xs text-blue-500">typing...</p>}
          </div>
        </div>
        <IoClose
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900"
          onClick={onClose}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => {
          const isSender = message.sender._id === userData?._id;
          return (
            <div
              key={message._id || index}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                  isSender
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm break-words">{message.message}</p>
                <p className={`text-xs mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <IoSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;