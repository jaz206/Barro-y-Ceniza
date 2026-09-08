# Barro y Ceniza — Orco
## Capítulo 6 — El Rey
### *Primera División, un amistoso. El Cáliz de Barro.*

Prosa final. Sigue la biblia y el documento de raza del orco. Heredado de `orcoguion.md`.

**Función del capítulo:** cima (biblia 17.7). El partido más difícil del libro: contra Rey Krug, el que te tiró al río, en Gorgomor, la charca que te desechó. Aquí **rematan tres hilos a la vez**: el motivo de la pata de atrás, la némesis (espejo del cesto), y el eje Banda↔Charca. La jugada clave lee toda la acumulación: cuatro o más opciones desbloqueadas por ejes, relaciones y recuerdos (biblia 17.7). Tres escenas.

**El cuerpo** (biblia 12.4): aquí empieza a fallar. No de viejo —el orco no envejece de viejo—, sino de uso: cargas heridas de cinco capítulos. Te duele comer, que en un orco es lo primero que avisa.

**Ramificación de entrada:** el partido llega distinto según el cap 5:
- `aceptasteAGorgomor` → juegas el Cáliz en Gorgomor, invitado por Krug.
- `rechazasteAGorgomor` → Krug baja a tu barro de Cuarta, harto de que le ladres desde lejos. Mismo partido, tu campo.

---

## Escena 1 — Lo que nadie esperaba

Rey Krug, Jefe Supremo de Gorgomor, cuatro metros de orco negro, come primero y pega segundo desde lo alto de un elefante muerto que usa de trono. Te tiró al río en un cesto hace una vida por ser el más pequeño de veinte. Ahora bajas —o subes— con una banda de goblins, un troll (si te queda), un chamán muerto (si lo honras) y doce cascos, a jugarle el Cáliz de Barro.

*[si `aceptasteAGorgomor`:]* La charca entera ha venido a ver cómo el Jefe Supremo aplasta al cesto que se le escapó. Vienen a reírse. Se quedarán por si acaso.
*[si `rechazasteAGorgomor`:]* Krug ha bajado a tu barro porque un perro que ladra en la puerta o entra o se calla, y tú llevas años ladrando. Trae a media charca. Juega en tu campo, entre los cascos de tus muertos.

*[si `wazzokHonrado`:]* Recuerdas la profecía de Wazzok: "un elefante muerto, y tú encima". Empiezas a entender qué quiso decir.
*[si `vendisteAGrimgutz`:]* Hay un hueco a tu lado donde iba el troll. Lo vendiste. Hoy lo notas más que nunca.

**Opciones:**

**A — Contar los goblins antes de saltar. En voz alta, como Snotlig.** *(suma Banda)*
→ `Voluntad:2`, `rel:{banda:3, snotlig:1}`, flag `contasteLosGoblins`
> Cuentas en voz alta a los que quedan, uno por uno, como Snotlig lleva contando desde el cesto. Los que faltan también los cuentas: Grot, y los que se quedaron por el camino. La banda te oye contar. Un orco que sabe cuántos son y cuántos faltan es un orco que no juega solo. Saltáis juntos.

**B — Rugir. A Krug, a su cara, desde el barro.** *(suma Banda↔Charca según cómo)*
*Tirada: FU (4+). Sin riesgo.*
- **Éxito:** → `Ferocidad:1`, `fama:8`, `rel:{banda:2}`, flag `rugisteAKrug`, `elCestoRuge`
> Ruges. No el chillido del cesto: el rugido que aprendiste en su orilla, devuelto a su dueño. Krug, en su elefante muerto, deja de comer. Cuatro metros de orco negro miran hacia abajo y, por primera vez en su vida, hacia algo pequeño que no se agacha. La charca calla. Ese silencio ya es media victoria.
- **Fallo:** → `todaviaChillas` (raro a estas alturas), sin daño
> Ruges, y a mitad se te quiebra, como en el cesto. Krug se ríe con la boca llena. Pero esta vez no te saca nadie a rastras: esta vez te quedas, y el rugido roto, terminado o no, lo has echado tú, en su cara.

