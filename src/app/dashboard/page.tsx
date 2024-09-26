import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

const page = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start Your AI Mockup Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <div className="pop-animation">
          <AddNewInterview />
        </div>
      </div>
      {/* Previous interview questions */}
      <InterviewList />
    </div>
  );
};

export default page;
