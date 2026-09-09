# Barro y Ceniza — Enano
## Capítulo 6 — Primera
### *Los Cascos de Hierro contra las Hojas*

Prosa final. Sigue la biblia y el documento de raza del enano. **Es la cima** (biblia 17.7). Heredado de la build.

**Función del capítulo:** cima. La final contra las Hojas de Ellorien, los elfos de la corte. Aquí se resuelve la pregunta del libro (Correr↔Caja) y el arco de Faelas. La jugada clave lee toda la acumulación. Cuatro escenas.

**Reconvergencia de ramas:** en rama A (`volviste`) juegas de capitán de los Cascos; en rama B (`teQuedaste`) la final es Grifos contra Cascos, o los Cascos contra las Hojas con Faelas fichado — el motor sirve la variante según los flags.

**El cuerpo** (biblia 12.4): el enano apenas envejece, pero cargas heridas (la rodilla de Norburgo, la runa, el hombro de Dorin). En Primera, contra elfos, cada resto de lentitud pesa.

---

## Escena 1 — La Viuda

Primera División. Hargrim, para la final, ha comprado una Apisonadora: un artefacto de vapor con cuchillas, Golpe mortífero e Imparable, con un enano dentro que no ve el balón ni quiere verlo. La llaman **La Viuda**. El reglamento la considera arma secreta: juega una entrada y luego el árbitro la expulsa, salvo que el árbitro se haya encontrado algo en la taquilla.

Durak la mira como se mira una herejía nueva. "Eso no es la caja", dice. "Eso es comprar con oro lo que no se ganó con paciencia".

**Opciones:**

**A — Usar La Viuda. En una final todo vale.** *(correr, frío)*
→ `Ambición:1`, `rel:{durak:-2, club:-1}`, flag `usasteLaViuda`
> Dejas que Hargrim suelte a La Viuda una entrada. Siega a tres elfos antes de que la expulsen. Es efectivo y es horrible, y Durak no te mira mientras dura. Ganar así es ganar como los que compran títulos, no como los que los sudan. Pero es una final, y las finales no preguntan cómo.

**B — Sobornar al árbitro para que La Viuda no sea expulsada.** *(requiere oro)*
→ `oro`, `rel:{durak:-3}`, flag `viudaConSoborno`, `sobornaste`
> Pones algo en la taquilla del árbitro. La Viuda juega más de una entrada. Siega media plantilla élfica. Es trampa sobre herejía, y Durak, que lleva ochenta años perdiendo con honor, prefiere eso a ganar así. "Puedes ganar el Cáliz", dice. "No puedes ganarlo y seguir siendo de los Cascos. Elige". No es una amenaza. Es aritmética enana.

**C — Rechazar La Viuda. Los Cascos ganan con la caja o no ganan.** *(caja)*
→ `rel:{durak:3, club:2, brokk:1}`, `caja↑`, `Honor:2`, flag `rechazasteLaViuda`
> Le dices a Hargrim que guarde su máquina. "Subimos con la caja. Ganamos con la caja o perdemos con la caja, pero somos los Cascos de Hierro, no una chatarrería con cuchillas". Durak, por primera vez en el libro, sonríe del todo. "Ahora eres capitán", dice. "El brazalete solo pesa cuando dices que no al oro".

*Deja para después: `usasteLaViuda`/`viudaConSoborno` suma poder sucio, se lee en la Cristalvisión y el cap 7 (ganar manchado). `rechazasteLaViuda` es la afirmación de la identidad enana: se gana con paciencia, no con oro.*

---

## Escena 2 — Lo que es Faelas

Faelas ha tenido una carrera larga —los elfos las tienen—, y las Hojas de Ellorien, el equipo de la corte, le ofrecen volver al bosque por lo que gana un mecenas. Lo cuenta antes de la final, y por primera vez no suena a burla: suena a un corredor viejo al que su gente, por fin, llama a casa.

"Tú volviste a tu montaña", te dice. "Yo nunca me fui de la mía del todo. Pero me trataron como a ti te trataban: como al raro que corre. Ahora me llaman héroe. ¿Voy? ¿O me quedo siendo el elfo que jugó con enanos?".

