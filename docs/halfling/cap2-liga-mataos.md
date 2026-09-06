# Barro y Ceniza — Halfling
## Capítulo 2 — La liga de los mataos
### *Sexta División, o lo que quede debajo*

Prosa final. Sigue la biblia (1d6, atributos ocultos, memoria declarada) y la voz del halfling. Heredado y ampliado del texto de la build.

**Función del capítulo:** oficio. Berto aprende a jugar y el sistema se abre. Aquí se hacen las **promesas** (memoria que se lee en la final, biblia) y se resuelve el **escándalo de Roblerto**. Cuatro escenas.

**Ficha de puesto** (biblia 5.1): al firmar el primer contrato de verdad, Berto pasa a 5/2/3+/4+/7+. Debe ser una escena, no un ajuste silencioso: ocurre en el debut.

---

## Escena 1 — Bienvenidos a Sexta

Sexta División no es una división: es un aparcamiento de equipos que la federación no se atreve a disolver por si hay demanda. Hay un equipo de goblins, uno de campesinos con un hombre-árbol de alquiler, uno de no-muertos de bajo presupuesto —les faltan piezas— y vosotros, los Comepasteles. El calendario lo hace una tal Ma Gorka desde una cueva, y los horarios "dependen de las apuestas".

*[si `firmasteAPipo`:]* Pipo ya ha vendido tu debut a tres periódicos y a una fábrica de tartas.
*[si no:]* Nadie ha venido a veros, salvo tu abuela, que teje en primera fila calculando cuándo cobrar.

Te dan una camiseta que huele a otro y un número que ya llevó alguien que no volvió.

**Opciones:**

**A — Prometerte que vas a ganar algún partido esta temporada.**
→ `Ambición:1`, `Voluntad:1`, flag `prometisteGanar`
> Lo dices en voz alta en el vestuario. Silencio. Luego risas. Luego alguien apunta la fecha "por si acaso". Nadie apuesta a favor, ni tu abuela, que de números sabe.

**B — Prometerte, más modesto, sobrevivir a la temporada entera.**
→ `Astucia:1`, `Voluntad:1`, flag `prometisteSobrevivir`
> El vestuario asiente. Eso sí es un objetivo realista para un Comepasteles. Bortrand lo celebra con estofado. Nadie muere ese día, que ya es empezar la casa por el tejado.

**C — Estudiar a los rivales para saber a quién SÍ podéis ganar.** *(requiere Astucia 2; forzable)*
→ `Astucia:2`, flag `estudiasteLaLiga`
> Solo hay uno más malo que vosotros: los Tragaldabas, que juegan comiendo. Ese es vuestro partido. El derbi de los descartes. La única esperanza real de la temporada, y ya es más de lo que tienen algunos.

*Deja para después (memoria de las promesas, biblia): la final del cap 6 lee qué prometiste y dice si lo cumpliste. `prometisteGanar` y ganas = cumpliste lo imposible; y pierdes = apuntaste alto y te quedaste corto. `prometisteSobrevivir` y llegas vivo = ya cumpliste antes de jugar. `estudiasteLaLiga` da ventaja en el derbi (escena 2).*

---

## Escena 2 — El derbi de los descartes

**Partido: Los Tragaldabas de Villapán** *(rival flojo; el único que podéis ganar)*

Los Tragaldabas de Villapán son la única esperanza de vuestra temporada: un equipo aún más halfling que el vuestro, si eso es posible, que fía la defensa a un pastel envenenado y el ataque a que al rival le entre hambre.

*[si `estudiasteLaLiga`:]* Los estudiaste: pierden solos si aguantas veinte minutos sin que se coman el balón.
*[si no:]* No sabes nada de ellos, salvo que existen y que dan pena, como vosotros, pero un poco más.

Es el único partido del año que un Comepasteles puede ganar. Doscientos halflings en la grada, cero de ellos sobrios. Si perdéis esto, no ganáis nada nunca, y lo sabéis.

**Opciones:**

**A — Robarles el balón mientras meriendan en el campo.**
*Tirada: AG (3+ si `estudiasteLaLiga`, si no 4+). Sin riesgo.*
- **Éxito:** → `fama:6`, `Astucia:1`, gol, `rel:{equipo:2, aficion:1}`, flag `ganasteAlgo`
> Se paran a media merienda a discutir de quién es el último trozo. Les quitas el balón de entre los platos y cruzas mientras siguen discutiendo. Un touchdown de puro despiste. Villapán no se entera hasta el lunes.
- **Fallo:** → gol rival
> Metes la mano entre los platos y sale mal: te confunden con un canapé y casi te comen. Recuperas la mano por poco. Ellos recuperan el balón por mucho.

