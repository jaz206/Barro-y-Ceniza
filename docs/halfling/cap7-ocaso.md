# Barro y Ceniza — Halfling
## Capítulo 7 — El ocaso del pastel
### *Lo que dura un halfling que sobrevivió*

Prosa final. Sigue la biblia y la voz del halfling. **Es el cierre** (biblia 8.1, función "después", y 13.4, el cuerpo falla). Heredado de la build e integrado con la escena patrón oro del duelo de la abuela (`halfling-escena-duelo-abuela.md`), que va en su sitio aquí.

**Función del capítulo:** después. Qué queda. Lee de qué rama vienes, si estuviste con la abuela, si te vengaste del carnicero, si cumpliste tus promesas. Cierra los arcos y despide el libro. Cinco escenas: lo que vino después, la abuela, el duelo, el último domingo, el retiro.

**El cuerpo** (biblia 13.4): aquí ha llegado la bajada por edad. Berto es más lento, más ancho, le duele comer —que en un halfling es la última alarma—. Lo construido pesa ahora más que la ficha.

---

## Escena 1 — Lo que vino después

*[si `ganasteEnGrande`:]* Ganar aquella final os convirtió en leyenda: la única vez que un equipo de halflings ganó algo que importara. Os hicieron cromos, canciones, y un pastel con vuestra cara que se vendía en toda la Comarca y sabía regular.
*[si `perdisteConHonor`:]* No ganasteis, pero perder así, de pie, delante de sesenta mil personas, os hizo más famosos que ganar. La gente recuerda al pequeño que lo intentó mejor que a los grandes que lo lograron.
*[si no:]* La temporada pasó, como pasan las cosas de los halflings, sin mucho ruido y con mucha comida.

Han pasado los años.

*[si `fichastePorMortaigne`:]* Volviste de Mortaigne, tarde y con la camiseta negra guardada en un cajón que no abres. Los Comepasteles te acogieron sin preguntar, porque los halflings no preguntan. Pero hay una silla en la que tardaste en volver a sentarte, y todos lo notaron, y nadie lo dijo.
*[si no:]* Sigues en Villapastel, más lento, más ancho, con las rodillas que avisan del tiempo.

Te duele comer, que en un halfling es la última alarma.

**Opciones:**

**A — Enseñar a los pequeños del pueblo a jugar. Y a caer.**
→ `Honor:2`, `rel:{equipo:1, aficion:1}`, flag `enseñaste`
> Montas una escuela en el campo de tablones. Les enseñas a esquivar, a esperar, a hacer la piña, y sobre todo a caer sin romperse. La mitad quiere ser tú. La otra mitad quiere ser Roblerto. Ninguno quiere ser carnicero. Algo has hecho bien.

**B — Retirarte a la cocina, a amasar. Pero ahora con paz.**
→ `Voluntad:2`, `rel:{abuela:1}`, flag `vuelvesAlaCocina`
> Cuelgas las botas y vuelves al horno. Amasas, pero ya no con odio: con las manos de alguien que ha vivido. El pan sale más blando. La gente viene de lejos a comprarlo y a que les cuentes, otra vez, lo de la palmada al carnicero.

**C — Seguir jugando. Aunque duela. Aunque te partan.**
→ `Ferocidad:1`, `Voluntad:1`, `rel:{equipo:1}`, flag `sigues`
> No sabes parar. Sigues saltando al campo cada domingo, más lento, más magullado, corriendo con la memoria de las piernas que tenías. Un halfling que no sabe retirarse es lo más triste y lo más bonito que hay en el barro.

*Deja para después: `enseñaste` desbloquea el pase final a un joven en el último partido, y hace que la escuela venga a ver tu despedida. `vuelvesAlaCocina` conecta con el duelo (amasar es lo que Berto hace cuando no sabe qué hacer).*

---

## Escena 2 — La abuela

*[si `rel.abuela` alto:]* Tu abuela sigue tejiendo en primera fila del campo de tablones, más despacio, calculando apuestas que ya no cobra porque le da pereza el carro.
*[si no:]* Tu abuela ya casi no viene al campo. Dice que hace frío. Tú sabes que no es el frío.
*[si `fichastePorMortaigne` y `rel.abuela` bajo:]* Tu abuela no fue a verte jugar ni una vez desde que te pusiste la camiseta negra. No por rencor —tu abuela no sabe guardar rencor, solo cena— sino porque Mortaigne le quedaba lejos, y el carro caro, y tú nunca mandaste a buscarla.

