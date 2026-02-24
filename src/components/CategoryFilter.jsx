import './CategoryFilter.css'

const CATEGORIES = ['All', 'Cultural', 'Technical', 'Sports', 'Fun & Gaming']

const CATEGORY_ICONS = {
    'All': '✨',
    'Cultural': '🎭',
    'Technical': '💻',
    'Sports': '⚽',
    'Fun & Gaming': '🎮',
}

export default function CategoryFilter({ active, onSelect }) {
    return (
        <div className="cat-filter">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat}
                    className={`cat-filter__btn ${active === cat ? 'cat-filter__btn--active' : ''}`}
                    onClick={() => onSelect(cat)}
                >
                    <span>{CATEGORY_ICONS[cat]}</span>
                    {cat}
                </button>
            ))}
        </div>
    )
}
