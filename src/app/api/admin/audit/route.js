import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Audit from "@/models/Audit";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const auditEntries = await Audit.find({}).sort({ timestamp: -1 }).limit(100);
    return NextResponse.json(auditEntries);
  } catch (err) {
    console.error("Fetch audit error:", err);
    return NextResponse.json({ error: "Failed to fetch forensic data" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { action, userId, userEmail, role, resource, status, ip } = await req.json();
    await connectToDatabase();
    const newAudit = await Audit.create({ action, userId, userEmail, role, resource, status, ip });
    return NextResponse.json(newAudit);
  } catch (err) {
    console.error("Create audit error:", err);
    return NextResponse.json({ error: "Failed to create audit entry" }, { status: 500 });
  }
}
