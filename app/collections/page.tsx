import { cosmic } from '@/lib/cosmic';
import CollectionCard from '@/components/CollectionCard';
import { Collection, CosmicResponse } from '@/types';

export default async function CollectionsPage() {
  let collections: Collection[] = [];
  
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(20);
    
    collections = (response as CosmicResponse<Collection>).objects;
  } catch (error) {
    console.error('Error fetching collections:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            Origami Collections
          </h1>
          <p className="text-xl text-zen-600 max-w-3xl mx-auto leading-relaxed">
            Explore curated collections of origami models, each telling a story through the ancient art of paper folding.
            Find inspiration in every season and occasion.
          </p>
        </div>

        {/* Collections Grid */}
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <CollectionCard 
                key={collection.id} 
                collection={collection}
                onClick={() => window.location.href = `/collections/${collection.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🌸</div>
            <h3 className="text-2xl font-light text-zen-700 mb-4">
              No collections available yet
            </h3>
            <p className="text-zen-500 max-w-md mx-auto">
              We're curating beautiful origami collections for you. Please check back soon.
            </p>
          </div>
        )}

        {/* Philosophy Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-zen-200">
            <h3 className="text-2xl font-light text-zen-900 mb-4">
              The Art of Seasonal Folding
            </h3>
            <p className="text-zen-700 leading-relaxed">
              Each collection reflects the natural rhythms of life, celebrating moments of beauty, 
              transition, and contemplation through the mindful practice of origami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}