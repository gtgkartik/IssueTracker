import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";

export default function Navbar() {
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
            <Link href={item.href} key={item.href}>
              <p className='text-zinc-500 hover:text-zinc-800 transition-colors'>{item.label}</p>
            </Link>
          )}
          
          </ul>
        </nav>
      </>
    )
  }
  
