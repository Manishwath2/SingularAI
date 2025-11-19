'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  username: string;
  name?: string;
  email: string;
  avatar?: string;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  createdAt: string;
  sender: User;
  receiver: User;
}

interface Conversation {
  id: string;
  participants: Array<{
    user: User;
  }>;
  messages?: Message[];
}

interface ChatInterfaceProps {
  user: any;
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    loadUsers();
    loadConversations();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/conversations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/messages?conversationId=${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const startConversation = async (participantId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ participantId }),
      });

      if (response.ok) {
        const conversation = await response.json();
        setSelectedConversation(conversation);
        await loadMessages(conversation.id);
        await loadConversations();
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    await loadMessages(conversation.id);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const otherParticipant = selectedConversation.participants.find(
      (p) => p.user.id !== user.id
    );

    if (!otherParticipant) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newMessage,
          receiverId: otherParticipant.user.id,
          conversationId: selectedConversation.id,
        }),
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
      {/* Users/Conversations List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 overflow-y-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Conversations
          </h3>
          {conversations.map((conversation) => {
            const otherUser = conversation.participants.find(
              (p) => p.user.id !== user.id
            )?.user;
            return (
              <button
                key={conversation.id}
                onClick={() => selectConversation(conversation)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {otherUser?.name || otherUser?.username}
                </div>
                {conversation.messages?.[0] && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.messages[0].content}
                  </div>
                )}
              </button>
            );
          })}

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4">
            Start New Chat
          </h3>
          {filteredUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => startConversation(u.id)}
              disabled={loading}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <div className="font-semibold text-gray-900 dark:text-white">
                {u.name || u.username}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                @{u.username}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedConversation.participants.find((p) => p.user.id !== user.id)
                  ?.user.name ||
                  selectedConversation.participants.find((p) => p.user.id !== user.id)
                    ?.user.username}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === user.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a conversation or start a new chat
          </div>
        )}
      </div>
    </div>
  );
}
