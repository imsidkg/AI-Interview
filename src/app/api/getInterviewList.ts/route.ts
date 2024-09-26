// pages/api/interviewList.ts (or /app/api/interviewList/route.ts for the App Router)

import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient, getAuth } from "@clerk/nextjs/server"; // Clerk for authentication
import { db } from "@/db/index"; // Import your database instance
import { MockInterview } from "@/db/schema"; // Your schema for MockInterview
import { eq, desc } from "drizzle-orm"; // ORM helpers for querying

// API Route Handler
export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      return res.status(400).json({ error: "No primary email found" });
    }

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, email))
      .orderBy(desc(MockInterview.id));
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching interview list:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
