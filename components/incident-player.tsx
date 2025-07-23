"use client";
import { useState } from "react";
import { Calendar, Disc, MoreVertical } from "lucide-react";
import Image from "next/image";

export function IncidentPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex-1 bg-slate-950 p-6">
      <div className="h-full flex flex-col">
        {/* Main Video Player - Reduced height */}
        <div className="h-96 relative bg-slate-800 rounded-lg overflow-hidden">
          <Image
            src="/main-video-sc.png?height=400&width=700&text=Jewelry+Store+Security+Feed"
            alt="Main security camera feed"
            fill
            className="object-cover"
          />

          {/* Timestamp Overlay - Top Left with Calendar Icon */}
          <div className="absolute top-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded text-sm flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>11/7/2025 - 03:12:37</span>
          </div>

          {/* Camera Label - Bottom Left with Disc Icon */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded text-sm flex items-center space-x-2">
            <Disc className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Camera - 01</span>
          </div>

          {/* Bottom Right Camera Feeds - Inside main video area */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="relative w-28 h-16 bg-slate-800 rounded overflow-hidden border border-slate-600">
              <Image
                src="/camera-02-1.png?height=64&width=112&text=Camera+Feed"
                alt="Camera 02"
                fill
                className="object-cover"
              />
              {/* Camera label moved to top with full width and ellipsis icon */}
              <div className="absolute top-0 left-0 right-0 text-white text-xs bg-black/70 px-1 py-0.5 flex items-center justify-between">
                <span>Camera - 02</span>
                <MoreVertical className="w-3 h-3" />
              </div>
            </div>
            <div className="relative w-28 h-16 bg-slate-800 rounded overflow-hidden border border-slate-600">
              <Image
                src="/camera-02-2.png?height=64&width=112&text=Camera+Feed"
                alt="Camera 03"
                fill
                className="object-cover"
              />
              {/* Camera label moved to top with full width and ellipsis icon */}
              <div className="absolute top-0 left-0 right-0 text-white text-xs bg-black/70 px-1 py-0.5 flex items-center justify-between">
                <span>Camera - 02</span>
                <MoreVertical className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
