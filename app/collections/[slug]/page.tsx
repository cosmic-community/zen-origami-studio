// app/collections/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic';
import { Collection, OrigamiTutorial, CosmicResponse } from '@/types';
import { notFound } from 'next/navigation';
import TutorialCard from '@/components/TutorialCard';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  
  let collection: Collection | null = null;
  let tutorials: OrigamiTutorial[] = [];

  try {
    // Fetch the collection
    const collectionResponse = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .depth(1);
    
    collection = collectionResponse.object as Collection;

    // Fetch tutorials in this collection
    const tutorialsResponse = await cosmic.objects
      .find({ 
        type: 'origami-tutorials',
        'metadata.collection': collection.id 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(20);
    
    tutorials = (tutorialsResponse as CosmicResponse<OrigamiTutorial>).objects;
  } catch (error) {
    console.error('Error fetching collection:', error);
    notFound();
  }

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            {collection.metadata.collection_name || collection.title}
          </h1>
          
          {collection.metadata.season_occasion && (
            <div className="inline-flex items-center gap-2 bg-zen-100 text-zen-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-zen-400 rounded-full"></span>
              {collection.metadata.season_occasion}
            </div>
          )}
          
          {collection.metadata.theme_description && (
            <p className="text-xl text-zen-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {collection.metadata.theme_description}
            </p>
          )}
        </div>

        {/* Collection Image */}
        {collection.metadata.collection_image?.imgix_url && (
          <div className="mb-16">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={`${collection.metadata.collection_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={collection.metadata.collection_name || collection.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        )}

        {/* Inspirational Quote */}
        {collection.metadata.inspirational_quote && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-zen-200">
            <p className="text-lg text-zen-700 italic text-center leading-relaxed">
              "{collection.metadata.inspirational_quote}"
            </p>
          </div>
        )}

        {/* Tutorials in Collection */}
        <div className="mb-12">
          <h2 className="text-3xl font-light text-zen-900 text-center mb-8">
            Tutorials in this Collection
          </h2>
          
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
                Tutorials coming soon
              </h3>
              <p className="text-zen-500 max-w-md mx-auto">
                Beautiful origami models for this collection are being prepared.
              </p>
            </div>
          )}
        </div>

        {/* Back to Collections */}
        <div className="text-center">
          <a
            href="/collections"
            className="inline-flex items-center gap-2 text-zen-600 hover:text-zen-800 transition-colors"
          >
            ← Back to all collections
          </a>
        </div>
      </div>
    </div>
  );
}