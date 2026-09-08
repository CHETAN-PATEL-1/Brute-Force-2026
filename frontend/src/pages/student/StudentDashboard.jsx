import { Link } from 'react-router-dom'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { ArrowRight, Award, Briefcase, Target, TrendingUp } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import profileData from '@/data/student/profile.json'
import skillsData from '@/data/student/skills.json'
import recommendationsData from '@/data/student/recommendations.json'
import applicationsData from '@/data/student/applications.json'
import { tokens } from '@/theme/tokens'

const profile = profileData.data.profile
const skills = skillsData.data.skills
const recommendations = recommendationsData.data.recommendations.slice(0, 3)
const applications = applicationsData.data.applications

const STATUS_LABELS = {
  applied: { label: 'Applied', variant: 'outline' },
  shortlisted: { label: 'Shortlisted', variant: 'warning' },
  interview: { label: 'Interview', variant: 'default' },
  selected: { label: 'Selected', variant: 'success' },
}

export default function StudentDashboard() {
  const radarData = skills.slice(0, 6).map((s) => ({ skill: s.name, level: s.level }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Welcome back, {profile.name.split(' ')[0]} 👋</h1>
        <p className="mt-1 text-sm text-ink-muted">{profile.department} · {profile.year}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Skill Score" value={`${profile.skillScore}/100`} icon={Target} trend={{ positive: true, value: '+5 this month' }} />
        <StatCard label="Readiness" value="Intermediate" sub={profile.readiness} icon={TrendingUp} />
        <StatCard label="Applications" value={applications.length} sub="Active tracking" icon={Briefcase} />
        <StatCard label="Top Match" value="87%" sub="AyurTech Labs internship" icon={Award} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skill Profile</CardTitle>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e9d5ff" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: tokens.colors.inkMuted }} />
                <Radar dataKey="level" stroke={tokens.colors.brand} fill={tokens.colors.brand} fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Gaps to Close</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {profile.skillGaps.map((gap) => (
              <div key={gap} className="flex items-center justify-between rounded-xl bg-brand-50/60 px-4 py-3">
                <span className="text-sm font-medium text-ink">{gap}</span>
                <Badge variant="warning">Gap</Badge>
              </div>
            ))}
            <Link to="/student/assessment">
              <Button variant="outline" className="mt-2 w-full">
                Retake Assessment
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recommended for You</CardTitle>
          <Link to="/student/recommendations" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            View all →
          </Link>
        </CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-brand-100 p-4 transition hover:border-brand-300 hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <Badge variant={rec.type === 'internship' ? 'default' : 'outline'}>{rec.type}</Badge>
                <span className="text-sm font-bold text-brand-600">{rec.matchPercent}% match</span>
              </div>
              <h4 className="mt-2 font-semibold text-ink">{rec.title}</h4>
              <p className="text-sm text-ink-muted">{rec.company}</p>
              <p className="mt-1 text-xs text-ink-subtle">{rec.location} · {rec.duration}</p>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Application Pipeline</CardTitle>
          <Link to="/student/applications">
            <Button variant="ghost" size="sm">
              Track all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={[
                { stage: 'Applied', count: applications.filter((a) => a.status === 'applied').length },
                { stage: 'Shortlisted', count: applications.filter((a) => a.status === 'shortlisted').length },
                { stage: 'Interview', count: applications.filter((a) => a.status === 'interview').length },
                { stage: 'Selected', count: applications.filter((a) => a.status === 'selected').length },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill={tokens.colors.brand} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {applications.slice(0, 2).map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg bg-brand-50/50 px-3 py-2 text-sm">
                <span className="font-medium text-ink">{app.title}</span>
                <Badge variant={STATUS_LABELS[app.status]?.variant ?? 'default'}>
                  {STATUS_LABELS[app.status]?.label ?? app.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
