import { Link } from 'react-router-dom'
import {
  Bell,
  GraduationCap,
  LogOut,
  Search,
  Sparkles,
} from 'lucide-react'
import { useAppStore, ROLES } from '@/store/useAppStore'
import { ROLE_LABELS } from '@/config/navConfig'
import { cn } from '@/lib/cn'

export default function Navbar() {
  const { mockUser, role, loginDemo, logout } = useAppStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-brand-100/80 bg-surface/90 px-4 backdrop-blur-md md:px-6">
      <Link to="/" className="flex items-center gap-2 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
          <GraduationCap className="h-4 w-4" />
        </div>
      </Link>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle" />
        <input
          type="search"
          placeholder="Search opportunities, skills, mentors..."
          className="w-full rounded-button border border-brand-100 bg-brand-50/50 py-2 pl-10 pr-4 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        {/* Demo role switcher */}
        <select
          value={role ?? ''}
          onChange={(e) => {
            if (e.target.value) loginDemo(e.target.value)
          }}
          className="hidden rounded-button border border-brand-200 bg-brand-50 px-2 py-1.5 text-xs font-medium text-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-300 sm:block"
          aria-label="Switch demo role"
        >
          <option value="" disabled>
            Switch role
          </option>
          {Object.values(ROLES).map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="relative rounded-button p-2 text-ink-muted hover:bg-brand-50 hover:text-brand-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" />
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
            {mockUser?.avatar ?? 'U'}
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-ink">{mockUser?.name ?? 'Demo User'}</p>
            <p className="text-xs text-ink-muted">{ROLE_LABELS[role] ?? 'Guest'}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="rounded-button p-2 text-ink-muted hover:bg-red-50 hover:text-danger"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export function PublicNavbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 md:px-10">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Skill Genz</p>
          <p className="text-xs text-purple-200">SIH26044 · Ministry of AYUSH</p>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className={cn(
            'rounded-button px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10',
          )}
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="rounded-button bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
        >
          Get Started
        </Link>
      </div>
    </header>
  )
}
