import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { systemLog, auditLog } from "@/lib/logger";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized access detected." }, { status: 401 });
    }

    await connectToDatabase();
    const admin = await User.findById(session.user.id);
    if (!admin) {
      return NextResponse.json({ error: "Identity node not found." }, { status: 404 });
    }

    return NextResponse.json(admin);
  } catch (err) {
    console.error("Fetch admin profile error:", err);
    return NextResponse.json({ error: "Failed to decipher identity." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized write attempt." }, { status: 401 });
    }

    const { name, email, image, bio, phone, location } = await req.json();
    await connectToDatabase();

    const updatedAdmin = await User.findByIdAndUpdate(
      session.user.id,
      { name, email, image, bio, phone, location },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return NextResponse.json({ error: "Failed to locate identity node." }, { status: 404 });
    }

    await systemLog("INFO", `Admin identity [${updatedAdmin.email}] updated profile.`);
    await auditLog({
      action: "PROFILE_UPDATE",
      userId: updatedAdmin._id,
      userEmail: updatedAdmin.email,
      role: "admin",
      resource: "ADMIN_PROFILE",
      status: "SUCCESS"
    });

    return NextResponse.json(updatedAdmin);
  } catch (err) {
    console.error("Update admin profile error:", err);
    return NextResponse.json({ error: "Protocol update failed." }, { status: 500 });
  }
}
