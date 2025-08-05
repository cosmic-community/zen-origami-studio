import { NextResponse } from 'next/server'
import { getTutorials } from '@/lib/cosmic'

export async function GET() {
  try {
    const tutorials = await getTutorials()
    return NextResponse.json(tutorials)
  } catch (error) {
    console.error('Error fetching tutorials:', error)
    return NextResponse.json([], { status: 500 })
  }
}