# Barro y Ceniza — Enano
## Capítulo 1 — La caja
### *Primera temporada en Segunda*

Prosa final. Sigue `biblia-sistema.md` y el documento de raza del enano (voz pétrea y lenta, la sentencia ancestral que resulta ser sobre ti, el motivo de la caja que avanza una casilla por turno). Heredado y ampliado de la build.

**Función del capítulo:** origen. Baraz-Ankor, Durak, la caja, tu velocidad como problema. Enseña que las decisiones dejan huella. Cinco escenas.

**Ficha de debut** (biblia 5.1): joven, primer año. 5/3/4+/5+/9+, sin Esprintar. Ganas Esprintar al aceptar tu don de corredor (escena 2).

**Modelo:** híbrido (biblia 18, sección 7 del doc). Cruce grande en el cap 4, alimentado por el eje **Correr↔Caja**, que arranca aquí. Cada decisión suma hacia uno de los dos polos. Y se conecta desde el principio a **Brokk**, tu hermano (auditoría: era huérfano; aquí se le dan lecturas).

---

## Escena 1 — Aquí no se corre

El estadio de Baraz-Ankor está tallado en la montaña y tiene sesenta mil asientos de piedra, cada uno con el nombre de la familia que lo ocupa desde hace trescientos años. Hoy hay cuatro mil. Es el primer entrenamiento en Segunda de la historia del club: el año que los Cascos de Hierro bajaron, por primera vez desde que hay memoria escrita, que en un club de enanos es mucha memoria.

Durak Ojoferro, el entrenador, ochenta años en el banquillo, te mira las piernas, luego la cara, y dice lo primero que te dirá cada día durante tres temporadas: "Aquí no se corre. Aquí se recoge el balón y se entra en la caja". Detrás de él, once enanos con una media de edad de ciento cuarenta años forman una caja perfecta sin que nadie se lo pida.

Tu hermano Brokk está en la caja, en su esquina, donde lleva veinte años. Te hace un sitio a su lado. En el centro, no en la banda.

**Opciones:**

**A — Entrar en la caja al lado de Brokk. Es lo que se hace.**
→ `rel:{brokk:2, durak:1}`, `caja↑`, flag `entrasteEnLaCaja`
> Entras en la caja, en la esquina, al lado de tu hermano. Brokk no dice nada; los enanos no dicen esas cosas. Pero te da con el hombro, una vez, que en Brokk es un abrazo. Durak asiente. Avanzas una casilla. Es lento. Es tuyo. Es de los tuyos.

**B — Correr una vez, solo una, para que Durak lo vea.** *(correr)*
→ `Ambición:1`, `rel:{durak:-1, aficion:1}`, `correr↑`, flag `corristeElPrimerDia`
> Coges el balón y corres. De verdad. Cruzas el campo tallado antes de que la caja haya avanzado dos casillas, y en los cuatro mil asientos ocupados hay un murmullo que no se oía en Baraz-Ankor desde hacía un siglo. Durak no aplaude. "Aquí no se corre", repite, más bajo. Brokk mira al suelo. Has ganado la grada y perdido algo en la esquina de la caja.

**C — Preguntarle a Durak por qué la caja, si la caja los bajó.** *(requiere Astucia 2; forzable)*
→ `Astucia:2`, `rel:{durak:-1}`, flag `preguntastePorLaCaja`
> "Bajamos jugando la caja", dices. "¿Por qué seguir?". El vestuario de piedra se queda en silencio. Durak te mira ochenta años. "Porque bajar en la caja es bajar de pie", dice. "Y subir corriendo es subir de rodillas ante gente que no es la nuestra". No lo entiendes. Lo entenderás. Ojalá no.

*Deja para después (eje Correr↔Caja, arranque): `entrasteEnLaCaja` suma Caja y a Brokk. `corristeElPrimerDia` suma Correr y gana la grada, pero enfría a Durak y a tu hermano. `preguntastePorLaCaja` planta la pregunta del libro, y la respuesta de Durak ("bajar de pie") vuelve en el cap 7. Brokk queda ligado desde la primera escena (arreglo de la auditoría).*

---

## Escena 2 — Dorin Yunquefirme

