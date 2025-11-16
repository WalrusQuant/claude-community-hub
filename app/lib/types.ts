export type UserRole = "admin" | "moderator" | "member";

export type UserStatus = "online" | "away" | "offline";

export interface User {
  id: string;
  username: string;
  avatar: string;
  status: UserStatus;
  role: UserRole;
  createdAt: string;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  ownerId: string;
  description?: string;
  memberIds: string[];
  createdAt: string;
}

export interface ChannelCategory {
  id: string;
  name: string;
  serverId: string;
  collapsed: boolean;
  position: number;
}

export interface Channel {
  id: string;
  name: string;
  serverId: string;
  categoryId?: string;
  type: "text" | "voice";
  description?: string;
  position: number;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  authorId: string;
  channelId: string;
  serverId: string;
  createdAt: string;
  editedAt?: string;
  reactions: MessageReaction[];
  mentions: string[];
  attachments?: MessageAttachment[];
  replyToId?: string;
}

export interface MessageReaction {
  emoji: string;
  userIds: string[];
  count: number;
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: "image" | "file";
  size: number;
}

export interface ServerMember {
  userId: string;
  serverId: string;
  role: UserRole;
  joinedAt: string;
  nickname?: string;
}
