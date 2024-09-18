'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  params : any
}

const page = ({params}: Props) => {

  useEffect(() => {
    
    console.log(params.interviewId);
  })
  return (
    <div>page</div>
  )
}

export default page