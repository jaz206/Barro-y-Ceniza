# Barro y Ceniza — Halfling
## Capítulo 6 — La final imposible
### *Contra los grandes, en el barro de verdad*

Prosa final. Sigue la biblia y la voz del halfling. **Es la cima** (biblia 17.7): la jugada clave debe leer todo lo construido en los cinco capítulos anteriores, con al menos cuatro opciones desbloqueadas de tres fuentes distintas. Heredado de la build y ampliado para cumplir ese mínimo.

**Función del capítulo:** cima. El partido más difícil del libro, con el cuerpo al límite (biblia 13.4: aquí ha llegado la bajada de ficha por edad, si aplica). Las dos ramas reconvergen aquí: llegas siendo el Berto que construiste. Tres escenas: vísperas, el cristal, la final.

**El espejo** (biblia 17.8): el carnicero que te dio la palmada en el capítulo 1 es el rival de esta final. Aquí se cierra el arco y se crea `vengasteLaPalmada`, que el capítulo 7 leerá.

---

## Escena 1 — Lo que nadie esperaba

*[si `ganasteLaCopa`:]* Ganar la Copa de los Pringados os ha convertido en una historia. Y las historias, en este deporte, suben. Os han invitado —por morbo, por marketing, por lo que sea— a jugar la final de un torneo de verdad contra un grande.
*[si `fichastePorMortaigne`:]* Mortaigne te lleva a la final del torneo grande, donde ellos siempre llegan. Es lo que viniste a buscar: una final de verdad, con tu nombre en el cartel y una camiseta negra que ya no te aprieta como al principio. Enfrente, quién iba a decirlo, los Carniceros de Bögenhafen.
*[si no ganaste la copa y te quedaste:]* No habéis ganado nada, pero habéis perdido con tanta gracia toda la temporada que la Cristalvisión os ha invitado a la final de un torneo de verdad "para dar color". Sois el color.

Contra los Carniceros de Bögenhafen, los mismos que en tu primer domingo vinieron a Villapastel a hacer manos. Han crecido. Tú también, aunque midas lo mismo.

*[si `rel.abuela` alto y no Mortaigne:]* Tu abuela ha sacado el mantel bueno, el que solo sale en las bodas y los entierros.
*[si `fichastePorMortaigne`:]* Tu abuela no está en la grada. No sabes si sabe que juegas. En Mortaigne nadie saca el mantel bueno; en Mortaigne no hay mantel.

**Opciones:**

**A — Prometer al equipo que esta vez no sois el chiste.** *(no Mortaigne)*
→ `Voluntad:2`, `rel:{equipo:2}`, flag `noSoisElChiste`
> Lo dices en el vestuario y, por una vez, nadie se ríe. Doce halflings, un árbol y un cocinero te miran como se mira a alguien que se ha creído algo. Y creérselo, a veces, es media victoria. La otra media es no morir.

**B — Recordarles que sois el chiste, y que el chiste puede ganar.** *(no Mortaigne)*
→ `Astucia:1`, `rel:{equipo:1, aficion:1}`, flag `elChisteGana`
> "Somos el chiste", les dices, "y el chiste es que nadie nos toma en serio hasta que es tarde". El vestuario ríe, pero afila la risa. Un equipo que sabe reírse de sí mismo es difícil de asustar.

**C — No prometer nada. Ir a cenar con tu abuela.** *(requiere `rel.abuela` ≥ 3; forzable; no Mortaigne)*
→ `Voluntad:1`, `rel:{abuela:2}`, flag `cenaConLaAbuela`
> Dejas al equipo y vas a casa. Tu abuela pone dos platos y no habla de fútbol. Al final, sin levantar la vista del guiso: "Mañana, si te parten, te parten enteros. No a medias". Es lo más cerca que estará de decir que te quiere.

