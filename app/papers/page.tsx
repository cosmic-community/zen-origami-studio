import { cosmic } from '@/lib/cosmic';
import PaperTypeCard from '@/components/PaperTypeCard';
import { PaperType, CosmicResponse } from '@/types';

export default async function PapersPage() {
  let paperTypes: PaperType[] = [];
  
  try {
    const response = await cosmic.objects
      .find({ type: 'paper-types' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(20);
    
    paperTypes = (response as CosmicResponse<PaperType>).objects;
  } catch (error) {
    console.error('Error fetching paper types:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            Paper Types
          </h1>
          <p className="text-xl text-zen-600 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect paper for your origami journey. Each type brings its own character, 
            texture, and folding experience to your creations.
          </p>
        </div>

        {/* Paper Types Grid */}
        {paperTypes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paperTypes.map((paperType) => (
              <PaperTypeCard 
                key={paperType.id} 
                paperType={paperType}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎨</div>
            <h3 className="text-2xl font-light text-zen-700 mb-4">
              No paper types available yet
            </h3>
            <p className="text-zen-500 max-w-md mx-auto">
              We're cataloging beautiful origami papers for you. Please check back soon.
            </p>
          </div>
        )}

        {/* Paper Guide Section */}
        <div className="mt-20">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-zen-200">
            <h3 className="text-2xl font-light text-zen-900 mb-6 text-center">
              Choosing the Right Paper
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-zen-800 mb-3">For Beginners</h4>
                <p className="text-zen-600 leading-relaxed">
                  Start with traditional kami paper. Its perfect weight and smooth texture make 
                  learning easier while maintaining crisp folds.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-zen-800 mb-3">For Display</h4>
                <p className="text-zen-600 leading-relaxed">
                  Choose handmade washi or specialty papers for models you want to keep. 
                  Their unique textures add beauty and character to finished pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}