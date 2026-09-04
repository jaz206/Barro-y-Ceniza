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
