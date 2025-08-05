export default function Footer() {
  return (
    <footer className="bg-zen-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-zen text-2xl text-zen-100">
              Zen Origami Studio
            </h3>
            <p className="text-zen-300 leading-relaxed">
              Discover the ancient art of origami through peaceful, step-by-step tutorials 
              in a serene, Japanese-inspired environment.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-medium text-zen-100">Explore</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#tutorials" className="text-zen-300 hover:text-zen-100 transition-colors">
                Tutorials
              </a>
              <a href="#collections" className="text-zen-300 hover:text-zen-100 transition-colors">
                Collections
              </a>
              <a href="#papers" className="text-zen-300 hover:text-zen-100 transition-colors">
                Traditional Papers
              </a>
              <a href="#interactive" className="text-zen-300 hover:text-zen-100 transition-colors">
                Interactive Tool
              </a>
            </nav>
          </div>
          
          {/* Philosophy */}
          <div className="space-y-4">
            <h4 className="font-medium text-zen-100">Philosophy</h4>
            <div className="text-zen-300 text-sm leading-relaxed space-y-2">
              <p>"In each fold, find peace."</p>
              <p>"Through paper, discover patience."</p>
              <p>"Origami teaches us that beauty emerges from simplicity."</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zen-700 mt-12 pt-8 text-center">
          <p className="text-zen-400 text-sm">
            &copy; 2024 Zen Origami Studio. Created with mindfulness and powered by Cosmic.
          </p>
          <p className="font-calligraphy text-zen-300 mt-2 italic">
            "Fold with intention. Learn with calm."
          </p>
        </div>
      </div>
    </footer>
  )
}