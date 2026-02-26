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
    { name: 'Main Stage', icon: '🎤', desc: 'Grand performances, fashion & DJ nights' },
    { name: 'Cultural', icon: '🎭', desc: 'Dance, music & artistic expression' },
    { name: 'Technical', icon: '💻', desc: 'Esports, coding & speed challenges' },
    { name: 'Literary', icon: '📖', desc: 'Debates, writing, quizzes & roleplay' },
]

export default function Home() {
    useScrollReveal()

    const featuredEvents = eventsData.slice(0, 3)
    const totalEvents = eventsData.length

    return (
        <div className="home">
            <HeroSection />
            <CountdownTimer />

            {/* About Section */}
            <section className="about section" id="about">
                <div className="container about__inner">
                    <div className="about__content reveal-left">
                        <p className="about__eyebrow">🌟 The Story</p>
                        <h2 className="section-title">
                            THE FEST THAT <span className="gradient-text">HITS DIFFERENT</span>
                        </h2>
                        <div className="divider" style={{ margin: '16px 0' }} />
                        <p className="about__text">
                            <strong>Utsaha Vaibhava</strong> is the flagship annual celebration of BMS Institute of Technology and Management — where creativity, engineering, sports, and music collide in one electrifying two-day experience.
                        </p>
                        <p className="about__text">
                            From electrifying Battle of Bands to 24-hour hackathons, from cricket blitz to esports showdowns — this is where passion meets competition and memories are made for life.
                        </p>
                        <div className="about__highlights">
                            {[
                                { icon: '🏆', text: '₹4L+ in total prizes' },
                                { icon: '🎪', text: '30+ events all domains' },
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
                                    <span className="tag">Main Stage</span>
                                    <span className="tag">Cultural</span>
                                    <span className="tag">Technical</span>
                                    <span className="tag">Sports</span>
                                    <span className="tag">Gaming</span>
                                </div>
                                <div className="about__fest-card-stat">
                                    <div>
                                        <div className="about__card-statnum">30+</div>
                                        <div className="about__card-statlabel">Events</div>
                                    </div>
                                    <div>
                                        <div className="about__card-statnum">₹4L+</div>
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
                        <h2 className="section-title">EVENT <span className="gradient-text">CATEGORIES</span></h2>
                        <div className="divider" />
                        <p className="section-subtitle">Four exciting categories, something for everyone!</p>
                    </div>

                    <div className="categories__grid ">
                        {CATEGORY_CARDS.map((cat, i) => {
                            const count = eventsData.filter(e => e.category === cat.name).length
                            return (
                                <Link
                                    key={cat.name}
                                    to={`/events?cat=${encodeURIComponent(cat.name)}`}
                                    className={`category-card reveal ${i % 2 === 0 ? '' : 'reveal-right'}`}
                                >
                                    <div className="category-card__icon">{cat.icon}</div>
                                    <h3 className="category-card__name">{cat.name}</h3>
                                    <p className="category-card__desc">{cat.desc}</p>
                                    <div className="category-card__count">{count} events →</div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Events Section */}
            <section className="featured-events section">
                <div className="container">
                    <div className="section-header reveal">
                        <p className="featured__eyebrow">🎯 The Lineup</p>
                        <h2 className="section-title">THIS YEAR'S <span className="gradient-text">EVENTS</span></h2>
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
                            View All {totalEvents} Events →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section section">
                <div className="container cta-section__inner reveal">
                    <h2 className="cta-section__title">
                        ARE YOU <span className="gradient-text">READY?</span>
                    </h2>
                    <p className="cta-section__desc">
                        Utsaha Vaibhava 2026 is happening April 10 & 11. Don't miss the biggest college fest of the year. Register your team and claim your glory.
                    </p>
                    <Link to="/events" className="btn btn-primary cta-section__btn">
                        🏕️ Register Your Team
                    </Link>
                </div>
            </section>

            <SponsorSection />
        </div>
    )
}