Un día la encuentras en la cocina, con el guiso a medias y la labor caída, mirando por la única ventana que da al camino, la misma por la que tú soñabas con irte. "Todos los carros que pasaban", dice, sin girarse, "y tú fuiste el único tonto que se subió a uno". Es lo más parecido a un orgullo que le has oído nunca.

**Opciones:**

**A — Sentarte a comer con ella. En silencio, como toca.**
→ `Honor:2`, `Voluntad:1`, `rel:{abuela:2}`, flag `ultimaComida`
> Coméis en silencio, que entre halflings es la conversación más honda que hay. Al levantarte, te guarda un trozo de tarta "para el camino". No hay camino. Los dos lo sabéis. Te lo comes de vuelta a casa, despacio, para que dure.

**B — Contarle, por fin, lo de la palmada al carnicero, con detalle.** *(mejor si `vengasteLaPalmada`)*
→ `rel:{abuela:1, aficion:1}`, flag `leContasteALaAbuela`
> Se lo cuentas todo: la carrera, el salto, la cara del grande sentado en el barro. Ella teje y escucha, y al final, sin levantar la vista: "Menudo tonto". Pero teje sonriendo, que en tu abuela es una ovación de pie.
> *[si `vengasteLaPalmada`:]* "Ya te dije yo", añade, "que a ese algún día se lo comía el suyo". Tardó una vida. Pero se lo comió el suyo, y fuiste tú.

**C — Prometerle que dejarás el barro. Aunque los dos sepáis que mientes.**
→ `Honor:-1`, `Voluntad:1`, `rel:{abuela:1}`, flag `mentiraPiadosa`
> Le prometes que lo dejas, que te quedas en la cocina, que se acabó el correr detrás de un balón. Ella asiente, guarda la labor, y pone dos platos para mañana. Los dos sabéis que mañana no vas a estar. Es una mentira de las buenas.

*Deja para después: lo que hagas aquí es lo último que compartís antes del duelo (escena 3). `ultimaComida` y `leContasteALaAbuela` hacen que el duelo sea "estuviste". `mentiraPiadosa` es lo que duele si luego no vuelves.*

---

## Escena 3 — La cena que no hubo que guardar

*El duelo. Escena patrón oro (`halfling-escena-duelo-abuela.md`), integrada aquí. Sin opciones: se lee. Lee la rama, `rel.abuela` y los flags de la escena 2.*

No hay partido esta semana. No hay entrenamiento. Hay un carro que viene de Villapastel con un halfling en el pescante que no te mira a los ojos cuando te da la noticia, porque no hace falta. Lo sabes antes de que abra la boca.

Tu abuela ha muerto como vivió: sin avisar, sin drama, con el guiso a medias.

*[si estuviste — `rel.abuela` alto y (`ultimaComida` o `leContasteALaAbuela`):]*
> Llegas a tiempo de lo que importa, que no es el final, sino todo lo de antes. Estuviste. Comisteis en silencio la última vez, que entre vosotros era la manera de decirlo todo. Cerró los ojos sabiendo exactamente quién eras: el único tonto de la Comarca que se subió a un carro. En la cocina, la labor sigue caída donde la dejó. Y en la ventana, la única que da al camino, ya no hay nadie mirando pasar los carros. Pero durante un tiempo lo hubo, y te miraba a ti.

*[si no estuviste — `rel.abuela` bajo o `fichastePorMortaigne`, salvo que `escribisteALaAbuela`:]*
> Te enteras tarde. Siempre te enteras tarde de lo que pasa en Villapastel, porque Villapastel queda lejos de donde tú decidiste estar. *[si `fichastePorMortaigne`:]* Llevas la camiseta negra puesta cuando te lo dicen, y por primera vez te pesa como lo que es: una tela que te llevó lejos de la única ventana que importaba. Te guardó la cena cada noche. Muerto o vivo, decía, la cena a las ocho. La guardó todas las noches que estuviste fuera, que fueron muchas, hasta que una noche no hubo que guardarla.

