import { createBucketClient } from '@cosmicjs/sdk';
import { OrigamiTutorial, TutorialStep, Collection, PaperType, CosmicObject } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all origami tutorials
export async function getTutorials(): Promise<OrigamiTutorial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'origami-tutorials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as OrigamiTutorial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tutorials');
  }
}

// Fetch tutorial by slug
export async function getTutorialBySlug(slug: string): Promise<OrigamiTutorial | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'origami-tutorials', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as OrigamiTutorial;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch tutorial');
  }
}

// Fetch tutorial steps for a specific tutorial
export async function getTutorialSteps(tutorialId: string): Promise<TutorialStep[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'tutorial-steps',
        'metadata.tutorial': tutorialId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort steps by step number
    const steps = (response.objects as TutorialStep[]).sort((a: TutorialStep, b: TutorialStep) => {
      const stepA = a.metadata?.step_number || 0;
      const stepB = b.metadata?.step_number || 0;
      return stepA - stepB;
    });
    
    return steps;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tutorial steps');
  }
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

// Fetch all paper types
export async function getPaperTypes(): Promise<PaperType[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'paper-types' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as PaperType[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch paper types');
  }
}

// Fetch tutorials by difficulty level
export async function getTutorialsByDifficulty(difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): Promise<OrigamiTutorial[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'origami-tutorials',
        'metadata.difficulty_level.value': difficulty 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as OrigamiTutorial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tutorials by difficulty');
  }
}

// Fetch tutorials by collection
export async function getTutorialsByCollection(collectionId: string): Promise<OrigamiTutorial[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'origami-tutorials',
        'metadata.collection': collectionId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as OrigamiTutorial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch tutorials by collection');
  }
}