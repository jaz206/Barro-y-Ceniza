# Catálogo de acciones de partido — documento normativo

> **Qué es esto y por qué existe.** Igual que `biblia-sistema.md` manda sobre las
> reglas y las escenas, **este documento manda sobre las acciones del minijuego de
> partido** (las 3-4 opciones que eliges en cada jugada clave). Nace de una idea del
> cliente: tener un repertorio escrito de acciones que se **reutilice entre razas y
> entre historias futuras**, y que **vayamos ampliando y mejorando** con el tiempo,
> en vez de reinventar las jugadas en cada rama.
>
> **Relación con el código.** Hoy el código (`PLAY_POOL` y `PLAY_POOL_HALF` en
> `src/App.jsx`) es fiel a este catálogo, pero el catálogo es la referencia de
> diseño: cuando quieras una acción nueva o cambiar el tono de una, **primero se
> escribe/afina aquí** y luego se traslada al juego. (Decisión futura, aún no
> tomada: que el juego lea este documento directamente, para que no puedan
> desincronizarse. De momento el traslado lo hago yo a mano, como con la biblia y
> las escenas.)
>
> **Idioma y voz:** español de España, tuteo. La prosa de comedia (halfling) la
> escribió Claude imitando la voz del cliente y está **marcada para revisión**; la
> del pool serio proviene del build del cliente.

---

## 1. Cómo funciona una jugada clave (recordatorio)

Cada partido son 2-3 **jugadas clave** + la **jugada decisiva escrita** del guion.
En cada jugada clave el juego elige un **tipo de jugada** (según el partido y la
raza) y te ofrece **3 acciones** sacadas de un repertorio mayor (`pickN`), de forma
estable dentro del partido. Eliges con tu **ficha real**: cada acción dice qué
característica la resuelve y si ayuda alguna habilidad.

El repertorio se divide por **tono**:

- **Serio** (`PLAY_POOL`) — humano, enano, orco, elfa. Épica de barro.
- **Comedia negra** (`PLAY_POOL_HALF`) — halfling. Los Comepasteles no placan: se
  esconden, ruedan, dejan que el árbol los confunda con la bola.

Una historia futura elige el tono que le pegue (o mezcla), y puede añadir tipos o
acciones nuevas a este catálogo.

## 1.bis Vocabulario: esto es Blood Bowl, NO fútbol (regla dura)

El deporte es un **fútbol americano/rugby brutal con melón ovoide**, no fútbol
(soccer). La bola **se recoge del suelo con las manos, se lleva en los brazos o
pegada al pecho, se lanza (pase) o se entrega (hand-off)**. Nunca se juega con el
pie ni con la cabeza. Prohibido en la prosa de las acciones:

- ❌ **cabecear / remate de cabeza / peinar de cabeza** → ✅ recoger, lanzar, saltar a por ella.
- ❌ **sombrero, caño, regate, gambeta, driblar** → ✅ esquivar, quiebro, saltar por encima.
- ❌ **pase raso / al ras / que cruza el barro** (pase por el suelo) → ✅ pase que cruza el aire, pase largo, pase tenso.
- ❌ **la bola cosida/pegada al pie, con el pie, del pie** → ✅ pegada al pecho, en las manos, en los brazos.
- ❌ **cae en botas amigas** (recibir con el pie) → ✅ cae en manos amigas.
- ❌ **disparo, chutar, tiro a puerta, córner, área** → ✅ cruzar la línea, la zona de anotación, el touchdown.

