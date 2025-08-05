export default function Loading() {
  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-2 border-zen-200 border-t-zen-500 rounded-full animate-spin"></div>
        <p className="zen-text-secondary text-lg font-zen">
          Preparing your peaceful experience...
        </p>
      </div>
    </div>
  )
}