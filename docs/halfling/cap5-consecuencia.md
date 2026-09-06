# Barro y Ceniza — Halfling
## Capítulo 5 — Consecuencia
### Rama A: *La Copa de los Pringados* · Rama B: *La camiseta negra*

Prosa final. Sigue la biblia y la voz del halfling. **Es el capítulo que más diverge por rama** (biblia, rama media). Según `fichastePorMortaigne`, el jugador vive un capítulo entero distinto:

- **Rama A — Comepasteles** (`teQuedaste`): la Copa de los Pringados. Cálida, de risa. Heredada de la build.
- **Rama B — Mortaigne** (`fichastePorMortaigne`): la Tercera de verdad. Fría. Escritura nueva: la olla y la cena.

Las dos ramas **reconvergen en el capítulo 6** (la final). El motor sirve una rama u otra según el flag; nunca las dos.

---

# RAMA A — La Copa de los Pringados

*(si `teQuedaste` o no `fichastePorMortaigne`)*

## A1 — La Copa de los Pringados

Existe, de verdad, un torneo para los equipos que no ganan nada nunca: la Copa de los Pringados, que la federación inventó "para que los últimos también tengan una final que perder". Los Comepasteles clasifican por la puerta de atrás, que es la única que tenéis.

Ocho equipos de pena, un trofeo de latón abollado, y por primera vez la posibilidad real de ganar algo con forma de copa.

*[si `rel.aficion` alto:]* Vuestra afición, cuatro borrachos y una abuela, ha alquilado un carro para seguiros.

**Opciones:**

**A — Tomártelo en serio. Es la primera copa que podéis ganar.**
→ `Ambición:1`, `Voluntad:1`, `rel:{equipo:1}`, flag `enSerioLaCopa`
> Entrenáis. De verdad. Roblerto mira menos mariposas, Bortrand cocina para dar fuerza y no solo sabor, y tú aprendes las jugadas al derecho y al revés. Un equipo de pringados tomándose algo en serio da hasta miedo.

**B — Tomártelo a broma, como todo. Es una copa de mentira.**
→ `Astucia:1`, `rel:{aficion:1}`, flag `aBromaLaCopa`
> Decidís ir de risa, con la camiseta al revés y un pastel de mascota. La gente os adora. Pero por dentro, aunque no lo digas, ya has mirado el trofeo dos veces más de la cuenta.

**C — Convencer a Pipo de que la Copa de los Pringados vende.** *(requiere `firmasteAPipo`; forzable)*
→ `oro:30`, `fama:6`, `rel:{pipo:1}`, flag `pipoEnLaCopa`
> Pipo huele el dinero de la pena y monta apuestas a que perdéis en cada ronda. Cobra las dos veces: cuando perdéis, gana; cuando ganáis, gana más, porque nadie lo esperaba. Es asqueroso y es genial.

## A2 — La semifinal imposible

**Partido: Los Escupefuegos de la Charca** *(goblins con lanzallamas casero)*

Semifinal. Enfrente, los Escupefuegos de la Charca: un equipo de goblins con un lanzallamas casero que el reglamento "estudia si prohibir". Cada dos jugadas se prende fuego alguien, casi siempre ellos.

*[si `enSerioLaCopa`:]* Vosotros, entrenados por primera vez, sabéis exactamente qué hacer: dejar que se quemen solos y recoger las cenizas.
*[si no:]* Vosotros, a lo loco, pensáis apagar el fuego con estofado, que es un plan tan malo que podría funcionar.

**Opciones:**

**A — Esperar a que se prendan fuego solos y colarte en el humo.**
*Tirada: AG (4+, 3+ si `enSerioLaCopa`). Sin riesgo.*
- **Éxito:** → `fama:8`, `Astucia:1`, gol, `rel:{equipo:2, aficion:1}`, flag `aLaFinalPringados`
> Esperas. En la jugada tres se prenden fuego dos goblins y el lanzallamas. Aprovechas la humareda y el griterío para cruzar sin que nadie te vea, tosiendo pero entero. A la final. La afición borracha llora de emoción y de humo.
- **Fallo:** → gol rival
> Esperas demasiado cerca. El goblin del lanzallamas estornuda. Descubres a qué huele un halfling a la parrilla. Bortrand, profesional, toma nota de la temperatura.

