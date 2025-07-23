import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: "Camera - 01",
        location: "Shop Floor A",
      },
    }),
    prisma.camera.create({
      data: {
        name: "Camera - 02",
        location: "Vault",
      },
    }),
    prisma.camera.create({
      data: {
        name: "Camera - 03",
        location: "Entrance",
      },
    }),
  ]);

  // Create incidents with believable timestamps over 24 hours
  const now = new Date();
  const incidents = [
    {
      cameraId: cameras[0].id,
      type: "Unauthorised Access",
      tsStart: new Date(now.getTime() - 23 * 60 * 60 * 1000), // 23 hours ago
      tsEnd: new Date(now.getTime() - 22.5 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: "Gun Threat",
      tsStart: new Date(now.getTime() - 20 * 60 * 60 * 1000), // 20 hours ago
      tsEnd: new Date(now.getTime() - 19.8 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: "Face Recognised",
      tsStart: new Date(now.getTime() - 18 * 60 * 60 * 1000), // 18 hours ago
      tsEnd: new Date(now.getTime() - 17.9 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: true,
    },
    {
      cameraId: cameras[0].id,
      type: "Unauthorised Access",
      tsStart: new Date(now.getTime() - 16 * 60 * 60 * 1000), // 16 hours ago
      tsEnd: new Date(now.getTime() - 15.7 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: "Traffic Congestion",
      tsStart: new Date(now.getTime() - 14 * 60 * 60 * 1000), // 14 hours ago
      tsEnd: new Date(now.getTime() - 13.5 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: "Unauthorised Access",
      tsStart: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
      tsEnd: new Date(now.getTime() - 11.8 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: "Face Recognised",
      tsStart: new Date(now.getTime() - 10 * 60 * 60 * 1000), // 10 hours ago
      tsEnd: new Date(now.getTime() - 9.9 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: true,
    },
    {
      cameraId: cameras[1].id,
      type: "Gun Threat",
      tsStart: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      tsEnd: new Date(now.getTime() - 7.7 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: "Multiple Events",
      tsStart: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
      tsEnd: new Date(now.getTime() - 5.5 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: "Unauthorised Access",
      tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      tsEnd: new Date(now.getTime() - 3.8 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: "Face Recognised",
      tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      tsEnd: new Date(now.getTime() - 1.9 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: "Gun Threat",
      tsStart: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      tsEnd: new Date(now.getTime() - 0.8 * 60 * 60 * 1000),
      thumbnailUrl: "/placeholder.svg?height=80&width=120",
      resolved: false,
    },
  ];

  await Promise.all(
    incidents.map((incident) =>
      prisma.incident.create({
        data: incident,
      })
    )
  );

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
