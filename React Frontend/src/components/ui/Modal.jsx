// Placeholder — full implementation in Step 2
export default function Modal({ children, open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="rounded-card bg-surface p-6 shadow-card" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
