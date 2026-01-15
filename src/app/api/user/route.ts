import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/config/connectDB";
import { Participant } from "@/models/participant";

export async function GET(req: NextRequest) {
  await connectDb();

  // const name = decodeURIComponent(req.url.split('name=')[1]);
  // console.log(name);

  //console.log(req.nextUrl.searchParams.get('name'));
  const name = req.nextUrl.searchParams.get('name');

  try {
    const found = await Participant.findOne({ name });

    if (!found) {
      return NextResponse.json({
        message: `No record found for ${name}`
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      found
    }, { status: 200 });
  }
  catch (err) {
    return NextResponse.json({
      message: "Something went wrong",
    }, { status: 500 });
  }

}