**B — Que Roblerto despeje la merienda de un manotazo y correr tú.** *(requiere `amigoArbol`, no `ramonVendido`; forzable)*
*Tirada: lanzamiento/barrido de Roblerto (4+). Con riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{arbol:1, equipo:2}`, flag `ganasteAlgo`
> Roblerto barre la mesa de la merienda con un brazo y Villapán entero se lanza a por los pasteles que vuelan. En el caos, cruzas la línea andando, silbando. La victoria más ridícula de la historia de Sexta, y es vuestra.
- **Fallo (riesgo):** → gol rival, caes
> Roblerto barre la mesa, sí, pero también te barre a ti, que estabas encima cogiendo un trozo. Vuelas con los pasteles. Aterrizas en el pastel envenenado de la defensa. Sabe raro.

**C — Aburrirlos hasta que se coman entre ellos.**
*Tirada: AG (4+). Sin riesgo.*
- **Éxito:** → `fama:5`, `Astucia:1`, gol, `rel:{aficion:1}`, flag `ganasteAlgo`
> No haces nada. Absolutamente nada. Te sientas sobre el balón —ya sabes hacerlo— y esperas. A los diez minutos, Villapán empieza a mirar el pastel envenenado de su propia defensa con hambre. A los quince, se lo comen. Ganáis por incomparecencia digestiva.

*Deja para después: `ganasteAlgo` es la primera victoria de Berto y se lee en el cap 7 (por primera vez un Comepasteles ganó algo). Los Tragaldabas reaparecen en el cap 7 como cierre circular; lo que hagas aquí colorea cómo te reciben entonces.*

---

## Escena 3 — El árbitro desaparecido

*Condición: solo si Roblerto sigue en el equipo (no `ramonVendido`).*

Pasa lo que tenía que pasar. En pleno partido, el árbitro —un goblin con silbato— le saca tarjeta a Roblerto por "existir con intención de placar". Roblerto, que confunde lo pequeño y ruidoso con comida, se lo mete en la boca de un solo movimiento, con silbato y todo. Se hace un silencio que solo rompe el silbato, ahora dentro de Roblerto, pitando cada vez que respira.

La federación abre expediente.

*[si `rel.arbol` alto:]* Roblerto te busca con la mirada, culpable, con media tarjeta amarilla asomando entre las ramas.
*[si no:]* Roblerto ni se inmuta. Sigue buscando el balón, o el postre, que para él es lo mismo.

**Opciones:**

**A — Cubrir a Roblerto: "se marchó a por tabaco, señoría".**
→ `Honor:-1`, `rel:{arbol:2}`, flag `cubristeRamon`
> Juras que el árbitro se fue voluntariamente. Nadie te cree, pero nadie quiere acercarse a Roblerto a comprobarlo. El expediente se queda en un cajón. Roblerto, a su manera lentísima, lo entiende, y te trae una piedra de regalo.

**B — Enseñar a Roblerto a escupir árbitros. Solo escupir.** *(requiere `rel.arbol` ≥ 2; forzable)*
→ `Astucia:1`, `rel:{arbol:1}`, flag `ramonEscupe`
> Semanas de galletas y paciencia. Roblerto aprende a escupir lo que no es redondo. El árbitro sale mareado y sordo del silbato, pero vivo. Es más de lo que consigue la mayoría de la gente con un hombre-árbol suelto.

**C — Vender a Roblerto antes de que se coma a alguien importante.**
→ `oro:100`, `Honor:-1`, `rel:{arbol:-3}`, flag `ramonVendido`
> Un circo de Cuarta paga cien coronas por un árbol que se come árbitros. Roblerto se va sin mirar atrás, porque los árboles no miran atrás. El vestuario queda más seguro y muchísimo más triste. Ganaréis menos. Comeréis mejor. No es lo mismo.

*Deja para después (la otra gran bifurcación del libro): `ramonVendido` cambia partidos enteros —juegas sin árbol, más difícil— y se lee en el cap 3 (el partido sin red), el cap 6 (no está en la final) y el cap 7 (el hueco donde estaba). Hay una recompra carísima en el tramo final. `ramonEscupe` deja a Roblerto útil sin matar a nadie. La venta da las 100 coronas que abren la economía del libro, y son dinero manchado (biblia 8): traicionar al árbol.*

---

## Escena 4 — La paliza de los jueves

**Partido: Los Rompehuesos de Grauwald** *(rival duro; os usan de entrenamiento)*

Toca lo de siempre: un equipo grande que os usa de entrenamiento. Los Rompehuesos de Grauwald tienen tres jugadores con nombre de arma de asedio y un plan de partido de una sola palabra.

*[si `ramonVendido`:]* Sin Roblerto, la única táctica es correr y rezar, y los halflings no sois de rezar.
*[si no:]* Roblerto, al menos, iguala un poco la báscula, aunque hoy mira una nube en vez del campo.

*[si `prometisteSobrevivir`:]* Recuerdas tu promesa: sobrevivir la temporada. Hoy toca cumplirla, no ganarla.

La grada local ha traído carteles con el número de bajas que esperan. Van ganando ellos, los carteles.

**Opciones:**

**A — Correr sin parar y no dejar que te toquen. Toda la tarde.**
*Tirada: MV (forzar la marcha, 3+). Sin riesgo.*
- **Éxito:** → `fama:7`, gol, `rel:{aficion:2}`, flag `sobrevivisteLaPaliza`
> Corres. Corres como no ha corrido un halfling, esquivando placajes que abrirían un carro, y al final del caos hay un hueco y lo cruzas. No ganáis, pero anotas, y sales de pie, que era el plan. La grada guarda un cartel para la próxima.
- **Fallo:** → gol rival
> Corres hasta que un Rompehuesos decide correr también, y él tiene las piernas más largas. Te alcanza. La grada tacha un número de su cartel.

**B — Meterte debajo del más grande y hacerle tropezar.**
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:6`, `Ferocidad:1`, gol, `rel:{equipo:2}`
> Te tiras a sus tobillos como quien se tira a una piscina de barro. El grandullón se va al suelo con un ruido de árbol talado y la mitad de su equipo por encima. En la confusión, alguien de los tuyos cruza. Milagro y hematomas.
- **Fallo (riesgo):** → gol rival, entra cadena de daño
> Te tiras a sus tobillos y descubres que son de hierro. Rebotas. Él ni lo nota. Te recoge Bortrand con una espátula.

