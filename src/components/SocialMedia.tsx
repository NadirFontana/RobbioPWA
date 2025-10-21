export default function MediaSocial() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Social & Media
      </h1>

      {/* Galleria placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-300 text-sm font-medium"
          >
            Placeholder {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
