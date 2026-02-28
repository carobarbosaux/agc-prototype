import { useState } from 'react'
import './index.css'
import PantallaHerramientas from './screens/PantallaHerramientas'
import PantallaDashboard from './screens/PantallaDashboard'
import PantallaCanvas from './screens/PantallaCanvas'
import PanelNotificaciones from './components/PanelNotificaciones'
import PantallaCrearAsignatura from './screens/PantallaCrearAsignatura'
import Topbar from './components/Topbar'
import { titulaciones as titulacionesIniciales } from './mockData'

export default function App() {
  const [pantalla, setPantalla] = useState('herramientas')
  const [rolActivo, setRolActivo] = useState('autor')
  const [seccionActiva, setSeccionActiva] = useState('t2')
  const [panelIAabierto, setPanelIAabierto] = useState(false)
  const [notifAbiertas, setNotifAbiertas] = useState(false)
  const [titulaciones, setTitulaciones] = useState(titulacionesIniciales)
  const [asignaturaActiva, setAsignaturaActiva] = useState({ titulacionId: 'master-ia', asignaturaId: 'fund-ml' })

  const navigate = (destino, params = {}) => {
    if (destino === 'canvas') {
      if (params.seccion) setSeccionActiva(params.seccion)
      if (params.titulacionId) setAsignaturaActiva({ titulacionId: params.titulacionId, asignaturaId: params.asignaturaId })
      setPantalla('canvas')
    } else if (destino === 'canvas-t1') {
      setSeccionActiva('t1')
      setPantalla('canvas')
    } else if (destino === 'canvas-t2') {
      setSeccionActiva('t2')
      setPantalla('canvas')
    } else if (destino === 'dashboard') {
      setPantalla('dashboard')
    } else if (destino === 'herramientas') {
      setPantalla('herramientas')
    } else if (destino === 'crearAsignatura') {
      setPantalla('crearAsignatura')
    }
    setNotifAbiertas(false)
  }

  const handleCrearAsignatura = (titulacionId, nuevaAsig) => {
    setTitulaciones(prev => prev.map(t => {
      if (t.id !== titulacionId) return t
      return { ...t, asignaturas: [...(t.asignaturas || []), nuevaAsig], asignaturas_count: (t.asignaturas_count || 0) + 1 }
    }))
    setAsignaturaActiva({ titulacionId, asignaturaId: nuevaAsig.id })
    setSeccionActiva('resumen')
    setPantalla('canvas')
  }

  const getBreadcrumb = () => {
    if (pantalla === 'herramientas') return []
    if (pantalla === 'dashboard') return [
      { label: 'Generación de Asignaturas', onClick: () => setPantalla('herramientas') },
      { label: 'Dashboard', onClick: null },
    ]
    if (pantalla === 'canvas') {
      const temaLabel =
        seccionActiva === 't1' ? 'Tema 1'
        : seccionActiva === 't2' ? 'Tema 2'
        : seccionActiva === 'indice' ? 'Índice'
        : seccionActiva === 'instrucciones' ? 'Instrucciones'
        : seccionActiva === 'resumen' ? 'Resumen'
        : seccionActiva
      return [
        { label: 'Generación de Asignaturas', onClick: () => setPantalla('herramientas') },
        { label: 'Fundamentos de ML', onClick: () => setPantalla('dashboard') },
        { label: temaLabel, onClick: null },
      ]
    }
    return []
  }

  // Full-page screens that manage their own layout
  if (pantalla === 'crearAsignatura') {
    return (
      <PantallaCrearAsignatura
        titulaciones={titulaciones}
        onCrearAsignatura={handleCrearAsignatura}
        onCancel={() => setPantalla('dashboard')}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: "'Inter', 'Arial', sans-serif" }}>
      {pantalla !== 'herramientas' && (
        <Topbar
          breadcrumb={getBreadcrumb()}
          rolActivo={rolActivo}
          onRolChange={setRolActivo}
          onNotifClick={() => setNotifAbiertas(true)}
          notifCount={1}
          pantalla={pantalla}
        />
      )}

      <div className={pantalla !== 'herramientas' ? 'pt-14' : ''}>
        {pantalla === 'herramientas' && (
          <PantallaHerramientas
            onNavigate={navigate}
            rolActivo={rolActivo}
            onRolChange={setRolActivo}
            onNotifClick={() => setNotifAbiertas(true)}
            notifCount={1}
          />
        )}
        {pantalla === 'dashboard' && (
          <PantallaDashboard
            rolActivo={rolActivo}
            onNavigate={navigate}
            titulaciones={titulaciones}
          />
        )}
        {pantalla === 'canvas' && (
          <PantallaCanvas
            rolActivo={rolActivo}
            seccionActiva={seccionActiva}
            setSeccionActiva={setSeccionActiva}
            panelIAabierto={panelIAabierto}
            setPanelIAabierto={setPanelIAabierto}
            onNavigate={navigate}
            asignaturaActiva={asignaturaActiva}
            titulaciones={titulaciones}
          />
        )}
      </div>

      {notifAbiertas && (
        <PanelNotificaciones
          onClose={() => setNotifAbiertas(false)}
          onNavigate={navigate}
        />
      )}
    </div>
  )
}
