'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'

export default function AudioControls() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element for ambient background music
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = volume
      
      // Note: In a real implementation, you would host actual ambient music files
      // For demo purposes, we'll use a placeholder that shows the controls work
      audioRef.current.src = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAC7u7u7u7u7u7u7u7u7'
      
      // Handle audio events
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Ambient music ready to play')
      })
      
      audioRef.current.addEventListener('error', (e) => {
        console.log('Audio not available in demo')
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

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

  return (
    <div className="fixed top-20 right-4 z-40 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-zen border border-zen-200/50">
      <div className="flex items-center space-x-3">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-zen-500 hover:bg-zen-600 text-white rounded-full flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="zen-text-primary hover:text-zen-600 transition-colors"
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
            className="w-16 h-1 bg-zen-200 rounded-lg appearance-none cursor-pointer slider"
            aria-label="Volume control"
          />
        </div>
      </div>
      
      <div className="mt-2 text-xs zen-text-secondary text-center">
        Ambient Sounds
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: hsl(var(--zen-500));
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: hsl(var(--zen-500));
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  )
}