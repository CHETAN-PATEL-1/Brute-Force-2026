import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function DashboardLayout({ role, children }) {
  return (
    <div className="flex min-h-screen bg-surface-muted">
      <Sidebar role={role} />
      <div className="flex min-h-screen flex-1 flex-col pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <MobileNav role={role} />
      </div>
    </div>
  )
}
