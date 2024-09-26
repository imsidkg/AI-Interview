"use client";

import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

export type MockInterview = {
    id: number; // serial primary key
    jsonMockResp: string; // text field for JSON response
    jobPosition: string; // varchar for job position
    jobDesc: string; // varchar for job description
    jobExperience: string; // varchar for job experience
    createdBy: string; // varchar for the email of the creator
    createdAt: string; // varchar for the created timestamp, consider using Date type if you convert it
    mockId: string; // varchar for the mock ID
};

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState<MockInterview[]>([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    try {
        const result = await fetch('/api/getInterviewDetails' , {
            method : 'GET' , 
            headers : {
                "Content-Type": "application/json",
            }
        })
        if (!result.ok) {
            const errorData = await result.json();
            throw new Error(errorData.error || `Failed to fetch interview details. Status: ${result.status}`);
          }
          const data = await result.json();
          setInterviewList(data);
    } catch (error) {
        console.log("Error finding the feedback", error);
    }
   
  };
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {InterviewList&&InterviewList.map((interview,index)=>(
            <InterviewItemCard interview={interview} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;