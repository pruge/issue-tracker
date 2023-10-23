'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'
import {AiFillBug} from 'react-icons/ai'
import clsx from 'clsx'

const NavBar = () => {
  const links = [
    {
      label: 'Dashboard',
      href: '/',
    },
    {label: 'Issues', href: '/issues'},
  ]

  const currentPath = usePathname()
  const createUrlPattern = (href: string) => {
    if (href === '/') return /^\/$/i
    return new RegExp(`^\\${href}`, 'i')
  }

  return (
    <nav className="flex space-x-6 border-b mb-3 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          const urlPattern = createUrlPattern(link.href)
          return (
            <Link
              key={link.href}
              className={clsx(
                {
                  'text-zinc-900': urlPattern.test(currentPath),
                  'text-zinc-500': !urlPattern.test(currentPath),
                },
                'hover:text-zinc-800 transition-colors',
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar
