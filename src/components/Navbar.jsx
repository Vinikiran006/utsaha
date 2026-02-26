import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/logo.png'
import uv from '../assets/uv.png'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Events', to: '/events' },
    { label: 'About', to: '/#about' },
    { label: 'Sponsors', to: '/#sponsors' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [location])

    const handleHashLink = (e, to) => {
        if (to.startsWith('/#')) {
            e.preventDefault()
            const id = to.replace('/#', '')
            if (location.pathname !== '/') {
                navigate('/')
                setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }, 300)
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }
            setMenuOpen(false)
        }
    }

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner container">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
    <img src={logo} alt="Main Logo" className="navbar__logo-img" />
   
</Link>

                {/* Desktop Nav */}
                <nav className="navbar__links hide-mobile">
                    {navLinks.map((link) =>
                        link.to.startsWith('/#') ? (
                            <a
                                key={link.label}
                                href={link.to}
                                className="navbar__link"
                                onClick={(e) => handleHashLink(e, link.to)}
                            >
                                {link.label}
                            </a>
                        ) : (
                            <NavLink
                                key={link.label}
                                to={link.to}
                                className={({ isActive }) =>
                                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                                }
                                end
                            >
                                {link.label}
                            </NavLink>
                        )
                    )}
                </nav>

                {/* CTA */}
                <div className="navbar__actions hide-mobile">
                    <Link to="/events" className="btn-register">
                        Register Now
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
                {navLinks.map((link) =>
                    link.to.startsWith('/#') ? (
                        <a
                            key={link.label}
                            href={link.to}
                            className="navbar__mobile-link"
                            onClick={(e) => handleHashLink(e, link.to)}
                        >
                            {link.label}
                        </a>
                    ) : (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            className="navbar__mobile-link"
                            end
                        >
                            {link.label}
                        </NavLink>
                    )
                )}
                <Link to="/events" className="btn btn-primary" style={{ marginTop: '8px', width: '100%' }}>
                    Register Now
                </Link>
            </div>
        </header>
    )
}
