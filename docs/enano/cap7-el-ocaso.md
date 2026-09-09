# Barro y Ceniza — Enano
## Capítulo 7 — El ocaso
### *Cómo juegan los Cascos cuando tú no corres*

Prosa final. Sigue la biblia y el documento de raza del enano. **Es el cierre.** Heredado de la build.

**Función del capítulo:** después. Durak muere, aparece Thorek (el joven que corre, sobrino de Brokk), el último partido, la mina donde empezó todo, el retiro. El ciclo se cierra: ahora tú eres el Dorin de otro. Lee toda la acumulación. Cinco escenas.

**El cuerpo** (biblia 12.4): por fin falla. El enano que nunca se rompió, después de siglos, tiene las rodillas y el hombro que no aguantan. No de viejo del todo —los enanos duran—, sino de uso.

---

## Escena 1 — La tiza

Durak Ojoferro muere en su cueva, con ochenta y tres años de banquillo, sentado delante de la pizarra. Muere como Dorin, como se mueren los enanos que importan: en su sitio, mirando la caja.

*[si `síntesis` (la caja corrió):]* En la pizarra está tu caja, la que se abre en el turno ocho. La ha repasado tantas veces que la tiza casi ha borrado la piedra. La entendió. Al final, la entendió.
*[si `ganasteCorriendo`:]* En la pizarra hay media tiza. La otra mitad la tienes tú desde el motín. Nunca volvió a dibujar la caja entera sin ti.
*[si `ganasteEnLaCaja` (nunca corriste):]* En la pizarra está la caja de siempre, la de trescientos años, intacta. Murió sabiendo que su corredor eligió no correr. Es lo más feliz que se murió un enano.

**Opciones:**

**A — Coger la tiza. Seguir dibujando la caja por él.**
→ `rel:{durak:3, club:2}`, `Honor:2`, flag `heredasteLaTiza`, `entrenador`
> Coges la tiza de ochenta y tres años. Ahora la pizarra es tuya, la cueva es tuya, la caja es tuya. Dibujas, la primera noche, la caja que Durak te enseñó, entera, de memoria, cada bota, cada casilla. Y al lado, pequeña, la puerta del turno ocho. Las dos cosas. Eres el entrenador de los Cascos de Hierro. El corredor que dirige la tradición.

**B — Borrar la pizarra. Que la caja muera con Durak.** *(correr)*
→ `rel:{durak:-1, aficion:1}`, `correr↑`, flag `borrasteLaPizarra`
> Borras la pizarra. Trescientos años de tiza, limpios. "La caja era de Durak", dices. "Que descanse con él". Dibujas encima el juego de correr, el tuyo, sin caja. Es tu club ahora, tu momento. Y algunas noches, mirando la pizarra donde ya no está la caja, sientes un frío que no sabes nombrar, el frío de haber ganado la discusión con un muerto que ya no puede contestar.

**C — Dejar la pizarra como está. No tocar lo de Durak.** *(caja)*
→ `rel:{durak:2, club:3}`, flag `guardasteLaPizarra`
> No tocas nada. Dejas la última caja que dibujó Durak en la piedra, con su polvo de tiza, y pones un cristal delante para que no se borre. La cueva se vuelve un pequeño templo. Los jóvenes bajan a ver "la pizarra de Durak" como se ve una reliquia. Tú entrenas en otra cueva. Algunas cosas se guardan, no se heredan.

*Deja para después (arreglo de auditoría — la tiza y Durak): `heredasteLaTiza`/`entrenador` te hace entrenador (se lee en el banquillo y el retiro). La forma de la pizarra al morir Durak lee cómo ganaste el Cáliz: el libro cierra el eje aquí.*

---

## Escena 2 — El joven que corre

Fichan a un corredor de Baraz Kadrin: **Thorek**, sesenta años, sobrino de Brokk, que corre un poco más de lo que tú corrías a su edad. Te mira como tú mirabas a Dorin. El primer día, en el primer entrenamiento, recoge el balón y corre hasta la línea antes de que se forme la caja. Once enanos le miran. Y te miran a ti, que ahora eres el viejo del banquillo, el que dice o no dice "aquí no se corre".

