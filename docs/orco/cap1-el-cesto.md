# Barro y Ceniza — Orco
## Capítulo 1 — El cesto
### *Sin división, sin campo, sin nombre*

Prosa final. Sigue `biblia-sistema.md` y el documento de raza del orco (voz staccato, ternura seca en actos brutales, el motivo de "la pata de atrás"). Heredado y ampliado de `orcoguion.md`.

**Función del capítulo:** origen. El río, los goblins que te crían, aprender a rugir. Enseña que las decisiones dejan huella. Cuatro escenas.

**Ficha de debut** (biblia 5.1): eres una cría, de tres días a siete años. 5/2/4+/5+/9+, sin habilidades de puesto. Creces cuando dejas de ser el pequeño.

**Modelo de rejugabilidad:** acumulación (biblia 18.3). Las decisiones mueven cuatro ejes: Banda↔Charca, Jefe↔Igual, Deuda↔Libre, Banda entera↔Solo. Este capítulo siembra los tres primeros.

---

## Escena 1 — El río

Tienes tres días y un cesto. La charca de Gorgomor te ha tirado al río porque eres el más pequeño de veinte, y las charcas no crían pequeños: los tiran. El cesto se engancha en una raíz. Desde la orilla, cinco goblins con cascos robados te miran como se mira la comida. Uno, con un casco humano que le tapa los ojos, dice: "Muerde".

Muerdes al primero que se acerca. Es Snotlig. Se ríe con la mano sangrando.

**Opciones:**

**A — Seguir mordiendo hasta que te suelten.**
→ `Ferocidad:2`, flag `mordisteATres`
> Muerdes a tres. Snotlig decide que un orco que muerde a tres goblins a los tres días vale más que un guiso. Te llevan al cesto de los cascos. Eres el sexto.

**B — Dejar de morder y mirar. Contar cuántos son.**
→ `Astucia:2`, `rel:{snotlig:1}`, flag `contasteDesdeElCesto`
> Cuentas cinco. Snotlig te ve contar. "Este cuenta", dice. Es la primera vez que un goblin dice algo bueno de un orco. Te llevan al cesto de los cascos como se lleva un tesoro.

**C — Comerte el casco humano del que te tapa los ojos.**
→ `Ferocidad:1`, `Ambición:1`, flag `comisteMetal`
> Te comes medio casco. Snotlig se lo apunta: un orco que come metal a los tres días. "Va a crecer", dice. Aciertas. Aciertan.

*Deja para después: `contasteDesdeElCesto` es el germen del eje Banda —Snotlig te elige por listo, no por bruto— y su "este cuenta" vuelve en cada capítulo. `comisteMetal` / `mordisteATres` marcan al orco que crece por fuerza, no por cabeza. La raíz del río es el objeto-espejo (biblia 5): vuelve en el cap 7 con otra cría dentro.*

---

## Escena 2 — El jefe de los goblins

Snotlig es el jefe de los cinco goblins y lleva doce cascos robados colgados del cinturón, uno por cada equipo de Sexta al que ha desvalijado. Viven bajo un puente, de robar equipamiento y venderlo a Ma Gorka, la ogra de la taberna. Te cría con lo que sobra. Creces igual: los orcos crecen con lo que hay.

A los cinco años ya eres más grande que él, y Snotlig lo nota antes que tú.

**Opciones:**

**A — Seguir obedeciendo a Snotlig. Es tu jefe.**
→ `rel:{snotlig:2}`, `Honor:1`, flag `obedecesteASnotlig`
> Obedeces. Snotlig te enseña a robar un casco sin que el dueño se despierte, a contar goblins y a no comerte a los tuyos. Es lo más parecido a un padre que tendrá un orco.

**B — Hacerle saber que ya eres más grande. Sin pegarle.** *(requiere Ferocidad 2; forzable)*
→ `Ferocidad:1`, `rel:{snotlig:-1}`, flag `leSacasteUnaCabeza`
> Te pones de pie a su lado. Le sacas una cabeza. Snotlig lo ve y no dice nada. Los otros cuatro goblins lo ven también, y desde ese día te miran a ti antes de mirarle a él. Snotlig lo sabe. Empieza a dormir lejos.

