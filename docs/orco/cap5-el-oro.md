# Barro y Ceniza — Orco
## Capítulo 5 — El oro
### *Cuarta División. Lo que cuesta seguir subiendo.*

Prosa final. Sigue la biblia y el documento de raza del orco. Heredado de `orcoguion.md`.

**Función del capítulo:** consecuencia. La deuda de Ma Gorka baja a cobrar, la decisión de vender a Grimgutz (el eje Deuda↔Libre contra el eje Banda entera↔Solo), la muerte de Wazzok, y el ascenso a Cuarta. Es donde la acumulación empieza a cerrar puertas. Seis escenas.

**Cuarta División** pide apotecario (biblia 3.4, ya disponible), cascos de verdad y más oro del que tenéis. Todo cuesta. Ma Gorka lo sabe.

---

## Tardes libres *(elige 2)*

- **Cazar jabalíes en la pata de atrás.** → `stat:{FU:1}`, flag `laPataDeAtras`.
- **Mirar la mosca con Grimgutz.** → `rel:{grimgutz:2}`. *(requiere `fichasteAGrimgutz` y no `vendisteAGrimgutz`)*
- **Rugir en la orilla de Gorgomor.** → `Ferocidad:1`, flag `rugisteEnLaOrilla`.
- **Contar el oro que le debes a Ma Gorka. Dos veces, por si baja.** → `Astucia:1`. "Cuentas. Sube solo. El doscientos por ciento es un animal que come de noche."
- **Enseñar a los goblins nuevos los nombres de los muertos.** → `rel:{banda:2}`. *(mejor si `grotHonrado`)* "Grot. Y los que vengan. Un goblin que sabe los nombres cuida más la espalda del de al lado."

---

## Escena 1 — Ma Gorka baja a cobrar

Subir a Cuarta cuesta oro que no tienes. Ma Gorka, que lleva apuntándote en la pared desde Sexta, baja en persona a tu campo por primera vez. Tres metros de ogra entre las porterías. "El pequeño ha crecido", dice, "y la deuda también. Es lo que tienen las dos cosas".

*[si `noDebesNada`:]* No le debes nada, y ella lo sabe, y ha bajado igual: "La única banda que no está en mi pared. Eso vale más que el oro. Quiero comprarlo".
*[si `maGorkaApuesta`:]* "Aposté por ti en Sexta. Cien coronas. Ahora valen mil. Vengo a que me hagas ganar, no a que me pagues".
*[si `debesAMaGorka` o `debesLoJusto`:]* Saca la cuenta. Es más de lo que Da Banda ha visto junto en su vida.

**Opciones:**

**A — Pagarle con victorias. Un partido suyo por cada casco.** *(requiere Ambición 2; forzable)*
→ `rel:{maGorka:2}`, flag `pagasConVictorias`
> Le ofreces amañar la cuenta a golpe de partido: ella apuesta, tú ganas, os repartís. Ma Gorka sonríe con toda la cara, que es mucha cara. "Ahora hablas mi idioma". Dejas de deber oro y empiezas a deber victorias, que es una deuda que se paga con el cuerpo.

**B — Darle media banda. Que ella ponga los cascos y se lleve la mitad.**
→ `oro`, `rel:{maGorka:3, banda:-2}`, flag `mediaBandaAMaGorka`, `yaNoEsTuBanda`
> Le das la mitad de todo lo que gane la banda, para siempre. Ma Gorka pone cascos de verdad, un apotecario y oro para Cuarta. Ganáis más que nunca. Pero cuando anotas, miras a la grada y ella asiente, y entiendes que a partir de ahora juegas para alguien. La banda tiene dueña de tres metros.

**C — No deberle nada. Subir a Cuarta con lo que hay.** *(requiere Voluntad 3; forzable)*
→ `Voluntad:2`, `Honor:1`, flag `subisteSinDeber`, `libre`
> Le dices que no. Subís a Cuarta con cascos abollados, sin apotecario, con lo puesto. Es más difícil, se muere más, y cada victoria es entera vuestra. Ma Gorka te borra de la pared con la uña. "Vuelve cuando pierdas". No vuelves.

*Deja para después (eje Deuda↔Libre, el momento decisivo): `mediaBandaAMaGorka` es el extremo Deuda —abre el final del circo, cierra los de independencia, y "juegas para alguien" el resto del libro—. `subisteSinDeber` / `libre` es el extremo Libre —más muertes en Cuarta sin apotecario, pero los finales tuyos—. `pagasConVictorias` es el punto medio con dientes.*

---

## Escena 2 — La oferta por el troll