*[si `escribisteALaAbuela` — el hilo de Mortaigne:]*
> No estuviste, pero le escribiste. Y en el cajón de su cocina, entre la labor, encuentran tus cartas torpes, dobladas y vueltas a doblar de tanto leerlas. Sabía de ti. Murió sabiendo que su tonto seguía comiendo, aunque no fuera a su mesa. El tarro de mantequilla que te mandó sigue sin abrir en tu cuarto de Mortaigne. Ahora ya no lo abrirás nunca. Ese era el punto.

*[si `mentiraPiadosa` y no estuviste:]*
> Lo último que le dijiste fue que lo dejabas, que volvías a la cocina, que te quedabas. Fue mentira, y ella lo sabía, y aun así te guardó la cena. Las abuelas saben cuándo les mientes. Te dejan hacerlo porque a veces la mentira es la única tarta que le queda a uno para ofrecer.

**[Cierre — el giro]**

Vuelves a Villapastel para el entierro. Es pequeño, como todo en la Comarca, como tú. Y de vuelta, en el carro, te das cuenta de que llevas toda la vida corriendo hacia el camino de esa ventana, y que ella se quedó en el otro lado, viéndote ir, tejiendo cada vez más despacio.

No dejes que te vean pequeño, te dijo una vez. Y si te ven, muérdeles el tobillo.

Nunca te dijo qué hacer cuando el tobillo que te falta por morder es el de la muerte, que no tiene tobillos y no se ríe de tu tamaño porque le das exactamente igual. Así que haces lo único que sabes hacer. Amasas. Un día entero, en su cocina, con su receta. Y cuando sacas la tarta del horno, la dejas enfriándose en la ventana. Por si acaso. Por si algún carro pasa.

→ `Voluntad:2`, `Honor:1`, flag `enterrasteALaAbuela`. *Sin opciones.*

---

## Escena 4 — El último domingo

**Partido: Los Tragaldabas de Villapán** *(el cierre circular; los mismos del derbi del cap 2, ahora con nietos)*

Tu último partido, y el destino, que tiene sentido del humor halfling, te enfrenta a los Tragaldabas de Villapán, los mismos del derbi de los descartes de aquella primera temporada, ahora con nietos gordos en el equipo. Es un partido que no decide nada: ni copa, ni liga, ni gloria. Solo tú, el barro, y las rodillas diciéndote que es la última vez.

*[si `enseñaste`:]* En la grada, media escuela de pequeños que enseñaste mira, aprendiendo cómo se dice adiós.
*[si `vengasteLaPalmada`:]* Uno de los nietos Tragaldabas te reconoce: "Mi abuelo dice que eres el único pastel que le ganó a un carnicero de verdad". Te haces viejo cuando tus hazañas las cuentan los nietos de otros.
*[si `enterrasteALaAbuela`:]* La silla de tu abuela, en primera fila, está vacía. Nadie se sienta en ella. Juegas para esa silla.

No hay nada en juego. Por eso importa tanto.

**Opciones:**

**A — Una última carrera. Todo lo que te queda, de una vez.**
*Tirada: MV (forzar la marcha, 3+; con la bajada por edad, más difícil que antes). Sin riesgo.*
- **Éxito:** → `fama:8`, gol, `rel:{equipo:2, aficion:2}`, flag `ultimoTD`
> Corres una última vez con todo lo que las rodillas te dejan, esquivas a un nieto gordo, y cruzas la línea despacio, saboreándolo. Te tumbas en la zona de anotación y no te levantas enseguida, riéndote, mirando el cielo de la Comarca. Un buen sitio para el último touchdown.
- **Fallo:** → `Voluntad:2`, flag `caisteSolo`
> Corres, y las rodillas te fallan a tres pasos de la línea. Te caes solo, sin que nadie te toque, que es la forma más honesta de que se acabe. Te levantas, te sacudes el barro, y sonríes: al menos ha sido corriendo.

**B — Dar el último pase a un joven del equipo. Que cruce él.** *(requiere `enseñaste`; forzable)*
*Tirada: PS (5+). Sin riesgo.*
- **Éxito:** → `fama:6`, `Honor:2`, gol, pase, `rel:{equipo:3}`, flag `paseFinal`
> En lugar de cruzar tú, sueltas un pase perfecto a uno de los pequeños que enseñaste, y él cruza su primer touchdown mientras tú miras desde atrás, con las manos en las rodillas, respirando. Tu último acto en el barro es hacer a otro. No hay mejor final para un maestro.
- **Fallo:** → `Honor:1`, gol rival
> El pase se va largo, que las manos también avisan. El pequeño no llega. Pero corre a por ti, no a por el balón, y te ayuda a salir del campo, y eso también es enseñar algo.

