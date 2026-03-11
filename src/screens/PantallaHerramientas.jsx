import { Bell, ChevronDown, Sparkles, BookOpen, Edit3, ClipboardCheck, FlaskConical, CheckSquare } from 'lucide-react'
import { useState } from 'react'
import { roles } from '../mockData'
import Chatbar from '../components/Chatbar'

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

export default function PantallaHerramientas({ onNavigate, rolActivo, onRolChange, onNotifClick, notifCount, chatHistorial, setChatHistorial }) {
  const [rolMenuAbierto, setRolMenuAbierto] = useState(false)
  const rolActualLabel = roles.find(r => r.id === rolActivo)?.label || 'Autor'

  const rolColors = {
    autor: { bg: '#E7EFFE', text: '#367CFF', border: '#BAD2FF' },
    coordinador: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0' },
    editor: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A' },
    disenador: { bg: '#E7EFFE', text: '#073676', border: '#BAD2FF' },
  }
  const rc = rolColors[rolActivo] || rolColors.autor

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {/* Custom topbar for herramientas (no breadcrumb) */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5"
        style={{ height: '56px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#367CFF' }}
          >
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'Arial', sans-serif" }}>A</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>AGC</span>
          <span className="ml-1 mr-1" style={{ color: '#E5E7EB' }}>·</span>
          <span className="text-sm" style={{ color: '#6B7280' }}>Herramientas</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Role selector */}
          <div className="relative">
            <button
              onClick={() => setRolMenuAbierto(!rolMenuAbierto)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: rc.bg, color: rc.text, border: `1px solid ${rc.border}`, fontFamily: "'Arial', sans-serif" }}
            >
              <span>{rolActualLabel}</span>
              <ChevronDown size={12} />
            </button>
            {rolMenuAbierto && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRolMenuAbierto(false)} />
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl shadow-xl py-1 z-50 animate-fade-in"
                  style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
                  <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <p className="text-xs font-medium" style={{ color: '#6B7280' }}>Vista de demo — cambiar rol</p>
                  </div>
                  {roles.map(rol => (
                    <button key={rol.id} onClick={() => { onRolChange(rol.id); setRolMenuAbierto(false) }}
                      className="w-full text-left px-3 py-2 transition-colors flex items-center justify-between"
                      onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{rol.label}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{rol.description}</p>
                      </div>
                      {rolActivo === rol.id && <div className="w-1.5 h-1.5 rounded-full" style={{ background: rc.text }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button onClick={onNotifClick} className="relative p-2 rounded-lg transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = '#F8F9FA'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Bell size={18} style={{ color: '#6B7280' }} />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ background: '#F97316', fontSize: '10px', fontWeight: '600' }}>
                {notifCount}
              </span>
            )}
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
            style={{ background: '#073676' }}>
            AL
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="pt-14 px-8 pb-8 max-w-5xl mx-auto">
        <div className="pt-10 pb-6">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: '#1A1A1A' }}>Herramientas</h1>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>Selecciona una herramienta o usa el asistente para empezar</p>
          <Chatbar
            onNavigate={onNavigate}
            placeholder="Pregunta qué necesitas o usa /generar-asignatura…"
            chatHistorial={chatHistorial}
            setChatHistorial={setChatHistorial}
          />
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-3 gap-4">
          {herramientas.map((h) => {
            const Icon = h.icon

            return (
              <div
                key={h.id}
                onClick={() => h.clickable && onNavigate('dashboard')}
                className="relative rounded-2xl p-6 transition-all"
                style={{
                  background: '#FFFFFF',
                  border: h.activa ? '1.5px solid #BAD2FF' : '1px solid #E5E7EB',
                  boxShadow: h.activa ? '0 4px 16px rgba(0, 152, 205, 0.10)' : 'none',
                  opacity: h.clickable ? 1 : 0.5,
                  cursor: h.clickable ? 'pointer' : 'default',
                  transform: 'translateY(0)',
                  transition: 'transform 250ms ease, box-shadow 250ms ease',
                }}
                onMouseEnter={e => {
                  if (h.clickable) {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 152, 205, 0.16)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = h.activa ? '0 4px 16px rgba(0, 152, 205, 0.10)' : 'none'
                }}
              >
                {/* Active badge */}
                {h.badge && (
                  <span
                    className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      background: '#E7EFFE',
                      color: '#367CFF',
                      fontFamily: "'Arial', sans-serif",
                    }}
                  >
                    {h.badge}
                  </span>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: h.activa ? '#E7EFFE' : '#F8F9FA' }}
                >
                  <Icon size={20} style={{ color: h.activa ? '#367CFF' : '#94A3B8' }} />
                </div>

                <h3
                  className="text-sm font-semibold mb-1.5"
                  style={{ color: h.activa ? '#1A1A1A' : '#6B7280' }}
                >
                  {h.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
                  {h.descripcion}
                </p>

                {h.activa && (
                  <div className="mt-5 flex items-center gap-1.5">
                    <Sparkles size={12} style={{ color: '#367CFF' }} />
                    <span className="text-xs font-medium" style={{ color: '#367CFF' }}>
                      Abrir herramienta →
                    </span>
                  </div>
                )}

                {!h.clickable && (
                  <div className="mt-4">
                    <span className="text-xs" style={{ color: '#CBD5E1' }}>Próximamente</span>
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
