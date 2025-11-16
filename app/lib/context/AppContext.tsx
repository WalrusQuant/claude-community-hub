"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  Server,
  Channel,
  Message,
  ServerMember,
  ChannelCategory,
} from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { generateId } from "../utils";

interface AppContextType {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Users
  users: User[];
  addUser: (user: Omit<User, "id" | "createdAt">) => User;
  updateUser: (userId: string, updates: Partial<User>) => void;

  // Servers
  servers: Server[];
  addServer: (server: Omit<Server, "id" | "createdAt">) => Server;
  updateServer: (serverId: string, updates: Partial<Server>) => void;
  deleteServer: (serverId: string) => void;
  getUserServers: (userId: string) => Server[];

  // Channels
  channels: Channel[];
  addChannel: (channel: Omit<Channel, "id" | "createdAt">) => Channel;
  updateChannel: (channelId: string, updates: Partial<Channel>) => void;
  deleteChannel: (channelId: string) => void;
  getServerChannels: (serverId: string) => Channel[];

  // Categories
  categories: ChannelCategory[];
  addCategory: (category: Omit<ChannelCategory, "id">) => ChannelCategory;
  updateCategory: (categoryId: string, updates: Partial<ChannelCategory>) => void;
  deleteCategory: (categoryId: string) => void;

  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, "id" | "createdAt" | "reactions">) => Message;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (messageId: string) => void;
  getChannelMessages: (channelId: string) => Message[];
  addReaction: (messageId: string, emoji: string, userId: string) => void;
  removeReaction: (messageId: string, emoji: string, userId: string) => void;

  // Server Members
  serverMembers: ServerMember[];
  addServerMember: (member: ServerMember) => void;
  updateServerMember: (serverId: string, userId: string, updates: Partial<ServerMember>) => void;
  removeServerMember: (serverId: string, userId: string) => void;
  getServerMembers: (serverId: string) => ServerMember[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>("currentUser", null);
  const [users, setUsers] = useLocalStorage<User[]>("users", []);
  const [servers, setServers] = useLocalStorage<Server[]>("servers", []);
  const [channels, setChannels] = useLocalStorage<Channel[]>("channels", []);
  const [categories, setCategories] = useLocalStorage<ChannelCategory[]>("categories", []);
  const [messages, setMessages] = useLocalStorage<Message[]>("messages", []);
  const [serverMembers, setServerMembers] = useLocalStorage<ServerMember[]>("serverMembers", []);

  // Initialize demo data if empty
  useEffect(() => {
    if (users.length === 0) {
      initializeDemoData();
    }
  }, []);

  const initializeDemoData = () => {
    // Create demo user
    const demoUser: User = {
      id: generateId(),
      username: "DemoUser",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser",
      status: "online",
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    // Create additional users
    const user2: User = {
      id: generateId(),
      username: "Alice",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      status: "online",
      role: "member",
      createdAt: new Date().toISOString(),
    };

    const user3: User = {
      id: generateId(),
      username: "Bob",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      status: "away",
      role: "moderator",
      createdAt: new Date().toISOString(),
    };

    setUsers([demoUser, user2, user3]);
    setCurrentUser(demoUser);

    // Create demo server
    const demoServer: Server = {
      id: generateId(),
      name: "Community Hub",
      icon: "🏠",
      ownerId: demoUser.id,
      description: "Welcome to the Community Hub!",
      memberIds: [demoUser.id, user2.id, user3.id],
      createdAt: new Date().toISOString(),
    };

    const gamingServer: Server = {
      id: generateId(),
      name: "Gaming Squad",
      icon: "🎮",
      ownerId: demoUser.id,
      description: "Gaming community",
      memberIds: [demoUser.id, user2.id],
      createdAt: new Date().toISOString(),
    };

    setServers([demoServer, gamingServer]);

    // Create categories
    const generalCategory: ChannelCategory = {
      id: generateId(),
      name: "TEXT CHANNELS",
      serverId: demoServer.id,
      collapsed: false,
      position: 0,
    };

    const voiceCategory: ChannelCategory = {
      id: generateId(),
      name: "VOICE CHANNELS",
      serverId: demoServer.id,
      collapsed: false,
      position: 1,
    };

    setCategories([generalCategory, voiceCategory]);

    // Create demo channels
    const generalChannel: Channel = {
      id: generateId(),
      name: "general",
      serverId: demoServer.id,
      categoryId: generalCategory.id,
      type: "text",
      description: "General discussion",
      position: 0,
      createdAt: new Date().toISOString(),
    };

    const randomChannel: Channel = {
      id: generateId(),
      name: "random",
      serverId: demoServer.id,
      categoryId: generalCategory.id,
      type: "text",
      description: "Random stuff",
      position: 1,
      createdAt: new Date().toISOString(),
    };

    const voiceChannel: Channel = {
      id: generateId(),
      name: "General Voice",
      serverId: demoServer.id,
      categoryId: voiceCategory.id,
      type: "voice",
      position: 0,
      createdAt: new Date().toISOString(),
    };

    // Gaming server channels
    const gamingGeneral: Channel = {
      id: generateId(),
      name: "general",
      serverId: gamingServer.id,
      type: "text",
      description: "General gaming chat",
      position: 0,
      createdAt: new Date().toISOString(),
    };

    setChannels([generalChannel, randomChannel, voiceChannel, gamingGeneral]);

    // Create demo messages
    const welcomeMessage: Message = {
      id: generateId(),
      content: "Welcome to Community Hub! Feel free to chat and share.",
      authorId: demoUser.id,
      channelId: generalChannel.id,
      serverId: demoServer.id,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      reactions: [],
      mentions: [],
    };

    const secondMessage: Message = {
      id: generateId(),
      content: "Hey everyone! Happy to be here!",
      authorId: user2.id,
      channelId: generalChannel.id,
      serverId: demoServer.id,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      reactions: [{ emoji: "👋", userIds: [demoUser.id], count: 1 }],
      mentions: [],
    };

    const thirdMessage: Message = {
      id: generateId(),
      content: "This platform looks awesome!",
      authorId: user3.id,
      channelId: generalChannel.id,
      serverId: demoServer.id,
      createdAt: new Date(Date.now() - 900000).toISOString(),
      reactions: [{ emoji: "🔥", userIds: [demoUser.id, user2.id], count: 2 }],
      mentions: [],
    };

    setMessages([welcomeMessage, secondMessage, thirdMessage]);

    // Create server members
    setServerMembers([
      {
        userId: demoUser.id,
        serverId: demoServer.id,
        role: "admin",
        joinedAt: new Date().toISOString(),
      },
      {
        userId: user2.id,
        serverId: demoServer.id,
        role: "member",
        joinedAt: new Date().toISOString(),
      },
      {
        userId: user3.id,
        serverId: demoServer.id,
        role: "moderator",
        joinedAt: new Date().toISOString(),
      },
      {
        userId: demoUser.id,
        serverId: gamingServer.id,
        role: "admin",
        joinedAt: new Date().toISOString(),
      },
      {
        userId: user2.id,
        serverId: gamingServer.id,
        role: "member",
        joinedAt: new Date().toISOString(),
      },
    ]);
  };

  // User functions
  const addUser = (userData: Omit<User, "id" | "createdAt">): User => {
    const newUser: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, ...updates } : u)));
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  // Server functions
  const addServer = (serverData: Omit<Server, "id" | "createdAt">): Server => {
    const newServer: Server = {
      ...serverData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setServers([...servers, newServer]);
    return newServer;
  };

  const updateServer = (serverId: string, updates: Partial<Server>) => {
    setServers(servers.map((s) => (s.id === serverId ? { ...s, ...updates } : s)));
  };

  const deleteServer = (serverId: string) => {
    setServers(servers.filter((s) => s.id !== serverId));
    setChannels(channels.filter((c) => c.serverId !== serverId));
    setMessages(messages.filter((m) => m.serverId !== serverId));
    setCategories(categories.filter((c) => c.serverId !== serverId));
    setServerMembers(serverMembers.filter((m) => m.serverId !== serverId));
  };

  const getUserServers = (userId: string): Server[] => {
    return servers.filter((s) => s.memberIds.includes(userId));
  };

  // Channel functions
  const addChannel = (channelData: Omit<Channel, "id" | "createdAt">): Channel => {
    const newChannel: Channel = {
      ...channelData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setChannels([...channels, newChannel]);
    return newChannel;
  };

  const updateChannel = (channelId: string, updates: Partial<Channel>) => {
    setChannels(channels.map((c) => (c.id === channelId ? { ...c, ...updates } : c)));
  };

  const deleteChannel = (channelId: string) => {
    setChannels(channels.filter((c) => c.id !== channelId));
    setMessages(messages.filter((m) => m.channelId !== channelId));
  };

  const getServerChannels = (serverId: string): Channel[] => {
    return channels.filter((c) => c.serverId === serverId);
  };

  // Category functions
  const addCategory = (categoryData: Omit<ChannelCategory, "id">): ChannelCategory => {
    const newCategory: ChannelCategory = {
      ...categoryData,
      id: generateId(),
    };
    setCategories([...categories, newCategory]);
    return newCategory;
  };

  const updateCategory = (categoryId: string, updates: Partial<ChannelCategory>) => {
    setCategories(categories.map((c) => (c.id === categoryId ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter((c) => c.id !== categoryId));
    // Update channels to remove category reference
    setChannels(
      channels.map((c) =>
        c.categoryId === categoryId ? { ...c, categoryId: undefined } : c
      )
    );
  };

  // Message functions
  const addMessage = (
    messageData: Omit<Message, "id" | "createdAt" | "reactions">
  ): Message => {
    const newMessage: Message = {
      ...messageData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      reactions: [],
    };
    setMessages([...messages, newMessage]);
    return newMessage;
  };

  const updateMessage = (messageId: string, updates: Partial<Message>) => {
    setMessages(
      messages.map((m) =>
        m.id === messageId ? { ...m, ...updates, editedAt: new Date().toISOString() } : m
      )
    );
  };

  const deleteMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m.id !== messageId));
  };

  const getChannelMessages = (channelId: string): Message[] => {
    return messages.filter((m) => m.channelId === channelId);
  };

  const addReaction = (messageId: string, emoji: string, userId: string) => {
    setMessages(
      messages.map((m) => {
        if (m.id !== messageId) return m;

        const existingReaction = m.reactions.find((r) => r.emoji === emoji);
        if (existingReaction) {
          if (existingReaction.userIds.includes(userId)) return m;
          return {
            ...m,
            reactions: m.reactions.map((r) =>
              r.emoji === emoji
                ? {
                    ...r,
                    userIds: [...r.userIds, userId],
                    count: r.count + 1,
                  }
                : r
            ),
          };
        }

        return {
          ...m,
          reactions: [...m.reactions, { emoji, userIds: [userId], count: 1 }],
        };
      })
    );
  };

  const removeReaction = (messageId: string, emoji: string, userId: string) => {
    setMessages(
      messages.map((m) => {
        if (m.id !== messageId) return m;

        return {
          ...m,
          reactions: m.reactions
            .map((r) => {
              if (r.emoji !== emoji) return r;
              return {
                ...r,
                userIds: r.userIds.filter((id) => id !== userId),
                count: r.count - 1,
              };
            })
            .filter((r) => r.count > 0),
        };
      })
    );
  };

  // Server Member functions
  const addServerMember = (member: ServerMember) => {
    setServerMembers([...serverMembers, member]);
    // Update server memberIds
    setServers(
      servers.map((s) =>
        s.id === member.serverId
          ? { ...s, memberIds: [...s.memberIds, member.userId] }
          : s
      )
    );
  };

  const updateServerMember = (
    serverId: string,
    userId: string,
    updates: Partial<ServerMember>
  ) => {
    setServerMembers(
      serverMembers.map((m) =>
        m.serverId === serverId && m.userId === userId ? { ...m, ...updates } : m
      )
    );
  };

  const removeServerMember = (serverId: string, userId: string) => {
    setServerMembers(
      serverMembers.filter((m) => !(m.serverId === serverId && m.userId === userId))
    );
    // Update server memberIds
    setServers(
      servers.map((s) =>
        s.id === serverId
          ? { ...s, memberIds: s.memberIds.filter((id) => id !== userId) }
          : s
      )
    );
  };

  const getServerMembers = (serverId: string): ServerMember[] => {
    return serverMembers.filter((m) => m.serverId === serverId);
  };

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    users,
    addUser,
    updateUser,
    servers,
    addServer,
    updateServer,
    deleteServer,
    getUserServers,
    channels,
    addChannel,
    updateChannel,
    deleteChannel,
    getServerChannels,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    messages,
    addMessage,
    updateMessage,
    deleteMessage,
    getChannelMessages,
    addReaction,
    removeReaction,
    serverMembers,
    addServerMember,
    updateServerMember,
    removeServerMember,
    getServerMembers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
