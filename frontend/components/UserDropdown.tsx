'use client'

import { useState, useRef, useEffect } from 'react'

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const username = 'Chef' // This will be replaced with actual user data later

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    { label: 'Profile', path: '/profile' },
    { label: 'Account Info', path: '/account' },
    { label: 'Setting', path: '/settings' },
    { label: 'Payment', path: '/payment' },
    { label: 'Sign out', path: '/signout', isLast: true },
  ]

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button
        className="user-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        Welcome, {username}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="user-dropdown-menu">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className={`dropdown-item ${item.isLast ? 'last-item' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
