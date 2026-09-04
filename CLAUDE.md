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

## ⚠️ Estado del repo: falta el código fuente

Ahora mismo **este repo NO tiene el proyecto fuente**. Lo único que hay es
`build-v8-parcheado/`, que es el juego **ya compilado** con diez arreglos
aplicados a mano sobre el bundle minificado.

**Eso se pierde en cuanto alguien recompile el proyecto.** La primera tarea
pendiente, y la más importante, es subir aquí el proyecto de verdad (el `src/`,
el `package.json`, el `vite.config`) y volver a aplicar los diez arreglos sobre
el fuente. Están documentados uno a uno, con qué buscar y qué cambiar, en el
informe enlazado al final.

## Qué es el juego, por dentro

Cuatro ramas completas y distintas, no una historia con la piel cambiada:

| Rama | Puesto | Empieza siendo | Arco |
|---|---|---|---|
| Humano | Blitzer Humano | un niño en un callejón de Valdoria | sube desde Sexta hasta el Estadio Imperial |
| Enano | Corredor Enano | un profesional joven en Segunda | desciende, se amotina y vuelve |
| Orco | Blitzer Orco | una cría en un cesto, en un río | monta una banda desde la nada |
| Elfo silvano | Bailarina guerrera | campeona de Primera con 300 años | **cae** hasta Sexta |

Volumen: 7 capítulos por rama, **141 escenas**, ~680 opciones, 106 tiradas,
38 partidos, ~40.000 palabras. Puedes morir tres veces; la cuarta no cuenta.

Mecánica principal: **2d6 + característica + atributo/3 + habilidades** contra un
objetivo (7 a 11). Si fallas una tirada con riesgo: armadura 2d6 ≥ AV, heridas
2d6 (aturdido / KO / baja) y bajas en un D16 con la muerte en 15-16. Apotecario
una vez por partido. Además hay un minijuego de partido por turnos con clima,
patada inicial, compañeros con ficha propia y fatiga.

Entre capítulos hay **entreactos**: dos "tardes libres" en las que eliges
actividades (entrenar, ver a la familia, beber con alguien).

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

## Decisiones pendientes — NO avanzar sin el OK del cliente

Ninguna de estas es un bug: son decisiones de producto. Están analizadas con
números en los informes enlazados abajo.

1. **¿Blood Bowl 2020 o la edición clásica?** El juego mezcla las dos: las
   armaduras están en formato 2020 y la agilidad y el sistema de subir de nivel
   son de la clásica. Es la decisión que más cosas destraba: arregla de golpe la
   agilidad, el PA que falta, las habilidades de inicio y el tope de subidas.
2. **La curva de fichas.** Hoy empiezas con la ficha profesional completa a los
   seis años. La ficha del reglamento debería ser la **meta** (el día que firmas),
   no la salida — y cada rama entra en la carrera en un punto distinto: el enano
   ya es profesional en el capítulo 1, y la elfa empieza *por encima* y baja.
3. **Las tardes libres.** Suben características y se pueden repetir cada
   capítulo: hasta **+12** en una partida. El tope de BB2020 son **2 subidas en
   toda la vida del jugador**. Propuesta: que suban características solo antes de
   firmar, y después den habilidades y "forma".
4. **Las tres muertes.** Solo ocurren en el **0,6 %** de las partidas (medido
   simulando la propia fórmula del juego 200.000 veces). O se fuerzan, o se
   quitan de la portada.
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
