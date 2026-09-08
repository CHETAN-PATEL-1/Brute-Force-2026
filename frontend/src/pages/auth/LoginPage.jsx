import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import { ROLE_LABELS, ROLE_HOME } from '@/config/navConfig'
import { useAppStore, ROLES } from '@/store/useAppStore'

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const loginDemo = useAppStore((s) => s.loginDemo)
  const [selectedRole, setSelectedRole] = useState(searchParams.get('role') ?? ROLES.STUDENT)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam && Object.values(ROLES).includes(roleParam)) {
      setSelectedRole(roleParam)
    }
  }, [searchParams])

  const handleDemoLogin = (e) => {
    e.preventDefault()
    loginDemo(selectedRole)
    navigate(ROLE_HOME[selectedRole])
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 overflow-hidden bg-hero-gradient lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold text-white">Skill Genz</p>
            <p className="text-xs text-purple-200">Ministry of AYUSH · AIIA</p>
          </div>
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold leading-snug text-white">
            Bridging academia,
            <br />
            students & industry
          </h2>
          <p className="mt-4 max-w-md text-purple-100/80">
            Skill mapping, smart recommendations, and placement analytics — built for SIH26044.
          </p>
        </div>
        <p className="relative text-xs text-purple-300">© 2026 Skill Genz</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <p className="font-bold text-ink">Skill Genz</p>
          </div>

          <h1 className="text-2xl font-bold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-muted">Sign in to your {ROLE_LABELS[selectedRole]} dashboard</p>

          <form onSubmit={handleDemoLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-ink">
                Continue as
              </label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-button border border-brand-200 bg-surface px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              >
                {Object.values(ROLES).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@institute.ac.in"
                className="w-full rounded-button border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-button border border-brand-200 px-4 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Enter Demo Dashboard
            </Button>

            <p className="text-center text-xs text-ink-subtle">
              No backend yet — demo login uses mock data stored in localStorage
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-ink-muted">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-medium text-brand-600 hover:text-brand-700">
              Sign up
            </Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/" className="text-ink-subtle hover:text-brand-600">
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
