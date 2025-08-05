# Zen Origami Studio

![App Preview](https://imgix.cosmicjs.com/51bde2b0-7195-11f0-a051-23c10f41277a-photo-1522383225653-ed111181a951-1754354658157.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A serene, Japanese-inspired origami learning platform that transforms traditional paper folding instruction into a meditative digital experience. Built with Next.js and powered by Cosmic CMS, this application provides step-by-step tutorials with calming visuals, ambient soundscapes, and an innovative 3D interactive paper folding tool.

## Features

- 🧘 **Meditative Learning Experience** - Peaceful interface designed for mindful origami practice
- 📖 **Step-by-Step Tutorials** - Clear instructions with smooth transitions between folding steps
- 🎨 **3D Interactive Paper Tool** - Virtual paper manipulation with real-time cursor/touch controls
- 🎵 **Ambient Soundscape** - Calming background music with Japanese instruments and easy toggle
- 🌸 **Gentle Animations** - Floating sakura petals and subtle paper crane movements
- 🌿 **Seasonal Collections** - Curated origami projects organized by themes and occasions
- 📜 **Paper Type Guidance** - Learn about traditional kami and handmade washi papers
- 💭 **Inspirational Messaging** - Meditative quotes and mindful tips throughout the experience

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6890e5109f3266af745d3abf&clone_repository=68915518f202dcc2fa9a6c9e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a serene, Japanese-inspired website that teaches origami in a tranquil, meditative way. The visual design should use soft, earthy colors—like muted greens, light beige, soft pinks, and gentle blues. The layout should be minimalist with plenty of breathing room, natural textures (like rice paper or bamboo), and subtle animations. Use elegant typography with a hand-crafted or calligraphy feel. The homepage should feature calming background music—something ambient, meditative, and optionally Japanese-influenced (koto, shakuhachi, etc.), with an easy toggle to turn sound on or off.

The site should include two main features:
	1.	Step-by-step origami tutorials with clearly labeled diagrams and smooth transitions between each fold.
	2.	A 3D interactive paper folding tool where users can manipulate a virtual piece of paper with their cursor or touch to follow along in real-time.

Include gentle animations (like floating sakura petals or a subtle paper crane glide on scroll), and a peaceful welcome message like 'Fold with intention. Learn with calm.' Build it as a single-page or minimal-page site that feels more like an experience than a tutorial site."

### Code Generation Prompt

> "Create a serene, Japanese-inspired website that teaches origami in a tranquil, meditative way. The visual design should use soft, earthy colors—like muted greens, light beige, soft pinks, and gentle blues. The layout should be minimalist with plenty of breathing room, natural textures (like rice paper or bamboo), and subtle animations. Use elegant typography with a hand-crafted or calligraphy feel. The homepage should feature calming background music—something ambient, meditative, and optionally Japanese-influenced (koto, shakuhachi, etc.), with an easy toggle to turn sound on or off.

The site should include two main features:
	1.	Step-by-Step origami tutorials with clearly labeled diagrams and smooth transitions between each fold.
	2.	A 3D interactive paper folding tool where users can manipulate a virtual piece of paper with their cursor or touch to follow along in real-time.

Include gentle animations (like floating sakura petals or a subtle paper crane glide on scroll), and a peaceful welcome message like 'Fold with intention. Learn with calm.' Build it as a single-page or minimal-page site that feels more like an experience than a tutorial site."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom Japanese-inspired theme
- **Cosmic CMS** - Headless content management
- **Three.js** - 3D interactive paper folding visualization
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Smooth animations and transitions
- **Web Audio API** - Ambient soundscape management

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Bun package manager
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables by copying `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Start the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetch All Tutorials
```typescript
import { cosmic } from '@/lib/cosmic'

const tutorials = await cosmic.objects
  .find({ type: 'origami-tutorials' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Get Tutorial Steps
```typescript
const steps = await cosmic.objects
  .find({ 
    type: 'tutorial-steps',
    'metadata.tutorial': tutorialId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Fetch Collections
```typescript
const collections = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with four main content types in your Cosmic bucket:

- **Origami Tutorials** - Complete folding projects with difficulty levels and meditative messages
- **Tutorial Steps** - Individual folding instructions with diagrams and mindful tips
- **Collections** - Seasonal themes and curated tutorial groupings
- **Paper Types** - Information about traditional and handmade origami papers

The content structure supports the meditative learning experience with inspirational quotes, mindful tips, and beautiful imagery that enhances the peaceful origami practice.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push to main

### Netlify
1. Connect your repository to Netlify
2. Set build command to `bun run build`
3. Set publish directory to `out` (for static exports)
4. Add environment variables in Netlify dashboard

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

The application is optimized for performance with static generation where possible and dynamic loading for interactive features.
<!-- README_END -->