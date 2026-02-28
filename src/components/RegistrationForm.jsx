import { useState } from 'react'
import SuccessModal from './SuccessModal'
import './RegistrationForm.css'
import QRCode from "react-qr-code";

// ── Google Apps Script URL ──────────────────────────────────
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwnb-MU4DAvOhYaMlBR6TRtXA94DUONnDccSdxFkMStDfobRqovb_Y0YhUeYBnO33CD-w/exec'

// ── UPI ID (CHANGE THIS) ────────────────────────────────────
const UPI_ID = "utsaha@indianbk"

const YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year'
]

// ── Submit to Google Sheets ─────────────────────────────────
async function submitToGoogleSheet(eventId, eventTitle, formData) {
  const payload = {
    eventId,
    eventTitle,
    timestamp: new Date().toISOString(),
    ...formData,
  }

  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  return { status: 'success' }
}

// ════════════════════════════════════════════════════════════
// Component
// ════════════════════════════════════════════════════════════
export default function RegistrationForm({ event }) {

  const hasCustomFields =
    event.registrationFields && event.registrationFields.length > 0

  // ── UPI QR Logic ──────────────────────────────────────────
  const amount = event.registrationFee
    ? event.registrationFee.replace(/[^0-9]/g, "")
    : "0"

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Utsaha Vaibhava&am=${amount}&cu=INR&tn=${event.title}`

  // ── Initial State ─────────────────────────────────────────
  const buildInitialState = () => {
    if (hasCustomFields) {
      const init = {}
      event.registrationFields.forEach((f) => (init[f.name] = ''))
      init.utrNumber = ''
      return init
    }

    return {
      fullName: '',
      collegeName: '',
      email: '',
      phone: '',
      yearBranch: '',
      year: YEARS[0],
      teamName: '',
      teamMembers: '',
      utrNumber: '',
    }
  }

  const [form, setForm] = useState(buildInitialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // ── Validation ────────────────────────────────────────────
  function validate() {
    const e = {}

    if (hasCustomFields) {
      event.registrationFields.forEach((field) => {
        if (field.required && !form[field.name]?.trim()) {
          e[field.name] = `${field.label.replace(' *', '')} is required`
        }
        if (
          field.type === 'email' &&
          form[field.name] &&
          !/\S+@\S+\.\S+/.test(form[field.name])
        ) {
          e[field.name] = 'Enter a valid email address'
        }
        if (
          field.type === 'tel' &&
          form[field.name] &&
          !/^\d{10}$/.test(form[field.name])
        ) {
          e[field.name] = 'Enter a valid 10-digit phone number'
        }
      })
    } else {
      if (!form.fullName.trim())
        e.fullName = 'Full name is required'
      if (!form.collegeName.trim())
        e.collegeName = 'College name is required'
      if (!/\S+@\S+\.\S+/.test(form.email))
        e.email = 'Valid email required'
      if (!/^\d{10}$/.test(form.phone))
        e.phone = 'Valid 10-digit phone required'
    }

    // UTR validation only for paid events
    if (event.registrationFee) {
      if (!form.utrNumber || !/^\d{12}$/.test(form.utrNumber.trim())) {
        e.utrNumber = 'Valid 12-digit UTR number required'
      }
    }

    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    setSubmitError('')

    try {
      await submitToGoogleSheet(event.id, event.title, form)
      setSubmitted(true)
    } catch (err) {
      setSubmitError('Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render Custom Fields ─────────────────────────────────
  function renderCustomFields() {
    return event.registrationFields.map((field) => (
      <div
        key={field.name}
        className={`reg-form__field ${
          errors[field.name] ? 'reg-form__field--error' : ''
        }`}
      >
        <label className="reg-form__label">
          {field.label} {field.required && '*'}
        </label>

        <input
          className="reg-form__input"
          type={field.type || 'text'}
          name={field.name}
          placeholder={field.placeholder || ''}
          value={form[field.name] || ''}
          onChange={handleChange}
        />

        {errors[field.name] && (
          <span className="reg-form__error">
            {errors[field.name]}
          </span>
        )}
      </div>
    ))
  }

  // ── Render Legacy Fields ─────────────────────────────────
  function renderLegacyFields() {
    return (
      <>
        <input
          className="reg-form__input"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          className="reg-form__input"
          name="collegeName"
          placeholder="College Name"
          value={form.collegeName}
          onChange={handleChange}
        />

        <input
          className="reg-form__input"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="reg-form__input"
          name="phone"
          maxLength={10}
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
      </>
    )
  }

  // ── JSX ──────────────────────────────────────────────────
  return (
    <>
      <div className="reg-layout">

        {/* LEFT FORM */}
        <form className="reg-form" onSubmit={handleSubmit} noValidate>

          <div className="reg-form__grid">
            {hasCustomFields
              ? renderCustomFields()
              : renderLegacyFields()}

            {/* UTR Field (Only if Paid Event) */}
            {event.registrationFee && (
              <div className="reg-form__field reg-form__field--full">
                <label className="reg-form__label">
                  Transaction ID (UTR) *
                </label>

                <input
                  className="reg-form__input"
                  type="text"
                  name="utrNumber"
                  maxLength={12}
                  placeholder="Enter 12-digit UTR Number"
                  value={form.utrNumber}
                  onChange={handleChange}
                />

                {errors.utrNumber && (
                  <span className="reg-form__error">
                    {errors.utrNumber}
                  </span>
                )}
              </div>
            )}
          </div>

          {submitError && (
            <div className="reg-form__error-banner">
              ⚠️ {submitError}
            </div>
          )}

          <div className="reg-form__event-info">
            <span>
              📌 Registering for: <strong>{event.title}</strong>
            </span>

            {event.registrationFee && (
              <span>
                💰 Fee: <strong>{event.registrationFee}</strong>
              </span>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary reg-form__submit"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : '✅ Submit Registration'}
          </button>

          <p className="reg-form__note">
            * Your registration will be securely submitted to the event coordinators.
          </p>
        </form>

        {/* RIGHT QR PANEL */}
        {event.registrationFee && (
          <div className="reg-payment">
            <h3>Scan to Pay</h3>

            <div className="qr-box">
              <QRCode value={upiLink} size={180} />
            </div>

            <p>Amount: ₹{amount}</p>
            <p>UPI ID: <strong>{UPI_ID}</strong></p>

            <a href={upiLink} className="pay-button">
              Pay via UPI App
            </a>
          </div>
        )}
      </div>

      {submitted && (
        <SuccessModal
          eventTitle={event.title}
          name={
            hasCustomFields
              ? Object.values(form)[0]
              : form.fullName
          }
          onClose={() => setSubmitted(false)}
        />
      )}
    </>
  )
}