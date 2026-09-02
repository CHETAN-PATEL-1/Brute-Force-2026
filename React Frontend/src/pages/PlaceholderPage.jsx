export default function PlaceholderPage({ title, description }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      <p className="mt-2 max-w-md text-ink-muted">{description}</p>
      <span className="mt-4 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
        Coming in a future step
      </span>
    </div>
  )
}