**C — Sentarte encima del balón, como el primer día, y dejar que el reloj cierre el círculo.** *(recuerdo `teSentasteSobreElBalon`)*
→ `Astucia:1`, `Voluntad:1`, `rel:{aficion:2}`, flag `cerrasteElCirculo`
> Te sientas sobre el balón, como la primera vez que jugaste, como toda la vida. Los Tragaldabas, que también son viejos, se sientan a esperar contigo. Y así, dos equipos de halflings sentados en el barro mientras el reloj corre, os despedís del deporte más brutal del Mundo Viejo de la única manera en que un halfling puede ganarle: aburriéndolo hasta el final. *[si `teSentasteSobreElBalon`:]* Siempre fuiste bueno sentándote donde no debías. Es justo que termines igual.

*Deja para después: `ultimoTD` / `paseFinal` / `cerrasteElCirculo` dan sabores distintos al retiro. El partido cierra el círculo con los Tragaldabas del cap 2.*

---

## Escena 5 — Cuelgas las botas

Se acabó. Cuelgas unas botas que nunca te quedaron bien del todo en el clavo del vestuario que huele a estofado.

*[si `ganasteEnGrande`:]* Eres una leyenda: el halfling que ganó una final de verdad. Los pequeños de toda la Comarca juegan a ser tú, y pierden, y no les importa.
*[si `ganasteLaCopa` (y no en grande):]* Tienes una copa de latón abollado en la repisa del horno, y es más que muchos grandes con vitrinas enteras.
*[si no:]* No ganaste casi nada, pero sobreviviste a todo, que en un halfling es la mayor de las hazañas.

*[si `fichastePorMortaigne`:]* La camiseta negra de Mortaigne sigue en un cajón. Un día la quemas en el horno. Huele a formol. El pan de esa hornada nadie lo compra, y haces bien en no venderlo.

Roblerto, si sigue, mira una mariposa. *[si `ramonVendido`:]* Roblerto no está: lo vendiste hace una vida, y hay un hueco junto a la charca donde nadie ha vuelto a plantar nada, porque no cabría. *[si `ramonEspectaculo`:]* Roblerto sigue, pero nunca volvió a traerte piedras. Algunas cosas se venden aunque no se firmen.

Bortrand cocina. Pipo cuenta un dinero que *[si `leisteContrato`:]* por fin no le debes, porque leíste la letra pequeña cuando tocaba. *[si no:]* todavía le debes, y te lo recuerda con cariño, porque Pipo cobra hasta de las leyendas.

Y tú, por fin, te sientas a la mesa de tu abuela *[si `enterrasteALaAbuela`:]* vacía, con dos platos que ya no hacen falta, y pones uno igualmente, por costumbre, por si algún carro pasa. *[si no:]* sin prisa.

**Opción única:**

**— Cerrar el libro. Ya está escrito.**
> Cierras el Libro del destino de un halfling que quiso jugar al deporte más brutal del Mundo Viejo, y lo hizo, y sobrevivió a más de lo que sobrevive un pastel. No es poca cosa. No es poca cosa para nadie.

---

### Notas de diseño del capítulo

- **El duelo integrado:** la escena patrón oro va en su sitio (escena 3), leyendo la rama, la relación y los flags de la escena 2. Es la primera escena del libro sin opciones, a propósito. ✓
- **Espejo cerrado:** `vengasteLaPalmada` se lee dos veces aquí (con la abuela y con el nieto Tragaldaba). ✓ (biblia 17.8)
- **Cierre circular:** los Tragaldabas del cap 2 y el sentarse sobre el balón del cap 1 vuelven. ✓
- **El retiro lee casi todo:** rama, resultado de la final, Roblerto (3 variantes), Pipo (2 variantes por `leisteContrato`), la abuela. Es el epílogo modular de la biblia (12.2). ✓
- **La ficha bajó por edad:** la última carrera es más difícil que la del cap 1, y el texto lo nota (las rodillas, el dolor de comer). ✓ (biblia 13.4)
- **Sin castigo moral, hasta el final:** la rama Mortaigne no da un peor final, da un final más frío y más solo. El jugador juzga. ✓
- **12 opciones + 1 escena de lectura.** ✓
