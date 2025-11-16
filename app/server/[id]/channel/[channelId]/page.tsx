"use client";

import { useApp } from "../../../../lib/context/AppContext";
import ServerSidebar from "../../../../components/ServerSidebar";
import ChannelSidebar from "../../../../components/ChannelSidebar";
import MessageList from "../../../../components/MessageList";
import MessageInput from "../../../../components/MessageInput";
import { Hash, Volume2, Users, Bell, Pin, Search, Menu } from "lucide-react";
import { useState } from "react";

export default function ChannelPage({
  params,
}: {
  params: { id: string; channelId: string };
}) {
  const { servers, channels, serverMembers, users } = useApp();
  const [showMembers, setShowMembers] = useState(true);
  const [showChannelSidebar, setShowChannelSidebar] = useState(false);

  const server = servers.find((s) => s.id === params.id);
  const channel = channels.find((c) => c.id === params.channelId);

  if (!server || !channel) {
    return (
      <div className="flex h-screen items-center justify-center bg-discord-dark">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Channel not found</p>
        </div>
      </div>
    );
  }

  const members = serverMembers
    .filter((m) => m.serverId === server.id)
    .map((m) => {
      const user = users.find((u) => u.id === m.userId);
      return user ? { ...user, serverRole: m.role } : null;
    })
    .filter(Boolean);

  const onlineMembers = members.filter((m) => m?.status === "online");
  const offlineMembers = members.filter((m) => m?.status !== "online");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Server sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <ServerSidebar />
      </div>

      {/* Channel sidebar - collapsible on mobile */}
      <div
        className={`
          ${showChannelSidebar ? "block" : "hidden"} md:block
          fixed md:relative z-30 inset-y-0 left-0 md:left-auto
        `}
      >
        <ChannelSidebar server={server} />
      </div>

      {/* Overlay for mobile */}
      {showChannelSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setShowChannelSidebar(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-discord-lightgray">
        {/* Channel header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-discord-darker shadow-sm">
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowChannelSidebar(!showChannelSidebar)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {channel.type === "text" ? (
              <Hash className="w-5 h-5 text-gray-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-400" />
            )}
            <h3 className="font-semibold text-white truncate">{channel.name}</h3>
            {channel.description && (
              <>
                <div className="w-px h-5 bg-gray-600 hidden lg:block" />
                <p className="text-sm text-gray-400 hidden lg:block truncate">
                  {channel.description}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hidden sm:block" />
            <Pin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors hidden sm:block" />
            <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <button
              onClick={() => setShowMembers(!showMembers)}
              className={`flex items-center space-x-1 transition-colors ${
                showMembers ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Message list */}
          <div className="flex-1 flex flex-col">
            <MessageList channelId={channel.id} />
            <MessageInput
              channelId={channel.id}
              serverId={server.id}
              channelName={channel.name}
            />
          </div>

          {/* Members sidebar - hidden on small screens */}
          {showMembers && (
            <div className="hidden lg:block w-60 bg-discord-dark overflow-y-auto">
              <div className="p-4">
                {/* Online members */}
                {onlineMembers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Online — {onlineMembers.length}
                    </h4>
                    <div className="space-y-1">
                      {onlineMembers.map((member) => (
                        <MemberItem key={member!.id} member={member!} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Offline members */}
                {offlineMembers.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Offline — {offlineMembers.length}
                    </h4>
                    <div className="space-y-1">
                      {offlineMembers.map((member) => (
                        <MemberItem key={member!.id} member={member!} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MemberItem({ member }: { member: any }) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-400";
      case "moderator":
        return "text-discord-blurple";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-discord-lightgray cursor-pointer group">
      <div className="relative flex-shrink-0">
        <img
          src={member.avatar}
          alt={member.username}
          className="w-8 h-8 rounded-full"
        />
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-discord-dark ${
            member.status === "online"
              ? "bg-green-500"
              : member.status === "away"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${getRoleColor(member.serverRole)}`}>
          {member.username}
        </p>
      </div>
    </div>
  );
}
