/**
 * Skill Genz - AI & Backend API Client
 * Connects to Spring Boot backend (/api/ai/* and /api/matching/*)
 */

// Default basic auth credentials for student role
const AUTH_HEADER = 'Basic ' + btoa('student:student')

const headers = {
  'Content-Type': 'application/json',
  Authorization: AUTH_HEADER,
}

/**
 * Feature 1: Skill Gap & Improvement Suggestions
 * @param {Object} payload { studentId, targetRole, postingId, targetRequirements, currentSkills }
 */
export async function getSkillGapSuggestions(payload) {
  const res = await fetch('/api/ai/skill-gap', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Skill gap request failed: ${res.status}`)
  }
  return res.json()
}

/**
 * Feature 2: Explainable Embedding Matching Recommendations
 * @param {string} studentId
 */
export async function getMatchingRecommendations(studentId = 'stu-001') {
  const res = await fetch(`/api/matching?studentId=${encodeURIComponent(studentId)}`, {
    method: 'GET',
    headers,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Recommendations request failed: ${res.status}`)
  }
  return res.json()
}

/**
 * Feature 2 Helper: Update student skills & trigger async embedding
 * @param {Object} payload { studentId, skills, interests }
 */
export async function updateStudentSkills(payload) {
  const res = await fetch('/api/matching/students/skills', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Skills update failed: ${res.status}`)
  }
  return res.json()
}

/**
 * Feature 3: Resume & Certificate Skill Extraction
 * @param {string} resumeText
 */
export async function extractSkillsFromResume(resumeText) {
  const res = await fetch('/api/ai/extract-skills', {
    method: 'POST',
    headers,
    body: JSON.stringify({ resumeText }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Skill extraction failed: ${res.status}`)
  }
  return res.json()
}

/**
 * Feature 4: Portfolio Bio Generation
 * @param {Object} payload { studentName, targetRole, skills, projects, certifications, achievements }
 */
export async function generatePortfolioBio(payload) {
  const res = await fetch('/api/ai/generate-bio', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Bio generation failed: ${res.status}`)
  }
  return res.json()
}
