import { Link } from 'react-router-dom'
import './HeroSection.css'

export default function HeroSection() {
    return (
        <section className="hero">
            {/* Decorative blobs */}
            <div className="hero__blob hero__blob--1" />
            <div className="hero__blob hero__blob--2" />
            <div className="hero__blob hero__blob--3" />
            <div className="hero__particles">
                {Array.from({ length: 80 }).map((_, i) => (
    <div
        key={i}
        className="hero__particle"
        style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 6}s`
        }}
    />
))}
            </div>

            <div className="container hero__inner">
                {/* Badge */}
                <div className="hero__badge animate-fadein-delay-1">
                    <span className="hero__badge-dot" />
                    Annual College Fest 2026 &nbsp;·&nbsp; April 10 & 11
                </div>

                {/* Headline */}
                <h1 className="hero__title animate-fadein-delay-2">
                    <span className="hero__title-prefix">Welcome to</span>
                    <span className="hero__title-main">
                        UTSAHA<br />VAIBHAVA
                    </span>
                </h1>

                {/* Tagline */}
                <p className="hero__tagline animate-fadein-delay-3">
                    Where talent meets celebration — music, code, sports, and infinite energy.
                    <br />
                    Two days of unforgettable experiences!
                </p>

                {/* CTA Buttons */}
                <div className="hero__ctas animate-fadein-delay-4">
                    <Link to="/events" className="btn btn-primary hero__cta-primary">
                        🎪 Explore Events
                    </Link>
                    <Link to="/events" className="btn btn-outline hero__cta-secondary">
                        ✍️ Register Now
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="hero__stats animate-fadein-delay-5">
                    {[
                        { number: '30+', label: 'Events' },
                        { number: '7', label: 'Categories' },
                        { number: '₹4L+', label: 'in Prizes' },
                        { number: '2', label: 'Days of Fun' },
                    ].map((stat) => (
                        <div key={stat.label} className="hero__stat">
                            <span className="hero__stat-number">{stat.number}</span>
                            <span className="hero__stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero__scroll-hint">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-wheel" />
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    )
}
