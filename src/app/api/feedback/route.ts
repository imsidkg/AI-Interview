import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { UserAnswer } from '@/db/schema';
import { eq } from 'drizzle-orm';


export async function GET(req: NextRequest) {
  try {
    // Parse the interviewId from the query string
    const { searchParams } = new URL(req.url);
    const interviewId = searchParams.get('interviewId');

    if (!interviewId) {
      return NextResponse.json({ error: "Invalid interview ID" }, { status: 400 });
    }
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    return NextResponse.json(result); 
  } catch (error: any) {
    console.error("Error fetching interview data:", error.message, error.stack);
    return NextResponse.json({ error: "Can't fetch interview" }, { status: 500 });
  }
}
