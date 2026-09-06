# Barro y Ceniza — Halfling
## Capítulo 4 — La oferta
### *Alguien grande te quiere. Para algo.*

Prosa final. Sigue la biblia y la voz del halfling. Heredado y ampliado del texto de la build. **Es el cruce del libro** (biblia 18.1): la decisión que define el resto de la partida. No pregunta qué jugada quieres hacer, pregunta qué clase de halfling quieres ser.

**Función del capítulo:** la encrucijada. Tres escenas: el ojeador tantea, la decisión, y el primer partido, que ya diverge según la rama.

---

## Escena 1 — El hombre del sombrero

Un hombre con sombrero caro y cara de no haber comido nunca por gusto se sienta en vuestra grada de tablones. Es **Serrault**, ojeador —y algo más— de los Cuervos de Mortaigne, los de verdad, no los rotos: un club de Tercera con dinero y sin escrúpulos.

*[si `circoDePipo`:]* Ha visto vuestro número de circo y ha visto las entradas que vendéis. "Un halfling que llena estadios", dice, sin mirarte a ti sino a la grada. "Eso lo quiero yo, para reírme de camino al banco".
*[si no:]* Ha visto algo en ti que nadie ve: que corres cuando debes y caes cuando toca. "Sirves", dice, que en su boca es un poema.

Te ofrece un contrato de Tercera: más dinero, mejor equipo, y una condición: dejar de ser un chiste.

*[si `firmasteAPipo`:]* Pipo, a tu lado, ya está calculando su comisión con la cara de quien ha ganado sin jugar. "Escúchale, chaval. El dinero de Tercera huele distinto."
*[si `leisteContrato`:]* Pipo, en cambio, esta vez calla. Sabe que si te pones a leer el contrato de Mortaigne vas a tardar, y que lo que encuentres no le va a gustar a nadie, ni a él.

**Opciones:**

**A — Escuchar. El dinero de Tercera es dinero de verdad.**
→ `Ambición:1`, flag `escuchasteAlOjeador`
> Le escuchas. Habla de sueldos que en Villapastel comprarían el pueblo entero con horno incluido. Por un momento te ves con la camiseta de los grandes. Solo por un momento. Pero el momento se queda contigo, molestando.

**B — Preguntarle si tu equipo, Roblerto y Bortrand incluidos, viene contigo.**
→ `Honor:2`, `rel:{equipo:2}`, flag `preguntastePorLosTuyos`
> Serrault se ríe sin ganas. "No compro leña ni cocineros. Te compro a ti". Le dices que lo pensarás. Los dos sabéis que preguntar eso ya es media respuesta. En el vestuario, cuando lo cuentas, Bortrand te sirve doble ración sin decir nada.

**C — Escupirle la respuesta. Con un trozo de tarta.** *(requiere Ferocidad 4; forzable)*
→ `Ferocidad:1`, `fama:5`, `rel:{equipo:3, aficion:2}`, flag `escupisteAlOjeador`
> Le lanzas un trozo de tarta a ese sombrero que cuesta más que tu casa. "Los Comepasteles no se venden por piezas". La grada de tablones —cuatro borrachos y tu abuela— ruge como un estadio. Serrault se va con nata en el ala. Es el mejor día de la temporada.

*Deja para después: `preguntastePorLosTuyos` es la clave moral del cruce: ya sabes que no puedes llevártelos. `escupisteAlOjeador` no cierra la puerta —la tentación vuelve en la escena 2, más seria—. Se conoce a Serrault, que reaparece como entrenador si fichas.*

---

## Escena 2 — El cruce de caminos

*El momento. Lee `rel.abuela`, y la rama de Pipo.*

*[si `escupisteAlOjeador`:]* Ya le escupiste, pero Serrault ha vuelto, más serio, con más ceros. La tentación no se va escupiéndola una vez.
*[si no:]* Serrault espera tu respuesta al final de la semana.

Es la decisión de tu vida y la sabes: quedarte con los Comepasteles, ser el pringado querido que pierde con gracia hasta el final; o irte a Mortaigne, dejar de ser un chiste, aprender a ganar como ganan los grandes —con veneno en la olla y precio en la cabeza— y no volver a comer tarta con tu abuela un domingo cualquiera.