Un cazador de trolls con levita —trabaja para un circo de Primera, o para otra banda, o para Gorgomor, según quién pregunte— ha visto a Grimgutz sentarse encima de un minotauro y quiere comprarlo. Ofrece oro. Mucho. El suficiente para pagar a Ma Gorka de una vez y subir a Cuarta sin deber nada.

Grimgutz mira la mosca. No sabe que se habla de él.

**Opciones:**

**A — Vender a Grimgutz. El oro paga todo y sobra.**
→ `oro` (mucho), `rel:{grimgutz:-3, banda:-2, snotlig:-1}`, flag `vendisteAGrimgutz`, `soloSinTroll`
> Firmas. El cazador se lleva a Grimgutz con una cadena que el troll podría partir con un dedo y no parte, porque no entiende que se va. En la puerta, se gira y te busca con la mirada, como buscó el día que lo ficharon. No entiendes qué quiere. Sí lo entiendes. Cierras la puerta. Pagas a Ma Gorka. Sobra oro. No sirve de nada.

**B — No venderlo. Es de la banda.**
→ `Honor:2`, `rel:{grimgutz:3, banda:2}`, flag `noVendisteAGrimgutz`
> Le dices al de la levita que Grimgutz no está en venta. "Es un troll", dice, "no es de nadie". "Es de la banda", dices tú, y Grimgutz, que no ha entendido nada, se sienta a tu lado como para darte la razón. El cazador se va. La deuda sigue. El troll también.

**C — Alquilarlo. Un domingo suyo, seis nuestros.** *(requiere Astucia 3; forzable)*
→ `oro` (algo), `rel:{grimgutz:-1, maGorka:1}`, flag `alquilasteAGrimgutz`
> Lo alquilas los domingos que no jugáis. Grimgutz va, se sienta encima de gente ajena, y vuelve. Ganas oro sin perderlo. Pero vuelve más callado cada vez, y mira la mosca menos, y un troll que deja de mirar la mosca es un troll que ha aprendido algo triste.

*Deja para después (eje Banda entera↔Solo, espejo del Roblerto halfling): `vendisteAGrimgutz` cambia todos los partidos siguientes —sin troll, más difícil— y se lee en el cap 6 (no está en el Cáliz) y cap 7 (el hueco bajo el puente). Igual que Roblerto, hay que gatear las opciones de partido con Grimgutz con `noflag:"vendisteAGrimgutz"` (bug del halfling ya identificado). `alquilasteAGrimgutz` es la vía media que enfría al troll.*

---

## Escena 3 — El domingo que acierta Wazzok

*La muerte de Wazzok. El chamán que predijo tu muerte cada domingo y falló cada domingo, hasta que un domingo acierta la suya.*

Wazzok lleva años prediciendo tu muerte y fallando. Un domingo, antes de un partido de Cuarta, deja de señalarte a ti y se señala a sí mismo. "Hoy", dice, tranquilo, "Gorg me quiere hoy. He apostado a que sí, por variar". En el partido, un placaje que iba para ti lo coge a él. No se levanta. Ha acertado, por fin, la única predicción que no quería acertar.

*[si `wazzokEnLaBanda`:]* Se muere sonriendo, con las setas en los ojos, mirándote como quien entrega un relevo.

**Opciones:**

**A — Cogerle el bastón. Seguir señalando por él.**
→ `rel:{banda:2, grimgutz:1}`, `Astucia:1`, flag `heredasteElBaston`, `wazzokHonrado`
> Coges el bastón de Wazzok. Cuando señalas con él, Grimgutz va, porque el troll no distingue quién sujeta el palo. Da Banda tiene un chamán muerto que sigue señalando desde tu mano. Es lo más orco que se puede honrar a un muerto: usándolo.

**B — Enterrarlo con las setas puestas y sin bastón.**
→ `Honor:2`, `rel:{banda:1}`, flag `wazzokHonrado`, `enterrasteElBaston`
> Lo enterráis con las setas en los ojos y el bastón en las manos, para que señale en el otro lado lo que sea que haya. Grimgutz hace el hoyo. Los goblins dejan piedras. Un chamán que falló toda la vida y acertó al final merece llevarse el bastón.

**C — "Predijo mal hasta el final". Seguir el partido.** *(suma Solo)*
→ `Ferocidad:1`, `rel:{banda:-1}`, flag `wazzokMurio`, `noHonrasteAWazzok`
> "Se equivocó", dices. "Dijo mi muerte años y era la suya". Sigues el partido. Ganáis. Nadie entierra a Wazzok con ceremonia: era un chamán loco con setas. Pero esa noche los goblins te miran distinto, y Grimgutz busca a Wazzok para que le señale, y no lo encuentra.

