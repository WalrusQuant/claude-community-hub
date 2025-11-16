"use client";

import { useState } from "react";
import { useApp } from "../lib/context/AppContext";
import { Plus, Smile, Gift } from "lucide-react";

interface MessageInputProps {
  channelId: string;
  serverId: string;
  channelName: string;
}

export default function MessageInput({
  channelId,
  serverId,
  channelName,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const { addMessage, currentUser } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !currentUser) return;

    // Extract mentions (words starting with @)
    const mentions = message
      .split(" ")
      .filter((word) => word.startsWith("@"))
      .map((word) => word.slice(1));

    addMessage({
      content: message,
      authorId: currentUser.id,
      channelId,
      serverId,
      mentions,
    });

    setMessage("");
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-discord-lightgray rounded-lg">
          <button
            type="button"
            className="p-3 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${channelName}`}
            className="flex-1 bg-transparent py-3 px-2 text-gray-100 placeholder-gray-500 outline-none"
          />

          <div className="flex items-center space-x-2 px-3">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Gift className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
