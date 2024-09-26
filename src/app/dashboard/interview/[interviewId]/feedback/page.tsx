'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';

type FeedbackProp = {
  id: number;
  mockIdRef: string;
  question: string;
  correctAns?: string | null;
  userAns?: string | null;
  feedback?: string | null;
  rating?: string | null;
  userEmail?: string | null;
  createdAt: Date;
}

const Page = () => {
  const params = useParams();
  const [feedbackList, setFeedbackList] = useState<FeedbackProp[]>([]);

  const getFeedback = async () => {
    try {
      const result = await fetch(`/api/feedback?interviewId=${params.interviewId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.error || `Failed to fetch interview details. Status: ${result.status}`);
      }
      const data = await result.json();
      setFeedbackList(data);
    } catch (error) {
      console.log("Error finding the feedback", error);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  // Function to determine the rating color
  const getRatingColor = (rating: number | null | undefined) => {
    if (rating === null || rating === undefined) return ''; // Default, no color if rating is missing
    if (rating >= 1 && rating <= 4) return 'text-red-500'; // Red for 1-4
    if (rating >= 5 && rating <= 7) return 'text-orange-500'; // Orange for 5-7
    if (rating >= 8 && rating <= 10) return 'text-green-500'; // Green for 8-10
    return ''; // Default case
  };

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-white'>Congratulations</h2>
      <h2 className='text-2xl font-bold text-white'>Here is your interview feedback</h2>
      <h2 className='text-blue-500 text-lg my-3'>Your overall performance</h2>
      <h2 className='text-gray-500 text-sm'>Find below interview questions with correct answer, your answer, and feedback for improvement</h2>
      {feedbackList.map((item, index) => {
        return (
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 flex justify-between bg-primary rounded-lg my-2 text-left gap-7 w-full'>
              {item.question} <ChevronsUpDown className='h-4'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                {/* Apply the color dynamically based on the rating */}
                <h2 className={`p-2 border rounded-lg ${getRatingColor(Number(item.rating))}`}>
                  <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer Looks Like: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

export default Page;
