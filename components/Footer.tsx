export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zen-800 text-zen-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🕊️</span>
              <h3 className="zen-heading text-xl">Zen Origami Studio</h3>
            </div>
            <p className="text-zen-300 leading-relaxed mb-6">
              A digital sanctuary for the ancient art of paper folding. 
              Find peace through mindful creation and discover the meditation within each fold.
            </p>
            <div className="bg-zen-700 rounded-xl p-4">
              <p className="font-calligraphy text-zen-200 italic text-sm leading-relaxed">
                "The journey of a thousand cranes begins with a single fold."
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="zen-heading text-lg mb-4 text-zen-200">Explore</h4>
            <ul className="space-y-2 text-zen-300">
              <li>
                <button 
                  onClick={() => document.querySelector('#tutorials')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-zen-100 transition-colors"
                >
                  📖 Tutorials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#interactive')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-zen-100 transition-colors"
                >
                  🎨 Interactive Tool
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-zen-100 transition-colors"
                >
                  🌸 Collections
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#papers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-zen-100 transition-colors"
                >
                  📜 Paper Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Philosophy */}
          <div>
            <h4 className="zen-heading text-lg mb-4 text-zen-200">Practice</h4>
            <ul className="space-y-2 text-zen-300 text-sm">
              <li>🧘 Mindful Folding</li>
              <li>🌸 Seasonal Awareness</li>
              <li>🎋 Cultural Respect</li>
              <li>💭 Present Moment</li>
              <li>🕯️ Inner Peace</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zen-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-zen-400 text-sm mb-4 md:mb-0">
            © {currentYear} Zen Origami Studio. Created with mindfulness and care.
          </div>
          <div className="text-zen-400 text-sm">
            Built with 🤍 using Cosmic CMS
          </div>
        </div>
      </div>
    </footer>
  )
}