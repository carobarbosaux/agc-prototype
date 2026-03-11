# AGC — Plan de Producto
### Roadmap de las 4 fases de desarrollo
*UNIR 2026 · Fase 2 en construcción con Claude Code + Cursor*

---

## Posicionamiento del producto

AGC evoluciona desde un asistente básico hacia un motor de aprendizaje adaptativo. Cada fase eleva el nivel y amplía la ventaja competitiva.

| Fase | Nivel | Estado | Construcción |
|---|---|---|---|
| Fase 1 | Asistente de autor | ✅ Lanzado | Código legado (versión actual) |
| **Fase 2** | **Plataforma de contenido inteligente** | 🔨 **EN CONSTRUCCIÓN** | **Claude Code + Cursor (desarrollo directo)** |
| Fase 3 | LMS + variantes adaptativas | 📋 Planificado | Futuro |
| Fase 4 | LMS Agéntico | 🔭 Visión | Futuro |

---

## Fase 1 — Asistente de autor ✅ LANZADO
**Nivel 1 · Estado actual de producción**

### Qué es
El profesor pide, la IA produce. Flujo lineal de generación: índice → instrucciones didácticas → temario → recursos a fondo → tests de evaluación. El profesor y el coordinador supervisan en cada paso.

### Qué funciona
- Generación de contenido por secciones con IA
- Flujo de revisión Autor → Coordinador
- Navegación por titulaciones y asignaturas

### Problemas identificados (auditoría UX)
- La IA actúa como caja negra — sin transparencia ni control granular
- Navegación confusa: sidebar invasivo + tabs horizontales simultáneos
- Sin visibilidad del estado de cada sección
- Sin sistema de notificaciones
- Botones flotantes que tapan el contenido
- Sin jerarquía visual — el diseño no orienta al usuario
- El contenido se genera como documento suelto — no como banco de contenido estructurado

### Por qué no es suficiente
Hay decenas de competidores en este nivel (Khanmigo, Magic School AI, etc.). Es el peldaño más bajo de la escalera. Para competir y escalar, AGC necesita evolucionar hacia una plataforma de contenido estructurado.

---

## Fase 2 — Plataforma de contenido inteligente 🔨 EN CONSTRUCCIÓN
**Nivel 2 del producto · Construcción: Claude Code + Cursor (desarrollo directo, sin vendor)**

### Qué es
La herramienta deja de generar documentos sueltos y empieza a gestionar un **banco de contenido estructurado**: etiquetado, metadatos, taxonomías de competencias y versiones. Los profesores pasan de ser autores a ser **curadores de conocimiento experto**.

**NOVEDAD en Fase 2:** Dual input — el usuario puede crear contenido de DOS formas:
- **Vía interfaz tradicional:** Botones, formularios, modals, grid de herramientas (lo que existe en Fase 1)
- **Vía interfaz conversacional:** Chatbar con shortcuts (`/comando`) estilo Perplexity/Canva (NUEVO)

Ambas rutas llevan al MISMO canvas de edición. El usuario elige cómo crear.

### Qué se construye

#### ORIGINAL (mantener):

**Rediseño completo del canvas**
- Layout desde cero: sidebar izquierdo como pipeline de etapas con estados, área central de contenido, panel IA a la derecha, barra de acciones fija por rol
- Navegación clara sin doble eje — breadcrumb global + pipeline lateral
- Sin botones flotantes — acciones fijas y contextuales por rol

**Pipeline de aprobación rediseñado**
- Estados visibles en todo momento: Por comenzar / Bloqueado / En borrador / En revisión / Con comentarios / Aprobado / Publicado
- Dependencias de aprobación claras: cada etapa se desbloquea con la aprobación del Coordinador
- Trabajo en paralelo posible entre temas una vez desbloqueado el Temario
- Indicador siempre visible de a quién le toca actuar

**Sistema de comentarios con gravedad**
- Tags obligatorios por comentario: 🔴 Crítico / 🟠 Importante / 🟡 Sugerencia / 🔵 Nota
- Comentarios anclados a bloques específicos (no al documento completo)
- Comentarios Críticos bloquean la aprobación hasta resolverse
- Resumen de gravedad visible en el panel de estado

