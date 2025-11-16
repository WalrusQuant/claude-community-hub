"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../../lib/context/AppContext";

export default function ServerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { channels } = useApp();

  useEffect(() => {
    // Redirect to the first channel in the server
    const serverChannels = channels
      .filter((c) => c.serverId === params.id)
      .sort((a, b) => a.position - b.position);

    if (serverChannels.length > 0) {
      router.push(`/server/${params.id}/channel/${serverChannels[0].id}`);
    }
  }, [params.id, channels, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-discord-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-discord-blurple mx-auto mb-4"></div>
        <p className="text-gray-400">Loading server...</p>
      </div>
    </div>
  );
}
