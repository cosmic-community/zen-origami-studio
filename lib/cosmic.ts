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
    return []
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
    return []
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
    return []
  }
}

export async function getTutorialSteps(tutorialId: string) {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'tutorial-steps',
        'metadata.tutorial': tutorialId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return objects || []
  } catch (error) {
    console.error('Error fetching tutorial steps:', error)
    return []
  }
}

export default cosmic