import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const incidents = await db.incident.findMany({
      orderBy: {
        timestamp: "desc",
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, location, timestamp, reportedBy } =
      body;

    // Parse location string into latitude and longitude
    const [latitude, longitude] = location
      .split(",")
      .map((coord: string) => parseFloat(coord.trim()));

    const incident = await db.incident.create({
      data: {
        title,
        description,
        imageUrl,
        latitude,
        longitude,
        timestamp: new Date(timestamp),
        reportedBy,
      },
    });

    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 }
    );
  }
}