**C — Proponerle un trato: tú creces, él manda. Los dos comemos.** *(requiere Astucia 2; forzable)*
→ `Astucia:2`, `rel:{snotlig:1}`, flag `tratasteConSnotlig`
> Snotlig lo piensa. "Trato", dice, y escupe. Es la primera negociación de tu vida y la haces con un goblin. Aprendes que un jefe que piensa dura más que uno que muerde.

*Deja para después (eje Jefe↔Igual): `obedecesteASnotlig` y `tratasteConSnotlig` suman Igual (respetas a quien te crió). `leSacasteUnaCabeza` suma Jefe (te impones). Es la primera vez que se toca el eje que decide, en el cap 4, cómo te cobras la banda con Snotlig, y en el cap 7 si le das el cinturón.*

---

## Escena 3 — Los cascos de los Charcos

**Partido: Los Charcos de Grünburg** *(humanos de Sexta, fuerza 1; tu primer partido, sin árbitro, con una vaca)*

Los Charcos de Grünburg, humanos de Sexta, tienen once cascos nuevos y un granero sin cerrojo. Snotlig quiere robarlos. Tú quieres otra cosa: retarles. "Si ganáis, os quedáis los cascos". Los humanos se ríen: cinco goblins y un orco de siete años contra once campesinos. Aceptan por reírse.

Es tu primer partido. No hay árbitro. Hay una vaca. Snotlig juega porque los otros cuatro ya están en el campo.

**Opciones:**

**A — Ir a por el más grande de los humanos. Que vean lo que muerde el pequeño.**
*Tirada: FU (4+, según fuerza rival). Con riesgo.*
- **Éxito:** → `fama:6`, `Ferocidad:1`, gol, `rel:{banda:2}`, flag `ganasteRetando`, `deFrenteDesdeNino`
> Vas a por un campesino de cien kilos que se llama Hans. Cae. Los otros diez humanos se paran a mirar, y en ese rato cinco goblins con cascos robados anotan por cinco sitios. Ganáis. Os lleváis los cascos y la vaca os sigue un rato.
- **Fallo (riesgo):** → derrota, `rel:{snotlig:-1}`, flag `snotligRoboIgual`
> Vas a por Hans y Hans, cien kilos, no cae. Te sienta encima. Los humanos anotan mientras te sacan de debajo. Perdéis. Snotlig roba los cascos esa noche igual, y no te lo perdona: "Para esto no hacía falta jugar".

