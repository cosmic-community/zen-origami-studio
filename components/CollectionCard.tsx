import { Collection } from '@/types'
import Link from 'next/link'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const imageUrl = collection.metadata?.collection_image?.imgix_url
  const themeDescription = collection.metadata?.theme_description
  const seasonOccasion = collection.metadata?.season_occasion
  const inspirationalQuote = collection.metadata?.inspirational_quote

  return (
    <Link href={`/collections/${collection.slug}`}>
      <div className="zen-card group hover:scale-105 hover:shadow-sakura transition-all duration-300 cursor-pointer">
        {imageUrl && (
          <div className="relative overflow-hidden rounded-xl mb-6">
            <img
              src={`${imageUrl}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={collection.title || 'Origami Collection'}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 filter-paper"
              width={400}
              height={250}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {seasonOccasion && (
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium zen-text-primary border border-white/30">
                  {seasonOccasion}
                </span>
              </div>
            )}

            {/* Collection indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-sakura-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-lg">🌸</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="zen-heading text-2xl zen-text-primary group-hover:text-zen-600 transition-colors">
            {collection.title || 'Seasonal Collection'}
          </h3>
          
          {themeDescription && (
            <p className="zen-text-secondary leading-relaxed">
              {themeDescription}
            </p>
          )}
          
          {inspirationalQuote && (
            <div className="bg-gradient-to-r from-zen-50 to-sage-50 rounded-xl p-4 border-l-4 border-zen-300">
              <p className="font-calligraphy text-zen-700 italic text-lg leading-relaxed">
                "{inspirationalQuote}"
              </p>
            </div>
          )}
          
          <div className="pt-2">
            <div className="zen-button-secondary w-full text-center py-3 group-hover:bg-sage-100 group-hover:border-sage-300 transition-colors">
              Explore This Journey
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}