**C — No rugir. Mirarle la pata de atrás.** *(suma Astucia; el motivo)*
→ `Astucia:2`, flag `mirasteLaPataDeKrug`
> No ruges. Miras. Cuatro metros de Krug se sostienen sobre dos patas, y las patas, hasta las de cuatro metros, tienen un atrás. Lo apuntas donde apuntas todo desde niño: en el estómago. Krug no sabe que ya has decidido por dónde va a caer.

*Deja para después: `contasteLosGoblins` es la lectura fuerte del eje Banda —se cobra en la jugada clave y en el cap 7—. `rugisteAKrug` cierra el arco del rugido (cap 1) y del eje Banda↔Charca. `mirasteLaPataDeKrug` arma la opción ganadora del motivo maestro en la jugada clave.*

---

## Escena 2 — El elefante muerto

Krug juega desde arriba, sobre su elefante muerto, y solo baja a pegar. Su banda son orcos negros que comen cuando él come y pegan cuando él pega. La primera parte es lo que todos esperaban: os pasan por encima. Vais 0-2. Grimgutz, si lo tienes, aguanta a tres orcos negros él solo. Snotlig, si juega a tu derecha, no se separa de ti.

En el descanso, en el barro, la banda te mira. Toca decidir cómo se juega la segunda parte contra un rey.

**Opciones:**

**A — De frente, todos a una, a por el elefante. Que baje Krug.**
→ `Ferocidad:1`, `rel:{banda:2}`, flag `fuisteAPorElElefante`
> Mandáis a por el trono. Doce cascos, unos goblins y un troll cargando contra un elefante muerto de cuatro metros de altura. Krug tiene que bajar a defenderlo, y cuando Krug baja, Krug está en el barro, a tu altura. Que era el plan. El único plan que tienes.

**B — Aguantar y esperar. Que Krug se confíe y baje solo.** *(requiere Astucia 3; forzable)*
→ `Astucia:2`, `Voluntad:1`, flag `esperasteAKrug`
> Aguantáis la paliza sin buscar el tanto, encajando, contando los turnos. Krug se aburre de ganar fácil —los reyes se aburren— y baja del elefante a hacer daño con sus manos, por gusto. En cuanto pisa el barro, deja de ser un rey de cuatro metros en un trono. Es solo algo grande y confiado. Como un jabalí.

**C — [si te queda] Soltar a Grimgutz contra el elefante.** *(requiere no `vendisteAGrimgutz`)*
*Tirada: FU (4+). Con riesgo.*
- **Éxito:** → `fama:8`, `rel:{grimgutz:2}`, flag `grimgutzTiroElTrono`
> Señalas el elefante muerto. Grimgutz, que lleva toda su vida sentándose encima de cosas, se sienta encima del trono de Krug. El elefante muerto, por fin, muere del todo, aplastado. Krug cae de culo al barro delante de su charca. Un rey en el suelo ya no es un rey. Es un rival.
- **Fallo (riesgo):** → cadena de daño, Krug sigue arriba

*Deja para después: cualquiera de las tres baja a Krug al barro, que es la condición para la jugada clave. `grimgutzTiroElTrono` es el pago de no haber vendido al troll. La escena convierte "un rey inalcanzable" en "algo grande a tu altura".*

---

## Escena 3 — El Cáliz de Barro

**La jugada clave.** *Krug está en el barro. 0-2 o 1-2. Última jugada. Aquí se cobra toda la acumulación (biblia 17.7): opciones desbloqueadas por ejes, relaciones, recuerdos y el motivo maestro.*

Rey Krug, cuatro metros, en el barro, a tu altura por primera vez desde el cesto. Detrás de ti, lo que queda de tu banda. Delante, el que te tiró al río. La charca entera de pie. La bola, en tus manos. Una jugada.

