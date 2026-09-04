# Posición emergente — piloto del humano

> Documento de diseño (no es código). Fija cómo funcionaría la idea de "eliges
> raza pero no posición" en la rama del **humano**, que es el piloto. Escrito en
> lenguaje de producto para que lo revise el cliente. Reglas base: ver
> `reglas-s3-referencia.md`.

## La idea en una frase

Empiezas siendo un crío sin definir. **Tus decisiones te van formando**, y el día
que firmas como profesional (y al final, en el epílogo) se revela **en qué clase
de jugador te convertiste**: Blitzer, Receptor, Lanzador o Liniero. Nadie te lo
dijo al empezar: lo decidiste tú, jugando.

## Alcance de esta fase (importante)

- **Solo el humano.** Si funciona, se valora llevarlo a las otras ramas.
- **Rejugabilidad cosmética, por ahora.** La **historia no se reescribe**: las
  141 escenas y sus textos siguen igual. Lo que cambia según tu build es el
  **minijuego de partido** (que ya mira tu velocidad y tus habilidades) y el
  **final revelado**. Así la rejugabilidad sale barata: no hay que escribir un
  juego nuevo.
- Más adelante, si engancha, se puede meter divergencia narrativa real (que la
  posición abra opciones distintas a mitad de historia). Eso sería otra fase y
  otro presupuesto de escritura.

## Los cuatro finales (números de S3)

| Si te formaste como… | Se mueve | Aguante | Brazo | Empieza sabiendo | En el campo brilla en… |
|---|---|---|---|---|---|
| **Blitzer** | 7 | duro | normal | Placar | presionar y pegar |
| **Receptor** | **8** | **blando** | normal | Atrapar, Esquivar | correr y recibir |
| **Lanzador** | 6 | duro | **el mejor** | Manos seguras, Pasar | jugar la bola |
| **Liniero** | 6 | duro | normal | nada | de todo un poco (comodín) |

## Las cuatro palancas que mueven tus decisiones

Cada decisión relevante empuja una (o varias) de estas cuatro palancas. Se
apoyan en atributos narrativos que el juego **ya tiene**:

| Palanca (ficha) | Se sube… | Atributo narrativo que la alimenta |
|---|---|---|
| **Velocidad** (MV) | entrenando carrera, huyendo, jugando a la banda | Ambición / Astucia |
| **Aguante** (AR) | encajando, plantándote, trabajos duros | Ferocidad / Honor |
| **Brazo** (PA) | practicando el pase, decisiones "de cabeza" | Astucia |
| **Habilidades** | momentos clave (aprendes Placar, Atrapar, Pasar…) | según la escena |

> El juego ya reparte cosas así hoy (una opción da `stat:{ST:1}`, otra da una
> habilidad). La diferencia es que **hoy arrancas con la ficha de Blitzer
> completa** y esas subidas son adorno; con el cambio, **arrancas neutro** y esas
> subidas te construyen de verdad.

## Cómo se calcula tu final

Al firmar (y en el epílogo), se compara tu build con las cuatro plantillas y se
elige **la más parecida**:

- ¿Sacaste mucha velocidad y aprendiste a atrapar/esquivar? → **Receptor**.
- ¿Buen brazo y manos seguras? → **Lanzador**.
- ¿Placar y te fuiste a por el aguante/pegar? → **Blitzer**.
- ¿No destacaste en nada concreto? → **Liniero**. Es el comodín, y es un final
  **honesto**, no un castigo: "resultaste ser un currante de línea".

Así, dos partidas distintas del humano acaban en jugadores distintos que además
se **juegan** distinto en el campo. Ahí está la rejugabilidad.

## Qué habría que tocar en el código (a fases chicas)

1. **Ficha de arranque neutra.** Hoy el humano empieza como Blitzer (MV7,
   Placar…). Pasaría a arrancar como un novato sin definir (más cerca de
   Liniero, sin habilidades), y AG/PA en formato "X+". Verificar que los
   partidos de la rama siguen siendo jugables y no se rompen.
2. **Acumular build.** Que las decisiones sumen a las cuatro palancas (ya lo
   hacen a medias; hay que reorientarlo).
3. **Revelado del final.** Un cálculo pequeño que mire tu ficha y diga la
   posición, y mostrarlo al firmar y en el epílogo.
4. **Afinar el partido** para que note más el build (ya lo nota; es ajuste, no
   reescritura).

Cada paso: `npm run build` limpio + prueba en navegador antes de darlo por bueno.

## Riesgo principal (honesto)

Cambiar la ficha de arranque **toca el equilibrio de todos los partidos del
humano**. Es lo delicado. Por eso va a fases y con prueba en navegador en cada
una. Si un build queda demasiado fuerte o demasiado débil, se ajusta antes de
seguir.

---

## Leyendas — nombres candidatos (a revisar por el cliente)

El cliente quiere que las estrellas oficiales aparezcan como **guiños**: nombres
inventados pero reconocibles, en titulares de Cristalvisión, leyendas que el
protagonista idolatra, partidos del pasado, comentarios de taberna. **Homenaje,
no calco** (que suene al personaje sin ser la marca con una letra cambiada).

> ⚠️ Estos nombres los propone Claude como punto de partida. **La voz es del
> cliente**: repásalos, cámbialos o tira los que no te suenen. No se meten en el
> juego hasta que los apruebes.

Especialmente útiles para la rama del humano (leyendas que un chaval del Matadero
idolatraría):

| Guiño a… | Qué era | Candidato | Dónde encajaría |
|---|---|---|---|
| Griff Oberwald | el mejor Blitzer humano de la historia | **Gorvald el Invicto** | ídolo del protagonista; cartel en la pared del callejón |
| Mighty Zug | el muro humano que solo sabe pegar | **Zugor el Yunque** | leyenda de fuerza; comentario de vestuario |
| Morg 'n' Thorg | el gigante mercenario que juega para cualquiera | **Torgan el Descomunal** | rumor de fichaje imposible; titular |
| Jordell Freshbreeze | el receptor elfo imposible de placar | **Jordel Brisaleve** | rival soñado; Cristalvisión |
| Varag Ghoul-Chewer | la estrella orca de los Malos | **Vragg Comehuesos** | leyenda del miedo; taberna |
| Nobbla Blackwart | el goblin de la motosierra | **Nobbo Verrunegra** | anécdota macabra; partido del pasado |
| Roxanna Darknail | la corredora elfa oscura | **Roxana Uñanoche** | titular de una final famosa |
| Bomber Dribblesnot | el goblin bombardero | **Bombo Mocoluengo** | chascarrillo de Cristalvisión |

Idea de uso barato: un par de titulares de Cristalvisión y una frase de "el
ídolo" en la infancia del humano ya dan sabor sin tocar mecánica. Se puede
ampliar la lista rama por rama cuando toque.
