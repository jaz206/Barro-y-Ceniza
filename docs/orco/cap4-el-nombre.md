# Barro y Ceniza — Orco
## Capítulo 4 — El nombre
### *Quinta División. Ya no sois un hueco en la pizarra.*

Prosa final. Sigue la biblia y el documento de raza del orco. Heredado de `orcoguion.md`.

**Función del capítulo:** en el modelo de acumulación (biblia 18.3), el orco no tiene un cruce único. Este capítulo es donde se **decide el eje Jefe↔Igual** (Snotlig se cobra quién manda) y donde cae la primera muerte de la banda (Grot). Cinco escenas.

**Ascenso:** ganáis Sexta y subís a Quinta. Ya no sois "Da Banda (sin nombre)". Toca nombre. Toca decidir qué clase de banda sois, no de una vez, sino en las cosas que eliges aquí.

---

## Tardes libres *(elige 2)*

- **Cazar jabalíes en la pata de atrás.** → `stat:{FU:1}`, flag `laPataDeAtras`.
- **Mirar la mosca con Grimgutz.** → `rel:{grimgutz:2}`. *(requiere `fichasteAGrimgutz`)*
- **Leer la pared de Ma Gorka: quién sube, quién baja.** → `Astucia:1, rel:{maGorka:1}`.
- **Rugir en la orilla de Gorgomor. Que empiecen a oírte.** → `Ferocidad:1`, flag `rugisteEnLaOrilla`. "Ruges donde te tiraron. Nadie contesta. Todavía."
- **Enseñar a los goblins a caer sin romperse.** → `rel:{banda:2}`. "Un goblin que sabe caer dura una temporada más. Se lo debes."

*`rugisteEnLaOrilla` suma al eje Banda↔Charca (empiezas a medirte con Gorgomor) y se lee en el cap 6.*

---

## Escena 1 — El nombre

En Quinta hay que registrar un nombre. El funcionario orco, que odia su trabajo, espera con la pluma. Snotlig quiere "Los Cascos de Snotlig", que es como se ha llamado su banda de goblins treinta años. Los goblins quieren "Los Muerdetobillos". Grimgutz no quiere nada: mira la mosca.

Tú tienes la pluma.

**Opciones:**

**A — "Da Banda". A secas. Lo que sois.**
→ `rel:{banda:2, snotlig:1}`, flag `nombreDaBanda`
> Escribes "Da Banda". Sin apellido, sin dueño. El funcionario pregunta "¿de quién?". "De nadie", dices. "De todos". Snotlig lo oye. No dice nada. Pero esa noche cuelga un casco de más en tu lado del puente.

**B — "Los Cascos de Snotlig". Se lo debes.**
→ `rel:{snotlig:3}`, `Honor:1`, flag `nombreDeSnotlig`, `snotligALaDerecha`
> Escribes el nombre del goblin que te sacó del río. Snotlig se queda mirando la pizarra un rato largo. "La banda la hizo Snotlig", dices al funcionario. Es la primera vez que Snotlig no duerme lejos.

**C — Tu nombre. El del pequeño que creció.** *(requiere Ambición 3; forzable)*
→ `Ambición:2`, `rel:{snotlig:-1, banda:-1}`, flag `nombreTuyo`, `snotligSegundo`
> Escribes tu nombre. Grande, en la pizarra de Quinta, donde toda la charca lo verá. Snotlig lee tu nombre donde debería estar el suyo. "Vale", dice. Solo eso. Y desde ese día es tu segundo, y los dos sabéis que un segundo, en una charca, espera.

*Deja para después (eje Jefe↔Igual, decisión clave del capítulo): `nombreDeSnotlig` y `nombreDaBanda` suman Igual (honras a quien te crió, o a todos). `nombreTuyo` suma Jefe (te pones por encima) y crea `snotligSegundo`, que arma la escena 4 —Snotlig cobrándose la banda—. El nombre gobierna los finales: "Da Banda" o "de Snotlig" abren el final de volver al puente; "tuyo" abre el de Jefe Supremo.*

---

## Escena 2 — Los Cuatro Dedos

**Partido: Los Cuatro Dedos de Grünmark** *(orcos y goblins de Quinta, fuerza 3; los primeros que juegan como vosotros)*

Los Cuatro Dedos son lo que vosotros seríais si fuerais más viejos y más sucios: orcos con goblins, un troll de alquiler, y un fanático nuevo. *[si `skabnikConLosCuatroDedos`:]* Su fanático es Skabnik, el que echaste, que gira hacia ti en cuanto te ve.

Turno cuatro. Es un partido de igual a igual, el primero, y se nota: pegan donde tú pegas, muerden donde muerdes.

**Opciones:**