Verbos y sustantivos que SÍ son de este deporte: **recoger, llevar, lanzar/pasar,
entregar, correr/esprintar, esquivar (dodge), placar/bloquear, blitz, saltar,
empujar, tumbar, la caja (cage), la línea de anotación, el touchdown, la vejiga/el
melón, la banda (línea de banda), la grada**. (Modismos con "cabeza"/"pie" que NO
son la jugada —"ir de cabeza" = de frente, "al pie de la letra", "sin
despeinarse"— sí valen.)

## 1.ter Adaptar las acciones a cada raza (pendiente, en construcción)

Hoy hay **dos** repertorios: el serio (`PLAY_POOL`, compartido por humano, enano,
orco y elfa) y el cómico (`PLAY_POOL_HALF`, halfling). El objetivo del cliente es
que **cada raza tenga su propio sabor** en las acciones y en los momentos
intermedios, coherente con su ficha y su forma de jugar (biblia §5.2, dos razas =
dos formas de jugar):

- **Enano** — la **caja**: fuerza y aguante, poco correr. Placar, mantenerse
  firme, avanzar en bloque paso a paso. Nada de fintas ni saltos.
- **Orco** — la **bandada**: fuerza bruta y goblins. Ir a por el más grande, la
  pata de atrás, empujar todos a una, soltar al fanático.
- **Elfa** — el **baile**: agilidad y pase. Esquivar, saltar, pases largos y
  precisos. Casi nunca placar de frente.
- **Humano** — equilibrado: un poco de todo, el "manual" del deporte.

Mientras no estén sus pools propios, las cuatro comparten el serio. La migración
irá raza a raza, como la de 1D6 y la de la muerte.

---

## 2. La "ficha" de una acción (esquema)

Toda acción tiene la misma forma. Estos son sus campos:

| Campo | Qué es | Valores |
|---|---|---|
| `txt` | El texto del botón (lo que eliges) | frase corta en infinitivo |
| `det` | Subtítulo/matiz bajo el botón | frase corta |
| `stat` | Qué característica la resuelve | `ST` (fuerza) · `AG` (agilidad) · `MA` (velocidad) |
| `obj` | Número objetivo de la tirada | serio 7-10 · halfling recentrado 8-10 |
| `riesgo` | Si fallar puede herirte | `true` / ausente |
| `hab` | Habilidad que da repetición si la tienes | p. ej. `Placar`, `Esquivar`, `Pasar` |
| `bonus` | Modificador fijo a la tirada | p. ej. `-1` (versión sin árbol), o `confRob(pj).b` |
| `ok` | Qué pasa si aciertas | `{ txt, ... }` |
| `ko` | Qué pasa si fallas | `{ txt, ... }` |

**Consecuencias** que pueden llevar `ok`/`ko` (mueven el partido de verdad):

- `posesion: "propia" | "rival" | "neutral"` — quién se queda la bola.
- `gol: true` — marcas touchdown (sube tu marcador).
- `golRival: true` — encajas (sube el marcador del rival).
- `pase: true` — cuenta como pase completado (estadística de carrera).
- `baja: true` — tumbas a un rival (estadística de carrera).

**Regla de calibración (biblia §2.3):** el `obj` y los modificadores están pensados
para que **fallar sea posible** — sin fallo posible, las heridas no pesan. En el
motor 1D6 (halfling) el objetivo es directo (AG 3+, fuerza 4+); en el motor 2d6
(resto, de momento) el objetivo se centra restando 3 a la característica.

---

## 3. Los siete tipos de jugada

Un tipo decide el arco de la jugada (qué te juegas) y qué acciones salen. Son los
mismos "ganchos" para las cinco razas; cambia el tono de las acciones.

| Tipo (clave) | Etiqueta serio | Etiqueta comedia | Qué es |
|---|---|---|---|
| `saque` | Saque | Saque | La bola suelta en el centro; el que llega manda el primer minuto |
| `ataque` (con bola) | Ataque | Ataque | Tienes la bola y campo por delante: buscar el gol |
| `ataque` (sin bola) | Defensa | Defensa | Te la han quitado: frenar su subida |
| `choque` | Choque | Choque | Fuerza pura, sin balón: quién manda el barro |
| `regate` | Baile | Baile | Agilidad pura: pasar entre ellos sin chocar |
| `remate` | Remate | Remate | La jugada de gol: aciertas → touchdown |
| `defensa` | Muralla | Muralla | Ellos suben a por el gol; fallar es encajar |

> Nota: `ataque` es un solo tipo que se bifurca según tengas o no la posesión
> (`m.posesion`). El resto son tipos sueltos.

---

## 4. Catálogo — tono SERIO (`PLAY_POOL`)

Épica de barro. Cuatro razas. Cada tipo trae hoy 3 acciones; se pueden ampliar.

### 4.1 Saque
- **Ir al choque y arrancársela a quien llegue** — ST, obj 8, riesgo, *Placar*. Ok: bola propia. Ko: bola rival.
- **Colarte y recogerla en carrera** — AG, obj 8, *Esquivar*. Ok: propia. Ko: rival.
- **Leer el bote y ponerte donde va a caer** — AG, obj 8, *Manos seguras*. Ok: propia. Ko: rival.

### 4.2 Ataque (con la bola)
- **Pase raso a un compañero que está solo** — AG, obj 9, *Pasar*. Ok: **gol** (+pase). Ko: rival.
- **Arrancar de frente y reventar la caja** — ST, obj 10, riesgo, *Placar*. Ok: **gol**. Ko: rival.
- **Esprintar por fuera de la caja** — MA, obj 9, *Esprintar*. Ok: **gol**. Ko: rival.

### 4.3 Defensa (te quitaron la bola)
- **Entrarle de frente al que lleva la bola** — ST, obj 9, riesgo, *Placar*. Ok: propia (+baja). Ko: rival.
- **Perseguir y cerrarle la banda** — MA, obj 9, *Esprintar*. Ok: no cruzan. Ko: **golRival**.
- **Anticipar el pase y salir a cortarlo** — AG, obj 10, *Manos seguras*. Ok: propia (+pase). Ko: **golRival**.

### 4.4 Choque
- **Ir a por el más grande de todos** — ST, obj 9, riesgo, *Placar*. Ok: propia (+baja). Ko: rival.
- **Abrir un pasillo para los tuyos** — ST, obj 8, *Romper defensas*. Ok: propia. Ko: rival.
- **Plantarte y que se estrellen contra ti** — ST, obj 7, *Mantenerse firme*. Ok: neutral. Ko: rival.

### 4.5 Baile (regate)
- **Esquivar entre dos y salir por el hueco** — AG, obj 8, *Esquivar*. Ok: propia. Ko: rival.
- **Recogerla en carrera sin frenar** — AG, obj 8, *Manos seguras*. Ok: propia. Ko: rival.
- **Pase largo por encima de la caja** — AG, obj 9, *Pasar*. Ok: propia (+pase). Ko: rival.

### 4.6 Remate
- **Pase a la esquina, donde no llega nadie** — AG, obj 9, *Pasar*. Ok: **gol** (+pase). Ko: rival.
- **Arrancar de frente y cruzar tú** — ST, obj 10, riesgo, *Placar*. Ok: **gol**. Ko: rival.
- **Esprintar por fuera antes de que cierren** — MA, obj 9, *Esprintar*. Ok: **gol**. Ko: rival.

### 4.7 Muralla (defensa)
- **Entrar en seco al que la lleva** — ST, obj 9, riesgo, *Placar*. Ok: propia (+baja). Ko: **golRival**.
- **Cerrar el hueco y esperar el error** — AG, obj 8, *Placaje defensivo*. Ok: no cruzan. Ko: **golRival**.
- **Anticipar el pase y cortarlo** — AG, obj 10, *Manos seguras*. Ok: propia (+pase). Ko: **golRival**.

---

## 5. Catálogo — tono COMEDIA NEGRA (`PLAY_POOL_HALF`, halfling)

Los Comepasteles. El repertorio es mayor (`pickN` elige 3 por partido → variedad).
El **árbol Roblerto** hace mucho más que lanzar: recoge la bola creyéndola pastel,
te aúpa de un dedo, sirve de escalera, despeja de un pase largo, se planta de
portería. Si vendes a Roblerto (o fichas por Mortaigne), sus acciones se sustituyen
por versiones **"sin árbol"** (`sinRoblerto`): a pulso, más pobres y con `-1`, para
que la ausencia se note.

### 5.1 Saque
- Rodar hasta ella hecho un ovillo · Chillar "¡pastel!" y robarla en el susto ·
  Meter la cabeza entre botas y salir con la bola en los dientes · Colártela
  mientras miran a Roblerto · Lanzarte a por ella entre las botas, a pelo *(sin árbol)*
- **Roblerto:** Que Roblerto la recoja creyéndola un pastel y te la ponga en las manos.

### 5.2 Ataque (con la bola)
- Colarte entre las piernas del más grande · La piña: rodar todos juntos con la bola
  dentro · Correr en zigzag hasta marearlos · Esconder la bola bajo el gorro y andar
  tranquilo · Trepar por tus propios compañeros amontonados *(sin árbol)*
- **Roblerto:** Que Roblerto te aúpe de un dedo hasta la línea · Trepar por Roblerto
  y saltar la línea.

### 5.3 Defensa (te quitaron la bola)
- Sentarte en medio y que tropiecen contigo · Que Bortrand les tire un cazo de
  estofado · Morderle el tobillo al que lleva la bola · Hacerte el muerto y
  agarrarle el tobillo · Esconderte y esperar a que se aburran.

### 5.4 Choque
- (repertorio de la piña / colarse por debajo todos a la vez, como ratones) —
  fuerza y mañas de grupo, en clave de comedia.

### 5.5 Baile (regate)
- Escurrirte entre dos por el hueco de abajo · Recogerla en carrera sin frenar ·
  Bailar entre tres como en la romería del nabo · Pasar por debajo del más alto,
  entre sus piernas · Pasar en corto entre los tuyos, sin torres *(sin árbol)*
- **Roblerto:** Pasársela a Roblerto, que despeja lejos.

### 5.6 Remate
- El pase imposible por debajo de todos · Sentarte en el balón sobre la línea ·
  Saltar desde la espalda de un compañero agachado · Fingir que ya has marcado y
  colártela mientras celebran · Que tres compañeros te lancen a pulso, sin red *(sin árbol)*
- **Roblerto:** Que Roblerto te lance por encima de la línea.

### 5.7 Muralla (defensa)
- Tirarte a sus tobillos en plancha · Cerrarle el hueco escondido entre los tuyos ·
  Tirarle tarta a los ojos al que va a marcar · Meterte entre sus piernas y hacerle
  tropezar · Hacer una muralla de halflings en la línea *(sin árbol)*
- **Roblerto:** Que Roblerto se plante en la línea de gol.

---

## 6. El patrón del aliado (Roblerto, y cómo reusarlo)

Un aliado con carácter (el árbol) mete variedad y consecuencia sin escribir dos
juegos. El patrón, reutilizable para otros aliados de otras razas:

1. **Acciones exclusivas del aliado** dentro del tipo de jugada (aquí, 6-7 de las
   del halfling llevan a Roblerto).
2. **La relación pesa** (`rel.arbol` → `confRob`): buena, +1 al dado y narración
   cómplice; mala, -1 y el aliado desconfía. El modificador sale a la vista en el
   botón ("Roblerto +1/-1").
3. **Si el aliado se va** (vendido/fichas por otro club), sus acciones se sustituyen
   por variantes **sin él**, más pobres y con `-1`, para que la falta se note en
   cada partido.

Para una historia nueva: define el aliado, sus acciones exclusivas por tipo, la
marca de relación y la marca de "ya no está", y aplica el mismo patrón.

---

## 7. Pantallas intermedias ("momentos del partido")

Entre tus jugadas puede salir un **momento** con botón *Seguir*: el gol del rival en
su propia pantalla ("Mientras tanto… marca el rival. 0-1"), o color sin gol (la
grada, un tiro fallado, un compañero al boticario). Viven en `MOMENTO_GOL_RIVAL` y
`MOMENTO_FLAVOR` y hoy hay ~20 variantes para que no se repitan. Se comparten entre
las cinco razas. Son parte del catálogo: se amplían igual que las acciones.

---

## 8. Cómo hacer crecer este documento

- **Añadir una acción:** escríbela aquí en su tipo y tono, con su ficha (§2). Marca
  si es prosa nueva (para revisión). Luego se traslada al `PLAY_POOL` que toque.
- **Ampliar variedad:** el objetivo del cliente es **~20 textos por tipo** para que
  ningún partido se sienta repetido. Cuando un tipo llegue a ~6-8 acciones, `pickN`
  ya da mucha combinatoria.
- **Nueva raza / nueva historia:** elige tono (serio, comedia o mezcla), reutiliza
  los siete tipos, y añade solo las acciones con sabor propio de esa raza.
- **Equilibrio:** respeta la calibración de la biblia (fallar posible, riesgo real).
  Si una acción rompe el balance, se ajusta el `obj`/`bonus` aquí antes de tocar el
  juego.
