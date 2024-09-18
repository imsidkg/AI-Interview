import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/index';
import { MockInterview } from '@/db/schema';
import uuid from 'react-uuid';
import moment from 'moment';
import { chatSession } from '@/utils/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received request body:', JSON.stringify(body));

    const { jobPosition, jobDescription, jobExperience, user } = body;

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview questions along with Answers in JSON format. Each question and answer should be in the format:
    {
      "question": "Your question here",
      "answer": "Your answer here"
    }`;

    console.log('Sending prompt to AI:', inputPrompt);
    const result = await chatSession.sendMessage(inputPrompt);
    const responseText = await result.response.text();
    console.log('AI response:', responseText);

    let mockResponse;
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No valid JSON array found in the response');
      }
      mockResponse = JSON.parse(jsonMatch[0].trim());
      console.log('Parsed mock response:', mockResponse);
    } catch (parseError:any) {
      console.error('Error parsing AI response:', parseError);
      console.log('Problematic JSON string:', responseText);
      throw new Error(`Failed to parse AI response: ${parseError.message}`);
    }

    const newRecord = {
      mockId: uuid(),
      jsonMockResp: JSON.stringify(mockResponse),
      jobPosition,
      jobDesc: jobDescription,
      jobExperience,
      createdBy: user?.email || '',
      createdAt: moment().format('YYYY-MM-DD'),
    };

    console.log('Inserting new record:', newRecord);
    await db.insert(MockInterview).values(newRecord);

    return NextResponse.json({ success: true, mockId: newRecord.mockId }, { status: 200 });
  } catch (error:any) {
    console.error('Detailed error in /api/addInterview:', error);
    return NextResponse.json({ error: 'Error processing interview request', details: error.message }, { status: 500 });
  }
}