"use client"
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Header(){
    const path = usePathname()
    useEffect(()=>{
        console.log(path)
    })
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
          <img src={'/logo.svg'} width={60} height={60} alt='logo' />
          <ul className='hidden md:flex gap-6 '>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            ${path=='/dashboard' && 'font-bold text-primary'}`}>
            
            Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path == '/questions' && 'font-bold text-primary'}`}>
            
            Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
            ${path == '/upgrade' && 'font-bold text-primary'}`}>
            Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
            ${path == '/works' && 'font-bold text -primary'}`}>How it Works?</li>
          </ul>
          <UserButton/>
        </div>
    )
}