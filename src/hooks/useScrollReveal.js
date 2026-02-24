import { useEffect } from 'react'

export function useScrollReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        )

        // Delay slightly so DOM is fully painted after route transitions
        const timer = setTimeout(() => {
            const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            els.forEach((el) => observer.observe(el))
        }, 60)

        return () => {
            clearTimeout(timer)
            observer.disconnect()
        }
    }, [])
}
