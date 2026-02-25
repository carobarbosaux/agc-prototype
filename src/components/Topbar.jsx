import { Bell, ChevronRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { roles } from '../mockData'

export default function Topbar({ breadcrumb, rolActivo, onRolChange, onNotifClick, notifCount }) {
  const [rolMenuAbierto, setRolMenuAbierto] = useState(false)
  const rolActualLabel = roles.find(r => r.id === rolActivo)?.label || 'Autor'

  const rolColors = {
    autor: { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE' },
    coordinador: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0' },
    editor: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A' },
    disenador: { bg: '#F5F3FF', text: '#8B5CF6', border: '#DDD6FE' },
  }
  const rc = rolColors[rolActivo] || rolColors.autor

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
      style={{
        height: '56px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      {/* Left: Logo + Breadcrumb */}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#6366F1' }}
          >
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>A</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">AGC</span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-slate-200 mr-1" />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1">
          {breadcrumb.map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} className="text-slate-300" />}
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right: Role selector + Bell + Avatar */}
      <div className="flex items-center gap-3">
        {/* Role selector */}
        <div className="relative">
          <button
            onClick={() => setRolMenuAbierto(!rolMenuAbierto)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: rc.bg,
              color: rc.text,
              border: `1px solid ${rc.border}`,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span>{rolActualLabel}</span>
            <ChevronDown size={12} />
          </button>
          {rolMenuAbierto && (
            <div
              className="absolute right-0 top-full mt-1 w-52 rounded-xl shadow-xl py-1 z-50 animate-fade-in"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
            >
              <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <p className="text-xs text-slate-400 font-medium">Vista de demo — cambiar rol</p>
              </div>
              {roles.map(rol => (
                <button
                  key={rol.id}
                  onClick={() => {
                    onRolChange(rol.id)
                    setRolMenuAbierto(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-700">{rol.label}</p>
                    <p className="text-xs text-slate-400">{rol.description}</p>
                  </div>
                  {rolActivo === rol.id && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: rc.text }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bell */}
        <button
          onClick={onNotifClick}
          className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Bell size={18} className="text-slate-500" />
          {notifCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
              style={{ background: '#F97316', fontSize: '10px', fontWeight: '600' }}
            >
              {notifCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
          style={{ background: '#6366F1' }}
          title="Ana Lucía Martínez"
        >
          AL
        </div>
      </div>

      {/* Close dropdown on outside click */}
      {rolMenuAbierto && (
        <div className="fixed inset-0 z-40" onClick={() => setRolMenuAbierto(false)} />
      )}
    </header>
  )
}
