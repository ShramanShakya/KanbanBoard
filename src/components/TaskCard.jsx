import React from 'react'
import { useApp } from '../context/AppContext.jsx'
import { formatDate, isOverdue, initials, STATUSES, STATUS_LABELS } from '../utils/helpers.js'

const CATEGORY_DOTS = [
  'bg-teal', 'bg-amber', 'bg-coral', 'bg-slate', 'bg-ink',
]
function dotColor(category, categories) {
  const idx = categories.indexOf(category)
  return CATEGORY_DOTS[idx % CATEGORY_DOTS.length] || 'bg-slate'
}

export default function TaskCard({ task, onEdit, onDragStart }) {
  const { people, categories, deleteTask, moveTask } = useApp()
  const person = people.find((p) => p.id === task.personId)
  const overdue = isOverdue(task)

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group bg-white rounded-xl border border-ink/10 shadow-card hover:shadow-lift transition-shadow p-4 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full ${dotColor(
            task.category,
            categories,
          )}/15 text-ink/80`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor(task.category, categories)}`} />
          {task.category}
        </span>
        {overdue && (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-coral/15 text-coral font-medium">
            overdue
          </span>
        )}
      </div>

      <h3 className="font-display font-semibold mt-2.5 leading-snug">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-slate/80 mt-1 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-3 text-xs text-slate/70 font-mono">
        <span>due {formatDate(task.dueDate)}</span>
        {person && (
          <span
            title={person.name}
            className="w-6 h-6 rounded-full bg-ink text-paper flex items-center justify-center text-[10px] font-semibold"
          >
            {initials(person.name)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink/5">
        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
          className="text-xs font-mono border border-ink/15 rounded-md px-1.5 py-1 bg-paper2 focus:outline-none focus:ring-1 focus:ring-teal"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-2 py-1 rounded-md hover:bg-teal/10 text-teal-dark font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm('Delete this task?')) deleteTask(task.id)
            }}
            className="text-xs px-2 py-1 rounded-md hover:bg-coral/10 text-coral font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
