import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

// Role-aware dashboard shell — conditionally renders role-specific nav in Step 4
export default function DashboardLayout({ role, children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar role={role} />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <MobileNav />
      </div>
    </div>
  )
}
