import { BookOpen, Calendar, GraduationCap, MapPin } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import opportunitiesData from '@/data/mentor/opportunities.json'
import menteesData from '@/data/mentor/mentees.json'

const opportunities = opportunitiesData.data.opportunities
const mentees = menteesData.data.mentees

export default function MentorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Mentor Dashboard</h1>
        <p className="text-sm text-ink-muted">Faculty opportunities, research collaborations, and mentee progress</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Open Opportunities" value={opportunities.length} icon={BookOpen} />
        <StatCard label="Active Mentees" value={mentees.length} icon={GraduationCap} />
        <StatCard label="Avg. Mentee Progress" value="65%" icon={GraduationCap} />
      </div>

      <Card id="opportunities">
        <CardHeader><CardTitle>Opportunities Feed</CardTitle></CardHeader>
        <CardBody className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <div key={opp.id} className="rounded-xl border border-brand-100 p-4 transition hover:border-brand-300 hover:shadow-card-hover">
              <Badge variant="outline">{opp.type}</Badge>
              <h4 className="mt-2 font-semibold text-ink">{opp.title}</h4>
              <p className="text-sm text-ink-muted">{opp.org}</p>
              <div className="mt-3 space-y-1 text-xs text-ink-subtle">
                <p className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {opp.location}</p>
                <p className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Deadline: {opp.deadline}</p>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card id="mentees">
        <CardHeader><CardTitle>My Mentees</CardTitle></CardHeader>
        <CardBody className="space-y-4">
          {mentees.map((m) => (
            <div key={m.id} className="rounded-xl bg-brand-50/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-ink">{m.name}</h4>
                  <p className="text-sm text-ink-muted">{m.project}</p>
                </div>
                <span className="text-sm text-ink-subtle">Last active {m.lastActive}</span>
              </div>
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-ink-muted">Progress</span>
                  <span className="font-medium text-brand-700">{m.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
