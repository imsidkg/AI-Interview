import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { MockInterview, UserAnswer } from '@/db/schema';
import uuid from 'react-uuid';
import moment from 'moment';
import { chatSession } from '@/utils/gemini';
import { eq } from 'drizzle-orm';

export default async function GET(req: NextRequest){
    try{
        const body = await req.json();
        const {searchParams} =new URL(req.url);
        const interviewId  = searchParams.get('interviewId');
        console.log(interviewId);
        if(!interviewId) {
            return NextResponse.json({ error: "Invalid interview ID" }, { status: 400 });
        }
        

        const result = db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId)).orderBy(UserAnswer.id);
        console.log(result)
    }
    catch(error : any) {
        console.error("Error fetching interview data:", error.message, error.stack);
        return NextResponse.json({ error: "Can't fetch interview" }, { status: 500 });
    }
}