**A — Ir a por su orco grande de frente. En la pata de atrás.** *(mejor si `laPataDeAtras`)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:9`, `Ferocidad:1`, gol, `rel:{banda:2}`, flag `ganasteAIguales`, `deFrente`
> Vas a por su orco grande. Le das en la pata de atrás. Cae, y cae uno de los suyos, no un jabalí, no un halfling: un orco de Quinta, delante de todos. Los Cuatro Dedos aprenden lo que Gorgomor aprenderá tarde: el pequeño va de frente. Ganáis.
- **Fallo (riesgo):** → derrota, cadena de daño
> Vas de frente y su orco también sabe lo de la pata de atrás, porque en Quinta todos lo saben. Os dais los dos a la vez. Cae el que pesa menos. Eres tú.

**B — [si Skabnik enemigo] Dejar que su propio fanático los tumbe.** *(requiere `skabnikConLosCuatroDedos`)*
*Tirada: AG (3+, agacharse). Sin riesgo.*
- **Éxito:** → `fama:8`, `Astucia:2`, gol, flag `ganasteAIguales`, `skabnikVolvio`
> Te agachas cuando Skabnik gira hacia ti —llevas años practicando agacharte— y Skabnik, que no puede parar, sigue girando hacia los suyos. Tumba a dos Cuatro Dedos. Ganáis con su propia arma. Skabnik, en el suelo, te mira: se acuerda de quién le acortó o le echó.
- **Fallo:** → gol rival

**C — Que Grimgutz se siente en su troll de alquiler.** *(requiere `fichasteAGrimgutz`)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{grimgutz:1}`, flag `ganasteAIguales`
> Grimgutz se sienta encima del troll de alquiler, que no ha cobrado suficiente para esto y se rinde. Dos trolls sentados en el barro, uno encima del otro. Los goblins anotan alrededor. Ganáis. El troll de alquiler no vuelve a Quinta.
- **Fallo (riesgo):** → gol rival, `rel:{grimgutz:-1}`

*Deja para después: `ganasteAIguales` es la primera victoria contra un equipo como el tuyo —confirma que Da Banda es de verdad—. `skabnikVolvio` cierra un hilo del cap 3. `deFrente` sigue alimentando el motivo de la pata de atrás.*

---

## Escena 3 — El domingo que muere Grot

*La muerte de la banda. En clave orca: sin drama, con silencio.*

**Partido en curso: los Cuatro Dedos, segunda parte** *(o rival de Quinta según ruta)*

Grot es el goblin más pequeño de la banda, el que siempre corre último y llega igual. En una jugada cualquiera, sin importancia, en un partido que ya vais ganando, un orco de los Cuatro Dedos le entra a Grot por detrás y Grot no se levanta. No hay sangre de más. No hay grito. Grot, simplemente, se queda.

El partido se para. Los goblins miran. Grimgutz mira. Snotlig cuenta, y le sale uno menos, de verdad esta vez.

**Opciones:**

**A — Ir a por el que lo hizo. Ahora. En la pata de atrás.**
*Tirada: FU (4+). Con riesgo. Falta: doble en armadura = expulsión (biblia 17.5).*
- **Éxito:** → `Ferocidad:2`, `rel:{banda:3}`, flag `grotVengado`, `grotHonrado`
> Vas a por él. No corres: caminas, que da más miedo. Le das en la pata de atrás y cae, y le das otra vez donde ya no hace falta. El árbitro no pita: tiene ojos. La banda ve que a un goblin de Da Banda no se le toca gratis. Grot se entierra vengado.
- **Fallo (riesgo):** → cadena de daño, `grotHonrado`
> Vas a por él y su banda entera se pone en medio, porque saben lo que vienes a hacer. Te dan entre cuatro. No lo alcanzas. Pero lo intentaste delante de todos, y eso, para la banda, cuenta casi igual.

**B — Recoger a Grot y seguir jugando. Ganar por él.**
→ `Honor:2`, `Voluntad:1`, `rel:{banda:2}`, flag `grotHonrado`, `ganasteParaGrot`
> Recoges a Grot tú mismo, lo dejas en la banda con su casco puesto, y vuelves al campo. No vengas: ganas. Cada tanto que metéis a partir de ahí es por Grot. Ganáis por mucho. Es otra forma de enterrarlo, y algunos dicen que mejor.

**C — Parar el partido. Enterrarlo ahora, con su casco.**
→ `Honor:1`, `rel:{banda:1, snotlig:2}`, flag `grotHonrado`, `parasteParaEnterrar`
> Paras el partido. Un orco parando un partido de Quinta por un goblin muerto. El árbitro no sabe qué hacer. Enterráis a Grot al lado del campo, con su casco, con los goblins alrededor y Grimgutz haciendo el hoyo de un manotazo. Perdéis el partido por retirada. Ganáis otra cosa.

*Deja para después (eje Banda entera↔Solo, y cómo honras a los muertos): `grotHonrado` (en cualquiera de las tres) se lee en el cap 6 (contar los goblins antes del Cáliz) y en el cap 7. La muerte de Grot es la primera de la banda y la voz la trata en seco: "se queda". Ninguna opción la convierte en chiste. Es el respeto que la biblia pide a los muertos de la banda.*

