"use client";
import { FC } from "react";
import { Navbar } from "@/components/navbar";
import { IncidentPlayer } from "@/components/incident-player";
import { IncidentList } from "@/components/incident-list";
import { IncidentTimeline } from "@/components/incident-timeline";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCw,
  RotateCcw,
  CirclePlay,
} from "lucide-react";
import { useState } from "react";

interface VideoControlsBarProps {
  className?: string;
}

const VideoControlsBar: FC<VideoControlsBarProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg overflow-hidden m-5 px-6 py-1 ${
        className || ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-amber-800/30 p-2"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-amber-800/30 p-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-white text-black hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-amber-800/30 p-2"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-amber-800/30 p-2"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
          <div className="text-white text-sm font-medium space-x-2">
            03:12:37 (15-Jun-2025)
            <span className="ml-2">1x</span>
            <CirclePlay className="inline-block w-4 h-4 ml-2 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex">
        <IncidentPlayer />
        <IncidentList />
      </div>

      {/* Full Width Video Controls Bar */}
      <VideoControlsBar className="mb-2" />

      {/* Timeline */}
      <IncidentTimeline />
    </div>
  );
}
