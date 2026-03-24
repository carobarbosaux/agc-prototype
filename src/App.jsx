import { useState, useEffect } from 'react'
import './index.css'
import PantallaHerramientas from './screens/PantallaHerramientas'
import PantallaDashboard from './screens/PantallaDashboard'
import PantallaCanvas from './screens/PantallaCanvas'
import PanelNotificaciones from './components/PanelNotificaciones'
import PantallaCrearAsignatura from './screens/PantallaCrearAsignatura'
import Topbar from './components/Topbar'
import { titulaciones as titulacionesIniciales } from './mockData'

const HASH_TO_PANTALLA = {
  '/herramientas': 'herramientas',
  '/dashboard': 'dashboard',
  '/canvas': 'canvas',
  '/crear-asignatura': 'crearAsignatura',
}

const PANTALLA_TO_HASH = {
  herramientas: '/herramientas',
  dashboard: '/dashboard',
  canvas: '/canvas',
  crearAsignatura: '/crear-asignatura',
}

function getInitialPantalla() {
  const hash = window.location.hash.replace('#', '')
  return HASH_TO_PANTALLA[hash] || 'herramientas'
}

export default function App() {
  const [pantalla, setPantalla] = useState(getInitialPantalla)
  const [rolActivo, setRolActivo] = useState('autor')

  // Sync hash → URL
  useEffect(() => {
    window.location.hash = PANTALLA_TO_HASH[pantalla] || '/herramientas'
  }, [pantalla])

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace('#', '')
      const dest = HASH_TO_PANTALLA[hash]
      if (dest) setPantalla(dest)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const [seccionActiva, setSeccionActiva] = useState('t2')
  const [panelIAabierto, setPanelIAabierto] = useState(true)
  const [notifAbiertas, setNotifAbiertas] = useState(false)
  const [titulaciones, setTitulaciones] = useState(titulacionesIniciales)
  const [asignaturaActiva, setAsignaturaActiva] = useState({ titulacionId: 'master-ia', asignaturaId: 'fund-ml' })
  const [chatHistorial, setChatHistorial] = useState([])
  const [creacionData, setCreacionData] = useState(null)
  const [draftCreacion, setDraftCreacion] = useState(null)

  const navigate = (destino, params = {}) => {
    if (destino === 'canvas') {
      if (params.seccion) setSeccionActiva(params.seccion)
      if (params.titulacionId) setAsignaturaActiva({ titulacionId: params.titulacionId, asignaturaId: params.asignaturaId })
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

  const handleSaveDraft = (draft) => {
    setDraftCreacion(draft)
    // Mark the deep-learning asignatura as enBorrador so it shows in dashboard
    setTitulaciones(prev => prev.map(t => {
      if (t.id !== 'master-ia') return t
      return {
        ...t,
        asignaturas: t.asignaturas.map(a =>
          a.id === 'deep-learning' ? { ...a, estado: 'enBorrador', crearAsignatura: true, activa: true, etapaActual: `Paso ${draft.paso} de 3`, ultimaActividad: 'Ahora mismo' } : a
        ),
      }
    }))
    setPantalla('dashboard')
  }

  const getBreadcrumb = () => {
    if (pantalla === 'herramientas') return []
    if (pantalla === 'dashboard') return [
      { label: 'Generación de Asignaturas', onClick: () => setPantalla('herramientas') },
      { label: 'Dashboard', onClick: null },
    ]
    return []
  }

  // Full-page screens that manage their own layout
  if (pantalla === 'crearAsignatura') {
    return (
      <PantallaCrearAsignatura
        titulaciones={titulaciones}
        onCrearAsignatura={(titulacionId, nuevaAsig, generados) => {
          setDraftCreacion(null)
          handleCrearAsignatura(titulacionId, nuevaAsig, generados)
        }}
        onCancel={() => setPantalla('dashboard')}
        onSaveDraft={handleSaveDraft}
        draftData={draftCreacion}
        rolActivo={rolActivo}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8F9FA', fontFamily: "'Proeduca Sans', system-ui, sans-serif" }}>
      {pantalla !== 'herramientas' && (
        <Topbar
          breadcrumb={getBreadcrumb()}
          rolActivo={rolActivo}
          onRolChange={setRolActivo}
          onNotifClick={() => setNotifAbiertas(true)}
          notifCount={1}
          onLogoClick={() => navigate('dashboard')}
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
