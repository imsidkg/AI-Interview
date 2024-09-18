'use client'

import { db } from '@/db'
import { MockInterview } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type InterviewDetails = {
  mockId: string;
  // Add other fields from your MockInterview schema
}

const page = () => {
  const params = useParams()
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const res = await fetch(`/api/getInterviewDetails?interviewId=${params.interviewId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to fetch interview details')
        }
        
        const data = await res.json()
       
        setInterviewDetails(data)
      } catch (error: any) {
        console.error('Error fetching details', error.message)
        setError(error.message)
      }
    }

    if (params.interviewId) {
      fetchInterviewDetails()
    }
  }, [params.interviewId])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!interviewDetails) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Interview Details</h1>
      <p>Interview ID: {interviewDetails.mockId}</p>
      {/* Display other interview details here */}
    </div>
  )
}

export default page