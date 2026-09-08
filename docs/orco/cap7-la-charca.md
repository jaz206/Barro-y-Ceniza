# Barro y Ceniza — Orco
## Capítulo 7 — La charca
### *Primera División. Lo que dura una banda.*

Prosa final. Sigue la biblia y el documento de raza del orco. Heredado de `orcoguion.md`.

**Función del capítulo:** después. Qué queda. Aquí se cobran los cuatro ejes en los cuatro finales, con el **modelo fuerte** (biblia 18.3): los finales que no te has ganado **no aparecen**. El cesto del río cierra el espejo. Cuatro escenas.

**El cuerpo** (biblia 12.4): roto de uso. Cargas heridas de seis capítulos. Te duele comer. Un orco al que le duele comer sabe que le queda poco de campo.

---

## Escena 1 — Lo que vino después

*[si `tumbasteAKrug`:]* Tumbaste a Rey Krug en la pata de atrás delante de su charca. La noticia sube y baja por los ríos: un cesto volvió y tiró al rey. En veinte charcas, cuando tiran una cría al agua, alguien dice "acuérdate del que volvió".
*[si `teUnisteALaCharca`:]* Ganaste el Cáliz al lado de Krug, subido a su elefante muerto. Eres de Gorgomor ahora. Comes primero. La charca que te tiró te llama de los suyos, y es raro cuánto se parece eso a lo que querías y cuánto no.
*[si `perdisteElCaliz`:]* No ganaste el Cáliz, pero fuiste de frente a por el rey delante de todos, y eso, en la charca, se cuenta más que muchas victorias.

Han pasado los años. Primera División desgasta: cada domingo cuesta más levantarse el lunes.

*[si `vendisteAGrimgutz`:]* El troll no está. Lo vendiste hace tiempo. A veces, camino del campo, rodeas un hueco bajo un puente por costumbre.
*[si `snotligVivo` implícito y `snotligMitad`:]* Snotlig sigue a tu derecha, más lento, contando goblins cada noche, y le sale una cuenta cada vez más corta.

Te duele comer. Sabes lo que significa.

**Opciones:**

**A — Buscar una cría. Enseñar a la banda que viene.**
→ `Honor:2`, `rel:{banda:2}`, flag `buscasteCria`
> Empiezas a mirar los ríos. No para jugar: para pescar. En la charca se tiran crías al agua cada temporada, las más pequeñas, como te tiraron a ti. Piensas que a lo mejor una de esas cuenta. A lo mejor una de esas vuelve.

**B — Seguir jugando. Aunque duela. De frente, siempre.**
→ `Ferocidad:1`, `Voluntad:1`, flag `seguisteJugando`
> No sabes parar. Sales cada domingo, más lento, más roto, yendo de frente contra cosas que ya no caen tan fácil. Un orco que no sabe retirarse dura hasta que algo grande le da a él en la pata de atrás. Es como se van los orcos. No es mal sitio.

**C — Contar los cascos. Los doce, y los que faltan.**
→ `Voluntad:2`, `rel:{snotlig:1}`, flag `contasteLosCascos`
> Cuentas los doce cascos del cinturón, uno por cada equipo que Snotlig desvalijó antes de pescarte. Y cuentas los huecos: Grot, Wazzok, los goblins que se quedaron por el camino. Una banda son los que están y los que faltan, sumados. La tuya suma mucho.

*Deja para después: prepara la escena del cesto (A) y el retiro (C). `seguisteJugando` abre el final "un partido más".*

---

## Escena 2 — Los cincuenta años de un goblin

*Escena de relación. El retiro de Snotlig. En clave orca: ternura seca.*

Snotlig cumple cincuenta años, que para un goblin es imposible: los goblins no llegan a cincuenta, se los come algo antes. El tuyo ha llegado, escondido detrás de un orco grande toda la vida. Una noche, junto al río, se quita el cinturón de los doce cascos —o lo que le quede de él— y lo cuelga en el puente viejo, donde os conocisteis.

"Ya está", dice. "Cincuenta años robando cascos. Ya no me agacho tan rápido".

*[si `snotligMitad` (mandáis los dos):]* "La banda la hicimos los dos. Cuídala tú, que yo ya cuento despacio".
*[si `eresElJefe` (le quitaste la banda):]* "La banda es tuya desde hace tiempo. Solo quería colgar los cascos donde empezó todo, antes de que se me olvide dónde empezó".

**Opciones:**

