'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';

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
      {error ? (
        <p>{error}</p>
      ) : (
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />
      )}
    </div>
  );
};

export default Page;
