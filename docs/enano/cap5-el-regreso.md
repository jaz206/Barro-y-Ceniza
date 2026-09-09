# Barro y Ceniza — Enano
## Capítulo 5 — El regreso
### *Capitán de los Cascos*

Prosa final. Sigue la biblia y el documento de raza del enano. Heredado de la build.

**Función del capítulo:** consecuencia. Ramifica según el cruce del cap 4:
- **Rama A (`volviste`):** vuelves de capitán, heredas el brazalete de Dorin, diriges la caja. Es el capítulo escrito en detalle abajo.
- **Rama B (`teQuedaste`):** sigues con los Grifos, corriendo libre, subiendo con ellos. Versión condensada al final; la final del cap 6 será contra los propios Cascos.

Aquí muere Dorin en el campo, Grimnir encuentra su troll, y el ascenso a Primera contra Faelas. Cuatro escenas (rama A).

---

# RAMA A — El regreso *(si `volviste`)*

## A1 — El brazalete

Dorin Yunquefirme te espera en el vestuario de piedra con el brazalete de capitán en la mano. Tiene ciento setenta y cuatro años, la cadera de hierro que le puso el apotecario, y una voz que ya no llega a la esquina de la caja.

"No puedo gritar las casillas", dice. "Tú sabes dónde van".

*[si `traicionasteLaCaja` (ganaste a los tuyos con los Grifos):]* Sabe lo del turno ocho en Baraz-Ankor, cuando los venciste usando lo que te enseñó. Te da el brazalete igual. Eso es Dorin.
*[si `teDejasteCaer` (te dejaste ganar):]* Sabe lo del turno uno, cuando pudiste ganarles y no quisiste. Por eso te da el brazalete a ti y no a otro.

**Opciones:**

**A — Coger el brazalete. Dirigir la caja que aprendiste a querer.**
→ `rel:{dorin:3, durak:2, club:3}`, `caja↑`, flag `eresCapitan`, `capitan`
> Coges el brazalete de ciento setenta y cuatro años. Pesa como pesa una montaña pequeña. Dorin te enseña lo último: el capitán de la caja no es el que más pega ni el que más corre. Es el que sabe, en cada turno, si la caja puede permitirse abrirse. "Tú lo sabes mejor que nadie", dice. "Porque tú eres la razón de abrirla". Eres capitán de los Cascos de Hierro. El corredor dirige la caja.

**B — Coger el brazalete, pero dirigir tu caja: la que se abre.** *(requiere `volvisteConTiza` o `cajaQueSeAbre`)*
→ `rel:{dorin:2, aficion:2}`, flag `eresCapitan`, `capitan`, `capitanDeLaCajaAbierta`
> Coges el brazalete y traes tu tiza: la caja con la puerta del turno ocho, la que dibujaste en la pizarra de Durak. Dorin la mira. "Ya no es mi caja", dice. "Pero puede que sea la que hacía falta". Diriges una caja que corre cuando debe y protege cuando debe. Ni la de Durak ni la de los elfos. La tuya. La primera caja nueva en trescientos años.

**C — Rechazar el brazalete. No mereces dirigir lo que quisiste romper.** *(requiere Honor 3; forzable)*
→ `rel:{dorin:1, brokk:1}`, `Honor:2`, flag `rechazasteElBrazalete`
> "Dáselo a Brokk", dices. "Él tapó huecos veinte años. Yo solo corría". Dorin niega con la cabeza. "Brokk tapa huecos porque tú los dejas. Un capitán tiene que ser el que los deja y aprende a no dejarlos. No el que nunca los dejó". Te pone el brazalete tú no quieras. Es la última cosa que hace Dorin de pie.

*Deja para después (arreglo de auditoría — `capitan`): eres capitán, base del resto del libro. `capitanDeLaCajaAbierta` cobra `volvisteConTiza` del cap 3. La humildad de rechazarlo (C) define un capitán distinto, que se lee en el cap 7.*

---

## A2 — El turno doce

