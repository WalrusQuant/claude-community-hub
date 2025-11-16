"use client";

import { useApp } from "../lib/context/AppContext";
import ServerIcon from "./ServerIcon";
import { Plus, Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ServerSidebar() {
  const { servers, currentUser } = useApp();
  const params = useParams();
  const activeServerId = params?.id as string | undefined;

  const userServers = currentUser
    ? servers.filter((s) => s.memberIds.includes(currentUser.id))
    : [];

  return (
    <div className="w-[72px] bg-discord-darker flex flex-col items-center py-3 space-y-2 overflow-y-auto">
      {/* Home button */}
      <Link
        href="/"
        className="group relative flex items-center justify-center mb-2"
      >
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 cursor-pointer
            ${
              !activeServerId
                ? "bg-discord-blurple rounded-2xl"
                : "bg-discord-gray hover:bg-discord-blurple hover:rounded-2xl"
            }
          `}
        >
          <Home className="w-6 h-6" />
        </div>

        {/* Active indicator */}
        {!activeServerId && (
          <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full -ml-4" />
        )}

        {/* Hover indicator */}
        {activeServerId && (
          <div className="absolute left-0 w-1 h-5 bg-white rounded-r-full -ml-4 opacity-0 group-hover:opacity-100 transition-all duration-200" />
        )}

        {/* Tooltip */}
        <div className="absolute left-16 bg-black text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
          Home
        </div>
      </Link>

      {/* Divider */}
      <div className="w-8 h-[2px] bg-discord-gray rounded-full my-2" />

      {/* Server list */}
      {userServers.map((server) => (
        <ServerIcon
          key={server.id}
          server={server}
          isActive={server.id === activeServerId}
        />
      ))}

      {/* Add server button */}
      <Link
        href="/create-server"
        className="group relative flex items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full bg-discord-gray hover:bg-discord-green hover:rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer">
          <Plus className="w-6 h-6" />
        </div>

        {/* Tooltip */}
        <div className="absolute left-16 bg-black text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
          Add a Server
        </div>
      </Link>
    </div>
  );
}
