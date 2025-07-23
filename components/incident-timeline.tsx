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
      return "#450A0A";
    case "Unauthorised Access":
      return "#431407";
    case "Face Recognised":
      return "#172554";
    case "Traffic Congestion":
      return "#042F2E";
    case "Multiple Events":
      return "#1C1917";
    default:
      return "#6b7280";
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

  const hours = Array.from({ length: 17 }, (_, i) => i);
  const timelineWidth = 100;

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
    return Math.max((duration / 16) * timelineWidth, 3);
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
        return "top-0 h-5";
      case "bottom":
        return "top-6 h-5";
      default:
        return "top-3 h-5";
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-x-auto m-5">
      <div className="min-w-[600px] md:min-w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 p-4 ml-5">
            <h3 className="text-white font-medium mb-3 text-sm">Camera List</h3>
          </div>
          <div className="flex-1 p-4 border-t md:border-t-0 md:border-l border-amber-800/30">
            <div className="relative mb-2">
              <div className="flex justify-between text-xs text-white px-2 mb-1">
                {hours.map((hour) => (
                  <div key={hour} className="text-center min-w-0">
                    {formatHour(hour)}
                  </div>
                ))}
              </div>
              <div className="relative h-2">
                {hours.map((hour) => (
                  <div key={hour}>
                    <div
                      className="absolute top-0 w-px h-2 bg-white"
                      style={{ left: `${(hour / 16) * 100}%` }}
                    />
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

        <div className="space-y-2 px-4 pb-4">
          {cameras.map((camera, cameraIndex) => {
            const cameraIncidents = createSampleIncidents(camera, cameraIndex);
            return (
              <div key={camera} className="flex flex-col md:flex-row">
                <div
                  className={`flex w-full h-14 relative overflow-hidden ${
                    cameraIndex === 0
                      ? "bg-stone-800 bg-opacity-30 rounded-l"
                      : ""
                  }`}
                >
                  <div className="md:w-48 w-full flex items-center space-x-2 px-4 text-sm text-white">
                    <Cctv className="w-4 h-4 text-white" />
                    <span>{camera}</span>
                  </div>

                  <div
                    className={`flex-1 relative ${
                      cameraIndex === 0 ? "border-l border-amber-300/30" : ""
                    }`}
                  >
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
    </div>
  );
}
