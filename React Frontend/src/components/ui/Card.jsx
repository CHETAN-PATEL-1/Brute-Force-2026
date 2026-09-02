import { cn } from '@/lib/cn'

export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-card border border-brand-100/60 bg-surface shadow-card',
        hover && 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={cn('border-b border-brand-50 px-6 py-4', className)}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={cn('text-lg font-semibold text-ink', className)}>{children}</h3>
}

export default Card
