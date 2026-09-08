import { useState } from 'react'
import { Award, Briefcase, Code, Mail, MapPin, Sparkles, FileText, Plus, Check, RefreshCw, X, AlertCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import profileData from '@/data/student/profile.json'
import skillsData from '@/data/student/skills.json'
import { generatePortfolioBio, extractSkillsFromResume, updateStudentSkills } from '@/services/aiApi'

const initialProfile = profileData.data.profile
const initialSkills = skillsData.data.skills

export default function PortfolioPage() {
  const [skills, setSkills] = useState(initialSkills)
  const [bio, setBio] = useState(
    'Aspiring Full-Stack Software Engineer with expertise in building responsive web applications with React and high-throughput microservices using Spring Boot. Passionate about AI-assisted development and cloud deployment architectures.'
  )

  // AI Bio Generation State
  const [isBioModalOpen, setIsBioModalOpen] = useState(false)
  const [bioLoading, setBioLoading] = useState(false)
  const [generatedBio, setGeneratedBio] = useState('')
  const [bioError, setBioError] = useState(null)

  // Resume Parsing State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [resumeText, setResumeText] = useState('')
  const [resumeLoading, setResumeLoading] = useState(false)
  const [extractedSkills, setExtractedSkills] = useState([])
  const [selectedExtracted, setSelectedExtracted] = useState(new Set())
  const [resumeError, setResumeError] = useState(null)
  const [resumeSuccess, setResumeSuccess] = useState(false)

  // Handle Bio Generation
  const handleOpenBioModal = () => {
    setGeneratedBio(bio)
    setIsBioModalOpen(true)
    setBioError(null)
  }

  const handleGenerateBio = async () => {
    setBioLoading(true)
    setBioError(null)
    try {
      const response = await generatePortfolioBio({
        studentName: initialProfile.name,
        targetRole: 'Full Stack Software Engineer',
        skills: skills.map((s) => s.name),
        projects: ['Ayurveda Knowledge Graph', 'Campus Placement Tracker', 'Skill Genz AI Layer'],
        certifications: ['AWS Certified Cloud Practitioner', 'NPTEL Machine Learning Elite'],
        achievements: ['Smart India Hackathon 2026 Finalist', 'Campus Ambassador'],
      })

      if (response && response.bio) {
        setGeneratedBio(response.bio)
      }
    } catch (err) {
      console.error('Bio generation error:', err)
      setBioError(err.message || 'Failed to generate bio via local Ollama.')
    } finally {
      setBioLoading(false)
    }
  }

  const handleSaveBio = () => {
    if (generatedBio.trim()) {
      setBio(generatedBio.trim())
    }
    setIsBioModalOpen(false)
  }

  // Handle Resume Skill Extraction
  const handleExtractSkills = async () => {
    if (!resumeText.trim()) return
    setResumeLoading(true)
    setResumeError(null)
    setResumeSuccess(false)
    try {
      const res = await extractSkillsFromResume(resumeText)
      const list = res.skills || []
      setExtractedSkills(list)
      setSelectedExtracted(new Set(list.map((s) => s.skill)))
    } catch (err) {
      console.error('Resume extraction error:', err)
      setResumeError(err.message || 'Failed to parse resume text.')
    } finally {
      setResumeLoading(false)
    }
  }

  const toggleSelectSkill = (skillName) => {
    const next = new Set(selectedExtracted)
    if (next.has(skillName)) {
      next.delete(skillName)
    } else {
      next.add(skillName)
    }
    setSelectedExtracted(next)
  }

  const handleApplyExtractedSkills = async () => {
    const newSkillObjects = extractedSkills
      .filter((s) => selectedExtracted.has(s.skill))
      .map((s) => ({
        name: s.skill,
        level: s.proficiency === 'Advanced' ? 85 : s.proficiency === 'Beginner' ? 50 : 70,
      }))

    // Avoid duplicates by skill name
    const existingNames = new Set(skills.map((s) => s.name.toLowerCase()))
    const merged = [...skills]
    newSkillObjects.forEach((s) => {
      if (!existingNames.has(s.name.toLowerCase())) {
        merged.push(s)
      }
    })

    setSkills(merged)
    setResumeSuccess(true)

    // Also sync to MongoDB asynchronously
    try {
      await updateStudentSkills({
        studentId: 'stu-001',
        skills: merged.map((s) => s.name),
        interests: ['web development', 'backend systems', 'data analytics'],
      })
    } catch (e) {
      console.warn('Async skill update to MongoDB skipped:', e)
    }

    setTimeout(() => {
      setIsResumeModalOpen(false)
      setResumeText('')
      setExtractedSkills([])
      setResumeSuccess(false)
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Hero profile card */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-8 text-white shadow-glow">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur-sm">
            AS
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-bold">{initialProfile.name}</h1>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
                Student
              </span>
            </div>
            <p className="text-purple-200 mt-1">{initialProfile.department} · {initialProfile.year}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm text-purple-100 sm:justify-start">
              <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {initialProfile.email}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> NIT Delhi</span>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-3xl font-bold">{initialProfile.skillScore}</p>
            <p className="text-sm text-purple-200">Skill Score</p>
          </div>
        </div>
      </div>

      {/* Professional Bio Card with AI Generator */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-600" />
            Professional Summary
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1.5 text-brand-700 hover:text-brand-900"
            onClick={handleOpenBioModal}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-600" />
            AI Bio Assistant
          </Button>
        </CardHeader>
        <CardBody>
          <p className="text-sm leading-relaxed text-ink-muted bg-brand-50/50 p-4 rounded-xl border border-brand-100/70">
            {bio}
          </p>
        </CardBody>
      </Card>

      {/* Skills Card with AI Resume Parser Trigger */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Skills & Proficiencies</CardTitle>
            <p className="text-xs text-ink-muted">Verified technical skills synced with Skill Genz</p>
          </div>
          <Button
            size="sm"
            className="text-xs gap-1.5 bg-brand-600 hover:bg-brand-700 text-white"
            onClick={() => setIsResumeModalOpen(true)}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Extract from Resume (AI)
          </Button>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name} className="rounded-xl border border-brand-50 bg-surface p-2.5">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-ink">{s.name}</span>
                  <span className="text-xs font-bold text-brand-700">{s.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all duration-500"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Projects & Achievements */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Code className="h-5 w-5 text-brand-600" /> Projects</CardTitle></CardHeader>
          <CardBody className="space-y-3 text-sm">
            <div className="rounded-xl bg-brand-50/60 p-3 border border-brand-100/60">
              <p className="font-semibold text-ink">Skill Genz AI Layer</p>
              <p className="text-xs text-ink-muted mt-0.5">Local Ollama LLM + embedding-based matching system</p>
            </div>
            <div className="rounded-xl bg-brand-50/60 p-3 border border-brand-100/60">
              <p className="font-semibold text-ink">Ayurveda Knowledge Graph</p>
              <p className="text-xs text-ink-muted mt-0.5">NLP pipeline for Sanskrit herb texts</p>
            </div>
            <div className="rounded-xl bg-brand-50/60 p-3 border border-brand-100/60">
              <p className="font-semibold text-ink">Campus Placement Tracker</p>
              <p className="text-xs text-ink-muted mt-0.5">React dashboard for T&P cell</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-brand-600" /> Achievements & Certifications</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            <Badge variant="success" className="block text-center py-1">Smart India Hackathon 2026 — Finalist</Badge>
            <Badge variant="default" className="block text-center py-1">NPTEL ML Certificate — Elite</Badge>
            <Badge variant="outline" className="block text-center py-1">AWS Certified Cloud Practitioner</Badge>
            <Badge variant="outline" className="block text-center py-1">Campus Ambassador — Skill Genz</Badge>
          </CardBody>
        </Card>
      </div>

      {/* Experience */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-brand-600" /> Experience</CardTitle></CardHeader>
        <CardBody className="text-sm text-ink-muted space-y-2">
          <p><strong className="text-ink font-semibold">Software Engineering Intern</strong> — Industry Partner Hub (Summer 2025)</p>
          <p><strong className="text-ink font-semibold">Student Lead</strong> — Skill Genz Innovation Team (2025–26)</p>
        </CardBody>
      </Card>

      {/* Modal 1: AI Bio Assistant */}
      <Modal isOpen={isBioModalOpen} onClose={() => setIsBioModalOpen(false)} title="AI Portfolio Bio Assistant">
        <div className="space-y-4">
          <p className="text-xs text-ink-muted">
            Skill Genz uses your local Ollama LLM to synthesize your projects, certifications, and skills into a professional summary.
          </p>

          {bioError && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>{bioError}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-ink">Generated Bio (Edit if needed):</label>
            <textarea
              rows={4}
              value={generatedBio}
              onChange={(e) => setGeneratedBio(e.target.value)}
              placeholder="Click 'Generate with AI' to draft a professional bio..."
              className="w-full rounded-xl border border-brand-200 bg-surface p-3 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-brand-100">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateBio}
              disabled={bioLoading}
              className="gap-1.5 text-xs text-brand-700"
            >
              <Sparkles className={`h-3.5 w-3.5 ${bioLoading ? 'animate-spin' : ''}`} />
              {bioLoading ? 'Generating with Ollama...' : 'Generate with AI'}
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsBioModalOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveBio} className="text-xs">
                Save to Portfolio
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal 2: Resume Skill Extraction */}
      <Modal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} title="Extract Skills from Resume / Certificate">
        <div className="space-y-4">
          <p className="text-xs text-ink-muted">
            Paste your resume text or certificate details below. Skill Genz AI will extract structured skills with proficiency estimations.
          </p>

          {resumeError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{resumeError}</span>
            </div>
          )}

          {resumeSuccess && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              <span>Skills successfully added to your profile!</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold text-ink">Resume / Certificate Text:</label>
            <textarea
              rows={4}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="e.g. 'Software Engineer with experience in React, Node.js, TypeScript, PostgreSQL, and AWS S3. Built responsive dashboards and automated CI/CD pipelines.'"
              className="w-full rounded-xl border border-brand-200 bg-surface p-3 text-xs text-ink placeholder:text-ink-subtle focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <Button
            size="sm"
            onClick={handleExtractSkills}
            disabled={resumeLoading || !resumeText.trim()}
            className="w-full gap-1.5 text-xs"
          >
            <Sparkles className={`h-3.5 w-3.5 ${resumeLoading ? 'animate-spin' : ''}`} />
            {resumeLoading ? 'Analyzing Resume with Ollama...' : 'Extract Skills'}
          </Button>

          {/* Extracted Skills List */}
          {extractedSkills.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-brand-100 pt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-ink">Select skills to add ({selectedExtracted.size} selected):</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {extractedSkills.map((item, idx) => {
                  const isChecked = selectedExtracted.has(item.skill)
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSelectSkill(item.skill)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition ${
                        isChecked
                          ? 'border-brand-300 bg-brand-50/70 text-brand-900'
                          : 'border-brand-100 bg-surface text-ink-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-4 w-4 rounded border flex items-center justify-center ${
                            isChecked ? 'bg-brand-600 border-brand-600 text-white' : 'border-brand-300'
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                        <span className="font-medium text-ink">{item.skill}</span>
                        <span className="text-[10px] text-ink-subtle">({item.category || 'General'})</span>
                      </div>
                      <Badge
                        variant={
                          item.proficiency === 'Advanced'
                            ? 'success'
                            : item.proficiency === 'Beginner'
                            ? 'warning'
                            : 'default'
                        }
                        className="text-[10px]"
                      >
                        {item.proficiency}
                      </Badge>
                    </div>
                  )
                })}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsResumeModalOpen(false)} className="text-xs">
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleApplyExtractedSkills}
                  disabled={selectedExtracted.size === 0}
                  className="text-xs"
                >
                  Add Selected Skills
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
