# Barro y Ceniza — Enano
## Capítulo 3 — El motín
### *Tercera División, un vestuario partido*

Prosa final. Sigue la biblia y el documento de raza del enano. Heredado de la build.

**Función del capítulo:** el vestuario se parte entre los jóvenes que quieren correr y los viejos de la caja, contigo en medio. Durak, por primera vez en la historia del club, se plantea cambiar. El eje Correr↔Caja deja de ser tuyo y se vuelve el conflicto de todo el equipo. Y al final se siembra la venta del cap 4. Cinco escenas.

**Sub-eje del capítulo: Tradición↔Cambio.** Los jóvenes (Nain, Skalf, Thrain) empujan hacia correr; los viejos hacia la caja. Tú decides si lideras el cambio, lo frenas, o lo traicionas.

---

## Escena 1 — Los que quieren correr

*[si `bajasteisATercera`:]* Tercera División. Los Cascos de Hierro, trescientos años de historia, juegan contra equipos halfling y campos con vacas. La vergüenza tiene sabor a mina cerrada.
*[si no:]* Segunda otra vez, por los pelos, con el vestuario más viejo del mundo un año más viejo.

Han fichado a tres enanos jóvenes que crecieron viéndote correr en la Cristalvisión: Nain y Skalf, linieros, y Thrain, un blitzer de treinta años sin barba entera. Te buscan en el cuartel de piedra una noche. Quieren jugar como tú. Quieren que la caja se abra. Te miran como los cuatro mil de la grada, pero de cerca, y eso pesa más.

**Opciones:**

**A — Enseñarles a correr. Serás el que cambió el club.** *(correr)*
→ `rel:{aficion:2}`, `Ambición:1`, `correr↑`, flag `jovenesCorren`, `lideresteElCambio`
> Los entrenas de noche, a escondidas de Durak, el cruce de Faelas y las carreras por la banda. Aprenden rápido: son jóvenes y te adoran. Por primera vez en trescientos años, hay enanos en Baraz-Ankor que corren de verdad. Eres su bandera. También eres, para los viejos, el que les está robando a los hijos.

**B — Decirles que entren en la caja. Es lo que se hace.** *(caja)*
→ `rel:{durak:2, brokk:1}`, `caja↑`, flag `jovenesEnCaja`, `frenasteElCambio`
> "Entrad en la caja", les dices. "Yo corro porque nací roto para esto. Vosotros no tenéis que romperos igual". Nain no lo entiende: te ha visto correr toda su vida y ahora le dices que no. "Entonces, ¿por qué corres tú?", pregunta. No sabes contestar. Entran en la caja. Callados.

**C — Decirles que decidan ellos, pero avisar a Durak de que hay motín.** *(traición, frío)*
→ `rel:{durak:1, aficion:-2}`, `correr↑`, flag `jovenesDelatados`, `delatasteALosJovenes`
> Les dices que hagan lo que quieran, y luego, esa noche, le cuentas a Durak que los jóvenes quieren romper la caja. Crees que haces bien: el club primero. Los jóvenes se enteran de quién habló. Desde entonces te miran como al que los vendió, y no se equivocan, y lo peor es que corren igual, pero ahora solos y contra ti.

*Deja para después (sub-eje Tradición↔Cambio): `jovenesCorren` te hace líder del cambio —los jóvenes ejecutan el cruce en el partido del motín (escena 3)—. `jovenesEnCaja` los devuelve a la tradición y su pregunta "¿por qué corres tú?" se lee en el cap 7. `delatasteALosJovenes` es la vía fría: ganas a Durak, pierdes a la grada y a los jóvenes, y pesa en la final.*

---

## Escena 2 — La pizarra de Durak

Durak Ojoferro te llama a su cuarto, que es una cueva con una pizarra y ochenta años de tiza acumulada. En la pizarra está la caja, dibujada mil veces sobre sí misma. Y al lado, con otra tiza más fina, hay algo nuevo: algo que parece el cruce de Faelas, copiado de lejos, torpe, de viejo que intenta entender lo que odia.

"Los elfos aprendieron a no chocar", dice Durak. "Yo tengo ochenta años para aprender lo contrario, y no los tengo". Te ofrece la tiza. Es la primera vez en la historia del club que la tiza cambia de mano antes de que el dueño muera.

**Opciones:**

