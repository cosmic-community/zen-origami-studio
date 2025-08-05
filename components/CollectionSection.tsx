import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'

export default async function CollectionSection() {
  const collections = await getCollections()

  if (!collections || collections.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center">
        <h2 className="zen-heading text-4xl md:text-5xl mb-8 zen-text-primary">
          Seasonal Collections
        </h2>
        <p className="zen-text-secondary text-lg">
          No collections available at the moment. Please check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16 meditation-fade">
        <h2 className="zen-heading text-4xl md:text-5xl mb-6 zen-text-primary">
          Seasonal Collections
        </h2>
        <p className="zen-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Discover curated origami projects that celebrate the changing seasons 
          and special occasions. Each collection tells a story through paper.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className="gentle-slide"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>
    </div>
  )
}