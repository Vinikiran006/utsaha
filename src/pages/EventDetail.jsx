import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import RegistrationForm from '../components/RegistrationForm'
import { useScrollReveal } from '../hooks/useScrollReveal'
import eventsData from '../data/events.json'
import './EventDetail.css'

const CATEGORY_COLORS = {
    'Main Stage': { bg: '#3d0a0a', accent: '#FF7849', icon: '🎤' },
    Cultural: { bg: '#3d0a0a', accent: '#E85D04', icon: '🎭' },
    Technical: { bg: '#370617', accent: '#F48C06', icon: '💻' },
    Literary: { bg: '#240d0d', accent: '#DC2F02', icon: '📖' },
}

export default function EventDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    useScrollReveal()

    const event = eventsData.find((e) => e.id === id)

    useEffect(() => {
        if (event) {
            document.title = `${event.title} – Utsaha Vaibhava 2026`
        }
    }, [event])

    if (!event) {
        return (
            <div className="event-detail__notfound">
                <div className="container" style={{ textAlign: 'center', paddingTop: '160px' }}>
                    <span style={{ fontSize: '4rem' }}>🔍</span>
                    <h2 style={{ marginTop: '16px', fontSize: '1.5rem', fontWeight: 800 }}>Event Not Found</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                        The event you're looking for doesn't exist.
                    </p>
                    <Link to="/events" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
                        ← Back to Events
                    </Link>
                </div>
            </div>
        )
    }

    const catMeta = CATEGORY_COLORS[event.category] || CATEGORY_COLORS['Main Stage']

    return (
        <div className="event-detail">
            {/* Banner */}
            <div
                className="event-detail__banner"
                style={{ background: `linear-gradient(135deg, ${catMeta.bg}, #1c0a0a 70%)` }}
            >
                <div className="event-detail__banner-blob" />
                {event.poster && (
                    <div className="event-detail__banner-poster">
                        <img src={event.poster} alt={event.title} />
                    </div>
                )}
                <div className="container event-detail__banner-inner">
                    <button className="event-detail__back" onClick={() => navigate(-1)}>
                        ← Back to Events
                    </button>
                    <div className="event-detail__header-content">
                        {/* <div className="event-detail__banner-icon">{catMeta.icon}</div> */}
                        <div>
                            <div className="event-detail__category-tag badge" style={{
                                background: `${catMeta.accent}18`,
                                color: catMeta.accent,
                                border: `1px solid ${catMeta.accent}35`
                            }}>
                                {catMeta.icon} {event.category}
                            </div>
                            <h1 className="event-detail__title">{event.title}</h1>
                            <div className="event-detail__meta-row">
                                <span>📅 {event.date}</span>
                                <span>⏰ {event.time}</span>
                                {event.venue && <span>📍 {event.venue}</span>}
                                {event.teamSize && <span>👥 Team: {event.teamSize} {typeof event.teamSize === 'number' ? 'members' : 'members/team'}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="event-detail__content container">
                <div className="event-detail__main">

                    {/* Description */}
                    <section className="ed-section reveal">
                        <h2 className="ed-section__title">About This Event</h2>
                        <p className="ed-section__text">{event.description}</p>
                    </section>

                    {/* Rules */}
                    <section className="ed-section reveal">
                        <h2 className="ed-section__title">📋 Rules & Guidelines</h2>
                        <ul className="ed-rules-list">
                            {event.rules.map((rule, i) => (
                                <li key={i} className="ed-rules-list__item">
                                    <span className="ed-rules-list__num">{i + 1}</span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Prizes */}
                    <section className="ed-section reveal">
                        <h2 className="ed-section__title">🏆 Prize Details</h2>
                        <div className="ed-prizes">
                            {event.prizes.first && (
                                <div className="ed-prize-card ed-prize-card--gold">
                                    <span className="ed-prize-card__medal">🥇</span>
                                    <span className="ed-prize-card__label">1st Place</span>
                                    <span className="ed-prize-card__amount">{event.prizes.first}</span>
                                </div>
                            )}
                            {event.prizes.second && (
                                <div className="ed-prize-card ed-prize-card--silver">
                                    <span className="ed-prize-card__medal">🥈</span>
                                    <span className="ed-prize-card__label">2nd Place</span>
                                    <span className="ed-prize-card__amount">{event.prizes.second}</span>
                                </div>
                            )}
                            {event.prizes.third && (
                                <div className="ed-prize-card ed-prize-card--bronze">
                                    <span className="ed-prize-card__medal">🥉</span>
                                    <span className="ed-prize-card__label">3rd Place</span>
                                    <span className="ed-prize-card__amount">{event.prizes.third}</span>
                                </div>
                            )}
                            {event.prizes.mvp && (
                                <div className="ed-prize-card ed-prize-card--mvp">
                                    <span className="ed-prize-card__medal">⭐</span>
                                    <span className="ed-prize-card__label">Special Award</span>
                                    <span className="ed-prize-card__amount">{event.prizes.mvp}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Registration Form */}
                    <section className="ed-section ed-reg-section reveal">
                        <h2 className="ed-section__title">✍️ Register for This Event</h2>
                        <p className="ed-section__text" style={{ marginBottom: '24px' }}>
                            Fill in the form below to register. All data is saved securely on your device.
                        </p>
                        <RegistrationForm event={event} />
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="event-detail__sidebar">
                    {/* Quick Info */}
                    <div className="ed-sidebar-card reveal-right">
                        <h3 className="ed-sidebar-card__title">📌 Quick Info</h3>
                        <div className="ed-sidebar-info">
                            {[
                                { icon: '📅', label: 'Date', value: event.date },
                                { icon: '⏰', label: 'Time', value: event.time },
                                { icon: '📍', label: 'Venue', value: event.venue || 'TBA' },
                                { icon: '👥', label: 'Team Size', value: `${event.teamSize} ${typeof event.teamSize === 'number' ? 'members' : 'members/team'}` },
                                { icon: '🎟️', label: 'Eligibility', value: event.eligibility },
                                { icon: '💰', label: 'Entry Fee', value: event.registrationFee || 'Free' },
                            ].map((info) => (
                                <div key={info.label} className="ed-sidebar-info__item">
                                    <span className="ed-sidebar-info__icon">{info.icon}</span>
                                    <div>
                                        <div className="ed-sidebar-info__label">{info.label}</div>
                                        <div className="ed-sidebar-info__value">{info.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coordinator */}
                    <div className="ed-sidebar-card reveal-right" style={{ transitionDelay: '0.1s' }}>
                        <h3 className="ed-sidebar-card__title">📞 Event Coordinator</h3>
                        <div className="ed-coordinator">
                            <div className="ed-coordinator__avatar">
                                {event.coordinator.name.charAt(0)}
                            </div>
                            <div className="ed-coordinator__info">
                                <div className="ed-coordinator__name">{event.coordinator.name}</div>
                                <a href={`tel:${event.coordinator.phone}`} className="ed-coordinator__phone">
                                    {event.coordinator.phone}
                                </a>
                                {event.coordinator.email && (
                                    <a href={`mailto:${event.coordinator.email}`} className="ed-coordinator__email">
                                        {event.coordinator.email}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