**B — Que Bortrand apague el lanzallamas con una olla de estofado.** *(requiere `rel.chef` ≥ 2; forzable)*
*Tirada: FU del vuelco (5+). Sin riesgo.*
- **Éxito:** → `fama:7`, gol, `rel:{chef:2}`, flag `aLaFinalPringados`
> Bortrand vuelca una olla de estofado sobre el lanzallamas, que se atraganta y explota en una nube de olor a guiso. Los goblins, distraídos por el hambre repentina, se olvidan del partido. Cruzáis mientras comen del suelo. A la final por la vía culinaria.
- **Fallo:** → gol rival

## A3 — La noche antes

La noche antes de la primera final de vuestra vida, Bortrand comete el error de su carrera: para "relajar al equipo", saca la cerveza que llevaba toda la temporada robando a los rivales. Toda. A la vez.

*[si `ramonEntrenado` o `ramonLibre`:]* Roblerto, que no bebe pero absorbe, se empapa por las raíces y empieza a florecer fuera de temporada, lo cual, en un hombre-árbol borracho, es preocupante.

A las tres de la mañana, media plantilla canta, Pipo llora de felicidad contando dinero imaginario, y tú tienes en la mano una jarra y una final en menos de doce horas.

**Opciones:**

**A — Beber con ellos. Una final se juega mejor sin miedo.**
→ `Voluntad:-1`, `rel:{equipo:2}`, flag `bebisteAntesDeLaFinal`
> Bebéis hasta el amanecer. Al día siguiente jugaréis resacosos y felices, que para un halfling es el estado natural. El miedo, al menos, se ha quedado dormido en la barra.

**B — Mandar a todos a la cama. Mañana hay que estar entero.** *(requiere Voluntad 3; forzable)*
→ `Voluntad:1`, `Honor:1`, `rel:{equipo:-1}`, flag `cortasteLaFiesta`
> Recoges jarras y mandas a dormir a doce halflings que te miran como si les hubieras robado la Navidad. Al día siguiente estaréis frescos y de mal humor. Ser el responsable de un equipo de pringados es el trabajo más ingrato del mundo.

**C — Esconder una jarra para el descanso de mañana. Por si acaso.**
→ `Astucia:1`, `rel:{chef:1}`, flag `jarraEscondida`
> Guardas una jarra debajo del banquillo con la astucia de quien ha aprendido de Bortrand. Mañana, si la cosa va mal, un trago a media parte puede ser la diferencia entre la gloria y el ridículo.

## A4 — La final de latón

**Partido: Los Segadores de Kleinfeld** *(campesinos grandes; llevan tres años perdiendo esta copa)*

La final de la Copa de los Pringados. Enfrente, los Segadores de Kleinfeld, campesinos grandes con guadañas de mentira y ganas de verdad, que llevan tres años perdiendo esta copa y no piensan perder la cuarta contra unos pasteles. El trofeo, de latón abollado, brilla en el centro del campo como si fuera de oro, porque para vosotros lo es.

*[si `bebisteAntesDeLaFinal`:]* Jugáis con una resaca de campeonato: veis dos balones y placáis al que no toca.
*[si `cortasteLaFiesta`:]* Jugáis frescos y de mal humor, que resulta ser una combinación temible.

*[si `rel.aficion` alto:]* Todo el mundo quiere que gane el pringado una vez.

Una copa. Podríais ganar una copa.

**Opciones:**

**A — La jugada de la piña, a lo grande, con todo el equipo.** *(requiere `jugadaPiña`; forzable)*
*Tirada: AG (4+, con la repetición de equipo si `equipo` alto). Con riesgo.*
- **Éxito:** → `fama:15`, gol, `rel:{equipo:3, aficion:3}`, flag `campeon`, `ganasteLaCopa`
> Los once os hacéis albóndiga y rodáis hacia la línea con el balón dentro y a Roblerto empujando por detrás como una apisonadora vegetal. Los Segadores siegan el aire. La piña cruza. Habéis ganado la Copa de los Pringados. El latón nunca ha brillado tanto.
- **Fallo (riesgo):** → gol rival
> La piña rueda perfecta hasta que la resaca colectiva os manda a todos en direcciones distintas. Os deshacéis a tres pasos de la línea. Los Segadores recogen el balón y la copa.

**B — Colarte tú solo con todo lo aprendido esta temporada.**
*Tirada: AG (4+). Con riesgo. Esquivar repite.*
- **Éxito:** → `fama:12`, gol, `rel:{aficion:2}`, flag `campeon`, `ganasteLaCopa`
> Todo lo que has aprendido —esquivar, caer, leer el campo desde abajo— en una carrera. Cruzas solo, y la copa de latón es tuya. Pequeña. Abollada. La mejor cosa que has tenido nunca.
- **Fallo (riesgo):** → gol rival, cadena de daño