Te pregunta a ti. Porque eres el único que sabe lo que es correr donde no te quieren.

**Opciones:**

**A — Decirle que vuelva al bosque. Uno de los dos debe llegar a casa.**
→ `rel:{faelas:2}`, `Honor:1`, flag `faelasSeVa`, `dijisteVuelve`
> "Vuelve", le dices. "Uno de los dos tiene que poder volver a casa sin que le griten". Faelas te mira largo, con esa cara élfica que no envejece. "Nos vemos en la final, entonces", dice. "Con la hoja verde. Por última vez". Jugará contra ti, en su bando por fin, y los dos sabéis que es lo correcto y que dolerá igual.

**B — Decirle que se quede. Que un raro entiende a otro raro.** *(inesperado)*
→ `rel:{faelas:3}`, flag `faelasSeQueda`, `dijisteQuedate`
> "Quédate", le dices. "En el bosque serás un héroe viejo entre los tuyos. Aquí eres el elfo que jugó con enanos y les enseñó a correr. Eso no lo es nadie más". Faelas se ríe, y por una vez no es una sonrisa élfica de superioridad: es la risa de alguien a quien acaban de entender. Se queda. En la final, juega **con vosotros**, con el casco de hierro, y los elfos de la corte no le miran. Tu némesis se ha vuelto tu extraño hermano de exilio.

**C — No decirle nada. Que elija solo.** *(caja, seco)*
→ flag `faelasEligeSolo`
> "No es asunto mío", dices. "Cada uno sabe dónde le duele menos". Es la respuesta más enana y la menos generosa. Faelas asiente. Elige por su cuenta —da igual qué—, y en la final juega donde juegue sin que hayáis cerrado nada. Dos corredores que se entendían y no se lo dijeron. Muy de la montaña. Un poco triste.

*Deja para después (el arco de Faelas resuelto): `faelasSeVa` lo pone enfrente en la final (némesis clásica). `faelasSeQueda` lo pone contigo (reconvergencia emotiva: el espejo se une). `faelasEligeSolo` deja el hilo abierto, seco. Cualquiera cierra la pregunta "¿corría por mí o contra mí?".*

---

## Escena 3 — Diez segundos

Un reportero de la Cristalvisión, con un cristal flotando junto a la cabeza, te aborda en el túnel la víspera de la final. "Diez segundos. Di algo que se recuerde".

*[si `grimnirMurio`:]* Todos quieren saber qué sientes por Grimnir, que murió contra su troll.
*[si `viudaConSoborno`:]* Todos quieren saber qué había en la taquilla del árbitro.

Detrás del cristal, medio Mundo Viejo y una montaña entera de asientos de piedra con apellidos.

**Opciones:**

**A — "Aquí no se corre. Aquí se entra en la caja. Y hoy la caja va a correr."**
→ `fama:12`, `rel:{durak:3, aficion:3, club:2}`, flag `fraseDeLaCaja`
> Lo dices mirando al cristal. Es la frase de Durak, la que te dijo cada día tres temporadas, con una vuelta de tuerca al final que la cambia todo. La montaña entera la oye. Durak, en el vestuario, la oye. Ochenta años esperando que alguien entendiera la caja, y la entendió el que quería romperla. Es titular en todo el Mundo Viejo.

**B — "Corro desde que nací. Hoy corro por los que no pudieron."** *(correr)*
→ `fama:12`, `rel:{aficion:3, faelas:1}`, `correr↑`, flag `fraseDelCorredor`
> Lo dices por Helgra, que nunca pudo andar. Por Grimnir, que corrió una vez y lo pagó sesenta años. Por Faelas, que corre donde no le quieren. La grada de los raros, de los que no encajan, te hace suyo con esa frase. Es titular, y esta noche, en muchas montañas, una cría que corre y a la que riñen duerme un poco mejor.

**C — Mirar el cristal en silencio diez segundos. Como un enano.**
→ `fama:8`, `Ferocidad:1`, flag `elSilencioEnano`
> No dices nada. Diez segundos de enano mirando un cristal, con cara de piedra. La Cristalvisión no sabe qué hacer con el silencio. Pero cada enano del Mundo Viejo que lo ve entiende exactamente lo que dijiste, que fue todo, en el idioma de la montaña: el que no necesita palabras porque las piedras duran más.

