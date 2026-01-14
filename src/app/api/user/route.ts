import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/connectDB";
import { Participant } from "@/models/participant";

export async function POST(req: NextRequest){
  await connectDb();

  const token = req.cookies.get('token')?.value;
  if(!token){
    return NextResponse.json({
      message: "Unauthorized"
    }, { status: 400 });
  }

  const body = await req.json();
  const { name } = body;

  try {
    const found = await Participant.findOne({ name });

  if(!found){
    return NextResponse.json({
      message: "User not found"
    }, { status: 404 });
  }

  return NextResponse.json({
      message: "User found",
      found
    }, { status: 200 });
  }
  catch(err){
    return NextResponse.json({
      message: "Something went wrong",
    }, { status: 500 });
  }

}
