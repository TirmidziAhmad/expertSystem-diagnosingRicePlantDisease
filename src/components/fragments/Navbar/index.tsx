'use client';
import React from 'react';

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <>
      <header className='flex items-center justify-between pb-4 border-b border-black'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <button className='bg-olive text-white px-4 py-2 rounded hover:bg-yellow-600'>Logout</button>
      </header>
    </>
  );
};

export default Navbar;
