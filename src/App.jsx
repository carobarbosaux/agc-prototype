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
  const [panelIAabierto, setPanelIAabierto] = useState(true)
  const [notifAbiertas, setNotifAbiertas] = useState(false)
  const [titulaciones, setTitulaciones] = useState(titulacionesIniciales)
  const [asignaturaActiva, setAsignaturaActiva] = useState({ titulacionId: 'master-ia', asignaturaId: 'fund-ml' })
  const [chatHistorial, setChatHistorial] = useState([])
  const [creacionData, setCreacionData] = useState(null)

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

  const handleCrearAsignatura = (titulacionId, nuevaAsig, generados = {}) => {
    setTitulaciones(prev => prev.map(t => {
      if (t.id !== titulacionId) return t
      const sinDuplicado = (t.asignaturas || []).filter(a => a.id !== nuevaAsig.id)
      return { ...t, asignaturas: [...sinDuplicado, nuevaAsig], asignaturas_count: sinDuplicado.length + 1 }
    }))
    setAsignaturaActiva({ titulacionId, asignaturaId: nuevaAsig.id })
    setCreacionData(generados)
    setSeccionActiva('indice')
    setPantalla('canvas')
  }

  const getBreadcrumb = () => {
    if (pantalla === 'herramientas') return []
    if (pantalla === 'dashboard') return [
      { label: 'Generación de Asignaturas', onClick: () => setPantalla('herramientas') },
      { label: 'Dashboard', onClick: null },
    ]
    if (pantalla === 'canvas') return []
    return []
  }

  // Full-page screens that manage their own layout
  if (pantalla === 'crearAsignatura') {
    return (
      <PantallaCrearAsignatura
        titulaciones={titulaciones}
        onCrearAsignatura={handleCrearAsignatura}
        onCancel={() => setPantalla('dashboard')}
        rolActivo={rolActivo}
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
            chatHistorial={chatHistorial}
            setChatHistorial={setChatHistorial}
          />
        )}
        {pantalla === 'dashboard' && (
          <PantallaDashboard
            rolActivo={rolActivo}
            onNavigate={navigate}
            titulaciones={titulaciones}
            chatHistorial={chatHistorial}
            setChatHistorial={setChatHistorial}
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
            creacionData={creacionData}
            onCreacionDataConsumed={() => setCreacionData(null)}
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
