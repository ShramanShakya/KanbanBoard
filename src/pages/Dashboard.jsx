import React, { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { useApp } from '../context/AppContext.jsx'
import StatCard from '../components/StatCard.jsx'
import { isOverdue, completionCategory, STATUS_LABELS } from '../utils/helpers.js'

const STATUS_COLORS = { TODO: '#3A4750', DOING: '#E8A33D', DONE: '#0EA5A0' }
const PERF_COLORS = { EARLY: '#0EA5A0', ON_TIME: '#E8A33D', LATE: '#E85D4C' }
const CATEGORY_PALETTE = ['#0EA5A0', '#E8A33D', '#E85D4C', '#3A4750', '#1C2321', '#7C9885']

export default function Dashboard() {
  const { tasks, categories } = useApp()

  const counts = useMemo(() => {
    const todo = tasks.filter((t) => t.status === 'TODO').length
    const doing = tasks.filter((t) => t.status === 'DOING').length
    const done = tasks.filter((t) => t.status === 'DONE').length
    const overdue = tasks.filter(isOverdue).length
    return { total: tasks.length, todo, doing, done, overdue }
  }, [tasks])

  const statusData = useMemo(
    () => [
      { name: STATUS_LABELS.TODO, key: 'TODO', value: counts.todo },
      { name: STATUS_LABELS.DOING, key: 'DOING', value: counts.doing },
      { name: STATUS_LABELS.DONE, key: 'DONE', value: counts.done },
    ],
    [counts],
  )

  const categoryData = useMemo(
    () =>
      categories.map((c) => ({
        name: c,
        count: tasks.filter((t) => t.category === c).length,
      })),
    [categories, tasks],
  )

  const performanceData = useMemo(() => {
    const buckets = { EARLY: 0, ON_TIME: 0, LATE: 0 }
    tasks.forEach((t) => {
      const cat = completionCategory(t)
      if (cat) buckets[cat] += 1
    })
    return [
      { name: 'Early', key: 'EARLY', value: buckets.EARLY },
      { name: 'On Time', key: 'ON_TIME', value: buckets.ON_TIME },
      { name: 'Late', key: 'LATE', value: buckets.LATE },
    ]
  }, [tasks])

  const noneDone = performanceData.every((d) => d.value === 0)

  return (
    <div>
      <div className="mb-6">
        <p className="text-xs font-mono text-teal-dark tracking-wide uppercase">at a glance</p>
        <h1 className="font-display font-bold text-3xl mt-1">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="Total tasks" value={counts.total} accent="bg-ink" />
        <StatCard label="To Do" value={counts.todo} accent="bg-slate" />
        <StatCard label="Doing" value={counts.doing} accent="bg-amber" />
        <StatCard label="Done" value={counts.done} accent="bg-teal" />
        <StatCard label="Overdue" value={counts.overdue} accent="bg-coral" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-white rounded-2xl border border-ink/10 shadow-card p-5">
          <h2 className="font-display font-semibold mb-1">Tasks by status</h2>
          <p className="text-xs text-slate/60 font-mono mb-3">distribution across the board</p>
          {counts.total === 0 ? (
            <EmptyState text="No tasks yet" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.key} fill={STATUS_COLORS[entry.key]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-ink/10 shadow-card p-5">
          <h2 className="font-display font-semibold mb-1">Tasks by category</h2>
          <p className="text-xs text-slate/60 font-mono mb-3">workload per category</p>
          {categoryData.every((c) => c.count === 0) ? (
            <EmptyState text="No tasks yet" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={categoryData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C232112" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={CATEGORY_PALETTE[i % CATEGORY_PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink/10 shadow-card p-5">
        <h2 className="font-display font-semibold mb-1">Completion performance</h2>
        <p className="text-xs text-slate/60 font-mono mb-3">
          done tasks compared against their due date
        </p>
        {noneDone ? (
          <EmptyState text="No completed tasks yet" />
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={performanceData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C232112" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={70} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                {performanceData.map((entry) => (
                  <Cell key={entry.key} fill={PERF_COLORS[entry.key]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

function EmptyState({ text }) {
  return (
    <div className="h-[260px] flex items-center justify-center text-sm text-slate/50 font-mono border border-dashed border-ink/15 rounded-xl">
      {text}
    </div>
  )
}
