"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';

export default function Navbar() {
 const currentPath =  usePathname();

  const Navlinks = [
    {href: "/",  label: "Dashboard"},
    {href: "/issues", label: "Issues"}
  ]
    return (
      <>
        <nav className='flex border-b px-5 h-14 items-center space-x-6'>

        <ul className='flex space-x-6'>
          <Link href="/"><FaBug size={20}/></Link>

          {Navlinks.map((item) => 
            <Link 
            href={item.href} 
            key={item.href}>
            <p className= {classnames({
              'text-zinc-900': currentPath === item.href,
              'text-zinc-500': currentPath !== item.href,
              'transition-colors hover:text-zinc-800 ': true,

            })}
            >{item.label}</p>
            </Link>
          )}
          
          </ul>
        </nav>
      </>
    )
  }
  
