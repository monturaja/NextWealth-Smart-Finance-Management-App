import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Log from "@/models/Log";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const logs = await Log.find({}).sort({ timestamp: -1 }).limit(100);
    return NextResponse.json(logs);
  } catch (err) {
    console.error("Fetch logs error:", err);
    return NextResponse.json({ error: "Failed to fetch telemetry" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { type, msg, metadata } = await req.json();
    await connectToDatabase();
    const newLog = await Log.create({ type, msg, metadata });
    return NextResponse.json(newLog);
  } catch (err) {
    console.error("Create log error:", err);
    return NextResponse.json({ error: "Failed to create log" }, { status: 500 });
  }
}
