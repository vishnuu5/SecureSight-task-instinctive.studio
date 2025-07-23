import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const incident = await prisma.incident.findUnique({
      where: { id },
      include: { camera: true },
    });

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      );
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: { resolved: !incident.resolved },
      include: { camera: true },
    });

    return NextResponse.json(updatedIncident);
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json(
      { error: "Failed to update incident" },
      { status: 500 }
    );
  }
}
