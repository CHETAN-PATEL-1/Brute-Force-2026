import { ROLES } from '@/store/useAppStore'

export const ROLE_LABELS = {
  [ROLES.STUDENT]: 'Student',
  [ROLES.INDUSTRY]: 'Industry',
  [ROLES.MENTOR]: 'Mentor',
  [ROLES.ADMIN]: 'Institution',
}

export const NAV_ITEMS = {
  [ROLES.STUDENT]: [
    { label: 'Dashboard', path: '/student', icon: 'LayoutDashboard' },
    { label: 'Skill Assessment', path: '/student/assessment', icon: 'ClipboardCheck' },
    { label: 'Recommendations', path: '/student/recommendations', icon: 'Sparkles' },
    { label: 'Applications', path: '/student/applications', icon: 'FileCheck' },
    { label: 'Portfolio', path: '/student/portfolio', icon: 'UserCircle' },
  ],
  [ROLES.INDUSTRY]: [
    { label: 'Dashboard', path: '/industry', icon: 'LayoutDashboard' },
    { label: 'Post Listing', path: '/industry#post', icon: 'PlusCircle' },
    { label: 'Applicants', path: '/industry#applicants', icon: 'Users' },
  ],
  [ROLES.MENTOR]: [
    { label: 'Dashboard', path: '/mentor', icon: 'LayoutDashboard' },
    { label: 'Opportunities', path: '/mentor#opportunities', icon: 'BookOpen' },
    { label: 'My Mentees', path: '/mentor#mentees', icon: 'GraduationCap' },
  ],
  [ROLES.ADMIN]: [
    { label: 'Analytics', path: '/admin', icon: 'BarChart3' },
    { label: 'Placements', path: '/admin#placements', icon: 'TrendingUp' },
    { label: 'Skill Trends', path: '/admin#skills', icon: 'Brain' },
  ],
}

export const ROLE_HOME = {
  [ROLES.STUDENT]: '/student',
  [ROLES.INDUSTRY]: '/industry',
  [ROLES.MENTOR]: '/mentor',
  [ROLES.ADMIN]: '/admin',
}