**C — Aguantar la paliza entera de pie, sin más. Por orgullo.**
*Tirada: aguantar, AG (3+). Sin riesgo.*
- **Éxito:** → `rel:{equipo:1, aficion:1}`, `Voluntad:1`, flag `sobrevivisteLaPaliza`
> No anotas, no lo intentas. Solo aguantas: caes, te levantas, caes, te levantas, hasta el silbato. Pierdes por goleada, pero acabas el partido de pie, y en Sexta División eso es una forma de ganar que no viene en el marcador. La abuela deja de tejer un momento. Solo un momento.

*Deja para después: `sobrevivisteLaPaliza` cumple la promesa modesta y se lee en la final. Que aguantes de pie construye `equipo`, que gobierna tus repeticiones (biblia 2.4).*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `ganasteAlgo` (ganaste el derbi):]**
> Por primera vez en la historia de los Comepasteles, hay algo que celebrar. No es una copa. Es un partido. Uno. Pero Bortrand cocina como si fueran diez y la abuela, en la grada vacía, teje una bufanda que no le has pedido y que te va a quedar grande a propósito, "para cuando crezcas". No vas a crecer. Los dos lo sabéis. Te la pones igual.

**[si `ramonVendido`:]**
> La charca de detrás del horno está vacía. Nadie lanza nada pequeño y redondo por los aires. El vestuario come mejor con las cien coronas, pero come callado, y hay un sitio en la mesa que nadie ocupa, porque no cabría.

**[si `prometisteGanar` y no ganaste el derbi:]**
> Prometiste ganar y todavía no has ganado nada. La fecha que alguien apuntó "por si acaso" sigue en la pared del vestuario, sin tachar. La miras. Ella te mira a ti.

**[si nada destaca:]**
> Otra temporada de Sexta que empieza. La camiseta ya huele a ti y no al que no volvió. Es poca cosa. En Villapastel, poca cosa es casi todo.

---

### Notas de diseño del capítulo

- **12 opciones.** ✓ (biblia 13.1)
- **Con tirada:** las tres escenas de partido, todas. Más de un tercio. ✓
- **Con riesgo:** derbi B, paliza B (2-4). ✓
- **Con requisito:** estudiar la liga (Astucia 2), Roblerto en el derbi (`amigoArbol`), escupir árbitros (`rel.arbol` ≥ 2). ✓ (3)
- **Opción que solo caracteriza:** aguantar de pie por orgullo (paliza C) no busca marcador, define a Berto. ✓
- **Fotografía de cierre** con variantes por rama. ✓
- **Memoria conectada:** las promesas quedan listas para la final; el arco de Roblerto declara sus lecturas hasta el cap 7.
- **Tiradas convertidas a 1d6:** los objetivos de 6-8 de la build pasan a 3+/4+ según dificultad, con la ventaja de `estudiasteLaLiga` bajando el objetivo del derbi.
