import Image from 'next/image';
import React from 'react';

const GlobalLoader = () => {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <Image
        src="/assets/images/logo/Logo-dark.png"
        width={500}
        height={500}
        alt="ATC Chain"
      />
    </div>
  );
};

export default GlobalLoader;
