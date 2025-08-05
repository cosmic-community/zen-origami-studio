import { createBucketClient } from '@cosmicjs/sdk'
import { OrigamiTutorial, TutorialStep, Collection, PaperType, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function to handle Cosmic API errors
export async function safeCosmicQuery<T>(query: () => Promise<T>): Promise<T | null> {
  try {
    return await query()
  } catch (error) {
    console.error('Cosmic query error:', error)
    return null
  }
}

// Export functions for API routes
export async function getTutorials(): Promise<OrigamiTutorial[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'origami-tutorials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects as OrigamiTutorial[]
  } catch (error) {
    console.error('Error fetching tutorials:', error)
    return []
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects as Collection[]
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

export async function getPaperTypes(): Promise<PaperType[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'paper-types' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects as PaperType[]
  } catch (error) {
    console.error('Error fetching paper types:', error)
    return []
  }
}

export async function getTutorialSteps(): Promise<TutorialStep[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'tutorial-steps' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects as TutorialStep[]
  } catch (error) {
    console.error('Error fetching tutorial steps:', error)
    return []
  }
}