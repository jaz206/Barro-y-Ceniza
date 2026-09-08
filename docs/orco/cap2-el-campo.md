# Barro y Ceniza — Orco
## Capítulo 2 — El campo
### *Sexta División, si hay dónde jugar*

Prosa final. Sigue la biblia y el documento de raza del orco. Heredado de `orcoguion.md`.

**Función del capítulo:** oficio. Conseguir campo, conocer a Ma Gorka, el primer partido de liga. Aquí entra el **motivo maestro** ("la pata de atrás") y arranca el **eje Deuda↔Libre**. Cinco escenas.

**Ficha:** a los diez años dejas de ser el pequeño. Pasas a la ficha de puesto (6/3/3+/4+/10+, Abrirse paso, Placar). Que crezcas es una escena, no un ajuste: ocurre en el paso del tiempo.

---

## Paso del tiempo

Pasan cinco años bajo el puente, que en un orco es hacerse entero. Creces con lo que hay: sobras de goblin, cascos robados, un río. Snotlig duerme cada vez más lejos. A los diez años eres más ancho que la puerta del puente y la banda entera, cinco goblins, te mira antes de mirarle a él.

---

## Tardes libres *(elige 2)*

*Biblia 15. Filtradas por raza: el orco SÍ puede subir FU/AV (a diferencia del halfling).*

- **Robar cascos con Snotlig, de noche, sin despertar a nadie.** → `Astucia:1, rel:{snotlig:1}`. "Aprendes a entrar y salir sin ruido. Snotlig dice que eres el orco más silencioso que ha visto. No hay otros."
- **Cazar jabalíes a mano con los goblins. En la pata de atrás.** → `stat:{FU:1}`, flag `laPataDeAtras`. "Los jabalíes caen si les das en la pata de atrás. Todo cae si le das en la pata de atrás. Lo apuntas en el estómago."
- **Comer en la cueva de Ma Gorka y escuchar quién apuesta qué.** → `Astucia:1, rel:{maGorka:1}`. "Escuchas. En la cueva de Ma Gorka se sabe quién va a perder antes de que juegue. Aprendes a leer una pared."
- **Correr detrás de los goblins hasta alcanzarlos.** → `stat:{MV:1}`. "Los goblins corren sin sentido y rápido. Tú, al final, sin sentido y más rápido. Un orco que corre: escándalo."

*`laPataDeAtras` es el flag del motivo maestro. Una vez aprendido, el texto de los partidos lo cita: das a los grandes "en la pata de atrás". Remata en Krug (cap 6). Conviene que casi todo jugador lo coja aquí.*

---

## Escena 1 — Un campo con nabos

Para jugar en Sexta hace falta un campo. El único que hay sin dueño orco es el de los Panzudos de Molino Viejo, halflings, que juegan los domingos entre nabos y comen entre partidos. Snotlig quiere robarlo de noche. Ma Gorka, la ogra de la taberna, ofrece comprarlo por ti al doscientos por ciento. Y tú, que ya tienes diez años y eres más ancho que la puerta del puente, tienes otra idea: retarles. Quien pierde, se va.

**Opciones:**

**A — Retar a los halflings. Quien pierde se va del campo.**
→ `Ambición:1`, `rel:{banda:1}`, flag `retastePorElCampo`
> Los halflings aceptan porque son halflings: creen que perder es que se acabe la comida. Snotlig dice que es una tontería. Ma Gorka apuesta contra ti. Es la primera vez que alguien apuesta sobre tu banda.

**B — Robarlo de noche, como dice Snotlig.**
→ `Astucia:1`, `rel:{snotlig:1}`, flag `robasteElCampo`
> Robáis el campo: las porterías, las líneas, los nabos. Los halflings lo descubren el domingo y lloran. Tenéis campo. Nadie apuesta por vosotros: los que apuestan no apuestan por ladrones.

**C — Pedir el oro a Ma Gorka. Al doscientos por ciento.**
→ `rel:{maGorka:2}`, flag `debesAMaGorka`
> Ma Gorka te presta. Te apunta en una pared con una uña: "El pequeño. Doscientos". Compras el campo a los halflings, que lo venden llorando y comiendo. Tienes campo y tienes deuda. La segunda crece más rápido.

