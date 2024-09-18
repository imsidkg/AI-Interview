'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/addInterview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobPosition,
          jobDescription,
          jobExperience,
          user: { email: user?.primaryEmailAddress?.emailAddress || "" },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      console.log('Data:', data);

      if (data.success) {
        router.push(`/dashboard/interview/${data.mockId}`);
      } else {
        throw new Error('Interview submission failed');
      }
    } catch (error:any) {
      console.error('Error submitting interview:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-10 border rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h1
          className="font-semibold text-lg text-center"
          onClick={() => setIsOpen(true)}
        >
          + Add new
        </h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
          <DialogContent className="max-w-md ml-7">
            <DialogHeader>
              <DialogTitle>
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription>
                <form className="space-y-6" onSubmit={onSubmit}>
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
                          <Loader2 className="animate-spin m-1" /> Generating
                          from AI
                        </>
                      ) : (
                        "Start Interview"
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