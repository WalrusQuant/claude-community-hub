"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../lib/context/AppContext";
import ServerSidebar from "../components/ServerSidebar";
import { ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";

const statusOptions = [
  { value: "online", label: "Online", color: "bg-green-500" },
  { value: "away", label: "Away", color: "bg-yellow-500" },
  { value: "offline", label: "Invisible", color: "bg-gray-500" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, updateUser } = useApp();

  const [username, setUsername] = useState(currentUser?.username || "");
  const [status, setStatus] = useState(currentUser?.status || "online");
  const [isSaving, setIsSaving] = useState(false);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-discord-dark">
        <div className="text-center">
          <p className="text-gray-400">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      return;
    }

    setIsSaving(true);

    updateUser(currentUser.id, {
      username,
      status: status as any,
    });

    setTimeout(() => {
      setIsSaving(false);
      router.push("/");
    }, 500);
  };

  return (
    <div className="flex h-screen">
      <ServerSidebar />

      <div className="flex-1 bg-discord-dark overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-discord-gray rounded-lg overflow-hidden">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-discord-blurple to-purple-600 relative">
              <div className="absolute -bottom-12 left-8">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-24 h-24 rounded-full border-8 border-discord-gray"
                  />
                  <div
                    className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-discord-gray ${
                      currentUser.status === "online"
                        ? "bg-green-500"
                        : currentUser.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-16 px-8 pb-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-1">
                  {currentUser.username}
                </h1>
                <p className="text-gray-400">#{currentUser.id.slice(0, 4)}</p>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="space-y-6">
                  {/* Username */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-semibold text-gray-300 mb-2"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full bg-discord-dark text-white px-4 py-3 rounded outline-none focus:ring-2 focus:ring-discord-blurple"
                      required
                      maxLength={32}
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      STATUS
                    </label>
                    <div className="space-y-2">
                      {statusOptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center space-x-3 p-3 bg-discord-dark rounded cursor-pointer hover:bg-discord-lightgray transition-colors"
                        >
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={status === option.value}
                            onChange={(e) => setStatus(e.target.value as "online" | "away" | "offline")}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            <span className="text-white">{option.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      ROLE
                    </label>
                    <div className="flex items-center space-x-2 p-3 bg-discord-dark rounded">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          currentUser.role === "admin"
                            ? "bg-red-500 text-white"
                            : currentUser.role === "moderator"
                            ? "bg-discord-blurple text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {currentUser.role.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end space-x-4 pt-4 border-t border-discord-dark">
                    <Link
                      href="/"
                      className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={!username.trim() || isSaving}
                      className="bg-discord-blurple hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold px-8 py-2 rounded transition-colors"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-discord-gray rounded-lg p-6 mt-6">
            <h2 className="text-lg font-bold text-white mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">User ID</span>
                <span className="text-white font-mono">{currentUser.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Member Since</span>
                <span className="text-white">
                  {new Date(currentUser.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
