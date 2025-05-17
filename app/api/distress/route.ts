import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, message, latitude, longitude, timestamp } = body;

    // Store in database
    const distressSignal = await db.distressSignal.create({
      data: {
        id,
        message,
        latitude,
        longitude,
        timestamp: new Date(timestamp),
      },
    });

    return NextResponse.json(distressSignal);
  } catch (error) {
    console.error("Error saving distress signal:", error);
    return NextResponse.json(
      { error: "Failed to save distress signal" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let signals = await db.distressSignal.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });

    // If no signals exist, create some test data
    if (signals.length === 0) {
      const testSignals = [
        {
          id: crypto.randomUUID(),
          message: "Test distress signal 1",
          latitude: 12.9716,
          longitude: 77.5946,
          timestamp: new Date(),
        },
        {
          id: crypto.randomUUID(),
          message: "Test distress signal 2",
          latitude: 12.9784,
          longitude: 77.6408,
          timestamp: new Date(),
        },
      ];

      // Create test signals in database
      await Promise.all(
        testSignals.map((signal) =>
          db.distressSignal.create({
            data: signal,
          })
        )
      );

      signals = testSignals;
    }

    return NextResponse.json(signals);
  } catch (error) {
    console.error("Error fetching distress signals:", error);
    return NextResponse.json(
      { error: "Failed to fetch distress signals" },
      { status: 500 }
    );
  }
}
