import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import CountdownTimer from '../components/CountdownTimer'
import EventCard from '../components/EventCard'
import SponsorSection from '../components/SponsorSection'
import { useScrollReveal } from '../hooks/useScrollReveal'
import eventsData from '../data/events.json'
import './Home.css'

const CATEGORY_CARDS = [
    { name: 'Cultural', icon: '🎭', desc: 'Music, dance, drama & arts', count: 2 },
    { name: 'Technical', icon: '💻', desc: 'Coding, hackathons & robotics',  count: 3 },
    { name: 'Sports', icon: '⚽', desc: 'Cricket, athletics & team sports',  count: 1 },
    { name: 'Fun & Gaming', icon: '🎮', desc: 'Esports, gaming & fun events', count: 1 },
]

export default function Home() {
    useScrollReveal()

    const featuredEvents = eventsData.slice(0, 3)

    return (
        <div className="home">
            <HeroSection />
            <CountdownTimer />

            {/* About Section */}
            <section className="about section" id="about">
                <div className="container about__inner">
                    <div className="about__content reveal-left">
                        <p className="about__eyebrow">🌟 Who We Are</p>
                        <h2 className="section-title">
                            About <span className="gradient-text">Utsaha Vaibhava</span>
                        </h2>
                        <div className="divider" style={{ margin: '16px 0' }} />
                        <p className="about__text">
                            <strong>Utsaha Vaibhava</strong> is the flagship annual college fest — a vibrant celebration of creativity, talent, and the spirit of youth. Every year, students from across the region come together for two unforgettable days of music, technology, sports, and entertainment.
                        </p>
                        <p className="about__text">
                            From electrifying performances and intense coding marathons to epic cricket matches and esports showdowns — Utsaha Vaibhava is where passion meets celebration.
                        </p>
                        <div className="about__highlights">
                            {[
                                { icon: '🏆', text: '₹60K+ in prizes' },
                                { icon: '🎪', text: '7+ events across all domains' },
                                { icon: '🎓', text: 'Inter-college participation' },
                                { icon: '📅', text: '2 days, April 10 & 11' },
                            ].map((h) => (
                                <div key={h.text} className="about__highlight">
                                    <span>{h.icon}</span>
                                    <span>{h.text}</span>
                                </div>
                            ))}
                        </div>
                        <Link to="/events" className="btn btn-primary" style={{ marginTop: '16px' }}>
                            Browse All Events →
                        </Link>
                    </div>

                    <div className="about__visual reveal-right">
                        <div className="about__card-stack">
                            <div className="about__fest-card about__fest-card--back" />
                            <div className="about__fest-card">
                                <div className="about__fest-card-icon">🎉</div>
                                <div className="about__fest-card-title">Utsaha Vaibhava 2026</div>
                                <div className="about__fest-card-date">April 10 & 11</div>
                                <div className="about__fest-card-tags">
                                    <span className="tag">Cultural</span>
                                    <span className="tag">Technical</span>
                                    <span className="tag">Sports</span>
                                    <span className="tag">Gaming</span>
                                </div>
                                <div className="about__fest-card-stat">
                                    <div>
                                        <div className="about__card-statnum">7+</div>
                                        <div className="about__card-statlabel">Events</div>
                                    </div>
                                    <div>
                                        <div className="about__card-statnum">₹60K</div>
                                        <div className="about__card-statlabel">Prizes</div>
                                    </div>
                                    <div>
                                        <div className="about__card-statnum">2</div>
                                        <div className="about__card-statlabel">Days</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories section">
                <div className="container">
                    <div className="section-header reveal">
                        <p className="categories__eyebrow">🎪 What's In Store</p>
                        <h2 className="section-title">Event <span className="gradient-text">Categories</span></h2>
                        <div className="divider" />
                        <p className="section-subtitle">Four exciting categories, something for everyone!</p>
                    </div>

                    <div className="categories__grid ">
                        {CATEGORY_CARDS.map((cat, i) => (
                            <Link
                                key={cat.name}
                                to={`/events?cat=${encodeURIComponent(cat.name)}`}
                                className={`category-card reveal ${i % 2 === 0 ? '' : 'reveal-right'}`}
                                // style={{ '--cat-color': cat.color, '--cat-accent': cat.accent }}
                            >
                                <div className="category-card__icon">{cat.icon}</div>
                                <h3 className="category-card__name">{cat.name}</h3>
                                <p className="category-card__desc">{cat.desc}</p>
                                <div className="category-card__count">{cat.count} events →</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="featured-events section">
                <div className="container">
                    <div className="section-header reveal">
                        <p className="featured__eyebrow">⭐ Don't Miss</p>
                        <h2 className="section-title">Featured <span className="gradient-text">Events</span></h2>
                        <div className="divider" />
                        <p className="section-subtitle">Some of our most exciting events this year</p>
                    </div>

                    <div className="featured-events__grid">
                        {featuredEvents.map((event, i) => (
                            <div key={event.id} className={`reveal ${i === 1 ? '' : i === 0 ? 'reveal-left' : 'reveal-right'}`}>
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>

                    <div className="featured-events__more reveal">
                        <Link to="/events" className="btn btn-outline">
                            View All 7 Events →
                        </Link>
                    </div>
                </div>
            </section>

            <SponsorSection />
        </div>
    )
}
