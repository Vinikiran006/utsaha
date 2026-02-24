import { useState } from 'react'
import SuccessModal from './SuccessModal'
import './RegistrationForm.css'

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'PG – 1st Year', 'PG – 2nd Year']

function saveToLocalStorage(eventId, eventTitle, data) {
    const key = 'uv_registrations'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push({
        ...data,
        eventId,
        eventTitle,
        registeredAt: new Date().toISOString(),
    })
    localStorage.setItem(key, JSON.stringify(existing))
}

export default function RegistrationForm({ event }) {
    const [form, setForm] = useState({
        fullName: '',
        collegeName: '',
        email: '',
        phone: '',
        yearBranch: '',
        year: YEARS[0],
        teamName: '',
        teamMembers: '',
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    function validate() {
        const e = {}
        if (!form.fullName.trim()) e.fullName = 'Full name is required'
        if (!form.collegeName.trim()) e.collegeName = 'College name is required'
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
        if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim())) e.phone = 'Valid 10-digit phone number required'
        if (!form.yearBranch.trim()) e.yearBranch = 'Year & Branch is required'
        return e
    }

    function handleChange(e) {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
        if (errors[name]) setErrors((err) => ({ ...err, [name]: '' }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length > 0) {
            setErrors(errs)
            return
        }
        saveToLocalStorage(event.id, event.title, { ...form })
        setSubmitted(true)
    }

    return (
        <>
            <form className="reg-form" onSubmit={handleSubmit} noValidate>
                <div className="reg-form__grid">
                    {/* Full Name */}
                    <div className={`reg-form__field ${errors.fullName ? 'reg-form__field--error' : ''}`}>
                        <label className="reg-form__label">Full Name *</label>
                        <input
                            className="reg-form__input"
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={form.fullName}
                            onChange={handleChange}
                        />
                        {errors.fullName && <span className="reg-form__error">{errors.fullName}</span>}
                    </div>

                    {/* College Name */}
                    <div className={`reg-form__field ${errors.collegeName ? 'reg-form__field--error' : ''}`}>
                        <label className="reg-form__label">College Name *</label>
                        <input
                            className="reg-form__input"
                            type="text"
                            name="collegeName"
                            placeholder="Your college / institution"
                            value={form.collegeName}
                            onChange={handleChange}
                        />
                        {errors.collegeName && <span className="reg-form__error">{errors.collegeName}</span>}
                    </div>

                    {/* Email */}
                    <div className={`reg-form__field ${errors.email ? 'reg-form__field--error' : ''}`}>
                        <label className="reg-form__label">Email Address *</label>
                        <input
                            className="reg-form__input"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="reg-form__error">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className={`reg-form__field ${errors.phone ? 'reg-form__field--error' : ''}`}>
                        <label className="reg-form__label">Phone Number *</label>
                        <input
                            className="reg-form__input"
                            type="tel"
                            name="phone"
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            value={form.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <span className="reg-form__error">{errors.phone}</span>}
                    </div>

                    {/* Year / Branch */}
                    <div className={`reg-form__field ${errors.yearBranch ? 'reg-form__field--error' : ''}`}>
                        <label className="reg-form__label">Year / Branch *</label>
                        <input
                            className="reg-form__input"
                            type="text"
                            name="yearBranch"
                            placeholder="e.g., 3rd Year – Computer Science"
                            value={form.yearBranch}
                            onChange={handleChange}
                        />
                        {errors.yearBranch && <span className="reg-form__error">{errors.yearBranch}</span>}
                    </div>

                    {/* Year Select */}
                    <div className="reg-form__field">
                        <label className="reg-form__label">Academic Year</label>
                        <select className="reg-form__input" name="year" value={form.year} onChange={handleChange}>
                            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    {/* Team Name */}
                    <div className="reg-form__field">
                        <label className="reg-form__label">Team Name <span className="reg-form__optional">(optional)</span></label>
                        <input
                            className="reg-form__input"
                            type="text"
                            name="teamName"
                            placeholder="Your team name (if applicable)"
                            value={form.teamName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Team Members */}
                    <div className="reg-form__field reg-form__field--full">
                        <label className="reg-form__label">
                            Team Members <span className="reg-form__optional">(optional)</span>
                        </label>
                        <textarea
                            className="reg-form__input reg-form__textarea"
                            name="teamMembers"
                            placeholder="Enter names of other team members (one per line)"
                            value={form.teamMembers}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="reg-form__event-info">
                    <span>📌 Registering for: <strong>{event.title}</strong></span>
                    {event.registrationFee && <span>💰 Fee: <strong>{event.registrationFee}</strong></span>}
                </div>

                <button type="submit" className="btn btn-primary reg-form__submit">
                    ✅ Submit Registration
                </button>

                <p className="reg-form__note">
                    * Your registration data is securely saved locally. Backend integration coming soon.
                </p>
            </form>

            {submitted && (
                <SuccessModal
                    eventTitle={event.title}
                    name={form.fullName}
                    onClose={() => setSubmitted(false)}
                />
            )}
        </>
    )
}
