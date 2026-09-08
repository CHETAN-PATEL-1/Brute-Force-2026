import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Sparkles, AlertCircle, RefreshCw, Compass, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import profileData from '@/data/student/profile.json'
import { getSkillGapSuggestions } from '@/services/aiApi'

const TARGET_ROLES = [
  { id: 'data-engineer', title: 'Junior Data Engineer', reqs: ['SQL', 'Python', 'Apache Spark', 'AWS'] },
  { id: 'fullstack', title: 'Full Stack Developer', reqs: ['React', 'Node.js', 'MongoDB', 'REST APIs'] },
  { id: 'aiml', title: 'AI & Machine Learning Engineer', reqs: ['Python', 'PyTorch', 'Data Analysis', 'NLP'] },
  { id: 'cloud', title: 'Cloud & DevOps Engineer', reqs: ['AWS', 'Docker', 'Linux', 'CI/CD'] },
]

const QUESTIONS = [
  {
    id: 1,
    skill: 'Python',
    question: 'How comfortable are you with Python for data analysis and backend systems?',
    options: [
      { label: 'Beginner (Basic syntax, simple scripts)', level: 40 },
      { label: 'Intermediate (Pandas, APIs, OOP)', level: 70 },
      { label: 'Advanced (Large datasets, optimization)', level: 85 },
      { label: 'Expert (Architecting production pipelines)', level: 95 },
    ],
  },
  {
    id: 2,
    skill: 'React & Frontend',
    question: 'Rate your experience building responsive frontend applications with React.',
    options: [
      { label: 'Limited (HTML/CSS basics only)', level: 35 },
      { label: 'Some experience (Basic components, useState)', level: 60 },
      { label: 'Regular (Custom hooks, Tailwind, API integration)', level: 80 },
      { label: 'Lead projects (Full-scale production SPAs)', level: 95 },
    ],
  },
  {
    id: 3,
    skill: 'Cloud & DevOps',
    question: 'How familiar are you with cloud platforms (AWS/GCP) and containerization?',
    options: [
      { label: 'Not familiar (Never deployed to cloud)', level: 25 },
      { label: 'Basics (Used EC2 or S3 bucket)', level: 45 },
      { label: 'Hands-on (Docker containers, CI/CD pipelines)', level: 75 },
      { label: 'Production-ready (Kubernetes, Terraform, Microservices)', level: 90 },
    ],
  },
  {
    id: 4,
    skill: 'Databases & SQL',
    question: 'How proficient are you in querying and modeling relational and NoSQL databases?',
    options: [
      { label: 'Basic CRUD queries only', level: 40 },
      { label: 'Joins, aggregations, MongoDB/Postgres usage', level: 70 },
      { label: 'Indexing, query optimization, complex schemas', level: 85 },
      { label: 'Distributed databases, sharding, replication', level: 95 },
    ],
  },
  {
    id: 5,
    skill: 'Communication & Leadership',
    question: 'How would you rate your teamwork, presentation, and collaboration skills?',
    options: [
      { label: 'Needs work (Prefer individual tasks)', level: 50 },
      { label: 'Average (Active participant in team discussions)', level: 70 },
      { label: 'Good (Can present tech solutions and lead teams)', level: 85 },
      { label: 'Excellent (Demonstrated leadership in hackathons/clubs)', level: 95 },
    ],
  },
]