*Deja para después (eje Deuda↔Libre, primera vez): `debesAMaGorka` te mete en su pared —se lee en el cap 5, cuando baja a cobrar—. `retastePorElCampo` suma Banda y hace que la afición apueste por ti. `robasteElCampo` es rápido pero "los que apuestan no apuestan por ladrones": te cierra el favor de Ma Gorka.*

---

## Escena 2 — Quien pierde se va

**Partido: Los Panzudos de Molino Viejo** *(halflings, fuerza 1, con hombre-árbol; escena condicional: solo si `retastePorElCampo`)*

Los Panzudos contra tu banda, en su campo, con todos los halflings de la comarca comiendo en la grada. Los halflings no placan: se caen solos y se levantan comiendo. Tienen un hombre-árbol, que es lo único que preocupa.

Turno ocho. Tienes la bola, cinco goblins alrededor y el hombre-árbol delante, que tarda en moverse pero cuando se mueve, se mueve.

**Opciones:**

**A — Ir de frente contra el árbol. Un orco no rodea.**
*Tirada: FU (4+, contra el árbol es más duro). Con riesgo.*
- **Éxito:** → `fama:7`, `Ferocidad:1`, gol, `rel:{banda:2}`, flag `ganasteElCampo`, `deFrente`
> Vas de frente contra un árbol. No cae, pero se echa atrás, y un árbol que se echa atrás deja un hueco. Pasas. Anotas. Los halflings lloran, comen, y se van del campo con las porterías al hombro. Es vuestro. Ma Gorka paga la apuesta con cara de guiso.
- **Fallo (riesgo):** → derrota, `rel:{snotlig:-1}`, flag `snotligRoboIgual`
> Vas de frente contra un árbol. Un árbol. Te despiertas con los halflings comiendo alrededor y el campo todavía suyo. Snotlig lo roba esa noche. Los que apuestan apuntan: "el pequeño va de frente contra árboles".

**B — Que los goblins tiren de la bola por los lados mientras tú entretienes al árbol.**
*Tirada: AG (3+). Sin riesgo.*
- **Éxito:** → `fama:6`, `Astucia:1`, gol, `rel:{banda:2}`, flag `ganasteElCampo`, `elPequeñoPiensa`
> Te pones delante del árbol y le dejas que te mire. Tarda un turno en decidir moverse. En ese turno, cinco goblins han anotado por dos sitios. Ganáis. Los halflings se van comiendo. El campo es vuestro y los que apuestan te apuntan: "el pequeño piensa".
- **Fallo:** → derrota
> Te pones delante del árbol y el árbol, sin moverse, te coge con una rama. Los goblins corren sin bola. Perdéis. Os vais del campo. Snotlig lo roba esa noche igual.

*Deja para después: `deFrente` suma al orco de la pata de atrás (va de frente y gana por fuerza). `elPequeñoPiensa` suma Astucia y el reconocimiento de que ganas pensando —lo que hará que Ma Gorka apueste por ti—. `ganasteElCampo` te da campo con nombre pendiente.*

*(Nota: si `robasteElCampo` o `debesAMaGorka`, ya tienes campo y esta escena de reto no ocurre; se salta al partido de liga con el campo conseguido de otra forma.)*

---

## Escena 3 — Ma Gorka

Ma Gorka regenta la taberna-cueva donde se apuesta todo lo que se apuesta en Sexta. Mide tres metros, es madre de todos y de nadie, presta al doscientos por ciento y no olvida un nombre. No ha apostado por ti nunca. Aún.

Te sirve un guiso que no preguntas y te dice: "Una banda sin campo es un chiste. Una banda sin oro es un chiste corto. ¿Cuánto quieres?"

**Opciones:**

