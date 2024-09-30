import { NextResponse,NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server"; // Clerk for authentication
import { db } from "@/db/index"; // Import your database instance
import { MockInterview } from "@/db/schema"; // Your schema for MockInterview
import { eq, desc } from "drizzle-orm"; // ORM helpers for querying


export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await clerkClient().users.getUser(userId);
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "No primary email found" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));

    return NextResponse.json(result);
  } catch (error:any) {
    console.error("Error fetching interview list:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
