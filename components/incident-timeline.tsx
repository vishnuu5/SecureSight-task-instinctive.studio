"use client";
import { useState, useEffect } from "react";
import { Cctv } from "lucide-react";
import type { Incident } from "@/lib/types";
import {
  Siren,
  DoorOpen,
  UserRoundSearch,
  UsersRound,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

const getIncidentIcon = (type: string) => {
  switch (type) {
    case "Gun Threat":
      return <Siren className="w-3 h-3 text-white" />;
    case "Unauthorised Access":
      return <DoorOpen className="w-3 h-3 text-white" />;
    case "Face Recognised":
      return <UserRoundSearch className="w-3 h-3 text-white" />;
    case "Traffic Congestion":
      return <UsersRound className="w-3 h-3 text-white" />;
    case "Multiple Events":
      return <AlertTriangle className="w-3 h-3 text-white" />;
    default:
      return <HelpCircle className="w-3 h-3 text-white" />;
  }
};

const getIncidentColor = (type: string) => {
  switch (type) {
    case "Gun Threat":
      return "#450A0A"; // Red
    case "Unauthorised Access":
      return "#431407"; // Orange
    case "Face Recognised":
      return "#172554"; // Blue
    case "Traffic Congestion":
      return "#042F2E"; // Green
    case "Multiple Events":
      return "#1C1917"; // Purple
    default:
      return "#6b7280"; // Gray
  }
};

const formatHour = (hour: number) => {
  return hour.toString().padStart(2, "0") + ":00";
};

export function IncidentTimeline() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [currentTime] = useState(new Date());

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch("/api/incidents");
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  // Generate 24-hour timeline (showing 17 hours as in the image)
  const hours = Array.from({ length: 17 }, (_, i) => i);
  const timelineWidth = 100; // Use percentage for responsive design

  const getIncidentPosition = (startHour: number, startMinute = 0) => {
    const totalHours = startHour + startMinute / 60;
    return Math.min((totalHours / 16) * timelineWidth, timelineWidth);
  };

  const getIncidentWidth = (
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number
  ) => {
    const startTotal = startHour + startMinute / 60;
    const endTotal = endHour + endMinute / 60;
    const duration = endTotal - startTotal;
    return Math.max((duration / 16) * timelineWidth, 3); // Minimum 3% width
  };

  const cameras = ["Camera - 01", "Camera - 02", "Camera - 03"];

  // Create sample incidents for each camera based on the image
  const createSampleIncidents = (cameraName: string, cameraIndex: number) => {
    let sampleIncidents: any[] = [];

    if (cameraIndex === 0) {
      // Camera - 01
      sampleIncidents = [
        {
          id: `${cameraName}-1`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Unauthorised Access",
          startHour: 1,
          startMinute: 58,
          endHour: 3,
          endMinute: 58,
          layer: "normal", // normal layer
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: `${cameraName}-2`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Face Recognised",
          startHour: 5,
          startMinute: 20,
          endHour: 7,
          endMinute: 58,
          layer: "normal", // normal layer
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: `${cameraName}-3`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Multiple Events",
          startHour: 10,
          startMinute: 30,
          endHour: 12,
          endMinute: 10,
          layer: "normal", // normal layer
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: `${cameraName}-4`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Unauthorised Access",
          startHour: 14,
          startMinute: 10,
          endHour: 16,
          endMinute: 30,
          layer: "top", // top layer (above)
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: `${cameraName}-5`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Gun Threat",
          startHour: 14,
          startMinute: 10,
          endHour: 15,
          endMinute: 50,
          layer: "bottom", // bottom layer (below)
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
    } else if (cameraIndex === 1) {
      // Camera - 02
      sampleIncidents = [
        {
          id: `${cameraName}-1`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Unauthorised Access",
          startHour: 0,
          startMinute: 50,
          endHour: 2,
          endMinute: 58,
          layer: "normal",
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: `${cameraName}-2`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Face Recognised",
          startHour: 8,
          startMinute: 0,
          endHour: 9,
          endMinute: 30,
          layer: "normal",
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
    } else {
      // Camera - 03
      sampleIncidents = [
        {
          id: `${cameraName}-1`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Traffic Congestion",
          startHour: 4,
          startMinute: 30,
          endHour: 6,
          endMinute: 30,
          layer: "normal",
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        {
          id: `${cameraName}-2`,
          cameraId: `camera-${cameraIndex + 1}`,
          type: "Unauthorised Access",
          startHour: 10,
          startMinute: 30,
          endHour: 12,
          endMinute: 30,
          layer: "normal",
          thumbnailUrl: "/placeholder.svg?height=80&width=120",
          resolved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          camera: {
            id: `camera-${cameraIndex + 1}`,
            name: cameraName,
            location: "Shop Floor A",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];
    }

    return sampleIncidents;
  };

  const getLayerPosition = (layer: string) => {
    switch (layer) {
      case "top":
        return "top-0 h-5"; // Top layer, fixed height
      case "bottom":
        return "top-6 h-5"; // Lower layer with spacing
      default:
        return "top-3 h-5"; // Middle layer with padding
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden m-5">
      {/* Timeline Header */}
      <div className="flex">
        <div className="w-48 p-4 ml-5">
          <h3 className="text-white font-medium mb-3 text-sm">Camera List</h3>
        </div>
        <div className="flex-1 p-4 border-l border-amber-800/30">
          {/* Time ruler with small tick marks */}
          <div className="relative mb-2">
            <div className="flex justify-between text-xs text-white px-2 mb-1">
              {hours.map((hour) => (
                <div key={hour} className="text-center min-w-0">
                  {formatHour(hour)}
                </div>
              ))}
            </div>
            {/* Small tick marks between hours */}
            <div className="relative h-2">
              {hours.map((hour) => (
                <div key={hour}>
                  {/* Main hour line */}
                  <div
                    className="absolute top-0 w-px h-2 bg-white"
                    style={{ left: `${(hour / 16) * 100}%` }}
                  />
                  {/* Small tick marks (4 per hour) */}
                  {hour < 16 &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`${hour}-${i}`}
                        className="absolute top-0 w-px h-1 bg-white"
                        style={{
                          left: `${((hour + (i + 1) * 0.25) / 16) * 100}%`,
                        }}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
          {/* Current time indicator with time label */}
          <div className="relative">
            <div
              className="absolute -top-6 transform -translate-x-1/2 text-black text-xs font-medium bg-yellow-400 rounded-lg p-1"
              style={{ left: "20%" }}
            >
              03:12:37s
            </div>
            <div
              className="absolute top-0 w-0.5 h-56 bg-yellow-400 z-20"
              style={{ left: "20%" }}
            />
          </div>
        </div>
      </div>

      {/* Camera Rows */}
      <div className="space-y-2 px-4 pb-4">
        {cameras.map((camera, cameraIndex) => {
          const cameraIncidents = createSampleIncidents(camera, cameraIndex);
          return (
            <div key={camera} className="flex">
              {/* Camera row - only Camera-01 has background */}
              <div
                className={`flex w-full h-14 relative overflow-hidden ${
                  cameraIndex === 0
                    ? "bg-stone-800 bg-opacity-30 rounded-l"
                    : ""
                }`}
              >
                {/* Camera name section */}
                <div className="w-48 flex items-center space-x-2 px-4 text-sm text-white">
                  <Cctv className="w-4 h-4 text-white" />
                  <span>{camera}</span>
                </div>

                {/* Timeline section */}
                <div
                  className={`flex-1 relative ${
                    cameraIndex === 0 ? "border-l border-amber-300/30" : ""
                  }`}
                >
                  {/* Hour grid lines for this row - only for Camera-01 */}
                  {/* {cameraIndex === 0 &&
                    hours.map((hour) => (
                      <div
                        key={hour}
                        className="absolute top-0 bottom-0 w-px bg-amber-700/20"
                        style={{ left: `${(hour / 16) * 100}%` }}
                      />
                    ))} */}

                  {/* Incident blocks for this camera with layered positioning */}
                  {cameraIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className={`absolute rounded shadow-md transition-opacity hover:opacity-90 flex items-center justify-center space-x-1 px-2 py-1 text-xs font-medium text-white whitespace-nowrap ${
                        incident.color
                      } ${getLayerPosition(incident.layer)}`}
                      style={{
                        left: `${getIncidentPosition(
                          incident.startHour,
                          incident.startMinute
                        )}%`,
                        width: `${Math.max(
                          getIncidentWidth(
                            incident.startHour,
                            incident.startMinute,
                            incident.endHour,
                            incident.endMinute
                          ),
                          8
                        )}%`,
                        backgroundColor: getIncidentColor(incident.type),
                      }}
                      title={`${incident.type} - ${incident.camera.name}`}
                    >
                      {getIncidentIcon(incident.type)}
                      <span className="text-red-100 text-xs font-medium truncate px-1">
                        {incident.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
