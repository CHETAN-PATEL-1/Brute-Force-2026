import { NavLink } from 'react-router-dom'
import {
  BarChart3,
  ClipboardCheck,
  FileCheck,
  LayoutDashboard,
  Sparkles,
  UserCircle,
} from 'lucide-react'
import { NAV_ITEMS } from '@/config/navConfig'
import { cn } from '@/lib/cn'

const ICONS = {
  LayoutDashboard,
  ClipboardCheck,
  Sparkles,
  FileCheck,
  UserCircle,
  BarChart3,
}

export default function MobileNav({ role }) {
  const items = (NAV_ITEMS[role] ?? []).slice(0, 5)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-brand-100 bg-surface/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const Icon = ICONS[item.icon] ?? LayoutDashboard
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={!item.path.includes('#')}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition',
                  isActive ? 'text-brand-600' : 'text-ink-subtle',
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span className="max-w-[56px] truncate">{item.label.split(' ')[0]}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
