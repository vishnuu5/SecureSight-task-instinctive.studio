export interface Camera {
  id: string;
  name: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Incident {
  id: string;
  cameraId: string;
  type: string;
  tsStart: Date;
  tsEnd: Date;
  thumbnailUrl: string;
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
  camera: Camera;
}

export type IncidentType =
  | "Unauthorised Access"
  | "Gun Threat"
  | "Face Recognised"
  | "Traffic Congestion"
  | "Multiple Events";
