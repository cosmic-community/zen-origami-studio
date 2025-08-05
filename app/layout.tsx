import './globals.css'
import type { Metadata, Viewport } from 'next'
import CosmicBadge from '@/components/CosmicBadge'

export const metadata: Metadata = {
  title: 'Zen Origami Studio - Meditative Paper Folding',
  description: 'Learn the ancient art of origami through peaceful, step-by-step tutorials in a serene, Japanese-inspired environment. Fold with intention, learn with calm.',
  keywords: 'origami, meditation, Japanese art, paper folding, tutorials, mindfulness, zen',
  authors: [{ name: 'Zen Origami Studio' }],
  creator: 'Zen Origami Studio',
  openGraph: {
    title: 'Zen Origami Studio - Meditative Paper Folding',
    description: 'Learn the ancient art of origami through peaceful, step-by-step tutorials in a serene, Japanese-inspired environment.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zen Origami Studio - Meditative Paper Folding',
    description: 'Learn the ancient art of origami through peaceful, step-by-step tutorials in a serene, Japanese-inspired environment.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="zen-gradient min-h-screen antialiased">
        <div className="relative min-h-screen">
          {children}
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}