**A — Colgar tu casco al lado del suyo. Cerrar el cinturón.**
→ `Honor:2`, `rel:{snotlig:3, banda:2}`, flag `colgasteTuCasco`, `snotligHonrado`
> Cuelgas tu casco al lado de los doce de Snotlig, en el puente viejo. Trece cascos donde empezó una banda que no debía existir: un goblin y un cesto. No decís nada más. Los goblins, uno a uno, cuelgan el suyo también. El puente se llena de cascos. Es lo más parecido a un monumento que tendrá la charca, y lo ha hecho gente que no sabe esa palabra.

**B — Decirle que juegue un domingo más. Contigo. El último.**
→ `rel:{snotlig:2, banda:1}`, flag `snotligUnDomingoMas`
> "Un domingo más", le dices. "A mi derecha. Como siempre". Snotlig se lo piensa, se pone el cinturón otra vez, y juega su último partido a tu derecha, agachándose despacio, contando goblins entre jugada y jugada. Ganáis o perdéis, da igual. Ese domingo no cuenta en la tabla. Cuenta en otro sitio.

**C — Darle a Snotlig la cría que has pescado. Que críe él al siguiente.** *(requiere `buscasteCria`)*
→ `Honor:1`, `rel:{snotlig:3}`, flag `snotligCriaAlSiguiente`, `elCicloSigue`
> Le pones en los brazos un cesto con una cría de orco que pescaste del río, la más pequeña de veinte. "Tú sabes hacer esto", le dices. "A mí me salió bien". Snotlig mira a la cría, que le muerde un dedo, y se ríe con la mano sangrando, igual que el primer día. "Este cuenta", dice. El ciclo tiene quien lo siga.

*Deja para después: `snotligHonrado` y `snotligUnDomingoMas` cierran el vínculo de origen. `snotligCriaAlSiguiente` enlaza directo con el cesto (escena 4). Ternura seca: nadie dice "gracias por sacarme del río". Se cuelga un casco al lado del suyo.*

---

## Escena 3 — El último domingo

**Partido: según ruta.** *[si `skabnikConLosCuatroDedos` y no lo recuperaste: los Cuatro Dedos, con Skabnik girando hacia ti una última vez.] [si no: un rival de Primera cualquiera, que ya no importa quién.]*

Tu último partido. No decide nada: ni liga, ni Cáliz, ni charca. Solo tú, el barro, y un cuerpo que ya no responde de frente como respondía. Los goblins lo saben. Grimgutz, si lo tienes, lo sabe. Snotlig, si juega, lo sabe.

*[si `buscasteCria`:]* En la banda, mirando desde la línea, hay un cesto con una cría dentro, aprendiendo cómo se dice adiós.
*[si `tumbasteAKrug`:]* Un orco joven del otro equipo te reconoce: "Mi jefe dice que tú tiraste a Rey Krug". Te haces viejo cuando tus golpes los cuentan los jóvenes de otros.

**Opciones:**

