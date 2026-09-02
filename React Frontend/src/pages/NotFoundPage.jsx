import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-2 text-ink-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-button bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
      >
        Back to home
      </Link>
    </div>
  )
}
