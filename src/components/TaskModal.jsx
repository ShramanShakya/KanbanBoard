import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { STATUSES, STATUS_LABELS, todayISO } from '../utils/helpers.js'

const EMPTY = {
  title: '',
  description: '',
  category: '',
  startDate: todayISO(),
  dueDate: todayISO(),
  completeDate: '',
  personId: '',
  status: 'TODO',
}

export default function TaskModal({ task, onClose }) {
  const { categories, people, addCategory, addTask, updateTask } = useApp()
  const [form, setForm] = useState(EMPTY)
  const [newCategory, setNewCategory] = useState('')
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (task) {
      setForm(task)
    } else {
      setForm({ ...EMPTY, category: categories[0] || '', personId: people[0]?.id || '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleCreateCategory = () => {
    const trimmed = newCategory.trim()
    if (!trimmed) return
    addCategory(trimmed)
    setForm((f) => ({ ...f, category: trimmed }))
    setNewCategory('')
    setShowNewCategory(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    if (!form.category) {
      setError('Please select or add a category.')
      return
    }
    if (form.dueDate && form.startDate && form.dueDate < form.startDate) {
      setError('Due date cannot be before the start date.')
      return
    }

    const payload = { ...form }
    if (payload.status === 'DONE' && !payload.completeDate) {
      payload.completeDate = todayISO()
    }
    if (payload.status !== 'DONE') {
      payload.completeDate = ''
    }

    if (task) {
      updateTask(task.id, payload)
    } else {
      addTask(payload)
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-paper w-full max-w-lg rounded-2xl border border-ink/10 shadow-lift p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl">
            {task ? 'Edit task' : 'New task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate/60 hover:text-ink text-xl leading-none px-2"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {error && (
          <p className="text-sm bg-coral/10 text-coral rounded-lg px-3 py-2 mb-4 font-medium">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate/70 block mb-1">Title</label>
            <input
              value={form.title}
              onChange={set('title')}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              placeholder="e.g. Build login page"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate/70 block mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows={3}
              className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal resize-none"
              placeholder="What needs to happen?"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-slate/70 block mb-1">Category</label>
            {!showNewCategory ? (
              <div className="flex gap-2">
                <select
                  value={form.category}
                  onChange={set('category')}
                  className="flex-1 border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowNewCategory(true)}
                  className="text-xs font-mono px-3 rounded-lg border border-ink/15 hover:bg-ink/5"
                >
                  + New
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  autoFocus
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  className="flex-1 border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="text-xs font-mono px-3 rounded-lg bg-teal text-white hover:bg-teal-dark"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCategory(false)}
                  className="text-xs font-mono px-3 rounded-lg border border-ink/15 hover:bg-ink/5"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate/70 block mb-1">Start date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={set('startDate')}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate/70 block mb-1">Due date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={set('dueDate')}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-slate/70 block mb-1">Responsible person</label>
              <select
                value={form.personId}
                onChange={set('personId')}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">Unassigned</option>
                {people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-slate/70 block mb-1">Status</label>
              <select
                value={form.status}
                onChange={set('status')}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {form.status === 'DONE' && (
            <div>
              <label className="text-xs font-mono text-slate/70 block mb-1">Complete date</label>
              <input
                type="date"
                value={form.completeDate}
                onChange={set('completeDate')}
                className="w-full border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-ink/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-ink/15 hover:bg-ink/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-medium bg-ink text-paper hover:bg-slate"
          >
            {task ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  )
}