**D — [Mortaigne:] Prepararte solo, como te enseñaron. Frío.** *(solo `fichastePorMortaigne`)*
→ `Astucia:1`, `Voluntad:1`, flag `visperasEnMortaigne`
> No hay vestuario que arengar: en Mortaigne cada uno se prepara solo. Drache te da un consejo sin mirarte: "A ese carnicero le conoces tú mejor que nadie. Úsalo". Kessler no dice nada, pero por primera vez no aparta la mirada: mañana, aunque le fastidie, va a necesitar al reclamo. Cenas solo, revisando la libreta de rivales. En la última página, sin querer, has dibujado una ventana.

*Deja para después: `cenaConLaAbuela` desbloquea una opción en la jugada final y se lee en el cap 7. `noSoisElChiste` / `elChisteGana` colorean cómo entras al campo. La variante Mortaigne de esta escena confirma la soledad de esa rama justo antes del clímax.*

---

## Escena 2 — Diez segundos en el cristal

Un reportero de la Cristalvisión, con un cristal mágico flotando junto a la cabeza, te para en el túnel. "Diez segundos", dice. "Di algo que se recuerde. Eres el halfling que ha llegado a una final de verdad. Medio Mundo Viejo quiere reírse contigo o de ti".

*[si `circoDePipo`:]* Pipo, detrás del cristal, hace gestos de que sonrías y vendas camisetas.
*[si `fichastePorMortaigne`:]* Serrault, detrás del cristal, te recuerda con la mirada que representas a Mortaigne. Di lo que toca.

Detrás del cristal está todo el que alguna vez se rió de un pequeño que quería jugar.

**Opciones:**

**A — "Nos vais a ganar. Pero os vais a acordar de nosotros."**
→ `fama:10`, `Ambición:1`, `rel:{aficion:3}`, flag `fraseDelCristal`
> Lo dices mirando al cristal sin parpadear. La Cristalvisión lo pone de titular en toda la liga. En Bögenhafen, los Carniceros lo oyen en la taberna y, por primera vez, no se ríen del todo.

**B — "Venimos a comer. Traigo tarta para todos, ganemos o no."** *(no Mortaigne)*
→ `fama:8`, `Honor:1`, `rel:{aficion:2, abuela:1}`, flag `traeTarta`
> Sacas una tarta de tu abuela del bolsillo y la ofreces al cristal. Es lo más halfling que ha salido nunca en la Cristalvisión. La gente os adora aún más. Los Carniceros, que también tienen abuela, se remueven incómodos.

**C — Comerte al reportero con la mirada y no decir nada.** *(requiere Ferocidad 3; forzable)*
→ `Ferocidad:1`, `fama:6`, flag `elMudoPequeño`
> Miras al cristal en silencio, con cara de pastelero cabreado, diez segundos enteros. La Cristalvisión, que no sabe qué hacer con un halfling que da miedo, te llama "el Mudo Pequeño" toda la temporada. Funciona: nadie sabe qué esperar de ti.

*Deja para después: `fraseDelCristal` se lee en la final (toca demostrarlo o comérsela) y en el cap 7. `traeTarta` conecta con la abuela y se lee en el duelo.*

---

## Escena 3 — La final imposible

**Partido: Los Carniceros de Bögenhafen** *(la némesis; el espejo del capítulo 1)*

Los Carniceros de Bögenhafen, otra vez, en una final de verdad, con sesenta mil personas que han venido a ver a David hacer el ridículo contra Goliat, y a quedarse por si acaso.

*[si `fraseDelCristal`:]* Tu frase está en boca de todos: "os vais a acordar de nosotros". Ahora toca demostrarlo o comérsela.
*[si `cenaConLaAbuela`:]* Recuerdas a tu abuela: "que te partan entero, no a medias".
*[si `prometisteGanar`:]* Aquella promesa del vestuario de Sexta, la que nadie se creyó, la que alguien apuntó "por si acaso": hoy se cobra o se rompe.

Enfrente, el mismo carnicero que en tu primer domingo te dio una palmada "de buen rollo" que te sentó en la harina. Te reconoce. Sonríe. Ha esperado esto tanto como tú.

El silbato suena, y por una vez no suena a sentencia: suena a que cualquier cosa puede pasar.

### La jugada clave

*Biblia 17.7: cuatro o más opciones desbloqueadas por cosas anteriores, de tres fuentes distintas. Aquí se cobra toda la memoria del libro.*