**A — Nada. Da Banda no debe.** *(requiere Voluntad 2; forzable)*
→ `Voluntad:2`, `Honor:1`, flag `noDebesNada`
> Ma Gorka se ríe con toda la cueva. "Todos deben". No te apunta en la pared. Es la única banda de Sexta que no está en su pared, y eso, en Sexta, es un nombre.

**B — Lo justo para cascos de verdad. Y pagarlo con victorias.**
→ `rel:{maGorka:1}`, flag `debesLoJusto`
> Te presta. Te apunta. Los goblins estrenan cascos que no le han robado a nadie y no saben ponérselos. Ganáis dos partidos y Ma Gorka cobra el primero entero.

**C — Pedirle que apueste por Da Banda. Que se lo juegue.** *(requiere Astucia 3; forzable)*
→ `Astucia:1`, `rel:{maGorka:2}`, flag `maGorkaApuesta`
> Ma Gorka te mira largo rato. "Por el pequeño", dice, y pone cien coronas sobre la mesa contra la cueva entera. Desde ese día, los que apuestan apuestan por ti, porque Ma Gorka nunca pierde. Es una presión que pesa tres metros.

*Deja para después (eje Deuda↔Libre, el nudo): `noDebesNada` es el extremo Libre —te da nombre y desbloquea finales de independencia—. `maGorkaApuesta` es lo contrario de deber: ella se juega el oro por ti, lo que en el cap 5 hace que venga a cobrar "lo que apostó, que es más de lo que prestó". `debesLoJusto` es el punto medio.*

---

## Escena 4 — El primer partido de liga

**Partido: Los Pisapiedras de la Charca Negra** *(orcos de charca, fuerza 2; los primeros orcos "de verdad" que os miran por encima)*

Sexta División, con campo, con cascos, sin nombre: en la clasificación os llaman "Da Banda (sin nombre)". Los Pisapiedras de la Charca Negra son orcos de charca de verdad, grandes, que no han visto nunca un orco con goblins de compañeros y se ríen desde el saque.

Turno seis. Su capitán, que pesa el doble que tú, viene con la bola por el centro.

**Opciones:**

