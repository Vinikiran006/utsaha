import { Link } from 'react-router-dom'
import './EventCard.css'

const CATEGORY_COLORS = {
    'Main Stage': 'cat-mainstage',
    Cultural: 'cat-cultural',
    Technical: 'cat-technical',
    Literary: 'cat-literary',
}

const CATEGORY_ICONS = {
    'Main Stage': '🎤',
    Cultural: '🎭',
    Technical: '💻',
    Literary: '📖',
}

export default function EventCard({ event }) {
    const { id, title, category, date, time, shortDescription, registrationFee, venue, poster } = event
    const catClass = CATEGORY_COLORS[category] || 'cat-mainstage'
    const catIcon = CATEGORY_ICONS[category] || '🎪'
    const bgClass = `event-card__bg--${category.toLowerCase().replace(/ /g, '-')}`

    return (
        <div className="event-card glass-card">
            <div className="event-card__image-wrap">
                {poster ? (
                    <img src={poster} alt={title} className="event-card__image" />
                ) : (
                    <div className={`event-card__image-placeholder ${bgClass}`}>
                        <span className="event-card__icon">{catIcon}</span>
                    </div>
                )}
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
                    View Details &amp; Register →
                </Link>
            </div>
        </div>
    )
}
