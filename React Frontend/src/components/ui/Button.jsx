// Placeholder — full implementation in Step 2
export default function Button({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`rounded-button bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
