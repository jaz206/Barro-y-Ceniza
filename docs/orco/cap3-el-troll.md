# Barro y Ceniza — Orco
## Capítulo 3 — El troll
### *Un fichaje que come árbitros*

Prosa final. Sigue la biblia y el documento de raza del orco. Heredado de `orcoguion.md`.

**Función del capítulo:** complicación. Fichar a Grimgutz (el gran fichaje, el equivalente al Roblerto halfling), domesticar al fanático Skabnik, y la banda crece. Aquí arranca fuerte el **eje Banda entera↔Solo** (perder o conservar a los tuyos). Cinco escenas.

---

## Paso del tiempo

Pasa una temporada en Sexta con un campo comprado al doscientos por ciento. Ma Gorka viene a cobrar cada luna. Ganáis más de lo que nadie esperaba de seis criaturas con cascos de otros. Bajo el puente viejo, dicen, vive un troll.

---

## Tardes libres *(elige 2)*

- **Robar cascos con Snotlig, de noche, sin despertar a nadie.** → `Astucia:1, rel:{snotlig:1}`.
- **Cazar jabalíes a mano con los goblins. En la pata de atrás.** → `stat:{FU:1}`, flag `laPataDeAtras`. (por si no lo cogiste en el cap 2)
- **Comer en la cueva de Ma Gorka y escuchar quién apuesta qué.** → `Astucia:1, rel:{maGorka:1}`.
- **Sentarte en el río con Grimgutz a mirar la mosca.** → `rel:{grimgutz:2}`. *(requiere `fichasteAGrimgutz`)* "Miráis la mosca. Horas. No pasa nada. Es lo más tranquilo que ha vivido un orco, y no lo cambiarías."
- **Dejar que Wazzok te prediga cosas a cambio de setas.** → `rel:{wazzok:1}, Astucia:1`. *(requiere `wazzokEnLaBanda`)* "Es un espía con setas en los ojos."
- **Practicar agacharse cuando Skabnik gira.** → `stat:{AG:1}`. *(requiere `fichasteASkabnik`)* "Al mes ya no te alcanza nadie que gire, ni nada que venga por arriba."
- **Correr detrás de los goblins hasta alcanzarlos.** → `stat:{MV:1}`.

---

## Escena 1 — Bajo el puente

Grimgutz es un troll de río que vive bajo el puente de los goblins, que es donde vivíais antes de tener campo. Come viajeros, come árbitros cuando pasan, y come cualquier cosa que haga ruido. Es más grande que una puerta, regenera, y no ha jugado a nada en su vida.

Snotlig dice que un troll come goblins. Tú dices que un troll gana partidos. Los dos tenéis razón.

**Opciones:**

**A — Ir solo al puente. Con un árbitro.** *(requiere Astucia 2; forzable)*
→ `Astucia:1`, `rel:{grimgutz:2}`, flag `fichasteAGrimgutz`, `grimgutzPorArbitro`
> Le llevas un árbitro de Sexta, de los que cobran en dientes. Grimgutz se lo come entero y te mira con algo parecido a la gratitud. Te sigue al campo. La federación no pregunta: hay muchos árbitros.

**B — Ir con la banda entera. Que vea que somos muchos.**
→ `Ferocidad:1`, `rel:{banda:-2}`, flag `fichasteAGrimgutz`, `perdisteUnGoblin`
> Vais los seis. Grimgutz sale de debajo del puente, mira a cinco goblins y un orco, y se come al goblin más cercano. Snotlig te mira. Es el primero de los tuyos que pierdes, y lo has perdido por un fichaje.

**C — Sentarte en el puente y esperar a que salga por hambre.** *(requiere Voluntad 3; forzable)*
→ `Voluntad:2`, `rel:{grimgutz:3}`, flag `fichasteAGrimgutz`, `grimgutzPorHambre`
> Esperas dos días. Sale. Te huele. No te come: eres pequeño y hueles a goblin, y los goblins, para un troll, son de la familia. Se sienta a tu lado. Os quedáis mirando el río. Es el fichaje más largo de tu vida.