**A — De frente. En la pata de atrás. Como a los jabalíes, como a todo.** *(motivo maestro; mejor si `laPataDeAtras` y `mirasteLaPataDeKrug`)*
*Tirada: FU (4+, +1 si `laPataDeAtras`, +1 si `mirasteLaPataDeKrug`, tope +2). Con riesgo.*
- **Éxito:** → `fama:30`, gol, `rel:{banda:3}`, flag `ganasteElCaliz`, `tumbasteAKrug`, `laPataDeAtrasCobrada`
> No corres. Caminas hacia los cuatro metros de Krug, que sonríe, porque un rey siempre sonríe a lo pequeño. Le das donde Snotlig te enseñó a dar a los jabalíes de los goblins hace una vida entera: en la pata de atrás. Todo cae si le das en la pata de atrás. Todo. Rey Krug, Jefe Supremo de Gorgomor, cae de cuatro metros al barro de su propia charca, y en el silencio, coges la bola y cruzas. El cesto ha vuelto. Y esta vez no cabe en el río.
- **Fallo (riesgo):** → cadena de daño grave, `perdisteElCaliz`, `peroLoIntentaste`
> Caminas hacia Krug y Krug, que también sabe lo de la pata de atrás porque es viejo y ha tirado a muchos al río, se gira a tiempo. Su mano de cuatro metros te coge en el aire, como el día del cesto. Te mira. Te reconoce. Y te devuelve al barro, casi con respeto. Perdéis. Pero la charca entera ha visto al pequeño ir de frente a por el rey. Ya nadie tira a ese cesto al río sin pensarlo.

**B — Contar con la banda. Que crucen ellos, tú abres a Krug.** *(fuente: eje Banda; requiere `contasteLosGoblins` o `snotligMitad`)*
*Tirada: FU (4+). Con riesgo bajo.*
- **Éxito:** → `fama:26`, gol, `rel:{banda:3, snotlig:2}`, flag `ganasteElCaliz`, `tumbasteAKrug`, `ganasteConLaBanda`
> No cruzas tú. Te plantas delante de Krug, aguantas los cuatro metros —el cesto aguantando al río— y gritas los nombres: Snotlig a la derecha, los goblins por el hueco, y cruza el más pequeño de todos, uno como eras tú. Krug mira cruzar a un goblin de tres palmos y no entiende cómo. No lo entenderá nunca: los reyes juegan solos. Las bandas, no. Ganáis, y ganáis todos.

**C — Soltar a Skabnik. Que gire hacia el rey.** *(fuente: recuerdo; requiere `fichasteASkabnik`)*
*Tirada: AG (4+, agacharte cuando gire). Con riesgo.*
- **Éxito:** → `fama:24`, gol, flag `ganasteElCaliz`, `tumbasteAKrug`, `krugPorElFanatico`
> Sueltas la cadena de Skabnik y te agachas, que llevas años practicando agacharte. Skabnik gira hacia lo más grande que hay, porque un fanático va a lo grande, y lo más grande es Krug. Bola y cadena contra cuatro metros de rey. Krug cae girando. En el caos, cruzas. Ganáis con un arma que Gorgomor te regaló al despreciarla.

**D — [si vendiste el troll] Solo, con lo que queda.** *(fuente: rama Solo; si `vendisteAGrimgutz` y banda mermada)*
*Tirada: FU (5+, sin troll, más duro). Con riesgo alto.*
- **Éxito:** → `fama:28`, gol, flag `ganasteElCaliz`, `tumbasteAKrug`, `ganasteSolo`
> Sin troll, sin la banda entera, con lo que fuiste dejando por el camino a cambio de subir. Vas de frente a por Krug tú solo, porque ya no queda nadie a quien mandar. Le das en la pata de atrás con todo lo que te queda, que es rabia y una vida. Cae. Cruzas solo. Ganas solo. En la grada, el saco de oro que sacaste por el troll no aplaude: los sacos no aplauden.
- **Fallo (riesgo):** → cadena de daño grave, `perdisteElCaliz`

