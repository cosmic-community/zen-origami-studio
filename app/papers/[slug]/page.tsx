// app/papers/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic';
import { PaperType, OrigamiTutorial, CosmicResponse } from '@/types';
import { notFound } from 'next/navigation';
import TutorialCard from '@/components/TutorialCard';

interface PaperPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PaperPage({ params }: PaperPageProps) {
  const { slug } = await params;
  
  let paperType: PaperType | null = null;
  let tutorials: OrigamiTutorial[] = [];

  try {
    // Fetch the paper type
    const paperResponse = await cosmic.objects
      .findOne({ type: 'paper-types', slug })
      .depth(1);
    
    paperType = paperResponse.object as PaperType;

    // Fetch tutorials that use this paper type
    const tutorialsResponse = await cosmic.objects
      .find({ 
        type: 'origami-tutorials',
        'metadata.paper_type': paperType.id 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(20);
    
    tutorials = (tutorialsResponse as CosmicResponse<OrigamiTutorial>).objects;
  } catch (error) {
    console.error('Error fetching paper type:', error);
    notFound();
  }

  if (!paperType) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Paper Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            {paperType.metadata.paper_name || paperType.title}
          </h1>
          
          {paperType.metadata.weight_gsm && (
            <div className="inline-flex items-center gap-2 bg-zen-100 text-zen-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-zen-400 rounded-full"></span>
              Weight: {paperType.metadata.weight_gsm}
            </div>
          )}
        </div>

        {/* Paper Image */}
        {paperType.metadata.paper_image?.imgix_url && (
          <div className="mb-12">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={`${paperType.metadata.paper_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={paperType.metadata.paper_name || paperType.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Paper Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {paperType.metadata.description && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200">
              <h3 className="text-xl font-medium text-zen-900 mb-4">Description</h3>
              <p className="text-zen-600 leading-relaxed">
                {paperType.metadata.description}
              </p>
            </div>
          )}
          
          {paperType.metadata.best_for && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200">
              <h3 className="text-xl font-medium text-zen-900 mb-4">Best For</h3>
              <p className="text-zen-600 leading-relaxed">
                {paperType.metadata.best_for}
              </p>
            </div>
          )}
        </div>

        {/* Tutorials Using This Paper */}
        {tutorials.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-light text-zen-900 text-center mb-8">
              Tutorials Using {paperType.metadata.paper_name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tutorials.map((tutorial) => (
                <TutorialCard 
                  key={tutorial.id} 
                  tutorial={tutorial}
                  onClick={() => window.location.href = `/tutorials/${tutorial.slug}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Paper Care Tips */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-zen-200">
          <h3 className="text-2xl font-light text-zen-900 mb-6 text-center">
            Paper Care & Handling
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-3">🌸</div>
              <h4 className="font-medium text-zen-800 mb-2">Handle Gently</h4>
              <p className="text-sm text-zen-600">
                Work with clean, dry hands to preserve the paper's texture and appearance.
              </p>
            </div>
            
            <div>
              <div className="text-3xl mb-3">💨</div>
              <h4 className="font-medium text-zen-800 mb-2">Store Properly</h4>
              <p className="text-sm text-zen-600">
                Keep papers flat and protected from humidity and direct sunlight.
              </p>
            </div>
            
            <div>
              <div className="text-3xl mb-3">✨</div>
              <h4 className="font-medium text-zen-800 mb-2">Fold Mindfully</h4>
              <p className="text-sm text-zen-600">
                Take your time with each crease to honor the paper's natural properties.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Papers */}
        <div className="text-center">
          <a
            href="/papers"
            className="inline-flex items-center gap-2 text-zen-600 hover:text-zen-800 transition-colors"
          >
            ← Back to all paper types
          </a>
        </div>
      </div>
    </div>
  );
}