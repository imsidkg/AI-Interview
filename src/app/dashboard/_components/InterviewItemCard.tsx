import React from 'react'
import { MockInterview } from './InterviewList'
import { Button } from '@/components/ui/button'
import { useRouter } from "next/navigation";
type Props = {
    interview:MockInterview
}

const InterviewItemCard = ({interview}: Props) => {
  const router = useRouter()
  const onStart=()=>{
      router.push('/dashboard/interview/'+interview?.mockId)
  }
  const onFeedbackPress=()=>{
      router.push('dashboard/interview/'+interview.mockId+"/feedback")
  }
  return (
    <div className="border shadow-sm rounded-sm p-3">
      <h2 className="font-bold text-secondary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-500">{interview?.jobExperience}</h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex justify-between gap-5 mt-2">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress} >
          Feedback
        </Button>
        <Button className="w-full text-white hover:bg-white hover:text-black" size="sm" onClick={onStart}>Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard