import { cn } from '@/lib/cn'

export default function StatCard({ label, value, sub, icon: Icon, trend, className = '' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-brand-100/60 bg-surface p-5 shadow-card transition hover:shadow-card-hover',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-muted">{label}</p>
          <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          {sub && <p className="mt-1 text-xs text-ink-subtle">{sub}</p>}
          {trend && (
            <p className={cn('mt-1 text-xs font-medium', trend.positive ? 'text-success' : 'text-danger')}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}
