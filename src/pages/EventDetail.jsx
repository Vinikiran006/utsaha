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
                    <h2 style={{ marginTop: '16px', fontSize: '1.5rem', fontWeight: 800 }}>
                        Event Not Found
                    </h2>
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
                <div className="container event-detail__banner-inner">
                    <button className="event-detail__back" onClick={() => navigate(-1)}>
                        ← Back to Events
                    </button>

                    <div className="event-detail__header-content">
                        <div>
                            <div
                                className="event-detail__category-tag badge"
                                style={{
                                    background: `${catMeta.accent}18`,
                                    color: catMeta.accent,
                                    border: `1px solid ${catMeta.accent}35`,
                                }}
                            >
                                {catMeta.icon} {event.category}
                            </div>

                            <h1 className="event-detail__title">{event.title}</h1>

                            <div className="event-detail__meta-row">
                                {event.date && <span>📅 {event.date}</span>}
                                {event.time && <span>⏰ {event.time}</span>}
                                {event.venue && <span>📍 {event.venue}</span>}
                                {event.teamSize && (
                                    <span>
                                        👥 Team: {event.teamSize}
                                    </span>
                                )}
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
                    {event.rules && (
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
                    )}

                    {/* Prizes */}
                    <section className="ed-section reveal">
    <h2 className="ed-section__title">🏆 Prize Details</h2>

    <div className="ed-prizes">

        {event.prizes.first && (
            <div className="ed-prize-card ed-prize-card--gold">
                <div className="ed-prize-card__medal">🥇</div>
                <div className="ed-prize-card__label">1st Place</div>
                <div className="ed-prize-card__amount">{event.prizes.first}</div>
            </div>
        )}

        {event.prizes.second && (
            <div className="ed-prize-card ed-prize-card--silver">
                <div className="ed-prize-card__medal">🥈</div>
                <div className="ed-prize-card__label">2nd Place</div>
                <div className="ed-prize-card__amount">{event.prizes.second}</div>
            </div>
        )}

        {event.prizes.third && (
            <div className="ed-prize-card ed-prize-card--bronze">
                <div className="ed-prize-card__medal">🥉</div>
                <div className="ed-prize-card__label">3rd Place</div>
                <div className="ed-prize-card__amount">{event.prizes.third}</div>
            </div>
        )}

    </div>
</section>

                    {/* Registration */}
                    <section className="ed-section ed-reg-section reveal">
                        <h2 className="ed-section__title">✍️ Register for This Event</h2>
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
                                { icon: '👥', label: 'Team Size', value: event.teamSize },
                                { icon: '🎟️', label: 'Eligibility', value: event.eligibility },
                                { icon: '💰', label: 'Entry Fee', value: event.registrationFee || 'Free' },
                            ].map((info) => (
                                info.value && (
                                    <div key={info.label} className="ed-sidebar-info__item">
                                        <span>{info.icon}</span>
                                        <div>
                                            <div className="ed-sidebar-info__label">{info.label}</div>
                                            <div className="ed-sidebar-info__value">{info.value}</div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Coordinators */}
                    {event.coordinator && (
                        <div className="ed-sidebar-card reveal-right">
                            <h3 className="ed-sidebar-card__title">📞 Event Coordinators</h3>

                            <div className="ed-coordinator-list">
                                {event.coordinator.names
                                    ? event.coordinator.names.map((name, index) => (
                                        <div key={index} className="ed-coordinator-item">
                                            <div className="ed-coordinator__avatar">
                                                {name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="ed-coordinator__name">{name}</div>
                                                {event.coordinator.phones?.[index] && (
                                                    <a
                                                        href={`tel:${event.coordinator.phones[index]}`}
                                                        className="ed-coordinator__phone"
                                                    >
                                                        {event.coordinator.phones[index]}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                    : (
                                        <div className="ed-coordinator-item">
                                            <div className="ed-coordinator__avatar">
                                                {event.coordinator.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="ed-coordinator__name">
                                                    {event.coordinator.name}
                                                </div>
                                                {event.coordinator.phone && (
                                                    <a
                                                        href={`tel:${event.coordinator.phone}`}
                                                        className="ed-coordinator__phone"
                                                    >
                                                        {event.coordinator.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}

                </aside>
            </div>
        </div>
    )
}