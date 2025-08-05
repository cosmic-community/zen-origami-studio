// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
  modified_by?: string;
  created_by?: string;
  publish_at?: string | null;
  bucket?: string;
}

// Image interface for consistent typing
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Difficulty level interface
export interface DifficultyLevel {
  key: string;
  value: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Specific object types with proper metadata interfaces
export interface OrigamiTutorial extends CosmicObject {
  type: 'origami-tutorials';
  metadata: {
    tutorial_name?: string;
    description?: string;
    difficulty_level?: DifficultyLevel;
    estimated_time?: string;
    final_result_image?: CosmicImage;
    paper_type?: PaperType | string;
    collection?: Collection | string;
    meditative_message?: string;
  };
}

export interface TutorialStep extends CosmicObject {
  type: 'tutorial-steps';
  metadata: {
    step_number?: number;
    step_title?: string;
    instructions?: string;
    diagram_image?: CosmicImage;
    tutorial?: OrigamiTutorial;
    mindful_tip?: string;
  };
}

export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    collection_name?: string;
    theme_description?: string;
    season_occasion?: string;
    collection_image?: CosmicImage;
    inspirational_quote?: string;
  };
}

export interface PaperType extends CosmicObject {
  type: 'paper-types';
  metadata: {
    paper_name?: string;
    description?: string;
    best_for?: string;
    paper_image?: CosmicImage;
    weight_gsm?: string;
  };
}

// Type literals for difficulty levels
export type DifficultyLevelValue = 'Beginner' | 'Intermediate' | 'Advanced';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isOrigamiTutorial(obj: CosmicObject): obj is OrigamiTutorial {
  return obj.type === 'origami-tutorials';
}

export function isTutorialStep(obj: CosmicObject): obj is TutorialStep {
  return obj.type === 'tutorial-steps';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isPaperType(obj: CosmicObject): obj is PaperType {
  return obj.type === 'paper-types';
}

// Component prop interfaces
export interface TutorialCardProps {
  tutorial: OrigamiTutorial;
  className?: string;
  onClick?: () => void;
}

export interface StepCardProps {
  step: TutorialStep;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CollectionCardProps {
  collection: Collection;
  className?: string;
  onClick?: () => void;
}

export interface PaperTypeCardProps {
  paperType: PaperType;
  className?: string;
}

// 3D Paper Folding Tool types
export interface FoldPoint {
  x: number;
  y: number;
  z: number;
}

export interface FoldLine {
  start: FoldPoint;
  end: FoldPoint;
  type: 'valley' | 'mountain' | 'cut';
}

export interface PaperState {
  vertices: FoldPoint[];
  faces: number[][];
  folds: FoldLine[];
  rotation: { x: number; y: number; z: number };
}

// Audio control types
export interface AudioControlsProps {
  isPlaying: boolean;
  volume: number;
  onTogglePlay: () => void;
  onVolumeChange: (volume: number) => void;
}

// Animation types
export interface SakuraPetal {
  id: string;
  x: number;
  y: number;
  rotation: number;
  size: number;
  speed: number;
}

// Paper Crane 3D animation interface
export interface CraneAnimation {
  currentStep: number;
  isAnimating: boolean;
  foldProgress: number;
}

// Meditation and mindfulness types
export interface MeditativeQuote {
  id: string;
  text: string;
  author?: string;
  category: 'focus' | 'patience' | 'presence' | 'transformation';
}

export interface AmbientSound {
  id: string;
  name: string;
  src: string;
  duration: number;
  category: 'nature' | 'traditional' | 'minimal';
}

// Tutorial step animation interface
export interface StepTransition {
  from: number;
  to: number;
  duration: number;
  easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

// Utility types
export type CreateTutorialData = Omit<OrigamiTutorial, 'id' | 'created_at' | 'modified_at'>;
export type CreateStepData = Omit<TutorialStep, 'id' | 'created_at' | 'modified_at'>;

// Hook return types
export interface UseAmbientSoundReturn {
  isPlaying: boolean;
  currentTrack: AmbientSound | null;
  volume: number;
  play: () => void;
  pause: () => void;
  changeTrack: (trackId: string) => void;
  setVolume: (volume: number) => void;
}