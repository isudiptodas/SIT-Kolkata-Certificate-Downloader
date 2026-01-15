import { NextRequest, NextResponse } from "next/server";
import { Participant } from "@/models/participant";
import { connectDb } from "@/config/connectDB";
import csv from "csv-parser";
import { Readable } from "stream";

interface data {
    name: string,
    email: string,
    organization: string
};

export async function POST(req: NextRequest) {
    await connectDb();

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
        return NextResponse.json(
            { message: "No file uploaded" },
            { status: 400 }
        );
    }

    try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const results: data[] = [];

        const stream = Readable.from(buffer.toString());

        await new Promise((resolve, reject) => {
            stream
                .pipe(csv())
                .on("data", (row) => {
                    results.push({
                        name: row.Name,
                        email: row.Email,
                        organization: row.Organization,
                    });
                })
                .on("end", resolve)
                .on("error", reject);
        });

        if (results.length === 0) {
            return NextResponse.json(
                { message: "CSV is empty" },
                { status: 400 }
            );
        }

        await Participant.insertMany(results);

        return NextResponse.json({
            message: `Successfully uploaded ${results.length} records`,
        }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Upload failed" },
            { status: 500 }
        );
    }
}