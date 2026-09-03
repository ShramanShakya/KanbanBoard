import React from 'react'

export default function StatCard({ label, value, accent = 'bg-ink' }) {
  return (
    <div className="bg-white rounded-2xl border border-ink/10 shadow-card p-5 relative overflow-hidden">
      <div className={`absolute top-0 left-0 h-1 w-full ${accent}`} />
      <p className="text-xs font-mono text-slate/60 uppercase tracking-wide">{label}</p>
      <p className="font-display font-bold text-3xl mt-2">{value}</p>
    </div>
  )
}
