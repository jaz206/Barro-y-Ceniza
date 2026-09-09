# Barro y Ceniza — Enano
## Capítulo 2 — El descenso
### *La caja no basta*

Prosa final. Sigue la biblia y el documento de raza del enano. Heredado de la build, con Faelas reconvertido a rival (documento, sección 3).

**Función del capítulo:** complicación. Faelas y los elfos humillan a la caja, Dorin cae, el club se hunde a Tercera. El eje Correr↔Caja se pone a prueba: la caja pierde, y eso te da la razón y te la quita a la vez. Cinco escenas.

**Aviso de motor:** Dorin muere en este capítulo (escena 3). Declarar `dorinMuerto` y gatear sus apariciones posteriores con `noflag:"dorinMuerto"` (lección del bug de Roblerto/Grimgutz).

---

## Escena 1 — El corredor del otro banquillo

Faelas juega en las Espinas de Cythel, elfos, y es el corredor más rápido que has visto que no seas tú. Antes del partido, te espera fuera del vestuario de piedra con dos jarras, que en un elfo educado es una provocación cortés. "En mi equipo", dice, "correr es lo normal. Nadie me grita 'aquí no se corre'. Nadie me hace tapar un hueco en una esquina". Te dibuja con el dedo en la piedra una jugada donde el corredor y el receptor se cruzan por fuera de la caja. Es bonita. Es lo contrario de todo lo que Durak te enseña.

"¿Por qué te quedas con ellos?", pregunta. "Corres como yo. Podrías correr donde te aplaudan".

**Opciones:**

**A — Cogerle la jarra. Escuchar la jugada del enemigo.** *(correr)*
→ `Astucia:1`, `rel:{faelas:1, durak:-1}`, `correr↑`, flag `escuchasteAFaelas`
> Bebes con el elfo. Te enseña la jugada entera: el cruce por fuera, el pase largo, la carrera sin caja. La aprendes porque una jugada es una jugada, venga de quien venga. Faelas sonríe. "Sabía que eras de los míos y no lo sabías". Odias que suene a verdad.

**B — Tirarle la jarra. No bebes con quien hundió a tu club.** *(caja)*
→ `Ferocidad:1`, `rel:{faelas:-2, durak:1}`, `caja↑`, flag `rechazasteAFaelas`
> Le tiras la jarra a los pies. "Los tuyos nos bajaron bailando", dices. "Prefiero subir de pie con la caja que bajar bonito contigo". Faelas recoge su jarra sin ofenderse; los elfos no se ofenden, es su forma de ganar. "Como quieras. Nos vemos en el campo, corredor de esquina". Duele el mote.

**C — Escucharle y no decir nada. Guardarte la jugada y el desprecio.** *(requiere Astucia 2)*
→ `Astucia:2`, flag `guardasteLaJugada`
> Le dejas hablar, te aprendes la jugada, y no le das ni el sí ni el no. Faelas se va sin saber de qué lado estás, que es exactamente donde tú tampoco lo sabes. La jugada del cruce se te queda grabada. Un día la usarás. Contra él, o como él. Todavía no lo sabes.

*Deja para después (némesis + eje): `escuchasteAFaelas` te da la jugada del cruce (correr) y suma al eje Correr. `rechazasteAFaelas` suma Caja y define la enemistad. El mote "corredor de esquina" vuelve. Faelas reaparece en el cap 4 (el mercado) y en la final (cap 6).*

---

## Escena 2 — Los que no chocan

**Partido: Las Espinas de Cythel** *(elfos, fuerza 3; el equipo de Faelas; así bajaron los Cascos)*

Las Espinas de Cythel no chocan. Nunca. Su receptora salta por encima de la caja, su lanzador tira desde la otra mitad del campo, y sus linieros bailan alrededor de Dorin hasta que se le acaban los turnos. Fue así como los Cascos bajaron a Segunda. Ahora, en Segunda, vuelve a pasar. Durak alinea la caja de siempre. Faelas, enfrente, corre.

Turno seis. Vais 0-1. Dorin, dentro de la caja, grita la casilla siguiente. Helgra, desde el banquillo, señala la banda con el clavo: hay un hueco por donde Faelas va a entrar.

**Opciones:**

**A — Seguir a Dorin. La caja es la caja, aunque pierda.** *(caja)*
*Tirada: FU (4+). Sin riesgo.*
- **Éxito:** → `fama:5`, `rel:{durak:2, dorin:2, brokk:1}`, `caja↑`, gol, flag `aguantasteLaCaja`
> Sigues a Dorin. Avanzáis una casilla. Los elfos bailan, pero la caja no se abre, y en el turno ocho cruzáis protegidos, lentos, tercos. Empate. No ganáis —los elfos anotan otra vez al final— pero no os humillan, y perder sin humillación, contra elfos, es casi ganar. Dorin te mira desde dentro con algo parecido al orgullo.
- **Fallo:** → gol rival
> Sigues a Dorin, pero la caja es lenta y los elfos no, y antes de que avancéis dos casillas ya han bailado otro tanto. 0-2. La caja aguanta la dignidad, no el marcador.