*Deja para después (eje Banda entera↔Solo, primer golpe grande): `perdisteUnGoblin` es una pérdida que no se recupera —suma Solo, y Snotlig no lo olvida—. `grimgutzPorHambre` es el vínculo más fuerte con el troll (dormís juntos, se lee en el cap 3 escena 4 y en el cap 7). `fichasteAGrimgutz` es como el árbol del halfling: si luego lo vendes (cap 5), cambia todos los partidos siguientes.*

---

## Escena 2 — Cómo se convence a un troll

Grimgutz está en tu campo y no sabe qué hacer. Le das una bola: se la come. Le das otra: la mira. Snotlig se ha subido a una portería y no baja.

**Opciones:**

**A — Enseñarle una sola cosa: cuando alguien tenga la bola, siéntate encima.**
→ `Astucia:1`, `rel:{grimgutz:1}`, flag `grimgutzSeSienta`
> Aprende. Es la única jugada de su vida y la hace cada partido: se sienta encima del que tiene la bola. Los rivales de Sexta empiezan a soltar la bola cuando lo ven venir. Es táctica.

**B — Dejar que Wazzok le hable. Sea lo que sea lo que le dice.** *(requiere `wazzokEnLaBanda`)*
→ `rel:{wazzok:1, grimgutz:1}`, flag `grimgutzObedeceAWazzok`
> Wazzok le habla en el idioma que no existe. Grimgutz asiente. Desde ese día, cuando Wazzok señala a alguien, Grimgutz va. Es un chamán con un troll a cuerda. Ma Gorka sube las apuestas.

**C — Pegarle hasta que entienda quién manda.** *(requiere Ferocidad 3; forzable)*
*Tirada: FU (5+, un troll es enorme). Con riesgo.*
- **Éxito:** → `Ferocidad:1`, `rel:{grimgutz:1, banda:1}`, flag `pegasteAlTroll`
> Le pegas. Un orco pegándole a un troll. Grimgutz se sorprende tanto que se sienta. Le pegas otra vez. Se ríe, que en un troll es un terremoto. Entiende. Manda el pequeño. La banda entera lo ha visto.
- **Fallo (riesgo):** → cadena de daño, `rel:{maGorka:-1}` (te cobra la cama)
> Le pegas. Grimgutz te devuelve el golpe sin querer, y sin querer es peor que queriendo. Te despiertas en la taberna de Ma Gorka, que te ha cobrado la cama. El troll está fuera, esperándote, con cara de disculpa.

*Deja para después: `grimgutzObedeceAWazzok` liga al troll y al chamán —si Wazzok muere en el cap 5, el troll pierde su guía—. `grimgutzSeSienta` es la jugada base del troll, que se cita en cada partido con él. `pegasteAlTroll` suma Jefe (mandas por la fuerza).*

---

## Escena 3 — Con troll

**Partido: Los Cascos Rotos de Karag** *(enanos del Caos con minotauro, fuerza 2; nadie les gana en Sexta)*

Los Cascos Rotos de Karag son enanos del Caos con cuernos, y en Sexta nadie les gana porque nadie tiene con qué. Vosotros tenéis a Grimgutz. No sabe nada. Es grande.

Turno cinco. Su minotauro viene por el centro con la bola y la banda entera mira al troll, que mira una mosca.

**Opciones:**

**A — Gritarle al troll. Con el rugido, si lo tienes.** *(mejor si `aprendisteARugir`)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{grimgutz:1}`, flag `ganasteConTroll`
> Ruges. Grimgutz deja la mosca, ve al minotauro, y se sienta encima de él. Con bola y todo. El minotauro no vuelve a levantarse en el partido. Los goblins recogen lo que queda y anotan dos. Ganáis. Los Cascos Rotos se van con los cuernos bajos.
- **Fallo (riesgo):** → gol rival, `rel:{snotlig:-1}`
> Ruges. Grimgutz se asusta del ruido y se sienta encima de Snotlig. El minotauro anota. Uno a dos. Snotlig sobrevive. No te habla en una semana.

**B — Ir tú a por el minotauro y que el troll vea cómo se hace.** *(mejor si `laPataDeAtras`)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:8`, `Ferocidad:1`, gol, flag `ganasteConTroll`, `elTrollAprendioMirando`
> Vas de frente contra un minotauro. Un orco de once años. Le das donde Snotlig te enseñó a dar a los jabalíes de los goblins: en la pata de atrás. Cae. Grimgutz lo ve, entiende, y hace lo mismo con el siguiente. Ganáis. El troll ha aprendido mirando. Es más de lo que aprendió en cien años bajo un puente.
- **Fallo (riesgo):** → derrota, cadena de daño
> Vas de frente contra un minotauro. Un minotauro. Te despiertas con Grimgutz mirándote y la mosca en tu nariz. Uno a tres. El troll, al menos, no se ha comido a nadie.

