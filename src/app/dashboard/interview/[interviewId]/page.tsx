"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import Loader from '@/components/Loader'
import Link from "next/link";
type InterviewDetails = {
  mockId: string;
  jobDesc: string; // Add other relevant fields as needed
  jobPosition: string;
  jobExperience: string;
  createdAt: string;
  createdBy: string;
  jsonMockResp: string;
};

const page = () => {
  const params = useParams();
  const [interviewDetails, setInterviewDetails] =
    useState<InterviewDetails | null>(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const res = await fetch(
          `/api/getInterviewDetails?interviewId=${params.interviewId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.error || "Failed to fetch interview details"
          );
        }

        const data = await res.json();
        console.log(data);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!interviewDetails) {
    return <div><Loader/></div>;
  }

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl">Lets get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5  rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewDetails?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/tech Stack: </strong>
              {interviewDetails?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewDetails?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 ">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 my-7 border rounded-lg w-full p-20 " />
              <Button
                className="w-full bg-primary"
                variant="ghost"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end mt-5">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="bg-blue-500 ">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
