import React from 'react';

interface NavbarProps {
  title: string;
}

const Navbar : React.FC<NavbarProps> = ({title}) => {
  return(
    <>
    <header className="flex items-center justify-between pb-4 border-b border-black">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-xl text-gray-700">Jazz</div>
    </header>
    </>
  )
}

export default Navbar;