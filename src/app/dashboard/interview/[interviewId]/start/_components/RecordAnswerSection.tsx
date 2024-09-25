"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { chatSession } from "@/utils/gemini";
import { toast } from "sonner";
import Webcam from "react-webcam";

type QuestionAnswer = {
  question: string;
  answer: string;
};

type InterviewDetails = {
  mockId: string;
  jobDesc: string;
  jobPosition: string;
  jobExperience: string;
  createdAt: string;
  createdBy: string;
  jsonMockResp: string;
};

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

type Props = {
  mockInterviewQuestion: QuestionAnswer[];
  activeQuestionIndex: number;
  interviewDetails: InterviewDetails | null;
};

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewDetails,
}: Props) => {
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

  // Log all speech recognition results
  useEffect(() => {
    console.log("Results received:", results);
    results.forEach((result) => {
      if (typeof result !== "string" && result.transcript) {
        setUserAnswer((prevAns) => prevAns + result.transcript);
      }
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const handleUserMediaError = (error: string | DOMException) => {
    if (typeof error === "string") {
      console.log("Webcam access error", error);
      toast("Unable to access webcam, please check permission");
    } else if (error instanceof DOMException) {
      console.error("DOMException occurred:", error.message);
      toast("A browser error occurred while accessing your webcam.");
    }
  };

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      try {
        console.log("Starting speech-to-text recording...");
        startSpeechToText();
      } catch (error) {
        console.error("Speech recognition start error:", error);
        toast("Recording is already in progress.");
      }
    }
  };

  const UpdateUserAnswer = async () => {
    if (!interviewDetails || !mockInterviewQuestion[activeQuestionIndex]) {
      toast("Interview details or question not available.");
      return;
    }

    setLoading(true);
    try {
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex].question +
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

      const response = await fetch("/api/saveUserAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockIdRef: interviewDetails.mockId,
          question: mockInterviewQuestion[activeQuestionIndex].question,
          correctAns: mockInterviewQuestion[activeQuestionIndex].answer,
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
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <Webcam
          audio={false}
          width={540}
          height={360}
          mirrored={true}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMediaError={handleUserMediaError}
        />
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
          <h2 className="text-primary flex gap-2 items-center text-white hover:text-black">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
