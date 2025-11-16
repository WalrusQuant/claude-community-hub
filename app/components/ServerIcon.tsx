"use client";

import Link from "next/link";
import { Server } from "../lib/types";

interface ServerIconProps {
  server: Server;
  isActive?: boolean;
}

export default function ServerIcon({ server, isActive = false }: ServerIconProps) {
  return (
    <Link
      href={`/server/${server.id}`}
      className="group relative flex items-center justify-center mb-2"
    >
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center text-2xl
          transition-all duration-200 cursor-pointer
          ${
            isActive
              ? "bg-discord-blurple rounded-2xl"
              : "bg-discord-gray hover:bg-discord-blurple hover:rounded-2xl"
          }
        `}
      >
        {server.icon}
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 w-1 h-8 bg-white rounded-r-full -ml-4" />
      )}

      {/* Hover indicator */}
      {!isActive && (
        <div className="absolute left-0 w-1 h-5 bg-white rounded-r-full -ml-4 opacity-0 group-hover:opacity-100 transition-all duration-200" />
      )}

      {/* Tooltip */}
      <div className="absolute left-16 bg-black text-white px-3 py-2 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        {server.name}
      </div>
    </Link>
  );
}