**Partido: Los Cascos Rotos de Karag** *(enanos del Caos con minotauro, fuerza 3; la muerte de Dorin)*

Contra los Cascos Rotos, otra vez, con su minotauro. Dorin ha pedido jugar un último partido. Durak ha dicho que sí, que es su vestuario y sus reglas. En el turno doce, sin que nadie le toque, Dorin se sienta en medio del campo con la cadera de hierro y no se levanta. Mira el balón, que tienes tú. Levanta una mano. La deja caer. El árbitro no sabe qué pitar.

Ciento setenta y cuatro años. Dorin Yunquefirme se va como se fue toda su vida: en el centro de la caja, sin correr, mirando dónde va el balón.

**Opciones:**

**A — Terminar la jugada por él. Anotar como él querría: en la caja.**
→ `rel:{dorin:3, durak:3, club:3}`, `caja↑`, gol, flag `anotasteParaDorin`, `dorinDescansa`
> No corres. Formas la caja alrededor de Dorin sentado, para que nadie lo toque, y avanzáis una casilla por turno con él en el centro, muerto, protegido, como protegió él a todos ciento setenta y cuatro años. Cruzáis. El último touchdown que ve Dorin es el suyo, el de siempre, el lento. Lo enterráis en la montaña con el balón de ese partido y una runa que graba Helgra: "El corredor no corre. El corredor es el que vale la pena proteger". Su frase. Al derecho, esta vez.

**B — Correr por él. Que su último partido tenga la carrera que él nunca hizo.** *(correr)*
→ `rel:{aficion:3, durak:-1}`, `correr↑`, gol, flag `corristeParaDorin`
> Coges el balón y corres, rápido, libre, delante de Dorin sentado en el centro, para que vea una vez, antes de irse, lo que él nunca se permitió. Cruzas corriendo. Dorin, con la última mirada, ve a un enano correr y cruzar, y no se sabe si lo que tiene en la cara es reproche u orgullo, porque un enano de ciento setenta y cuatro años tiene las dos cosas en la misma arruga. Muere viendo correr. A lo mejor era lo que quería ver. A lo mejor no.

*Deja para después: la muerte de Dorin, ritual. `anotasteParaDorin` lo despide en la caja (suma Caja, cierra su arco al derecho). `corristeParaDorin` lo despide corriendo (suma Correr, ambiguo a propósito). Se lee en el cap 7 (su tumba, su frase).*

---

## A3 — El troll de Grimnir

**Partido: Los Rompecráneos de Gorgomor** *(orcos de Primera, fuerza 4, con troll; amistoso de pretemporada)*

Un amistoso contra los Rompecráneos de Gorgomor, orcos de Primera, porque Hargrim vende entradas. Traen un troll. Un troll de verdad, con regeneración, vómito y todo lo que sale en los libros. Grimnir lo ve desde el túnel y se le cae el hacha de las manos, que en un matatrolls es llorar. "Sesenta años", dice. Sesenta años tiñéndose la barba de naranja esperando a este troll.

*[si `promesaGrimnir`:]* Te mira. Sabes lo que te pidió hace tiempo: cuando entre, no le cubras. Un matatrolls no se cubre.

**Opciones:**

**A — Cumplir la promesa. No cubrirle. Dejarle morir bien.**
→ `rel:{grimnir:3}`, `Honor:2`, flag `grimnirMurioAnotando`, `grimnirMurio`, `cumplisteLaPromesa`
> No le cubres. Grimnir entra al troll solo, con las manos, sin hacha, sesenta años de deshonra cargados en los hombros, y le da y le da hasta que el troll cae, y el troll, al caer, le da a él. Los dos se quedan en el barro. Grimnir muere con la barba naranja manchada de sangre de troll, sonriendo, honrado por fin. Helgra graba su runa esa noche: "Cayó de frente. Contra lo más grande. Como se debe". La deshonra que nadie recordaba queda pagada.

