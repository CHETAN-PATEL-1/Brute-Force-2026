import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAppStore } from '@/store/useAppStore'

import LandingPage from '@/pages/LandingPage'
import NotFoundPage from '@/pages/NotFoundPage'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import StudentDashboard from '@/pages/student/StudentDashboard'
import SkillAssessmentPage from '@/pages/student/SkillAssessmentPage'
import RecommendationsPage from '@/pages/student/RecommendationsPage'
import ApplicationTrackerPage from '@/pages/student/ApplicationTrackerPage'
import PortfolioPage from '@/pages/student/PortfolioPage'
import IndustryDashboard from '@/pages/industry/IndustryDashboard'
import MentorDashboard from '@/pages/mentor/MentorDashboard'
import AdminDashboard from '@/pages/admin/AdminDashboard'

function RoleLayout({ allowedRole, children }) {
  const role = useAppStore((s) => s.role)
  return (
    <ProtectedRoute allowedRole={allowedRole}>
      <DashboardLayout role={role}>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />

        {/* Student routes */}
        <Route
          path="/student"
          element={
            <RoleLayout allowedRole="student">
              <StudentDashboard />
            </RoleLayout>
          }
        />
        <Route
          path="/student/assessment"
          element={
            <RoleLayout allowedRole="student">
              <SkillAssessmentPage />
            </RoleLayout>
          }
        />
        <Route
          path="/student/recommendations"
          element={
            <RoleLayout allowedRole="student">
              <RecommendationsPage />
            </RoleLayout>
          }
        />
        <Route
          path="/student/applications"
          element={
            <RoleLayout allowedRole="student">
              <ApplicationTrackerPage />
            </RoleLayout>
          }
        />
        <Route
          path="/student/portfolio"
          element={
            <RoleLayout allowedRole="student">
              <PortfolioPage />
            </RoleLayout>
          }
        />

        {/* Industry routes */}
        <Route
          path="/industry"
          element={
            <RoleLayout allowedRole="industry">
              <IndustryDashboard />
            </RoleLayout>
          }
        />

        {/* Mentor routes */}
        <Route
          path="/mentor"
          element={
            <RoleLayout allowedRole="mentor">
              <MentorDashboard />
            </RoleLayout>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <RoleLayout allowedRole="admin">
              <AdminDashboard />
            </RoleLayout>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
