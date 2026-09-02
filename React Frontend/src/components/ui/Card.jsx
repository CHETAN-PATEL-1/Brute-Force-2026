// Placeholder — full implementation in Step 2
export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-card bg-surface shadow-card ${className}`}>
      {children}
    </div>
  )
}
