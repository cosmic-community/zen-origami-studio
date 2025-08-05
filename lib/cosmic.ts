import { createBucketClient } from '@cosmicjs/sdk'

// Validate environment variables
if (!process.env.COSMIC_BUCKET_SLUG) {
  console.warn('COSMIC_BUCKET_SLUG environment variable is not set')
}

if (!process.env.COSMIC_READ_KEY) {
  console.warn('COSMIC_READ_KEY environment variable is not set')
}

// Initialize Cosmic client with proper error handling
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
})

export async function getTutorials() {
  try {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      console.warn('Missing Cosmic environment variables, returning empty array')
      return []
    }
    
    const { objects } = await cosmic.objects
      .find({ type: 'origami-tutorials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching tutorials:', error)
    // Check if this is a 404 error (no objects found)
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

export async function getCollections() {
  try {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      console.warn('Missing Cosmic environment variables, returning empty array')
      return []
    }
    
    const { objects } = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching collections:', error)
    // Check if this is a 404 error (no objects found)
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

export async function getPaperTypes() {
  try {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      console.warn('Missing Cosmic environment variables, returning empty array')
      return []
    }
    
    const { objects } = await cosmic.objects
      .find({ type: 'paper-types' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching paper types:', error)
    // Check if this is a 404 error (no objects found)
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

export async function getTutorialSteps(tutorialId?: string) {
  try {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      console.warn('Missing Cosmic environment variables, returning empty array')
      return []
    }
    
    let query: any = { type: 'tutorial-steps' }
    
    if (tutorialId) {
      query['metadata.tutorial'] = tutorialId
    }
    
    const { objects } = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching tutorial steps:', error)
    // Check if this is a 404 error (no objects found)
    if (error && typeof error === 'object' && 'status' in error && (error as any).status === 404) {
      return []
    }
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

export default cosmic