**A — Una última carga. De frente. En la pata de atrás, por vieja costumbre.**
*Tirada: FU (4+, con la bajada por edad). Con riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{banda:2}`, flag `ultimaCarga`
> Vas de frente una última vez, contra lo más grande que hay enfrente, y le das donde has dado toda la vida: en la pata de atrás. Cae. Cruzas despacio, porque ya no hay prisa, y te tumbas en la zona de anotación mirando el cielo de la charca. Un buen sitio. Un buen último golpe.
- **Fallo:** → `Voluntad:2`, flag `caisteDeFrente`
> Vas de frente y esta vez no cae: caes tú, sin que nadie te dé, solo de viejo. Te levantas despacio. Sonríes. Al menos fue de frente, que es como querías irte del barro.

**B — Dar la bola al goblin más pequeño. Que cruce él.** *(suma Banda)*
→ `Honor:2`, gol, `rel:{banda:3}`, flag `cruzoElPequeño`
> No cruzas tú. Le das la bola al goblin más pequeño de la banda, el que llegó el último, el que era como eras tú, y le abres el hueco de frente. Cruza él su primer tanto mientras tú aguantas atrás, respirando. Tu último acto en el barro es hacer cruzar a un pequeño. No hay mejor manera de irse para un cesto que volvió.

**C — Sentarte en el barro y mirar. Ya has jugado bastante.**
→ `Voluntad:1`, `rel:{banda:1}`, flag `teSentasteAMirar`
> Te sientas en el barro a media jugada y miras jugar a tu banda sin ti. Corren, muerden, se sientan encima de la gente, cuentan. No te necesitan, y eso, que debería doler, es lo mejor que has hecho: una banda que dura sin ti. El árbitro no sabe si pitarte. No le pitas nada. Ya está.

---

## Escena 4 — El cesto

*El cierre. El espejo del cap 1. Los cuatro finales condicionados por los ejes — modelo fuerte (biblia 18.3): solo aparecen los que te has ganado.*

Se acabó el barro. Vas al río donde empezó todo, donde un cesto se enganchó en una raíz hace una vida. El agua baja igual que entonces. Y engancha en la raíz, otra vez, un cesto. Dentro, la más pequeña de una camada de veinte, tirada por la charca por no valer. Te mira. No muerde: todavía no sabe.

Tienes que decidir qué haces con lo que has construido. Y lo que puedes hacer depende de todo lo que hiciste.

**— Ser Jefe Supremo hasta que te coman.** *(solo si Banda→Charca alto Y `eresElJefe` / Jefe alto)*
> Coges a la cría, la subes a tu charca —la que ahora mandas tú, porque tumbaste o sustituiste a Krug— y la crías para que un día te tire a ti al río, que es como funcionan las charcas. Eres Jefe Supremo. Comes primero. Y sabes, mientras miras a la cría morder, que le estás enseñando a hacerte lo que tú le hiciste a Krug. Es lo que se hace. Dura hasta que deja de durar.

**— Volver al puente. Que la banda la mande otro. Tú, con Grimgutz.** *(solo si Banda alto Y Grimgutz vivo y no vendido)*
> Dejas la banda en manos de Snotlig, o de Zig, o de quien sepa contar. Coges a la cría del cesto y te vuelves al puente viejo, con Grimgutz, a mirar la mosca. La cría crece entre un orco retirado y un troll que mira el río. No será jefe de nada. Será feliz, que es más raro en la charca que ser jefe. Los trece cascos cuelgan sobre vuestras cabezas.

**— Montar un circo de goblins. Que la Cristalvisión pague por verlos girar.** *(solo si Deuda con Ma Gorka alto O Ambición alto)*
> Ma Gorka tiene un plan, como siempre: un espectáculo. Goblins que giran, un troll que se sienta, un orco que tumbó a un rey. La Cristalvisión paga por verlo. Ganáis más oro del que visteis nunca. La cría crece entre focos, aprendiendo a hacer el número. No es una banda. Es un negocio. Pero comen todos, todos los días, y en la charca eso no es poco. Ma Gorka cuenta el oro. Tú cuentas los goblins. Cada uno cuenta lo suyo.

**— Un partido más. De frente. Contra quien sea.** *(solo si `seguisteJugando` Y Banda entera alto Y cuerpo roto)*
> No sabes parar. Dejas la cría con Snotlig, que sabe criar cestos, y vuelves al barro un domingo más, y otro, hasta que un domingo algo grande te da a ti en la pata de atrás y caes de frente, como caíste siempre encima de todo. Te entierran con tu casco, al lado del de Grot, con los goblins dejando piedras y Grimgutz haciendo el hoyo de un manotazo. No es un final triste. Es el único que un orco de frente sabe tener.

**[Cierre común, tras cualquier final]**
> El río sigue bajando. Seguirá bajando cuando tú ya no estés. Y cada temporada traerá un cesto con algo pequeño dentro que la charca no quiso. La diferencia, ahora, es que alguien lo pesca. Alguien cuenta. "Este cuenta", dijo un goblin junto a este río hace una vida, con la mano sangrando. Tenía razón. Casi siempre la tenía.

→ flag `cerrasteElCiclo`. *Sin opciones tras elegir el final.*

---

### Notas de diseño del capítulo

- **Los cuatro finales están condicionados por ejes (modelo fuerte, biblia 18.3):** solo aparecen los que te has ganado. Jefe Supremo (Banda→Charca + Jefe), volver al puente (Banda + Grimgutz vivo), circo (Deuda/Ambición), un partido más (Banda entera + cuerpo roto). Si no cumples ninguno limpio, cae al más cercano. Nunca es un menú libre. ✓✓
- **El espejo se cierra del todo:** el cesto del río (cap 1) vuelve con otra cría dentro, y ahora alguien la pesca. ✓ (biblia 17.8)
- **"Este cuenta" cierra el libro:** la primera frase buena que un goblin dijo de ti (cap 1) es la última del libro. ✓
- **Ternura seca hasta el final:** colgar el casco al lado del de Snotlig, dar la bola al pequeño, el hueco de Grimgutz. Nadie nombra el sentimiento. ✓
- **El retiro lee la acumulación:** Grimgutz (vendido o no), Snotlig (mitad o jefe), la deuda, la banda entera, el resultado del Cáliz, la cría. Seis capítulos leídos. ✓
- **Sin castigo moral:** el final del circo y el de Jefe Supremo no son "peores", son distintos. El jugador juzga. ✓
- **12 opciones + los 4 finales.** ✓
- **El cuerpo roto de uso**, no de viejo, coherente con biblia 12.3-12.4. ✓
