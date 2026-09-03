import React from 'react'
import { NavLink } from 'react-router-dom'

const linkBase =
  'px-4 py-2 rounded-full text-sm font-medium font-mono tracking-tight transition-colors'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-ink text-paper flex items-center justify-center font-display font-bold">
            B
          </div>
          <div>
            <p className="font-display font-semibold text-lg leading-none">Board</p>
            <p className="text-xs text-slate/70 leading-none mt-1">kanban &amp; dashboard</p>
          </div>
        </div>
        <nav className="flex items-center gap-2 bg-white/60 border border-ink/10 rounded-full p-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'}`
            }
          >
            Board
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'}`
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
