import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Brain, GraduationCap, TrendingUp, Users } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import analyticsData from '@/data/admin/analytics.json'
import { tokens } from '@/theme/tokens'

const data = analyticsData.data

export default function AdminDashboard() {
  const pieData = [
    { name: 'Placed', value: data.placedStudents },
    { name: 'In Progress', value: data.totalStudents - data.placedStudents },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Institution Analytics</h1>
        <p className="text-sm text-ink-muted">Placement progress, internship participation, and skill demand trends</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Placement Rate" value={`${data.placementRate}%`} icon={TrendingUp} trend={{ positive: true, value: '+4% YoY' }} />
        <StatCard label="Internship Participation" value={`${data.internshipParticipation}%`} icon={GraduationCap} />
        <StatCard label="Avg. Skill Score" value={data.avgSkillScore} icon={Brain} />
        <StatCard label="Total Students" value={data.totalStudents.toLocaleString()} icon={Users} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card id="placements">
          <CardHeader><CardTitle>Placement Overview</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={tokens.chartPalette[i % tokens.chartPalette.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card id="skills">
          <CardHeader><CardTitle>Industry Skill Demand</CardTitle></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data.skillDemandTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                <XAxis dataKey="skill" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="demand" stroke={tokens.colors.brand} strokeWidth={2} dot={{ fill: tokens.colors.brand }} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Department-wise Performance</CardTitle></CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="placement" name="Placement %" fill={tokens.colors.brand} radius={[4, 4, 0, 0]} />
              <Bar dataKey="internships" name="Internships %" fill={tokens.colors.brandLight} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  )
}