**IA conversacional y contextual**
- Panel derecho con chat persistente por sección
- La IA recuerda el contexto de lo que se está editando
- El Autor escribe en lenguaje natural — la IA propone en el chat, el Autor decide si aplica
- Toolbar inline al seleccionar texto: Mejorar / Expandir / Resumir / Cambiar tono
- La IA nunca modifica el canvas sin acción explícita del Autor

**Sistema de etiquetado automático**
- La IA etiqueta cada bloque al generarlo
- Taxonomía principal: **dominio temático** — el área de conocimiento del contenido (ej. Inteligencia Artificial, Machine Learning, Procesamiento de Datos, Redes Neuronales, Visión por Computador, Ética en IA, etc.). Esto es lo que permite reutilizar bloques entre asignaturas sin rehacerlos
- Taxonomía secundaria: tipo de contenido (Concepto / Ejemplo / Ejercicio / Resumen / Referencia) + competencia asociada
- El Autor puede editar etiquetas inline
- El Coordinador aprueba etiquetas junto con el contenido
- Bloques sin etiquetar tienen advertencia visible `⚠️`

**Revisión de actualidad del contenido**
- Todo contenido en estado Aprobado o Publicado tiene disponible el botón `↻ Revisar si hay actualizaciones`
- La función la ejecutan el **Coordinador** y el **Especialista de contenido** — no el Autor
- Al lanzarla, la IA analiza el bloque contra fuentes actuales y detecta si algo ha quedado desactualizado por cambios en el mundo real (especialmente relevante en áreas como IA, donde el campo evoluciona muy rápido)
- Si detecta cambios, genera una propuesta de actualización que sigue el mismo flujo de aprobación normal
- El contenido original se mantiene activo hasta que la actualización sea aprobada

**Sistema de notificaciones**
- Accesible desde cualquier pantalla con badge numérico
- Tipos: sección aprobada, comentario nuevo con gravedad, correcciones solicitadas, bloqueo resuelto
- Agrupadas por asignatura, con filtro por tipo y link directo a la sección

**4 roles diferenciados**
- Autor: único que edita
- Coordinador: único que aprueba
- Editor de contenido: comenta
- Diseñador instruccional: comenta y sugiere enriquecimiento de formato

#### AGREGADO (NUEVO) — Author Workflow Enhancement:

**Flujo de creación de asignaturas: 3 pasos en componentes separados**
- **PantallaCrearAsignatura1.jsx** — Paso 1: Ficha académica (metadata pre-rellenada, solo lectura)
- **PantallaCrearAsignatura2.jsx** — Paso 2: Descriptor memoria + contexto (formulario editable: nivel previo, nº temas, enfoque, obligatorios, opciones, archivos)
- **PantallaCrearAsignatura3.jsx** — Paso 3: Resumen asignatura (preview generado por IA, editable, con chatbar de refinamiento)
- UI compartida entre Paso 1 y 2 para cambios precisos
- Tras aceptar Paso 3 → Navega a Canvas sección Índice

**Canvas — Sección Índice (Nueva)**
- Contenido generado por IA: temas, epígrafes, orden
- Author puede modificar/reordenar libremente
- Acciones: [Guardar], [Cambiar orden], [Volver al Resumen], [Enviar a revisión]
- Una vez Completado, se desbloquean los Temas

**Canvas — Sección Tema 1: Indicaciones Didácticas (Nueva)**
- Parte 1: Setup area (enfoque IA, bibliografía, archivos, notas pedagógicas)
- AI generates Topic summary based on instructions
- Si generación > 5s, muestra chain of thought visualization
- Parte 2: Generated summary (introducción, objetivos, desarrollo conceptual con ideas didácticas)
- Estados: Generado / En edición / Completado
- Acciones: [Guardar], [Cambiar indicaciones y regenerar]

**Canvas — Sección Tema 1: Contenido Temario (Nueva)**
- Contenido completo generado por IA (editable con herramientas existentes sin cambios)
- Author puede volver a Indicaciones para modificar y regenerar
- Acciones: [Guardar], [Volver a Indicaciones], [Enviar a revisión]
- Una vez Aprobado, desbloquea A Fondo

**A Fondo (Recursos) — Enhancement**
- Mantiene toda funcionalidad existente
- **NEW: Category labels per reference** (Casos reales, Ampliaciones conceptuales, Tendencias, Lecturas complementarias)
- Author puede asignar categoría a cada recurso para mejor organización

