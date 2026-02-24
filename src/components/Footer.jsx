import { Link } from 'react-router-dom'
import './Footer.css'

const SOCIAL_LINKS = [
    { label: 'Instagram', href: '#', icon: '📸' },
    { label: 'Twitter', href: '#', icon: '🐦' },
    { label: 'Facebook', href: '#', icon: '📘' },
    { label: 'LinkedIn', href: '#', icon: '💼' },
]

const QUICK_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'Events', to: '/events' },
    { label: 'About', to: '/#about' },
    { label: 'Sponsors', to: '/#sponsors' },
]

export default function Footer() {
    return (
        <footer className="footer">
            
            <div className="footer__body container">
                <div className="footer__brand">
                    <div className="footer__logo">
                        <span className="footer__logo-uv">UV</span>
                        <div>
                            <div className="footer__logo-title">Utsaha Vaibhava</div>
                            <div className="footer__logo-sub">Annual College Fest 2026</div>
                        </div>
                    </div>
                    <p className="footer__tagline">
                        Igniting passion, celebrating talent, and creating memories that last a lifetime. April 10 & 11, 2026.
                    </p>
                    <div className="footer__socials">
                        {SOCIAL_LINKS.map((s) => (
                            <a key={s.label} href={s.href} className="footer__social-btn" title={s.label} aria-label={s.label}>
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer__links">
                    <h4 className="footer__heading">Quick Links</h4>
                    <ul>
                        {QUICK_LINKS.map((l) => (
                            <li key={l.label}>
                                <Link to={l.to} className="footer__link">{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer__contact">
                    <h4 className="footer__heading">Contact Us</h4>
                    <div className="footer__contact-items">
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">📍</span>
                            <span>BMS Institute of Technology and Management – 560119</span>
                        </div>
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">📞</span>
                            <span>+91 98765 00000</span>
                        </div>
                        <div className="footer__contact-item">
                            <span className="footer__contact-icon">✉️</span>
                            <span>hello@utsahavaibhava.in</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <p>© 2026 Utsaha Vaibhava. Made with ❤️ by the Fest Committee.</p>
                    <p className="footer__bottom-right">April 10 & 11, 2026</p>
                </div>
            </div>
        </footer>
    )
}