*[si `firmasteAPipo` y no `leisteContrato`:]* Pipo te lo pone fácil, que es como te lo pone difícil: "Fírmalo. Más fama, más dinero, más comisión —para mí, sí, ¿y qué?—. En Villapastel te vas a morir siendo un chiste con gracia. En Mortaigne te vas a morir siendo alguien." Casi le crees. Casi.
*[si `leisteContrato`:]* Pipo, por una vez, es honesto, quizá porque sabe que le pillarías la mentira: "Mira, chaval. Ganarías más. No te voy a decir que no. Pero yo he visto a otros firmar eso, y ninguno volvió a comer tarta como antes. Tú decides. Yo cobro igual."

*[si `rel.abuela` alto:]* Tu abuela no opina. Solo pone dos platos, como siempre, y espera.
*[si no:]* Tu abuela ya no pone tu plato. Hace tiempo que decidió por su cuenta.

**Opciones:**

**A — Firmar por Mortaigne. Estás harto de que se rían.**
→ `oro:200`, `Ambición:2`, `fama:12`, `rel:{equipo:-3, abuela:-2, aficion:-2}`, flag `fichastePorMortaigne`
> Firmas. Te dan una camiseta negra, un sueldo obsceno y una libreta donde apuntar rivales. En Mortaigne se gana. También se aprende a mirar el barro de otra manera, como si nunca hubieras sido de él. La primera noche, sueñas con tarta y te despiertas con hambre de otra cosa.

**B — Quedarte con los Comepasteles. Hasta el final, sea el que sea.**
→ `Honor:2`, `Voluntad:2`, `rel:{equipo:3, abuela:1, aficion:2}`, flag `teQuedaste`
> Rompes el contrato de Mortaigne delante de Serrault y vuelves al vestuario que huele a estofado. Nadie dice nada, porque los halflings no dicen esas cosas, pero esa noche Bortrand cocina como para una boda y tu abuela pone tu plato sin que se lo pidas.

**C — Pedir tiempo. Y comerte una tarta mientras decides.**
→ `Astucia:1`, `Voluntad:1`, `rel:{abuela:1}`. *No cierra el cruce: al terminar la tarta, se vuelve a preguntar A o B.*
> Le pides una semana a Serrault y te sientas a comer con tu abuela. No decidís nada en voz alta. Pero al levantarte de la mesa ya lo sabes, aunque tardes en decirlo. Hay cosas que se deciden masticando.

*Deja para después (gobierna todo el resto del libro): `fichastePorMortaigne` abre la rama entera (cap 5 propio, personajes de Mortaigne, la olla, la cena) y se lee en el 6, el 7 y el duelo de la abuela —muere mientras no estabas—. `teQuedaste` mantiene el libro cálido. La bajada de `equipo`, `abuela` y `aficion` al firmar es el precio, no un castigo: irte cuesta a tu gente (biblia 18.2, sin castigo moral: Mortaigne puede ganar).*

---

## Escena 3 — El domingo de siempre

**Partido: Los Toros Rojos de Norburgo** *(rival duro; el primer partido tras el cruce, ya diverge por rama)*

*[si `fichastePorMortaigne`:]* Tu primer partido con Mortaigne. El vestuario huele a formol y a dinero. Tus nuevos compañeros no hablan contigo, pero te pasan el balón porque el entrenador —Serrault, que ahora te dirige— ha dicho que eres "el reclamo". **Drache**, un blitzer con cara de haberlo visto todo, te enseña dónde ponerte con dos gestos y ni una palabra. **Kessler**, otro, no te mira: para él eres minutos que le robas. Enfrente, los Toros Rojos, grandes de verdad. Aquí no hay pastel que valga: aquí se juega a hacer daño.
*[si no:]* Otro domingo con los Comepasteles, otro rival que os saca dos cabezas. Los Toros Rojos de Norburgo pegan primero y preguntan nunca. Pero es tu equipo el que salta al campo, y eso, aunque perdáis, ya no te lo quita nadie.

*[si `jugadaPiña` y no Mortaigne:]* Al menos tenéis la piña. Nadie sabe defender una albóndiga de halflings.

**Opciones:**

