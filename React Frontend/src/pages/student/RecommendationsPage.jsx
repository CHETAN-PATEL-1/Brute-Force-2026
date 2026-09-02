import { useState } from 'react'
import { MapPin, Filter } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { Card, CardBody } from '@/components/ui/Card'
import recommendationsData from '@/data/student/recommendations.json'

const allRecs = recommendationsData.data.recommendations
const TYPES = ['all', 'internship', 'job', 'course']

export default function RecommendationsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? allRecs : allRecs.filter((r) => r.type === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Recommendations</h1>
        <p className="text-sm text-ink-muted">Personalized internships, jobs, and courses based on your skill profile</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-ink-muted" />
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              filter === t ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((rec) => (
          <Card key={rec.id} hover>
            <CardBody>
              <div className="flex items-start justify-between">
                <Badge variant={rec.type === 'course' ? 'outline' : 'default'}>{rec.type}</Badge>
                <span className="text-lg font-bold text-brand-600">{rec.matchPercent}%</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-ink">{rec.title}</h3>
              <p className="text-sm text-ink-muted">{rec.company}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-ink-subtle">
                <MapPin className="h-3.5 w-3.5" />
                {rec.location}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {rec.skills.map((s) => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-brand-50 pt-3 text-sm">
                <span className="font-medium text-brand-700">{rec.stipend}</span>
                <span className="text-ink-subtle">{rec.duration}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
