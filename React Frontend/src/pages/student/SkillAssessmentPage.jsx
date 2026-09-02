import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import profileData from '@/data/student/profile.json'

const QUESTIONS = [
  {
    id: 1,
    question: 'How comfortable are you with Python for data analysis?',
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  {
    id: 2,
    question: 'Rate your experience with collaborative team projects.',
    options: ['Limited', 'Some experience', 'Regular', 'Lead projects'],
  },
  {
    id: 3,
    question: 'How familiar are you with cloud platforms (AWS/GCP)?',
    options: ['Not familiar', 'Basics', 'Hands-on', 'Production-ready'],
  },
  {
    id: 4,
    question: 'What is your interest in Ayurveda / healthcare tech?',
    options: ['Low', 'Moderate', 'High', 'Primary focus'],
  },
  {
    id: 5,
    question: 'How would you rate your communication & presentation skills?',
    options: ['Needs work', 'Average', 'Good', 'Excellent'],
  },
]

export default function SkillAssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const profile = profileData.data.profile

  const current = QUESTIONS[step]
  const progress = ((step + (done ? 1 : 0)) / QUESTIONS.length) * 100

  const handleAnswer = (option) => {
    setAnswers((prev) => ({ ...prev, [current.id]: option }))
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl"
      >
        <Card>
          <CardBody className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-ink">Assessment Complete!</h2>
            <p className="mt-2 text-ink-muted">Your updated skill profile is ready.</p>
            <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-sm text-ink-muted">Skill Score</p>
                <p className="text-2xl font-bold text-brand-700">{profile.skillScore}/100</p>
              </div>
              <div className="rounded-xl bg-brand-50 p-4">
                <p className="text-sm text-ink-muted">Readiness</p>
                <p className="text-lg font-semibold text-ink">{profile.readiness}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-ink">Skill gaps identified:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {profile.skillGaps.map((g) => (
                  <Badge key={g} variant="warning">{g}</Badge>
                ))}
              </div>
            </div>
            <Button className="mt-8" onClick={() => { setDone(false); setStep(0); setAnswers({}) }}>
              Retake Assessment
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">Skill Assessment</h1>
        <p className="text-sm text-ink-muted">Question {step + 1} of {QUESTIONS.length}</p>
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
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{current.question}</CardTitle>
            </CardHeader>
            <CardBody className="grid gap-3">
              {current.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="rounded-xl border border-brand-100 px-4 py-3 text-left text-sm font-medium text-ink transition hover:border-brand-400 hover:bg-brand-50"
                >
                  {option}
                </button>
              ))}
            </CardBody>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
