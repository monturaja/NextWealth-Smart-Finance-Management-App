import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { systemLog, auditLog } from "@/lib/logger";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      await systemLog("WARN", `Registration attempt blocked: Identity ${email} already exists.`);
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Integrated Logging
    await auditLog({
      action: "IDENTITY_REGISTRATION",
      userId: newUser._id,
      userEmail: newUser.email,
      role: "user",
      resource: "Identity_Ledger",
      status: "SUCCESS"
    });

    await systemLog("SUCCESS", `New identity node successfully established: ${email}`);

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    await systemLog("ERROR", `Protocol failure during identity registration: ${error.message}`);
    return NextResponse.json(
      { message: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
