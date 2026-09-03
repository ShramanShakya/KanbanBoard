export const STATUSES = ['TODO', 'DOING', 'DONE']

export const STATUS_LABELS = {
  TODO: 'To Do',
  DOING: 'Doing',
  DONE: 'Done',
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export function isOverdue(task) {
  if (!task.dueDate || task.status === 'DONE') return false
  return task.dueDate < todayISO()
}

// Returns 'EARLY' | 'ON_TIME' | 'LATE' | null (null when not applicable)
export function completionCategory(task) {
  if (task.status !== 'DONE' || !task.completeDate || !task.dueDate) return null
  if (task.completeDate < task.dueDate) return 'EARLY'
  if (task.completeDate === task.dueDate) return 'ON_TIME'
  return 'LATE'
}

export function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
