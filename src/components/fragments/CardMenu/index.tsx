'use client';
import React from 'react';
import Link from 'next/link';
import { FaHome, FaHistory, FaSearch, FaBook, FaInfoCircle } from 'react-icons/fa';
import useActiveMenu from './UseActiveMenu';

type MenuItem = {
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const CardMenu: React.FC = () => {
  const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/user/dashboard', icon: FaHome },
    { name: 'Diagnosa', href: '/user/diagnosa', icon: FaSearch },
    { name: 'Riwayat', href: '/user/riwayat', icon: FaHistory },
    { name: 'Pengetahuan', href: '/user/pengetahuan', icon: FaBook },
    { name: 'Tentang', href: '/user/tentang', icon: FaInfoCircle },
  ];

  const activeMenu = useActiveMenu(menuItems);

  return (
    <aside className='fixed w-64 h-full bg-white shadow-md shadow-dark py-2 px-6'>
      <div className='flex justify-center text-center items-center py-4 border-b border-dark mb-4'>
        <Link href='/' className='flex items-center text-olive'>
          <img src='/logo.svg' alt='icon' className='w-7 h-7' />
          <span className='text-xl font-bold ml-2'>ESRDP</span>
        </Link>
      </div>
      <nav className='space-y-4'>
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className={`group flex items-center group-hover:text-olive  ${activeMenu === item.name ? 'text-olive' : 'text-black'}`}>
            <item.icon className={`w-5 h-5  group-hover:text-olive ${activeMenu === item.name ? 'text-olive' : 'text-black'}`} />
            <span className='ml-4 group-hover:text-olive'>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default CardMenu;
