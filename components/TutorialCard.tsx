import { OrigamiTutorial } from '@/types'
import { Clock, Star } from 'lucide-react'
import Link from 'next/link'

interface TutorialCardProps {
  tutorial: OrigamiTutorial
  onClick?: () => void
}

export default function TutorialCard({ tutorial, onClick }: TutorialCardProps) {
  const imageUrl = tutorial.metadata?.final_result_image?.imgix_url
  const difficulty = tutorial.metadata?.difficulty_level?.value
  const estimatedTime = tutorial.metadata?.estimated_time
  const meditativeMessage = tutorial.metadata?.meditative_message
  const paperType = tutorial.metadata?.paper_type
  const collection = tutorial.metadata?.collection

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

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const CardContent = () => (
    <div className="zen-card group hover:scale-105 hover:shadow-zen transition-all duration-300 cursor-pointer h-full" onClick={handleClick}>
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={`${imageUrl}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={tutorial.title || 'Origami Tutorial'}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 filter-paper"
            width={300}
            height={200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {difficulty && (
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            </div>
          )}

          {/* Floating crane indicator for featured tutorials */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-zen-600">🕊️</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3 flex-1 flex flex-col">
        <h3 className="zen-heading text-xl zen-text-primary group-hover:text-zen-600 transition-colors">
          {tutorial.title || 'Untitled Tutorial'}
        </h3>
        
        {tutorial.metadata?.description && (
          <p className="zen-text-secondary text-sm leading-relaxed line-clamp-3 flex-1">
            {tutorial.metadata.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs zen-text-secondary pt-2">
          {estimatedTime && (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{estimatedTime}</span>
            </div>
          )}
          
          {paperType && (
            <div className="flex items-center gap-1">
              <span>📜</span>
              <span>{typeof paperType === 'object' && paperType.title ? paperType.title : 'Traditional Paper'}</span>
            </div>
          )}
        </div>
        
        {collection && typeof collection === 'object' && collection.title && (
          <div className="text-xs zen-text-secondary bg-zen-50 rounded-lg px-2 py-1">
            <span className="mr-1">🌸</span>
            <span>{collection.title}</span>
          </div>
        )}
        
        {meditativeMessage && (
          <div className="border-l-3 border-zen-300 pl-3 py-2 bg-zen-50/50 rounded-r mt-auto">
            <p className="font-calligraphy text-zen-600 italic text-sm leading-relaxed">
              "{meditativeMessage}"
            </p>
          </div>
        )}
        
        <div className="pt-3 mt-auto">
          <div className="zen-button-secondary w-full text-center py-2 text-sm group-hover:bg-zen-100 group-hover:border-zen-300 transition-colors">
            Begin Your Journey
          </div>
        </div>
      </div>
    </div>
  )

  if (onClick) {
    return <CardContent />
  }

  return (
    <Link href={`/tutorials/${tutorial.slug}`}>
      <CardContent />
    </Link>
  )
}