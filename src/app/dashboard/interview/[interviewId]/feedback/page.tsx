import { useParams } from 'next/navigation'
import React, { useState } from 'react'



const page = () => {
  const params = useParams();
  const[feedbackList, setFeedbackList] = useState([])
try {
  const getFeedback =async () => {
    const result = await fetch(`/api/feedback?interviewId=${params.interviewId}` , {
      method:"GET",
      headers : {
        "Content-Type": "application/json",
      }
    })
    console.log(result);
    console.log("Response status:", result.status);
    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.error || `Failed to fetch interview details. Status: ${result.status}`);
    }
    const data =await result.json()
    setFeedbackList(data)
   }
} catch (error) {
  console.log("Error finding the feedback")
}
  
  return (
    <div className=' p-10'>
        <h2 className='text-3xl font-bold text-white'>Congratulations</h2>
        <h2 className='text-2xl font-bold text-white'>Here is your interview feedback</h2>
        <h2 className='text-blue-500 text-lg my-3'>Your overall performance</h2>
        <h2 className='text-gray-500 text-sm '>Find below interview questions with correct answer, Your answer and feedback for improvement</h2>
      
    </div>
  )
}

export default page