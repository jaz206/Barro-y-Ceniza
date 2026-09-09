# Barro y Ceniza — Enano
## Capítulo 4 — El mercado
### *Vendido a un club que corre*

Prosa final. Sigue la biblia y el documento de raza del enano. **Es el cruce del libro** (biblia 18.2, modelo híbrido): te venden a un club humano que corre, pruebas la libertad, y decides volver a la caja o quedarte fuera. No pregunta qué jugada haces: pregunta qué precio pagas. Cinco escenas.

**Función del capítulo:** la encrucijada. Fuera de la montaña por primera vez. El eje Correr↔Caja, acumulado tres capítulos, se cobra en una decisión: `laLlamada`.

---

## Escena 1 — Los Grifos de Norburgo

Los Grifos de Norburgo son humanos, juegan en Tercera y corren. Todos. El entrenador, Ansel Vogt, cuarenta años, no ha visto una caja en su vida y te recibe con un balón en la mano: "Nos han dicho que eres el único enano que corre. Aquí corre hasta el apotecario". El vestuario tiene ventanas —ventanas, en un vestuario— y huele a sudor de humano, que es distinto, más rápido, menos a piedra.

*[si `cláusulaDeVuelta`:]* En tu contrato hay una cláusula de vuelta que Durak consiguió peleando. Los Grifos no saben que la tienen.

Te dan el balón en el primer entrenamiento. Nadie te grita "aquí no se corre". Nadie te manda a una esquina. Es aterrador cuánto lo echabas de menos y cuánto lo temías.

**Opciones:**

**A — Correr con ellos. Por fin, sin culpa.** *(correr)*
→ `rel:{aficion:2}`, `Ambición:1`, `correr↑↑`, flag `corristeConHumanos`, `probasteLaLibertad`
> Corres. Y por primera vez en tu vida nadie frunce el ceño. Los humanos te pasan el balón, te aplauden, te siguen. Corres cincuenta metros y anotas y el vestuario con ventanas ruge, y por un momento eres solo un corredor, no un hereje. Es la sensación más limpia que has tenido. Y en el fondo, muy en el fondo, la echas de menos a ella: la esquina, el hueco, la voz de Durak. No lo dices. Corres más rápido para no pensarlo.

**B — Intentar montar la caja con humanos. Enseñarles lo tuyo.** *(caja)*
→ `Astucia:1`, `rel:{durak:1}`, `caja↑`, flag `cajaHumana`, `enseñasteLaCaja`
> Intentas montar una caja con humanos. Es un desastre: los humanos no tienen la paciencia, se aburren en la segunda casilla, se ríen de avanzar despacio. Vogt lo llama "la cosa enana" y la usa de broma. Pero tú, montándola, entiendes de golpe lo que Durak lleva diciéndote tres temporadas: la caja no es lenta porque los enanos sean lentos. Es lenta porque protege. Y estos humanos no protegen a nadie. Corren solos, y solos se rompen.

**C — Jugar como te pongan. Ver qué eres fuera de la montaña.**
→ `Voluntad:1`, flag `teDejasteLlevar`
> No fuerzas nada. Dejas que Vogt te ponga donde quiera y observas qué eres fuera de Baraz-Ankor. Descubres que eres rápido, sí, pero que sin la caja detrás te sientes desnudo, como quien camina sin la montaña a la espalda. Un enano lejos de la piedra es un enano que no sabía cuánta piedra llevaba dentro.

*Deja para después: `corristeConHumanos` te da la vida de correr libre (se lee en el partido, escena 2, y en `laLlamada`). `cajaHumana`/`enseñasteLaCaja` es el giro clave: fuera de la caja entiendes por fin para qué era. Esa comprensión pesa en `laLlamada` y en tu vuelta como capitán.*

---

## Escena 2 — Lo que pasa fuera

**Partido: Los Toros Rojos de Norburgo** *(humanos grandes y lentos, fuerza 3; el otro equipo de la ciudad)*

Los Toros Rojos son el otro equipo de Norburgo: humanos grandes, lentos, que pegan. Contra los Grifos, que corren, juegan a esperar y a partir.

*[si `corristeConHumanos`:]* Vogt te pone en la banda con el balón, sin nadie delante ni detrás. Libertad total. Nadie te cubre. Nadie te grita.
*[si `cajaHumana`:]* Vogt monta "la cosa enana" en el turno ocho, medio en broma, y los Toros se ríen de ver a humanos intentando ser tortugas.

Turno cuatro. Tienes el balón, corres por la banda, y por primera vez en tu vida no hay una caja detrás de ti. Solo tú y el espacio abierto. Y un Toro Rojo de ciento treinta kilos que ha visto dónde vas.

