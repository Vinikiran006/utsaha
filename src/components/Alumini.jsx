import './Alumini.css'

export default function Alumni() {
  return (
    <div className="alumni-page">

      <section className="alumni-hero">
        <h1>🎓 Alumni Registration</h1>
        <p>Exclusive access for BMSIT alumni</p>
      </section>

      <section className="alumni-events container">

        {/* Jordindian */}
        <div className="artist-row">
          <img src="/images/Jordindian.jpg" alt="Jordindian" />

          <div className="artist-content">
            <span className="badge">🔥 Day 1 Headliner</span>
            <h2>Jordindian</h2>
            <p>
              Alumni exclusive registration for Jordindian live performance.
            </p>

            <div className="meta">
              <span>📅 April 10 • 5:30 PM</span>
              <span>📍 Main Stage</span>
            </div>

            <button
              className="register-btn"
              onClick={() => window.open("https://luma.com/e4xnpzfl", "_blank")}
            >
              Register as Alumni
            </button>
          </div>
        </div>

        {/* Vasuki Vaibhav */}
        <div className="artist-row reverse">
          <img src="/images/vasuki.jpg" alt="Vasuki Vaibhav" />

          <div className="artist-content">
            <span className="badge">⚡ Day 2 Finale</span>
            <h2>Vasuki Vaibhav</h2>
            <p>
              Alumni exclusive registration for Vasuki Vaibhav performance.
            </p>

            <div className="meta">
              <span>📅 April 11 • 4:30 PM</span>
              <span>📍 Main Stage</span>
            </div>

            <button
              className="register-btn"
              onClick={() => window.open("https://luma.com/aotysubg", "_blank")}
            >
              Register as Alumni
            </button>
          </div>
        </div>

      </section>
    </div>
  )
}