**E — [rama Charca] Ganar para Krug. Unirte a la charca en el barro.** *(fuente: eje Charca; requiere `porElOroNoPorKrug` o Banda↔Charca alto)*
→ `Ambición:2`, `oro`, `rel:{banda:-2}`, flag `teUnisteALaCharca`, `noTumbasteAKrug`
> En el barro, a su altura, Krug no te ofrece pelea: te ofrece sitio. "El cesto creció. Ven arriba". Y por un momento, con cuatro metros de rey tendiéndote la mano, entiendes que podrías dejar de ser el de abajo. Aceptas. Ganáis el Cáliz juntos, tú y Krug, contra el resto. Subes al elefante muerto. Desde arriba, el barro donde está tu banda se ve pequeño. Muy pequeño. Como se veía desde el cesto, pero al revés.

*Deja para después: `tumbasteAKrug` + `laPataDeAtrasCobrada` es el pago de todo el libro —se lee en el cap 7—. `ganasteConLaBanda` / `ganasteSolo` / `teUnisteALaCharca` dan finales opuestos (biblia 18.3): la misma victoria, tres orcos distintos. `teUnisteALaCharca` es la vía Charca sin castigo moral: ganas, subes, y en el cap 7 descubres qué se ve desde arriba.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `tumbasteAKrug` y `ganasteConLaBanda`:]**
> Rey Krug en el barro de su propia charca, y un goblin de tres palmos cruzando la línea porque tú le abriste el hueco. La charca que te tiró al río de pie, mirando a algo pequeño que no se agachó. No ganaste tú. Ganó Da Banda. Y esa, para un cesto que pescaron del agua, es la única victoria que sabe a algo.

**[si `tumbasteAKrug` y `ganasteSolo`:]**
> Tumbaste a un rey de cuatro metros tú solo, en la pata de atrás, delante de todos. Eres lo más grande que ha salido de esa charca. Y cuando buscas con la mirada a quién contárselo, hay huecos: el troll que vendiste, los que dejaste por el camino. Ganaste. Solo. Las dos palabras, juntas, pesan más que los doce cascos.

**[si `teUnisteALaCharca`:]**
> Estás arriba, en el elefante muerto, al lado de Krug, y comes primero por primera vez en tu vida. Sabe raro. Abajo, en el barro, tu banda recoge sus cosas sin mirarte. Snotlig cuenta los que quedan y ya no te cuenta a ti. Ganaste. Subiste. Eres de la charca que te tiró. Era lo que querías desde el cesto. ¿O no?

**[si `perdisteElCaliz` y `peroLoIntentaste`:]**
> Krug te devolvió al barro casi con respeto, y "casi con respeto" de un rey de cuatro metros es más de lo que recibe casi nadie. No ganaste el Cáliz. Pero fuiste de frente a por el que te tiró al río, delante de su charca entera, y ahora hay crías en veinte charcas que, cuando las tiren al agua, van a acordarse de que un cesto volvió.

---

### Notas de diseño del capítulo

- **La jugada clave tiene 5 opciones de fuentes distintas** (biblia 17.7 pide 4 de 3 fuentes; superado): A (motivo maestro + habilidad), B (eje Banda / relación), C (recuerdo Skabnik), D (rama Solo), E (eje Charca). ✓✓
- **El motivo maestro se cobra:** "la pata de atrás" desde los jabalíes (cap 2) remata en Krug de cuatro metros (opción A). Es el pago del hilo de todo el libro. ✓
- **El espejo se cierra:** el cesto del río (cap 1) vuelve — "el cesto ha vuelto, y esta vez no cabe en el río". ✓ (biblia 17.8)
- **Sin castigo moral:** la rama Charca (E) gana el Cáliz igual, incluso con oro. Lo que descubre es cosa del jugador (cap 7). ✓ (biblia 18.4)
- **La acumulación se lee:** eje Banda (B, contar goblins), eje Charca (E, unirte), Banda entera↔Solo (D, sin troll), recuerdos (C, Skabnik; grimgutzTiroElTrono). Cinco capítulos leídos. ✓
- **Ramificación de entrada** según cap 5 (Gorgomor o tu barro). ✓
- **El cuerpo falla** (heridas acumuladas), coherente con biblia 12.4. ✓
- **Fotografía** con cuatro variantes por eje/resultado. ✓
