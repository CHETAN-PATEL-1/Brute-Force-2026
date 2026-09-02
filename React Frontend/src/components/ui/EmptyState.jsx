// Placeholder — full implementation in Step 2
export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-lg font-medium text-ink">{title}</p>
      {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
    </div>
  )
}
