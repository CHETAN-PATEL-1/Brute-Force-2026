import Badge from '@/components/ui/Badge'
import { Card, CardBody } from '@/components/ui/Card'
import applicationsData from '@/data/student/applications.json'

const STAGES = ['applied', 'shortlisted', 'interview', 'selected']
const STAGE_LABELS = {
  applied: 'Applied',
  shortlisted: 'Shortlisted',
  interview: 'Interview',
  selected: 'Selected',
}
const STAGE_VARIANTS = {
  applied: 'outline',
  shortlisted: 'warning',
  interview: 'default',
  selected: 'success',
}

export default function ApplicationTrackerPage() {
  const applications = applicationsData.data.applications

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Application Tracker</h1>
        <p className="text-sm text-ink-muted">Track your journey from application to selection</p>
      </div>

      {/* Pipeline visual */}
      <div className="flex flex-wrap items-center gap-2">
        {STAGES.map((stage, i) => (
          <div key={stage} className="flex items-center gap-2">
            <div className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              {STAGE_LABELS[stage]}
            </div>
            {i < STAGES.length - 1 && <span className="text-brand-300">→</span>}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id} hover>
            <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-ink">{app.title}</h3>
                <p className="text-sm text-ink-muted">{app.company}</p>
                <p className="mt-1 text-xs text-ink-subtle">Applied {app.appliedAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-brand-600">{app.matchPercent}% match</span>
                <Badge variant={STAGE_VARIANTS[app.status]}>{STAGE_LABELS[app.status]}</Badge>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
