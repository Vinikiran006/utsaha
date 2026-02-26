import './CategoryFilter.css'

const CATEGORIES = ['All', 'Main Stage', 'Cultural', 'Technical', 'Literary']

const CATEGORY_ICONS = {
    All: '✨',
    'Main Stage': '🎤',
    Cultural: '🎭',
    Technical: '💻',
    Literary: '📖',
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