Dorin Yunquefirme tiene ciento setenta años, dos rodillas de hierro y el brazalete de capitán desde antes de que naciera tu padre. Ya no llega al balón. Nunca le hace falta: manda dónde va cada bota. Te sienta en la piedra del vestuario y te dibuja la caja con tiza: cuatro linieros con Romper defensas, dos blitzers en las esquinas, Grimnir el matatrolls suelto, y en el centro el corredor.

"El corredor no corre", dice. "El corredor es el que vale la pena proteger".

*[si `corristeElPrimerDia`:]* Sabe lo del primer día. No lo menciona. Eso es peor.

**Opciones:**

**A — Aprenderte la caja de memoria. Cada bota, cada casilla.**
→ `rel:{dorin:2}`, `Astucia:1`, `caja↑`, flag `aprendisteLaCaja`, gana Esprintar
> Te aprendes la caja entera, dónde va cada uno, cuándo avanza. Dorin te enseña que el corredor de la caja no es el que corre: es el que sabe cuándo la caja puede permitirse abrirse un turno. Es un arte antiguo. Aprendes Esprintar sin usarlo nunca, guardado, por si.

**B — Aprenderte la caja, pero pensar en cómo romperla.** *(correr)*
→ `Astucia:2`, `rel:{dorin:-1}`, `correr↑`, flag `estudiasteRomperLaCaja`
> Te la aprendes para saber por dónde se rompe. Dorin lo ve en tu cara. "Todo corredor joven piensa eso", dice. "Los que llegan a viejos, no". Guardas la jugada de romperla donde guardas las cosas que no se dicen.

**C — Decirle a Dorin que la caja es una tumba con brazalete.** *(requiere Ferocidad 3; forzable)*
→ `Ferocidad:1`, `rel:{dorin:-2, durak:-1}`, `correr↑↑`, flag `insultasteLaCaja`
> "Es una tumba", dices, "y tú llevas el brazalete de enterrador". Dorin no se enfada; los viejos no se enfadan, se entristecen, que dura más. "Ciento setenta años en esta tumba", dice. "Y todos los que quiero están dentro conmigo". Te has ganado un enemigo que no odia, que es el peor.

*Deja para después: `aprendisteLaCaja` es la base de dirigir la caja de capitán (cap 5). `estudiasteRomperLaCaja` desbloquea la jugada de la finta en partidos. Dorin muere en el cap 2: lo que decidas aquí es lo último que compartís. `insultasteLaCaja` pesa cuando muere.*

---

## Escena 3 — Helgra del banquillo

Helgra lleva cuarenta años en el banquillo de los Cascos y no ha jugado ni un minuto. Nació con una pierna más corta, que en un enano no se perdona en el campo. Se sienta al final del banco de piedra, y mientras todos miran el marcador, ella graba runas en la piedra con un clavo. Runas viejas. Runas que no están en los libros.

"Corres", te dice, sin levantar la vista del clavo. "Yo no puedo andar y tú corres. La montaña reparte raro".

**Opciones:**

**A — Sentarte con ella a que te enseñe las runas.**
→ `rel:{helgra:2}`, `Astucia:1`, flag `helgraTeEnseña`
> Te sientas en el banco de piedra con la que nunca juega. Helgra te enseña una runa: "esta es para volver". "¿Volver de dónde?", preguntas. "De donde no se vuelve", dice, y sigue grabando. No entiendes. La runa se te queda en la cabeza, tallada, como en la piedra.

**B — Preguntarle por qué sigue, si nunca juega.**
→ `Honor:1`, `rel:{helgra:1}`, flag `preguntasteAHelgra`
> "Porque alguien tiene que recordar cómo se grababa", dice. "Los que juegan olvidan. Los que miran, no". Es la primera vez que alguien en Baraz-Ankor te dice algo que no es sobre la caja. Lo guardas.

**C — Ignorarla. Es la del banquillo.** *(correr, frío)*
→ `correr↑`, flag `ignorasteAHelgra`
> Pasas de largo. Es la coja del banco, la que nunca juega. Tienes partidos que ganar corriendo. Helgra no se ofende: sigue grabando. Un día, esas runas te van a hacer falta, y no te acordarás de haber pasado de largo. Ella sí.

*Deja para después (arreglo de auditoría — Helgra y la runa): `helgraTeEnseña` desbloquea "la runa de Helgra" en la segunda muerte (biblia 4.2) y se lee en el cap 7. `ignorasteAHelgra` hace que su runa, cuando te salve la vida, duela más. Helgra es la que te mantiene vivo: cultivarla importa.*