**B — Cubrirle igual. No dejar morir a otro enano.** *(caja)*
→ `rel:{grimnir:-2, durak:1, club:1}`, `caja↑`, flag `grimnirVive`, `noCumplisteLaPromesa`
> Le cubres, contra su voluntad. Formas la caja alrededor de Grimnir y el troll, y entre todos tumbáis al troll sin que Grimnir muera. Grimnir sobrevive, y te odia por ello, porque le has robado la única muerte que quería. "Sesenta años", te escupe, "y me los quitas en un turno". Vivirá más. Es peor. A veces salvar a alguien es la crueldad más grande. Un matatrolls lo sabe mejor que nadie.

*Deja para después: `grimnirMurioAnotando`/`grimnirMurio` cierra el arco del matatrolls (honrado); su hacha va al banquillo con Helgra y se lee en el ascenso y el cap 7. `grimnirVive` lo deja vivo y resentido, y presente en la final. Nota: Grimnir es tu espejo (fue corredor, dejó un hueco, murió alguien): cómo muere él dice cómo podrías morir tú.*

---

## A4 — El partido del ascenso

**Partido: Las Espinas de Cythel** *(elfos, fuerza 3; el equipo de Faelas; ganar es Primera)*

Último partido. Ganar es Primera, trescientos años después de la última vez que los Cascos tuvieron que subir a algo. Contra Cythel: los que no chocan, los que os bajaron, los de Faelas.

*[si `grimnirMurio`:]* Sin Grimnir. Su hacha está en el banquillo, con Helgra, que la ha puesto donde él se sentaba.
*[si `grimnirVive`:]* Grimnir está suelto, con el hacha que no puede llevar en la mirada, resentido pero tuyo.
*[si `capitanDeLaCajaAbierta`:]* La pizarra de Durak tiene tu caja: la que se abre en el turno ocho.

Faelas, enfrente, te busca con la mirada. "Corredor de esquina", dice, sin voz, solo con los labios. Turno ocho. Empate. Una jugada para subir a Primera.

**A — La caja que se abre. Correr desde dentro de la tradición.** *(el eje resuelto en síntesis; requiere `capitanDeLaCajaAbierta`)*
*Tirada: AG (4+, +1 por dirigir tu caja). Con riesgo bajo.*
- **Éxito:** → `fama:18`, `rel:{durak:3, brokk:3, club:3, aficion:3}`, gol, flag `ascendisteis`, `subisteConTuCaja`, `ganasteAFaelas`
> La caja avanza ocho turnos, terca, enana, y en el turno ocho se abre —la puerta que dibujaste— y sales tú corriendo por el hueco que la propia caja te guarda, protegido por detrás por Brokk y los tuyos, y cruzas delante de Faelas, que corre sin nadie que le cubra la espalda. Le ganas no siendo él: le ganas siendo lo que él nunca tendrá, un corredor con una caja detrás. Subís a Primera. Faelas, por primera vez, entiende que perdió contra algo que él no puede copiar: los tuyos.
- **Fallo (riesgo):** → derrota

**B — Ganarle a Faelas corriendo. Corredor contra corredor, limpio.** *(correr)*
*Tirada: AG (4+). Con riesgo. Esprintar repite.*
- **Éxito:** → `fama:16`, `rel:{aficion:3}`, `correr↑`, gol, flag `ascendisteis`, `ganasteAFaelasCorriendo`
> Rompes la caja y vas a por Faelas, corredor contra corredor, sin trucos, sin trampa, la carrera más pura entre un elfo y un enano que ha visto la montaña. Y ganas, porque quieres más: él corre por vanidad, tú por trescientos años de que te dijeran que no podías. Cruzas. Subís a Primera. Faelas te da la mano al final, de igual a igual. "Corredor", dice. Sin "de esquina". Te has ganado el nombre.
- **Fallo (riesgo):** → derrota, cadena de daño

*Deja para después: `ascendisteis` os lleva a Primera (cap 6). `subisteConTuCaja` es la síntesis del eje —correr desde dentro de la caja, la respuesta del libro— y da el mejor final. `ganasteAFaelasCorriendo` te iguala a Faelas (rama Correr pura).*

