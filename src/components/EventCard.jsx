import { Link } from 'react-router-dom'
import './EventCard.css'

const CATEGORY_COLORS = {
    Cultural: 'cat-cultural',
    Technical: 'cat-technical',
    Sports: 'cat-sports',
    'Fun & Gaming': 'cat-gaming',
}

const CATEGORY_ICONS = {
    Cultural: '🎭',
    Technical: '💻',
    Sports: '⚽',
    'Fun & Gaming': '🎮',
}

export default function EventCard({ event }) {
    const { id, title, category, date, time, shortDescription, registrationFee, venue } = event
    const catClass = CATEGORY_COLORS[category] || 'badge-orange'
    const catIcon = CATEGORY_ICONS[category] || '🎪'

    return (
        <div className="event-card glass-card">
            <div className="event-card__image-wrap">
                <div className={`event-card__image-placeholder event-card__bg--${category.toLowerCase().replace(/ & /g, '-')}`}>
                    <span className="event-card__icon">{catIcon}</span>
                </div>
                <span className={`event-card__category-badge badge ${catClass}`}>
                    {catIcon} {category}
                </span>
            </div>

            <div className="event-card__body">
                <h3 className="event-card__title">{title}</h3>
                <p className="event-card__desc">{shortDescription}</p>

                <div className="event-card__meta">
                    <div className="event-card__meta-item">
                        <span className="event-card__meta-icon">📅</span>
                        <span>{date}</span>
                    </div>
                    <div className="event-card__meta-item">
                        <span className="event-card__meta-icon">⏰</span>
                        <span>{time}</span>
                    </div>
                    {venue && (
                        <div className="event-card__meta-item">
                            <span className="event-card__meta-icon">📍</span>
                            <span>{venue}</span>
                        </div>
                    )}
                    {registrationFee && (
                        <div className="event-card__meta-item">
                            <span className="event-card__meta-icon">💰</span>
                            <span>{registrationFee}</span>
                        </div>
                    )}
                </div>

                <Link to={`/events/${id}`} className="btn btn-primary event-card__cta">
                    View Details & Register →
                </Link>
            </div>
        </div>
    )
}
