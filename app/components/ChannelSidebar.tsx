"use client";

import { useApp } from "../lib/context/AppContext";
import { Server, Channel, ChannelCategory } from "../lib/types";
import { Hash, Volume2, ChevronDown, ChevronRight, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ChannelSidebarProps {
  server: Server;
}

export default function ChannelSidebar({ server }: ChannelSidebarProps) {
  const { channels, categories, currentUser, updateCategory } = useApp();
  const params = useParams();
  const activeChannelId = params?.channelId as string | undefined;

  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  const serverChannels = channels.filter((c) => c.serverId === server.id);
  const serverCategories = categories.filter((c) => c.serverId === server.id);

  const toggleCategory = (categoryId: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(categoryId)) {
      newCollapsed.delete(categoryId);
    } else {
      newCollapsed.add(categoryId);
    }
    setCollapsedCategories(newCollapsed);
  };

  const renderChannel = (channel: Channel) => {
    const isActive = channel.id === activeChannelId;

    return (
      <Link
        key={channel.id}
        href={`/server/${server.id}/channel/${channel.id}`}
        className={`
          flex items-center px-2 py-1 mx-2 rounded group cursor-pointer
          ${isActive ? "bg-discord-gray text-white" : "text-gray-400 hover:bg-discord-lightgray hover:text-gray-200"}
        `}
      >
        {channel.type === "text" ? (
          <Hash className="w-5 h-5 mr-2 flex-shrink-0" />
        ) : (
          <Volume2 className="w-5 h-5 mr-2 flex-shrink-0" />
        )}
        <span className="text-sm font-medium truncate">{channel.name}</span>
      </Link>
    );
  };

  const renderCategory = (category: ChannelCategory) => {
    const categoryChannels = serverChannels
      .filter((c) => c.categoryId === category.id)
      .sort((a, b) => a.position - b.position);

    const isCollapsed = collapsedCategories.has(category.id);

    return (
      <div key={category.id} className="mt-4">
        <div
          onClick={() => toggleCategory(category.id)}
          className="flex items-center px-2 py-1 mx-2 cursor-pointer group"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 mr-1 text-gray-400" />
          ) : (
            <ChevronDown className="w-3 h-3 mr-1 text-gray-400" />
          )}
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {category.name}
          </span>
        </div>
        {!isCollapsed && (
          <div className="mt-1 space-y-0.5">
            {categoryChannels.map(renderChannel)}
          </div>
        )}
      </div>
    );
  };

  const uncategorizedChannels = serverChannels
    .filter((c) => !c.categoryId)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="w-60 bg-discord-dark flex flex-col">
      {/* Server header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-discord-darker shadow-md">
        <h2 className="font-semibold text-white truncate">{server.name}</h2>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>

      {/* Channels list */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Uncategorized channels */}
        {uncategorizedChannels.length > 0 && (
          <div className="space-y-0.5">
            {uncategorizedChannels.map(renderChannel)}
          </div>
        )}

        {/* Categorized channels */}
        {serverCategories
          .sort((a, b) => a.position - b.position)
          .map(renderCategory)}
      </div>

      {/* User info bar */}
      <div className="h-14 px-2 bg-discord-darker flex items-center">
        <div className="flex items-center flex-1 min-w-0">
          <div className="relative">
            <img
              src={currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
              alt={currentUser?.username || "User"}
              className="w-8 h-8 rounded-full"
            />
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-discord-darker ${
                currentUser?.status === "online"
                  ? "bg-green-500"
                  : currentUser?.status === "away"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            />
          </div>
          <div className="ml-2 flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">
              {currentUser?.username || "Guest"}
            </div>
            <div className="text-xs text-gray-400 truncate">
              #{currentUser?.id.slice(0, 4) || "0000"}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/profile">
            <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
}
