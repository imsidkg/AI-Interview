'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type InterviewDetails = {
  mockId: string;
  jobDesc: string;
  jobPosition: string;
  jobExperience: string;
  createdAt: string;
  createdBy: string;
  jsonMockResp: string;
};

type QuestionAnswer = {
  question: string;
  answer: string;
};

const Page = () => {
  const params = useParams();
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<QuestionAnswer[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const res = await fetch(`/api/getInterviewDetails?interviewId=${params.interviewId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch interview details");
        }

        const data = await res.json();
        const parsedQuestions = JSON.parse(data.jsonMockResp) as QuestionAnswer[];
        setMockInterviewQuestion(parsedQuestions);
        setInterviewDetails(data);
      } catch (error: any) {
        console.error("Error fetching details", error.message);
        setError(error.message);
      }
    };

    if (params.interviewId) {
      fetchInterviewDetails();
    }
  }, [params.interviewId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* video or audion recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
        <Link href={'/dashboard/interview/'+interviewDetails?.mockId+'/feedback'}>
         <Button>End Interview</Button>
         </Link>}
      </div>
    </div>
  );
};

export default Page;
