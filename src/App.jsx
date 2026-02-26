import { useState } from 'react'
import './index.css'
import PantallaHerramientas from './screens/PantallaHerramientas'
import PantallaDashboard from './screens/PantallaDashboard'
import PantallaCanvas from './screens/PantallaCanvas'
import PanelNotificaciones from './components/PanelNotificaciones'
import Topbar from './components/Topbar'

export default function App() {
  const [pantalla, setPantalla] = useState('herramientas')
  const [rolActivo, setRolActivo] = useState('autor')
  const [seccionActiva, setSeccionActiva] = useState('t2')
  const [panelIAabierto, setPanelIAabierto] = useState(true)
  const [notifAbiertas, setNotifAbiertas] = useState(false)

  const navigate = (destino, params = {}) => {
    if (destino === 'canvas') {
      if (params.seccion) setSeccionActiva(params.seccion)
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
    }
    setNotifAbiertas(false)
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
        : seccionActiva
      return [
        { label: 'Generación de Asignaturas', onClick: () => setPantalla('herramientas') },
        { label: 'Fundamentos de ML', onClick: () => setPantalla('dashboard') },
        { label: temaLabel, onClick: null },
      ]
    }
    return []
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
