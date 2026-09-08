# Barro y Ceniza — librojuego

> **LÉEME PRIMERO — contexto del proyecto (actualizado 2026-09-04):**
>
> - **Qué es:** *Barro y Ceniza — la vida y el sufrimiento de un jugador del
>   Barro*. Librojuego biográfico: eliges raza, vives desde la infancia y
>   sobrevives (o no) a tres muertes en el deporte más violento del Mundo Viejo.
>   React + Vite, una sola página, sin backend ni base de datos. Se publica como
>   estático (itch.io).
> - **Proyecto INDEPENDIENTE de Arkaria** (repo `stl-marvel-tracker-next`, web de
>   catálogo de figuras 3D). **No mezclar los dos jamás.** Si una sesión empieza a
>   hablar de figuras, makers, Firebase o Cloudflare R2, está en el proyecto
>   equivocado.
> - **También independiente de `Nufflepedia` y `BloodBowlManager`**, aunque los
>   tres compartan el mundo de Blood Bowl. Son tres productos distintos.
> - **Idioma: español de España, TUTEO** (tú / tienes / cuéntame / aquí).
>   **NUNCA voseo ni español latino** (nada de vos / tenés / contame / acá).
>   El cliente es de Madrid.
> - **Modo asesor:** evaluar las propuestas de forma crítica, hacer preguntas y
>   recomendar con criterio — no solo obedecer y construir.
> - **Cliente no técnico** (product owner): explicarle todo en resultados
>   observables ("se ve así", "probé X y pasó Y"), nunca pedirle que revise
>   código o diffs.

## ⚖️ NORMATIVA: la biblia de sistema manda (decisión 2026-09-06)

**`docs/biblia-sistema.md` (v1.19) es el documento normativo del proyecto.**
Cualquier historia, raza o capítulo se rige por lo que dice. El libro del
halfling desarrollado por el cliente vive en `docs/halfling/` (7 capítulos + el
duelo de la abuela, prosa patrón oro). Si una escena necesita saltarse una
regla, primero se cambia la biblia y luego se escribe la escena.

**Migración a 1D6 en curso** (`docs/MIGRACION-1D6.md`). El motor de partido pasa
del `2d6 + característica` actual al **1D6 contra número objetivo** de la biblia.
Se hace por fases, ramificando por raza para no romper el juego: **el halfling es
el piloto** (Fase 1); las otras cuatro razas siguen en 2d6 hasta que les toque.
Mientras la migración no termine, conviven los dos motores. Todo lo escrito
abajo describe el motor 2d6 y la build actual: es correcto hasta que cada fase
lo sustituya. **Consulta `docs/MIGRACION-1D6.md` antes de tocar tiradas, fichas
o el motor de partido.**

**Catálogo de acciones de partido normativo** (`docs/acciones-partido.md`).
Hermano de la biblia: **manda sobre las acciones del minijuego de partido** (las
3-4 opciones de cada jugada clave). Documenta los siete tipos de jugada, el
repertorio por tono (serio `PLAY_POOL` / comedia `PLAY_POOL_HALF`), la ficha de
cada acción y el patrón del aliado (Roblerto y sus variantes "sin árbol"). Idea
del cliente: reutilizarlo entre razas e historias futuras y ampliarlo con el
tiempo (~20 textos por tipo). **Para una acción nueva o un cambio de tono: primero
se afina aquí, luego se traslada al código.** Decisión futura no tomada: que el
juego lea el documento directamente (fuente única), en vez del traslado a mano.

## ✅ Estado del repo: el fuente ya está, y los arreglos reaplicados

**El proyecto fuente ya está en el repo** (`src/App.jsx`, `src/main.jsx`,
`index.html`, `vite.config.js`, `package.json`, `package-lock.json`), subido
primero tal cual (foto fiel antes de tocar nada) y, en un commit aparte, con
**los diez arreglos del build v8 reaplicados sobre el fuente**. Se tradujeron
letra por letra desde el bundle parcheado, usándolo como verdad sobre el
terreno. Verificado: `npm run build` limpio y prueba en navegador de las cuatro
razas (tres partidos cada una) sin errores, con el marcador diciendo "turno" y
las estadísticas de carrera acumulándose.

