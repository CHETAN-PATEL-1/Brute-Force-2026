import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { ROLE_LABELS } from '@/config/navConfig'
import { ROLES } from '@/store/useAppStore'

export default function SignupPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl border border-brand-100 bg-surface p-8 shadow-card"
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-ink">Create account</h1>
            <p className="text-xs text-ink-muted">Join the Academia–Industry ecosystem</p>
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/login')
          }}
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-button border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@institute.ac.in"
              className="w-full rounded-button border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label htmlFor="signup-role" className="mb-1.5 block text-sm font-medium text-ink">
              I am a
            </label>
            <select
              id="signup-role"
              className="w-full rounded-button border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {Object.values(ROLES).map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full" size="lg">
            Create Account (UI only)
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
