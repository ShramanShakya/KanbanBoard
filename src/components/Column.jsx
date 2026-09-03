import React, { useState } from 'react'
import TaskCard from './TaskCard.jsx'
import { useApp } from '../context/AppContext.jsx'

const ACCENTS = {
  TODO: { bar: 'bg-slate', bg: 'bg-slate/5' },
  DOING: { bar: 'bg-amber', bg: 'bg-amber/5' },
  DONE: { bar: 'bg-teal', bg: 'bg-teal/5' },
}

export default function Column({ status, label, tasks, onEdit, onAdd }) {
  const { moveTask } = useApp()
  const [isOver, setIsOver] = useState(false)
  const accent = ACCENTS[status]

  const handleDrop = (e) => {
    e.preventDefault()
    setIsOver(false)
    const id = e.dataTransfer.getData('text/plain')
    if (id) moveTask(id, status)
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl border border-ink/10 ${accent.bg} min-h-[420px] transition-colors ${
        isOver ? 'ring-2 ring-teal' : ''
      }`}
    >
      <div className={`h-1.5 rounded-t-2xl ${accent.bar}`} />
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <h2 className="font-display font-semibold tracking-tight">{label}</h2>
          <span className="text-xs font-mono text-slate/60 bg-white px-2 py-0.5 rounded-full border border-ink/10">
            {tasks.length}
          </span>
        </div>
        {status === 'TODO' && (
          <button
            onClick={onAdd}
            className="text-xs font-mono px-2.5 py-1 rounded-full bg-ink text-paper hover:bg-slate transition-colors"
          >
            + Add task
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-3 px-4 pb-4">
        {tasks.length === 0 && (
          <p className="text-sm text-slate/50 font-mono border border-dashed border-ink/15 rounded-xl py-8 text-center">
            no tasks here
          </p>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDragStart={(e, id) => e.dataTransfer.setData('text/plain', id)}
          />
        ))}
      </div>
    </div>
  )
}