**A — Colártele entre las piernas al carnicero grande. Otra vez. La última.**
*Tirada: AG (4+). Con riesgo. Esquivar repite; repetición de equipo si `equipo` alto.*
- **Éxito:** → `fama:25`, gol, `rel:{equipo:3, aficion:3, abuela:2}`, flag `campeon`, `ganasteLaFinal`, `ganasteEnGrande`, **`vengasteLaPalmada`**
> Como el primer día, pero al revés: te cuelas entre sus piernas y esta vez no sales por la bota, sales por delante, con el balón, y cruzas la línea de la final de verdad mientras sesenta mil personas se ponen de pie. El carnicero se queda mirando el hueco por donde te fuiste. La Comarca del Nabo entra en erupción. Habéis ganado. Un equipo de pasteles ha ganado una final de verdad.
- **Fallo (riesgo):** → gol rival, cadena de daño, flag `perdisteConHonor`
> Te cuelas entre sus piernas y esta vez las cierra a tiempo. Te atrapa, te levanta a la altura de su cara, y por un segundo os miráis los dos, el grande y el pequeño, entendiéndolo todo. Luego te deja en el barro, casi con cariño. Perdéis. Pero sesenta mil personas han visto a un halfling intentarlo, y eso no se olvida.

**B — La piña, todo el equipo, a por la gloria o a por la enfermería.** *(fuente: recuerdo `jugadaPiña`; forzable)*
*Tirada: FU (5+, ayuda de todo el equipo). Con riesgo.*
- **Éxito:** → `fama:25`, gol, `rel:{equipo:3, aficion:3}`, flag `campeon`, `ganasteLaFinal`, `ganasteEnGrande`, `vengasteLaPalmada`
> Los once, más Roblerto empujando, os hacéis una albóndiga imparable que rueda entre carniceros que no saben a quién pegar. La piña cruza la línea en la final de verdad, y estalla en doce halflings celebrando encima del balón. Campeones. De verdad. Sin comillas.
- **Fallo (riesgo):** → gol rival, cadena de daño

**C — Que Roblerto te lance por encima de todos, como en el primer partido.** *(fuente: relación `arbol`; requiere `amigoArbol` y no `ramonVendido`; mejor si `ramonEntrenado`)*
*Tirada: lanzamiento de Roblerto (4+, 3+ si `ramonEntrenado`). Con riesgo.*
- **Éxito:** → `fama:22`, gol, `rel:{arbol:3, aficion:2}`, flag `campeon`, `ganasteLaFinal`, `ganasteEnGrande`, `vengasteLaPalmada`
> Roblerto te agarra —y esta vez no se distrae con ninguna mariposa, porque le enseñaste a no hacerlo— y te lanza en un arco perfecto por encima de sesenta mil cabezas y de un carnicero que mira hacia arriba con la boca abierta, igual que el primer día pero al revés. Cruzas volando. El árbol y el pastelero, campeones. Le debes esto y todo lo demás.
- **Fallo (riesgo):** → gol rival, caes

**D — Aguantar y dársela a un compañero, que hoy no tienes que ser tú el héroe.** *(fuente: relación `equipo`; requiere `equipo` alto)*
*Tirada: PS (5+). Con riesgo bajo.*
- **Éxito:** → `fama:18`, gol, pase, `rel:{equipo:3}`, flag `campeon`, `ganasteLaFinal`, `vengasteLaPalmada`
> Te plantas delante del carnicero, aguantas su placaje —el mismo que te sentó en la harina hace una vida— y en lugar de correr, pasas. El balón cae en botas de un Comepasteles que nadie vigilaba, porque a los halflings pequeños nadie los vigila. Cruza él. Ganáis. Y en el montón de celebración, por una vez, tú estás debajo, sosteniendo a los demás. Es tu mejor jugada y no sale en las crónicas.

