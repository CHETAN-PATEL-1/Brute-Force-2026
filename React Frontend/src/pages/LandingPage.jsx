import { motion } from 'framer-motion'
import { ArrowRight, Building2, GraduationCap, Landmark, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { PublicNavbar } from '@/components/layout/Navbar'
import { ROLES } from '@/store/useAppStore'

const ROLES_CARDS = [
  {
    role: ROLES.STUDENT,
    title: 'Student',
    description: 'Assess skills, discover internships, track applications, build your portfolio.',
    icon: GraduationCap,
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    role: ROLES.INDUSTRY,
    title: 'Industry / Company',
    description: 'Post opportunities, discover matched candidates, manage recruitment pipeline.',
    icon: Building2,
    gradient: 'from-purple-500 to-fuchsia-700',
  },
  {
    role: ROLES.MENTOR,
    title: 'Academician / Mentor',
    description: 'Explore FDPs, faculty internships, research collaborations, mentor students.',
    icon: Users,
    gradient: 'from-indigo-500 to-purple-700',
  },
  {
    role: ROLES.ADMIN,
    title: 'Institution / Admin',
    description: 'Monitor skill development, placement progress, and industry demand trends.',
    icon: Landmark,
    gradient: 'from-purple-600 to-violet-900',
  },
]

const STATS = [
  { value: '1,240+', label: 'Students mapped' },
  { value: '180+', label: 'Industry partners' },
  { value: '78%', label: 'Placement rate' },
  { value: '450+', label: 'Active internships' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient pb-24 pt-32 text-white md:pb-32 md:pt-40">
        <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <PublicNavbar />

        <div className="relative mx-auto max-w-6xl px-6 text-center md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-purple-100 backdrop-blur-sm">
              Smart India Hackathon · SIH26044 · Ministry of AYUSH
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Academia–Industry
              <br />
              <span className="text-purple-200">Collaboration Portal</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-purple-100/90 md:text-lg">
              Connect students, industries, academicians, and institutions on one platform —
              skill assessment, smart matching, internships, placements, and analytics.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-button bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-purple-50"
              >
                Choose your role
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-button border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Login to demo
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-5 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-purple-200 md:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role picker */}
      <section id="roles" className="relative -mt-12 px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">Continue as</h2>
            <p className="mt-2 text-ink-muted">Select your role to explore a personalized dashboard</p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {ROLES_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <motion.button
                  key={card.role}
                  type="button"
                  variants={item}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => navigate(`/login?role=${card.role}`)}
                  className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-surface p-6 text-left shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-md`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink group-hover:text-brand-700">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Enter portal <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t border-brand-100 bg-surface px-6 py-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-ink">One platform, four ecosystems</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Skill First Matching', desc: 'Opportunities driven by competencies, not just degrees.' },
              { title: 'End-to-End Tracking', desc: 'From assessment to application to placement — all in one place.' },
              { title: 'Data-Driven Insights', desc: 'Institution analytics aligned with industry skill demand.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-brand-50 bg-brand-50/40 p-6">
                <h3 className="font-semibold text-brand-800">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
