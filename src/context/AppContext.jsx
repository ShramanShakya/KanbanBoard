import React, { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { uid, todayISO } from '../utils/helpers.js'
import { PEOPLE } from '../data/people.js'

const AppContext = createContext(null)

const DEFAULT_CATEGORIES = ['Development', 'Design', 'Testing', 'Documentation', 'Bug Fix']

const SEED_TASKS = [
  {
    id: uid('task'),
    title: 'Set up project repository',
    description: 'Initialize the Vite + React app and push the first commit.',
    category: 'Development',
    startDate: todayISO(),
    dueDate: todayISO(),
    completeDate: todayISO(),
    personId: 'p1',
    status: 'DONE',
  },
  {
    id: uid('task'),
    title: 'Design task card layout',
    description: 'Draft the visual style for cards on the board.',
    category: 'Design',
    startDate: todayISO(),
    dueDate: todayISO(),
    completeDate: '',
    personId: 'p2',
    status: 'DOING',
  },
  {
    id: uid('task'),
    title: 'Write dashboard charts',
    description: 'Add status, category, and performance charts.',
    category: 'Development',
    startDate: todayISO(),
    dueDate: todayISO(),
    completeDate: '',
    personId: 'p3',
    status: 'TODO',
  },
]

export function AppProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('kanban_tasks', SEED_TASKS)
  const [categories, setCategories] = useLocalStorage('kanban_categories', DEFAULT_CATEGORIES)

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: uid('task') }])
  }

  const updateTask = (id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const moveTask = (id, status) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const next = { ...t, status }
        if (status === 'DONE' && !t.completeDate) next.completeDate = todayISO()
        if (status !== 'DONE') next.completeDate = ''
        return next
      }),
    )
  }

  const addCategory = (name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setCategories((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]))
  }

  const value = useMemo(
    () => ({
      tasks,
      categories,
      people: PEOPLE,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      addCategory,
    }),
    [tasks, categories],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
