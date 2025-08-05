'use client'

import { useState, useEffect } from 'react';
import InteractivePaperTool from '@/components/InteractivePaperTool';
import AudioControls from '@/components/AudioControls';

export default function InteractiveToolPage() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio settings from localStorage if available
    const savedVolume = localStorage.getItem('zen-audio-volume');
    const savedEnabled = localStorage.getItem('zen-audio-enabled');
    
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
    
    if (savedEnabled) {
      setIsAudioEnabled(savedEnabled === 'true');
    }
  }, []);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem('zen-audio-volume', newVolume.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-bamboo-50">
      {/* Header */}
      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-zen-900 mb-6">
            Interactive Paper Tool
          </h1>
          <p className="text-xl text-zen-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Experience the meditative art of virtual origami. Practice folding techniques, 
            explore paper properties, and find your center through digital mindfulness.
          </p>
          
          {/* Audio Controls */}
          <div className="flex justify-center mb-8">
            <AudioControls
              isPlaying={isPlaying}
              volume={volume}
              onTogglePlay={handleTogglePlay}
              onVolumeChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>

      {/* Interactive Tool */}
      <div className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200 shadow-xl">
            <InteractivePaperTool />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-zen-200">
            <h3 className="text-2xl font-light text-zen-900 mb-6 text-center">
              How to Use the Interactive Tool
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-zen-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-zen-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Mouse Controls
                </h4>
                <ul className="text-zen-600 space-y-2 ml-8">
                  <li>• Drag to rotate the paper</li>
                  <li>• Scroll to zoom in/out</li>
                  <li>• Click and hold to fold</li>
                  <li>• Right-click to unfold</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-zen-800 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-zen-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Mindful Practice
                </h4>
                <ul className="text-zen-600 space-y-2 ml-8">
                  <li>• Take slow, deep breaths</li>
                  <li>• Focus on each fold</li>
                  <li>• Observe the paper's transformation</li>
                  <li>• Find peace in the process</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-zen-100 rounded-xl border-l-4 border-zen-400">
              <p className="text-zen-700 italic text-center">
                "The goal is not perfection, but presence. Let each fold be a moment of mindfulness."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}