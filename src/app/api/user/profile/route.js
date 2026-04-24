import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { systemLog, auditLog } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access detected." }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "Identity node not found." }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Fetch user profile error:", err);
    return NextResponse.json({ error: "Failed to decipher identity." }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized write attempt." }, { status: 401 });
    }

    const { name, email, image, bio, phone, location } = await req.json();
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name, email, image, bio, phone, location },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to locate identity node." }, { status: 404 });
    }

    await systemLog("INFO", `User [${updatedUser.email}] updated profile.`);
    await auditLog({
      action: "USER_PROFILE_UPDATE",
      userId: updatedUser._id,
      userEmail: updatedUser.email,
      role: updatedUser.role,
      resource: "USER_PROFILE",
      status: "SUCCESS"
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Update user profile error:", err);
    return NextResponse.json({ error: "Protocol update failed." }, { status: 500 });
  }
}
