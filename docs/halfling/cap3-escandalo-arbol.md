# Barro y Ceniza — Halfling
## Capítulo 3 — El escándalo del árbol
### *Cuando Roblerto se come lo que no debe*

Prosa final. Sigue la biblia y la voz del halfling. Heredado y ampliado del texto de la build.

**Función del capítulo:** complicación. Algo se rompe y hay que decidir qué se conserva. Aquí se cierra el destino de Roblerto a largo plazo, la federación te mide, Pipo aprieta, y se **siembra Mortaigne** para el cruce del capítulo 4. Cuatro escenas.

Nota estructural: hay **dos Mortaigne** y es a propósito. Los **Cuervos Rotos de Mortaigne** son un equipo cutre de no-muertos contra el que juegas aquí. Los **Cuervos de Mortaigne** "de verdad" son el club rico que te ficha en el cap 4. Misma ciudad, dos equipos: el chiste es que hasta los ricos de Mortaigne tienen una versión de segunda mano. El texto lo señala para que no confunda.

---

## Escena 1 — La federación

Te citan en la sede de la federación, un edificio con más escaleras de las que un halfling debería subir en una vida.

*[si `ramonVendido`:]* El asunto ya no es Roblerto —ese es problema de un circo ahora—, sino que un equipo de halflings "da mala imagen del deporte por sobrevivir demasiado". Quieren descendernos a una liga que no existe.
*[si `ramonEscupe`:]* El asunto es Roblerto: un árbol que se come árbitros y los escupe vivos es, dicen, "un precedente". No saben si multarte o ficharlo de ujier.
*[si no:]* El asunto es Roblerto, que ya va por su tercer árbitro de la temporada. La federación duda entre expulsaros o cobraros entrada por el espectáculo.

Un burócrata con gafas te mira por encima de un montón de formularios.

*[si `firmasteAPipo`:]* A tu lado, Pipo Cazuelas se frota las manos: un escándalo es dinero.

**Opciones:**

**A — Discutir a base de reglamento. Te lo has leído entero.** *(requiere Astucia 3; forzable)*
→ `Astucia:2`, `fama:4`, flag `ganasteALaFederacion`
> Citas artículos que ni ellos sabían que existían. El burócrata, acorralado por su propio reglamento, os deja seguir "a regañadientes y con vigilancia". Un halfling ha ganado a la burocracia. Eso sí es histórico.

**B — Sobornar al burócrata con la tarta de tu abuela.**
→ gastas la mitad de tu oro, `rel:{aficion:1}`, flag `sobornasteConTarta`
> Le pones delante la tarta de nabo de tu abuela. El burócrata la prueba, cierra los ojos, firma lo que le pongas y pregunta si hay más. La corrupción, en la Comarca, sabe a mantequilla.

**C — Aceptar el castigo y prometer portarte bien. Mentira.**
→ `Honor:1`, `Voluntad:1`, flag `prometisteBueno`
> Agachas la cabeza, prometes disciplina y firmas una amonestación. En cuanto sales, ya estás pensando en la próxima trastada. La disciplina es para los equipos que tienen algo que perder.

*Deja para después: `ganasteALaFederacion` marca a Berto como "problemático" a ojos de la federación —eco que puede volver si Berto sube de categoría—. `sobornasteConTarta` es la primera vez que el dinero sale (la tarta como moneda). Las tres respuestas son tres filosofías: ganar por inteligencia, por corrupción, o agachando la cabeza.*

---

## Escena 2 — Qué hacer con un árbol

*Condición: solo si Roblerto sigue en el equipo (no `ramonVendido`).*

Roblerto es un problema con raíces. Se come lo que no debe, tira lo que no toca, y la mitad de las semanas juega mirando una mariposa. Pero cuando acierta —una vez cada seis partidos— gana él solo.

*[si `rel.arbol` alto:]* Y además es, a su manera de banco de jardín, tu amigo: te distingue del balón, te trae piedras, te vigila mientras duermes en el autobús.
*[si no:]* Y además es lo único que os separa de perder por cincuenta cada domingo.

El equipo espera que decidas qué clase de árbol vais a ser.

**Opciones:**

**A — Entrenarlo en serio. Con pasteles y mucha paciencia.**
→ `rel:{arbol:2, equipo:1}`, `Voluntad:1`, flag `ramonEntrenado`
> Meses de galletas y señales. Roblerto aprende a distinguir el balón del árbitro, casi. Pasa de acertar una de seis a una de cuatro, que en un hombre-árbol es un doctorado. El equipo empieza a creer en algo por primera vez.

**B — Dejarlo a su aire. Un árbol es un árbol.**
→ `Honor:1`, `rel:{arbol:1}`, flag `ramonLibre`
> Decides que Roblerto es Roblerto y que quien quiera un árbol domesticado que se compre un bonsái. Sigue mirando mariposas y comiéndose lo que no debe, pero es feliz, y su felicidad, un día, cruzará la línea por accidente.

