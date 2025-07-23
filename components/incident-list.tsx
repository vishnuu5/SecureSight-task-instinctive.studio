"use client";

import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ChevronRight,
  Cctv,
  Clock,
  DoorOpen,
  Plus,
  UserRoundSearch,
  CheckCheck,
  Eye,
  Users,
  Car,
} from "lucide-react";
import { GiPistolGun } from "react-icons/gi";
import { useState, useEffect } from "react";
import type { Incident } from "@/lib/types";
import Image from "next/image";

const getIncidentIcon = (type: string) => {
  switch (type) {
    case "Gun Threat":
      return <GiPistolGun className="w-4 h-4 text-red-500" />;
    case "Unauthorised Access":
      return <DoorOpen className="w-4 h-4 text-orange-500" />;
    case "Face Recognised":
      return <Eye className="w-4 h-4 text-blue-500" />;
    case "Traffic Congestion":
      return <Car className="w-4 h-4 text-green-500" />;
    case "Multiple Events":
      return <Users className="w-4 h-4 text-purple-500" />;
    default:
      return <AlertTriangle className="w-4 h-4 text-orange-500" />;
  }
};

const getThumbnailImage = (index: number) => {
  const images = [
    "/list-img1.png",
    "/list-img2.png",
    "/list-img3.png",
    "/list-img4.png",
  ];
  return images[index % images.length];
};

export function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch("/api/incidents?resolved=false");
      const data = await response.json();

      const transformedIncidents = data.map(
        (incident: Incident, index: number) => ({
          ...incident,
          type:
            index === 0
              ? "Unauthorised Access"
              : index === 1
              ? "Gun Threat"
              : "Unauthorised Access",
          camera: {
            ...incident.camera,
            location: "Shop Floor Camera A",
          },
          tsStart: new Date("2025-07-07T14:35:00"),
          tsEnd: new Date("2025-07-07T14:37:00"),
          thumbnailUrl: getThumbnailImage(index),
        })
      );

      setIncidents(transformedIncidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (incidentId: string) => {
    setResolvingIds((prev) => new Set(prev).add(incidentId));

    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
      });

      if (response.ok) {
        setIncidents((prev) =>
          prev.filter((incident) => incident.id !== incidentId)
        );
      }
    } catch (error) {
      console.error("Error resolving incident:", error);
    } finally {
      setResolvingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(incidentId);
        return newSet;
      });
    }
  };

  const unresolvedCount = 15;
  const resolvedCount = 4;

  if (loading) {
    return (
      <div className="w-full md:w-[36rem] bg-slate-900 border-l border-slate-700">
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-slate-700 rounded w-3/4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[36rem] bg-slate-950 border-l border-slate-700">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Left - Unresolved Count */}
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">
              {unresolvedCount} Unresolved Incidents
            </span>
          </div>

          {/* Right - Icons and resolved count */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-3">
            {/* Round Icon Buttons */}
            <div className="flex space-x-2">
              <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center">
                <DoorOpen className="w-4 h-4 text-white" />
              </div>
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div className="w-7 h-7 bg-blue-800 rounded-full flex items-center justify-center">
                <UserRoundSearch className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Glass effect resolved count */}
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-sky-900/40 backdrop-blur-sm border border-sky-800">
              <CheckCheck className="w-4 h-4 text-green-400" />
              <span className="text-blue-100 text-sm">
                {resolvedCount} resolved incidents
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div className="h-[32rem] overflow-y-auto">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`p-4 border-b border-slate-700 last:border-b-0 transition-opacity duration-300 ${
              resolvingIds.has(incident.id) ? "opacity-50" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-32 h-20 rounded overflow-hidden flex-shrink-0 bg-slate-800 border border-slate-600">
                <Image
                  src={incident.thumbnailUrl || "/placeholder.svg"}
                  alt={`${incident.type} incident`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Middle */}
              <div className="flex-1 min-w-0 space-y-1">
                {/* Type */}
                <div className="flex items-center space-x-1">
                  {getIncidentIcon(incident.type)}
                  <span className="text-white text-sm font-medium">
                    {incident.type}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                  <Cctv className="w-3 h-3 text-white" />
                  <span className="text-white text-sm">
                    {incident.camera.location}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-white text-xs">
                    14:35 - 14:37 on 7-Jul-2025
                  </span>
                </div>
              </div>

              {/* Resolve Button */}
              <div className="flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-yellow-400 hover:text-green-300 hover:bg-green-500/10 p-1 h-auto font-normal text-sm flex items-center"
                  onClick={() => handleResolve(incident.id)}
                  disabled={resolvingIds.has(incident.id)}
                >
                  {resolvingIds.has(incident.id) ? "Resolving..." : "Resolve"}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
