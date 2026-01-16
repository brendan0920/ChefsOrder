import type { Metadata } from 'next'
import './globals.css'
import TopNavigation from '@/components/TopNavigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'ChefsOrder - Streamline Your Ingredient Orders',
  description: 'Efficiently manage and send ingredient orders to vendors and purveyors',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-wrapper">
          <TopNavigation />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
