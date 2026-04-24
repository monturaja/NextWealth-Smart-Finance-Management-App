import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { systemLog } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");
    
    await connectToDatabase();
    const query = userEmail ? { userEmail } : {};
    const txs = await Transaction.find(query).sort({ date: -1 });
    
    return NextResponse.json(txs);
  } catch (err) {
    console.error("Fetch transactions error:", err);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { userEmail, description, category, amount, status } = await req.json();
    await connectToDatabase();
    
    const newTx = new Transaction({
      userEmail,
      description,
      category,
      amount,
      status: status || "Completed",
      date: new Date()
    });
    await newTx.save();
    
    await systemLog("TRANSACTION", `New entry: ${description} (₹${amount}) by ${userEmail}`);
    
    return NextResponse.json(newTx);
  } catch (err) {
    console.error("Create transaction error:", err);
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}