**A — [Mortaigne:] Jugar sucio, como te enseña Drache. / [Comepasteles:] Jugar limpio y rápido, como sabéis.**
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:8`, gol
> Cruzas la línea. *[Mortaigne:]* En Mortaigne aplauden el resultado sin mirarte; Drache asiente una vez, que en él es una ovación. *[Comepasteles:]* En los Comepasteles te sepultan bajo doce abrazos pequeños. El mismo touchdown sabe distinto según de quién sea la camiseta.
- **Fallo (riesgo):** → gol rival, cadena de daño
> Fallas, y un Toro Rojo te recuerda por qué se llaman así. Vuelas. El resultado, esta vez, no lo decides tú.

**B — Buscar al compañero mejor colocado y dársela.**
*Tirada: PS (5+). Sin riesgo.*
- **Éxito:** → `fama:7`, `Astucia:1`, gol, pase
> Sueltas un pase que cruza el barro y cae en botas amigas. Cruza. El pase de un halfling que ve el campo desde abajo mejor que nadie: nadie mira nunca a la altura de un halfling. *[Mortaigne:]* Kessler, que iba a la misma jugada, aprieta la mandíbula: el reclamo, además, ve mejor que él.
- **Fallo:** → gol rival
> El pase se va alto, que es fácil cuando mides tres palmos. Lo caza el rival. Contraataque.

**C — Meterte entre las piernas del más grande y hacerle el ridículo.**
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:8`, `Ferocidad:1`, gol, `rel:{aficion:1}`
> Le pasas entre las piernas y sales por detrás con el balón mientras él sigue buscándote delante. La grada, sea de quien sea, se ríe con él, no contigo. Cruzas. Humillar a un grande siendo pequeño no tiene precio.
- **Fallo (riesgo):** → gol rival, cadena de daño
> Te metes entre sus piernas y las cierra. Descubres que un halfling también cabe en un bolsillo si lo aprietan bien.

*Deja para después: si vas por Mortaigne, este partido presenta a Drache y Kessler, que reaparecen en el cap 5 (la olla, la cena) y en la final. Si te quedaste, el partido confirma que elegiste tu equipo. El "mismo touchdown sabe distinto" es la tesis del cruce puesta en juego.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4. Aquí la fotografía es sobre todo la rama.*

**[si `fichastePorMortaigne`:]**
> Esa noche duermes en una cama de Tercera, con sábanas que no pican y un techo que no gotea. Es la mejor cama en la que has dormido nunca. No pegas ojo. En Villapastel, a esta hora, tu abuela está recogiendo un plato que ya no vas a llenar, y tú lo sabes, y las sábanas buenas no arreglan eso. Mañana entrenas con gente que no sabe tu nombre. Lo aprenderán cuando les convenga.

**[si `teQuedaste`:]**
> Rechazaste el pueblo entero con horno incluido por seguir perdiendo con doce halflings y un árbol. Es la decisión más tonta de tu vida, dice todo el mundo. Tu abuela no dice eso. Tu abuela pone dos platos y, por una vez, se sienta a comer contigo en vez de mirar por la ventana. "Menudo tonto", dice. Es lo más parecido a "te quiero" que sabe decir.

**[si pediste tiempo y luego te quedaste:]**
> Tardaste una semana y una tarta entera en decir en voz alta lo que ya sabías masticando. Serrault se fue con su sombrero caro a buscar otro halfling. Que lo busque. Tú tienes el tuyo, que es este, el de siempre, el de la ventana.

---

### Notas de diseño del capítulo

- **9 opciones** en tres escenas: por debajo del 12-18 de la biblia (13.1), pero es correcto: el capítulo 4 es corto y concentrado a propósito, todo su peso está en una sola decisión. La biblia permite 4-6 escenas; este tiene 3 densas. **Anotado**: si al leerlo entero se siente escaso, se añade una escena puente (la firma, o la despedida del vestuario).
- **Con tirada:** las tres del partido. ✓
- **Con riesgo:** partido A y C (2). ✓
- **Con requisito:** escupir al ojeador (Ferocidad 4). Solo 1; el capítulo se apoya en la decisión, no en requisitos. **Anotado.**
- **Opción que solo caracteriza / no cierra:** pedir tiempo (escena 2, C) es una pausa que caracteriza. ✓
- **El cruce cumple biblia 18.1:** abre rama con personajes propios (Serrault, Drache, Kessler), humor distinto (frío), y sin castigo moral (Mortaigne puede ganar).
- **Memoria de Pipo pagada:** su opinión en el cruce cambia según `firmasteAPipo` / `leisteContrato`. Es una de las tres lecturas de Pipo prometidas en el diseño.
- **Punto a revisar:** capítulo corto (9 opciones, 3 escenas, 1 requisito). Válido por concentración dramática, pero anotado por si conviene una escena puente.
