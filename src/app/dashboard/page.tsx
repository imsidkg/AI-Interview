import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

type Props = {}

const page = () => {
  return (
    <div className="p-10">
    <h2 className="font-bold text-2xl">Dashboard</h2>
    <h2 className="text-gray-200 font-medium">Create and Start Your AI Mockup Interview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 my-5">
      <AddNewInterview/>
    </div>
    {/* previous interview questions */}
    {/* <InterviewList/> */}
  </div>
  )
}

export default page