import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { auditLog } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const user = await User.findByIdAndDelete(id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await auditLog(
      "ADMIN",
      "USER_TERMINATION",
      `Identity ${user.email} permanently removed from mainframe.`
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete user error:", err);
    return NextResponse.json({ error: "Termination failed" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    await connectToDatabase();
    
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await auditLog(
      "ADMIN",
      "IDENTITY_UPDATE",
      `User ${user.email} status adjusted to ${status}.`
    );

    return NextResponse.json(user);
  } catch (err) {
    console.error("Update status error:", err);
    return NextResponse.json({ error: "Status update failed" }, { status: 500 });
  }
}
