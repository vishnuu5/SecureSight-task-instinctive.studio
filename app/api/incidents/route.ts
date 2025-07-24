
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolvedParam = searchParams.get("resolved");

    const resolvedFilter =
      resolvedParam === "true"
        ? true
        : resolvedParam === "false"
        ? false
        : undefined;

    const incidents = await prisma.incident.findMany({
      where: {
        ...(resolvedFilter !== undefined && { resolved: resolvedFilter }),
      },
      include: {
        camera: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}
