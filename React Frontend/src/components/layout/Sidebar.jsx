import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  LayoutDashboard,
  PlusCircle,
  Sparkles,
  TrendingUp,
  UserCircle,
  Users,
  Brain,
} from 'lucide-react'
import { NAV_ITEMS } from '@/config/navConfig'
import { cn } from '@/lib/cn'

const ICONS = {
  LayoutDashboard,
  ClipboardCheck,
  Sparkles,
  FileCheck,
  UserCircle,
  PlusCircle,
  Users,
  BookOpen,
  GraduationCap,
  BarChart3,
  TrendingUp,
  Brain,
}

export default function Sidebar({ role }) {
  const items = NAV_ITEMS[role] ?? []

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-brand-100/80 bg-surface md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-brand-50 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">AIC Portal</p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-brand-500">
            Skill · Match · Grow
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={!item.path.includes('#')}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-ink-muted hover:bg-brand-50 hover:text-brand-700',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="m-4 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
        <p className="text-xs font-medium text-purple-200">Demo Mode</p>
        <p className="mt-1 text-sm font-semibold">No backend yet</p>
        <p className="mt-1 text-xs text-purple-200/80">Mock data simulates API responses</p>
      </div>
    </aside>
  )
}