**C — Sacar la jarra escondida y jugar la final borracho y feliz.** *(requiere `jarraEscondida`)*
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:10`, gol, `rel:{equipo:2, chef:1}`, flag `campeon`, `ganasteLaCopa`
> Un trago a media parte, y de pronto el miedo se va y solo queda el juego. Cruzas riéndote, con la Comarca entera riéndose contigo. No es la final más seria de la historia. Es la más feliz.
- **Fallo (riesgo):** → gol rival, cadena de daño

*Deja para después: `ganasteLaCopa`/`campeon` se leen en el cap 7 (por primera vez ganasteis algo con forma de copa). El trofeo de latón es un objeto (biblia 5) que ancla el epílogo. `bebisteAntesDeLaFinal` colorea cómo llegas a la final del cap 6.*

---

# RAMA B — La camiseta negra

*(si `fichastePorMortaigne`)*

Escritura nueva. Mortaigne no juega la Copa de los Pringados: es de pobres. Aquí Berto vive la Tercera de verdad, donde se gana y no se ríe nadie.

## B1 — Sexta a Tercera

Tercera División no huele a barro y a harina. Huele a formol, a linimento caro y a dinero. Los Cuervos de Mortaigne ganan, y ganan porque nadie en ese vestuario juega por gusto: juegan por el sueldo y por no perder el sitio.

Tú eres el reclamo. En los carteles sales tú, el halfling que llena estadios, más grande que en la vida. En el campo, tus compañeros te pasan el balón cuando Serrault lo ordena y no antes. **Drache** te ha enseñado dónde ponerte. **Kessler** te ha enseñado, sin decir nada, que aquí no eres de nadie.

*[si `preguntastePorLosTuyos`:]* Te acuerdas de que preguntaste si podían venir los tuyos. Serrault se rió. Ahora entiendes por qué no era una pregunta tonta: era la única que importaba, y ya sabías la respuesta.

**Opciones:**

**A — Ganarte a Drache. Es lo más cercano a un amigo que hay aquí.**
*Tirada: nada; elección social.* → `rel:{equipo:1}`, flag `teAcercasteADrache`
> No es fácil ganarse a Drache, porque no da nada gratis. Pero un día, tras un entreno, te tira una venda para el tobillo sin que se la pidas y gruñe: "El pequeño aguanta. Menos mal". Viniendo de él, es una carta de amor.

**B — Devolverle a Kessler el desprecio, con intereses.** *(requiere Ferocidad 3; forzable)*
→ `Ferocidad:1`, `rel:{equipo:-1}`, flag `guerraConKessler`
> Le robas el balón en un entreno y anotas solo para que lo vea. Kessler no dice nada. Pero a partir de ahí "olvida" pasarte el balón en los partidos con más frecuencia, y en Mortaigne un balón que no te llega es un cuchillo que no ves venir.

**C — Aprender a jugar como ellos. Frío, eficaz, sin gracia.**
→ `Astucia:1`, `Ambición:1`, flag `aprendisteMortaigne`
> Dejas de hacer el número del pastel y aprendes a ganar sin público. Es más aburrido. También es más efectivo. Anotas más que nunca y celebras menos que nunca. Nadie te sepulta bajo doce abrazos. Nadie te sepulta bajo nada.

## B2 — La olla

*La escena exclusiva oscura. El equivalente de "aprender a jugar", pero por cálculo.*

Antes de un partido importante, Drache te lleva a la cocina del club. No hay Bortrand aquí: hay un cocinero a sueldo que mira para otro lado. Drache te enseña un frasco pequeño y turbio. "En Mortaigne se gana antes del silbato", dice. "El rival prueba esto, y el domingo juega a medias. Nadie lo sabrá. Todos lo sospecharán".

Lo que Bortrand hacía por amor al oficio —"otra cosa es que a la gente le siente mal la buena comida"— aquí se hace por cálculo, sin gracia y sin olla que huela a casa.

**Opciones:**

**A — Echar el frasco. Has venido a ganar.**
→ `Ferocidad:1`, `Honor:-2`, `Ambición:1`, flag `envenenasteLaOlla`
> Lo echas. El domingo el rival juega a medias y ganáis sin despeinaros. Drache asiente. Serrault sonríe a los números. Y tú, esa noche, te descubres oliendo tus propias manos, buscando el olor de la mantequilla de tu abuela, y no lo encuentras.
> *[si `envenenador` (cap 1):]* Ya lo hiciste una vez, con Bortrand, entre risas. Esta vez nadie se ríe, y esa es toda la diferencia del mundo.

**B — Negarte. Hay cosas que no.** *(sin requisito)*
→ `Honor:2`, `rel:{equipo:-1}`, flag `teNegasteALaOlla`
> Le devuelves el frasco a Drache. Él no se enfada; casi parece aliviado, como quien ve a alguien no cometer un error que él ya no puede deshacer. "Tú mismo", dice. Perdéis ese partido. Serrault toma nota de que el reclamo tiene escrúpulos, y los escrúpulos, en Mortaigne, se pagan.

**C — Echar el frasco, pero avisar al rival en secreto.** *(requiere Astucia 3; forzable)*
→ `Astucia:2`, `Honor:1`, flag `dobleJuego`
> Echas el frasco delante de Drache y luego, a solas, le susurras al capitán rival que no cene. Ganáis igual, por otras razones, y nadie sabe que jugaste a dos bandas. Es lo más listo y lo más solo que has hecho nunca. Empiezas a entender que en Mortaigne la única lealtad posible es contigo mismo.

## B3 — La cena de Mortaigne

*La escena exclusiva del precio emocional. El espejo helado del banquete de los Comepasteles.*

Ganáis mucho. Y cuando se gana, en Mortaigne se cena. Un salón con manteles, un cocinero que sabe lo que hace, y comida de la que en Villapastel no habíais ni oído hablar. Comes bien. Comes mucho. Comes solo, aunque haya doce personas en la mesa, porque nadie habla contigo de nada que no sea el próximo partido.

Te acuerdas, sin querer, de otra mesa. De doce halflings, un árbol y un cocinero comiendo hasta que no cabía una miga, en silencio, que entre los tuyos era la conversación más honesta que existe. Aquí el silencio no es honesto. Aquí el silencio es que no tienen nada que decirte.

**Opciones:**

**A — Brindar con ellos. Es tu vida ahora. Acéptala.**
→ `Ambición:1`, `Voluntad:1`, flag `aceptasteMortaigne`
> Levantas la copa. Brindáis por la victoria, por el dinero, por el próximo rival. Es una buena vida. Te lo repites hasta que casi te lo crees. La comida está buenísima y no te sabe a nada.

**B — Levantarte y cenar solo, un mendrugo, mirando por la ventana.**
→ `Honor:1`, `rel:{abuela:1}`, flag `echasDeMenos`
> Te llevas un trozo de pan y te sientas junto a la ventana del salón, que da a una calle cara y no a un camino. Masticas despacio, como te enseñó ella. Por primera vez desde que firmaste, echas de menos comer mal en compañía. Y por primera vez piensas que a lo mejor te equivocaste, aunque estés ganando.

**C — Mandarle una carta a tu abuela. La primera desde que te fuiste.** *(requiere `rel.abuela` ≥ 1)*
→ `rel:{abuela:2}`, `Honor:1`, flag `escribisteALaAbuela`
> Escribes torpe, porque amasar se te da mejor que las letras. "Estoy bien. Como mucho. No sabe a lo tuyo." No sabes si sabe leer. Da igual. La escribes para ti tanto como para ella. No la contestan, pero semanas después te llega, sin nota, un tarro de mantequilla de la Comarca. Lo guardas y no lo abres. Es demasiado importante para gastarlo.

*Deja para después (memoria de la rama): `envenenasteLaOlla` / `teNegasteALaOlla` se leen en la final (cap 6) y en el epílogo: definen en qué te convertiste. `echasDeMenos` / `escribisteALaAbuela` cambian el duelo del cap 7 —si mantuviste el hilo con ella, muere sabiendo de ti, aunque no estuvieras—. El tarro de mantequilla sin abrir es un objeto (biblia 5), candidato a leerse en el duelo.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[Rama A, si `campeon`:]**
> Tenéis una copa. De latón, abollada, ridícula, vuestra. Roblerto la usa de sombrero. Bortrand cocina dentro de ella. Tu abuela la mira en la repisa cada mañana antes de amasar. No vale nada y no la venderíais por todo Mortaigne junto. Eso, precisamente eso, es lo que Berto quería sin saberlo.

**[Rama A, si no `campeon`:]**
> Perdisteis la final. Pero llegasteis a una, que ningún Comepasteles había hecho jamás, y volvéis a Villapastel como quien vuelve de una guerra que casi gana. La abuela pone doce platos. Hay para todos, incluso para el árbol, que come tierra de la buena.

**[Rama B, si `echasDeMenos` o `escribisteALaAbuela`:]**
> Ganas partidos, dinero, carteles con tu cara. Y cada noche, en la mejor cama en la que has dormido nunca, piensas en una ventana que da a un camino y en una mujer que ya no pone tu plato. Tienes todo lo que fuiste a buscar. Empiezas a sospechar que fuiste a buscar lo que no era.

**[Rama B, si `aceptasteMortaigne`:]**
> Te has convertido en un jugador de Mortaigne. Frío, eficaz, ganador. Ya no sueñas con tarta. Es una buena vida y no piensas mirar atrás, porque mirar atrás, en Mortaigne, es de perdedores. Solo que a veces, sin querer, hueles tus manos buscando mantequilla. Y no dices nada, porque aquí no se dicen esas cosas. Aquí no se dice nada.

---

### Notas de diseño del capítulo

- **Rama A: 12 opciones** (4 escenas). ✓ Heredada de la build, tiradas convertidas a 1d6, la repetición de equipo entra en la final si `equipo` alto.
- **Rama B: 9 opciones** (3 escenas), escritura nueva. Cumple biblia 18.1: personajes propios (Drache, Kessler, Serrault de fondo), dos escenas exclusivas (la olla, la cena), humor frío, sin castigo moral (se gana más). Anotado: se puede añadir una 4ª escena (un partido de Tercera jugado) para igualar el peso de la rama A.
- **Con riesgo:** rama A, la semifinal y la final; rama B se apoya en decisiones morales más que en daño físico, coherente con su tono frío. **Anotado**: la rama B necesita al menos un partido con riesgo para cumplir biblia 13.1; candidato a la 4ª escena.
- **Reconvergencia:** ambas ramas terminan apuntando al cap 6. El flag de rama decide qué Berto llega a la final.
- **Memoria sembrada para el duelo:** `escribisteALaAbuela` y el tarro de mantequilla dan una variante nueva al duelo del cap 7 (muere sabiendo de ti aunque no estuvieras).
