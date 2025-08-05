import { NextResponse } from 'next/server'
import { getPaperTypes } from '@/lib/cosmic'

export async function GET() {
  try {
    const paperTypes = await getPaperTypes()
    return NextResponse.json(paperTypes)
  } catch (error) {
    console.error('Error fetching paper types:', error)
    return NextResponse.json([], { status: 500 })
  }
}