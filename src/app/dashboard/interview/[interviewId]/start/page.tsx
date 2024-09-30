'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Loader from '@/components/Loader'

type InterviewDetails = {
  id: number;
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
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<QuestionAnswer[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Params:", params);
        console.log("Fetching interview details for ID:", params.interviewId);
        const res = await fetch(`/api/getInterviewDetails?interviewId=${params.interviewId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Failed to fetch interview details. Status: ${res.status}`);
        }

        const data: InterviewDetails = await res.json();
        console.log("Received data:", data);

        if (!data.jsonMockResp) {
          throw new Error("No mock response data received");
        }

        setInterviewDetails(data);

        let parsedQuestions: QuestionAnswer[];
        try {
          parsedQuestions = JSON.parse(data.jsonMockResp);
          console.log("Parsed questions:", parsedQuestions);
          if (!Array.isArray(parsedQuestions)) {
            throw new Error("Parsed questions is not an array");
          }
        } catch (parseError) {
          console.error("Error parsing jsonMockResp:", parseError);
          throw new Error("Invalid question format received from server");
        }

        setMockInterviewQuestions(parsedQuestions);
      } catch (error: any) {
        console.error("Error fetching details:", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.interviewId) {
      fetchInterviewDetails();
    } else {
      console.error("No interview ID provided in params");
      setError("No interview ID provided");
      setIsLoading(false);
    }
  }, [params.interviewId]);

  console.log("Component state:", { isLoading, error, interviewDetails, mockInterviewQuestions });

  if (isLoading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!interviewDetails || mockInterviewQuestions.length === 0) {
    return <div>No interview details available.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewDetails={interviewDetails}
        />
      </div>
      <div className="flex justify-end gap-6 mt-4">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
          <Link href={`/dashboard/interview/${interviewDetails.mockId}/feedback`}>
            
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Page;