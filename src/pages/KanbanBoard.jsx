import React, { useState } from 'react'
import Column from '../components/Column.jsx'
import TaskModal from '../components/TaskModal.jsx'
import { useApp } from '../context/AppContext.jsx'
import { STATUSES, STATUS_LABELS } from '../utils/helpers.js'

export default function KanbanBoard() {
  const { tasks } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const openNew = () => {
    setEditingTask(null)
    setModalOpen(true)
  }
  const openEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-xs font-mono text-teal-dark tracking-wide uppercase">the board</p>
          <h1 className="font-display font-bold text-3xl mt-1">Kanban Board</h1>
        </div>
        <button
          onClick={openNew}
          className="text-sm font-medium px-4 py-2 rounded-full bg-ink text-paper hover:bg-slate transition-colors"
        >
          + New task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STATUSES.map((status) => (
          <Column
            key={status}
            status={status}
            label={STATUS_LABELS[status]}
            tasks={tasks.filter((t) => t.status === status)}
            onEdit={openEdit}
            onAdd={openNew}
          />
        ))}
      </div>

      {modalOpen && (
        <TaskModal task={editingTask} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}