**B — Que los goblins corran y tú te quedes en medio, quieto, tapando.**
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:5`, `Astucia:1`, gol, `rel:{banda:2}`, flag `ganasteRetando`
> Te plantas en medio del campo y once humanos chocan contigo por turnos porque no saben por dónde pasar. Los goblins corren alrededor con la bola. Anotan tres. Ganáis. Hans, al acabar, te da la mano: "Raro". Os lleváis los cascos.
- **Fallo (riesgo):** → derrota, flag `snotligRoboIgual`
> Te plantas y los humanos te rodean, que es lo que hacen once contra uno. Los goblins corren sin bola. Perdéis. Snotlig roba los cascos esa noche. Tú aprendes que plantarse solo vale si hay alguien alrededor.

*Deja para después: `ganasteRetando` es la primera vez que consigues algo jugando en vez de robando —germen del eje Banda, y la razón de que Ma Gorka acabe apostando por ti—. `deFrenteDesdeNino` marca al orco que va de frente, que remata en Krug (el motivo de la pata de atrás). `snotligRoboIgual` es la carga: Snotlig no ve para qué jugar si se roba igual, tensión que vuelve.*

---

## Escena 4 — Aprender a rugir

Los orcos rugen. Tú, criado por goblins, chillas. Snotlig lo sabe y te lleva de noche a la orilla de la charca de Gorgomor, la que te tiró al río, a oír rugir a los jefes desde lejos. Rey Krug, Jefe Supremo, ruge desde su elefante muerto y la charca entera se agacha.

"Prueba", dice Snotlig.

**Opciones:**

**A — Rugir. Con lo que hay.**
*Tirada: FU (4+). Sin riesgo.*
- **Éxito:** → `Ferocidad:1`, `fama:3`, flag `aprendisteARugir`
> Ruges. Sale un ruido que no es de goblin ni de orco: es tuyo. En la charca, tres crías se agachan sin saber por qué. Snotlig se tapa los oídos y sonríe. "Va a crecer".
- **Fallo:** → flag `todaviaChillas`
> Ruges. Sale un chillido. Desde el elefante, Rey Krug se gira y mira hacia la orilla, y no ve nada, y se ríe con la boca llena. Snotlig te saca de allí a rastras. "Otro día".

**B — No rugir. Mirar cómo se agacha la charca y aprender por qué.**
→ `Astucia:2`, `rel:{snotlig:1}`, flag `mirasteAKrug`
> Miras. La charca se agacha porque Krug come primero y pega segundo, en ese orden. Lo apuntas donde apuntan los orcos: en el estómago. Snotlig te mira mirar. "Este cuenta", repite.

**C — Rugirle a Snotlig. A ver quién se agacha.**
→ `Ferocidad:1`, `rel:{snotlig:-1}`, flag `rugisteASnotlig`
> Le ruges a un goblin en la oscuridad. Se agacha. No por el ruido: por lo que viene después. Desde esa noche, la banda es tuya y Snotlig es tu segundo, y los dos sabéis que un día se lo cobrará.

*Deja para después (eje Banda↔Charca): `aprendisteARugir` y `mirasteAKrug` son las dos formas de empezar a medirte con Krug —la némesis— y ambas se leen en el cap 6 (el elefante, el rugido en Gorgomor). `mirasteAKrug` además suma Astucia y el "este cuenta" que te define. `rugisteASnotlig` suma Jefe y siembra que Snotlig "se lo cobrará", que estalla en el cap 4.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4: un párrafo según lo más alto. Aquí, según cómo te crió la banda.*

**[si `contasteDesdeElCesto` o `mirasteAKrug` — el que cuenta:]**
> Snotlig te mira dormir en el cesto de los cascos, el sexto de una banda de cinco, y cuenta en voz baja: uno, dos, tres, cuatro, cinco, y tú. "Este cuenta", le dice al río, que no contesta. Un orco que cuenta es un orco raro. Los raros duran más.

**[si `leSacasteUnaCabeza` o `rugisteASnotlig` — el que se impone:]**
> Snotlig duerme lejos esta noche, con los doce cascos puestos por si acaso. No de frío. De ti. Le sacas una cabeza y subiendo, y los dos sabéis lo que eso significa en una charca: que un día uno de los dos manda del todo. Todavía no. Pero duerme lejos.

**[si nada destaca:]**
> Otra noche bajo el puente, apretados contra el frío, cinco goblins y una cría de orco que ya no cabe en el cesto. Creces con lo que hay. Es poco. En la charca, poco es empezar.

---

### Notas de diseño del capítulo

- **11 opciones** en 4 escenas. Un pelín bajo el 12-18 de la biblia (13.1), pero el cap 1 orco es corto y de origen, como el del halfling. Aceptable; si al leer se siente escaso, se añade una escena (robar el primer casco con Snotlig).
- **Con tirada:** el partido (2) y rugir (1). ✓ del tercio.
- **Con riesgo:** partido A y B (2). ✓
- **Con requisito:** hacerle saber a Snotlig (Ferocidad 2), el trato (Astucia 2). ✓
- **Opción que solo caracteriza:** mirar a Krug en vez de rugir (4B) define al orco que piensa, no da ventaja de partido. ✓
- **Ejes sembrados:** Banda↔Charca (rugir/mirar a Krug), Jefe↔Igual (Snotlig), y el germen de Banda entera (la banda de goblins). ✓
- **Voz:** staccato heredado del guion. La ternura seca aparece en la fotografía ("este cuenta", "duerme lejos"). El motivo de la pata de atrás aún no; entra en el cap 2 con los jabalíes.
- **Fotografía de cierre** con variantes por eje. ✓
