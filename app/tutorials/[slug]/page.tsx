// app/tutorials/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic';
import { OrigamiTutorial, TutorialStep, CosmicResponse } from '@/types';
import { notFound } from 'next/navigation';

interface TutorialPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { slug } = await params;
  
  let tutorial: OrigamiTutorial | null = null;
  let steps: TutorialStep[] = [];

  try {
    // Fetch the tutorial
    const tutorialResponse = await cosmic.objects
      .findOne({ type: 'origami-tutorials', slug })
      .depth(1);
    
    tutorial = tutorialResponse.object as OrigamiTutorial;

    // Fetch related steps
    const stepsResponse = await cosmic.objects
      .find({ 
        type: 'tutorial-steps',
        'metadata.tutorial': tutorial.id 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(20);
    
    steps = (stepsResponse as CosmicResponse<TutorialStep>).objects.sort(
      (a, b) => (a.metadata.step_number || 0) - (b.metadata.step_number || 0)
    );
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    notFound();
  }

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tutorial Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            {tutorial.metadata.tutorial_name || tutorial.title}
          </h1>
          
          {tutorial.metadata.description && (
            <p className="text-xl text-zen-600 max-w-3xl mx-auto leading-relaxed mb-8">
              {tutorial.metadata.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zen-500">
            {tutorial.metadata.difficulty_level?.value && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-zen-400 rounded-full"></span>
                <span>Difficulty: {tutorial.metadata.difficulty_level.value}</span>
              </div>
            )}
            
            {tutorial.metadata.estimated_time && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-zen-400 rounded-full"></span>
                <span>Time: {tutorial.metadata.estimated_time}</span>
              </div>
            )}
          </div>
        </div>

        {/* Final Result Image */}
        {tutorial.metadata.final_result_image?.imgix_url && (
          <div className="mb-12">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={`${tutorial.metadata.final_result_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={tutorial.metadata.tutorial_name || tutorial.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Meditative Message */}
        {tutorial.metadata.meditative_message && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-zen-200">
            <p className="text-lg text-zen-700 italic text-center leading-relaxed">
              "{tutorial.metadata.meditative_message}"
            </p>
          </div>
        )}

        {/* Tutorial Steps */}
        {steps.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-light text-zen-900 text-center mb-8">
              Folding Steps
            </h2>
            
            {steps.map((step, index) => (
              <div key={step.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Step Image */}
                  {step.metadata.diagram_image?.imgix_url && (
                    <div className="md:w-1/2">
                      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
                        <img
                          src={`${step.metadata.diagram_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                          alt={step.metadata.step_title || `Step ${step.metadata.step_number}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Step Content */}
                  <div className="md:w-1/2 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-zen-500 text-white rounded-full font-medium">
                        {step.metadata.step_number || index + 1}
                      </div>
                      <h3 className="text-xl font-medium text-zen-900">
                        {step.metadata.step_title}
                      </h3>
                    </div>
                    
                    {step.metadata.instructions && (
                      <p className="text-zen-600 leading-relaxed">
                        {step.metadata.instructions}
                      </p>
                    )}
                    
                    {step.metadata.mindful_tip && (
                      <div className="bg-zen-100 rounded-lg p-4 border-l-4 border-zen-400">
                        <p className="text-zen-700 text-sm italic">
                          💭 Mindful tip: {step.metadata.mindful_tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-light text-zen-700 mb-4">
              Steps coming soon
            </h3>
            <p className="text-zen-500 max-w-md mx-auto">
              Detailed folding instructions for this tutorial are being prepared.
            </p>
          </div>
        )}

        {/* Back to Tutorials */}
        <div className="mt-16 text-center">
          <a
            href="/tutorials"
            className="inline-flex items-center gap-2 text-zen-600 hover:text-zen-800 transition-colors"
          >
            ← Back to all tutorials
          </a>
        </div>
      </div>
    </div>
  );
}