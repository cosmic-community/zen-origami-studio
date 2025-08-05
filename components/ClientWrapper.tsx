'use client'

import dynamic from 'next/dynamic'

// Dynamically import the 3D component to avoid SSR issues
const InteractivePaperTool = dynamic(() => import('@/components/InteractivePaperTool'), {
  ssr: false,
  loading: () => (
    <div className="zen-card p-8 max-w-4xl mx-auto">
      <div className="h-96 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-zen-sage/10 to-zen-cream/20 flex items-center justify-center">
        <div className="animate-pulse text-zen-sage">Loading 3D experience...</div>
      </div>
    </div>
  )
})

export default function ClientWrapper() {
  return <InteractivePaperTool />
}