**B — Romper la caja. Salir a por Faelas tú solo.** *(correr; requiere `escuchasteAFaelas` o `estudiasteRomperLaCaja`)*
*Tirada: AG (4+). Con riesgo. Esprintar repite.*
- **Éxito:** → `fama:10`, `rel:{aficion:3, durak:-2, dorin:-1}`, `correr↑↑`, gol, flag `corristeContraFaelas`, `cajaRota`
> Rompes la caja y sales a por Faelas, corredor contra corredor, elfo contra enano. Le ganas la carrera —eres más rápido de lo que un elfo cree que puede ser un enano— y le robas el balón y cruzas. Los cuatro mil de piedra rugen. Es la primera vez que un Casco humilla a un elfo corriendo. Faelas, por primera vez, no sonríe. Pero Dorin, en la caja que dejaste abierta, ha encajado un golpe que era para ti.
- **Fallo (riesgo):** → gol rival, cadena de daño, `cajaRota`
> Corres a por Faelas y Faelas, que lleva doscientos años corriendo, te deja atrás con un quiebro que no habías visto nunca. Cruza. La caja, sin ti, se ha abierto. 0-2. Corriste, y perdiste, y encima dejaste el hueco.

*Deja para después: `corristeContraFaelas` es el clímax del eje Correr en el descenso —ganas al elfo corriendo, pero abres la caja y Dorin lo paga, sembrando su caída (escena 3)—. `aguantasteLaCaja` suma Caja y el respeto de Dorin justo antes de perderlo.*

---

## Escena 3 — Las rodillas de hierro

*La muerte de Dorin. En clave enana: ritual, con respeto, la grada de pie sin ruido.*

**Partido: Los Cascos Rotos de Karag** *(enanos del Caos con minotauro, fuerza 3)*

Contra los Cascos Rotos de Karag, enanos del Caos con cuernos, un minotauro le entra a Dorin por detrás en el turno dos. Las rodillas de hierro aguantan; la cadera, no. Se lo llevan en camilla por primera vez en ciento setenta años, y la grada de piedra se pone en pie sin ruido, que es como los enanos gritan.

El apotecario del club solo puede atender a uno por partido. En el turno nueve te rompen a ti el hombro. Helgra viene al banquillo con la cara de quien tiene que elegir y no quiere.

*[si `rel.dorin` alto:]* Dorin, desde la camilla, dice tu nombre. Quiere que el apotecario te cure a ti. "El corredor vale la pena", dice, con su propia frase, usada al revés.

**Opciones:**

**A — Que el apotecario cure a Dorin. Tú aguantas con Cabeza Dura.**
→ `rel:{dorin:3, durak:2, club:2}`, `Honor:2`, flag `salvasteADorin`, `dorinMuerto`
> "A Dorin", dices. "Yo aguanto". Y aguantas: eres enano, Cabeza Dura, el hombro roto duele pero no te tumba. El apotecario cose a Dorin. No sirve: ciento setenta años son ciento setenta años, y esa noche, en la enfermería tallada en la montaña, Dorin Yunquefirme cierra los ojos con el brazalete de capitán todavía puesto. Pero se va sabiendo que elegiste salvarlo a él. Le pones tú el casco para la montaña.
> *La segunda vuelta de la muerte (la runa de Helgra, biblia 4.2) puede activarse aquí si tú también caes.*

**B — Que el apotecario te cure a ti. Eres joven, el club te necesita.** *(correr, frío)*
→ `rel:{dorin:-2, durak:-2, brokk:-1}`, `correr↑`, flag `teCurasteTu`, `dorinMuerto`
> "A mí", dices. "Soy el futuro. Él ya no llega al balón". Es cierto, y es lo más frío que has dicho nunca. El apotecario te cose a ti. Dorin muere esa noche sin el apotecario que salvó a otros ciento setenta años. Nadie te lo reprocha en voz alta. La grada de piedra, que oye todo, tarda un mes en volver a corear tu nombre. Brokk no te habla en una semana.