*Deja para después (eje Banda entera↔Solo): `wazzokHonrado` mantiene la banda entera de espíritu —se lee en el cap 6, la profecía cumplida: "un elefante muerto, y tú encima"—. `heredasteElBaston` te da el control del troll aunque Grimgutz siga. `noHonrasteAWazzok` suma Solo y enfría a la banda: un jefe que no honra a sus muertos.*

---

## Escena 4 — Cuarta División

**Partido: Los Descuartizadores de Vhal** *(Caos con dos minotauros, fuerza 4; el primer equipo de Cuarta que mata de verdad)*

Cuarta ya no es Sexta. Los Descuartizadores de Vhal tienen dos minotauros y matan sin que sea noticia. Sin apotecario —si no lo tienes— cada golpe cuenta doble.

*[si `vendisteAGrimgutz`:]* Sin Grimgutz, sois una banda de goblins y un orco contra dos minotauros. Toca correr y morder y rezar, y los orcos no rezáis.
*[si no:]* Grimgutz mira a los dos minotauros y, por una vez, parece saber lo que hay que hacer.

**Opciones:**

**A — [sin troll] Piña de goblins y tú de frente.** *(si `vendisteAGrimgutz`)*
*Tirada: FU (4+, más duro sin troll). Con riesgo alto.*
- **Éxito:** → `fama:9`, `Ferocidad:1`, gol, `rel:{banda:2}`, flag `ganasteEnCuarta`, `ganasteSinTroll`
> Sin troll, la banda hace lo que hacía antes de tener troll: una piña de goblins con muchos dientes, y tú de frente abriendo hueco. Caéis tres. Cruzáis dos. Ganáis a un equipo que mata, sin nada más que dientes y la pata de atrás. Se echa de menos al troll. Se gana igual.
- **Fallo (riesgo):** → cadena de daño (grave sin apotecario si `subisteSinDeber`)
> Sin troll y sin apotecario, un minotauro te coge en el aire. Esto es lo que cuesta subir sin deber nada. Despiertas, si despiertas, debiendo una vida a alguien.