---

## Escena 4 — Lo que se cobra un goblin

*Escena de relación. El eje Jefe↔Igual se cierra. Depende de `snotligSegundo` / el nombre.*

Después de enterrar a Grot, Snotlig te busca de noche, lejos del troll. Lleva los doce cascos puestos. "Treinta años", dice, "hice esta banda con cinco goblins y un cesto que pesqué del río. El cesto eras tú". Deja algo en el suelo entre los dos: el cinturón de los doce cascos.

*[si `snotligSegundo` (le quitaste el nombre):]* "Ahora es tuya. Siempre lo fue, desde que creciste. Solo quería oírtelo decir".
*[si `nombreDeSnotlig` o `nombreDaBanda`:]* "No te la doy. Te la presto. Cuídala. Yo ya estoy viejo para contar tan alto".

**Opciones:**

**A — Coger el cinturón. La banda es tuya.**
→ `Ambición:1`, `rel:{snotlig:-1}`, flag `cogisteElCinturon`, `eresElJefe`
> Coges los doce cascos y te los pones. Pesan. Snotlig te mira ponértelos y por primera vez en su vida un goblin le levanta la vista a un orco por respeto y no por miedo. "Jefe", dice. La palabra le sale rara. A ti también te suena rara oírla.

**B — Devolverle el cinturón. Manda él, creces tú.**
→ `Honor:2`, `rel:{snotlig:3}`, flag `devolvisteElCinturon`, `snotligMitad`
> Le devuelves el cinturón. "La banda la hizo Snotlig. Yo solo crecí". Snotlig se lo vuelve a poner despacio. No dice nada. Pero desde esa noche vuelve a dormir cerca, y en el campo juega a tu derecha, y los dos mandáis, que es raro en una charca y por eso dura.

**C — Partir el cinturón. Seis cascos cada uno.** *(requiere Astucia 3; forzable)*
→ `Astucia:2`, `rel:{snotlig:2, banda:1}`, flag `partisteElCinturon`, `snotligMitad`
> Partes el cinturón en dos. Seis cascos para ti, seis para él. "Medio jefe cada uno", dices. Snotlig se ríe, que en él es toser. Es la solución más goblin que existe: repartir hasta lo que no se reparte. La banda tiene dos jefes y ni un dueño.

*Deja para después (eje Jefe↔Igual, cierre): `eresElJefe` es el extremo Jefe —abre el final de Jefe Supremo, cierra el de volver al puente con Snotlig—. `snotligMitad` (devolver o partir) es el extremo Igual —Snotlig juega a tu derecha el resto del libro, y su retiro en el cap 7 con los cincuenta años es distinto—. Esta es la decisión que más define quién eres para el orco.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `eresElJefe`:]**
> Llevas doce cascos al cinturón y una banda detrás que te llama jefe. Snotlig duerme cerca otra vez, pero distinto: como duerme un segundo, con un ojo abierto. Eres lo que quisiste ser desde el cesto: grande, con los tuyos detrás. En la charca, a los que llegan así, un día se los comen. Pero todavía no.

**[si `snotligMitad`:]**
> Dos jefes, una banda, seis cascos cada uno o los doce prestados. Snotlig juega a tu derecha y cuenta los goblins en voz alta cada noche, y desde que enterrasteis a Grot cuenta uno menos y lo dice igual, para que nadie se olvide. Una banda que recuerda a sus muertos es una banda difícil de comer.

**[si `grotHonrado` y nada más destaca:]**
> Grot está enterrado al lado del campo con su casco puesto. Los goblins pasan por allí antes de cada partido. No dicen nada. Le dejan una piedra. Es lo que hay: en la charca no se llora, se juega el domingo. Pero se deja la piedra.

**[si nada destaca:]**
> Tenéis nombre en la pizarra de Quinta y un goblin menos bajo tierra. Habéis subido y habéis perdido a la vez, que es como se sube en la charca. Nadie dijo que fuera gratis.

---

### Notas de diseño del capítulo

- **13 opciones** (5 escenas). ✓
- **Con tirada:** el partido (3), la venganza de Grot. ✓ del tercio.
- **Con riesgo:** partido A/C, venganza A (2-4). ✓ Con la regla de expulsión por doble en la venganza (biblia 17.5). ✓
- **Con requisito:** nombre tuyo (Ambición 3), Skabnik (flag), Grimgutz (flag), partir cinturón (Astucia 3). ✓
- **Opción que solo caracteriza:** parar el partido para enterrar a Grot (3C) hace perder el partido a propósito: define a la banda sobre el resultado. ✓
- **Eje Jefe↔Igual decidido** en la escena 4, la más importante del capítulo. El nombre (escena 1) lo prepara. ✓
- **La muerte de Grot** tratada en seco, sin chiste, como pide la voz orca. ✓
- **Ascenso a Quinta** marcado. ✓
- **Fotografía** con variantes por eje. ✓
