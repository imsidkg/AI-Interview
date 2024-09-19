import { db } from "@/db";
import { MockInterview } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const interviewId = searchParams.get('interviewId');

    console.log("Interview ID:", interviewId);

    if (!interviewId) {
      return NextResponse.json({ error: "Invalid interview ID" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    if (result.length === 0) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }
 
   
    return NextResponse.json(result[0], { status: 200 });
  } catch (error: any) {
    console.error("Error fetching interview data:", error.message, error.stack);
    return NextResponse.json({ error: "Failed to retrieve data" }, { status: 500 });
  }
}