**Pantalla Herramientas con Chatbar conversacional**
- Chatbar superior (input + botón enviar) que soporta shortcuts con `/`
- Grid de herramientas visual debajo (5 tools, preview)
- Usuario puede usar `/generar-asignatura` en chat O hacer clic en card "Generación de Asignaturas"
- Ambas rutas abren el mismo flujo de 3 pasos
- Respuestas conversacionales simuladas

**Pantalla Dashboard rediseñada como Workspace**
- Chatbar conversacional persiste en top (mismo que Herramientas)
- Barra de acciones rápidas: tags filtrables (Todos / Pendientes / Revisión / Aprobadas) + CTA "Nueva asignatura"
- Layout 3 columnas compacto:
  - **Izquierda (240px):** Sidebar de titulaciones navegable (todas habilitadas)
  - **Centro (flexible):** Tabla principal de asignaturas (nombre | estado | pendiente de | última actividad)
  - **Derecha (280px):** "Mis pendientes" — lista de tareas con gravedad/estado, items clickeables → Canvas
- Workspace profesional, eficiente (estilo Notion + Linear)

**Sistema de Chatbar Inteligente (Herramientas + Dashboard)**
- Shortcuts con `/` para acceso rápido:
  - `/generar-asignatura` → Flujo creación asignatura (3 pasos)
  - `/mejora-rúbricas` → Panel mejora rúbricas
  - `/diseñador-actividades` → Panel diseño actividades
  - etc.
- Sugerencias dropdown automáticas al escribir `/`
- Respuestas conversacionales para preguntas genéricas
- Historial de chat (opcional, colapsable)

**Modo de creación dual:**
- Interfaz tradicional: botones, formularios, navegación UI (Fase 1 + mejoras)
- Interfaz conversacional: chatbar, shortcuts, respuestas naturales (NUEVO)
- AMBAS llevan al mismo canvas de edición
- Usuario elige qué le gusta usar

### Lo que NO se construye en esta fase
- Llamadas reales a OpenAI/Claude API (todo simulado)
- Generación de variantes (Fase 3)
- Integración con LMS (Fase 3)
- Capa de datos del alumno (Fase 3)
- Motor adaptativo (Fase 4)

### Por qué es el salto competitivo clave
1. **Contenido estructurado:** El etiquetado automático es la infraestructura que Fase 3 necesita
2. **Dual input:** Interfaz moderna (conversacional) + eficiencia (tradicional) = accesibilidad
3. **Workspace inteligente:** Dashboard rediseñado es funcional, no sobrecargado
4. **Control granular:** Sistema de comentarios + roles + notificaciones = governance completo

---

## Fase 3 — Integración LMS + variantes adaptativas 📋 PLANIFICADO
**Nivel 3 del producto**

### Qué es
Una vez que el Coordinador aprueba el contenido master en Fase 2, la IA genera automáticamente **variantes adaptadas al tipo de aprendizaje del alumno**. Estas variantes se integran con el LMS y se sirven según el comportamiento y comprensión demostrada de cada alumno.

### Qué se construye

**Generación automática de variantes**
- Una vez aprobado el contenido master, la IA genera variantes: Introductoria / Estándar / Avanzada
- Tres agentes de escritura calibrados: Agente Introductorio (lenguaje accesible, analogías), Agente Estándar (balance teoría-práctica), Agente Avanzado (profundidad técnica, referencias académicas)
- El Autor y Coordinador revisan y aprueban cada variante antes de que entre al sistema
- Panel de variantes: las versiones lado a lado con estado de aprobación individual

**Integración con LMS**
- El contenido aprobado fluye directamente al LMS
- La evidencia de aprendizaje del alumno fluye automáticamente al libro de calificaciones
- Los estudiantes interactúan con la IA durante las tareas

**Motor de evaluación adaptativa**
- La IA evalúa al alumno a través de las preguntas que hace y las respuestas que da
- Detecta dónde se atasca, qué conceptos no comprende, qué patrones se repiten
- Adapta el contenido en tiempo real: si el alumno no comprende la versión Estándar de un bloque, el sistema sirve la versión Introductoria automáticamente
- No es un A/B test editorial — es adaptación continua basada en comportamiento real