*Deja para después: la frase se lee en la final y el cap 7. `fraseDeLaCaja` sella la síntesis del eje. `fraseDelCorredor` te hace bandera de los raros.*

---

## Escena 4 — El Cáliz de Barro

**Partido: Las Hojas de Ellorien** *(elfos de la corte, fuerza 4; la final; los que enseñaron a no chocar)*

La final. Las Hojas de Ellorien, los elfos de la corte, los mejores corredores del mundo, los que enseñaron a todos a no chocar y así bajaron a los Cascos hace una vida.

*[si `faelasSeVa`:]* Faelas juega con ellos, con la hoja verde. Os saludáis desde lejos, dos corredores que se entienden.
*[si `faelasSeQueda`:]* Faelas juega con vosotros, con el casco de hierro. Los elfos de la corte no le miran. Tu espejo, en tu bando, por fin.
*[si `grimnirMurio`:]* El hacha de Grimnir está en el banquillo, con Helgra. Jugáis por él.

Turno ocho. Empate. La final del Cáliz de Barro en una jugada. Y por primera vez en trescientos años, un Casco de Hierro tiene que decidir cómo se gana.

### La jugada clave

*Biblia 17.7: opciones desbloqueadas por el eje, las relaciones, los recuerdos. Aquí se resuelve la pregunta del libro.*

**A — La caja que se abre. La síntesis: correr desde dentro de la tradición.** *(el eje resuelto; requiere `capitanDeLaCajaAbierta` o `subisteConTuCaja`)*
*Tirada: AG (4+, +1 dirigiendo tu caja, +1 si `rechazasteLaViuda`; tope +2). Con riesgo bajo.*
- **Éxito:** → `fama:30`, gol, `rel:{durak:3, brokk:3, club:3, aficion:3}`, flag `campeon`, `ganasteElCaliz`, `laCajaCorrio`, `síntesis`
> Ocho turnos de caja, terca, enana, avanzando una casilla mientras los elfos bailan alrededor sin encontrar el hueco, porque no hay hueco: tu caja no deja huecos. Y en el turno ocho, la puerta que dibujaste se abre, y sales tú corriendo por dentro de tu propia tradición, protegido por Brokk detrás, por Nain y Skalf en las esquinas, y cruzas delante de los mejores corredores del mundo, que corren solos. Campeones. La caja corrió. Trescientos años de "aquí no se corre" y resulta que la caja siempre supo correr: solo necesitaba a alguien que la quisiera lo bastante para abrirle una puerta sin romperla. Durak llora y dice que es el polvo de tiza.

**B — Ganar a los elfos corriendo. Vencer a Faelas en su juego.** *(correr; requiere `ganasteAFaelasCorriendo` o `correr` alto)*
*Tirada: AG (4+). Con riesgo. Esprintar repite.*
- **Éxito:** → `fama:28`, gol, `rel:{aficion:3}`, `correr↑`, flag `campeon`, `ganasteElCaliz`, `ganasteCorriendo`
> Rompes la caja y corres contra los elfos en su propio juego, el enano imposible que corre como ellos, y les ganas la carrera en la final porque tú corres por trescientos años de que te dijeran que no. Cruzas. Campeones. Le has demostrado al mundo que un enano puede ser un elfo y ganarle. Y en la celebración, mientras Baraz-Ankor ruge, buscas a Durak con la mirada y no lo encuentras enseguida: está en el vestuario, solo, guardando una tiza. Ganaste. A tu manera. No a la suya.