---

# RAMA B — Fuera *(si `teQuedaste`, versión condensada)*

Si te quedaste con los Grifos, no vuelves de capitán: sigues corriendo libre en Norburgo. El capítulo 5 se condensa en tres beats, con los Grifos:

- **B1 — La cima de correr:** subes con los Grifos a base de carreras. Eres su estrella. `rel:{aficion}` alto, `correr↑`. Pero llega la noticia de que **Dorin ha muerto** en Baraz-Ankor, en la caja, sin ti, y no has ido al entierro. Flag `dorinMurioSinTi`. Pesa.
- **B2 — La carta que no abriste:** Brokk deja de escribir. La última carta, sin abrir, se queda amarilla en el catre. Flag `brokkDejoDeEscribir`. El hueco en Baraz-Ankor lo tapa otro, peor.
- **B3 — El sorteo:** en Primera, el destino te empareja contra los Cascos de Hierro en la final del cap 6. Vas a jugar contra tu gente, con la camiseta de los Grifos, por segunda y última vez. Flag `finalContraLosTuyos`.

La rama B es más solitaria y más luminosa a la vez: ganas, corres, brillas, y estás cada vez más solo. Sin castigo moral: es una vida buena. Solo que la montaña pesa aunque no estés en ella.

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[Rama A, si `subisteConTuCaja`:]**
> Capitán de los Cascos de Hierro, en Primera, con una caja que corre y protege a la vez, la primera caja nueva en trescientos años, y la dibujaste tú. Dorin está enterrado con su frase al derecho. Brokk tapa tu hueco, pero ahora tú dejas menos. Has hecho lo imposible: cambiar la montaña sin traicionarla. Y arriba, en Primera, espera Faelas, y espera la pregunta de si todo esto fue por encontrar tu sitio o por demostrarle algo a un elfo.

**[Rama A, si `ganasteAFaelasCorriendo`:]**
> Subisteis a Primera y le ganaste a Faelas corriendo, de igual a igual, y te dio la mano y te llamó corredor sin "de esquina". Eres lo que querías ser: el enano que corre y que gana corriendo. Y en algún sitio de la montaña, la caja que dirigiste sigue siendo la de Durak, no la tuya, porque tú nunca dejaste de querer ser Faelas. A lo mejor está bien. A lo mejor es lo que eras.

**[Rama B:]**
> Subes a Primera con los Grifos, corriendo, brillando, solo. Dorin murió sin ti. Brokk dejó de escribir. Y el sorteo, que tiene el humor de la montaña, te pone en la final contra los Cascos de Hierro. Vas a volver a Baraz-Ankor. Con otra camiseta. Por última vez.

---

### Notas de diseño del capítulo

- **Rama A: 11 opciones** (4 escenas) + rama B condensada (3 beats). ✓
- **Con tirada:** turno doce, troll, ascenso. ✓
- **Con riesgo:** troll, ascenso A/B. ✓
- **Con requisito:** rechazar brazalete (Honor 3), caja abierta (flag), promesa Grimnir (flag). ✓
- **`capitan` conectado** (arreglo de auditoría): eres capitán, base del cap 6-7. ✓
- **Muerte de Dorin** ritual (turno doce, en la caja) — el mejor momento de la build, heredado. ✓
- **Grimnir = tu espejo:** fue corredor, dejó un hueco, murió alguien. Cómo muere él (honrado o salvado a la fuerza) refleja tu propio dilema. ✓
- **El eje se sintetiza** en el ascenso: `subisteConTuCaja` (correr desde dentro de la caja) es la respuesta que el libro propone. Pero `ganasteAFaelasCorriendo` deja abierto que quizá solo querías ser Faelas. ✓
- **Rama B** mantiene la reconvergencia (final contra los Cascos). Sin castigo moral. ✓
- **Fotografía** por rama y síntesis. ✓
