import { cn } from '@/lib/cn'

export default function Skeleton({ className = '' }) {
  return <div className={cn('shimmer rounded-lg bg-brand-100/40', className)} aria-hidden="true" />
}
