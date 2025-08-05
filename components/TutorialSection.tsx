import { getTutorials } from '@/lib/cosmic'
import TutorialCard from '@/components/TutorialCard'
import { OrigamiTutorial } from '@/types'

export default async function TutorialSection() {
  const tutorials = await getTutorials()

  if (!tutorials || tutorials.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h2 className="zen-heading text-4xl md:text-5xl mb-8 zen-text-primary">
          Origami Tutorials
        </h2>
        <p className="zen-text-secondary text-lg">
          No tutorials available at the moment. Please check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 meditation-fade">
        <h2 className="zen-heading text-4xl md:text-5xl mb-6 zen-text-primary">
          Peaceful Tutorials
        </h2>
        <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Step into a world of mindful creation. Each tutorial is designed to guide you 
          through the meditative process of origami, one fold at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial: OrigamiTutorial, index: number) => (
          <div
            key={tutorial.id}
            className="gentle-slide"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TutorialCard tutorial={tutorial} />
          </div>
        ))}
      </div>
    </div>
  )
}