**A — Correr por la banda, libre, sin mirar atrás.** *(correr)*
*Tirada: AG (4+). Con riesgo alto (nadie te cubre).*
- **Éxito:** → `fama:14`, `rel:{aficion:3}`, `correr↑`, gol, flag `corristeLibre`
> Corres por la banda como no has corrido nunca, sin una esquina que proteger, sin un hueco que dejar, solo velocidad y línea de fondo. Cruzas. El vestuario con ventanas se vuelve loco. Es la carrera más pura de tu vida, y no hay nadie a quien hayas dejado atrás pagando por ella. Por una tarde, entiendes lo que sería haber nacido elfo. Es ligero. Es solo. Las dos cosas.
- **Fallo (riesgo):** → cadena de daño (sin caja, sin cobertura), `rodillaDeNorburgo`
> Corres libre, y el Toro Rojo, lento pero enorme, te espera en la banda y te parte la rodilla contra la valla. No hay caja que te cubra. No hay Brokk tapando. Aprendes, tirado en el barro de Norburgo, lo que Durak nunca supo explicarte: la caja no te frenaba. Te protegía. Y ahora estás solo, y roto, y libre.

**B — Buscar cobertura aunque no la haya. Jugar como enano.** *(caja)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:8`, `Astucia:1`, `caja↑`, gol, flag `jugasteComoEnano`
> Buscas cobertura por instinto, aunque no haya caja, y encuentras a un liniero humano al que colocas —a gritos— en una esquina imaginaria. Cruzáis los dos, protegidos por una caja de dos, la más pequeña de la historia. Vogt no lo entiende. Tú sí. Llevas la montaña dentro aunque estés a cien leguas de ella.

*Deja para después: `corristeLibre` es la cima de la vida-Grifos —se lee en `laLlamada` como lo que dejarías—. `rodillaDeNorburgo` es la lección física del eje: correr sin caja te rompe, y se lee en la carta de Brokk (escena 3) y en el cap 7. `jugasteComoEnano` demuestra que la caja es identidad, no lugar.*

---

## Escena 3 — La carta de Brokk

*Escena de relación. Brokk, el hermano, que la auditoría marcó huérfano, tiene aquí su lectura más fuerte.*

Llega una carta de Baraz-Ankor con la letra apretada de Brokk, que escribe como tapa huecos: sin espacio de sobra.

*[si `rodillaDeNorburgo`:]* Dice que los Yunques vieron en la Cristalvisión cómo te rompían la rodilla sin caja, y que el vestuario entero se puso de pie, y que él tuvo que salir de la galería para que no le vieran la cara.
*[si `corristeLibre`:]* Dice que te vieron correr sin caja en la Cristalvisión, y que el vestuario entero se puso en pie, y que él no supo si era de orgullo o de vergüenza, y que sigue sin saberlo.

Dice que Dorin ha vuelto a jugar, con la cadera rota, porque no hay corredor. Dice que los Cascos van últimos. Y al final, con otra tinta, apretada en el margen: "Vuelve. Corre allí donde te cubran".

**Opciones:**

**A — Contestarle. Contárselo todo: el miedo, la libertad, el hueco que sientes.**
→ `rel:{brokk:3}`, `Honor:2`, flag `contestasteABrokk`, `cartaADurak`
> Le escribes la carta más larga de tu vida, que para un enano son diez líneas. Le cuentas que correr libre es limpio y que estar sin la montaña pesa, las dos cosas, y que no sabes cuál gana. Le pides que le diga a Durak que la cláusula, si existe, que la guarde. Brokk enseña tu carta a Durak. Es lo que activa la llamada de vuelta (escena 5).

**B — No contestar. Guardar la carta sin abrir del todo.** *(correr, frío)*
→ `rel:{brokk:-1}`, `correr↑`, flag `noContestasteABrokk`
> Lees la carta y no contestas. Correr libre es demasiado nuevo, demasiado tuyo, para dejar que la montaña tire de ti otra vez. Guardas la carta en el catre, medio abierta, y cada noche la ves y no la terminas. Brokk, en Baraz-Ankor, tapa el hueco de un corredor que ya no está, y espera una respuesta que no llega. Sigue tapando. Siempre alguien.

**C — Mandarle dinero, no palabras. Que arreglen la mina.**
→ `oro`, `rel:{brokk:1, club:1}`, flag `mandasteOro`
> No sabes contestar con palabras, así que contestas con oro: mandas la mitad de tu sueldo de Grifo a Baraz-Ankor, para la mina, para Dorin, para lo que haga falta. Brokk lo reparte y no dice de quién viene, porque sabe que no querrías. Es la forma enana de decir "os quiero": pagando la factura de otro sin firmar.

*Deja para después (Brokk conectado): `contestasteABrokk`/`cartaADurak` activa la cláusula de vuelta en `laLlamada`. `noContestasteABrokk` la enfría y hace más probable quedarte. La carta sin abrir sobre el catre aparece en `laLlamada` como imagen. Brokk tiene aquí su tercera y mayor lectura: deja de ser huérfano del todo.*

---

## Escena 4 — Contra los tuyos

**Partido: Los Cascos de Hierro de Baraz-Ankor** *(tu propio club, fuerza 2; juegas contra ellos con la camiseta de los Grifos)*

Los Grifos juegan contra los Cascos de Hierro en Baraz-Ankor, en el estadio de piedra, con sesenta mil asientos y cuatro mil enanos que no saben si silbarte o corearte. Vogt te pone de titular "porque los conoces". Los conoces. Ves la caja formarse enfrente, con Dorin dentro cojeando —ha vuelto por ti, porque no hay corredor— y Grimnir suelto mirándote, y sabes dónde va a estar cada bota antes que ellos.

*[si `jovenesCorren`:]* Nain y Skalf están en las esquinas de la caja. Te miran como se mira a un desertor que fue tu maestro.

**A — Ganarles. Usar todo lo que sabes de la caja contra la caja.** *(correr, frío)*
*Tirada: AG (4+, sabes dónde va cada bota: +1). Con riesgo.*
- **Éxito:** → `fama:12`, `rel:{durak:-2, brokk:-2, club:-3}`, `correr↑`, gol, flag `ganasteALosTuyos`, `traicionasteLaCaja`
> Sabes dónde se abre la caja porque tú la estudiaste, así que la rompes desde fuera, con el conocimiento de dentro. Anotas contra Dorin, contra Brokk, contra los cuatro mil apellidos de piedra. Ganáis. Y en el silencio de sesenta mil asientos —de los cuales cuatro mil te querían— entiendes lo que has hecho: usar el amor de tu gente como un mapa para vencerlos. Vogt te felicita. Es la peor felicitación de tu vida.
- **Fallo (riesgo):** → derrota, cadena de daño
> Vas a por ellos con todo lo que sabes, y la caja, dirigida por Dorin cojo y terco, aguanta, porque una caja defendida por gente que se quiere aguanta más que cualquier conocimiento. Pierdes contra los tuyos, vestido de otro color. Es una derrota que se siente como volver a casa.

**B — Dejarte ganar. No puedes hacerle esto a los tuyos.** *(caja)*
→ `rel:{durak:2, brokk:3, club:2, aficion:2}`, `caja↑`, flag `teDejasteCaer`, `noTraicionaste`
> Podrías ganarles. Sabes cómo. Y no lo haces. Fallas a propósito, dejas huecos que sabes tapar, corres despacio donde correrías rápido. Los Cascos ganan en su piedra. Vogt te grita desde la banda que qué haces. Lo que haces es negarte a usar a tu gente como mapa. Pierdes el partido y ganas lo único que no estaba en venta. La grada de piedra, que lo ha visto todo porque la piedra lo ve todo, se pone de pie por ti. Cuatro mil nombres.

*Deja para después: `ganasteALosTuyos`/`traicionasteLaCaja` es la vía fría de la rama Correr —pesa muchísimo en el cap 7—. `teDejasteCaer` activa la petición de la grada (cuatro mil nombres) en `laLlamada`, y es de las decisiones más nobles del libro. Ninguna es "correcta": ganar es traición, dejarse caer es mentira deportiva.*

---

## Escena 5 — La llamada

*El cruce. La decisión que define el resto del libro.*

*[si `durakLucho` o `cartaADurak`:]* Hargrim ejerce la cláusula de recompra que Durak peleó. Los Cascos pueden traerte de vuelta.
*[si no:]* Hargrim llama sin cláusula, suplicando. Los Cascos van últimos y el oro de tu venta se ha ido en el apotecario de Dorin. No tienen con qué obligarte. Solo con qué pedírtelo.

Quiere que vuelvas. Vogt te ofrece renovar por el doble: "Aquí eres alguien. Allí eres el que corre". Sobre el catre hay una carta de Brokk sin abrir.

*[si `teDejasteCaer`:]* La grada de Baraz-Ankor ha mandado una petición con cuatro mil nombres, uno por asiento ocupado. Los has leído todos. El tuyo, de crío, está tachado y vuelto a escribir.

**Opciones:**

**A — Volver a los Cascos. A la caja, a Brokk, a la montaña.** *(caja — rama A)*
→ `rel:{durak:3, brokk:3, club:3}`, `caja↑↑`, flag `volviste`, `elegisteLaCaja`
> Abres la carta de Brokk. Dice una sola línea: "El hueco sigue aquí. Nadie lo tapa como tú". Vuelves. Dejas el vestuario con ventanas, el aplauso fácil, la libertad de correr sin culpa, y subes a la montaña, a que te griten "aquí no se corre", a una esquina, a un hermano. Vogt no lo entiende: "Vuelves a que te aten". "Vuelvo a que me cubran", dices. No es lo mismo. Tardaste una vida en aprender la diferencia.

**B — Quedarte con los Grifos. Correr libre. Ser, por fin, tú.** *(correr — rama B)*
→ `oro`, `rel:{aficion:2, durak:-2, brokk:-2}`, `correr↑↑`, flag `teQuedaste`, `elegisteCorrer`
> No abres la carta. La dejas cerrada sobre el catre, porque sabes que si la lees, vuelves, y no quieres volver. Renuevas con los Grifos por el doble. Corres libre el resto de tu carrera, sin caja, sin culpa, sin nadie gritándote qué no se hace. Eres lo que quisiste ser desde el primer día en la piedra. Y algunas noches, muchas, piensas en un hueco en una esquina que ahora tapa otro peor que Brokk, y en una carta que nunca abriste, y en que la libertad, resulta, también tiene un precio. Lo pagas. Corriendo.

**C — Pedir tiempo. Volver a leer los cuatro mil nombres.** *(requiere `teDejasteCaer`; no cierra: relee y vuelve a A o B)*
→ `Voluntad:1`, `rel:{aficion:1}`. *No cierra el cruce.*
> Lees otra vez los cuatro mil nombres, despacio, apellido por apellido, familias que llevan trescientos años en el mismo asiento de piedra viéndote crecer. Al llegar al tuyo, tachado y reescrito, ya sabes lo que vas a hacer, aunque tardes en decirlo. Algunas decisiones se toman leyendo nombres.

*Deja para después (gobierna todo el resto del libro): `volviste`/`elegisteLaCaja` abre la rama A (cap 5 "El regreso": vuelves de capitán). `teQuedaste`/`elegisteCorrer` abre la rama B (te quedas fuera; el cap 5-6 se juega con los Grifos, y la final puede ser contra los propios Cascos). La carta de Brokk se cobra aquí: abrirla o no es la imagen del cruce. Sin castigo moral (biblia 18.4): quedarte con los Grifos gana más y te hace libre; lo que descubres es que la libertad sin los tuyos también pesa.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4. Aquí es la rama.*

**[si `volviste`:]**
> Subes la montaña de vuelta con una bolsa al hombro y una carta de una línea en el bolsillo. Abajo queda el vestuario con ventanas, el aplauso fácil, la carrera limpia. Arriba te espera una esquina, una caja, un hermano y un viejo que te va a gritar "aquí no se corre" mañana por la mañana, y lo vas a oír como se oye una canción de cuna. Volviste a que te cubran. Es lo más valiente y lo más tonto que ha hecho un corredor.

**[si `teQuedaste`:]**
> Renuevas con los Grifos y guardas la carta de Brokk sin abrir en el fondo del catre, donde no la veas cada noche, aunque la veas igual. Eres libre. Corres donde te aplauden. No hay caja, no hay esquina, no hay montaña a la espalda. Tienes todo lo que fuiste a buscar el primer día. Y a veces, corriendo por una banda sin nadie detrás, sientes el frío de no tener a nadie detrás, y corres más rápido, que es lo único que sabes hacer con el frío.

**[si pediste tiempo y volviste:]**
> Tardaste cuatro mil nombres en decir en voz alta lo que ya sabías. Vogt se quedó con un corredor menos y sin entender por qué alguien deja el aplauso por una esquina. Que no lo entienda. Tú tienes una montaña, que es más difícil de tener que un vestuario con ventanas.

---

### Notas de diseño del capítulo

- **13 opciones** (5 escenas). ✓
- **Con tirada:** los dos partidos (fuera de la caja, contra los tuyos). ✓
- **Con riesgo:** correr libre (grave, sin cobertura), contra los tuyos A (2-4). ✓
- **Con requisito:** pedir tiempo (flag `teDejasteCaer`). Pocos requisitos porque el peso está en la decisión. ✓
- **Opción que solo caracteriza:** mandar oro a Brokk (3C) es puro vínculo enano ("te quiero pagando tu factura"). ✓
- **El cruce cumple biblia 18.2:** compañeros distintos (Vogt/humanos vs Durak/caja), tensión distinta (libertad sin cobertura), escenas propias (fuera de la caja, contra los tuyos, la llamada), tono distinto (ventanas vs piedra), final propio (rama A/B). ✓
- **Brokk cobrado** (arreglo de auditoría): la carta es su lectura mayor; abrirla o no es el símbolo del cruce. ✓
- **Sin castigo moral** (18.4): la rama Correr gana más y es libre. ✓
- **Fotografía** por rama. ✓
