# Barro y Ceniza — Halfling
## Capítulo 1 — Villapastel
### *Comarca del Nabo, de donde nadie con dos dedos de frente se va*

Prosa final. Sigue la biblia del sistema (regla de 1d6, atributos ocultos, memoria declarada) y la voz del halfling (segunda persona presente, giro al final, humor de hambre y ternura). Heredado y ampliado del texto de la build.

**Función del capítulo:** tutorial. Presenta el mundo y a los cinco personajes, y enseña que las decisiones dejan huella. Cinco escenas.

**Ficha de debut** (biblia 5.1): 4/2/4+/5+/6+, solo Escurridizo y Esquivar. Berto alcanza la ficha de puesto en el capítulo 2.

---

## Escena 1 — El último pastel

En Villapastel hay dos leyes: no dejar que se enfríe el horno y no salir de la Comarca. Tú llevas toda la vida amasando y toda la vida mirando por la única ventana que da al camino cómo pasan los carros de los equipos de verdad —grandes, con dientes— rumbo a ciudades con nombre.

Hoy uno se ha parado a comprar tarta. El blitzer que baja a pagar te mira desde muy arriba, te da una palmada "de buen rollo" que te sienta en la harina, y se va riéndose.

Tu abuela, sin levantar la vista del guiso: "A ese algún día se lo come el suyo. Tú amasa".

**Opciones:**

**A — Amasar. Pero con odio.**
→ `Ferocidad:2`, flag `conOdio`
> Amasas el pan más duro de la historia de la Comarca. Se parte un cuchillo cortándolo. Guardas la mitad para tirársela a alguien, algún día, desde muy cerca.

**B — Dejar el delantal en el suelo y salir por la ventana.**
→ `Ambición:2`, `Voluntad:1`, flag `porLaVentana`
> Sales por la ventana que da al camino. Tu abuela ni se gira: "La cena a las ocho. Estés muerto o no".

**C — Preguntarle a la abuela cómo se juega a que no te maten.**
→ `Astucia:1`, `rel:{abuela:1}`, flag `consejoAbuela`
> "No dejes que te vean pequeño", dice. "Y si te ven, muérdeles el tobillo". Es el mejor consejo táctico que recibirás en toda tu carrera.

*Deja para después: `conOdio` (lo lee Pipo en la escena 2, y es un eco hasta el cap 3), `porLaVentana` (eco de correr, cap 2), `consejoAbuela` (la frase del tobillo vuelve en el duelo del cap 7).*

---

## Escena 2 — El agente de tres dedos

Te encuentra un halfling con un puro más grande que su brazo y tres dedos en una mano. "Pipo Cazuelas", dice, "agente. Represento a jugadores de todas las razas. Bueno, de la nuestra. Bueno, a ti".

Te enseña un contrato de catorce páginas.

*[si `conOdio`:]* Huele el odio en ti y sonríe: "Con eso duras tres partidos. Igual cuatro".
*[si no:]* Te mira de arriba abajo, que en un halfling es poco: "Enclenque. Perfecto. Los enclenques dan pena, y la pena vende entradas".

La letra pequeña, dice, "es un formalismo". La letra pequeña dice que le debes el diez por ciento de todo y una tarta semanal de por vida.

**Opciones:**

**A — Firmar sin leer. Total.**
→ `Ambición:1`, `rel:{pipo:2}`, flag `firmasteAPipo`
> Firmas. Pipo se guarda el contrato y una de tus tartas por adelantado. "Bienvenido al deporte, chaval". Ya le debes dinero y aún no has jugado.

**B — Leer las catorce páginas. Todas.** *(requiere Astucia 2; forzable)*
→ `Astucia:2`, `rel:{pipo:-1}`, flag `leisteContrato`
> Tardas dos horas. En la página nueve descubres que, en caso de muerte, tus tartas pasan a Pipo "a perpetuidad". Le tachas la línea. Pipo te respeta, que es peor que caerle bien.

**C — Regatearle a base de tartas.**
→ `rel:{pipo:1}`, `Astucia:1`, flag `regateasteAPipo`
> Acabáis en un cinco por ciento y dos tartas al mes. Es la mejor negociación de tu vida y la peor de la suya. A partir de ahí sois amigos, que en Pipo significa que te robará más despacio.

*Deja para después (memoria de Pipo, biblia): `firmasteAPipo` abre sus negocios en cap 3 y 5, y hace que en el cruce del cap 4 empuje hacia Mortaigne. `leisteContrato` es la llave que lo desarma: sabes lo que le debes, así que en el cap 5-6 no puede sablearte, y en el cap 4 te dice la verdad aunque no le convenga. `regateasteAPipo` marca el punto medio.*

---

## Escena 3 — El fichaje estrella

Un equipo de halflings no gana partidos: gana tiempo hasta que se despierta el árbol. El de los Comepasteles vive en la charca de detrás del horno y responde, a veces, al nombre de Roblerto.

