
"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";

import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { chatSession } from "@/utils/gemini";
import { db } from "@/db";
import { UserAnswer } from "@/db/schema";
import { toast } from "sonner";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      // if (userAnswer?.length < 10) {
      //   setLoading(false)
      //   toast("Error while saving your answer,please record again");
      //   return;
      // }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    try {
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for given interview question " +
        " please give use rating for answer and feedback as area of improvement if any" +
        " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonfeedbackResp = JSON.parse(mockJsonResp);
  
      
      const response = await fetch("/api/saveAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonfeedbackResp?.feedback,
          rating: JsonfeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast("User Answer recorded successfully");
        setUserAnswer(""); 
        setResults([]);    
      } else {
        toast("Error recording your answer. Please try again.");
      }
    } catch (error) {
      console.error("Error recording answer:", error);
      toast("An error occurred while saving the answer.");
    } finally {
      setLoading(false);
    }
  };
  

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div className="flex justify-cente items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
        {/* <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        /> */}
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      {/* <Button onClick={() => console.log("------", userAnswer)}>
        Show User Answer
      </Button> */}
    </div>
  );
};

export default RecordAnswerSection;