`build-v8-parcheado/` se conserva como referencia histórica; ya no es la única
copia de los arreglos, así que dejó de ser frágil.

> Nota de revisión pendiente: la frase alternativa del arreglo 7 ("Donde dormía
> el troll no hay nada…") la redactó Claude en el build v8, no es voz del
> cliente. Conviene que la repase.

> Nota de revisión pendiente (partido jugada a jugada, Fase 2): TODA la prosa de
> las jugadas clave (el pool: saque, ataque, choque, baile, remate, muralla) y
> la frase de entrada al partido ("Suena el silbato…") la escribió Claude,
> imitando la voz del cliente. No es voz del cliente. Está pensada para
> revisarla y reescribirla. Vive en `PLAY_POOL` dentro de `src/App.jsx`.

## Partido "jugada a jugada" (motor nuevo, Fases 1-2)

El minijuego de partido ya no avanza turno a turno: cada partido son 2-3
**jugadas clave** en las que decides con tu **ficha real** (características +
habilidades a la vista, y cada opción dice qué característica la resuelve).
Tras las jugadas clave se juega la **jugada decisiva** que cada partido ya
tiene escrita (sus `opciones`), así no hubo que reescribir los 38 partidos.

- **Catálogo de tipos** (`MATCH_TIPOS`): liga, derbi, caja (enano), bandada
  (orco), exhibición (elfa), final (torneos), remontada (empiezas 0-1), muro
  (defiendes ventaja) y última (solo la jugada final). Cada partido elige tipo
  con `partido.tipo`; si no, coge el de su raza. Un partido puede volver al
  motor viejo con `partido.clasico: true`.
- **La prosa de entrada del partido se muestra en la jugada decisiva, no
  antes.** Antes de saltar al campo sale una frase neutra ("Suena el
  silbato…") para no chocar con textos escritos como "turno dieciséis, el
  balón en tus manos". Ese texto original aparece justo en la decisión final.
  Consecuencia: algún texto con marca temporal ("en la primera jugada…")
  queda un pelín a destiempo. Si molesta en un partido concreto, se suaviza
  su intro. Es decisión del cliente hasta dónde retocar.
- **La prosa de heridas y muertes del partido** (aturdido, KO, magullado,
  apaleado, herida persistente, −1 permanente y las muertes con sabor —la
  grada, el rival, el barro—) la escribió Claude imitando la voz del cliente,
  con su OK. Vive en `HERIDA_PROSA`. Marcada para revisión con el resto.
- **Variedad de intros (para que no empiece siempre igual).** Cada jugada
  clave del pool tiene varias frases de cabecera (`h`) y de situación (`situ`)
  base (`varia`/`semJugada`/`flavRival`), y la frase de apertura del partido
  ("Salta al campo…") elige entre cuatro variantes. Prosa de Claude, marcada
  para revisión.
- **Crónica del partido (idea del cliente, FASE 1 — en co-diseño).** Encima de
  las frases base, cada jugada clave se abre ahora narrando el ESTADO REAL del
  partido: qué os jugáis (racha/torneo), qué parte es (`parteFrase`), el
  marcador (`marcadorFrase`), quién está tocado o con el boticario
  (`lesionadosFrase`) y a quién le toca (`accionFrase`: tienes el balón / os
  toca defender). Se compone de datos vivos (`cronicaSitu`/`cronicaH`,
  aplicadas al `jplay` en el render), así que vale para los 38 partidos sin
  escribir uno a uno. Ejemplo real: "Primera parte y perdéis 0-1. Ellos suben:
  os toca defender" → "Segunda parte y perdéis 0-1. Estáis a un paso de su
  línea". **Pendiente de fases siguientes** (acordadas con el cliente, aún por
  construir): el texto de cierre que se adapta al marcador y a las lesiones,
  partidos con final escrito (gana/pierde por guion), un "momento del prota" de
  éxito garantizado con cuentagotas, compañeros que caen durante el juego, y
  4 acciones en las jugadas gordas. Prosa de Claude, marcada para revisión.
- **El halfling juega con su PROPIO pool** (`PLAY_POOL_HALF`, elegido por
  `poolDe(pj)`): mismo motor y mismas tiradas (ST/AG/MA, riesgo, heridas), pero
  otras acciones, en clave de comedia negra —rodar hecho un ovillo, dejar que
  Roblerto te confunda con la bola y te lance, la "piña" (rodar todos hechos una
  albóndiga), sentarte encima del balón, esconderte tras el estofado del Chef—.
  Las otras cuatro razas siguen con `PLAY_POOL`, el serio. Toda la prosa del
  pool halfling es de Claude, marcada para revisión con el resto de la rama.
  **Si vendes a Roblerto (o fichas por Mortaigne), sus 7 jugadas se sustituyen
  por variantes "sin árbol"** (`sinRoblerto(pj)`): a pulso, la muralla de
  halflings, a pelo… más pobres y con −1, para que la ausencia se note en cada
  partido. Antes las jugadas de Roblerto salían aunque lo hubieras vendido (bug).
- **Jugada que no busca ganar, "reputación con el equipo" (nota del cliente).**
  El primer partido del halfling (`primerPartido`) tiene una 4ª opción:
  "proteger a un compañero caído" en vez de buscar el gol. Prueba de ST (que ya
  incorpora Ferocidad en el motor), riesgo real. Éxito o fallo dejan la marca
  `protegisteCaido` y suben `rel.equipo` (la reputación en el vestuario, +3/+1),
  sin buscar touchdown — define quién es el prota. Vuelve en la víspera de la
  final (cap 6, `visperas`), contra esos mismos Carniceros: si protegiste, el
  vestuario te sigue. Prosa del cliente (la escribió él), marcada igualmente.
- **La confianza de Roblerto pesa en sus jugadas (nota del cliente).** La
  relación con el árbol (`rel.arbol`, que sube con pasteles y baja si le robas)
  ya no es solo texto: en las 6 jugadas con Roblerto del pool halfling cambia la
  narración y la tirada (`confRob`). Buena (≥2): "te reconoce por el olor y va a
  la primera", +1 al dado. Mala (≤−1): "te mira, mira el balón, decide que los
  dos sois sospechosos", −1. El modificador sale a la vista en la opción
  ("Roblerto +1/−1"). Vía un campo `bonus` que `rollKey` ya suma a la tirada.
- **Cómo se miden las acciones del partido (recalibrado).** El modificador de
  una jugada clave es tu VENTAJA sobre el estándar del reglamento
  (característica − 3; velocidad ≈ −2), no la característica en bruto, y los
  objetivos del pool se recentran a 6-8 (`objDe`). Así 2d6 manda, el objetivo
  importa, y fallar es posible (sobre todo sin repeticiones), que es lo que
  hace que las heridas pesen. **La jugada decisiva escrita usa la misma escala
  centrada** (en `resolverTirada`, solo cuando hay partido): característica − 3
  y objetivo − 2. Sus bonos de habilidad/relaciones/forma siguen sumando por
  encima —es el momento en que tu build paga—, pero ya no salen totales de 17.
- **El rival también ataca (partidos ganables con sudor).** Antes tus jugadas
  marcaban pero el rival casi nunca lo hacía (los `ko` solo te quitaban la
  bola), así que ganabas el 95-97%. Ahora, en cada jugada clave, el rival hace
  **su propio intento de gol** (`RIVAL_MARCA`): `2d6 + fuerza ≥ 10 + defensa`,
  donde tu defensa sale de tu ST/AG y de si tienes tú la bola. Escala con la
  fuerza del rival y con tu ficha. Medido (simulación y partida real): un pro
  gana la liga ~80-90% pero un final contra un rival elite (fuerza 4) baja a
  ~30-50%; un crío sufre; una ficha muy montada gana hasta los finales duros.
  Marcadores tipo Blood Bowl (2-1, 3-2, 1-0, y derrotas 1-3). Prosa del gol
  rival marcada para revisión. El umbral (10) es la perilla de dificultad.
- **Las jugadas clave tienen riesgo real.** Una opción arriesgada que falla
  pasa por el sistema de heridas del reglamento (armadura → heridas →
  apotecario → D16: aturdido / KO / magullado / apaleado / herida persistente
  / **−1 permanente** / **muerte**), el mismo que la jugada decisiva escrita.
  Antes solo daban fatiga. Ahora puedes morir o lesionarte de gravedad en
  cualquier partido, y jugar apaleado (vendado) te hace más frágil (−1 a las
  tiradas y las heridas cuentan más). El sistema vive en `tirarHerida`,
  compartido por `jugarJugada` y `resolverTirada` (una sola copia de las
  reglas). Morir en una jugada clave corta el partido y entra la muerte.

## Qué es el juego, por dentro

Cuatro ramas completas y distintas, no una historia con la piel cambiada:

| Rama | Puesto | Empieza siendo | Arco |
|---|---|---|---|
| Humano | Blitzer Humano | un niño en un callejón de Valdoria | sube desde Sexta hasta el Estadio Imperial |
| Enano | Corredor Enano | un profesional joven en Segunda | desciende, se amotina y vuelve |
| Orco | Blitzer Orco | una cría en un cesto, en un río | monta una banda desde la nada |
| Elfo silvano | Bailarina guerrera | campeona de Primera con 300 años | **cae** hasta Sexta |

Volumen: 7 capítulos por rama, **141 escenas**, ~680 opciones, 106 tiradas,
38 partidos, ~40.000 palabras. Puedes morir tres veces; la cuarta no cuenta
**(salvo el halfling, ya migrado: muerte definitiva a la primera — ver decisión 4).**

Mecánica principal (motor 2d6, las cuatro razas aún sin migrar): **2d6 +
característica + atributo/3 + habilidades** contra un
objetivo (7 a 11). Si fallas una tirada con riesgo: armadura 2d6 ≥ AV, heridas
2d6 (aturdido / KO / baja) y bajas en un D16 con la muerte en 15-16. Apotecario
una vez por partido. Además hay un minijuego de partido por turnos con clima,
patada inicial, compañeros con ficha propia y fatiga.

Entre capítulos hay **entreactos**: dos "tardes libres" en las que eliges
actividades (entrenar, ver a la familia, beber con alguien).

## Halfling — "Los Comepasteles" (5ª rama completa, comedia negra)

Quinta rama **entera y jugable** (7 capítulos, del crío de la Comarca al ocaso
del pastel), en el mismo motor que las otras cuatro. La escribió Claude,
**comedia negra y gamberra**, y está **pendiente de revisión entera** (es la
primera rama 100% no-cliente). Verificada: `npm run build` limpio y recorrido en
navegador cap 1→7 (9 partidos) hasta el epílogo, sin errores.

- Arco: 1 Villapastel · 2 La liga de los mataos (Sexta) · 3 El escándalo del árbol
  · 4 La oferta (te quiere un club de Tercera) · 5 La Copa de los Pringados ·
  6 La final imposible · 7 El ocaso del pastel. 9 partidos, con su tentación
  central ("Ganar como los grandes": vender a Roblerto, fichar por Mortaigne o
  envenenar la final) que el epílogo juzga.
- **Rama Mortaigne real (cap 5 B), añadida 2026-09-07.** Firmar por Mortaigne en el
  cap 4 (`fichastePorMortaigne`) ya no es solo cambio de frases: te lleva a un
  **cap 5 alternativo** de cuatro escenas —`mortaigneLlegada` (la camiseta negra;
  Serrault, Drache, Kessler), `mortaigneTercera` (partido de Tercera, aprender a
  hacer daño), `laOlla` (el veneno, decisión de tres salidas) y `mortaigneVuelta`
  (volver a casa)— gateadas con `condicion: fichastePorMortaigne`; las cuatro
  escenas de la Copa se gatean con `!fichastePorMortaigne`. **Reconverge en el cap 6**
  (`visperas`, ampliada a tres vías: Copa / Mortaigne / nada). Sin castigo moral
  (biblia §18.2): desde Mortaigne se puede ganar la final. Las decisiones vuelven
  en `recuerdos`. Prosa de Claude (comedia negra más oscura), marcada para revisión.
  Pendiente fino: los partidos de Mortaigne usan el pool cómico del halfling; la
  jugada decisiva sí va en tono oscuro.
- Vive en `HALFLING`, `HALFLING_ALIADOS`, `HALFLING_TRANSICIONES`,
  `HALFLING_ENTREACTOS`, `HALFLING_TIEMPO`. Registrada en `HISTORIAS`, `ALIADOS`,
  `ACCESO`, `razaDefaultTipo`, `TRANSICIONES`, `ENTREACTOS`, `TIEMPO`, `TENTACION`,
  `IMAGENES`, `DIV_POR_CAP` (Sexta→arriba→barro), `MUERTE_ETAPA` (caps 1-7) y el
  nombre por defecto ("Berto Migas"). **No entra en los bucles de torneos/leyenda**
  (solo iteran [HUMANO,ENANO,ORCO,ELFO]); su copa y su final son escenas escritas
  a mano dentro de la rama, no del sistema `TORNEOS`.
- Ficha de pringado (MA6 ST2 AG3 AV7, Esquivar), profesional desde el principio
  (sin `fichaInicial`): con la dificultad nueva, el halfling **suda cada partido**
  y ganar/empatar es una gesta — que es la gracia.
- Reutiliza a **Pipo Cazuelas**, el agente halfling de tres dedos que ya salía en
  las noticias del mundo. Equipo: los Comepasteles, con Roblerto (el árbol que te
  confunde con el balón) y Bortrand (el Chef que roba la cerveza rival).

## Números de serie limados — decisión de producto, mantenerla

En todo el juego **no aparece "Blood Bowl" ni una vez**, y es a propósito:

| Canon | En el juego |
|---|---|
| Nuffle | **Ludo** |
| Cabalvisión | **Cristalvisión** |
| Gork y Mork | **Gorg y Morg** |
| jugadores estrella oficiales | ninguno |

Es un pastiche legalmente limpio, pensado para poder publicar y monetizar sin
marcas ajenas — la misma jugada que el rebranding de Arkaria. **Mantener el
disfraz.**

Ojo: la **terminología de reglas sí es la oficial traducida** (Placar, Cabeza
dura, Golpe mortífero, Sobornos y Corrupción…). El disfraz está a medias y hay
que decidir hasta dónde llega (ver decisiones pendientes).

## Los arreglos ya aplicados (build v8)

1. **Bug crítico**: una variable `suelta` sin declarar rompía dos de las tres
   acciones del minijuego de partido. Error de JavaScript reproducible en las
   cuatro razas.
2. **Dorin** seguía alineándose tras quedarse sentado en el campo: "El turno
   doce" tiene cuatro salidas y la plantilla comprobaba tres.
3. **Faelas**: no se le podía pasar el balón en la final si te lo quedabas por
   votación del vestuario.
4. **Apotecario**: repetía la tirada de heridas y se quedaba con la nueva fuera
   cual fuese; podía dejarte peor. Ahora se queda con la mejor, como el
   reglamento.
5. **"Árbitro intimidado"** (patada inicial 2) anunciaba una falta gratis que no
   hacía nada. Ahora da +2 y se consume.
6. **Gorgomor**: podías dormir abrazado al troll que habías vendido.
7. El **"si está"** de esa misma escena, partido en dos variantes reales.
   (La frase alternativa la escribió Claude — revisarla, no es voz del cliente.)
8. El marcador del partido decía `min 3/5`; ahora dice `turno 3/5`.
9. **Red de seguridad**: había tres escenas con todas las opciones bloqueadas
   donde la partida podía quedarse encallada sin ningún botón pulsable.
10. **Estadísticas de carrera**: el juego contaba touchdowns, bajas y pases
    dentro de cada partido y los tiraba al acabar. Ahora se acumulan y salen en
    el Libro del destino y en el epílogo.
11-14. **Los cuatro "si está" de Wazzok** (capítulos 3, 4, 5 y 6), convertidos en
    condiciones reales sobre la marca `wazzokEnLaBanda`, que ya existía. Aquí no
    hizo falta inventar prosa: solo partir la frase.

## Momentos del partido (pantallas intermedias, idea del cliente)

Entre tus jugadas clave aparece a veces un **"momento del partido"**: una
pantalla intermedia con botón *Seguir* que cuenta lo que pasa fuera de tu
jugada. **El gol del rival ya no se pega a tu jugada: sale en su propia
pantalla** ("Mientras tanto… Carniceros marca. 0-1"), con el marcador ya movido
y un chip. Además hay momentos de color sin gol (la grada, un tiro rival
fallado, un compañero que cae y se lo lleva el boticario — este sí banca a un
aliado, alimentando `lesionadosFrase`). Fires: el gol del rival → siempre su
momento; si no hay gol, ~50 % un momento de color; si no, se pasa directo a la
siguiente jugada. Vive en `MOMENTO_GOL_RIVAL`/`MOMENTO_FLAVOR`, la fase
`"momento"` del partido, `jugarJugada` y `seguirMomento`. Afecta a las cinco
razas (motor de partido compartido). Prosa de Claude, marcada para revisión.

## Las finales de torneo se deciden de verdad (no empatas y ganas)

En una **final de torneo** (`escena.partido.torneo`), la jugada decisiva decide
el título: si la clavas (gol), el marcador queda a tu favor (subcampeón imposible
por empate); si la fallas (golRival), quedas subcampeón. Antes el título salía de
la **marca** del guion (`campeon`/`ganasteLaCopa`) al acertar la jugada, aunque el
marcador quedara en tablas — así podías "empatar 3-3 y ser campeón sin trofeo"
(el trofeo sí exigía ganar). Ahora el marcador, el título, el trofeo y el texto
("Habéis ganado"/"Perdéis") van juntos. Vive en `resolverTirada` (una guarda
sobre `marc` antes de calcular `res`). **En liga un empate sigue siendo un empate
legítimo** (la guarda solo aplica a torneos).

## Liguilla / contexto de campeonato (Fase 3)

Hay una **tabla de liga** accesible desde la cabecera ("La tabla"), solo en
los capítulos con división (no en la infancia ni el ocaso). Es **híbrida**:

- **Tu fila es real**: tu puesto sale de tus resultados de verdad (victorias,
  empates y derrotas del palmarés en la división actual), con una proyección
  regresada a la media de liga para que una sola victoria no te ponga invicto.
- **Los rivales están simulados** de forma estable (barajado determinista por
  raza/división/capítulo). No es un simulador de temporada.
- La **división de cada capítulo** se deduce de `DIV_POR_CAP[raza][cap]` (no de
  `pj.division`, que solo estaba puesto a medias). Zonas: suben los 2 primeros
  (salvo Primera) y bajan los 2 últimos (salvo Sexta). La elfa empieza en
  Primera, donde solo se puede bajar — encaja con su caída.

Si algún día se afina: los nombres de rivales por división viven en
`RIVALES_DIV`, y el arco de divisiones por rama en `DIV_POR_CAP`.

## Tablero de tarjetas / storyboard (herramienta de revisión, aparte del juego)

Para que el cliente **vea y organice** la historia y los partidos como fichas
(idea suya), hay un generador en `tools/storyboard/`:

- `tools/storyboard/build.mjs` extrae el contenido de una rama **desde
  `src/App.jsx`** (con esbuild, resolviendo cada `texto(pj)` con un jugador
  neutro), así el tablero **no se escribe a mano y no se desincroniza** del
  juego. `tools/storyboard/template.html` es la web (una sola página, vanilla
  JS, sin backend). Salida: `halfling-storyboard.html` en la raíz (ignorada por
  git; se regenera con `node tools/storyboard/build.mjs`). El mismo comando
  emite además **`halfling-guion.md`**: la rama entera en Markdown descargable
  (el visor de Artifacts no deja descargar, así que el .md se genera y se envía
  como archivo). Ambas salidas están ignoradas por git.
- Es una **web aparte**, publicada como Artifact privado del cliente. Muestra
  los 7 capítulos del halfling en orden con escenas, partidos (rival/fuerza),
  transiciones, tardes libres y las 3 muertes. El cliente puede leer, **marcar**
  (OK / revisar / reescribir / cortar), **anotar** y **reordenar dentro del
  capítulo** (▲▼); todo se guarda en su navegador (localStorage). Un botón
  "Copiar cambios para Claude" vuelca sus notas/marcas/reordenamientos como
  texto para pegármelo, y **yo aplico los cambios al juego** (flujo acordado:
  "ver y organizar", sin sincronización automática de vuelta).
- De momento **solo el halfling** (la rama pendiente de revisar entera). Si
  funciona, se extiende a las otras cuatro ramas (el generador ya vale para
  todas cambiando la rama que exporta).

## El resultado deja huella (Fase 4)

Ganar o perder ya mueve cosas, sin escribir dos versiones de cada partido
(los "posos", en `pososPartido`):

- **Racha** (`pj.racha`) y **récords** (`pj.records`: mayor victoria, mejor
  racha), que salen en el "Al vestuario" y en el Libro del destino.
- **Fama y afición** con toques modestos y escalados por división (los saltos
  gordos de fama siguen viniendo de las opciones escritas y los trofeos, para
  no descuadrar las puertas que piden fama).
- **Titulares de racha** en la Cristalvisión (tres/cinco seguidas, tres
  derrotas seguidas).
- **Movimiento en la tabla**: tras el partido, el "Al vestuario" dice si subes
  o bajas de puesto. Los rivales de la liga tienen un reparto de puntos FIJO
  (no anclado a los tuyos), así que ganar te sube de verdad y perder te baja.

Toda la prosa de los posos (titulares de racha, "La huella") la escribió
Claude; marcada para revisión con el resto.

## Decisiones pendientes — NO avanzar sin el OK del cliente

Ninguna de estas es un bug: son decisiones de producto. Están analizadas con
números en los informes enlazados abajo.

1. **¿Blood Bowl 2020 o la edición clásica?** El juego mezcla las dos: las
   armaduras están en formato 2020 y la agilidad y el sistema de subir de nivel
   son de la clásica. Es la decisión que más cosas destraba: arregla de golpe la
   agilidad, el PA que falta, las habilidades de inicio y el tope de subidas.
2. ~~**La curva de fichas.**~~ **HECHO (2026-09-04).** El humano y el orco ya
   empiezan con una **ficha de crío** (`H.fichaInicial`, más floja y sin el
   rasgo de equipo), que sube a la del reglamento (`H.base`) el día que firman
   como profesionales (`H.firmaCap`: humano cap 3, orco cap 2), vía el efecto
   `fichaPro` en `aplicar`, enganchado en `TIEMPO`. El enano ya era profesional
   desde el capítulo 1 y la elfa es campeona desde el principio: esos dos se
   quedan con la ficha completa, que es lo correcto. El Libro y la portada
   distinguen "aún sin fichar" de profesional. *Nota:* la subida sube (nunca
   baja), así que lo que crezcas de crío se conserva al firmar. Sigue pendiente
   el punto 3 (las tardes libres pueden inflar antes de firmar).
3. ~~**Las tardes libres.**~~ **HECHO (2026-09-04).** Ya no inflan la ficha:
   **antes de firmar** (de crío) suben características, pero **con tope en la
   ficha del reglamento** (no puedes pasarte); **después de firmar** (`pj.pro`)
   dan **"forma"** (empujón temporal para el próximo partido) en vez de
   características, como el reglamento (las características ya solo suben al
   subir de nivel). Así, al llegar a profesional, tu ficha es **exactamente la
   estándar**. El cambio vive en `elegirEntreacto` (stat→forma si `pro`) y en
   el tope de `aplicar` (las subidas de crío no pasan de `base`). Verificado:
   el enano (profesional desde el principio) recibe "forma"; el humano de crío
   recibe "+1 ST/AG" capado.
4. ~~**Las tres muertes.**~~ **DECIDIDO para el halfling (2026-09-07), piloto.**
   Se quita el resucitar: **si mueres, mueres** (muerte definitiva, sin colchón).
   A cambio, la mayoría de los golpes graves van a **lesión** (la banda alta de la
   tabla D16 se ensancha) y la **muerte solo cae con un 16 natural** (config B,
   simulada: muere ~2,6 % de las carreras de un jugador normal, ~4 % temerario;
   el resto salen con cicatrices o enteros). La muerte definitiva muestra el
   **epitafio de la etapa** (`MUERTE_ETAPA`, ya escrito para las cinco razas) en la
   pantalla `MuerteFinal`. Controlado por el predicado `muerteDefinitiva(raza)`
   (halfling + **orco desde 2026-09-07**): al migrar cada raza se añade ahí, una
   sola línea; las no migradas siguen con las tres vidas (`MAX_MUERTES`). Vive en
   `tirarHerida` (banda 13-15 permanente / 16 muerte) y en los dos manejadores de
   muerte (`jugarJugada`, `continuar`), con `tope 0`. Nota: el orco es un tanque
   (AV10), así que muere por dados muy poco; su peligro mortal de verdad son los
   momentos con guion. Pendiente al migrar el resto: qué se dice en la
   portada (que aún promete "tres muertes").
5. **Cuánto reglamento meter en el partido**: turnover y dados de bloqueo lo
   acercan al tablero y lo alejan del librojuego. Es decisión de producto.
6. **Renombrar "Voluntad"**, que hoy significa dos cosas distintas: la reserva
   que gastas para forzar opciones y uno de los cinco atributos.
7. **Tres muertes escritas que no pueden ocurrir**: Lirael, Durgin y Grubnak
   tienen frase de consecuencia y ninguna escena las activa. Hacen falta escenas
   nuevas — las escribe el cliente.
8. **El "jugador del partido" se da casi siempre** (seis de seis en una partida
   medida). En Blood Bowl se sortea.

## Reglas de trabajo

- **Fases chicas**, nunca un refactor masivo de una vez. Nunca romper el juego.
- **Verificar de verdad**: `npm run build` limpio y prueba en navegador antes de
  dar nada por terminado. No basta con que compile.
- **Regla de continuidad — una marca por estado, no una por opción.** Es la
  causa raíz de los fallos de continuidad. Cuando una escena tiene varias
  salidas que significan lo mismo ("Dorin ya no juega"), cada opción deja su
  marca de *matiz* (cómo pasó) **y además** una marca de *estado* compartida
  (`dorinRetirado`). Las plantillas y los textos preguntan **solo por el
  estado**. Así, añadir una salida nueva no resucita a nadie.
- **El 43 % de las marcas que pone el juego no las lee nadie después** (166 de
  383). Al escribir una escena nueva, comprobar que lo que promete recordar
  vuelve de verdad.
- **Buscar `si está` y `si vive` en el texto**: donde el juego tiene que decir
  eso, es que la escena no sabe si el personaje sigue ahí. Había siete casos.
  Los cinco con una marca detrás ya están arreglados (uno de Grimgutz, cuatro de
  Wazzok). **Quedan dos "si vive" —Snotlig y Skabnik— y son de otra clase:
  hedgean sobre una muerte que el juego no permite.** Ninguno de los dos tiene
  marca de muerte en ninguna parte, así que o se escribe la escena en la que
  pueden morir, o se quita el "si vive". Es decisión del cliente.
- **El juego está solo en español.** Si algún día se publica en itch, el inglés
  es donde está el público de Blood Bowl.
- **No inventar prosa del juego sin avisar.** La voz es del cliente; si hace
  falta una frase nueva para arreglar algo, se marca para que la revise.

## Pendiente de producto (fuera del juego)

- No tiene **favicon** ni **imagen de previsualización**: si compartes el enlace
  sale pelado.
- El **título de la portada no es el título del juego**: la pestaña dice "Barro y
  Ceniza" y la pantalla dice "La vida y el sufrimiento de un jugador del Barro".
- Las **tipografías vienen de Google**: sin conexión se cae a Georgia.
- **Cero accesibilidad declarada**: no hay un solo atributo `aria` en toda la
  aplicación, pese a que el CSS sí está muy cuidado (foco visible, respeta
  "reducir movimiento", móvil pensado).

## Informes de la revisión (2026-09-04)

- **Revisión general** — qué está bien, qué está roto, las dos decisiones de
  fondo: https://claude.ai/code/artifact/3bde5067-5259-4eab-9baf-c562a3c196f4
- **Continuidad, fichas y partidos** — el 43 % de marcas mudas, la curva de
  fichas propuesta rama por rama, y qué le falta al
  partido: https://claude.ai/code/artifact/6dfef73f-2a57-47ab-a8de-ec10a01c9df1
- **Los diez arreglos del build v8** — cada cambio con qué buscar y qué tocar en
  el fuente: https://claude.ai/code/artifact/8897c147-8739-42ef-917b-2ed8112df0ef