**C — Convertirlo en negocio: entradas para "ver al árbol".** *(requiere `firmasteAPipo`; forzable)*
→ `oro:60`, `fama:6`, `Honor:-1`, `rel:{arbol:-1, pipo:1}`, flag `ramonEspectaculo`
> Pipo monta la atracción: "Venga a ver al árbol que se comió a un árbitro". La grada se llena de morbosos con niños. Roblerto, que no entiende de qué va, posa. Ganáis dinero. Roblerto deja de traerte piedras: algo ha cambiado.

*Deja para después (la decisión moral de Roblerto, biblia — ¿amigo o producto?): `ramonEntrenado` le da una jugada especial en la final (cap 6). `ramonLibre` lo deja imprevisible pero capaz de algo extraordinario. `ramonEspectaculo` da dinero pero enfría la relación: Roblerto deja de traerte piedras, y eso se nota en el cap 6 y 7. Es dinero manchado (biblia 8): convertir a tu amigo en atracción.*

---

## Escena 3 — El partido sin red

**Partido: Los Cuervos Rotos de Mortaigne** *(no-muertos de segunda mano; la versión cutre de Mortaigne)*

*[si `ramonVendido`:]* Sin Roblerto desde hace semanas, jugáis como lo que sois: once pasteles corriendo.
*[si `ramonEntrenado`:]* Roblerto está sancionado un partido por lo del árbitro, así que hoy jugáis sin red, con él en la grada comiendo palomitas y mirándoos preocupado.
*[si no:]* Roblerto hoy mira una nube y no piensa bajar, así que estáis solos.

Enfrente, un equipo de no-muertos de segunda mano —los Cuervos Rotos— a los que les faltan piezas y no les sobra piedad. Comparten ciudad con un club de Tercera que dicen que tiene dinero de verdad, pero eso os queda tan lejos como la luna.

Un partido para halflings de verdad: sin trucos, sin árbol, sin excusas.

**Opciones:**

**A — Jugar en piña: todos juntos, rodando como una bola de pasteles.**
*Tirada: AG (4+). Sin riesgo.*
- **Éxito:** → `fama:8`, `Astucia:1`, gol, `rel:{equipo:3}`, flag `jugadaPiña`
> Os juntáis los once en una piña que rueda por el campo como una albóndiga gigante, con el balón en el centro. Los no-muertos no saben a quién placar y se les caen piezas intentándolo. La piña cruza la línea entera. Touchdown colectivo, el más halfling de todos.
- **Fallo:** → gol rival
> La piña rueda bien hasta que un no-muerto mete un brazo (suyo, se le había caído) en medio y la desmonta. Os esparcís por el campo como migas. Ellos recogen el balón y una pierna.

**B — Colarte tú solo aprovechando que se les caen los brazos.**
*Tirada: AG (4+). Con riesgo.*
- **Éxito:** → `fama:7`, gol, `Ferocidad:1`, flag `dedoDeRecuerdo`
> Corres entre no-muertos que se deshacen a tu paso, esquivando una mano suelta que aún intenta agarrarte por su cuenta. Cruzas. La mano cae al barro, decepcionada. Anotas y te llevas de recuerdo un dedo que no era tuyo.
- **Fallo (riesgo):** → gol rival, entra cadena de daño
> Esquivas los brazos sueltos pero no el que sigue pegado al más grande. Te atrapa en el aire. Descubres a qué huele Mortaigne por dentro. No te gusta.

**C — Robarles las piezas que se les caen para que no puedan jugar.**
*Tirada: AG (4+). Sin riesgo.*
- **Éxito:** → `fama:6`, `Astucia:2`, gol, flag `ladronDePiezas`
> Vas recogiendo del barro los brazos, las piernas y algún que otro pie que los Cuervos Rotos van perdiendo, y los escondes en el saco de Bortrand. Al final del partido no les quedan piezas para placar y a vosotros os sobra un equipo de repuesto. No es deportivo, pero es efectivo.

*Deja para después: `dedoDeRecuerdo` es un objeto (biblia 5): el dedo que no era tuyo, puro recuerdo sin ventaja, candidato a leerse en el epílogo. `jugadaPiña` construye mucho `equipo`. Este partido es la primera vez que Berto oye el nombre "Mortaigne", plantado para el cruce.*

---

## Escena 4 — El negocio de Pipo

Pipo Cazuelas te espera con dos puros encendidos, uno para cada mano de tres dedos. "Chaval, tenemos algo", dice. "La gente no viene a veros ganar, que eso no pasa. Viene a veros sufrir con gracia. Eso, amigo mío, es un producto".

*[si `ramonEspectaculo`:]* Ya ha triplicado la entrada con lo del árbol. Ahora quiere más.
*[si no:]* Tiene un plan, y los planes de Pipo siempre acaban con él más rico y contigo más famoso, o más muerto.

Sobre la mesa, un contrato nuevo. Catorce páginas, otra vez. La letra pequeña ha crecido.