**C — Que el apotecario elija. Tú no cargas con esto.** *(requiere Voluntad 3; forzable)*
→ `Voluntad:1`, `rel:{helgra:1}`, flag `dejasteElegirAHelgra`, `dorinMuerto`
> "Que elija Helgra", dices. "Ella ve lo que nosotros no". Helgra elige a Dorin, porque Helgra siempre elige la tradición sobre el futuro, y luego graba una runa nueva en el banquillo mientras Dorin se apaga. "Para acordarme", dice. No cargas con la decisión. Cargas con haberla esquivado, que a veces pesa igual.

*Deja para después (muerte de Dorin, y quién eres): `salvasteADorin` te define como de los tuyos —se lee en el cap 5 y 7—. `teCurasteTu` suma Correr y frío: la grada y Brokk tardan en perdonarte, y en el cap 7 pesa. Dorin muere en cualquier caso (`dorinMuerto`): lo que cambia es cómo. Su brazalete de capitán queda libre para el cap 5.*

---

## Escena 4 — El matatrolls busca su troll

Grimnir Barbarroja se tiñó la barba de naranja hace sesenta años por una deshonra que nadie recuerda —ni él—, y desde entonces juega para morir bien: entra suelto en cada partido buscando al más grande del rival. En Segunda no ha encontrado un troll. Los Cascos Rotos tienen un minotauro, que casi vale. La noche antes, en el cuartel de piedra, afila un hacha que el reglamento no le deja llevar al campo.

"Mañana, cuando entre a por el minotauro", te dice, "no me cubras. Un matatrolls no se cubre. Morir cubierto es morir dos veces".

**Opciones:**

**A — Prometerle que no le cubrirás. Es su honor.**
→ `rel:{grimnir:2}`, `Honor:1`, flag `promesaGrimnir`
> Se lo prometes. Grimnir asiente, satisfecho: un enano que respeta la muerte de otro enano. "Si caigo bien mañana", dice, "grábame una runa. Que Helgra sepa que fue de frente". Afila el hacha hasta el amanecer. No la llevará. La afila igual.

**B — Prometerle que le cubrirás, diga lo que diga.** *(caja)*
→ `rel:{grimnir:-1, durak:1}`, `caja↑`, flag `cubrirasAGrimnir`
> "Te cubro", dices. "En la caja nadie muere solo". Grimnir se enfada, que en un matatrolls es peligroso. "No es tuyo eso que decides", gruñe. Pero en el fondo, muy en el fondo, un matatrolls que lleva sesenta años buscando morir agradece a veces que alguien no le deje. No lo dirá nunca.

**C — Preguntarle cuál fue la deshonra.** *(requiere Astucia 2)*
→ `Astucia:2`, `rel:{grimnir:1}`, flag `sabesLaDeshonra`
> "No me acuerdo", dice, y es mentira. Luego, mirando el hacha: "Corrí. Una vez. En la final de la Copa, hace sesenta años, rompí la caja para llegar al balón y anoté, y por mi hueco entró el rival y perdimos, y murió un enano en mi hueco". Te mira. "Corres, chaval. Ten cuidado con lo que dejas abierto". Es la sentencia ancestral que es sobre ti.

*Deja para después: `promesaGrimnir` decide cómo entra Grimnir al descenso (escena 5) —vive o muere de frente—. `sabesLaDeshonra` es una bomba: Grimnir fue un corredor que rompió la caja y le costó una vida. Es tu futuro posible. Se lee en el cap 6 y 7. La sentencia "ten cuidado con lo que dejas abierto" es el motivo de la caja aplicado a ti.*

---

## Escena 5 — El partido del descenso

**Partido: Los Cascos Rotos de Karag** *(vuelta; si perdéis, bajáis a Tercera)*

Último partido de la temporada. Si perdéis, los Cascos de Hierro bajan a Tercera, donde no han estado nunca en trescientos años. Los Cascos Rotos son enanos del Caos: caja contra caja, pero la suya lleva cuernos y un minotauro. Sin Dorin dirigiendo desde dentro, la caja de los Cascos va ciega.

*[si `promesaGrimnir`:]* Grimnir ha entrado al minotauro en el turno tres y no le has cubierto. Los dos siguen en pie. Es un milagro que dura.
*[si `cubrirasAGrimnir`:]* Grimnir entró al minotauro y tú detrás, cubriéndole. Está vivo y furioso contigo por no dejarle morir.

Turno ocho. Empate. Una jugada para no bajar.

