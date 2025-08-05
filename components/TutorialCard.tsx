import { OrigarniTutorial } from '@/types'
import { Clock, Star } from 'lucide-react'

interface TutorialCardProps {
  tutorial: OrigarniTutorial
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  const imageUrl = tutorial.metadata?.final_result_image?.imgix_url
  const difficulty = tutorial.metadata?.difficulty_level?.value
  const estimatedTime = tutorial.metadata?.estimated_time
  const meditativeMessage = tutorial.metadata?.meditative_message
  const paperType = tutorial.metadata?.paper_type
  const collection = tutorial.metadata?.collection

  const getDifficultyColor = (level?: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-zen-100 text-zen-700'
      case 'Intermediate':
        return 'bg-sage-100 text-sage-700'
      case 'Advanced':
        return 'bg-sakura-100 text-sakura-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="zen-card group hover:scale-105 hover:shadow-zen transition-all duration-300 cursor-pointer">
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={`${imageUrl}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={tutorial.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 filter-paper"
            width={300}
            height={200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {difficulty && (
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-3">
        <h3 className="zen-heading text-xl zen-text-primary group-hover:text-zen-600 transition-colors">
          {tutorial.title}
        </h3>
        
        {tutorial.metadata?.description && (
          <p className="zen-text-secondary text-sm leading-relaxed line-clamp-3">
            {tutorial.metadata.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs zen-text-secondary">
          {estimatedTime && (
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {estimatedTime}
            </div>
          )}
          
          {paperType && (
            <div className="flex items-center">
              <span className="mr-1">📜</span>
              {typeof paperType === 'object' && paperType.title ? paperType.title : 'Paper Type'}
            </div>
          )}
        </div>
        
        {collection && typeof collection === 'object' && collection.title && (
          <div className="text-xs zen-text-secondary">
            <span className="mr-1">🌸</span>
            {collection.title}
          </div>
        )}
        
        {meditativeMessage && (
          <div className="border-l-3 border-zen-300 pl-3 py-2 bg-zen-50/30 rounded-r">
            <p className="font-calligraphy text-zen-600 italic text-sm">
              {meditativeMessage}
            </p>
          </div>
        )}
        
        <button className="w-full zen-button text-sm py-2 mt-4 group-hover:bg-zen-600 transition-colors">
          Begin Tutorial
        </button>
      </div>
    </div>
  )
}