**A — Coger la tiza. Dibujar la caja que se abre.**
→ `rel:{durak:3, club:2}`, `Astucia:1`, flag `cogisteLaTiza`, `cajaQueSeAbre`, `volvisteConTiza`
> Coges la tiza de ochenta años. Y no borras la caja: le dibujas una puerta. Una caja que se abre en el turno ocho para dejar correr al corredor, y se cierra detrás. Ni la caja pura de Durak ni el caos de los elfos: las dos cosas. Durak la mira largo rato. "Esto no es correr", dice, despacio. "Esto es la caja, con una idea dentro". Es lo más cerca que estará de decir que tenías razón.

**B — Coger la tiza y borrar la caja entera. Empezar de cero.** *(correr)*
→ `rel:{durak:-2, aficion:2}`, `correr↑↑`, flag `borrasteLaCaja`, `cajaRota`
> Borras trescientos años de tiza de un manotazo y dibujas el juego de correr: sin caja, sin casillas, todos corriendo. Durak mira la pizarra vacía donde estuvo la caja de sus maestros y de los maestros de sus maestros, y algo se le rompe en la cara. "Puede que ganes más", dice. "Pero eso ya no son los Cascos de Hierro. Es otro club con nuestro nombre". Coge su capa y se va. No vuelve a la cueva de la pizarra.

**C — No coger la tiza. La caja es de Durak.** *(caja)*
→ `rel:{durak:2, brokk:1}`, `caja↑`, flag `rechazasteLaTiza`
> "La tiza es tuya", le dices. "Ochenta años son ochenta años. Yo corro, pero no dibujo". Durak asiente, aliviado de un modo que no admitirá. Vuelve a dibujar la caja de siempre. Pero esa noche, solo, añade la puertecita del turno ocho en una esquina, muy pequeña, para él. La has cambiado sin coger la tiza.

*Deja para después (arreglo de auditoría — `volvisteConTiza`): `cogisteLaTiza`/`volvisteConTiza` es enorme: heredas el arte de la caja y lo modernizas, base de tu vuelta como capitán (cap 5) y de la caja-con-puerta que dibujas de viejo (cap 7). `borrasteLaCaja` te da el club moderno pero mata algo en Durak, que se lee en el cap 4 (si te vende, cómo lo hace) y su muerte (cap 7).*

---

## Escena 3 — El partido del motín

**Partido: Los Segadores de Kleinfeld** *(humanos rápidos, fuerza 2)*

Contra los Segadores, humanos rápidos que en Tercera pasan por buenos. En el turno cinco, Durak grita la casilla siguiente y Nain, el joven, no entra en la caja: se queda en la banda, mirándote. Skalf tampoco entra. La caja tiene dos agujeros y once enanos esperando a ver qué haces tú, el corredor, el que empezó todo esto.

*[si `jovenesCorren`:]* Saben el cruce. Lo entrenaron contigo. Esperan tu señal.
*[si `jovenesDelatados`:]* Te miran como al que los delató, y esperan igual, porque no tienen a nadie más.
*[si `jovenesEnCaja`:]* Han vuelto a la caja, pero hoy dudan, porque te ven a ti en el centro y saben que tú correrías.

**A — Dar la señal. Que los jóvenes corran el cruce contigo.** *(correr; requiere `jovenesCorren`)*
*Tirada: AG (4+). Con riesgo. Esprintar repite.*
- **Éxito:** → `fama:12`, `rel:{aficion:3, durak:-2}`, `correr↑↑`, gol, flag `motinTriunfa`, `cajaRota`
> Das la señal. Nain y Skalf corren el cruce, tú por el medio, y el balón vuela por fuera de la caja como Faelas te enseñó, pero ejecutado por enanos, que nadie espera. Cruzáis tres veces en cuatro turnos. Es el fútbol más rápido que ha visto Baraz-Ankor, y lo hacen sus hijos. Durak, en la banda, no dice "aquí no se corre". Se ha quedado sin decirlo por primera vez en tres temporadas. Ganáis. Habéis cambiado el club. Para siempre, o hasta que alguien deje un hueco.
- **Fallo (riesgo):** → derrota, `rel:{durak:-3}`, `motinFallido`
> Das la señal, los jóvenes corren, y contra unos humanos cualquiera el cruce falla porque aún son verdes y tú vas viejo. Perdéis en Tercera contra los Segadores. Durak recoge su pizarra. El motín ha muerto en el barro, y los jóvenes que arrastraste a él te miran desde el suelo.

