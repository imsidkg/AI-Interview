"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/gemini";
import { Loader2 } from "lucide-react";

type Props = {};

const AddNewInterview = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");
  const [loading , setLoading] = useState<boolean>(false)

    const onSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true)
        const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us advanced ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview questions and do not ask any personal questions along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format: {
            "question": "Your question here",
            "answer": "Your answer here"
          }`;
        
            try{
                const result =  await chatSession.sendMessage(inputPrompt);
                // const responseText = await result.response.text();
                const mockJsonResponse = (result.response.text()).replace('``json' , "").replace('``json' , "");

            }
            catch(e) {
        
            }
            setLoading(false)
        

    }

  
  return (
    <div>
      <div className="p-10 border rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h1
          className="font-semibold text-lg text-center"
          onClick={() => setIsOpen(true)}
        >
          + Add new
        </h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md ml-7">
            {" "}
            {/* Adjust width and center dialog */}
            <DialogHeader>
              <DialogTitle>
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription>
                <form className="space-y-6" onSubmit={onSubmit}>
                  {" "}
                  {/* Adds spacing between form elements */}
                  <p className="text-gray-500 pt-2">
                    Add details about your job position/role, job description,
                    and years of experience.
                  </p>
                  <div className="my-3">
                    <label className="text-gray-500 block mb-1">
                      Job Role/Job Position
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      className="text-white"
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-gray-500 block mb-1">
                      Job Description/Tech Stack
                    </label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      required
                      className="text-white"
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="text-gray-500 block mb-1">
                      Years of Experience
                    </label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="1"
                      max="70"
                      required
                      className="text-white"
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3 justify-end mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                   
                      disabled={loading}

                    >
                         {loading ? (
                    <>
                      <Loader2 className="animate-spin m-1" /> Generating from AI
                    </>
                  ) : (
                    'Start Interview'
                  )}
                     
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNewInterview;