---

## Escena 4 — El primer domingo en Segunda

**Partido: Los Segadores de Kleinfeld** *(humanos rápidos, fuerza 2; en Segunda pasan por buenos)*

Los Segadores de Kleinfeld son humanos rápidos que en Segunda parecen buenos. Corren, pasan, saltan. La caja de los Cascos avanza una casilla por turno hacia su portería, imperturbable, mientras los Segadores dan vueltas alrededor buscando un hueco que no hay.

Turno seis. La caja está a tres casillas de anotar. Tú, en el centro, con el balón. Y ves un hueco por la banda: si corres, anotas ya. Si esperas, la caja anota en tres turnos, si nadie falla.

**Opciones:**

**A — Esperar. Dejar que la caja avance. Recoger, proteger, casilla.**
*Tirada: FU (4+, la caja ayuda). Sin riesgo.*
- **Éxito:** → `fama:6`, `rel:{durak:2, brokk:1, dorin:1}`, `caja↑`, gol, flag `anotasteEnCaja`
> Esperas. La caja avanza una casilla. Otra. Los Segadores se estrellan contra las esquinas y caen, uno a uno, porque contra la caja no se corre: se muere de cansancio. En la tercera casilla, cruzas protegido por cuatro linieros. Touchdown de enano, de los que tardan y no fallan. Durak asiente. Brokk te da con el hombro.
- **Fallo:** → gol rival
> Esperas, pero un liniero de ciento sesenta años llega tarde a su casilla y la caja se abre un dedo. Los Segadores meten a su corredor por el hueco. La caja no perdona el error de un turno. Cero a uno.

**B — Correr. Anotar ya, por la banda, tú solo.** *(correr)*
*Tirada: AG (4+). Con riesgo. Esprintar repite si `aprendisteLaCaja`.*
- **Éxito:** → `fama:10`, `rel:{aficion:3, durak:-2, brokk:-1}`, `correr↑↑`, gol, flag `corristeYAnotaste`, `cajaRota`
> Corres. Rompes la caja por la banda y cruzas el campo tallado antes de que los Segadores reaccionen. Los cuatro mil asientos ocupados se ponen de pie, y por un segundo Baraz-Ankor suena como sonaba hace trescientos años. Anotas. Solo. Durak no te mira. Brokk, en su esquina, se ha quedado con el hueco abierto que dejaste, tapando lo que tú no tapaste. Ganáis. Y algo se rompe que no es la caja.
- **Fallo (riesgo):** → gol rival, cadena de daño (Cabeza Dura ayuda), `cajaRota`
> Corres, y un humano rápido —más rápido de lo que un enano espera— te alcanza en la banda y te tira. Sin la caja, estás solo. Te levantas, que para eso eres enano, pero la jugada ha muerto y el hueco que dejaste lo pagan los tuyos. Cero a uno.

*Deja para después (el eje en su forma más pura): `anotasteEnCaja` suma Caja fuerte y a Brokk. `corristeYAnotaste` + `cajaRota` suma Correr fuerte, gana la grada, y hace que Brokk tape tu hueco —imagen que se lee en el cap 4 y 7—. Esta es la decisión que el jugador repetirá cada partido: correr o entrar. El eje se construye aquí.*

---

## Escena 5 — La carta de Brokk

*Escena de relación. Cierra el capítulo con el hermano, que la auditoría marcó huérfano. Aquí se le da su primera lectura fuerte.*

Esa noche, en la galería de piedra donde duermen los jugadores, Brokk te espera despierto. Lleva veinte años en la esquina de la caja, tapando huecos, sin que nadie cante su nombre nunca, porque a los de la esquina no se les canta. Es lo contrario de ti: el que se queda, el que aguanta, el que hace lo que hay que hacer.

*[si `cajaRota` (corriste en el partido):]* "He tapado tu hueco hoy", dice. No es reproche. Es información. "Como cuando éramos crías y te ibas al río y yo le decía a padre que estabas conmigo".
*[si `anotasteEnCaja`:]* "Bien", dice. Solo eso. Pero saca una petaca que guardaba para un día que mereciera la pena, y bebéis los dos en la piedra.

**Opciones:**

