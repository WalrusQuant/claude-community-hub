"use client";

import { useApp } from "./lib/context/AppContext";
import ServerSidebar from "./components/ServerSidebar";
import { Users, MessageSquare, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { servers, currentUser } = useApp();

  const userServers = currentUser
    ? servers.filter((s) => s.memberIds.includes(currentUser.id))
    : [];

  return (
    <div className="flex h-screen">
      <ServerSidebar />

      <div className="flex-1 flex flex-col bg-discord-dark overflow-hidden">
        {/* Hero Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">
                Welcome to Community Hub
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Connect and collaborate with communities around the world
              </p>
              <Link
                href="/create-server"
                className="inline-block bg-discord-blurple hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Create Your Server
              </Link>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <FeatureCard
                icon={<Users className="w-8 h-8" />}
                title="Build Communities"
                description="Create servers and bring people together around shared interests"
              />
              <FeatureCard
                icon={<MessageSquare className="w-8 h-8" />}
                title="Real-time Chat"
                description="Instant messaging with support for reactions and mentions"
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8" />}
                title="Role Management"
                description="Manage permissions with customizable roles and moderation tools"
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8" />}
                title="Fast & Reliable"
                description="Optimized performance for smooth, lag-free communication"
              />
            </div>

            {/* Your Servers */}
            {userServers.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Your Servers
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userServers.map((server) => (
                    <Link
                      key={server.id}
                      href={`/server/${server.id}`}
                      className="bg-discord-gray hover:bg-discord-lightgray p-6 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-discord-blurple rounded-full flex items-center justify-center text-2xl group-hover:rounded-2xl transition-all">
                          {server.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {server.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {server.memberIds.length} members
                          </p>
                        </div>
                      </div>
                      {server.description && (
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {server.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Getting Started */}
            {userServers.length === 0 && (
              <div className="bg-discord-gray p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Get Started
                </h3>
                <p className="text-gray-300 mb-6">
                  You haven&apos;t joined any servers yet. Create your first server to
                  start building your community!
                </p>
                <Link
                  href="/create-server"
                  className="inline-block bg-discord-blurple hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition-colors"
                >
                  Create Server
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-discord-darker py-4 px-6 text-center text-sm text-gray-400">
          <p>Community Hub Platform - Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-discord-gray p-6 rounded-lg">
      <div className="text-discord-blurple mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}
