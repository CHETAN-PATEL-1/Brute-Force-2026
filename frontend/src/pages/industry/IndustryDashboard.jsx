import { Briefcase, Plus, TrendingUp, Users } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import postingsData from '@/data/industry/postings.json'
import applicantsData from '@/data/industry/applicants.json'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { tokens } from '@/theme/tokens'

const postings = postingsData.data.postings
const applicants = applicantsData.data.applicants

export default function IndustryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Industry Dashboard</h1>
          <p className="text-sm text-ink-muted">Manage postings, applicants, and recruitment analytics</p>
        </div>
        <Button><Plus className="h-4 w-4" /> Post New Listing</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Postings" value={postings.length} icon={Briefcase} />
        <StatCard label="Total Applicants" value={applicants.length + 95} icon={Users} />
        <StatCard label="Avg. Match Score" value="84%" icon={TrendingUp} trend={{ positive: true, value: '+3% vs last month' }} />
        <StatCard label="Shortlisted" value="12" sub="Across all roles" icon={Users} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card id="post">
          <CardHeader><CardTitle>Active Postings</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            {postings.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border border-brand-100 p-4">
                <div>
                  <h4 className="font-semibold text-ink">{p.title}</h4>
                  <p className="text-xs text-ink-muted">{p.applicants} applicants · Posted {p.postedAt}</p>
                </div>
                <Badge variant="success">{p.status}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card id="applicants">
          <CardHeader><CardTitle>Top Applicants</CardTitle></CardHeader>
          <CardBody className="space-y-3">
            {applicants.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-brand-50/50 p-4">
                <div>
                  <h4 className="font-semibold text-ink">{a.name}</h4>
                  <p className="text-xs text-ink-muted">{a.role}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {a.skills.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-600">{a.matchPercent}%</p>
                  <Badge variant={a.status === 'interview' ? 'default' : 'warning'}>{a.status}</Badge>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Applicants per Posting</CardTitle></CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={postings.map((p) => ({ name: p.title.split(' ')[0], applicants: p.applicants }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="applicants" fill={tokens.colors.brandDark} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}
