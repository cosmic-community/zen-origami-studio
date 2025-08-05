import { OrigamiTutorial } from '@/types'

interface FeaturedTutorialCardProps {
  tutorial: OrigamiTutorial
}

export default function FeaturedTutorialCard({ tutorial }: FeaturedTutorialCardProps) {
  const imageUrl = tutorial.metadata?.final_result_image?.imgix_url
  const difficulty = tutorial.metadata?.difficulty_level?.value
  const estimatedTime = tutorial.metadata?.estimated_time
  const meditativeMessage = tutorial.metadata?.meditative_message

  return (
    <div className="zen-card hover:scale-105 transition-transform duration-300 cursor-pointer group">
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl mb-6">
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={tutorial.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 filter-paper"
            width={400}
            height={300}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="zen-heading text-2xl zen-text-primary">
            {tutorial.title}
          </h3>
          {difficulty && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              difficulty === 'Beginner' 
                ? 'bg-zen-100 text-zen-700' 
                : difficulty === 'Intermediate'
                ? 'bg-sage-100 text-sage-700'
                : 'bg-sakura-100 text-sakura-700'
            }`}>
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
            {estimatedTime}
          </div>
        )}
        
        {meditativeMessage && (
          <div className="border-l-4 border-zen-300 pl-4 py-2">
            <p className="font-calligraphy text-zen-600 italic">
              {meditativeMessage}
            </p>
          </div>
        )}
        
        <button className="w-full zen-button mt-6">
          Begin This Journey
        </button>
      </div>
    </div>
  )
}