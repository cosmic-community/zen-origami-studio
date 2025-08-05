import { NextResponse } from 'next/server'
import { getTutorialSteps } from '@/lib/cosmic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tutorialId = searchParams.get('tutorial')
    
    if (tutorialId) {
      // Get steps for a specific tutorial
      const steps = await getTutorialSteps(tutorialId)
      return NextResponse.json(steps)
    } else {
      // Get all tutorial steps
      const steps = await getTutorialSteps()
      return NextResponse.json(steps)
    }
  } catch (error) {
    console.error('Error fetching tutorial steps:', error)
    return NextResponse.json([], { status: 500 })
  }
}