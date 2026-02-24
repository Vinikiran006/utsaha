import './SponsorSection.css'

const SPONSORS = [
    { name: 'TechCorp', tier: 'Gold', emoji: '💻' },
    { name: 'InnovateLabs', tier: 'Gold', emoji: '🔬' },
    { name: 'StartupHub', tier: 'Silver', emoji: '🚀' },
    { name: 'CloudBase', tier: 'Silver', emoji: '☁️' },
    { name: 'MediaPlus', tier: 'Bronze', emoji: '📺' },
    { name: 'FinEdge', tier: 'Bronze', emoji: '💰' },
]

export default function SponsorSection() {
    const gold = SPONSORS.filter((s) => s.tier === 'Gold')
    const silver = SPONSORS.filter((s) => s.tier === 'Silver')
    const bronze = SPONSORS.filter((s) => s.tier === 'Bronze')

    return (
        <section className="sponsors section" id="sponsors">
            <div className="container">
                <div className="section-header reveal">
                    <p className="sponsors__eyebrow">🤝 Our Partners</p>
                    <h2 className="section-title">
                        Our <span className="gradient-text">Sponsors</span>
                    </h2>
                    <div className="divider" />
                    <p className="section-subtitle">
                        Proud partners who make Utsaha Vaibhava possible
                    </p>
                </div>

                <div className="sponsors__tier reveal">
                    <div className="sponsors__tier-label sponsors__tier-label--gold">🥇 Gold Sponsors</div>
                    <div className="sponsors__logos sponsors__logos--gold">
                        {gold.map((s) => (
                            <div key={s.name} className="sponsor-card sponsor-card--gold">
                                <span className="sponsor-card__icon">{s.emoji}</span>
                                <span className="sponsor-card__name">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sponsors__tier reveal">
                    <div className="sponsors__tier-label sponsors__tier-label--silver">🥈 Silver Sponsors</div>
                    <div className="sponsors__logos">
                        {silver.map((s) => (
                            <div key={s.name} className="sponsor-card sponsor-card--silver">
                                <span className="sponsor-card__icon">{s.emoji}</span>
                                <span className="sponsor-card__name">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sponsors__tier reveal">
                    <div className="sponsors__tier-label sponsors__tier-label--bronze">🥉 Bronze Sponsors</div>
                    <div className="sponsors__logos">
                        {bronze.map((s) => (
                            <div key={s.name} className="sponsor-card sponsor-card--bronze">
                                <span className="sponsor-card__icon">{s.emoji}</span>
                                <span className="sponsor-card__name">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sponsors__cta reveal">
                    <p>Interested in sponsoring Utsaha Vaibhava 2026?</p>
                    <a href="mailto:sponsors@utsahavaibhava.in" className="btn btn-outline">
                        📧 Become a Sponsor
                    </a>
                </div>
            </div>
        </section>
    )
}
