import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export async function getTutorials() {
  try {
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
    throw error
  }
}

export async function getCollections() {
  try {
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
    throw error
  }
}

export async function getPaperTypes() {
  try {
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
    throw error
  }
}

export async function getTutorialSteps(tutorialId?: string) {
  try {
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
    throw error
  }
}

export default cosmic