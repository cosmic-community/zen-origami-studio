import { PaperType } from '@/types'

interface PaperTypeCardProps {
  paperType: PaperType
}

export default function PaperTypeCard({ paperType }: PaperTypeCardProps) {
  const imageUrl = paperType.metadata?.paper_image?.imgix_url
  const description = paperType.metadata?.description
  const bestFor = paperType.metadata?.best_for
  const weightGsm = paperType.metadata?.weight_gsm

  return (
    <div className="zen-card group hover:scale-105 hover:shadow-sage transition-all duration-300">
      {imageUrl && (
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={`${imageUrl}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={paperType.title || 'Paper Type'}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 filter-paper"
            width={300}
            height={200}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {weightGsm && (
            <div className="absolute top-3 right-3">
              <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium zen-text-primary">
                {weightGsm}
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="zen-heading text-xl zen-text-primary group-hover:text-zen-600 transition-colors">
          {paperType.title || 'Untitled Paper Type'}
        </h3>
        
        {description && (
          <p className="zen-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        )}
        
        {bestFor && (
          <div className="bg-bamboo-50/50 rounded-lg p-3 border border-bamboo-200/50">
            <h4 className="font-medium zen-text-primary text-sm mb-2">Perfect For:</h4>
            <p className="zen-text-secondary text-sm leading-relaxed">
              {bestFor}
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="zen-text-secondary text-xs">
            Traditional Choice
          </div>
          <div className="text-xs zen-text-secondary">
            🎨 Authentic Experience
          </div>
        </div>
      </div>
    </div>
  )
}