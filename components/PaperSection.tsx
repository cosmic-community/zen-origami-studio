import { getPaperTypes } from '@/lib/cosmic'
import PaperTypeCard from '@/components/PaperTypeCard'

export default async function PaperSection() {
  const paperTypes = await getPaperTypes()

  if (!paperTypes || paperTypes.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h2 className="zen-heading text-4xl md:text-5xl mb-8 zen-text-primary">
          Traditional Papers
        </h2>
        <p className="zen-text-secondary text-lg">
          No paper types available at the moment. Please check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 meditation-fade">
        <h2 className="zen-heading text-4xl md:text-5xl mb-6 zen-text-primary">
          Traditional Papers
        </h2>
        <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          The choice of paper is as important as the folding technique. 
          Discover the traditional papers that have been used for centuries in the art of origami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {paperTypes.map((paperType, index) => (
          <div
            key={paperType.id}
            className="gentle-slide"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <PaperTypeCard paperType={paperType} />
          </div>
        ))}
      </div>
    </div>
  )
}