Mide lo que tres carros, tiene la inteligencia de un banco de jardín y una manía preocupante: coge del suelo lo pequeño y redondo y lo lanza muy lejos. En un campo, eso es el balón. Fuera del campo, eso eres tú.

**Opciones:**

**A — Hacerte amigo del árbol. A base de pasteles.**
→ `rel:{arbol:2}`, `Honor:1`, flag `amigoArbol`
> Le llevas pastel cada día. Roblerto aprende a distinguirte del balón por el olor a mantequilla. Es lo más parecido a un seguro de vida que vas a tener.

**B — Comerte tú el pastel que era para Roblerto.**
→ `Voluntad:1`, `rel:{arbol:-1}`, flag `teComisteSuPastel`
> Está buenísimo. Roblerto se entera, porque los árboles se enteran de todo despacio. A partir de hoy te mira como se mira a un balón que encima te ha robado la merienda.

**C — Mantenerte muy lejos de Roblerto.**
→ `Astucia:1`, `Voluntad:1`, flag `lejosArbol`
> Decides que el árbol es cosa de los demás. Es la decisión más sensata que tomarás en tu carrera, y por eso mismo no durará.

*Deja para después: `amigoArbol` desbloquea que Roblerto te lance en el primer partido (escena 5), abre la actividad de entrenar esquivas (cap 2+), y se lee muchas veces. Es una relación bien conectada; sus ecos menores (`teComisteSuPastel`, `lejosArbol`) pueden no volver.*

---

## Escena 4 — El Chef

El otro fichaje de un equipo halfling es el Chef. El vuestro se llama Bortrand y cocina tan bien que el reglamento lo considera un arma: si el rival prueba su estofado antes del partido, se le olvida a qué había venido.

Bortrand no juega. Bortrand cocina y, de paso, "se ocupa" de la cerveza del vestuario visitante, que desaparece como por arte de magia. Nadie ha probado nada. Todos lo saben.

**Opciones:**

**A — Aprender a robar cerveza con Bortrand.**
→ `Astucia:2`, `rel:{chef:2}`, flag `aprendizChef`
> Bortrand te enseña a entrar en un vestuario ajeno con una bandeja y salir con seis jarras. "La clave es que nadie sospecha del que trae comida". Lo apuntas para el resto de tu vida.

**B — Pedirle que envenene un poco al rival. Solo un poco.** *(requiere Ferocidad 3; forzable)*
→ `Ferocidad:1`, `Honor:-2`, `rel:{chef:1}`, flag `envenenador`
> "¿Envenenar? Yo cocino", dice Bortrand, ofendidísimo, mientras echa algo verde a la olla del rival. "Otra cosa es que a la gente le siente mal la buena comida".

**C — Comerte tú el estofado, por si acaso.**
→ `Voluntad:1`, `rel:{chef:1}`, flag `teComisteElEstofado`
> Te comes una ración de prueba. Y otra. Y otra. Cuando llega el rival, tú tampoco recuerdas a qué habías venido. Bortrand toma nota: los domingos, esconderte la comida.

*Deja para después: `aprendizChef` te da ventaja en varios partidos (los rivales juegan sedientos) empezando por la escena 5. `envenenador` es un eco oscuro que anticipa la escena de la olla en la rama Mortaigne (cap 5): Berto ya sabe lo que es envenenar por cálculo.*

---

## Escena 5 — El primer domingo

**Partido: Los Carniceros de Bögenhafen.** *(la némesis; biblia 17.9)*

Los Carniceros de Bögenhafen son lo que su nombre promete: doce tipos que entre semana parten reses y los domingos parten halflings, por variar. Vienen a Villapastel a "hacer manos" antes de la temporada de verdad. La apuesta local no es quién gana —eso está claro— sino cuántos Comepasteles acaban el partido de pie. La cifra que más se repite es "cero".

*[si `aprendizChef`:]* Bortrand ya ha vaciado su vestuario de cerveza: juegan sedientos y de mal humor, que es peor.
*[si `amigoArbol`:]* Roblerto te huele la mantequilla y, por una vez, parece tener claro de qué lado estás.
*[si no:]* Roblerto mira el balón, luego a ti, y no termina de decidir cuál de los dos lanzar.

El silbato suena como suena una sentencia.

**Opciones:**

**A — Colártele entre las piernas al carnicero más grande y correr.**
*Tirada: AG (4+). Con riesgo. Esquivar puede repetir.*
- **Éxito:** → `fama:8`, `Ambición:1`, gol, `rel:{equipo:2, aficion:2}`, flag `anotasteElPrimero`
> Te cuelas entre dos pares de piernas como un pastel con mantequilla, esquivas al tercero porque tropieza con Roblerto, y cruzas la línea sin que nadie te haya rozado. Villapastel entra en shock: un halfling ha anotado. La abuela, en la grada, sigue tejiendo, pero teje más rápido.
- **Fallo (riesgo):** → gol rival, entra cadena de daño
> Te cuelas entre las piernas y sales por el otro lado directo a la bota de un carnicero que ni te ve venir. Vuelas. Aterrizas. Cuentas todas las estrellas del Mundo Viejo, que son unas cuantas.

