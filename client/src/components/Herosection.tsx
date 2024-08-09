import React from 'react';
import BackGround from '../assets/Background.jpeg';
import { Button } from 'antd';

const HeroSection = () => {
  return (
    <section className="relative bg-green-900 text-white h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={BackGround} 
          alt="Agriculture Background"
          className="w-full h-full object-cover object-center opacity-50"
        />
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Transform Your Farm with Smart Technology
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Get data-driven recommendations to optimize crop yields and reduce costs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            type="primary"
            className='bg-transparent text-xl h-[60px] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-white hover:text-black transition duration-300'
            >
            Login
          </Button>
          <Button
            className="bg-transparent text-xl border-2 h-[60px] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-transparent hover:text-black transition duration-300"
          >
            About Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
