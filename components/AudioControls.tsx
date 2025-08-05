'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Play, Pause, Music, SkipForward } from 'lucide-react'

const AMBIENT_TRACKS = [
  {
    id: 'forest',
    name: 'Forest Meditation',
    description: 'Gentle forest sounds with distant temple bells',
    duration: 300
  },
  {
    id: 'water',
    name: 'Flowing Water',
    description: 'Peaceful stream with bamboo wind chimes',
    duration: 400
  },
  {
    id: 'minimal',
    name: 'Zen Minimalism',
    description: 'Subtle tones and singing bowls',
    duration: 600
  }
]

export default function AudioControls() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrack = AMBIENT_TRACKS[currentTrackIndex]

  useEffect(() => {
    // Create audio element for ambient background music
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = volume
      
      // In a real implementation, you would have actual audio files
      // For demo purposes, we'll simulate the audio controls
      audioRef.current.src = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAC7u7u7u7u7u7u7u7u7'
      
      // Handle audio events
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Ambient music ready to play')
      })
      
      audioRef.current.addEventListener('error', (e) => {
        console.log('Audio not available in demo - controls shown for demonstration')
      })

      audioRef.current.addEventListener('ended', () => {
        // Auto-advance to next track
        setCurrentTrackIndex((prev) => (prev + 1) % AMBIENT_TRACKS.length)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [currentTrackIndex])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log('Audio playback not available in demo')
      // For demo purposes, still toggle the visual state
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % AMBIENT_TRACKS.length)
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      <div 
        className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-zen border border-zen-200/50 transition-all duration-300 ${
          isExpanded ? 'p-6 w-72' : 'p-4 w-auto'
        }`}
      >
        {/* Compact Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Play/Pause button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-zen-500 hover:bg-zen-600 text-white rounded-full flex items-center justify-center transition-colors zen-focus"
              aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            {!isExpanded && (
              <>
                {/* Volume control */}
                <button
                  onClick={toggleMute}
                  className="zen-text-primary hover:text-zen-600 transition-colors zen-focus"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-zen-200 rounded-lg appearance-none cursor-pointer slider zen-focus"
                  aria-label="Volume control"
                />
              </>
            )}
          </div>

          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="zen-text-secondary hover:text-zen-600 transition-colors zen-focus ml-2"
            aria-label={isExpanded ? 'Collapse audio controls' : 'Expand audio controls'}
          >
            <Music size={16} />
          </button>
        </div>
        
        {/* Expanded Controls */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Track Info */}
            <div className="text-center">
              <h4 className="zen-text font-medium text-sm">{currentTrack.name}</h4>
              <p className="zen-text-secondary text-xs mt-1">{currentTrack.description}</p>
            </div>

            {/* Volume and Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={toggleMute}
                className="zen-text-primary hover:text-zen-600 transition-colors zen-focus"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 mx-3 h-1 bg-zen-200 rounded-lg appearance-none cursor-pointer slider zen-focus"
                aria-label="Volume control"
              />

              <button
                onClick={nextTrack}
                className="zen-text-primary hover:text-zen-600 transition-colors zen-focus"
                aria-label="Next track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Track Selection */}
            <div className="space-y-2">
              <label className="text-xs zen-text-secondary">Choose Ambience:</label>
              <div className="grid grid-cols-1 gap-1">
                {AMBIENT_TRACKS.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrackIndex(index)}
                    className={`text-left p-2 rounded-lg text-xs transition-colors zen-focus ${
                      index === currentTrackIndex
                        ? 'bg-zen-100 zen-text-primary'
                        : 'zen-text-secondary hover:bg-zen-50'
                    }`}
                  >
                    {track.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {!isExpanded && (
          <div className="mt-2 text-xs zen-text-secondary text-center">
            Ambient Sounds
          </div>
        )}
      </div>
    </div>
  )
}