**B — [con troll] Los dos minotauros contra Grimgutz.** *(si no `vendisteAGrimgutz`)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:9`, gol, `rel:{grimgutz:2}`, flag `ganasteEnCuarta`
> Grimgutz coge a un minotauro con cada mano y los sienta a los dos a la vez. Se queda ahí, sentado sobre dos minotauros, mirando la mosca, contento. Los goblins anotan tranquilos. Ganáis. Vhal no había visto nunca sentarse a un troll sobre dos cosas con cuernos.
- **Fallo (riesgo):** → cadena de daño

**C — Ir de frente a por el más grande. En la pata de atrás.** *(mejor si `laPataDeAtras`)*
*Tirada: FU (4+). Con riesgo alto.*
- **Éxito:** → `fama:10`, `Ferocidad:1`, gol, flag `ganasteEnCuarta`, `deFrente`, `laPataEnCuarta`
> Un minotauro de Cuarta, cuatro veces tú. Le das donde le darías a Krug: en la pata de atrás. Cae una tonelada de cuernos delante de toda la división. Es el ensayo de lo que viene. Alguien de Gorgomor, en la grada, deja de reírse y empieza a preguntar quién eres.
- **Fallo (riesgo):** → cadena de daño grave

*Deja para después: `ganasteSinTroll` demuestra que la banda sobrevive a la venta, pero el texto no deja de echar de menos al troll. `laPataEnCuarta` es el penúltimo escalón del motivo maestro antes de Krug. La grada de Gorgomor que "deja de reírse" siembra la invitación del cap 6.*

---

## Escena 5 — El que pregunta desde la charca

*Escena de relación / eje Banda↔Charca. La charca que te tiró empieza a mirarte.*

Un emisario de Gorgomor —un orco negro con el casco de Krug pintado en el pecho— aparece en tu campo de Cuarta. No te reta. Te mira. "El Jefe Supremo sabe que un cesto bajó por el río hace años", dice. "Y que algo pequeño no se ahogó. Quiere ver si creció". Deja una invitación: un amistoso en Gorgomor. Contra el mismísimo Krug.

*[si `rugisteEnLaOrilla`:]* "Te ha oído rugir en su orilla. Dice que un perro que ladra en la puerta o entra o se calla".

**Opciones:**

**A — Aceptar. De frente. Que vea Gorgomor lo que muerde el pequeño.**
→ `Ferocidad:1`, `Ambición:1`, `rel:{banda:1}`, flag `aceptasteAGorgomor`, `deFrenteAGorgomor`
> Aceptas sin pensarlo, que es como acepta un orco. "Dile a Krug que el cesto vuelve. Y que esta vez no cabe en el río". El emisario no sonríe: los orcos negros no sonríen. Pero apunta algo. Vas a jugar contra el que te tiró, en su charca, delante de los que te desecharon.

**B — Aceptar, pero fría: por el oro y la fama, no por Krug.** *(suma Charca)*
→ `Ambición:2`, `rel:{maGorka:1}`, flag `aceptasteAGorgomor`, `porElOroNoPorKrug`
> Aceptas y negocias la bolsa. Un amistoso en Primera paga como diez partidos de Cuarta. Ma Gorka aprueba. Vas a Gorgomor por lo que se saca, no por lo que se siente. Es lo más listo. Krug lo notará: un orco que viene por oro es un orco que se puede comprar.

**C — Rechazar. No vuelves a la charca que te tiró.** *(suma Banda)*
→ `Honor:2`, `rel:{banda:2, snotlig:1}`, flag `rechazasteAGorgomor`, `laCharcaQueTeTiro`
> "Dile a Krug que si me quiere ver, que baje él al barro de Cuarta, donde jugamos los que no cabíamos en su charca". El emisario se va. Es la respuesta más orgullosa y la más tonta: has rechazado Primera. Pero la banda esa noche te levanta en hombros, que pesan poco pero levantan mucho.

*Deja para después (eje Banda↔Charca, el momento grande del eje): `aceptasteAGorgomor` lleva al Cáliz de Barro del cap 6 —el partido cumbre—. `porElOroNoPorKrug` suma Charca (vas por interés, no por los tuyos) y colorea el Cáliz. `rechazasteAGorgomor` suma Banda fuerte y abre una vía distinta al cap 6: Krug baja a buscarte, o el Cáliz se juega en tu barro. Decisión que ramifica el cap 6.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `vendisteAGrimgutz`:]**
> Bajo el puente hay un hueco donde dormía un troll. Nadie duerme ahí ahora. Los goblins lo rodean para ir al río, por costumbre, aunque ya no haya nada que rodear. Pagaste la deuda. Subiste a Cuarta. Tienes oro de sobra en un saco que no abres, porque cada vez que lo abres huele a río y a mosca.

**[si `mediaBandaAMaGorka`:]**
> La mitad de todo lo que gana Da Banda es de una ogra de tres metros. Cuando anotas, miras a la grada, y Ma Gorka asiente, y anotas otra vez. Ganáis más que nunca. La banda es de dos, y una de las dos no juega: cobra.

**[si `subisteSinDeber` / `libre`:]**
> No debéis nada a nadie. Subisteis a Cuarta con cascos abollados y sin apotecario, y en Cuarta eso se paga con goblins que no se levantan. Pero cuando ganáis, ganáis enteros, y el saco de Ma Gorka no tiene vuestro nombre. En la charca, no deber es más raro que un troll: nadie lo hace.

**[si nada destaca:]**
> Cuarta División, con troll o sin él, con deuda o sin ella, con un chamán menos. Subís perdiendo cosas por el camino, que es la única forma de subir que conoce la charca. Arriba, alguien con cuatro metros ha empezado a preguntar tu nombre.

---

### Notas de diseño del capítulo

- **15 opciones** (6 escenas). ✓
- **Con tirada:** el partido de Cuarta (3). ✓ del tercio.
- **Con riesgo:** las tres del partido, grave sin apotecario. ✓
- **Con requisito:** pagar con victorias (Ambición 2), no deber (Voluntad 3), alquilar troll (Astucia 3). ✓
- **Opción que solo caracteriza:** rechazar Gorgomor (5C) rechaza Primera por orgullo: define sobre conveniencia. ✓
- **Eje Deuda↔Libre decidido** (Ma Gorka, escena 1). **Eje Banda↔Charca** movido fuerte (Gorgomor, escena 5, ramifica el cap 6). **Banda entera↔Solo** (vender troll, honrar a Wazzok). Tres ejes tocados. ✓
- **La muerte de Wazzok:** el chamán que falla acierta su propia muerte. Tratada en seco. ✓
- **Grimgutz vendido:** declarado `vendisteAGrimgutz` y opciones sin-troll escritas (escena 4A), aprendiendo del bug del halfling. ✓
- **Ascenso a Cuarta**, con apotecario condicionado a la deuda. ✓
- **Fotografía** con variantes por eje. ✓
