import { Bell, CaretRight, CaretDown } from '@phosphor-icons/react'
import { useState } from 'react'
import { roles } from '../mockData'
import { ProdiWordmark } from './ProdiLogo'

export default function Topbar({ breadcrumb, rolActivo, onRolChange, onNotifClick, notifCount, onLogoClick }) {
  const [rolMenuAbierto, setRolMenuAbierto] = useState(false)
  const rolActualLabel = roles.find(r => r.id === rolActivo)?.label || 'Autor'

  const rolColors = {
    autor: { bg: '#F9FCFF', text: '#0A5CF5', border: '#0A5CF5', hoverBg: '#E6EFFF' },
    coordinador: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0', hoverBg: '#DCFCE7' },
    editor: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A', hoverBg: '#FEF3C7' },
    disenador: { bg: '#E7EFFE', text: '#073676', border: '#BAD2FF', hoverBg: '#D1E3FF' },
  }
  const rc = rolColors[rolActivo] || rolColors.autor

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
      style={{
        height: '56px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        fontFamily: "'Proeduca Sans', system-ui, sans-serif",
      }}
    >
      {/* Left: Logo + Breadcrumb */}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <div
          className="flex items-center mr-3"
          style={{ cursor: onLogoClick ? 'pointer' : 'default' }}
          onClick={onLogoClick}
        >
          <ProdiWordmark height={22} />
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-slate-200 mr-1" />

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1">
          {breadcrumb.map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              {i > 0 && <CaretRight size={12} className="text-slate-400" />}
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="text-sm transition-colors"
                  style={{ color: '#4B5563' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1A1A1A'}
                  onMouseLeave={e => e.currentTarget.style.color = '#4B5563'}
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{item.label}</span>
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
              outline: `1px solid ${rc.border}`,
              outlineOffset: '-1px',
              border: 'none',
              fontFamily: "'Proeduca Sans', system-ui, sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = rc.hoverBg }}
            onMouseLeave={e => { e.currentTarget.style.background = rc.bg }}
          >
            <span>{rolActualLabel}</span>
            <CaretDown size={12} />
          </button>
          {rolMenuAbierto && (
            <div
              className="absolute right-0 top-full mt-1 w-52 rounded-xl shadow-xl py-1 z-50 animate-fade-in"
              style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}
            >
              <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid #F1F5F9' }}>
                <p className="text-xs font-medium" style={{ color: '#4B5563' }}>Vista de demo — cambiar rol</p>
              </div>
              {roles.map(rol => (
                <button
                  key={rol.id}
                  onClick={() => {
                    onRolChange(rol.id)
                    setRolMenuAbierto(false)
                  }}
                  className="w-full text-left px-3 py-2 transition-colors flex items-center justify-between"
                  style={{ fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{rol.label}</p>
                    <p className="text-xs" style={{ color: '#4B5563' }}>{rol.description}</p>
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
          className="relative p-2 rounded-lg transition-colors"
          onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Bell size={18} style={{ color: '#4B5563' }} />
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
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-black"
          style={{ background: 'var(--color-primary-200)' }}
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