**Opciones:**

**A — "Aquí no se corre. Aquí se recoge el balón." Como Durak.** *(el ciclo se repite)*
→ `rel:{durak:2, club:2}`, `caja↑`, flag `dijisteLaFrase`, `elCicloSigue`
> Te oyes decirlo antes de pensarlo: "Aquí no se corre. Aquí se recoge el balón y se entra en la caja". Las mismas palabras que Durak te dijo cada día tres temporadas, saliendo de tu boca hacia un joven que corre. Y en la cara de Thorek ves tu propia cara de hace una vida: la rebeldía, la incomprensión, el don que le pica dentro. El ciclo gira. La montaña siempre gana, y siempre empieza otra vez.

**B — "Corre. Pero aprende dónde dejas el hueco." La lección entera.** *(síntesis)*
→ `rel:{brokk:3, aficion:2}`, flag `enseñasteThorek`, `thorekAprendio`, `paseFinal`
> "Corre", le dices. "Naciste para eso, como yo. Pero ven, que te enseño lo que a mí me costó una vida y a Grimnir sesenta años: dónde dejas el hueco cuando corres, y cómo la caja te lo tapa si la quieres". Le enseñas la caja que se abre. Thorek aprende en una temporada lo que a ti te llevó siete capítulos. No tiene que romperse como tú te rompiste. Le has ahorrado la deshonra de Grimnir y la soledad de Norburgo. Es lo mejor que hace un maestro: que el siguiente no sangre lo mismo.

**C — Dejar que Brokk le enseñe a su sobrino. Tú ya diste bastante.**
→ `rel:{brokk:2}`, flag `brokkEnseña`
> "Que le enseñe Brokk", dices. "Él sabe tapar huecos mejor que nadie. Que Thorek aprenda de los dos: a correr de mí, a cubrir de él". Brokk, que lleva toda la vida en la esquina sin que nadie le cante, se hincha un dedo de orgullo. Su sobrino aprende de los dos hermanos: el que corre y el que tapa. Como debió ser siempre, desde el río.

*Deja para después (el ciclo, y Brokk cobrado del todo): `dijisteLaFrase` repite el ciclo (te vuelves Durak). `enseñasteThorek`/`thorekAprendio` rompe el ciclo (el siguiente no sangra). `brokkEnseña` cierra a Brokk: el que tapaba huecos por fin enseña. Thorek juega en la final del `ultimoPartido` según esto.*

---

## Escena 3 — El último partido

**Partido: Los Yunques de Baraz Kadrin** *(enanos puros, fuerza 3; los entrena Brokk; nadie dice que es el último, pero lo saben los sesenta mil asientos)*

Nadie ha dicho que sea el último, pero lo saben los sesenta mil asientos de piedra. Contra los Yunques de Baraz Kadrin, que entrena Brokk desde la banda con las manos en la barba, hermano contra hermano por última vez.

*[si `thorekAprendio` o `dijisteLaFrase`:]* Thorek juega en el centro de la caja. Tú en la esquina, donde jugaba Dorin al final.
*[si no:]* Thorek juega en la banda. Tú en el centro, todavía, aunque las rodillas avisen.

Turno dieciséis. La última jugada de tu carrera.

**A — Dársela a Thorek. Que corra él. Tú tapas el hueco.** *(el relevo; requiere `thorekAprendio`)*
→ `rel:{brokk:3, club:3, aficion:3}`, gol, flag `paseAThorek`, `cerrasteElCiclo`
> No corres tú. Le das el balón a Thorek y te pones en la esquina, en el sitio de Dorin, a tapar el hueco que él va a dejar al correr. El joven corre, cruza, y tú, desde la esquina, ves lo que Brokk vio toda su vida: la belleza de tapar el hueco del que corre, de ser el que se queda para que otro vuele. Cruzáis. Tu última jugada es hacer a otro. No hay mejor forma de que un corredor cuelgue las botas: enseñándole a la montaña que se puede correr, y quedándose él en la esquina, por fin, feliz.