**B — Meterte tú en la caja y tapar los huecos. Salvar a Durak.** *(caja)*
*Tirada: FU (4+). Sin riesgo.*
- **Éxito:** → `fama:8`, `rel:{durak:3, brokk:2}`, `caja↑`, gol, flag `cerrasteElMotin`, `salvasteLaCaja`
> Entras en la caja y tapas los dos huecos que dejaron los jóvenes, corriendo de esquina a esquina para estar en dos sitios, que es lo que un corredor puede dar a una caja sin romperla. La caja aguanta. Avanza. Cruza. Ganáis a la manera vieja, y los jóvenes aprenden que un motín sin el corredor no es nada. Durak te pone la mano en el hombro, que en él es una condecoración. Has salvado la caja siendo el que corre.

*Deja para después: `motinTriunfa` cambia el club a correr y desbloquea la Copa de las Cuevas (escena 4) jugada abierta. `cerrasteElMotin` mantiene la caja y a Durak. Los dos ganan el partido; lo que cambia es en qué club juegas el resto del libro.*

---

## Escena 4 — La Copa de las Cuevas

*Escena condicional: solo si ganaste el partido del motín (escena 3).*

**Partido: Los Yunques de Baraz Kadrin** *(enanos puros, fuerza 3; con Brokk... no, con tu antiguo club rival)*

La Copa de las Cuevas es el único torneo que un club de Tercera puede ganar. La final es contra los Yunques de Baraz Kadrin, enanos puros, la caja más cerrada de la montaña.

*[si `motinTriunfa` (corriste):]* Los Yunques saben que la caja de los Cascos se abre. Han venido a esperarte fuera de la caja, donde corres.
*[si `cerrasteElMotin` (caja):]* Los Yunques saben que la caja de los Cascos ha vuelto a cerrarse, y traen la suya, más vieja y más terca. Es caja contra caja: paciencia contra paciencia.

