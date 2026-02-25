import { Bell, ChevronDown, Sparkles, BookOpen, Edit3, ClipboardCheck, FlaskConical, CheckSquare } from 'lucide-react'
import { useState } from 'react'
import { roles } from '../mockData'

const herramientas = [
  {
    id: 'generacion',
    label: 'Generación de Asignaturas',
    descripcion: 'Crea y gestiona contenido estructurado con IA para tus asignaturas. Pipeline completo de aprobación.',
    icon: BookOpen,
    activa: true,
    clickable: true,
    badge: 'Activo',
  },
  {
    id: 'actividades',
    label: 'Diseñador de Actividades',
    descripcion: 'Genera actividades de aprendizaje adaptadas a los objetivos didácticos de tu asignatura.',
    icon: Edit3,
    activa: false,
    clickable: false,
  },
  {
    id: 'rubricas',
    label: 'Mejora de Rúbricas',
    descripcion: 'Optimiza y refina criterios de evaluación con asistencia inteligente.',
    icon: ClipboardCheck,
    activa: false,
    clickable: false,
  },
  {
    id: 'tests',
    label: 'Generador de Tests',
    descripcion: 'Crea preguntas de evaluación alineadas con el contenido de la asignatura.',
    icon: FlaskConical,
    activa: false,
    clickable: false,
  },
  {
    id: 'corrector',
    label: 'Corrector de Actividades',
    descripcion: 'Evalúa entregas de alumnos de forma consistente y detallada.',
    icon: CheckSquare,
    activa: false,
    clickable: false,
  },
]

export default function PantallaHerramientas({ onNavigate, rolActivo, onRolChange, onNotifClick, notifCount }) {
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
    <div className="min-h-screen" style={{ background: '#F8FAFC' }}>
      {/* Custom topbar for herramientas (no breadcrumb) */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
        style={{ height: '56px', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#6366F1' }}
          >
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>A</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">AGC</span>
          <span className="text-slate-200 ml-1 mr-1">·</span>
          <span className="text-sm text-slate-400">Herramientas</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Role selector */}
          <div className="relative">
            <button
              onClick={() => setRolMenuAbierto(!rolMenuAbierto)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}`, fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span>{rolActualLabel}</span>
              <ChevronDown size={12} />
            </button>
            {rolMenuAbierto && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRolMenuAbierto(false)} />
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl shadow-xl py-1 z-50 animate-fade-in"
                  style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <p className="text-xs text-slate-400 font-medium">Vista de demo — cambiar rol</p>
                  </div>
                  {roles.map(rol => (
                    <button key={rol.id} onClick={() => { onRolChange(rol.id); setRolMenuAbierto(false) }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{rol.label}</p>
                        <p className="text-xs text-slate-400">{rol.description}</p>
                      </div>
                      {rolActivo === rol.id && <div className="w-1.5 h-1.5 rounded-full" style={{ background: rc.text }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button onClick={onNotifClick} className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell size={18} className="text-slate-500" />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ background: '#F97316', fontSize: '10px', fontWeight: '600' }}>
                {notifCount}
              </span>
            )}
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: '#6366F1' }}>
            AL
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="pt-14 px-8 pb-8 max-w-5xl mx-auto">
        <div className="pt-10 pb-8">
          <h1 className="text-2xl font-semibold text-slate-800 mb-1">Herramientas</h1>
          <p className="text-sm text-slate-400">Selecciona una herramienta para empezar a trabajar</p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-3 gap-4">
          {herramientas.map((h, i) => {
            const Icon = h.icon
            const isFirst = i === 0

            return (
              <div
                key={h.id}
                onClick={() => h.clickable && onNavigate('dashboard')}
                className={`relative rounded-2xl p-6 transition-all ${h.clickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5' : 'cursor-default'} ${isFirst ? 'col-span-1 row-span-1' : ''}`}
                style={{
                  background: h.activa ? '#FFFFFF' : '#FFFFFF',
                  border: h.activa ? '1.5px solid #C7D2FE' : '1px solid #E2E8F0',
                  boxShadow: h.activa ? '0 4px 16px rgba(99, 102, 241, 0.12)' : 'none',
                  opacity: h.clickable ? 1 : 0.5,
                }}
              >
                {/* Active badge */}
                {h.badge && (
                  <span
                    className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      background: '#EEF2FF',
                      color: '#6366F1',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {h.badge}
                  </span>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: h.activa ? '#EEF2FF' : '#F1F5F9',
                  }}
                >
                  <Icon size={20} style={{ color: h.activa ? '#6366F1' : '#94A3B8' }} />
                </div>

                <h3
                  className="text-sm font-semibold mb-1.5"
                  style={{ color: h.activa ? '#1E293B' : '#64748B' }}
                >
                  {h.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
                  {h.descripcion}
                </p>

                {h.activa && (
                  <div className="mt-5 flex items-center gap-1.5">
                    <Sparkles size={12} style={{ color: '#6366F1' }} />
                    <span className="text-xs font-medium" style={{ color: '#6366F1' }}>
                      Abrir herramienta →
                    </span>
                  </div>
                )}

                {!h.clickable && (
                  <div className="mt-4">
                    <span className="text-xs text-slate-300">Próximamente</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