**E — [Mortaigne:] Ganar como te enseñaron. Sucio, eficaz, sin gloria.** *(fuente: rama; solo `fichastePorMortaigne`)*
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:20`, gol, flag `campeon`, `ganasteLaFinal`, `ganasteEnGrande`, `vengasteLaPalmada`, `ganasteComoMortaigne`
> Haces lo que Drache te enseñó: buscas el punto débil del carnicero —lo conoces mejor que nadie, llevas una vida conociéndolo— y lo aprovechas sin piedad y sin público. Cruzas. Ganas. Mortaigne gana. El carnicero queda sentado en el barro, como te sentó a ti, y no hay tarta ni abuela ni doce abrazos: solo el resultado, limpio y frío. Has ganado. Te preguntas por qué no sabe mejor.
- **Fallo (riesgo):** → gol rival, cadena de daño

**F — Sentarte sobre el balón, una última vez, y que el reloj decida.** *(fuente: recuerdo `teSentasteSobreElBalon`; regla de retener el balón, biblia 17.4)*
*Tirada de retención: 1d6, cae si el resultado ≥ turno.*
- **Si aguantas:** → `fama:15`, `Astucia:2`, flag `campeon`, `ganasteLaFinal`, `vengasteLaPalmada`, `ganasteSentado`
> No corres. No pasas. Te sientas sobre el balón, como el primer día, como toda la vida, y dejas que el reloj se acabe con vosotros por delante. Sesenta mil personas, los Carniceros, el mundo entero, todos esperando a que hagas algo, y tú no haces nada, que es lo único que un carnicero no sabe cómo placar. El silbato final. Ganáis sentados. La forma más halfling de ser campeón que existe.

*Deja para después (el cierre del arco): `vengasteLaPalmada` se crea en cualquier victoria y se lee en el duelo del cap 7 (agridulce, distinto por rama). `ganasteEnGrande` / `ganasteLaFinal` / `perdisteConHonor` gobiernan el epílogo. `ganasteComoMortaigne` / `ganasteSentado` dan sabores distintos al retiro.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `campeon` y no Mortaigne:]**
> Un equipo de pasteles ha ganado una final de verdad. No hay palabras en la Comarca para esto, así que nadie dice ninguna: solo comen, lloran, y comen más. Tu abuela, en la grada, ha soltado la labor por primera vez en su vida. Solo un momento. Pero la soltó.

**[si `campeon` y `fichastePorMortaigne`:]**
> Has ganado la final que viniste a ganar. Mortaigne celebra con champán que no te sabe a nada y palmadas que no llegan al hombro. Eres campeón. Lo eres de verdad. Y en el hueco donde debería estar la alegría solo hay una pregunta pequeña y terca: ¿y ahora qué, si ya lo tienes todo y sigues teniendo hambre de otra cosa?

**[si `perdisteConHonor`:]**
> Perdisteis. Pero sesenta mil personas vieron a un halfling colarse entre las piernas de un gigante e intentarlo hasta el final, y de vuelta a casa, en cada pueblo del camino, hay un niño pequeño que ahora quiere jugar. No ganasteis la copa. Ganasteis algo que no cabe en una copa.

---

### Notas de diseño del capítulo

- **La jugada clave tiene 6 opciones desbloqueadas por fuentes distintas** (biblia 17.7 pide 4 de 3 fuentes; aquí superado): A (habilidad Esquivar), B (recuerdo `jugadaPiña`), C (relación `arbol`), D (relación `equipo`), E (rama Mortaigne), F (recuerdo `teSentasteSobreElBalon` + regla de retención). ✓✓
- **El espejo se cierra:** el carnicero del cap 1 vuelve, y toda victoria crea `vengasteLaPalmada` para el cap 7. ✓ (biblia 17.8)
- **Sin castigo moral:** desde Mortaigne se gana (opción E). Lo que cambia es el sabor, no el resultado. ✓
- **Con riesgo:** casi todas las opciones de la jugada clave. ✓
- **Memoria cobrada:** promesas (cap 2), piña (cap 3), Roblerto (cap 2-3), equipo (todo el libro), sentarse sobre el balón (cap 1), rama (cap 4). El capítulo lee seis capítulos hacia atrás. Esto es el objetivo del libro cumplido.
- **12 opciones** en total (3 escenas). ✓
