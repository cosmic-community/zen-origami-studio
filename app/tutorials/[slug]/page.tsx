// app/tutorials/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic';
import { OrigamiTutorial, TutorialStep, CosmicResponse } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Star, User } from 'lucide-react';

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

  const difficulty = tutorial.metadata.difficulty_level?.value;
  const paperType = tutorial.metadata.paper_type;
  const collection = tutorial.metadata.collection;

  const getDifficultyColor = (level?: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-zen-100 text-zen-700 border-zen-200';
      case 'Intermediate':
        return 'bg-sage-100 text-sage-700 border-sage-200';
      case 'Advanced':
        return 'bg-sakura-100 text-sakura-700 border-sakura-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 zen-text-secondary hover:text-zen-600 transition-colors zen-focus"
          >
            <ArrowLeft size={16} />
            <span>Back to Tutorials</span>
          </Link>
        </div>

        {/* Tutorial Header */}
        <div className="text-center mb-12">
          <h1 className="zen-heading text-4xl md:text-5xl zen-text-primary mb-6">
            {tutorial.metadata.tutorial_name || tutorial.title}
          </h1>
          
          {tutorial.metadata.description && (
            <p className="zen-text-secondary text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              {tutorial.metadata.description}
            </p>
          )}

          {/* Tutorial metadata */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {difficulty && (
              <div className={`px-3 py-1 rounded-full border ${getDifficultyColor(difficulty)}`}>
                <span className="mr-1">📊</span>
                <span>{difficulty}</span>
              </div>
            )}
            
            {tutorial.metadata.estimated_time && (
              <div className="flex items-center gap-2 zen-text-secondary">
                <Clock size={16} />
                <span>{tutorial.metadata.estimated_time}</span>
              </div>
            )}

            {paperType && typeof paperType === 'object' && (
              <div className="flex items-center gap-2 zen-text-secondary">
                <span>📜</span>
                <span>{paperType.title}</span>
              </div>
            )}
          </div>

          {collection && typeof collection === 'object' && (
            <div className="mt-4">
              <Link 
                href={`/collections/${collection.slug}`}
                className="inline-flex items-center gap-2 text-sm zen-text-secondary hover:text-zen-600 transition-colors"
              >
                <span>🌸</span>
                <span>Part of {collection.title} collection</span>
              </Link>
            </div>
          )}
        </div>

        {/* Final Result Image */}
        {tutorial.metadata.final_result_image?.imgix_url && (
          <div className="mb-12">
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={`${tutorial.metadata.final_result_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                alt={tutorial.metadata.tutorial_name || tutorial.title}
                className="w-full h-full object-cover filter-paper"
              />
            </div>
          </div>
        )}

        {/* Meditative Message */}
        {tutorial.metadata.meditative_message && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-zen-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-zen-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🧘</span>
              </div>
              <p className="font-calligraphy text-zen-700 italic text-xl leading-relaxed">
                "{tutorial.metadata.meditative_message}"
              </p>
            </div>
          </div>
        )}

        {/* Tutorial Steps */}
        {steps.length > 0 ? (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="zen-heading text-3xl zen-text-primary mb-4">
                Folding Steps
              </h2>
              <p className="zen-text-secondary">
                Follow each step mindfully, breathing deeply with each fold.
              </p>
            </div>
            
            {steps.map((step, index) => (
              <div key={step.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Step Image */}
                  {step.metadata.diagram_image?.imgix_url && (
                    <div className="lg:w-1/2">
                      <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
                        <img
                          src={`${step.metadata.diagram_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                          alt={step.metadata.step_title || `Step ${step.metadata.step_number}`}
                          className="w-full h-full object-cover filter-paper"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Step Content */}
                  <div className="lg:w-1/2 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-zen-500 text-white rounded-full font-medium">
                        {step.metadata.step_number || index + 1}
                      </div>
                      <h3 className="zen-heading text-xl zen-text-primary">
                        {step.metadata.step_title}
                      </h3>
                    </div>
                    
                    {step.metadata.instructions && (
                      <p className="zen-text-secondary leading-relaxed">
                        {step.metadata.instructions}
                      </p>
                    )}
                    
                    {step.metadata.mindful_tip && (
                      <div className="bg-zen-100 rounded-lg p-4 border-l-4 border-zen-400">
                        <div className="flex items-start gap-3">
                          <span className="text-lg">💭</span>
                          <div>
                            <p className="font-medium text-zen-700 text-sm mb-1">Mindful Tip:</p>
                            <p className="zen-text-secondary text-sm italic leading-relaxed">
                              {step.metadata.mindful_tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Completion message */}
            <div className="bg-gradient-to-r from-zen-50 to-sage-50 rounded-2xl p-8 border border-zen-200 text-center">
              <div className="w-16 h-16 bg-zen-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="zen-heading text-2xl zen-text-primary mb-4">
                Congratulations!
              </h3>
              <p className="zen-text-secondary text-lg leading-relaxed">
                You have completed this mindful journey. Take a moment to appreciate 
                your creation and the peace found in the process.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="zen-heading text-2xl zen-text-primary mb-4">
              Steps are being prepared
            </h3>
            <p className="zen-text-secondary max-w-md mx-auto">
              Detailed folding instructions for this tutorial are being crafted with care.
            </p>
          </div>
        )}

        {/* Related tutorials or collections */}
        <div className="mt-16 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-zen-200/50">
            <h3 className="zen-heading text-xl zen-text-primary mb-4">
              Continue Your Journey
            </h3>
            <p className="zen-text-secondary mb-6">
              Explore more tutorials and deepen your practice with our interactive tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#tutorials" className="zen-button px-6 py-3">
                More Tutorials
              </Link>
              <Link href="/#interactive" className="zen-button-secondary px-6 py-3">
                Try Interactive Tool
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}