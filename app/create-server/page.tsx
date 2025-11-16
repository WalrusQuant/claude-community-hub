"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../lib/context/AppContext";
import ServerSidebar from "../components/ServerSidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const serverIcons = ["🏠", "🎮", "🎨", "📚", "💻", "🎵", "⚽", "🍕", "🚀", "🌟"];

export default function CreateServerPage() {
  const router = useRouter();
  const { addServer, addChannel, addCategory, currentUser, addServerMember } =
    useApp();

  const [serverName, setServerName] = useState("");
  const [serverIcon, setServerIcon] = useState("🏠");
  const [serverDescription, setServerDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateServer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serverName.trim() || !currentUser) {
      return;
    }

    setIsCreating(true);

    // Create the server
    const newServer = addServer({
      name: serverName,
      icon: serverIcon,
      ownerId: currentUser.id,
      description: serverDescription,
      memberIds: [currentUser.id],
    });

    // Add the current user as a server member with admin role
    addServerMember({
      userId: currentUser.id,
      serverId: newServer.id,
      role: "admin",
      joinedAt: new Date().toISOString(),
    });

    // Create default categories
    const textCategory = addCategory({
      name: "TEXT CHANNELS",
      serverId: newServer.id,
      collapsed: false,
      position: 0,
    });

    const voiceCategory = addCategory({
      name: "VOICE CHANNELS",
      serverId: newServer.id,
      collapsed: false,
      position: 1,
    });

    // Create default channels
    const generalChannel = addChannel({
      name: "general",
      serverId: newServer.id,
      categoryId: textCategory.id,
      type: "text",
      description: "General discussion",
      position: 0,
    });

    addChannel({
      name: "announcements",
      serverId: newServer.id,
      categoryId: textCategory.id,
      type: "text",
      description: "Important announcements",
      position: 1,
    });

    addChannel({
      name: "General Voice",
      serverId: newServer.id,
      categoryId: voiceCategory.id,
      type: "voice",
      position: 0,
    });

    // Redirect to the new server
    setTimeout(() => {
      router.push(`/server/${newServer.id}/channel/${generalChannel.id}`);
    }, 500);
  };

  return (
    <div className="flex h-screen">
      <ServerSidebar />

      <div className="flex-1 flex items-center justify-center bg-discord-dark">
        <div className="w-full max-w-md p-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-discord-gray rounded-lg p-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Create Your Server
            </h1>
            <p className="text-gray-400 mb-6">
              Give your new server a personality with a name and an icon. You can
              always change it later.
            </p>

            <form onSubmit={handleCreateServer}>
              {/* Server Icon Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  SERVER ICON
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {serverIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setServerIcon(icon)}
                      className={`
                        w-full aspect-square rounded-lg flex items-center justify-center text-2xl
                        transition-all cursor-pointer
                        ${
                          serverIcon === icon
                            ? "bg-discord-blurple scale-110"
                            : "bg-discord-dark hover:bg-discord-lightgray"
                        }
                      `}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Name */}
              <div className="mb-6">
                <label
                  htmlFor="serverName"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  SERVER NAME
                </label>
                <input
                  type="text"
                  id="serverName"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder="Enter server name"
                  className="w-full bg-discord-dark text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-discord-blurple"
                  required
                  maxLength={50}
                />
              </div>

              {/* Server Description */}
              <div className="mb-6">
                <label
                  htmlFor="serverDescription"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  SERVER DESCRIPTION (OPTIONAL)
                </label>
                <textarea
                  id="serverDescription"
                  value={serverDescription}
                  onChange={(e) => setServerDescription(e.target.value)}
                  placeholder="What's your server about?"
                  rows={3}
                  className="w-full bg-discord-dark text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-discord-blurple resize-none"
                  maxLength={200}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!serverName.trim() || isCreating}
                  className="bg-discord-blurple hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded transition-colors"
                >
                  {isCreating ? "Creating..." : "Create Server"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
