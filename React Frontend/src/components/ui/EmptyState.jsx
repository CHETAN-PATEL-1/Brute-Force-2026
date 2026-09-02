import { Inbox } from 'lucide-react'
import Button from './Button'

export default function EmptyState({ title, description, actionLabel, onAction, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
        <Icon className="h-7 w-7" />
      </div>
      <p className="text-lg font-semibold text-ink">{title}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-ink-muted">{description}</p>}
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
