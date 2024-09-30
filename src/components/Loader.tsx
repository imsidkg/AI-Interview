import React from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo.svg'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image 
        src={Logo} 
        alt="Loading Logo" 
        width={200} 
        height={200} 
        className="animate-pulse"
      />
    </div>
  );
}

export default Loading;
