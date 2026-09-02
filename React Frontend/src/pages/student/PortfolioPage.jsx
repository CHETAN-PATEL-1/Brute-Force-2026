import { Award, Briefcase, Code, Mail, MapPin } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import profileData from '@/data/student/profile.json'
import skillsData from '@/data/student/skills.json'

const profile = profileData.data.profile
const skills = skillsData.data.skills

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Hero profile card */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white shadow-glow">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur-sm">
            AS
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-purple-200">{profile.department} · {profile.year}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm text-purple-100 sm:justify-start">
              <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {profile.email}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> NIT Delhi</span>
            </div>
          </div>
          <div className="sm:ml-auto sm:text-right">
            <p className="text-3xl font-bold">{profile.skillScore}</p>
            <p className="text-sm text-purple-200">Skill Score</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-ink">{s.name}</span>
                  <span className="text-ink-muted">{s.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Code className="h-5 w-5 text-brand-600" /> Projects</CardTitle></CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div className="rounded-xl bg-brand-50/60 p-3">
              <p className="font-medium text-ink">Ayurveda Knowledge Graph</p>
              <p className="text-ink-muted">NLP pipeline for Sanskrit herb texts</p>
            </div>
            <div className="rounded-xl bg-brand-50/60 p-3">
              <p className="font-medium text-ink">Campus Placement Tracker</p>
              <p className="text-ink-muted">React dashboard for T&P cell</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-brand-600" /> Achievements</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            <Badge variant="success">Smart India Hackathon 2026 — Finalist</Badge>
            <Badge variant="default">NPTEL ML Certificate — Elite</Badge>
            <Badge variant="outline">Campus Ambassador — SkillBridge India</Badge>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-brand-600" /> Experience</CardTitle></CardHeader>
        <CardBody className="text-sm text-ink-muted">
          <p><strong className="text-ink">Research Intern</strong> — AIIA Collaboration Hub (Summer 2025)</p>
          <p className="mt-2"><strong className="text-ink">Campus Ambassador</strong> — SkillBridge India (2025–26)</p>
        </CardBody>
      </Card>
    </div>
  )
}
