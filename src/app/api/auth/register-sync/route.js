import { NextResponse } from "next/server";
import { systemLog, auditLog } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { name, email, role } = await req.json();
    
    // Log registration in forensic audit
    await auditLog("SYSTEM", "IDENTITY_REGISTRATION", `New node established: ${email} as ${role}.`);
    await systemLog("AUTH", `Identity verified and synchronized: ${email}`);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register sync error:", err);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
