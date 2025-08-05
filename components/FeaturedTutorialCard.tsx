import { OrigamiTutorial } from '@/types'
import Link from 'next/link'

interface FeaturedTutorialCardProps {
  tutorial: OrigamiTutorial
}

export default function FeaturedTutorialCard({ tutorial }: FeaturedTutorialCardProps) {
  const imageUrl = tutorial.metadata?.final_result_image?.imgix_url
  const difficulty = tutorial.metadata?.difficulty_level?.value
  const estimatedTime = tutorial.metadata?.estimated_time
  const meditativeMessage = tutorial.metadata?.meditative_message

  const getDifficultyColor = (level?: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-zen-100 text-zen-700 border-zen-200'
      case 'Intermediate':
        return 'bg-sage-100 text-sage-700 border-sage-200'
      case 'Advanced':
        return 'bg-sakura-100 text-sakura-700 border-sakura-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <Link href={`/tutorials/${tutorial.slug}`}>
      <div className="zen-card hover:scale-105 transition-transform duration-300 cursor-pointer group">
        {imageUrl && (
          <div className="relative overflow-hidden rounded-xl mb-6">
            <img
              src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={tutorial.title || 'Featured Tutorial'}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 filter-paper"
              width={400}
              height={300}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-zen-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <span>✨</span>
                <span>Featured</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="zen-heading text-2xl zen-text-primary flex-1">
              {tutorial.title || 'Featured Tutorial'}
            </h3>
            {difficulty && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            )}
          </div>
          
          {tutorial.metadata?.description && (
            <p className="zen-text-secondary leading-relaxed">
              {tutorial.metadata.description}
            </p>
          )}
          
          {estimatedTime && (
            <div className="flex items-center text-sm zen-text-secondary">
              <span className="mr-2">⏱</span>
              <span>{estimatedTime}</span>
            </div>
          )}
          
          {meditativeMessage && (
            <div className="bg-gradient-to-r from-zen-50 to-sage-50 rounded-xl p-4 border-l-4 border-zen-300">
              <p className="font-calligraphy text-zen-700 italic text-lg leading-relaxed">
                "{meditativeMessage}"
              </p>
            </div>
          )}
          
          <div className="pt-2">
            <div className="zen-button w-full text-center py-3 group-hover:bg-zen-600 transition-colors">
              Begin This Sacred Practice
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}