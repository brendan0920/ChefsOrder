import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Terms of Use', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Resources', path: '/resources' },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.path} className="footer-link">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} ChefsOrder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
