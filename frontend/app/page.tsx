import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ChefsOrder</h1>
          <p className="hero-subtitle">
            Streamline your ingredient ordering process. Send orders to all your vendors in one place.
          </p>
          <div className="hero-buttons">
            <Link href="/order" className="btn-primary">Create New Order</Link>
            <Link href="/history" className="btn-secondary">View Order History</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose ChefsOrder?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Save Time</h3>
              <p className="feature-description">
                No more phone calls or multiple emails. Send all your orders in one click.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">Organized Orders</h3>
              <p className="feature-description">
                Keep track of all your orders and order history in one centralized location.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Vendor Management</h3>
              <p className="feature-description">
                Manage all your vendors and purveyors in one place with easy communication.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Easy to Use</h3>
              <p className="feature-description">
                Intuitive interface designed specifically for busy chefs on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50%</div>
              <div className="stat-label">Time Saved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Happy Chefs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
