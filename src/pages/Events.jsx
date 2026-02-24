import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import CategoryFilter from '../components/CategoryFilter'
import { useScrollReveal } from '../hooks/useScrollReveal'
import eventsData from '../data/events.json'
import './Events.css'

export default function Events() {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialCat = searchParams.get('cat') || 'All'
    const [activeCategory, setActiveCategory] = useState(initialCat)

    useScrollReveal()

    useEffect(() => {
        document.title = 'Events – Utsaha Vaibhava 2026'
    }, [])

    const filtered = activeCategory === 'All'
        ? eventsData
        : eventsData.filter((e) => e.category === activeCategory)

    function handleSelect(cat) {
        setActiveCategory(cat)
        setSearchParams(cat === 'All' ? {} : { cat })
    }

    return (
        <div className="events-page">
            {/* Page Header */}
            <div className="events-page__header">
                <div className="events-page__header-blob" />
                <div className="container events-page__header-inner">
                    <span className="events-page__eyebrow">🎪 April 10 & 11, 2026</span>
                    <h1 className="events-page__title">
                        All <span className="gradient-text">Events</span>
                    </h1>
                    <p className="events-page__subtitle">
                        {eventsData.length} events across 4 categories — find your perfect match and register today!
                    </p>
                </div>
            </div>

            {/* Events Body */}
            <section className="events-page__body section">
                <div className="container">
                    <CategoryFilter active={activeCategory} onSelect={handleSelect} />

                    {filtered.length === 0 ? (
                        <div className="events-page__empty">
                            <span style={{ fontSize: '3rem' }}>😕</span>
                            <p>No events found for this category.</p>
                        </div>
                    ) : (
                        <>
                            <p className="events-page__count">
                                Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'event' : 'events'}
                                {activeCategory !== 'All' && ` in ${activeCategory}`}
                            </p>
                            <div className="events-page__grid">
                                {filtered.map((event, i) => (
                                    <div
                                        key={event.id}
                                        className="reveal"
                                        style={{ transitionDelay: `${i * 0.07}s` }}
                                    >
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}
