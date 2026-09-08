import { useState, useEffect } from 'react'
import { MapPin, Filter, Sparkles, AlertCircle, RefreshCw, CheckCircle2, ChevronRight, Info } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'
import recommendationsData from '@/data/student/recommendations.json'
import { getMatchingRecommendations } from '@/services/aiApi'

const fallbackRecs = recommendationsData.data.recommendations
const TYPES = ['all', 'internship', 'job']

export default function RecommendationsPage() {
  const [filter, setFilter] = useState('all')
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeExplainId, setActiveExplainId] = useState(null)

  const fetchMatches = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMatchingRecommendations('stu-001')
      if (data && data.matches && data.matches.length > 0) {
        setMatches(data.matches)
      } else {
        setMatches([])
      }
    } catch (err) {
      console.warn('Backend matching offline, using fallback catalog:', err)
      setError(err.message || 'Connecting to backend...')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  // Filter backend matches or fallback
  const displayItems = matches.length > 0 ? matches : fallbackRecs
  const filtered = filter === 'all'
    ? displayItems
    : displayItems.filter((r) => (r.type || 'internship').toLowerCase() === filter.toLowerCase())

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-ink">Smart Recommendations</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
              <Sparkles className="h-3 w-3" />
              Explainable AI
            </span>
          </div>
          <p className="text-sm text-ink-muted mt-1">
            Hybrid matching: 60% semantic similarity (Ollama vectors) + 40% keyword skill overlap.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchMatches}
          disabled={loading}
          className="text-xs gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Matches
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-xs text-brand-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-brand-600 shrink-0" />
            <span>Showing catalog opportunities. Start backend on port 8080 to enable live MongoDB embeddings.</span>
          </div>
          <button onClick={fetchMatches} className="font-semibold underline hover:text-brand-900">
            Retry
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-ink-muted" />
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
              filter === t
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Sparkles className="h-6 w-6 animate-spin" />
          </div>
          <p className="mt-4 text-sm font-semibold text-ink">Calculating AI match scores...</p>
          <p className="text-xs text-ink-muted mt-1">
            Running cosine similarity against MongoDB job postings via local Ollama engine.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((rec) => {
            const isLive = !!rec.postingId
            const matchScore = isLive
              ? Math.round((rec.finalScore || 0) * 100)
              : rec.matchPercent || 75
            const title = rec.title
            const type = rec.type || 'internship'
            const id = rec.postingId || rec.id

            return (
              <Card key={id} hover className="flex flex-col justify-between">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <Badge variant={type === 'job' ? 'default' : 'outline'} className="capitalize">
                      {type}
                    </Badge>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-extrabold text-brand-700">{matchScore}%</span>
                      <span className="text-xs font-medium text-ink-muted">Match</span>
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-ink">{title}</h3>
                  <p className="text-sm text-ink-muted">{rec.company || 'Industry Partner'}</p>

                  <div className="mt-2 flex items-center gap-1 text-xs text-ink-subtle">
                    <MapPin className="h-3.5 w-3.5" />
                    {rec.location || 'Remote / Hybrid'}
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 space-y-2">
                    {isLive && rec.matchedSkills && rec.matchedSkills.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-700 uppercase">Matched Skills:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {rec.matchedSkills.map((s) => (
                            <Badge key={s} variant="success" className="text-xs">
                              ✓ {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {isLive && rec.missingSkills && rec.missingSkills.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-amber-700 uppercase">Skills to Acquire:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {rec.missingSkills.map((s) => (
                            <Badge key={s} variant="warning" className="text-xs">
                              + {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isLive && rec.skills && (
                      <div className="flex flex-wrap gap-1.5">
                        {rec.skills.map((s) => (
                          <Badge key={s} variant="outline">{s}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Explainable AI breakdown accordion */}
                  {isLive && (
                    <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50/40 p-3 text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveExplainId(activeExplainId === id ? null : id)}
                        className="flex w-full items-center justify-between font-semibold text-brand-800 hover:text-brand-950"
                      >
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-brand-600" />
                          Why this match? (Explainable AI)
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${activeExplainId === id ? 'rotate-90' : ''}`}
                        />
                      </button>

                      {activeExplainId === id && (
                        <div className="mt-2.5 space-y-1.5 border-t border-brand-100 pt-2 text-ink-muted">
                          <div className="flex justify-between">
                            <span>Semantic Similarity (60% weight):</span>
                            <strong className="text-ink">
                              {rec.semanticScore != null ? `${Math.round(rec.semanticScore * 100)}%` : 'Pending'}
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Keyword Overlap (40% weight):</span>
                            <strong className="text-ink">
                              {Math.round(rec.keywordScore * 100)}%
                            </strong>
                          </div>
                          <p className="mt-1 text-[11px] text-ink-subtle">
                            Calculated using 768-dim nomic-embed-text vectors + Jaccard coefficient.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-brand-50 pt-3 text-sm">
                    <span className="font-semibold text-brand-700">{rec.stipend || 'Competitive'}</span>
                    <Button size="sm" className="text-xs">
                      Apply Now
                    </Button>
                  </div>
                </CardBody>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
