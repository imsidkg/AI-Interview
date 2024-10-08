import { Lightbulb } from 'lucide-react';
import React from 'react';

type QuestionAnswer = {
  question: string;
  answer: string;
};

type Props = {
  mockInterviewQuestion: QuestionAnswer[];
  activeQuestionIndex: number;
};

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }: Props) => {
  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-primary'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question || 'No question available'}
      </h2>

      {/* Note section */}
      <div className="border rounded-lg p-5 bg-white mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm bg-prima text-yellow-500 my-2'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || 'No note available'}
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;