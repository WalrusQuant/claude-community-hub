"use client";

import { useApp } from "../lib/context/AppContext";
import { Message, User } from "../lib/types";
import { formatMessageTime } from "../lib/utils";
import { MoreVertical, Reply, Smile } from "lucide-react";
import { useState } from "react";

interface MessageItemProps {
  message: Message;
  author: User;
  onReact: (emoji: string) => void;
  currentUserId?: string;
}

function MessageItem({ message, author, onReact, currentUserId }: MessageItemProps) {
  const [showReactions, setShowReactions] = useState(false);

  const commonEmojis = ["👍", "❤️", "😂", "🎉", "🔥", "👀"];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500";
      case "moderator":
        return "bg-discord-blurple";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="group px-4 py-2 hover:bg-discord-dark/30 relative message-enter">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={author.avatar}
            alt={author.username}
            className="w-10 h-10 rounded-full"
          />
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-discord-dark ${
              author.status === "online"
                ? "bg-green-500"
                : author.status === "away"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          />
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline space-x-2">
            <span className="font-semibold text-white">{author.username}</span>
            {author.role !== "member" && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${getRoleBadgeColor(
                  author.role
                )} text-white font-medium`}
              >
                {author.role.toUpperCase()}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {formatMessageTime(message.createdAt)}
            </span>
            {message.editedAt && (
              <span className="text-xs text-gray-500">(edited)</span>
            )}
          </div>
          <div className="text-gray-100 mt-1 break-words">{message.content}</div>

          {/* Reactions */}
          {message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {message.reactions.map((reaction) => {
                const hasReacted = currentUserId
                  ? reaction.userIds.includes(currentUserId)
                  : false;

                return (
                  <button
                    key={reaction.emoji}
                    onClick={() => onReact(reaction.emoji)}
                    className={`
                      flex items-center space-x-1 px-2 py-1 rounded text-sm
                      transition-colors
                      ${
                        hasReacted
                          ? "bg-discord-blurple/20 border border-discord-blurple"
                          : "bg-discord-gray border border-transparent hover:border-gray-600"
                      }
                    `}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-xs text-gray-300">{reaction.count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Message actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 absolute top-2 right-4 bg-discord-gray border border-discord-lightgray rounded p-1">
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="p-1.5 hover:bg-discord-lightgray rounded transition-colors relative"
          >
            <Smile className="w-4 h-4 text-gray-400" />

            {/* Emoji picker */}
            {showReactions && (
              <div className="absolute top-full right-0 mt-2 bg-discord-dark border border-discord-lightgray rounded-lg p-2 shadow-lg z-10">
                <div className="flex space-x-1">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReact(emoji);
                        setShowReactions(false);
                      }}
                      className="text-xl hover:bg-discord-lightgray p-1 rounded transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface MessageListProps {
  channelId: string;
}

export default function MessageList({ channelId }: MessageListProps) {
  const { messages, users, currentUser, addReaction, removeReaction } = useApp();

  const channelMessages = messages
    .filter((m) => m.channelId === channelId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleReaction = (messageId: string, emoji: string) => {
    if (!currentUser) return;

    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    const reaction = message.reactions.find((r) => r.emoji === emoji);
    const hasReacted = reaction?.userIds.includes(currentUser.id);

    if (hasReacted) {
      removeReaction(messageId, emoji, currentUser.id);
    } else {
      addReaction(messageId, emoji, currentUser.id);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {channelMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <Hash className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg font-semibold">No messages yet</p>
            <p className="text-sm">Be the first to say something!</p>
          </div>
        </div>
      ) : (
        <div className="py-4">
          {channelMessages.map((message) => {
            const author = users.find((u) => u.id === message.authorId);
            if (!author) return null;

            return (
              <MessageItem
                key={message.id}
                message={message}
                author={author}
                onReact={(emoji) => handleReaction(message.id, emoji)}
                currentUserId={currentUser?.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function Hash({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  );
}