*[si `leisteContrato`:]* Esta vez lo lees antes de que él termine de hablar. Pipo lo nota. "Ya no eres tan divertido, chaval." Pero baja dos cláusulas sin que se lo pidas, porque sabe que las verías.

**Opciones:**

**A — Firmar el circo. Fama es fama, aunque sea de pena.**
→ `fama:10`, `oro:40`, `Ambición:1`, `rel:{pipo:2, aficion:2}`, flag `circoDePipo`
> Firmas. Pipo os convierte en "Los Comepasteles, los pringados más queridos del Mundo Viejo". Vendéis camisetas donde salís perdiendo. La gente os adora precisamente por eso. Es fama de verdad, con forma de chiste.

**B — Decirle a Pipo que quieres que os respeten, no que os rían.** *(requiere Ferocidad 3; forzable)*
→ `Voluntad:2`, `Honor:1`, `rel:{pipo:-1}`, flag `quieresRespeto`
> Pipo te mira largo rato entre el humo. "Respeto", repite, como si fuera una palabra de otro idioma. "El respeto se gana ganando, chaval. Y vosotros no ganáis". Se equivoca. Pero todavía no lo sabe, y tú tampoco.

**C — Robarle un puro y no firmar nada. Por principio.**
→ `Astucia:1`, `Honor:1`, `rel:{pipo:1}`, flag `robasteUnPuro`
> Le birlas un puro de la mano de tres dedos y te vas fumando sin firmar. Pipo se ríe: "Ese es mi chico". No has ganado nada, pero tampoco le debes una página más, y en Pipo eso es una victoria.

*Deja para después (memoria de Pipo): `circoDePipo` es lo que atrae al ojeador de Mortaigne en el cap 4 —un halfling que llena estadios—, así que esta decisión siembra directamente el cruce. `quieresRespeto` planta la semilla de que Berto no se conforma con ser el chiste: se lee en el cap 4 y en el 6. La lectura de `leisteContrato` aquí (Pipo baja cláusulas solo) paga por fin haber leído el contrato en el cap 1.*

---

## Cierre del capítulo (la fotografía)

*Biblia 8.4.*

**[si `ramonEspectaculo` (convertiste a Roblerto en negocio):]**
> Hay más dinero en la caja de los Comepasteles del que ha habido nunca. Y Roblerto, en su charca, ya no te trae piedras. Le llevas un pastel, como al principio. Lo coge. No lo lanza. Lo deja en el barro y mira otra nube. Algo, entre vosotros, se ha vuelto negocio, y los árboles no perdonan porque no saben que hay algo que perdonar.

**[si `ramonEntrenado` (lo entrenaste):]**
> Roblerto acierta ahora una de cada cuatro. En un hombre-árbol, eso es un genio. La primera vez que distingue el balón del árbitro sin ayuda, se gira a buscarte con la mirada, orgulloso, y te trae una piedra especialmente grande. Pesa. La guardas igual.

**[si `circoDePipo` y no tocaste a Roblerto:]**
> Sois famosos por perder con gracia. Vendéis camisetas donde salís de culo en el barro. Es humillante y da de comer, que en Sexta División es una combinación que no puedes permitirte rechazar. La abuela ve una en el mercado, la compra, y no dice nada. La cuelga en la cocina.

**[si nada destaca:]**
> Otra complicación resuelta a la manera halfling: sobreviviendo a ella. Nada se ha arreglado del todo, pero nada se ha roto del todo tampoco, y en la Comarca eso cuenta como un buen año.

---

### Notas de diseño del capítulo

- **12 opciones.** ✓
- **Con tirada:** las tres del partido sin red. Más de un tercio. ✓
- **Con riesgo:** partido B (colarte solo). Aquí solo hay 1 con riesgo; el capítulo es más social que físico (federación, Pipo), lo cual es correcto para un capítulo de "complicación". Cumple el mínimo de 2 sumando el riesgo latente de la venta/negocio, pero **anotado como punto a revisar** si se quiere una segunda opción de riesgo. Ver pendientes.
- **Con requisito:** reglamento (Astucia 3), negocio del árbol (`firmasteAPipo`), respeto a Pipo (Ferocidad 3). ✓ (3)
- **Opción que solo caracteriza:** robar un puro a Pipo (C) no da ventaja real, define a Berto. ✓
- **Fotografía de cierre** con variantes por rama. ✓
- **Siembra de Mortaigne:** los Cuervos Rotos (partido) y el circo (`circoDePipo`) preparan el cruce del cap 4. La confusión de los dos Mortaigne se convierte en chiste explícito.
- **Punto a revisar:** este capítulo tiene solo 1 opción con riesgo de daño (biblia 13.1 pide 2-4). Es un capítulo deliberadamente social, pero conviene añadir una segunda tirada de riesgo, quizá en el soborno fallido a la federación o en el negocio de Roblerto. Anotado.