**C — Dejar que Wazzok señale.** *(requiere `grimgutzObedeceAWazzok`)*
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:7`, gol, `rel:{wazzok:2}`, flag `ganasteConTroll`, `wazzokAcerto`
> Wazzok señala al minotauro con el bastón. Grimgutz va. El minotauro, que tiene cuernos y no tiene miedo, descubre el miedo. Grimgutz se lo come a medias. El árbitro no pita: tiene miedo también. Ganáis. Wazzok dice que lo predijo. Es la primera vez que acierta.
- **Fallo (riesgo):** → derrota y multa
> Wazzok señala al minotauro. Grimgutz va al árbitro. Se lo come. El partido se suspende con uno a dos. Os dan la derrota y una multa. Wazzok dice que Gorg quería otra cosa.

*Deja para después: `elTrollAprendioMirando` es el motivo de la pata de atrás pasando de ti al troll —hilo que remata en Krug—. `ganasteConTroll` os hace temibles en Sexta y empieza a sonar vuestro nombre hacia arriba.*

---

## Escena 4 — Dónde duerme un goblin

*Escena de relación. El corazón emocional del capítulo, en clave orca: ternura seca.*

Snotlig no se acerca a Grimgutz. Se acuerda del goblin que se comió, o del que se pudo comer. Una noche de helada, los goblins duermen apretados y Snotlig se queda fuera, lejos del troll, temblando con los doce cascos puestos para el frío. Grimgutz, sin decir nada, se tumba de lado y deja un hueco caliente entre el brazo y la barriga.

Snotlig lo mira. Tú miras a Snotlig.

**Opciones:**

**A — Empujar a Snotlig hacia el hueco. Con cuidado.**
→ `rel:{snotlig:2, grimgutz:1}`, flag `snotligDuermeConElTroll`
> Le empujas. Snotlig se queda rígido en el hueco caliente, con los cascos puestos, esperando que le coman. No le comen. Se duerme. Grimgutz ronca. Desde esa noche Snotlig duerme ahí, y el troll no se mueve hasta que el goblin se levanta.

**B — Dormir tú en el hueco. Que Snotlig vea que no come.**
→ `rel:{grimgutz:2, snotlig:1}`, flag `dormisteEnElHueco`
> Duermes en el hueco. Es lo más caliente que has dormido. Snotlig lo ve desde fuera y al tercer día se acerca. Al cuarto duerme a tu lado, con el troll detrás de los dos. Es una banda apretada.

**C — Dejarle temblar. Un goblin que no confía en su troll no dura.**
→ `Ferocidad:1`, `rel:{snotlig:-2, grimgutz:-1}`, flag `dejasteTemblarASnotlig`
> Le dejas. Snotlig tiembla toda la noche y no se acerca nunca al troll. En el campo, tampoco: le deja solo. Grimgutz se sienta encima de quien tiene la bola sin nadie que le diga quién.

*Deja para después (eje Banda entera↔Solo, y Jefe↔Igual): `dormisteEnElHueco` es "la banda apretada", que se cita en el cap 6 (la noche antes, bajo el elefante) y el cap 7. `dejasteTemblarASnotlig` suma Solo y frío entre tú y quien te crió: la peor decisión para los finales cálidos. Ternura seca: nadie dice que se quieren, se dice dejando un hueco caliente.*

---

## Escena 5 — El fanático

Skabnik es un goblin con una bola y cadena que gira sin parar y que no puede dejar de girar sin caerse. Es un fanático: un arma que anda, y que no distingue a los suyos. Llega a tu campo un domingo girando y tumba a dos rivales y a un goblin tuyo. Snotlig quiere matarlo. Ma Gorka ha apostado a que dura tres partidos.

**Opciones:**

**A — Ficharlo. Que gire lejos de los nuestros.**
→ `Ambición:1`, `rel:{banda:-1}`, flag `fichasteASkabnik`
> Le fichas. Lo pones en la banda del campo, lejos, y le dices "gira hacia allí". Gira hacia allí siete de cada diez veces. Las otras tres, la banda aprende a agacharse. Ganáis más de lo que perdéis.

**B — Ponerle una cadena más corta.** *(requiere Astucia 3; forzable)*
→ `Astucia:2`, `rel:{snotlig:1}`, flag `fichasteASkabnik`, `cadenaCorta`
> Le acortas la cadena. Gira más despacio, tumba menos, y no alcanza a los goblins. Skabnik llora: era su cadena. Pero no llora ninguno de los tuyos. Snotlig te mira como se mira a un jefe.

**C — Echarlo antes de que mate a alguien.**
→ `Honor:1`, flag `echasteASkabnik`, `skabnikConLosCuatroDedos`
> Le echas. Se va girando. Tumba a dos viajeros en el camino. Los Cuatro Dedos lo fichan al mes. Le verás. Girando hacia ti.

*Deja para después: `fichasteASkabnik` te da un arma imprevisible —la opción de "soltar a Skabnik" en la final del cap 6—. `cadenaCorta` protege a los tuyos (suma Banda entera). `skabnikConLosCuatroDedos` hace que Skabnik reaparezca como rival: gira hacia ti en los partidos contra los Cuatro Dedos (cap 5 y cap 7).*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `dormisteEnElHueco` o `snotligDuermeConElTroll` (la banda apretada):]**
> Una cría de orco, cinco goblins, un troll de río y un chamán con setas en los ojos, dormidos en un montón caliente bajo un puente, mientras fuera hiela. No es una charca. No es un equipo. Es otra cosa, y no tiene nombre todavía, y es tuya. Grimgutz no se mueve hasta que el último goblin se levanta.

**[si `perdisteUnGoblin` (el troll se comió a uno):]**
> Sois seis menos uno. El troll gana partidos y se comió a un goblin el primer día, y las dos cosas son verdad a la vez, que es como son las cosas en la charca. Snotlig cuenta los que quedan cada noche. Le sale uno menos. Siempre le saldrá uno menos.

**[si `ganasteConTroll` y nada más destaca:]**
> Con un troll que se sienta encima de la gente, Da Banda es lo más temible de Sexta. En la cueva de Ma Gorka empiezan a decir vuestro nombre, que sigue siendo un hueco, hacia arriba. Alguien, en una charca, pregunta quiénes sois.

**[si nada destaca:]**
> La banda ha crecido: un troll, un fanático, un chamán que falla. Cosas que nadie quería, juntas, ganando. Es lo que hay. Es lo que sois.

---

### Notas de diseño del capítulo

- **13 opciones** (5 escenas). ✓
- **Con tirada:** convencer al troll C, el partido (3), fichar con cadena corta implícito. ✓ del tercio.
- **Con riesgo:** pegar al troll C, partido A/B/C (2-4). ✓
- **Con requisito:** ir solo (Astucia 2), esperar (Voluntad 3), pegar (Ferocidad 3), cadena corta (Astucia 3). ✓ (4)
- **Opción que solo caracteriza:** la escena "dónde duerme un goblin" entera es de puro carácter (ternura seca), no da ventaja de partido. ✓
- **Eje Banda entera↔Solo** arranca fuerte: perder un goblin al fichar el troll, dejar temblar a Snotlig, la cadena corta. ✓
- **Grimgutz = el Roblerto orco:** si se vende (cap 5), cambia partidos. Ya declarado `fichasteAGrimgutz` para gatear las opciones futuras (evita el bug del halfling).
- **Motivo maestro:** el troll aprende "la pata de atrás" mirándote (`elTrollAprendioMirando`). ✓
- **Fotografía** con variantes por eje. ✓
