# Barro y Ceniza

*La vida y el sufrimiento de un jugador del Barro.*

Librojuego biográfico ambientado en el deporte más violento del Mundo Viejo.
Eliges raza, vives desde la infancia y sobrevives —o no— a tres muertes.

Cuatro ramas completas y distintas: **humano** (un niño de un callejón que sube
hasta el Estadio Imperial), **enano** (un profesional joven que desciende, se
amotina y vuelve), **orco** (una cría en un cesto que monta una banda desde la
nada) y **elfa silvana** (campeona de Primera con trescientos años que cae hasta
Sexta).

Siete capítulos por rama, 141 escenas, unas 680 opciones y ~40.000 palabras.
React + Vite, una sola página, sin backend.

## Descripción para itch.io

> Texto de la ficha del juego en itch. Voz del cliente; mantener el disfraz (no
> nombrar el deporte real).

Naces en un barrio de mataderos, en un clan de la montaña, en una charca de
orcos o bajo un roble milenario. Cada decisión queda escrita en tu Libro del
destino: abre unas puertas, cierra otras, y te acerca o te aleja de la gente que
te importa.

Cuatro razas, cuatro vidas completas de unas 35 escenas cada una. Atributos de
carácter que desbloquean opciones, puntos de Voluntad para forzar las que no te
corresponden, relaciones con personajes que vuelven cuando menos lo esperas, y
partidos resueltos con dados donde puedes perder algo más que el balón. Puedes
morir tres veces. La cuarta no cuenta.

Se guarda automáticamente en el navegador. Duración: 30–45 minutos por vida. En
español.

## Estado

✅ **El código fuente ya está en el repo** (`src/`, `index.html`,
`vite.config.js`, `package.json`), y los diez arreglos del build v8 están
reaplicados sobre el fuente. Para probarlo: `npm install` y `npm run dev`.

`build-v8-parcheado/` se conserva como referencia: es el juego compilado con
esos mismos diez arreglos parcheados a mano sobre el bundle. Ya no es la única
copia de los arreglos, así que dejó de ser frágil.

## Documentación

`CLAUDE.md` tiene el contexto completo: cómo funciona el juego por dentro, los
arreglos ya aplicados, las decisiones de producto pendientes y las reglas de
trabajo del proyecto.

Este proyecto es **independiente de Arkaria, Nufflepedia y BloodBowlManager**.
