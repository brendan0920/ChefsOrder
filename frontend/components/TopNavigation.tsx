'use client'

import { useState } from 'react'
import Link from 'next/link'
import UserDropdown from './UserDropdown'

export default function TopNavigation() {
  const [activeTab, setActiveTab] = useState('Home')

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Order', path: '/order' },
    { name: 'History', path: '/history' },
    { name: 'Vendors', path: '/vendors' },
    { name: 'Message', path: '/message' },
  ]

  return (
    <nav className="top-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/">ChefsOrder</Link>
        </div>
        <div className="nav-tabs">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`nav-tab ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="nav-user">
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}
