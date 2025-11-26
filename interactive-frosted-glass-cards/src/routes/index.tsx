import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Card } from '../components/Card'

export const Route = createFileRoute('/')({ component: App })

interface CardData {
  title: string
  imageUrl: string
}

const cards: CardData[] = [
  { title: 'Beeper', imageUrl: '/beeper.png' },
  { title: 'Discord', imageUrl: '/discord.png' },
  { title: 'Spotify', imageUrl: '/spotify.png' },
  { title: 'Photos', imageUrl: '/photos.png' },
  { title: 'GitHub', imageUrl: '/github-mark-white.png' },
  { title: 'Threads', imageUrl: '/threads.png' },
]

function App() {
  const [loaded, setLoaded] = useState(false)
  const cardElements = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // Defer initialization to ensure elements are ready and create the "fan out" effect
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      // Only run if cards are loaded (optional, but matches original logic)
      // Actually, original logic checked if initialized.

      cardElements.current.forEach((cardEl) => {
        if (!cardEl) return

        const rect = cardEl.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const relativeX = event.clientX - centerX
        const relativeY = event.clientY - centerY

        const x = relativeX / (rect.width / 2)
        const y = relativeY / (rect.height / 2)

        cardEl.style.setProperty('--pointer-x', x.toFixed(3))
        cardEl.style.setProperty('--pointer-y', y.toFixed(3))
      })
    }

    document.addEventListener('pointermove', onPointerMove)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Interactive Frosted Cards
        </h1>
        <p className="text-neutral-400 mt-2">
          Move your cursor over the cards to see the effect.
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <Card
            key={card.title}
            ref={(el) => (cardElements.current[i] = el)}
            title={card.title}
            imageUrl={card.imageUrl}
            isLoaded={loaded}
            cardIndex={i}
            totalCards={cards.length}
          />
        ))}
      </div>
    </main>
  )
}