**A — Dirigir tú la caja, como Dorin te enseñó.** *(caja; requiere `aprendisteLaCaja`)*
*Tirada: FU (4+, +1 si `salvasteADorin`). Con riesgo bajo.*
- **Éxito:** → `fama:12`, `rel:{durak:3, brokk:2, club:3}`, `caja↑`, gol, flag `salvasteALosCascos`, `dirigisteLaCaja`
> Ocupas el centro de la caja, el sitio de Dorin, y gritas la casilla siguiente con su voz. La caja te obedece —a ti, al corredor, dirigiéndola en vez de romperla— y avanza, terca, imparable, sobre la caja del Caos, y la parte. Cruzáis. No bajáis. Baraz-Ankor se pone de pie sin ruido, otra vez, pero esta vez de alegría. Has salvado a los Cascos siendo, por una tarde, Dorin. La caja te salvó. Empiezas a entender.
- **Fallo (riesgo):** → derrota, `bajasteisATercera`
> Diriges la caja, pero sin años de práctica una caja obedece a medias, y a medias no basta contra el Caos. Se abre un dedo. El minotauro entra. Bajáis a Tercera. La primera vez en trescientos años. Y la dirigías tú.

**B — Romper la caja. Correr. Salvar a los Cascos a tu manera.** *(correr)*
*Tirada: AG (4+). Con riesgo. Esprintar repite.*
- **Éxito:** → `fama:15`, `rel:{aficion:3, durak:-1}`, `correr↑↑`, gol, flag `salvasteALosCascos`, `corristeElDescenso`, `cajaRota`
> Rompes la caja una última vez y corres con todo, esquivando cuernos, dejando atrás al minotauro, cruzando el campo tallado con el balón y trescientos años de tradición a la espalda. Anotas. No bajáis. Los salvas. Corriendo. Y en la celebración, mientras la grada corea tu nombre, ves a Durak que no celebra: mira el hueco que dejaste en la caja, por donde no entró nadie de milagro. "Esta vez tuviste suerte", dice. "La suerte no sube de división".
- **Fallo (riesgo):** → derrota, cadena de daño, `bajasteisATercera`, `cajaRota`
> Corres, y esta vez el minotauro es más rápido de lo que un minotauro debería, o tú más lento de lo que crees, y te alcanza. Sin la caja, caes solo. Bajáis a Tercera. Corriste, y no bastó, y todos vieron el hueco.

*Deja para después: `salvasteALosCascos` (por la vía que sea) evita el descenso; si fallas, `bajasteisATercera` y el cap 3 arranca desde más abajo. `dirigisteLaCaja` (salvar con la caja) es enorme: prefigura tu vuelta como capitán (cap 5). `corristeElDescenso` suma Correr y la frase de Durak ("la suerte no sube") se lee en el cap 4.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `dirigisteLaCaja` (salvaste con la caja):]**
> Salvaste a los Cascos ocupando el sitio de Dorin, dirigiendo la caja que llevabas toda la vida queriendo romper. Y funcionó. Esa noche, en la galería, no duermes: piensas en que la caja, dirigida por alguien que sabe correr, es otra cosa. No la tumba que insultaste. Una herramienta. Dorin lo sabía. Se murió sin oírtelo decir.

**[si `corristeElDescenso` (corriste):]**
> Corriste y los salvaste, y la grada te lleva en volandas, y Durak mira el hueco que dejaste. Tenías razón: correr gana partidos. Y Durak tiene razón: correr deja huecos, y un día por un hueco tuyo entrará algo que no se va. Las dos razones son verdad. Vivir con las dos a la vez es lo que te espera.

**[si `bajasteisATercera`:]**
> Habéis bajado a Tercera. Trescientos años sin bajar, y ha pasado contigo en el campo. No importa si corriste o entraste en la caja: bajasteis. Dorin no está para verlo, y a lo mejor es mejor así. Los cuatro mil de la grada se han quedado en dos mil. Cada asiento vacío tiene un apellido.

---

### Notas de diseño del capítulo

- **13 opciones** (5 escenas). ✓
- **Con tirada:** los tres partidos (elfos, descenso). ✓ del tercio.
- **Con riesgo:** correr contra Faelas, descenso A/B (2-4). ✓ Más violento que el cap 1, como se anotó.
- **Con requisito:** escuchar a Faelas guardando (Astucia 2), romper la caja (flag), dejar elegir a Helgra (Voluntad 3), la deshonra (Astucia 2), dirigir la caja (flag). ✓
- **Opción que solo caracteriza:** preguntar a Grimnir la deshonra (4C) no da ventaja; revela que Grimnir es tu futuro posible. ✓
- **Faelas reconvertido a rival** (documento 3): sus dos escenas son ahora enfrentamientos. ✓
- **Muerte de Dorin** ritual, con la elección del apotecario (biblia: apotecario un uso, aquí la decisión moral). `dorinMuerto` declarado para gatear apariciones (bug Roblerto). ✓
- **El eje se profundiza:** correr gana partidos pero deja huecos (Grimnir es la prueba viva). ✓
- **Fotografía** por resultado del descenso. ✓