**Arquitectura técnica**
- Hub de aprendizaje unificado: LMS + LXP (Learning Experience Platform)
- Marco de competencias integrado
- Agentes IA conectados con HRMS, CRM y herramientas de colaboración

### Dependencia crítica con Fase 2
Las variantes de Fase 3 solo son posibles si el contenido de Fase 2 está **estructurado como objetos independientes con etiquetas**. Cada bloque etiquetado como `Introductorio · Concepto · Tema 2` es un nodo del grafo de aprendizaje que el motor adaptativo recorre.

---

## Fase 4 — LMS Agéntico 🔭 VISIÓN
**Nivel 4 del producto · Frontera del mercado**

### Qué es
El profesor pasa de ser autor o curador a ser **supervisor del sistema adaptativo**. Múltiples agentes colaboran de forma autónoma para gestionar, actualizar y personalizar el contenido de cada alumno. El alumno recibe un camino de aprendizaje único — no una versión del curso.

### Los 6 agentes asistidos

| Agente | Función |
|---|---|
| **Agente de contenido** | Genera y actualiza material de forma continua |
| **Agente de metadatos** | Gestiona etiquetas y taxonomías automáticamente |
| **Agente de alineación curricular** | Verifica coherencia con competencias y estándares |
| **Agente de rutas** | Remodela itinerarios de aprendizaje por alumno dinámicamente |
| **Agente de evaluación** | Evalúa competencia aplicada, no solo respuestas correctas |
| **Agente de feedback** | Refina estrategias de contenido con analítica de rendimiento |

### Cómo funciona
- Los agentes proponen acciones y cambios — siempre requieren solicitud y aprobación del usuario antes de ejecutarse
- El profesor revisa rutas sugeridas, aprueba cambios estructurales y mantiene el control editorial
- El alumno recibe opciones de contenido personalizadas según su historial de comprensión
- El sistema aprende y mejora con cada cohorte de alumnos, pero siempre dentro de los parámetros que el equipo ha definido y aprobado

### Potencial de negocio
- UNIR puede licenciar la plataforma a otras instituciones
- El marketplace de agentes educativos se convierte en producto independiente
- Modelo replicable en otras áreas de UNIR (marketing, operaciones) — conecta con el proyecto AEM

---

## Visión de continuidad entre fases

```
Fase 1 (hoy)          Fase 2                Fase 3                Fase 4
─────────────         ──────────────        ──────────────        ──────────────
Documento suelto  →   Objeto etiquetado →   Variante adaptada →   Ruta personalizada
                                                    ↑
                                         Datos del alumno (LMS)
```

El contenido creado en Fase 1 es la materia prima de Fase 2.
El contenido etiquetado de Fase 2 es la infraestructura de Fase 3.
Las variantes aprobadas de Fase 3 son los nodos del motor de Fase 4.

**Ninguna fase es un rediseño de la anterior — cada una la amplía.**

---

## Fase 2 — Detalles de construcción actual (Claude Code + Cursor)

### Stack tecnológico
- **Framework:** React (Vite)
- **Estilos:** Tailwind CSS v4 (utilidades únicamente)
- **Iconos:** lucide-react
- **Estado:** useState / useReducer (sin backend)
- **Datos:** mockData.js (hardcodeados, sin API)
- **Routing:** estado interno (sin react-router)

### Pantallas

1. **Herramientas (Rediseñada)**
   - Chatbar conversacional + grid de tools
   - Dual input: `/generar-asignatura` OR click en card

2. **Dashboard → Workspace (Rediseñada)**
   - Chatbar + layout 3 columnas (Sidebar | Tabla | Mis Pendientes)
   - Interfaz limpia, funcional

3. **Modal Creación Asignatura**
   - 5 pasos: Titulación → 11 preguntas → Resumen → Crear
   - Accesible vía chat O botón

4. **Canvas (Rediseñado)**
   - 3 columnas: Pipeline | Contenido | Panel IA
   - Resumen como sección primera (nueva)
   - Sistema comentarios + etiquetas + toolbar IA
   - 4 roles diferenciados

### Construcción sin vendor
- Desarrollo directo con Claude Code en Cursor
- No es un prototipo externo
- Es el código real que evoluciona

---

*Documento de producto actualizado: Fase 2 agreg nuevas capacidades conversacionales mantiene TODO lo anterior*
*Construcción: Claude Code + Cursor (desarrollo propio)*
