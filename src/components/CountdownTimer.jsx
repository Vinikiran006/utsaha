import { useState, useEffect } from 'react'
import './CountdownTimer.css'

// Fest date: April 10, 2026
const FEST_DATE = new Date('2026-04-10T09:00:00')

function getTimeLeft() {
    const now = new Date()
    const diff = FEST_DATE - now

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
    }
}

function Digit({ value, label }) {
    return (
        <div className="countdown__digit">
            <div className="countdown__number">
                {String(value).padStart(2, '0')}
            </div>
            <div className="countdown__label">{label}</div>
        </div>
    )
}

export default function CountdownTimer() {
    const [time, setTime] = useState(getTimeLeft)

    useEffect(() => {
        // Update every minute instead of every second
        const interval = setInterval(() => {
            setTime(getTimeLeft())
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="countdown section" id="countdown">
            <div className="container countdown__inner">
                <div className="section-header reveal">
                    <p className="countdown__eyebrow">
                        ⏳ Get Ready For The Big Day
                    </p>
                    <h2 className="section-title">
                        Countdown To <span className="gradient-text">Utsaha Vaibhava</span>
                    </h2>
                    <div className="divider" style={{ margin: '16px auto 0' }} />
                </div>

                <div className="countdown__track reveal">
                    <Digit value={time.days} label="Days" />
                    <div className="countdown__sep">:</div>

                    <Digit value={time.hours} label="Hours" />
                    <div className="countdown__sep">:</div>

                    <Digit value={time.minutes} label="Minutes" />
                </div>

                <p className="countdown__date-note reveal">
                    📅 April 10 & 11, 2026 &nbsp;|&nbsp; 🏫 BMS Institute of Technology and Management
                </p>
            </div>
        </section>
    )
}