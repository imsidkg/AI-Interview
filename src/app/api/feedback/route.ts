import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { MockInterview } from '@/db/schema';
import uuid from 'react-uuid';
import moment from 'moment';
import { chatSession } from '@/utils/gemini';

export default async function GET(req: NextRequest){
    try{
        const body = await resizeBy.json();
        
    }
    catch(error : any) {

    }
}