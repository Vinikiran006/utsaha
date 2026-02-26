import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import eventsData from '../data/events.json'
import './Events.css'

const CATEGORIES = ['Main Stage', 'Cultural', 'Technical', 'Literary']

const CATEGORY_META = {
    'Main Stage': {
        icon: '🎤',
        label: 'Main Stage',
        tagline: 'Grand performances, fashion & DJ nights',
        accent: '#FF7849',
        accentRgb: '255,120,73',
    },
    Cultural: {
        icon: '🎭',
        label: 'Cultural',
        tagline: 'Dance, music & artistic expression',
        accent: '#E85D04',
        accentRgb: '232,93,4',
    },
    Technical: {
        icon: '💻',
        label: 'Technical',
        tagline: 'Esports, coding & speed challenges',
        accent: '#F48C06',
        accentRgb: '244,140,6',
    },
    Literary: {
        icon: '📖',
        label: 'Literary',
        tagline: 'Debates, writing, quizzes & roleplay',
        accent: '#DC2F02',
        accentRgb: '220,47,2',
    },
}

const CATEGORY_COLORS = {
    'Main Stage': 'cat-mainstage',
    Cultural: 'cat-cultural',
    Technical: 'cat-technical',
    Literary: 'cat-literary',
}

function EventCard({ event, accent }) {
    const { id, title, category, date, time, shortDescription, registrationFee, venue, teamSize, poster } = event
    const catClass = CATEGORY_COLORS[category] || 'cat-mainstage'
    const meta = CATEGORY_META[category]

    return (
        <Link to={`/events/${id}`} className="ev-card">
            {/* Left accent stripe */}
            <div className="ev-card__stripe" style={{ background: meta.accent }} />

            {/* Poster or Icon */}
            {poster ? (
                <div className="ev-card__poster-col">
                    <img src={poster} alt={title} className="ev-card__poster-img" />
                </div>
            ) : (
                <div className="ev-card__icon-col">
                    <div className="ev-card__icon-wrap" style={{ '--accent': meta.accent, '--accent-rgb': meta.accentRgb }}>
                        <span className="ev-card__icon">{meta.icon}</span>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="ev-card__content">
                <div className="ev-card__top">
                    <div>
                        <span className={`ev-card__cat-tag badge ${catClass}`}>{meta.icon} {category}</span>
                        <h3 className="ev-card__title">{title}</h3>
                        <p className="ev-card__desc">{shortDescription}</p>
                    </div>
                </div>

                <div className="ev-card__footer">
                    <div className="ev-card__meta-row">
                        <span className="ev-card__meta-chip">📅 {date}</span>
                        <span className="ev-card__meta-chip">⏰ {time}</span>
                        {venue && <span className="ev-card__meta-chip">📍 {venue}</span>}
                        {teamSize && <span className="ev-card__meta-chip">👥 {teamSize}</span>}
                        {registrationFee && <span className="ev-card__meta-chip ev-card__meta-chip--fee">💰 {registrationFee}</span>}
                    </div>
                    <div className="ev-card__cta" style={{ '--accent': meta.accent }}>
                        View &amp; Register <span>→</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default function Events() {
    const [activeCategory, setActiveCategory] = useState('All')
    const sectionRefs = useRef({})

    useScrollReveal()

    useEffect(() => {
        document.title = 'Events – Utsaha Vaibhava 2026'
    }, [])

    const grouped = CATEGORIES.reduce((acc, cat) => {
        acc[cat] = eventsData.filter((e) => e.category === cat)
        return acc
    }, {})

    const visibleCategories = activeCategory === 'All'
        ? CATEGORIES
        : CATEGORIES.filter((c) => c === activeCategory)

    function scrollToCategory(cat) {
        setActiveCategory(cat)
        if (cat === 'All') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        setTimeout(() => {
            const el = sectionRefs.current[cat]
            if (el) {
                const offset = 72
                const top = el.getBoundingClientRect().top + window.scrollY - offset
                window.scrollTo({ top, behavior: 'smooth' })
            }
        }, 50)
    }

    return (
        <div className="events-page">

            {/* ── Hero Header ── */}
            <div className="ep-hero">
                <div className="ep-hero__orb ep-hero__orb--1" />
                <div className="ep-hero__orb ep-hero__orb--2" />
                <div className="container ep-hero__inner">
                    <span className="ep-hero__eyebrow">🎯 The Lineup</span>
                    <h1 className="ep-hero__title">This Year's <span className="gradient-text">Events</span></h1>
                    <p className="ep-hero__sub">{eventsData.length} events across {CATEGORIES.length} categories</p>

                    {/* Stat cards */}
                    <div className="ep-hero__stats">
                        {CATEGORIES.map((cat) => {
                            const m = CATEGORY_META[cat]
                            return (
                                <button
                                    key={cat}
                                    className="ep-stat-card"
                                    style={{ '--acc': m.accent, '--acc-rgb': m.accentRgb }}
                                    onClick={() => scrollToCategory(cat)}
                                >
                                    <span className="ep-stat-card__icon">{m.icon}</span>
                                    <div>
                                        <div className="ep-stat-card__name">{cat}</div>
                                        <div className="ep-stat-card__count">{grouped[cat]?.length || 0} events</div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* ── Sticky Tab Nav ── */}
            <nav className="ep-nav">
                <div className="container">
                    <div className="ep-nav__tabs">
                        {['All', ...CATEGORIES].map((cat) => {
                            const m = cat === 'All' ? null : CATEGORY_META[cat]
                            return (
                                <button
                                    key={cat}
                                    className={`ep-nav__tab ${activeCategory === cat ? 'is-active' : ''}`}
                                    style={m ? { '--tab-acc': m.accent } : {}}
                                    onClick={() => scrollToCategory(cat)}
                                >
                                    {m ? m.icon : '✨'} {cat}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </nav>

            {/* ── Category Sections ── */}
            <div className="ep-sections">
                {/* Floating particles */}
                <div className="ep-particles">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="ep-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 4}s`,
                                animationDuration: `${3 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
                {visibleCategories.map((cat) => {
                    const m = CATEGORY_META[cat]
                    const events = grouped[cat] || []

                    return (
                        <section
                            key={cat}
                            className="ep-section"
                            ref={(el) => (sectionRefs.current[cat] = el)}
                            id={`cat-${cat.toLowerCase().replace(/ /g, '-')}`}
                        >
                            {/* Section heading */}
                            <div className="container">
                                <div className="ep-section__head" style={{ '--acc': m.accent, '--acc-rgb': m.accentRgb }}>
                                    <div className="ep-section__head-left">
                                        <div className="ep-section__cat-icon">{m.icon}</div>
                                        <div>
                                            <h2 className="ep-section__title">{m.label}</h2>
                                            <p className="ep-section__tagline">{m.tagline}</p>
                                        </div>
                                    </div>
                                    <div className="ep-section__count">{events.length} Events</div>
                                </div>

                                {/* Cards grid */}
                                <div className="ep-grid">
                                    {events.map((event, i) => (
                                        <div
                                            key={event.id}
                                            className="reveal"
                                            style={{ transitionDelay: `${i * 0.06}s` }}
                                        >
                                            <EventCard event={event} accent={m.accent} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}
