import { cosmic } from '@/lib/cosmic';
import TutorialCard from '@/components/TutorialCard';
import { OrigamiTutorial, CosmicResponse } from '@/types';

export default async function TutorialsPage() {
  let tutorials: OrigamiTutorial[] = [];
  
  try {
    const response = await cosmic.objects
      .find({ type: 'origami-tutorials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(20);
    
    tutorials = (response as CosmicResponse<OrigamiTutorial>).objects;
  } catch (error) {
    console.error('Error fetching tutorials:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            Origami Tutorials
          </h1>
          <p className="text-xl text-zen-600 max-w-3xl mx-auto leading-relaxed">
            Discover the art of paper folding through our mindful tutorials. Each model is a journey of patience, 
            precision, and peace.
          </p>
        </div>

        {/* Tutorials Grid */}
        {tutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <TutorialCard 
                key={tutorial.id} 
                tutorial={tutorial}
                onClick={() => window.location.href = `/tutorials/${tutorial.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🧘</div>
            <h3 className="text-2xl font-light text-zen-700 mb-4">
              No tutorials available yet
            </h3>
            <p className="text-zen-500 max-w-md mx-auto">
              We're preparing beautiful origami tutorials for you. Please check back soon.
            </p>
          </div>
        )}

        {/* Mindfulness Quote */}
        <div className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-zen-200">
            <p className="text-lg text-zen-700 italic leading-relaxed">
              "The art of origami teaches us that with patience and mindfulness, 
              even the simplest materials can become something beautiful."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}