import { db } from "@/db";
import { MockInterview, UserAnswer } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const user = await currentUser();
  try {
    const body = await req.json();
    console.log("Received body:", body); 

    const {
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
    } = body;

    const resp = await db.insert(UserAnswer).values({
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
    });

    console.log("Insert response:", resp); // Log the database insert result

    if (resp) {
      return NextResponse.json({ success: true, message: "User Answer recorded successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Error recording the answer" });
    }
  } catch (error: any) {
    console.error("Error saving user answer:", error); // Log errors
    return NextResponse.json({ success: false, error: error.message });
  }
}
