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
      return { ...t, asignaturas: [...(t.asignaturas || []), nuevaAsig], asignaturas_count: (t.asignaturas_count || 0) + 1 }
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
    if (pantalla === 'canvas') {
      const temaLabelMap = {
        resumen: 'Resumen',
        indice: 'Índice',
        'instrucciones-t1': 'Instrucciones T1',
        t1: 'Temario T1',
        'recursos-t1': 'Recursos T1',
        'test-t1': 'Tests T1',
        'instrucciones-t2': 'Instrucciones T2',
        t2: 'Temario T2',
        'recursos-t2': 'Recursos T2',
        'test-t2': 'Tests T2',
        'instrucciones-t3': 'Instrucciones T3',
        t3: 'Temario T3',
        'instrucciones-t4': 'Instrucciones T4',
        t4: 'Temario T4',
        'instrucciones-t5': 'Instrucciones T5',
        t5: 'Temario T5',
        'instrucciones-t6': 'Instrucciones T6',
        t6: 'Temario T6',
      }
      const temaLabel = temaLabelMap[seccionActiva] || seccionActiva
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