**B — Correr una última vez. La última carrera.** *(correr)*
*Tirada: AG (5+, el cuerpo falla ya). Con riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{aficion:3}`, flag `ultimaCarrera`, `ultimoTD`
> Corres una última vez, más lento que nunca, con las rodillas de Norburgo y el hombro de Dorin, pero corres, porque naciste para eso y quieres irte haciéndolo. Cruzas despacio, y los sesenta mil asientos de piedra, por primera vez en trescientos años, se ponen de pie y corean el nombre de un corredor en Baraz-Ankor. Te tumbas en la zona de anotación. Un buen sitio. La última carrera.
- **Fallo:** → `Voluntad:2`, flag `caisteCorriendo`
> Corres, y el cuerpo, que aguantó siglos, por fin dice basta a tres pasos de la línea. Caes. Sin que nadie te toque, como cayó Dorin. Te levantas —eres enano— y andas los tres pasos que no pudiste correr, y cruzas andando. Empezaste queriendo correr y acabas cruzando a pie, protegido por los tuyos. A lo mejor era el punto desde el principio.

*Deja para después: `paseAThorek` cierra el ciclo (el relevo, síntesis). `ultimaCarrera` es la despedida corriendo. `caisteCorriendo` es la más bella: acabas andando, protegido, entendiendo la caja al final.*

---

## Escena 4 — La galería de la caja

*Escena de relación / cierre íntimo. La mina donde empezó todo.*

Después del último partido bajas a la galería de la mina donde jugabas de niño con Brokk, con un casco viejo y dos vagonetas por portería. Es donde aprendiste a correr, antes de que nadie te dijera que no se debía.

*[si `grimnirMurio`:]* Has traído el hacha de Grimnir. Pesa.

Hay dos críos jugando con un balón de trapo. Uno corre. El otro le grita las casillas. Ninguno sabe quién eres.

**Opciones:**

**A — [si tienes el hacha] Dejar el hacha de Grimnir apoyada en la vagoneta.**
→ `rel:{grimnir:3}`, `Honor:2`, flag `dejasteElHacha`
> Dejas el hacha de Grimnir apoyada en la vagoneta que hacía de portería. Un día, uno de esos críos la encontrará, y preguntará, y alguien le contará la historia del matatrolls que corrió una vez y lo pagó sesenta años, y murió de frente contra su troll. Las historias son la runa que dura más. Grimnir descansa en una mina, con los que juegan. Es donde querría estar.

**B — Enseñarles a los críos la jugada. La caja que corre.**
→ `rel:{club:2, aficion:1}`, flag `enseñasteALosCrios`
> Te acercas y les enseñas, con el balón de trapo, la caja que se abre: el que corre y el que tapa, los dos, juntos. Los críos aprenden en una tarde. Uno corre, el otro cubre, y cruzan, y ríen. No saben que acaban de aprender lo que a la montaña le costó trescientos años y a ti una vida. Mejor que no lo sepan. Que les salga natural. Que para ellos, correr y cubrir sean lo mismo desde el principio.

**C — No decir nada. Mirarlos jugar y subir a la superficie.**
→ `Voluntad:1`, flag `mirasteYSubiste`
> No dices nada. Los miras jugar, un crío que corre y un crío que tapa, en la misma galería donde empezó todo, y subes a la superficie sin que sepan quién eras. Algunas cosas se cierran mejor en silencio. La montaña seguirá haciendo corredores y cajas mucho después de que tu nombre se borre de un asiento de piedra. Está bien. Así debe ser.

*Deja para después: cierra los objetos (el hacha de Grimnir, biblia 5). El ciclo de la mina: donde aprendiste a correr, otros aprenden ahora.*

---

## Escena 5 — Cómo juegan los Cascos (el retiro)

Las rodillas no aguantan y el hombro tampoco.

*[si `campeon`:]* El Cáliz de Barro está en la Sala de los Ancestros de Baraz-Ankor, y la caja que lo ganó está dibujada en la piedra al lado, para siempre.
*[si no:]* El Cáliz nunca fue tuyo, pero la caja que casi lo gana está dibujada en la piedra igual, porque en la montaña se graba lo que se intentó, no solo lo que se logró.

Hargrim manda preguntar cómo van a jugar los Cascos cuando tú no corras. Helgra te espera en el banquillo de piedra con dos jarras y un clavo, grabando la última runa.

**Opción única — Cerrar el libro:**

*[si `síntesis` o `thorekAprendio`:]*
> "¿Cómo van a jugar los Cascos cuando yo no corra?", repites la pregunta de Hargrim. Y miras a Thorek en el centro de la caja, corriendo cuando debe, protegido por los tuyos, y sonríes. "Igual que ahora", dices. "Porque ya no hace falta que corra yo. Le enseñé a la caja a correr. La caja no me necesita. Nunca me necesitó a mí. Necesitaba que alguien la quisiera lo bastante para cambiarla sin romperla". Helgra graba la runa. La lees: es la de "volver", la primera que te enseñó. Ahora la entiendes: no era volver de la muerte. Era volver a casa. Cierras el libro de un corredor que le enseñó a la montaña a correr sin dejar de ser la montaña. No es poca cosa. En trescientos años, nadie lo había hecho.

*[si `ganasteCorriendo` o `teQuedaste` (rama B):]*
> Corriste toda tu vida, ganaste corriendo, fuiste el enano que se atrevió a ser un elfo. Y ahora, retirado, bajas a veces a la galería de la mina y corres, solo, en la oscuridad, por si se te olvida. No se te olvida. Pero ya no hay grada, ni Durak que te riña, ni Brokk que tape tu hueco. Solo tú y la velocidad, que es lo que querías, y el eco de tus pasos en una galería vacía, que es lo que costaba. Cierras el libro de un corredor que corrió hasta el final, libre y solo, las dos cosas, siempre las dos cosas. Elegiste tu don. Pagaste su precio. Nadie puede decir que no fuiste tú.

*[si `ganasteEnLaCaja` (nunca corriste):]*
> El corredor más rápido de la montaña se retira sin haber corrido apenas, campeón, querido, de los tuyos del todo. Renunciaste a tu don por pertenecer, y ganaste la pertenencia, que es lo más difícil de ganar. Helgra graba la runa de "volver". "Nunca te fuiste", dice. "Por eso no tuviste que volver". Cierras el libro de un enano que pudo ser un elfo y eligió ser un enano. La montaña te lo pagará en lo único que la montaña paga: durando. Te recordarán trescientos años. Cada asiento de piedra con tu apellido.

**[Cierre común]**
> Helgra termina la runa y sopla el polvo. En Baraz-Ankor no se llora: se graba. Y lo que se graba en la piedra dura más que los que lloran. Sesenta mil asientos, cada uno un apellido, cada apellido una familia que vio jugar a un corredor que no debía existir y existió. La caja avanza una casilla por turno. Siempre lo hizo. Siempre lo hará. Y ahora, a veces, corre.

→ flag `cerrasteElLibro`.

---

### Notas de diseño del capítulo

- **El ciclo se cierra:** Thorek es tu Dorin al revés, y decides si repites la frase de Durak (el ciclo gira) o rompes el ciclo enseñándole la síntesis (el siguiente no sangra). ✓
- **El eje se resuelve del todo:** la runa de "volver" resulta ser "volver a casa", no de la muerte. El motivo de la caja cierra: "y ahora, a veces, corre". ✓
- **El retiro lee toda la acumulación:** cómo ganaste el Cáliz, la tiza, Thorek, Brokk, Grimnir, la rama. Tres epílogos distintos según el eje (síntesis / corriste / caja pura). ✓ (biblia 19, epílogo modular)
- **La sentencia ancestral que es sobre ti** cierra el libro: la runa de volver. ✓
- **Objetos cerrados:** el hacha de Grimnir, la tiza, la runa. ✓
- **Sin castigo moral:** los tres finales son dignos. Correr libre no es peor, es más solo. ✓
- **12 opciones + cierre.** ✓
