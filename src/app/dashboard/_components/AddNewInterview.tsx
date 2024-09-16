import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const AddNewInterview = (props: Props) => {
  return (
    <div>
        <div className='p-10 border rounded-lg  hover:scale-105 hover:shadow-md cursor-pointer transition-all'>

        <h1 className=' font-semibold text-lg text-center'>
           
      +  Add new
        </h1>
        </div>
    </div>
  )
}

export default AddNewInterview