**B — Que Roblerto te lance a la zona como una bomba de mantequilla.** *(requiere `amigoArbol`; forzable)*
*Tirada: fuerza del lanzamiento de Roblerto (4+). Con riesgo.*
- **Éxito:** → `fama:10`, gol, `rel:{arbol:2}`, flag `bombaDeMantequilla`
> Roblerto te agarra, apuntas al hueco, y sales disparado por encima de doce carniceros que miran hacia arriba con la boca abierta. Cruzas la línea volando y aterrizas de morros, pero cruzas. La jugada se hará famosa. La copiarán fatal en toda la Comarca.
- **Fallo (riesgo):** → gol rival, caes lejos
> Roblerto te agarra, se distrae con una mariposa, y te lanza a la grada. Caes de lleno sobre el puesto de tartas de tu abuela. Ella, sin inmutarse, te quita una pasa de la oreja: "Te lo dije".

**C — Sentarte sobre el balón y no dárselo a nadie.**
→ `Astucia:1`, `Voluntad:1`, flag `teSentasteSobreElBalon`
> Te sientas encima del balón como una gallina cabezota. Los Carniceros no saben qué hacer: no hay regla contra esto porque a nadie se le había ocurrido ser tan pequeño y tan terco a la vez. El árbitro, perplejo, lo consulta. Pierdes tiempo, que a veces es lo único que un halfling puede ganar.

**D — No buscar el gol: plantarte delante de un compañero caído.**
*Tirada: aguantar, FU contra el carnicero. Con riesgo.*
- **Éxito o fallo, da igual el resultado del balón:** → `rel:{equipo:2}`, `Voluntad:1`, flag `protegisteAUnCompanero`
> No avanzas ni un metro. Te plantas sobre un Comepasteles que no se levanta, delante de tres Carniceros. Al primero le muerdes el tobillo. El segundo se ríe. El tercero deja de reírse. No ganas nada en el marcador. Pero el compañero se levanta, y en el vestuario, esta noche, alguien se acuerda de eso más que de ningún gol.

*Deja para después: `anotasteElPrimero` (eco de que un halfling puede marcar). `teSentasteSobreElBalon` → se lee en el cap 7 ("siempre fuiste bueno sentándote donde no debías"). `protegisteAUnCompanero` empieza a construir `equipo`, que gobierna tus repeticiones de equipo (biblia 2.4). La palmada del carnicero que abre este capítulo arranca aquí el espejo que se cierra en el cap 6 y se lee en el cap 7.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4: un párrafo según la variable más alta.*

**[si `rel.abuela` es lo más alto:]**
> Vuelves a casa oliendo a barro y a harina. La abuela te pone un plato sin preguntar. "¿Y?" "He jugado." "¿Has muerto?" "No." "Entonces ha ido bien." Y te sirve más, que es como te dice el resto.

**[si `equipo` es lo más alto:]**
> Los Comepasteles no ganan, pero esta noche comen contigo como si algo hubiera cambiado. Nadie lo dice. Se dice pasándote la fuente primero.

**[si `arbol` es lo más alto:]**
> Roblerto te espera en la charca. Intenta abrazarte. No sale especialmente bien —eres pequeño y él es un bosque— pero la intención astilla menos de lo que temías.

**[si `pipo` es lo más alto:]**
> Pipo ya está haciendo cuentas. "Un halfling que sobrevive un domingo entero... eso, bien vendido, son entradas." No es cariño. Pero en Pipo, calcular contigo es lo más cerca que llega.

**[si nada destaca:]**
> Vuelves a casa. La abuela te pone un plato. "¿Y?" "He jugado." "¿Has muerto?" "No." "Entonces ha ido bien."

---

### Notas de diseño del capítulo

- **12 opciones** (biblia 13.1: entre 12 y 18). ✓
- **Con tirada:** escena 5, opciones A, B, D — más de un tercio de las de esta escena; el capítulo se apoya en el partido para las tiradas, que es correcto en un tutorial. ✓
- **Con riesgo:** A, B, D del partido (2-4). ✓
- **Con requisito:** leer contrato (Astucia 2), envenenar (Ferocidad 3), lanzamiento de Roblerto (`amigoArbol`). ✓ (3)
- **Opción que no da nada y solo caracteriza:** sentarse sobre el balón (C) es casi eso; define a Berto más que puntuar. ✓
- **Fotografía de cierre** escrita. ✓
- **Correcciones aplicadas:** la actividad `aguantarGolpes` no aparece (eliminada); Pipo ya deja memoria declarada.