export default function SkillAssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0])
  const [done, setDone] = useState(false)

  // AI Skill-gap state
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)
  const [aiResults, setAiResults] = useState(null)
  const [isCached, setIsCached] = useState(false)

  const profile = profileData.data.profile
  const current = QUESTIONS[step]
  const progress = ((step + (done ? 1 : 0)) / QUESTIONS.length) * 100

  const handleAnswer = (option) => {
    const nextAnswers = { ...answers, [current.id]: option }
    setAnswers(nextAnswers)

    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setDone(true)
      fetchAiSuggestions(nextAnswers, targetRole)
    }
  }

  const fetchAiSuggestions = async (userAnswers, role) => {
    setAiLoading(true)
    setAiError(null)

    // Build current skills payload from answers
    const currentSkills = QUESTIONS.map((q) => ({
      skill: q.skill,
      level: (userAnswers[q.id]?.level || 50) * 1.0,
    }))

    try {
      const response = await getSkillGapSuggestions({
        studentId: 'stu-001',
        targetRole: role.title,
        postingId: role.id,
        targetRequirements: role.reqs,
        currentSkills,
      })

      setAiResults(response.improvementAreas || [])
      setIsCached(response.cached || false)
    } catch (err) {
      console.error('Skill gap AI error:', err)
      setAiError(err.message || 'Unable to connect to Skill Genz AI service.')
    } finally {
      setAiLoading(false)
    }
  }

  const handleRoleChange = (role) => {
    setTargetRole(role)
    if (done) {
      fetchAiSuggestions(answers, role)
    }
  }

  if (done) {
    // Calculate aggregate score
    const scores = Object.values(answers).map((a) => a.level)
    const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 75

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl space-y-6"
      >
        <Card>
          <CardBody className="p-8 text-center sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-ink">Assessment Complete!</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Your skill profile has been mapped against industry standards.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-brand-50/70 p-4 border border-brand-100">
                <p className="text-xs font-semibold uppercase text-brand-700">Calculated Score</p>
                <p className="text-3xl font-bold text-ink">{avgScore}/100</p>
              </div>
              <div className="rounded-xl bg-brand-50/70 p-4 border border-brand-100">
                <p className="text-xs font-semibold uppercase text-brand-700">Industry Readiness</p>
                <p className="text-lg font-bold text-ink">
                  {avgScore >= 80 ? 'Placement Ready' : avgScore >= 60 ? 'Internship Ready' : 'Foundation Level'}
                </p>
              </div>
              <div className="rounded-xl bg-brand-50/70 p-4 border border-brand-100">
                <p className="text-xs font-semibold uppercase text-brand-700">Target Role</p>
                <p className="text-sm font-bold text-ink truncate">{targetRole.title}</p>
              </div>
            </div>

            {/* Target Role Selector */}
            <div className="mt-6 border-t border-brand-100 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <label className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-brand-600" />
                  Evaluate against target role:
                </label>
                {isCached && (
                  <span className="text-xs text-brand-700 bg-brand-100 px-2 py-0.5 rounded-full font-medium">
                    ⚡ Instant cached response
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {TARGET_ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                      targetRole.id === r.id
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200'
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* AI Skill Gap Recommendations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">Skill Genz AI Gap Analysis</CardTitle>
                <p className="text-xs text-ink-muted">Personalized insights powered by local Ollama AI</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchAiSuggestions(answers, targetRole)}
              disabled={aiLoading}
              className="text-xs gap-1"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
              Re-analyze
            </Button>
          </CardHeader>
          <CardBody>
            {aiLoading ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 animate-pulse">
                  <Sparkles className="h-6 w-6 animate-spin" />
                </div>
                <h4 className="mt-4 font-semibold text-ink">Skill Genz AI is analyzing your profile...</h4>
                <p className="mt-1 text-xs text-ink-muted">
                  Comparing your competencies with industry benchmarks for {targetRole.title}.
                </p>
              </div>
            ) : aiError ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800">AI Service Notice</h4>
                    <p className="mt-1 text-xs text-amber-700">{aiError}</p>
                    <p className="mt-2 text-xs text-ink-muted">
                      Default skill gaps: <strong>{profile.skillGaps.join(', ')}</strong>
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 text-xs"
                      onClick={() => fetchAiSuggestions(answers, targetRole)}
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            ) : aiResults && aiResults.length > 0 ? (
              <div className="space-y-4">
                {aiResults.map((area, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-brand-100 bg-surface p-4 shadow-sm transition hover:border-brand-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                          {idx + 1}
                        </span>
                        <h4 className="font-semibold text-ink">{area.skill}</h4>
                      </div>
                      <Badge variant="warning">Improvement Area</Badge>
                    </div>
                    <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                      <strong className="text-ink">Why it matters:</strong> {area.why}
                    </p>
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-brand-50/60 p-2.5 text-xs text-brand-900 border border-brand-100/50">
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 mt-0.5" />
                      <span>
                        <strong>Recommended Action:</strong> {area.action}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-sm text-ink-muted">
                No gap analysis results yet. Click Re-analyze to generate.
              </div>
            )}

            <div className="mt-8 flex justify-between border-t border-brand-100 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setDone(false)
                  setStep(0)
                  setAnswers({})
                  setAiResults(null)
                }}
              >
                Retake Assessment
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-ink">Skill Assessment</h1>
          <span className="text-xs font-medium text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-100">
            Skill Genz · SIH26044
          </span>
        </div>
        <p className="text-sm text-ink-muted mt-1">Question {step + 1} of {QUESTIONS.length}</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardHeader>
              <div className="text-xs font-semibold uppercase text-brand-600 tracking-wider">
                Skill Focus: {current.skill}
              </div>
              <CardTitle className="text-lg mt-1">{current.question}</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-3">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="rounded-xl border border-brand-100 px-4 py-3 text-left text-sm font-medium text-ink transition hover:border-brand-400 hover:bg-brand-50/80 flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  <ArrowRight className="h-4 w-4 text-brand-400 opacity-0 transition group-hover:opacity-100" />
                </button>
              ))}
            </CardBody>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
