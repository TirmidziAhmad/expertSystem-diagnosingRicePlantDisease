'use client';
import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, imageSrc }) => {
  return (
    <div className='bg-dark text-white border py-4 px-6 rounded-lg flex items-center justify-between gap-4'>
      <div>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <p className='text-lg font-light'>{subtitle}</p>
      </div>
      <div>
        <img src={imageSrc} className='h-[120px] w-[120px]' />
      </div>
    </div>
  );
};

export default Hero;
