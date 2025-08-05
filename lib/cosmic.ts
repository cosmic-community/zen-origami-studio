import { createBucketClient } from '@cosmicjs/sdk'

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