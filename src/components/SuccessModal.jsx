import { useEffect } from 'react'
import './SuccessModal.css'

export default function SuccessModal({ eventTitle, name, whatsappLink, onClose }) {

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                {/* Confetti */}
                <div className="modal__confetti">
                    {['🎉', '🎊', '✨', '🏆', '🎈'].map((e, i) => (
                        <span key={i} className="confetti-piece" style={{ '--ci': i }}>{e}</span>
                    ))}
                </div>

                <div className="modal__icon">✅</div>
                <h2 className="modal__title">You're Registered!</h2>

                <p className="modal__subtitle">
                    Hey <strong>{name}</strong>! Your registration for
                </p>

                <div className="modal__event-badge">🎪 {eventTitle}</div>

                <p className="modal__message">
                    has been recorded successfully.
                </p>

                {/* 🔥 Show only if link exists */}
                {whatsappLink && (
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp modal__whatsapp-btn"
                    >
                        💬 Join WhatsApp Group
                    </a>
                )}

                <div className="modal__tips">
                    <div className="modal__tip">📅 Save the dates: April 10 & 11, 2026</div>
                    <div className="modal__tip">📞 Contact your event coordinator for queries</div>
                </div>

                <button className="btn btn-primary modal__close-btn" onClick={onClose}>
                    🎊 Awesome, Let's Go!
                </button>
            </div>
        </div>
    )
}