"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

export type MockInterview = {
    id: number; // serial primary key
    jsonMockResp: string; // text field for JSON response
    jobPosition: string; // varchar for job position
    jobDesc: string; // varchar for job description
    jobExperience: string; // varchar for job experience
    createdBy: string; // varchar for the email of the creator
    createdAt: string; // varchar for the created timestamp
    mockId: string; // varchar for the mock ID
};

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<MockInterview[]>([]);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await fetch('/api/getInterviewList', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.error || `Failed to fetch interview details. Status: ${result.status}`);
      }

      const data = await result.json();
      setInterviewList(data);
    } catch (error) {
      console.log("Error fetching interview list:", error);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList && interviewList.map((interview, index) => (
          <InterviewItemCard interview={interview} key={index} />
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
