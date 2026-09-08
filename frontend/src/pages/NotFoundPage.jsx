import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-8xl font-bold text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-ink">Page not found</h1>
        <p className="mt-2 max-w-md text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/">
          <Button className="mt-8" size="lg">
            <Home className="h-4 w-4" /> Back to home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
