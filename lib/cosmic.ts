import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Export types
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status?: string
  thumbnail?: string
  published_at?: string
  modified_by?: string
  created_by?: string
  publish_at?: string | null
  bucket?: string
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Get all origami tutorials
export async function getOrigamiTutorials(): Promise<CosmicObject[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'origami-tutorials' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching origami tutorials:', error)
    return []
  }
}

// Get single origami tutorial by slug
export async function getOrigamiTutorial(slug: string): Promise<CosmicObject | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'origami-tutorials', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return object || null
  } catch (error) {
    console.error('Error fetching origami tutorial:', error)
    return null
  }
}

// Get tutorial steps - updated to accept optional tutorialId parameter
export async function getTutorialSteps(tutorialId?: string): Promise<CosmicObject[]> {
  try {
    let query: any = { type: 'tutorial-steps' }
    
    if (tutorialId) {
      query['metadata.tutorial'] = tutorialId
    }
    
    const { objects } = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    // Sort by step number if available
    const sortedObjects = (objects || []).sort((a, b) => {
      const stepA = a.metadata?.step_number || 0
      const stepB = b.metadata?.step_number || 0
      return stepA - stepB
    })
    
    return sortedObjects
  } catch (error) {
    console.error('Error fetching tutorial steps:', error)
    return []
  }
}

// Get all collections
export async function getCollections(): Promise<CosmicObject[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

// Get single collection by slug
export async function getCollection(slug: string): Promise<CosmicObject | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return object || null
  } catch (error) {
    console.error('Error fetching collection:', error)
    return null
  }
}

// Get all paper types
export async function getPaperTypes(): Promise<CosmicObject[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'paper-types' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching paper types:', error)
    return []
  }
}

// Get single paper type by slug
export async function getPaperType(slug: string): Promise<CosmicObject | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'paper-types', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return object || null
  } catch (error) {
    console.error('Error fetching paper type:', error)
    return null
  }
}

// Get tutorials by collection
export async function getTutorialsByCollection(collectionId: string): Promise<CosmicObject[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'origami-tutorials',
        'metadata.collection': collectionId
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching tutorials by collection:', error)
    return []
  }
}

// Get tutorials by paper type
export async function getTutorialsByPaperType(paperTypeId: string): Promise<CosmicObject[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'origami-tutorials',
        'metadata.paper_type': paperTypeId
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching tutorials by paper type:', error)
    return []
  }
}

// Export the cosmic client for direct usage if needed
export { cosmic }