**A — Que los goblins le muerdan los tobillos y tú le entres cuando mire abajo.**
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{banda:2}`, flag `ganasteEnLiga`
> Cinco goblins le muerden los tobillos. Mira abajo. Entras. Cae, y se oye. La bola sale rodando y Snotlig la coge y corre como corren los goblins: sin sentido y rápido. Anota. Empate, y luego dos más. Ganáis. La Charca Negra se va sin reírse.
- **Fallo (riesgo):** → derrota
> Los goblins le muerden. No mira abajo: mira a ti, y te entra él primero. Te pasa por encima y anota. Cero a dos. Al acabar, los que apuestan se ríen menos que los Pisapiedras.

**B — Plantarte delante y aguantar. Que se canse.**
*Tirada: FU (4+, tu AV alta ayuda). Con riesgo bajo.*
- **Éxito:** → `fama:7`, `Ferocidad:1`, gol, flag `ganasteEnLiga`, `aguantasteDePie`
> Te plantas. Choca. Rebota. Choca. Rebota. Al tercero se cansa, que es lo que hace un orco grande: cansarse. Le quitas la bola. Anotas tú. Empate, y luego más. Ganáis. Los Pisapiedras no entienden cómo.
- **Fallo (riesgo):** → derrota, cadena de daño
> Te plantas y no rebota: te lleva por delante hasta la línea, contigo colgando. Anota. Cero a dos. Los goblins te sacan de debajo entre cinco.

*Deja para después: `ganasteEnLiga` es la primera victoria oficial —los orcos de charca dejan de reírse, primer paso hacia que Gorgomor pregunte quién eres—. `aguantasteDePie` aprovecha tu AV, la más alta del libro: el orco gana aguantando donde el halfling gana esquivando. Dos razas, dos formas de jugar (biblia 5.2).*

---

## Escena 5 — El chamán que se equivoca

Wazzok es un chamán con una seta en cada ojo que aparece en tu campo un martes y anuncia que morirás el domingo. No mueres. El domingo siguiente lo anuncia otra vez. Lleva cuatro semanas fallando y no se va: dice que Gorg le ha dicho que te siga. O Morg. Los goblins le tienen miedo. Snotlig quiere echarlo. Ma Gorka dice que un chamán que falla trae suerte, y ella nunca pierde.

**Opciones:**

**A — Quedártelo. Un chamán que falla es mejor que ninguno.**
→ `rel:{wazzok:2}`, flag `wazzokEnLaBanda`
> Se queda. Predice tu muerte cada domingo durante años. Falla cada domingo. Los goblins empiezan a creer que mientras Wazzok falle, no puedes morir. Tú también, un poco.

**B — Echarlo a bastonazos con su propio bastón.**
→ `Ferocidad:1`, flag `echasteAWazzok`
> Le echas. Se va cojeando y prediciendo. Snotlig está contento. El domingo siguiente, sin chamán, pierdes por primera vez en la liga. Es casualidad. Wazzok, desde lejos, no lo cree.

**C — Preguntarle qué ha apostado sobre ti.** *(requiere Astucia 2; forzable)*
→ `Astucia:2`, `rel:{wazzok:1}`, flag `wazzokApuesta`
> "Que llegas a Gorgomor", dice. "Contra Ma Gorka. Al doscientos". Un chamán que apuesta a que no mueres y dice cada domingo que sí. Aprendes que en Sexta todo el mundo tiene dos bocas.

*Deja para después (eje Banda entera↔Solo): `wazzokEnLaBanda` suma un miembro a la banda —Wazzok predice tu muerte todo el libro y su muerte en el cap 5 es un golpe—. `echasteAWazzok` te deja sin espía con setas. `wazzokApuesta` conecta con la profecía del cap 5 ("un elefante muerto, y tú encima"), que se cobra en el cap 6.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `maGorkaApuesta` (Ma Gorka se jugó el oro por ti):]**
> En la pared de la cueva, entre las deudas apuntadas con uña, hay una línea distinta: cien coronas de Ma Gorka contra la cueva entera, por el pequeño. Nunca ha apostado por nadie. Los goblins no lo entienden. Tú sí: una ogra de tres metros ha decidido que ganas. Ahora tienes que ganar, o la haces perder, y a Ma Gorka no se la hace perder.

**[si `noDebesNada` (rechazaste la deuda):]**
> Eres la única banda de Sexta que no está en la pared de Ma Gorka. No debes nada a nadie. Es más pobre y más lento y más tuyo. Snotlig, que lleva treinta años debiéndole, te mira como se mira algo que no se había visto: un orco sin dueño.

**[si `laPataDeAtras` y nada más destaca:]**
> Has aprendido lo único que hay que saber: todo cae si le das en la pata de atrás. Los jabalíes. Los orcos grandes. Todo. Lo apuntas donde apuntan los orcos, en el estómago, y esperas el día en que enfrente haya algo de cuatro metros.

**[si nada destaca:]**
> Tenéis campo, cascos y un nombre que todavía es un hueco en la pizarra. En Sexta, eso es tener casi todo. Casi.

---

### Notas de diseño del capítulo

- **13 opciones** (5 escenas). ✓ (biblia 13.1)
- **Con tirada:** los dos partidos (4). Más del tercio. ✓
- **Con riesgo:** partido reto A, liga A y B (2-4). ✓
- **Con requisito:** Ma Gorka nada (Voluntad 2), Ma Gorka apuesta (Astucia 3), Wazzok apuesta (Astucia 2). ✓ (3)
- **Opción que solo caracteriza:** preguntarle a Wazzok qué apostó (5C) no da ventaja de partido, define el mundo de las dos bocas. ✓
- **Motivo maestro introducido:** `laPataDeAtras` entra en las tardes libres y ya colorea los partidos. ✓
- **Ejes movidos:** Deuda↔Libre (Ma Gorka, el nudo), Banda↔Charca (reto vs robo), Banda entera (Wazzok). ✓
- **Ficha subida a puesto** en el paso del tiempo, como escena. ✓
- **Escena condicional** (el reto solo si retaste): correcto, evita incoherencia si robaste el campo.