**C — Con Faelas, si se quedó: enano y elfo, la jugada del cruce.** *(requiere `faelasSeQueda`)*
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:30`, gol, `rel:{faelas:3, aficion:3}`, flag `campeon`, `ganasteElCaliz`, `ganasteConFaelas`
> La jugada que Faelas te dibujó en la piedra hace una vida, la del cruce por fuera de la caja, ejecutada por fin: él y tú, elfo y enano, los dos raros, cruzándoos delante de las Hojas de la corte que rechazaron a Faelas por jugar con enanos. Cruzas tú, o cruza él, da igual: cruzáis los raros. Campeones. Los dos exiliados, campeones contra las dos casas que no los quisieron. Faelas llora, que en un elfo es agua de otra clase.

**D — La caja pura. Ganar como Durak, sin correr un solo paso.** *(caja pura; requiere `rechazasteLaViuda` y `caja` alto)*
*Tirada: FU (5+). Con riesgo bajo.*
- **Éxito:** → `fama:26`, gol, `rel:{durak:3, club:3}`, flag `campeon`, `ganasteElCaliz`, `ganasteEnLaCaja`, `nuncaCorriste`
> No corres. Ni una vez. Formas la caja de Durak, la de siempre, la de trescientos años, y avanzáis una casilla por turno contra los elfos más rápidos del mundo, ocho turnos, sin abrir, sin correr, sin ceder, hasta que los elfos se estrellan contra vuestras esquinas y se quedan sin gente. Cruzáis en el turno dieciséis, andando, protegidos, enanos. Campeones sin correr. El corredor más rápido de la montaña ganó el Cáliz sin dar un solo paso rápido. Es la victoria de Durak. Se la regalas. Es tuya y es suya.

**E — [rama B] Contra los Cascos: ganar a tu propia gente.** *(si `finalContraLosTuyos`)*
→ ver variante rama B: la final es Grifos contra Cascos; ganar es traición doble, perder es volver a casa. Flag `venciseALosTuyosDosVeces` o `perdisteContraCasa`.

*Deja para después (el eje resuelto de formas distintas): `síntesis` (A) es la respuesta que el libro propone —la caja que corre—. `ganasteCorriendo` (B) gana pero deja a Durak solo. `ganasteConFaelas` (C) une a los dos raros. `ganasteEnLaCaja` (D) es la renuncia total a tu don por los tuyos. Cuatro victorias, cuatro enanos distintos. Se leen en el cap 7.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `síntesis` (la caja corrió):]**
> Campeones de Primera con una caja que corre, la primera en trescientos años, dibujada por el corredor que querían meter en ella. Has resuelto la pregunta imposible: no eras ni el que corre ni el que entra en la caja. Eras el que le enseñó a la caja a correr sin dejar de ser la caja. Durak guarda la tiza y no dice nada, pero antes de irse dibuja, en la esquina de la pizarra, una casilla con una puerta. Para que no se olvide.

**[si `ganasteEnLaCaja` (nunca corriste):]**
> El corredor más rápido de la montaña ganó el Cáliz sin correr un paso. Renunciaste a lo único que te hacía único para ganar como los tuyos, con los tuyos, siendo de los tuyos del todo. Durak te abraza, que no lo hace nunca. Y esa noche, solo, en la galería, corres una vez, en la oscuridad, sin que nadie te vea, por si se te olvida cómo. No se te olvida. Pero ya no hace falta que nadie lo sepa.

**[si `ganasteCorriendo`:]**
> Campeones, corriendo, a la manera que quisiste desde el primer día. Le ganaste a los elfos siendo mejor elfo que ellos. Y Durak guardó su tiza en silencio, porque ganasteis, sí, pero no como él soñó, sino como soñabas tú. A veces ganar tu sueño cuesta el de otro. Lo sabes. Corres igual.

---

### Notas de diseño del capítulo

- **La jugada clave tiene 4-5 opciones de fuentes distintas** (biblia 17.7): A (síntesis del eje + caja abierta), B (correr + habilidad), C (relación Faelas), D (caja pura + Viuda rechazada), E (rama B). ✓✓
- **La pregunta del libro se resuelve** de cuatro formas, ninguna "correcta": la caja que corre (síntesis), correr puro (dejas a Durak), con Faelas (los raros unidos), la caja pura (renuncias a tu don). ✓
- **El arco de Faelas cierra:** enfrente, contigo, o sin cerrar. ✓ (biblia 17.8, espejo)
- **Sin castigo moral:** ganar corriendo o con La Viuda no es "malo", es distinto. El jugador juzga. ✓
- **La acumulación se lee:** eje Correr↔Caja (todas las opciones), Faelas, la Viuda, la tiza, capitanía. ✓
- **Reconvergencia de rama B** (final contra los Cascos). ✓
- **Fotografía** por forma de victoria. ✓