**A — Prometerle a Brokk que no volverás a dejarle el hueco.**
→ `rel:{brokk:3}`, `Honor:1`, `caja↑`, flag `prometisteABrokk`
> Se lo prometes. Brokk asiente. "No lo cumplirás", dice, "porque corres, y correr es lo tuyo. Pero gracias por decirlo". Guarda la petaca. Es la conversación más larga que habéis tenido en veinte años, y ha durado cuatro frases.

**B — Decirle a Brokk que corra contigo. Que deje la esquina.** *(correr)*
→ `rel:{brokk:1}`, `Ambición:1`, `correr↑`, flag `pedisteABrokkQueCorra`
> "Corre conmigo", le dices. "Deja la esquina". Brokk se ríe, que en él es raro. "Alguien tiene que tapar el hueco del que corre. Siempre alguien. Yo tapo el tuyo, tú corres. Es un trato viejo, hermano. Desde el río". No lo había dicho nunca así. Duele que sea verdad.

**C — No decir nada. Beber en silencio, como enanos.**
→ `rel:{brokk:2}`, flag `bebisteConBrokk`
> No decís nada. Bebéis en la galería de piedra, dos hermanos, uno que corre y otro que tapa, mirando las runas que alguien grabó en el techo hace trescientos años. El silencio entre vosotros es viejo y cómodo. Algunas cosas no hay que decirlas. Los enanos lo saben mejor que nadie.

*Deja para después (Brokk conectado, arreglo de auditoría): lo que compartas con Brokk aquí se lee en el cap 4 (la carta sin abrir cuando te vendan: cuánto pesa depende de esto), en la final, y en el cap 7. Brokk deja de ser huérfano desde el capítulo 1. "El que tapa el hueco del que corre" es la definición del hermano, y vuelve.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4: según el polo del eje o la relación más alta.*

**[si `caja↑` domina:]**
> Primera temporada en Segunda, y has aprendido a avanzar una casilla por turno sin que te pique dentro querer correr. O casi. Durak te mira distinto: no como a un corredor, sino como a un corredor que puede aprender a no serlo, que para él es lo más alto. Brokk te hace un sitio en la esquina cada día. Es lento. Es de piedra. Es tu casa.

**[si `correr↑` domina:]**
> Los cuatro mil de la grada vienen ahora a verte a ti. Corren la voz por la montaña: hay un enano en los Cascos que corre como un elfo. No lo dicen como un halago. Durak dice cada día "aquí no se corre" y cada día lo dices tú con las piernas. Brokk tapa tu hueco sin quejarse. Alguien tiene que hacerlo. Siempre alguien.

**[si nada domina:]**
> Un año en Segunda, en un club que bajó de pie y no sabe subir de otra manera. Tú corres y ellos entran en la caja, y las dos cosas conviven, de momento, como conviven el agua y la piedra: rozándose, esperando a ver cuál gasta a cuál.

---

### Notas de diseño del capítulo

- **14 opciones** (5 escenas). ✓ (biblia 13.1)
- **Con tirada:** el partido (2). Un pelín justo de tercio; el cap 1 es de presentación, el peso de tiradas sube en cap 2+. Anotado.
- **Con riesgo:** partido B (correr). El enano tiene pocas tiradas de riesgo porque Cabeza Dura y AV9 lo hacen duro: su drama no es morir, es el eje. Coherente con la raza (biblia 5.2). Anotado que quizá falte una segunda de riesgo; entra en el cap 2 (el descenso, más violento).
- **Con requisito:** preguntar por la caja (Astucia 2), insultar la caja (Ferocidad 3). ✓ (2; sube en cap 2)
- **Opción que solo caracteriza:** beber en silencio con Brokk (5C) no da ventaja, define el vínculo. ✓
- **Eje Correr↔Caja arranca** y se construye en cada escena, sobre todo en el partido (4). ✓
- **Brokk conectado desde el cap 1** (arreglo de auditoría): tiene lecturas en las escenas 1, 4 y 5, y queda ligado al cruce del cap 4. Deja de ser huérfano. ✓
- **Voz pétrea heredada** de la build. La sentencia ancestral que es sobre ti aparece en Durak ("bajar de pie") y Dorin ("todos los que quiero están dentro"). ✓
- **Fotografía** por polo del eje. ✓