**A — [correr] Ganarles por fuera, donde su caja no llega.** *(requiere `motinTriunfa`)*
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:15`, `rel:{aficion:3}`, gol, flag `ganasteLaCopa`, `copaCorriendo`
> Los Yunques cierran su caja perfecta y esperan, como se ha esperado tres siglos. Pero tú no vas hacia la caja: vas por fuera, con Nain y Skalf cruzando, y les anotáis donde una caja no puede defender: en el aire, en la carrera, en la velocidad. Ganáis la Copa de las Cuevas corriendo. Es de latón, pequeña, y para un club que bajó a Tercera vale como el oro.
- **Fallo (riesgo):** → derrota

**B — [caja] Ganarles a su propio juego. La caja más terca gana.** *(requiere `cerrasteElMotin`)*
*Tirada: FU (5+). Con riesgo bajo.*
- **Éxito:** → `fama:14`, `rel:{durak:3, club:2}`, gol, flag `ganasteLaCopa`, `copaEnCaja`
> Dos cajas de enanos, avanzando una casilla por turno la una hacia la otra, durante ocho turnos, sin que nadie corra, sin que nadie salte, mientras la grada de piedra contiene la respiración. Al final, la vuestra avanza una casilla más que la suya, porque tú, desde el centro, tapaste el único hueco que se abrió. Ganáis la Copa aburriendo a los Yunques hasta la extenuación. Es la victoria más enana que existe. Durak llora, aunque diga que es el polvo de tiza.

*Deja para después: `ganasteLaCopa` es la primera cosa que ganáis desde el descenso, se lee en el cap 5 (vuelves con un título) y cap 7. `copaCorriendo`/`copaEnCaja` marcan con qué identidad ganaste.*

---

## Escena 5 — Lo que Durak decide

Fin de temporada. Durak te llama a la cueva de la pizarra.

*[si `borrasteLaCaja`:]* La caja sigue borrada. No la ha vuelto a dibujar. La pizarra está vacía y da frío mirarla.
*[si `cajaQueSeAbre`:]* Tu dibujo sigue en la pizarra: la caja con la puerta del turno ocho. La ha dejado ahí. La estudia de noche.
*[si no:]* La caja sigue en la pizarra, como siempre, como hace ochenta años.

"Hargrim quiere venderte", dice, sin rodeos, porque los enanos no rodean. "Un club humano de Norburgo, los Grifos, paga por ti lo que vale un liniero de Primera. Los Cascos necesitan el oro para no cerrar la mina". Te mira ochenta años. "Yo no quiero. Pero no mando en el oro. Nunca se manda en el oro".

**Opciones:**

**A — Pelear por quedarte. Que Durak ponga una cláusula de vuelta.**
→ `rel:{durak:3, brokk:2}`, `Honor:1`, flag `durakLucho`, `cláusulaDeVuelta`
> "Que me vendan", dices, "pero con una cláusula: los Cascos pueden recomprarme cuando quieran". Durak pelea esa cláusula con Hargrim como no ha peleado nada en veinte años, y la consigue. "Vuelve cuando puedas", dice. "La caja te va a esperar. Yo no sé si estaré". Es una promesa y una despedida en la misma frase.

**B — Aceptar la venta sin condiciones. Ir a correr libre.** *(correr)*
→ `oro`, `rel:{durak:-1, aficion:1}`, `correr↑`, flag `aceptasteLaVenta`, `sinCláusula`
> Aceptas. Sin cláusula, sin vuelta. Vas a Norburgo a correr donde te aplaudan, sin Durak gritándote, sin caja, sin esquina de hermano. Es lo que querías desde el primer día. Durak firma los papeles despacio. "Ve", dice. "Corre. A ver si allí encuentras lo que aquí no te dejábamos buscar". No suena a rencor. Suena a que sabe algo que tú no.

**C — Escribirle una carta a Brokk antes de irte, la primera.** *(requiere no haber roto con Brokk)*
→ `rel:{brokk:3}`, `Honor:1`, flag `cartaABrokk`
> Antes de que te vendan, le dejas a Brokk una carta en la esquina de la caja donde lleva veinte años. No sabes escribir sentimientos —los enanos no—, así que escribes: "Tú tapabas mi hueco. Ahora no habrá hueco que tapar. Cuídate la espalda tú, por una vez". Brokk no la abrirá delante de ti. Se la lleva a la galería. Esa carta vuelve en el cap 4.

*Deja para después (siembra del cruce del cap 4): `durakLucho`/`cláusulaDeVuelta` te da la opción de volver en `laLlamada` (cap 4). `sinCláusula` la cierra: si te vas sin cláusula, volver será mucho más difícil. `cartaABrokk` es la lectura de Brokk que la auditoría pedía: se lee en el cap 4 (la carta sin abrir) y en el cap 7.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `motinTriunfa` o `borrasteLaCaja` (el cambio ganó):]**
> Has cambiado un club de trescientos años. Los jóvenes corren, la caja se abre, la grada ruge como no rugía desde antes de tu abuelo. Y Durak, que te ofreció la tiza, mira la pizarra donde ya no está la caja de sus maestros. Ganaste. Cambiaste las cosas. Solo el tiempo dirá si las mejoraste o solo las rompiste. En la montaña, el tiempo tiene mucho que decir.

**[si `cerrasteElMotin` o `cogisteLaTiza` (la caja aguantó, mejorada):]**
> No rompiste la caja: le pusiste una puerta. Los jóvenes aprendieron que correr sin caja es morir, y la caja aprendió que sin correr no se sube. Durak dibujó tu puertecita en la esquina de la pizarra, muy pequeña, para él. Has hecho lo más difícil que hay en la montaña: cambiar algo sin traicionarlo. Y ahora te venden.

**[si nada domina:]**
> Un motín, una copa de latón, y una venta a un club humano que corre. Tercera División te lo ha dado y te lo ha quitado todo en una temporada. Te vas de la montaña con una cláusula de vuelta o sin ella, con una carta escrita o sin escribir. Detrás dejas una caja, un hermano en su esquina, y un viejo con una tiza que ya no sabe qué dibujar.

---

### Notas de diseño del capítulo

- **13 opciones** (5 escenas, una condicional). ✓
- **Con tirada:** motín (2), Copa (2). ✓ del tercio.
- **Con riesgo:** motín A, Copa A/B (2-4). ✓
- **Con requisito:** los del partido y la Copa (flags), carta a Brokk (relación). ✓
- **Opción que solo caracteriza:** escribir a Brokk (5C) no da ventaja de partido; es puro vínculo. ✓
- **Sub-eje Tradición↔Cambio** desarrollado con los jóvenes. **Eje Correr↔Caja** en la tiza (escena 2), la decisión más simbólica: coger la tiza y ponerle puerta a la caja es el corazón del libro. ✓
- **`volvisteConTiza` conectado** (arreglo de auditoría): heredas y modernizas la caja. ✓
- **Cruce del cap 4 sembrado:** la venta, la cláusula, la carta de Brokk. ✓
- **Escena condicional** (Copa solo si ganaste el motín): evita incoherencia. ✓
- **Fotografía** por resultado del motín. ✓
