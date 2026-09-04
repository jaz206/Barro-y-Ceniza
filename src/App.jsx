import { useState, useEffect } from "react";
const SAVE = "barro-partida", VIDAS = "barro-vidas";
const leer = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
/* ====================== DATOS DE LA HISTORIA (HUMANO) ====================== */

const ATRIBUTOS = ["Voluntad", "Astucia", "Ferocidad", "Honor", "Ambición"];
const MAX_MUERTES = 3;

const HUMANO = {
  nombre: "Humano", lema: "Sin nada especial, y por eso peligroso.",
  puesto: "Blitzer Humano", reglas: ["Capitán del Equipo"],
  // PILOTO POSICIÓN EMERGENTE: el humano arranca sin definir (sin habilidades) y
  // se forma con las decisiones; la posición se revela al final. Ver
  // docs/posicion-emergente-piloto-humano.md.
  emergente: true,
  base: { MA: 7, ST: 3, AG: 3, AV: 9, hab: [] },
  // Ficha de crío: con la que empiezas de niño. Sube a la ficha del reglamento
  // (base) el día que firmas como profesional (capítulo 3, Sexta). Ver "firmaCap".
  fichaInicial: { MA: 5, ST: 2, AG: 3, AV: 7, hab: [] },
  firmaCap: 3,
  equipoInicial: "Los Charcos de Grünburg",
  rel: { familia: "Familia", ernst: "Ernst el Halcón", kurt: "Kurt Vogel", grimm: "Capitán Grimm", aficion: "Afición", club: "El club" },
  relInicial: { familia: 2, ernst: 0, kurt: 0, grimm: 0, aficion: 0, club: 0 },
  portada: "Naces en el barrio del Matadero de Valdoria, hijo de un hombre que derriba reses de un solo golpe. No eres el más fuerte ni el más rápido, y por eso tendrás que elegir mejor que nadie. Cada decisión quedará escrita en tu Libro del destino y te llevará, si sobrevives, hasta el Estadio Imperial.",

  capitulos: [
  { id: 1, titulo: "Infancia", sub: "Valdoria, barrio del Matadero", escenas: ["callejon", "matadero", "grada", "liese", "kurt1"] },
  { id: 2, titulo: "Juventud", sub: "Los años en que se decide todo", escenas: ["puerto", "padre", "kurt2", "prueba"] },
  { id: 3, titulo: "Sexta División", sub: "Los Charcos de Grünburg", escenas: ["hobart", "grimm", "derbi", "pipo", "carta", "ojeador"] },
  { id: 4, titulo: "La escalada", sub: "Puerto Maren, Talvia, Montefrío", escenas: ["vestuario", "ulrich", "kurt3", "ottokar", "cabalvision", "ofertaValdoria"] },
  { id: 5, titulo: "La cima", sub: "Los Halcones de Valdoria", escenas: ["mecenas", "cromo", "cuenco", "retiro"] },
  ],

/*  Escena: { titulo, texto(pj) , opciones: [ { txt, req:{attr:n}|{flag:"x"}|{rel:["kurt",n]}, forzable:true,
      fx:{ Voluntad:+1, oro:20, rel:{kurt:-1}, flag:"x", stat:{ST:1}, hab:"Placar" }, msg:"texto tras elegir",
      tirada:{ stat:"ST", obj:9, riesgo:true, ok:{txt,fx}, ko:{txt,fx} } } ] }
    Las opciones que no cumplen requisito se ven bloqueadas; con "forzable" se pueden forzar gastando Voluntad.  */

  escenas: {
  /* ---------------- CAPÍTULO 1 ---------------- */
  callejon: {
    titulo: "La vejiga de cerdo",
    texto: () => `Tienes seis años y el balón es una vejiga de cerdo que tu padre ha traído del matadero, todavía tibia. El campo es el callejón entre la curtiduría y el muro de la ciudad. Hay ocho niños, ninguna regla y un charco en el centro que nadie sabe cuánto profundiza. El mayor, un chico rubio y sin cejas llamado Kurt Vogel, decide los equipos. A ti te deja para el final.`,
    opciones: [
      { txt: "Coger la vejiga antes de que Kurt termine de hablar y echar a correr.", fx: { Ambición: 1, Ferocidad: 1, rel: { kurt: -1 } },
        msg: "Corres. Kurt grita. Los demás te siguen porque tienes el balón, y por primera vez alguien te sigue." },
      { txt: "Esperar a que te elijan y jugar donde te pongan.", fx: { Honor: 1, Voluntad: 1 },
        msg: "Te ponen en el charco. Juegas en el charco. No te quejas, y Kurt lo nota." },
      { txt: "Proponer una regla: quien pise el charco pierde el balón.", fx: { Astucia: 2 },
        msg: "Los niños aceptan la regla. Kurt es el primero en pisar el charco. Por la tarde ya es 'tu' regla." },
    ] },
  matadero: {
    titulo: "El matadero",
    texto: () => `Tu padre, Josef, tiene las manos del color de la carne cruda y un silencio que llena la casa. Un domingo te lleva al matadero antes del amanecer. 'Mira', te dice, y te enseña cómo se derriba una res de un solo golpe, en el sitio justo. 'Todo lo que pesa más que tú cae igual. Solo hay que saber dónde'. Luego te da el mazo.`,
    opciones: [
      { txt: "Golpear donde te ha enseñado.", fx: { Ferocidad: 2, rel: { familia: 1 }, flag: "mazo" },
        msg: "La res cae. Tu padre no dice nada, pero esa noche te sirve el primero. Nunca olvidas dónde hay que golpear." },
      { txt: "No poder. Soltar el mazo.", fx: { Honor: 1, Voluntad: 1, rel: { familia: -1 } },
        msg: "Sueltas el mazo. Tu padre lo recoge sin mirarte y termina el trabajo. No vuelve a llevarte." },
      { txt: "Preguntarle cuánto le pagan por cada res.", fx: { Astucia: 1, Ambición: 1 },
        msg: "'Dos peniques'. Te callas. Esa cifra se te queda grabada como una deuda." },
    ] },
  grada: {
    titulo: "La grada de los pobres",
    texto: (pj) => `A los diez años te cuelas por el desagüe del Estadio Imperial para ver a los Halcones de Valdoria. Hueles a cloaca y no te importa: abajo, en el barro, un liniero sale en camilla sin una pierna y sesenta mil personas aplauden. A tu lado, un viejo con una placa de metal en la cabeza te agarra del brazo. 'Ese era yo, hace veinte años', dice. 'Ernst Halcón. Y tú vas a acabar igual, o peor'.${pj.flags.mazo ? " Le miras las manos: tiene las mismas cicatrices que tu padre." : ""}`,
    opciones: [
      { txt: "Decirle que tú vas a ganar.", fx: { Ambición: 2, rel: { ernst: 1 } },
        msg: "El viejo se ríe hasta que le silba la placa. 'Ven mañana al muro. Te enseño a caer'." },
      { txt: "Preguntarle si dolió.", fx: { Honor: 1, Astucia: 1, rel: { ernst: 2 } },
        msg: "'Todos los días'. Se queda callado un rato. Luego te enseña a leer un campo desde la grada: dónde se abre, dónde se cierra." },
      { txt: "Soltarte y bajar hasta la valla para ver mejor.", fx: { Ferocidad: 1, Voluntad: 1 },
        msg: "Te pegas a la valla. Un orco de la grada de enfrente te tira una botella. La esquivas sin pensar." },
    ] },
  liese: {
    titulo: "La fiebre de Liese",
    texto: () => `Tu hermana pequeña, Liese, lleva tres días ardiendo. El apotecario pide diez coronas. Tu padre tiene dos. Tu madre ha empeñado el cazo. Hay un chico del barrio, el Bizco, que paga a niños por llevar paquetes al puerto sin preguntar qué llevan. Y está Kurt, que tiene dinero desde siempre y nunca ha dicho de dónde.`,
    opciones: [
      { txt: "Llevar los paquetes del Bizco.", fx: { Astucia: 1, Honor: -1, oro: 10, rel: { familia: 2 }, flag: "bizco" },
        msg: "Tres noches de paquetes. Liese vive. Tú aprendes que el puerto no cierra nunca y que nadie mira a un niño." },
      { txt: "Pedirle el dinero a Kurt.", req: { rel: ["kurt", 0] }, forzable: true, fx: { Honor: 1, rel: { kurt: 1, familia: 2 }, flag: "deudaKurt" },
        msg: "Kurt te lo da sin mirarte. 'Me lo debes'. Liese vive. La deuda, también." },
      { txt: "Robar el dinero de la caja del matadero.", fx: { Ferocidad: 1, Honor: -2, rel: { familia: 1 }, flag: "robo" },
        msg: "Liese vive. Al capataz le echan por la caja. Tu padre lo sabe, y nunca te lo dice." },
      { txt: "Rezar a Ludo en la capilla del estadio.", fx: { Voluntad: 2, Honor: 1 },
        msg: "Rezas dos noches en el suelo de piedra. Liese vive, por fiebre o por Ludo. Tú decides creer lo segundo." },
    ] },
  kurt1: {
    titulo: "El partido del muro",
    texto: (pj) => `Doce años. El barrio organiza su partido del solsticio contra los del Puente. Kurt es el capitán de tu equipo, claro. En la última jugada tienes el balón, Kurt está libre y grita tu nombre, y delante tienes a un chico del Puente el doble de ancho que tú.${pj.flags.deudaKurt ? " Kurt te mira como quien cobra." : ""}`,
    opciones: [
      { txt: "Pasársela a Kurt.", fx: { Honor: 1, rel: { kurt: 2 } },
        msg: "Kurt anota. Kurt es el héroe. Kurt te da una palmada en la espalda y se lleva la gloria a casa." },
      { txt: "Ir tú contra el ancho.", req: { Ferocidad: 2 }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
        ok: { txt: "Bajas la cabeza y el ancho cae. Cruzas la línea. El barrio corea tu nombre y Kurt no aplaude.", fx: { Ambición: 1, Ferocidad: 1, fama: 5, rel: { kurt: -2, aficion: 1 } } },
        ko: { txt: "El ancho no cae. Tú sí. Pierde el barrio, y Kurt no vuelve a pasarte el balón en un año.", fx: { Voluntad: 1, rel: { kurt: -1 } } } } },
      { txt: "Fintar hacia Kurt y correr por el otro lado.", req: { Astucia: 3 }, forzable: true, tirada: { stat: "AG", obj: 8, riesgo: false,
        ok: { txt: "Todo el mundo mira a Kurt, incluido el ancho. Tú ya has cruzado. Ernst, desde el muro, asiente una vez.", fx: { Astucia: 1, fama: 5, rel: { ernst: 1, kurt: -1 } } },
        ko: { txt: "La finta engaña a todos menos al ancho. Te alcanza de lado. Kurt recoge el balón suelto y anota él.", fx: { rel: { kurt: 1 } } } } },
    ] },

  /* ---------------- CAPÍTULO 2 ---------------- */
  puerto: {
    titulo: "Los cuatro caminos",
    texto: (pj) => `Dieciséis años. Ya eres más alto que tu padre. La ciudad te ofrece lo de siempre: la guardia de la ciudad busca reclutas que sepan tragarse órdenes; en el puerto se pelea por dinero en un almacén sin ventanas${pj.flags.bizco ? ", y el Bizco, que sigue vivo, te ha guardado sitio" : ""}; y Ernst, cada vez más encorvado, sigue enseñándote sin cobrarte nada: a caer junto al muro, y a leer el campo desde la grada antes de que la jugada pase.`,
    opciones: [
      { txt: "El almacén del puerto. Pelear por dinero.", fx: { Ferocidad: 2, oro: 30, stat: { AV: 1 }, flag: "peleas" },
        msg: "Un invierno de peleas. Te rompen la nariz dos veces y aprendes a que no importe. Tu armadura ya no es de cuero: es de costumbre." },
      { txt: "La guardia de la ciudad.", fx: { Voluntad: 2, Honor: 1, oro: 15 },
        msg: "Un año de guardias, de escudo y de formación. Aprendes a plantarte y a que no te muevan. Y a odiar las órdenes." },
      { txt: "Todos los días con Ernst en el muro.", req: { rel: ["ernst", 2] }, forzable: true, fx: { Astucia: 1, stat: { AG: 1 }, hab: "Esquivar", rel: { ernst: 2 } },
        msg: "Ernst te enseña a caer, a levantarte y a no estar donde te esperan. 'La velocidad es saber antes', dice. Un día ya no viene." },
      { txt: "Con Ernst en la grada, leyendo el campo. Ver el hueco antes de que exista.", req: { rel: ["ernst", 1] }, forzable: true, fx: { Astucia: 2, hab: "Pasar", rel: { ernst: 1 } },
        msg: "No corres ni peleas: miras. Ernst te hace contar jugadas en voz alta hasta que las adivinas. 'La mayoría mira el balón', dice. 'Tú mira el hueco. El balón acaba yendo ahí'." },
    ] },
  padre: {
    titulo: "Lo que pesa más que tú",
    texto: () => `Traen a tu padre del matadero en un carro, tapado con su propio delantal. Una res mal atada. El capataz, un tipo llamado Brauer, dice que fue culpa de Josef, y que el gremio no paga nada por descuidos. Tu madre no llora. Liese sí. Brauer está en la puerta, con el sombrero en la mano y el cuaderno de cuentas bajo el brazo.`,
    opciones: [
      { txt: "Golpear a Brauer donde tu padre te enseñó.", req: { flag: "mazo" }, forzable: true, fx: { Ferocidad: 2, Honor: -1, rel: { familia: 1 }, flag: "brauer" },
        msg: "Brauer cae como una res. Te buscan durante una semana. Cuando vuelves, el gremio ha pagado. Nadie explica por qué." },
      { txt: "Pedir el cuaderno y buscar el error.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, Honor: 1, oro: 40, rel: { familia: 2 } },
        msg: "Encuentras tres reses que no existen en el cuaderno de Brauer. El gremio paga lo que debe a tu madre, y Brauer desaparece de Valdoria." },
      { txt: "Enterrarle y volver al trabajo.", fx: { Voluntad: 2, rel: { familia: 1 } },
        msg: "Le entierras en el cementerio de los pobres. Llevas su mazo a casa. Trabajas doble, y Liese no vuelve a pasar hambre." },
      { txt: "Jurar sobre el cuerpo que saldrás del barrio.", fx: { Ambición: 3, rel: { familia: -1 } },
        msg: "Lo juras en voz alta, delante de todos. Tu madre te mira como si te hubiera perdido también. Quizá sea verdad." },
    ] },
  kurt2: {
    titulo: "Kurt tiene un contrato",
    texto: (pj) => `Kurt Vogel ha firmado con los Estibadores de Puerto Maren, en Quinta. Lo cuenta en la taberna con una camiseta nueva y una ronda pagada. Cuando te ve, levanta la jarra. ${pj.rel.kurt >= 2 ? "'Ven conmigo. Les hablaré de ti'." : pj.rel.kurt <= -2 ? "'Tú te quedarás en el callejón, con la vejiga'." : "'Igual algún día nos vemos en el campo'."}`,
    opciones: [
      { txt: "Beber con él y pedirle que hable por ti.", req: { rel: ["kurt", 1] }, forzable: true, fx: { Astucia: 1, Honor: -1, rel: { kurt: 1 }, flag: "recomendacionKurt" },
        msg: "Kurt habla de ti. Se asegura de decir que eres 'su' descubrimiento. Lo aceptas. Por ahora." },
      { txt: "Retarle a una carrera hasta el muro, ahora, delante de todos.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "MA", obj: 8, riesgo: false,
        ok: { txt: "Le ganas por tres cuerpos, borracho. La taberna entera lo ve. Kurt paga la ronda y no sonríe.", fx: { fama: 8, Ambición: 1, rel: { kurt: -2, aficion: 1 } } },
        ko: { txt: "Te gana por medio cuerpo. Se lo cuenta a todo Puerto Maren en su primer día.", fx: { Voluntad: 1, rel: { kurt: -1 } } } } },
      { txt: "Felicitarle y volver a casa.", fx: { Honor: 1, Voluntad: 1 },
        msg: "Le felicitas. Lo dices en serio y eso es lo que más le molesta." },
    ] },
  prueba: {
    titulo: "La prueba de Grünburg",
    texto: (pj) => `Los Charcos de Grünburg, de Sexta División, hacen pruebas en un campo de nabos a dos días de Valdoria. El entrenador es también el granjero, se llama Hobart, y hay una vaca en la zona de anotación. Treinta aspirantes. Dos plazas. ${pj.flags.recomendacionKurt ? "Hobart tiene una carta de Kurt en el bolsillo y no parece impresionado." : "Nadie sabe quién eres."} Su capitán, un veterano con placa en la cabeza llamado Grimm, va a probarte él mismo.`,
    opciones: [
      { txt: "Tumbar a Grimm en la primera jugada.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: true,
        ok: { txt: "Grimm cae. Se levanta despacio, se quita el barro y te da la mano. 'Firmado'. Los otros veintinueve se van a casa.", fx: { fama: 5, Ferocidad: 1, rel: { grimm: 2 }, hab: "Placar", flag: "fichado", flags: ["perfilBlitzer"] } },
        ko: { txt: "Grimm no cae. Tú sí, y mal. Hobart te ficha de todas formas: 'Necesito a alguien que sepa levantarse'.", fx: { Voluntad: 1, rel: { grimm: 1 }, flag: "fichado", flags: ["perfilBlitzer"] } } } },
      { txt: "Marcar sin que nadie te toque.", req: { hab: "Esquivar" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "Bailas entre los tres que te salen al paso y cruzas la línea rozando a la vaca. Grimm silba. 'Ernst te ha enseñado bien'.", fx: { fama: 5, Astucia: 1, rel: { grimm: 1 }, hab: "Esquivar", flag: "fichado", flags: ["perfilReceptor"] } },
        ko: { txt: "Te cortan el paso y acabas en el charco, que en Grünburg es la mitad del campo. Hobart te ficha porque el otro aspirante se ha ido con la vaca.", fx: { rel: { grimm: 0 }, flag: "fichado", flags: ["perfilReceptor"] } } } },
      { txt: "No tocar a nadie. Ver el hueco antes de que se abra y poner el balón ahí.", req: { hab: "Pasar" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "No corres: esperas. Cuando los treinta miran la vaca, sueltas un pase raso que cruza el campo de nabos y cae en las manos del único que se había movido. Grimm no silba. Se te queda mirando. 'Firmado. Y no por pegar'.", fx: { fama: 5, Astucia: 1, rel: { grimm: 1 }, hab: "Pasar", flag: "fichado", flags: ["perfilLanzador"] } },
        ko: { txt: "El pase se va largo y le da a la vaca, que ni levanta la cabeza. Se ríen. Hobart te ficha igual: 'Al menos miras antes de soltarla. Aquí no lo hace nadie'.", fx: { Voluntad: 1, rel: { grimm: 1 }, flag: "fichado", flags: ["perfilLanzador"] } } } },
      { txt: "Hacer lo que Grimm diga, jugada por jugada.", fx: { Honor: 1, Voluntad: 1, rel: { grimm: 2 }, flag: "fichado", flags: ["perfilLiniero"] },
        msg: "Obedeces cada indicación. No brillas. Grimm te elige: 'Los que brillan se van. Los que escuchan se quedan'." },
    ] },

  /* ---------------- CAPÍTULO 3 ---------------- */
  hobart: {
    titulo: "El contrato de los nabos",
    texto: () => `Hobart te ofrece el contrato sobre la mesa de su cocina: cinco coronas al mes, un catre en el granero y la mitad de las apuestas del pueblo si ganáis el derbi contra Kleinfeld. Lo firma con una cruz. Su mujer, detrás, te pone un plato de sopa sin preguntarte si tienes hambre.`,
    opciones: [
      { txt: "Firmar y comerte la sopa.", fx: { Honor: 1, rel: { club: 2 }, oro: 5 },
        msg: "Firmas. La sopa es la mejor que has comido desde que murió tu padre. Duermes con la vaca." },
      { txt: "Negociar las apuestas enteras para ti.", req: { Ambición: 3 }, forzable: true, fx: { Ambición: 1, Astucia: 1, oro: 15, rel: { club: -1 } },
        msg: "Hobart acepta con un gruñido. Su mujer se lleva el plato de sopa antes de que lo toques." },
      { txt: "Pedir que parte del sueldo vaya a tu madre en Valdoria.", fx: { Honor: 2, rel: { familia: 2, club: 1 } },
        msg: "Hobart te mira raro y acepta. Cada mes sale un carro hacia Valdoria con dos coronas y un saco de nabos." },
    ] },
  grimm: {
    titulo: "Lo que Grimm sabe",
    texto: (pj) => `Grimm jugó tres partidos en Primera hace veinte años, hasta que un troll de los Rompecráneos lo devolvió a Sexta con una placa en la cabeza. ${pj.rel.ernst >= 3 ? "Conoció a Ernst. 'El mejor que vi caer', dice, y cuando le cuentas cómo murió, se queda callado un rato largo." : ""} Una tarde te sienta en el banco y te ofrece un trato: te enseña todo lo que sabe, jugada a jugada, a cambio de un favor que no quiere decir ahora.`,
    opciones: [
      { txt: "Aceptar el trato sin preguntar.", fx: { Voluntad: 1, stat: { ST: 1 }, rel: { grimm: 2 }, flag: "favorGrimm" },
        msg: "Grimm te enseña a leer el choque antes de que ocurra. Ganas fuerza donde importa. Y una deuda sin fecha." },
      { txt: "Preguntar qué favor.", req: { Astucia: 4 }, forzable: true, fx: { Astucia: 1, rel: { grimm: 1 } },
        msg: "'Cuando estés arriba, y vas a estarlo, me llevas contigo. Un partido. Uno solo'. Aceptas. Te enseña la mitad de lo que sabe." },
      { txt: "Rechazar. No debes nada a nadie.", req: { Voluntad: 3 }, forzable: true, fx: { Voluntad: 1, Honor: 1, rel: { grimm: -1 } },
        msg: "Grimm se encoge de hombros. 'Entonces mira y aprende solo'. Lo haces. Más despacio." },
    ] },
  derbi: {
    titulo: "El derbi de los nabos",
    partido: { rival: "Los Cuervos de Kleinfeld", fuerza: 1, tipo: "derbi" },
    texto: () => `El derbi contra Kleinfeld se juega en su campo, que es peor que el vuestro. Doscientas personas, la mitad borrachas, y un árbitro que es el herrero del pueblo. En la primera jugada su capitán, un tipo con un diente de oro, va directo a por Grimm.`,
    opciones: [
      { txt: "Cruzarte y chocar con el del diente de oro.", tirada: { stat: "ST", obj: 8, riesgo: true,
        ok: { txt: "El diente de oro sale volando. Literalmente: lo encuentran en la grada. Grimm te mira y asiente. El partido es vuestro.", fx: { fama: 8, Ferocidad: 1, rel: { grimm: 1, aficion: 2 }, gol: 1 } },
        ko: { txt: "Te cruzas y él te pasa por encima. Grimm cae después. Kleinfeld anota y su grada os tira nabos.", fx: { Voluntad: 1, golRival: 1 } } } },
      { txt: "Dejar que Grimm se ocupe y buscar el balón.", tirada: { stat: "AG", obj: 8, riesgo: false,
        ok: { txt: "Grimm aguanta el choque y tú te llevas el balón por la banda hasta la línea. Anotas y la vaca de Kleinfeld muge.", fx: { fama: 6, Astucia: 1, gol: 1, rel: { aficion: 1 } } },
        ko: { txt: "Grimm aguanta, pero tú resbalas en el barro con el balón. Lo pierdes. Kleinfeld anota.", fx: { golRival: 1 } } } },
      { txt: "Pisar al primero que caiga, sea quien sea.", req: { Ferocidad: 4 }, forzable: true, tirada: { stat: "ST", obj: 7, riesgo: false, falta: true,
        ok: { txt: "Cae uno de Kleinfeld y lo pisas. El herrero-árbitro está mirando a otro lado. Kleinfeld pierde a su mejor liniero y el partido.", fx: { fama: 3, Honor: -1, Ferocidad: 1, gol: 1, flag: "sucio" } },
        ko: { txt: "El herrero te ve. Te expulsa y su mujer te tira un cubo. Kleinfeld anota sin ti en el campo.", fx: { Honor: -1, golRival: 1, expulsion: true } } } },
    ] },
  pipo: {
    titulo: "Pipo Cazuelas",
    texto: (pj) => `Un halfling con sombrero de copa y tres dedos te espera junto al granero. Se llama Pipo Cazuelas, representa a jugadores, y en 2489 llevó a uno hasta Primera. No dice qué pasó después. ${pj.fama >= 15 ? "Ha oído tu nombre en tres tabernas." : "No ha oído tu nombre en ninguna parte, pero le gustan tus piernas."} Te ofrece contratos mejores a cambio de un tercio de todo.`,
    opciones: [
      { txt: "Firmar con Pipo.", fx: { oro: 30, fama: 5, Ambición: 1, flag: "pipo" },
        msg: "Firmas. Pipo te consigue botas nuevas y un partido amistoso con público. Se lleva su tercio hasta de la sopa." },
      { txt: "Echarle del granero.", fx: { Voluntad: 1, Honor: 1 },
        msg: "Pipo se va con el sombrero en la mano. 'Volverás a verme cuando necesites a alguien que hable por ti'." },
      { txt: "Ofrecerle un quinto, o nada.", req: { Astucia: 4 }, forzable: true, fx: { Astucia: 1, oro: 30, fama: 5, flag: "pipo" },
        msg: "Pipo regatea media hora, se rinde en un quinto y te respeta más por ello. Nunca vuelve a intentar engañarte. Solo a los demás." },
    ] },
  carta: {
    titulo: "Una carta de Valdoria",
    texto: (pj) => `Llega una carta de Liese. Escribe con letra apretada: tu madre tose, el alquiler ha subido y ${pj.rel.familia >= 3 ? "los nabos de Hobart son lo único que llega cada mes" : "hace tiempo que no saben nada de ti"}. No pide nada. Por eso duele.`,
    opciones: [
      { txt: "Mandar todo el oro que tienes.", req: { oro: 20 }, fx: { oroTodo: true, Honor: 2, rel: { familia: 3 } },
        msg: "Mandas hasta la última corona. Duermes con la vaca un mes más y no te importa." },
      { txt: "Mandar la mitad y guardar el resto para salir de Sexta.", fx: { Ambición: 1, oroMitad: true, rel: { familia: 1 } },
        msg: "Mandas la mitad. Liese responde con una sola línea: 'Gracias. Vuelve ganando'." },
      { txt: "No contestar todavía. Primero subir.", fx: { Ambición: 2, Voluntad: 1, rel: { familia: -2 } },
        msg: "Guardas la carta en la bota. La lees antes de cada partido. No respondes." },
    ] },
  ojeador: {
    titulo: "El hombre de Puerto Maren",
    texto: (pj) => `Un ojeador de los Estibadores de Puerto Maren, en Quinta, se ha sentado tres partidos seguidos en la grada de Grünburg, entre los borrachos. Hoy te espera con el contrato bajo el brazo. ${pj.flags.recomendacionKurt ? "Kurt Vogel es su capitán, y ha pedido expresamente que te fichen." : pj.rel.kurt <= -2 ? "Kurt Vogel es su capitán, y ha pedido expresamente que no." : "Kurt Vogel es su capitán."} ${pj.flags.brauer ? "El ojeador tiene la nariz torcida hacia la izquierda. Es Brauer. El gremio lo echó por tu culpa; ahora cobra por encontrar carne. 'Te ficho igual', dice. 'Cobro por verte sangrar'." : pj.flags.robo ? "El ojeador te mira como quien ha leído un cuaderno de cuentas con una caja vacía. No dice nada. Todavía." : ""} Hobart está en la puerta del granero con la cara de quien ya lo sabía.`,
    opciones: [
      { txt: "Firmar con Puerto Maren.", req: { fama: 10 }, forzable: true, fx: { fama: 10, oro: 40, Ambición: 1, division: 5, equipo: "Los Estibadores de Puerto Maren", rel: { club: -2, grimm: -1 }, flags: ["brauerOjeador"] },
        msg: "Firmas en la puerta del granero. Hobart te da la mano. Grimm no sale a despedirse. El carro de nabos a Valdoria deja de salir." },
      { txt: "Pedir que Grimm venga contigo.", req: { flag: "favorGrimm" }, forzable: true, fx: { fama: 10, oro: 20, Honor: 2, division: 5, equipo: "Los Estibadores de Puerto Maren", rel: { grimm: 3, club: -1 }, flag: "grimmContigo" },
        msg: "El ojeador tuerce el gesto. Grimm, con su placa silbando, firma un contrato de un partido. El favor está pagado. Vais los dos." },
      { txt: "Quedarte un año más con los Charcos.", fx: { Honor: 2, Voluntad: 1, rel: { club: 3, aficion: 2, grimm: 1 }, fama: 5, flag: "fiel" },
        msg: "Te quedas. Grünburg te hace una pancarta con una sábana. Al año siguiente vuelven a por ti, con más oro y menos paciencia." },
    ] },

  /* ---------------- CAPÍTULO 4 ---------------- */
  vestuario: {
    titulo: "La capitanía",
    texto: (pj) => `Kurt Vogel ha firmado por Talvia por el doble de sueldo, y lo ha hecho el día antes del primer entrenamiento de Cuarta. El vestuario de los Estibadores, que ya es tuyo desde hace dos temporadas, tiene ahora una taquilla vacía en el centro y una pregunta en el aire. Erwin, el chico de Talvia ${pj.flags.rodillaVendada ? "que vino a quitarte el puesto cuando tenías la rodilla vendada y se volvió a su casa" : pj.flags.rodillaCurada ? "al que le quitaste el puesto en dos partidos y que no te odia, aunque debería" : "que llegó cuando estabas lesionado"}, se ha sentado en el banco de Kurt. ${pj.flags.anselmMuerto ? "El catre de Anselm sigue vacío. Nadie lo ha ocupado." : "Anselm ronca al fondo, despierto."} El entrenador dice que el capitán lo elige el vestuario, y el vestuario te mira.`,
    opciones: (pj) => [
      { txt: "Aceptar la capitanía.", req: { fama: 20 }, forzable: true, fx: { Voluntad: 1, Ambición: 1, rel: { club: 2, aficion: 1 }, flag: "capitan" },
        msg: "Coges la taquilla del centro. No gotea. Erwin se levanta del banco de Kurt sin que nadie se lo pida, y desde ese día juega detrás de ti, cubriéndote, como si te debiera algo." },
      { txt: "Proponer a Erwin. Es mejor que tú con la bola, y lo sabes.", fx: { Honor: 2, Astucia: 1, rel: { club: 3 }, flag: "capitanErwin" },
        msg: "Erwin no entiende nada. Luego entiende. Es un capitán serio, callado, que reparte el balón como si fuera de todos. En el campo, contigo, es otra cosa: no te suelta." },
      { txt: "Comprar el vestuario con una ronda y quedarte la taquilla.", req: { Astucia: 4 }, forzable: true, fx: { Astucia: 1, Honor: -1, oro: -15, rel: { club: 1 }, flag: "capitanComprado" },
        msg: "La ronda cuesta quince coronas y una parte de algo que no tiene precio. Eres capitán. Erwin te mira como tú mirabas a Kurt. Ya sabes cómo acaba eso." },
      ...(pj.flags.anselmMuerto && pj.flags.hijaAnselm ? [{ txt: "Pedir que la taquilla de Anselm se quede vacía, para siempre, y que el capitán sea quien quiera.", fx: { Honor: 3, rel: { club: 3 }, flag: "taquillaAnselm" },
        msg: "El vestuario vota tu propuesta sin votar la otra. La taquilla de Anselm queda vacía con el clavo de herradura dentro. El capitán es Erwin, y el primer partido lo dedica a un liniero al que no conoció." }] : []),
    ] },
  ulrich: {
    titulo: "Ulrich Manoslargas",
    texto: () => `El árbitro del partido contra Talvia es Ulrich Manoslargas: expulsado de la federación dos veces, readmitido tres. Su precio es de todos conocido: cuarenta coronas en la taquilla del vestuario visitante, sin nota. Kurt ya ha pagado su parte. Mira tu bolsa.`,
    opciones: [
      { txt: "Pagar tu parte.", req: { oro: 40 }, fx: { oro: -40, Honor: -1, ventaja: 1, rel: { kurt: 1 } },
        msg: "Dejas las cuarenta coronas. El partido es cómodo. Ulrich no pita ni una de las tres faltas que hacéis." },
      { txt: "No pagar y jugar limpio.", fx: { Honor: 2, Voluntad: 1, rel: { kurt: -1 } },
        msg: "No pagas. Ulrich te pita todo lo pitable y te ignora cuando te pisan dos veces. Pierdes un diente. Ganáis igual." },
      { txt: "Pagar y contárselo a la Cristalvisión al acabar.", req: { Astucia: 5 }, forzable: true, fx: { oro: -40, fama: 15, Astucia: 1, Honor: 1, rel: { kurt: -2 }, flag: "enemigoUlrich" },
        msg: "Pagas, ganáis, y a la salida lo cuentas con el cristal de la Cristalvisión delante. Ulrich es expulsado por cuarta vez. Kurt te mira como a un traidor. Ulrich, como a un muerto." },
    ] },
  kurt3: {
    titulo: "Los hermanos del callejón",
    partido: { rival: "Las Picas de Talvia", fuerza: 3 },
    texto: (pj) => `Kurt lleva media temporada en Talvia y hoy vuelve a Puerto Maren, con la camiseta del otro lado. ${pj.flags.capitanErwin ? "Erwin, tu capitán, te ha dicho antes del partido: 'Es tuyo. Yo cubro'." : pj.flags.capitan ? "Eres el capitán y todo el mundo mira lo que haces con él." : ""} La Cristalvisión lo vende como 'los hermanos del callejón'. ${pj.rel.kurt <= -2 ? "Kurt ha dicho en la prensa que te enseñó todo lo que sabes." : "Kurt te ha mandado una nota antes del partido: 'Sin rencor'. No te la crees."} Último turno, empate. Kurt tiene el balón y va hacia tu línea. Solo quedas tú.`,
    opciones: [
      { txt: "Entrar a matar.", tirada: { stat: "ST", obj: 10, riesgo: true,
        ok: { txt: "Tres pasos y un choque que se oye en el callejón de vuestra infancia. Kurt cae. No se levanta en un rato. Su grada calla y la tuya grita tu nombre.", fx: { fama: 15, Ferocidad: 1, gol: 1, rel: { kurt: -3, aficion: 3 }, flag: "kurtCaido" } },
        ko: { txt: "Tres pasos y un choque. Kurt sigue en pie. Tú no. Anota pasándote por encima y te sonríe desde la zona de anotación.", fx: { golRival: 1, rel: { kurt: 1 } } } } },
      { txt: "Cerrarle el paso sin tocarle, como enseñaba Ernst.", tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "Bailas delante de él, le cierras cada hueco, y tus compañeros llegan. Kurt pierde el balón sin que le hayas tocado. Ernst, dondequiera que esté, asiente.", fx: { fama: 10, Astucia: 1, gol: 1, rel: { ernst: 1, aficion: 2 } } },
        ko: { txt: "Le cierras y te cambia el ritmo. Se va por tu lado bueno. Anota. Te enseña el balón desde lejos.", fx: { golRival: 1 } } } },
      { txt: "Dejarle pasar.", req: { rel: ["kurt", 3] }, forzable: true, fx: { Honor: -2, golRival: 1, rel: { kurt: 3, aficion: -3, club: -2 }, flag: "dejasteKurt" },
        msg: "Te apartas. Kurt anota. Tu grada te abuchea durante diez minutos y Kurt te abraza en la zona de anotación. Nadie entiende nada. Vosotros sí." },
    ] },
  ottokar: {
    titulo: "Ottokar el Mediano",
    texto: () => `El club ha contratado a un mago: Ottokar el Mediano, con el pelo quemado por un lado y algo que se mueve dentro de la manga. Te ofrece 'una mejora'. Menciona 'mutación' dos veces y 'reversible' ninguna. El precio es un favor futuro, y una firma con sangre, que dice que es 'formalidad'.`,
    opciones: [
      { txt: "Aceptar el ritual.", fx: { mut: true, Honor: -1, flag: "mutado" },
        msg: "Firmas con sangre. Duele tres días. Cuando deja de doler, algo en ti ha cambiado para siempre. Liese, cuando te ve, tarda un segundo en reconocerte. Un segundo que dura." },
      { txt: "Decir que no, muy despacio, sin apartar la vista.", fx: { Voluntad: 2 },
        msg: "Retrocedes sin dejar de mirarle. Ottokar sonríe. Al día siguiente prueba con un liniero, que ahora tiene tres ojos y anota mejor." },
      { txt: "Preguntar qué hay en la manga.", req: { Astucia: 5 }, forzable: true, fx: { Astucia: 1, fama: 5, rel: { club: 1 } },
        msg: "Es una rata con la cara de Ottokar. Se lo cuentas al club. Ottokar se va de la ciudad esa noche. Te deben una." },
    ] },
  cabalvision: {
    titulo: "Diez segundos",
    texto: (pj) => `Un reportero de la Cristalvisión, con un cristal mágico flotando junto a la cabeza, te aborda a la salida. 'Diez segundos. Di algo que se recuerde'. Detrás de él, medio Imperio. ${pj.flags.kurtCaido ? "Todo el mundo quiere saber qué sientes por Kurt." : pj.flags.dejasteKurt ? "Todo el mundo quiere saber por qué dejaste pasar a Kurt." : "Todo el mundo quiere saber quién eres."}`,
    opciones: [
      { txt: "Insultar a Kurt por su nombre.", fx: { fama: 15, Ferocidad: 1, rel: { kurt: -3, aficion: 2 } },
        msg: "Lo que dices de Kurt se repite en todas las tabernas del Reino del Val durante un mes. Kurt no responde. Eso es peor." },
      { txt: "Dedicárselo a tu madre y a Liese.", fx: { fama: 8, Honor: 1, rel: { familia: 3, aficion: 1 } },
        msg: "Lo dices y se te quiebra la voz un poco. En Valdoria, en una casa del Matadero, tu madre lo ve en el cristal de la taberna y no dice nada. Liese sí." },
      { txt: "Apartar el cristal de un manotazo.", fx: { fama: -5, Voluntad: 1, rel: { aficion: 1, club: -1 } },
        msg: "El cristal se hace añicos contra la pared. La Cristalvisión te cobra el cristal y te llama 'el Mudo' durante dos temporadas." },
    ] },
  ofertaValdoria: {
    titulo: "La carta con el sello del Halcón",
    texto: (pj) => `Has subido dos categorías en tres temporadas. La carta llega en un sobre con el sello de los Halcones de Valdoria: quieren que juegues en el Estadio Imperial, en Primera, en el mismo barro que viste desde el desagüe a los diez años. ${pj.flags.pipo ? "Pipo Cazuelas la ha leído antes que tú y ya está calculando su parte." : ""} ${pj.flags.grimmContigo ? "Grimm, que ya no juega, te la lee en voz alta porque le tiemblan las manos." : ""}`,
    opciones: [
      { txt: "Firmar. Es lo que juraste.", req: { fama: 40 }, forzable: true, fx: { fama: 20, oro: 100, Ambición: 2, division: 1, equipo: "Los Halcones de Valdoria", rel: { club: 0 } },
        msg: "Firmas con el sello del Halcón. Vuelves a Valdoria en un carruaje, por la puerta grande. Pasas por el callejón y ya no está el charco." },
      { txt: "Pedir que el contrato incluya a Grimm como entrenador.", req: { flag: "grimmContigo" }, forzable: true, fx: { fama: 15, oro: 60, Honor: 2, division: 1, equipo: "Los Halcones de Valdoria", rel: { grimm: 3 }, flag: "grimmEntrenador" },
        msg: "Los Halcones aceptan a regañadientes. Grimm entra en el Estadio Imperial por la puerta de los entrenadores, veinte años después, con la placa silbando." },
      { txt: "Rechazar. Aquí eres alguien.", fx: { Honor: 2, Voluntad: 2, fama: 5, rel: { club: 3, aficion: 3 }, flag: "rechazoValdoria" },
        msg: "Rechazas a los Halcones. La ciudad te hace capitán. Nunca juegas en Primera y nunca te arrepientes del todo." },
    ] },

  /* ---------------- CAPÍTULO 5 ---------------- */
  mecenas: {
    titulo: "El palco de noche",
    texto: (pj) => `${pj.flags.rechazoValdoria ? "El dueño de tu club" : "El dueño de los Halcones"} te recibe en su palco, de noche, porque solo recibe de noche. Es alto, pálido, extremadamente educado, y no come nada durante la cena. Te ofrece un contrato vitalicio. Subraya 'vitalicio' con la uña, que es larga.`,
    opciones: [
      { txt: "Firmar. El oro es real.", fx: { oro: 200, fama: 10, Honor: -1, flag: "vitalicio" },
        msg: "Firmas. El oro es real. El contrato también. Nunca preguntas qué significa 'vitalicio' para alguien que no come." },
      { txt: "Pedir tiempo hasta el amanecer.", req: { Voluntad: 5 }, forzable: true, fx: { Voluntad: 1, Astucia: 1, fama: 5 },
        msg: "'Hasta el amanecer', concede, y sonríe con la boca cerrada. Al amanecer ya no estás en la ciudad. Vuelves para el partido." },
      { txt: "Preguntarle qué come.", req: { Ferocidad: 5 }, forzable: true, fx: { Ferocidad: 1, fama: 10, rel: { club: -2 }, flag: "enemigoMecenas" },
        msg: "Se hace un silencio largo. 'A los curiosos', dice, y se ríe. Tú también, por si acaso. No firmas." },
    ] },
  cromo: {
    titulo: "El cromo",
    texto: (pj) => `Una editorial de Valdoria quiere hacer tu cromo. El dibujante, un elfo con monóculo, te pide que poses 'con la mirada de alguien que ha visto morir a un amigo en el campo'. ${pj.muertes > 0 ? "Tú has muerto " + pj.muertes + (pj.muertes === 1 ? " vez" : " veces") + ". Con eso vale." : "Lo has visto. Varias veces."}`,
    opciones: [
      { txt: "Posar como piden.", fx: { fama: 20, oro: 30 },
        msg: "El cromo se vende en todo el Imperio. Sales con la mirada perdida. Liese guarda uno en la cocina." },
      { txt: "Posar riéndote.", fx: { fama: 10, Voluntad: 1, rel: { aficion: 2 } },
        msg: "Tu cromo es el único de la colección en el que alguien sonríe. Los niños lo cambian por tres de Kurt." },
      { txt: "Pedir que dibujen a Ernst detrás de ti, como era antes de la placa.", req: { rel: ["ernst", 4] }, forzable: true, fx: { fama: 15, Honor: 2, rel: { ernst: 2, aficion: 2 } },
        msg: "El elfo dibuja a un hombre con dos piernas detrás de ti, con un cromo viejo por modelo. Nadie sabe quién es. Está muerto desde hace años. Tú sí lo sabes, y lo miras cada vez que firmas uno." },
    ] },
  cuenco: {
    titulo: "El Cáliz de Barro",
    partido: { rival: "Los Rompecráneos de Gorgomor", fuerza: 4 },
    texto: (pj) => `La final. ${pj.flags.rechazoValdoria ? "Tu equipo ha llegado desde abajo hasta aquí, y nadie lo esperaba." : "El Estadio Imperial, sesenta mil personas, y el desagüe por el que te colaste a los diez años queda justo debajo de tu banquillo."} Enfrente, los Rompecráneos, los mismos orcos que le pusieron la placa a Grimm. ${pj.flags.grimmEntrenador ? "Grimm está en tu banquillo, mirando al troll que le rompió la cabeza." : ""} Último turno, empate, el balón en tus manos y un troll entre tú y la línea.`,
    opciones: [
      { txt: "Ir contra el troll.", tirada: { stat: "ST", obj: 11, riesgo: true,
        ok: { txt: "Golpeas donde tu padre te enseñó: todo lo que pesa más que tú cae igual. El troll cae. Cruzas la línea con el silbato sonando y sesenta mil personas gritan un nombre que hace veinte años nadie sabía.", fx: { fama: 40, Ferocidad: 2, gol: 1, rel: { aficion: 5, grimm: 3, familia: 2 }, flag: "campeon" } },
        ko: { txt: "Golpeas. El troll no cae. Te mira, casi con curiosidad, y luego te aplasta. Lo último que ves antes del negro es el desagüe.", fx: { golRival: 1, rel: { aficion: 1 } } } } },
      { txt: "Esquivar al troll por el lado que no mira.", tirada: { stat: "AG", obj: 10, riesgo: true,
        ok: { txt: "El troll mira a la izquierda. Vas por la derecha. Cuando se da la vuelta ya estás cruzando la línea y Grimm está llorando en el banquillo. Campeones.", fx: { fama: 40, Astucia: 2, gol: 1, rel: { aficion: 5, grimm: 3, ernst: 2 }, flag: "campeon" } },
        ko: { txt: "El troll mira a la izquierda y luego, sin motivo, a la derecha. Te coge en el aire. No recuerdas más.", fx: { golRival: 1 } } } },
      { txt: "Esperar. Leer el choque como enseñaba Grimm: el troll se gira antes de golpear. Entrar cuando se gire.", req: { rel: ["grimm", 3] }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "No te mueves. El troll levanta el brazo y, como decía Grimm, gira medio cuerpo antes de bajarlo. En ese medio cuerpo hay un hueco del ancho de un chico del Matadero. Pasas por él. Cruzas con el silbato. Grimm, en el banquillo, con la placa silbando, no dice nada. Lo dijo todo en el granero.", fx: { fama: 30, Astucia: 2, Honor: 1, gol: 1, rel: { grimm: 5, aficion: 4, familia: 1 }, flag: "campeon", flags: ["campeonLeyendo"] } },
        ko: { txt: "Esperas. El troll no gira: los trolls de Gorgomor han aprendido. Baja el brazo recto. Lo último que ves es el desagüe. El Cáliz se va a Gorgomor y Grimm recoge su placa del banquillo sin mirar a nadie.", fx: { golRival: 1, rel: { grimm: 1 } } } } },
      { txt: "Pasar el balón al liniero de tres ojos, que nadie mira.", req: { Honor: 5 }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "Pasas. El liniero de tres ojos, el que nadie mira, anota. La gloria es suya. La final es vuestra. No te importa. Sí te importa. Un poco.", fx: { fama: 20, Honor: 3, gol: 1, rel: { club: 4, aficion: 2 }, flag: "campeon" } },
        ko: { txt: "Pasas. El balón se queda corto, el troll lo coge con dos dedos y se lo lleva a su línea. Pierdes la final por un pase.", fx: { golRival: 1, rel: { aficion: -3 } } } } },
    ] },
  retiro: {
    titulo: "Colgar las botas",
    texto: (pj) => `Las rodillas ya no aguantan y lo sabes. ${pj.flags.campeon ? "El Cáliz de Barro está en la vitrina con tu nombre grabado." : "El Cáliz de Barro nunca fue tuyo, y ya no lo será."} ${pj.rel.familia >= 4 ? "Liese ha venido a verte con sus hijos; el mayor tiene las manos de tu padre." : pj.rel.familia <= 0 ? "Nadie de Valdoria ha venido." : "Liese mandó una carta corta."} ${pj.flags.madreMuerta ? "Tu madre no está para verlo." : "Tu madre, vieja y viva de milagro, lo ve desde una silla."} ${pj.flags.vitalicio ? "Y hay un carruaje negro aparcado a la puerta del estadio, sin caballos, esperando a que se haga de noche. Firmaste un contrato vitalicio. Alguien ha venido a cobrarlo." : ""} Queda decidir qué haces con lo que queda de ti.`,
    opciones: [
      { txt: "Volver al Matadero y comprar el matadero.", req: { oro: 150 }, forzable: true, fx: { Honor: 2, rel: { familia: 3 }, flag: "finMatadero" },
        msg: "Compras el matadero de tu padre. Pagas cinco peniques por res, no dos. Los niños del callejón juegan con una vejiga tibia todos los domingos." },
      { txt: "Entrenar a los Charcos de Grünburg.", req: { rel: ["grimm", 2] }, forzable: true, fx: { Honor: 1, rel: { grimm: 2, club: 2 }, flag: "finGrunburg" },
        msg: "Vuelves al campo de nabos. La vaca ha muerto; hay otra. Cada año llega un chico que corre demasiado y tú le enseñas a caer." },
      { txt: "Vender tu nombre a la Cristalvisión y no volver a pisar el barro.", req: { fama: 60 }, forzable: true, fx: { oro: 300, Ambición: 1, rel: { aficion: -2 }, flag: "finCabina" },
        msg: "Te sientas en la cabina junto a Graznido y Lord Borchardt. Cobras por decir lo que otros hacen. A veces, cuando alguien cae, apartas la vista." },
      { txt: "Un partido más.", req: { Ferocidad: 5, noflag: "vitalicio" }, forzable: true, fx: { Ferocidad: 1, fama: 10, flag: "finBarro" }, msg: "Juegas uno más. Y otro. Hasta que un día no te levantas, y el público aplaude, y un niño en la grada de los pobres pregunta quién eras." },
      { txt: "Subir al carruaje negro. Un contrato es un contrato.", req: { flag: "vitalicio" }, fx: { Honor: 1, Voluntad: -2, flag: "finVitalicio" }, msg: "Subes. El mecenas te recibe con la boca cerrada. 'Vitalicio', repite, y sonríe por primera vez con los dientes. Sigues jugando. De noche, solo de noche, durante mucho, mucho tiempo. No envejeces. Sí te acuerdas." },
      { txt: "Ir a Talvia. Kurt tiene sitio.", req: { flag: "cartaKurt" }, forzable: true, fx: { Honor: 2, rel: { kurt: 3 }, flag: "finKurt" }, msg: "Llegas a Talvia con una bolsa. Kurt te espera en la puerta del estadio, con las manos en los bolsillos y las mismas rodillas. No os abrazáis. Entrenáis juntos veinte años y os insultáis cada mañana. Es lo más parecido a una casa." },
    ] },
  },
  muertes: [
  { titulo: "El apotecario", texto: "Te despiertas en la enfermería con un tubo en la boca y un apotecario enano contando monedas sobre tu pecho. 'Uno más', dice a alguien. 'Tres es el máximo'. Tu armadura ya no es la que era, pero respiras.", fx: { stat: { AV: -1 }, Voluntad: 1 } },
  { titulo: "La capilla de Ludo", texto: "Oscuridad, y luego una luz verde. Un sacerdote de Ludo te devuelve a golpes de balón sagrado. 'El dios del juego te concede otra jugada. No malgastes esta'. Notas que ya no corres igual.", fx: { stat: { MA: -1 }, Voluntad: 1 } },
  { titulo: "El nigromante", texto: "Vuelves con frío en los huesos y el olor de una tumba abierta. Un hombre de negro cobra a tu club y te mira como a una inversión. 'La última', dice. 'Después de esta, nadie te devuelve'. Tienes la mano un poco gris.", fx: { stat: { AG: -1 }, Honor: -1 } },
  ],
  epilogo: (pj, rasgo) => {
    const fin = pj.flags.finMatadero ? "Murió viejo, en el matadero de su padre, con las manos del color de la carne cruda." :
      pj.flags.finGrunburg ? "Murió en Grünburg, en el banquillo, con una vaca en la zona de anotación." :
      pj.flags.finCabina ? "Murió rico, en la cabina, con un micrófono en la mano." :
      pj.flags.finBarro ? "Murió en el barro, que era donde quería." :
      pj.flags.finVitalicio ? "No murió. Juega de noche, en un estadio que no sale en la Cristalvisión, para un público que no aplaude. Cumple contrato." :
      pj.flags.finKurt ? "Murió viejo, en Talvia, en la banda, discutiendo con Kurt Vogel una alineación." : "Nadie sabe bien cómo acabó.";
    return `${pj.nombre} fue ${rasgo}. ${pj.flags.campeon ? "Ganó el Cáliz de Barro." : "Nunca ganó el Cáliz de Barro."} ${pj.rel.kurt >= 3 ? "Kurt Vogel habló en su entierro." : pj.rel.kurt <= -3 ? "Kurt Vogel no fue a su entierro, pero mandó flores." : ""} ${pj.rel.familia >= 4 ? "Liese y sus hijos lo lloraron." : pj.rel.familia <= 0 ? "En Valdoria tardaron un mes en enterarse." : ""} ${pj.muertes > 0 ? `Murió ${pj.muertes + 1} veces; solo la última contó.` : ""} ${fin}`;
  },
};

/* ====================== ENANO ====================== */

/* ====================== ENANO — "EL QUE CORRE" ====================== */
const ENANO = {
  nombre: "Enano", lema: "Aquí no se corre. Aquí se entra en la caja.",
  puesto: "Corredor Enano", reglas: ["Brutos Brutales", "Sobornos y Corrupción"],
  base: { MA: 6, ST: 3, AG: 3, AV: 9, hab: ["Cabeza dura", "Esprintar", "Manos seguras"] },
  equipoInicial: "Los Cascos de Hierro de Baraz-Ankor",
  rel: { durak: "Durak Ojoferro", dorin: "Dorin Yunquefirme", helgra: "Helgra del banquillo", grimnir: "Grimnir Barbarroja", faelas: "Faelas, el elfo", brokk: "Brokk, tu hermano", aficion: "La grada de Baraz-Ankor", club: "Los Cascos de Hierro" },
  relInicial: { durak: 0, dorin: 0, helgra: 0, grimnir: 0, faelas: 0, brokk: 1, aficion: 0, club: 0 },
  portada: "Eres el corredor más rápido que ha nacido en la montaña, y fichas por los Cascos de Hierro de Baraz-Ankor el año en que el club más grande del mundo baja a Segunda por primera vez en trescientos años. Los enanos no corren: recogen el balón, entran en la caja y avanzan una casilla por turno hasta que el rival se queda sin gente. Tú corres. Ese es el problema, y la historia.",
  capitulos: [
    { id: 1, titulo: "La caja", sub: "Primera temporada en Segunda", escenas: ["primerDia", "lacaja", "helgra", "derbi", "invierno"] },
    { id: 2, titulo: "El descenso", sub: "Segunda temporada: la caja no basta", escenas: ["faelasLlega", "elfos", "dorinCae", "grimnirBusca", "descenso"] },
    { id: 3, titulo: "El motín", sub: "Tercera División, un vestuario partido", escenas: ["losJovenes", "pizarra", "motin", "copaTercera", "durakDecide"] },
    { id: 4, titulo: "El mercado", sub: "Vendido a un club que corre", escenas: ["laVenta", "fueraDeLaCaja", "brokk", "contraLosCascos", "laLlamada"] },
    { id: 5, titulo: "El regreso", sub: "Capitán de los Cascos", escenas: ["capitania", "dorinSeVa", "elTroll", "ascenso"] },
    { id: 6, titulo: "Primera", sub: "Los Cascos de Hierro contra las Hojas", escenas: ["laViuda", "elfoOEnano", "cristalvision", "final", "vestuarioFinalE"] },
    { id: 7, titulo: "El ocaso", sub: "Cómo juegan los Cascos cuando tú no corres", escenas: ["durakMuere", "elBanquillo", "ultimoPartido", "laMina", "retiro"] },
  ],
  muertes: [
    { titulo: "El apotecario del club", texto: "Te despiertas en la enfermería del estadio con un apotecario enano cosiendo sin mirar. 'El club paga uno por temporada', dice. 'Este era el de Dorin. Se lo debes'. Tu armadura ya no es la que era.", fx: { stat: { AV: -1 }, Voluntad: 1, rel: { dorin: 1 } } },
    { titulo: "La runa de Helgra", texto: "Vuelves con una runa en el pecho que no está en ningún libro. Helgra la grabó con un clavo del banquillo mientras todos miraban el marcador. 'Dos', dice. 'La tercera no la sé'. Ya no corres igual.", fx: { stat: { MA: -1 }, Voluntad: 1, rel: { helgra: 2 } } },
    { titulo: "Los ancestros", texto: "Ves a tus ancestros en una caja perfecta, avanzando una casilla por turno hacia ti. Te devuelven. 'No has terminado la temporada'. Vuelves con una mano que no cierra y sabes que es la última vez.", fx: { stat: { AG: -1 }, Honor: 1 } },
  ],
  escenas: {
    vestuarioFinalE: { titulo: "El vestuario, después",
      texto: (pj) => `El vestuario de piedra de Baraz-Ankor no tiene ventanas y hoy huele a cerveza de Helgra por primera vez en Primera. ${pj.flags.campeon ? "El Cáliz está en un rincón, y once enanos de ciento y pico años lo miran sin tocarlo, como se mira algo que no creían volver a ver." : "No hay Cáliz. Los viejos se quitan las botas en silencio; en Baraz-Ankor no se llora, se graba."} ${pj.flags.dorinSeFueAndando || pj.flags.dorinAnoto ? "Dorin está sentado, con el brazalete en el regazo, sin ponérselo ni quitárselo." : ""} ${pj.flags.grimnirMurio ? "El sitio de Grimnir está vacío. Alguien ha dejado su hacha encima del banco." : ""}`,
      opciones: (pj) => [
        { txt: "Beber la cerveza de Helgra en silencio con los viejos.", fx: { Honor: 1, Voluntad: 1, rel: { helgra: 2, club: 2 } }, msg: "Bebéis sin brindis: los enanos no brindan lo que ya está grabado. Helgra te sirve el último trago de la tanda, que es un honor que no se dice." },
        { txt: "Sentarte con Dorin y el brazalete.", req: { rel: ["dorin", 2] }, forzable: true, fx: { Honor: 2, rel: { dorin: 3 } }, msg: "Te sientas a su lado. Dorin te pone el brazalete en la mano sin decir nada. Ni tú ni él sabéis si es un regalo o una despedida. Es las dos cosas." },
        { txt: "Coger el hacha de Grimnir del banco.", req: { flag: "grimnirMurio" }, forzable: true, fx: { Honor: 2, Voluntad: 1, rel: { grimnir: 3 } }, msg: "La coges. Pesa lo que pesa un matatrolls. La cuelgas tú mismo en la pared del vestuario, donde la vean los que vengan. Es lo que se hace." },
      ] },
    /* ---------- CAPÍTULO 1: LA CAJA ---------- */
    primerDia: { titulo: "Aquí no se corre",
      texto: () => `El estadio de Baraz-Ankor está tallado en la montaña y tiene sesenta mil asientos de piedra, cada uno con el nombre de la familia que lo ocupa desde hace trescientos años. Hoy hay cuatro mil. Es el primer entrenamiento en Segunda de la historia del club. Durak Ojoferro, el entrenador, ochenta años en el banquillo, te mira las piernas, luego la cara, y dice lo primero que te dirá cada día durante tres temporadas: 'Aquí no se corre. Aquí se recoge el balón y se entra en la caja'. Detrás de él, once enanos con una media de edad de ciento cuarenta años forman una caja perfecta sin que nadie se lo pida.`,
      opciones: [
        { txt: "Recoger el balón y entrar en la caja.", fx: { Honor: 1, Voluntad: 1, rel: { durak: 2, dorin: 1 } }, msg: "Recoges, entras, y once enanos se cierran a tu alrededor como una puerta. Avanzáis una casilla. Otra. Es lo más aburrido y lo más seguro que has sentido nunca. Durak asiente una vez." },
        { txt: "Recoger el balón y correr hasta la línea antes de que se forme la caja.", fx: { Ambición: 2, Ferocidad: 1, fama: 3, rel: { durak: -2, aficion: 1, dorin: -1 } }, msg: "Cruzas el campo entero en dos turnos. Cuatro mil enanos no saben qué hacer con eso: es un touchdown, y no es de enano. Durak no dice nada. Al día siguiente te pone a recoger balones con los reservas." },
        { txt: "Preguntar a Durak por qué la caja bajó a Segunda.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 2, rel: { durak: 1, helgra: 1 } }, msg: "Silencio. Luego: 'Porque los elfos aprendieron a no chocar'. Es la única vez que le oirás admitir algo. Helgra, desde el banquillo, deja de limpiar jarras." },
      ] },
    lacaja: { titulo: "Dorin Yunquefirme",
      texto: (pj) => `Dorin Yunquefirme tiene ciento setenta años, dos rodillas de hierro y el brazalete de capitán desde antes de que naciera tu padre. Ya no llega al balón. Nunca le hace falta: manda dónde va cada bota. Te sienta en la piedra del vestuario y te dibuja la caja con tiza: cuatro linieros con Romper defensas, dos blitzers en las esquinas, Grimnir el matatrolls suelto, y en el centro el corredor. 'El corredor no corre', dice. 'El corredor es el que vale la pena proteger'. ${pj.rel.durak <= -1 ? "Sabe lo del touchdown. No lo menciona. Eso es peor." : ""}`,
      opciones: [
        { txt: "Aprenderte la caja de memoria. Cada bota, cada turno.", fx: { Astucia: 1, Voluntad: 1, rel: { dorin: 3 }, flag: "cajaAprendida" }, msg: "Tres noches con la tiza. Al final sabes dónde va a estar cada enano antes de que él lo sepa. Dorin te da el brazalete para que lo sostengas mientras se ata la bota. Es lo más cerca que llegarás de él en un año." },
        { txt: "Preguntarle qué pasa cuando la caja se rompe.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, rel: { dorin: 1, helgra: 1 }, flag: "cajaRota" }, msg: "'No se rompe'. Helgra, desde la puerta: 'Se rompió tres veces contra Cythel'. Dorin no la mira. Tú sí. Aprendes que en este vestuario la verdad la dice quien sirve la cerveza." },
        { txt: "Decirle que tú corres, y que la caja te sobra.", req: { Ferocidad: 2 }, forzable: true, fx: { Ferocidad: 1, Ambición: 1, rel: { dorin: -3, durak: -1, grimnir: 2 }, flag: "insolencia" }, msg: "Dorin no responde. Grimnir, el matatrolls, se ríe desde el fondo: es la primera vez en cuarenta años que alguien le dice algo así al capitán. Desde entonces Grimnir te llama 'el que corre', y no es un insulto. De Dorin, sí." },
      ] },
    helgra: { titulo: "La del banquillo",
      texto: () => `Helgra lleva cuarenta años en el banquillo de los Cascos repartiendo cerveza y limpiando sangre. No tiene título. Sabe más de dónde se abre una caja que Durak, y Durak lo sabe. Una tarde de lluvia te sienta con una jarra y te enseña, con las jarras vacías sobre la mesa, cómo los Vientos del Claro rompieron la caja el año pasado: no chocaron; bailaron alrededor hasta que Dorin se quedó sin turnos. 'La caja gana a quien choca', dice. 'A quien no choca, hay que ir a buscarle'.`,
      opciones: [
        { txt: "Pedirle que te enseñe todo lo que sabe, a cambio de lo que pida.", fx: { Astucia: 2, rel: { helgra: 3 }, flag: "helgraMaestra" }, msg: "Te enseña con jarras durante todo el invierno. Lo que pide es una cosa: que cuando seas capitán, que lo serás, no la eches del banquillo. Se lo juras sobre la jarra." },
        { txt: "Llevarle las jarras a Durak. Que lo oiga de ti.", req: { Honor: 2 }, forzable: true, fx: { Honor: 1, rel: { durak: 1, helgra: -1 } }, msg: "Durak escucha las jarras. Al acabar dice: 'Ya lo sabía'. Helgra no te sirve la primera de la tanda en un mes. Aprendes que hay cosas que se dicen en el banquillo y se quedan en el banquillo." },
        { txt: "Beber la cerveza y no decir nada.", fx: { Voluntad: 1, rel: { helgra: 1 } }, msg: "Bebes. Helgra recoge las jarras. 'Ya volverás', dice. Vuelves." },
      ] },
    derbi: { titulo: "El derbi de la montaña", partido: { rival: "Los Yunques de Baraz Kadrin", fuerza: 2 },
      texto: (pj) => `Los Yunques de Baraz Kadrin son enanos como vosotros, juegan en caja como vosotros, y su corredor es tu hermano Brokk, que tiene tres años más que tú, corre medio paso menos y te llamaba 'el que corre' antes que nadie. Un derbi de enanos: dos cajas empujándose hasta el final, y gana quien deje más rivales en el suelo. {marcador}. ${pj.flags.cajaAprendida ? "Sabes dónde va cada bota de tu caja. Dorin te ha puesto en el centro." : pj.flags.insolencia ? "Dorin te ha puesto en el centro, bien encajado en la caja, para que no puedas correr aunque quieras." : "Dorin te ha puesto en el centro."} Turno ocho. La caja está a tres casillas de la línea y Brokk está solo en la banda, esperando que se te ocurra.`,
      opciones: [
        { txt: "Quedarte en la caja. Una casilla por turno. Que anote quien anote.", tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "La caja avanza. Los Yunques chocan y caen. En el turno dieciséis un liniero de ciento cincuenta años cruza la línea con el balón que le has puesto en las manos. Uno a cero. Cuatro rivales en la enfermería. Durak asiente. Es la victoria más enana que verás.", fx: { Honor: 1, Voluntad: 1, gol: 1, rel: { durak: 2, dorin: 2, aficion: 1 } } },
          ko: { txt: "La caja avanza y se atasca contra la caja de los Yunques. Dieciséis turnos de empujar. Nadie anota. Nadie se mueve. Empate a cero, seis bajas entre los dos. Brokk te saluda desde la banda: 'Podías haber corrido'.", fx: { Voluntad: 1, rel: { dorin: 1, brokk: 1 } } } } },
        { txt: "Salir de la caja por la banda y correr.", tirada: { stat: "MA", obj: 9, riesgo: true,
          ok: { txt: "Sales. Nadie lo espera, y menos un enano. Brokk es el único que reacciona y llega tarde por un paso. Cruzas. Sesenta mil asientos de piedra, cuatro mil enanos en pie, y un silencio raro: es un touchdown y no saben si aplaudirlo. Lo aplauden. Durak no.", fx: { fama: 10, Ambición: 1, gol: 1, rel: { aficion: 3, durak: -2, dorin: -2, brokk: -1, grimnir: 2 }, flag: "corristeEnElDerbi" } },
          ko: { txt: "Sales de la caja y Brokk, que te conoce desde que naciste, ya está allí. Te tumba con una sonrisa. El balón rueda hacia los Yunques y anotan ellos. Dorin no te mira en toda la semana. Durak sí, todos los días, a la misma hora.", fx: { golRival: 1, rel: { durak: -3, dorin: -2, brokk: 1 } } } } },
        { txt: "Fingir que sales de la caja y volver a entrar cuando los Yunques se abran.", req: { flag: "helgraMaestra" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Das dos pasos hacia la banda. La caja de los Yunques se estira para cerrarte, y en el hueco que deja entran tus linieros con Romper defensas. Vuelves dentro. La caja avanza tres casillas de golpe y anota en el turno doce. Helgra, en el banquillo, levanta una jarra. Durak la ve.", fx: { fama: 6, Astucia: 2, gol: 1, rel: { helgra: 3, durak: 1, dorin: 1, aficion: 2 }, flag: "cajaConFinta" } },
          ko: { txt: "Das dos pasos y los Yunques no se mueven: son enanos, no se estiran. Te quedas fuera de tu caja y dentro de la suya. Te empujan hasta la banda y anotan mientras te levantas.", fx: { golRival: 1, rel: { helgra: 1 } } } } },
      ] },
    invierno: { titulo: "El mercado de invierno",
      texto: (pj) => `Lord Hargrim Oroviejo, dueño de los Cascos, baja al vestuario por primera vez desde el descenso. Lleva un contrato bajo el brazo y un elfo silvano detrás: Faelas, receptor de los Brotes del Sendero, veinte años en Sexta, fichado 'para modernizar'. Once enanos de ciento cuarenta años miran al elfo como se mira una gotera. Durak sale del vestuario sin decir nada. Dorin se sienta. Hargrim te mira a ti: 'Tú corres. Él corre. Entendeos'. ${pj.flags.corristeEnElDerbi ? "Sabes por qué te mira: el touchdown del derbi salió en la Cristalvisión, y Hargrim mira la Cristalvisión." : ""}`,
      opciones: [
        { txt: "Darle la mano al elfo delante de todos.", fx: { Honor: 2, rel: { faelas: 3, dorin: -2, club: 1, aficion: -1 }, flag: "manoAFaelas" }, msg: "Se la das. Es una mano ligera, sin callos. Once enanos no la ven: miran la pared. Faelas te dice bajito: 'Gracias. No durará'. Dura tres temporadas." },
        { txt: "Decirle a Hargrim que un elfo no entra en la caja.", req: { Honor: 2 }, forzable: true, fx: { Honor: 1, Voluntad: 1, rel: { dorin: 3, durak: 2, faelas: -2, club: -2 }, flag: "contraFaelas" }, msg: "Lo dices delante del mecenas y del elfo. Dorin te mira por primera vez como a un enano. Hargrim te mira como a un gasto. Faelas se sienta en el banco del fondo, junto al desagüe, sin que nadie se lo diga." },
        { txt: "Pedir a Hargrim el doble de sueldo si tienes que entenderte con un elfo.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 1, Ambición: 1, oro: 40, rel: { club: -1, faelas: 0 } }, msg: "Hargrim se ríe y paga. Es un mecenas: lo que cuesta lo entiende. El vestuario no entiende nada. Faelas te mira como a un mercader." },
      ] },

    /* ---------- CAPÍTULO 2: EL DESCENSO ---------- */
    faelasLlega: { titulo: "El elfo en el banco del fondo",
      texto: (pj) => `Faelas entrena solo. Llega antes que nadie, corre alrededor del campo tallado mientras la caja practica una casilla por turno, y se va después. Nadie le pasa el balón. Durak no le alinea. Un día te espera a la salida con dos jarras, que en un elfo es una declaración. 'En los Brotes jugábamos así', dice, y te dibuja con el dedo en la piedra una jugada donde el corredor y el receptor se cruzan por fuera de la caja. Es bonita. Es lo contrario de todo. ${pj.flags.manoAFaelas ? "Te la enseña porque le diste la mano." : pj.flags.contraFaelas ? "Te la enseña a ti, que le dijiste que no entraba, porque eres el único que corre." : ""}`,
      opciones: [
        { txt: "Entrenar la jugada con él, a escondidas, antes de que llegue Durak.", fx: { Astucia: 1, stat: { AG: 1 }, rel: { faelas: 3, durak: -1 }, flag: "jugadaFaelas" }, msg: "Cada amanecer, durante un mes, corréis el cruce en el campo vacío. Helgra os ve desde el banquillo y no dice nada. La jugada funciona nueve de cada diez. La décima acabas en el suelo, y Faelas te levanta." },
        { txt: "Decirle que en Baraz-Ankor eso no se juega.", fx: { Honor: 1, rel: { faelas: -2, dorin: 1 } }, msg: "Faelas asiente. 'Ya'. Se vuelve al banco del fondo. Cuando la caja se rompa, y se romperá, te acordarás del dibujo en la piedra." },
        { txt: "Llevarle la jugada a Durak como si fuera tuya.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, Honor: -2, rel: { durak: 1, faelas: -3 }, flag: "jugadaRobada" }, msg: "Durak mira el dibujo. 'Es de elfo', dice, y te mira. Sabe que no es tuya. La guarda en el bolsillo. Faelas no vuelve a esperarte con jarras." },
      ] },
    elfos: { titulo: "Los que no chocan", partido: { rival: "Las Espinas de Cythel", fuerza: 3 },
      texto: (pj) => `Las Espinas de Cythel no chocan. Nunca. Su receptora salta por encima de la caja, su lanzador tira desde la otra mitad del campo y sus linieros bailan alrededor de Dorin hasta que se le acaban los turnos. Fue así como los Cascos bajaron. Durak alinea la caja de siempre. ${pj.flags.jugadaFaelas ? "Faelas está en el banquillo, sin alinear, mirándote. Sabéis los dos lo que haría falta." : "Faelas está en el banquillo, sin alinear."} Turno seis. {marcador}. Dorin, dentro, grita la casilla siguiente. Helgra, desde el banquillo, señala la banda con la jarra.`,
      opciones: [
        { txt: "Seguir a Dorin. La caja es la caja.", tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "La caja avanza. Despacio. En el turno dieciséis anotáis uno. Dos a uno. Cuatro elfos en la enfermería, ninguno grave: los elfos no se dejan pillar. Durak lo llama derrota digna. La grada no lo llama nada.", fx: { Honor: 1, rel: { durak: 1, dorin: 2 }, golRival: 1 } },
          ko: { txt: "La caja avanza y los elfos la rodean, y la rodean, y en el turno doce Dorin ya no tiene a quién dar el balón. Tres a cero. Es el partido que describió Helgra con jarras, jugado con enanos.", fx: { golRival: 1, rel: { dorin: 1, helgra: 1 } } } } },
        { txt: "Salir de la caja y pedir el cruce a Faelas. Que salga aunque Durak no lo diga.", req: { flag: "jugadaFaelas" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "Gritas el nombre del elfo. Durak no lo entiende; Helgra sí, y le empuja al campo. El cruce sale como en los amaneceres: tú por fuera, él por dentro, los elfos por primera vez sin saber a quién mirar. Dos touchdowns en cuatro turnos. Dos a dos. El estadio de piedra no sabe cómo se aplaude a un elfo. Aprende.", fx: { fama: 12, Astucia: 1, gol: 1, rel: { faelas: 4, helgra: 2, aficion: 3, durak: -3, dorin: -2 }, flag: "cruceEnCythel" } },
          ko: { txt: "Gritas el nombre. Faelas sale. El cruce se rompe en la banda: un elfo de Cythel, que sabe de cruces más que vosotros, te tumba en el aire. Tres a cero, y Durak sienta al elfo sin mirarle. A ti no te sienta. Es peor.", fx: { golRival: 1, rel: { faelas: 2, durak: -3, dorin: -2 } } } } },
        { txt: "Ir a buscar a su receptora y tumbarla. Si no chocan, hay que obligarles.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Sales de la caja a por la receptora que salta. La esperas donde va a caer, no donde está. Cae encima de ti y no se levanta. Sin ella, Cythel deja de bailar. La caja anota dos. Dos a dos. Grimnir te abraza, que en un matatrolls es un placaje.", fx: { fama: 8, Ferocidad: 2, gol: 1, rel: { grimnir: 3, durak: 1, aficion: 2, faelas: -1 }, flag: "cazasteReceptora" } },
          ko: { txt: "Sales de la caja a por la receptora. Salta por encima de ti. Literalmente. La grada de Cythel se ríe con esa risa de elfos. Tres a cero, y tú fuera de la caja mirando al cielo.", fx: { golRival: 1, rel: { durak: -2 } } } } },
      ] },
    dorinCae: { titulo: "Las rodillas de hierro",
      texto: (pj) => `Contra los Cascos Rotos de Karag, un enano del Caos con cuernos le entra a Dorin por detrás en el turno dos. Las rodillas de hierro aguantan; la cadera, no. Se lo llevan en camilla por primera vez en ciento setenta años, y la grada de piedra se pone en pie sin ruido. El apotecario del club solo puede atender a uno por partido, y en el turno nueve te rompen a ti el hombro. Helgra viene al banquillo con la cara de quien tiene que elegir y no quiere. ${pj.rel.dorin >= 3 ? "Dorin, desde la camilla, dice tu nombre. Dice que a ti." : pj.rel.dorin <= -2 ? "Dorin, desde la camilla, no dice nada. No tiene por qué." : ""}`,
      opciones: [
        { txt: "Que el apotecario atienda a Dorin. Tú aguantas.", fx: { Honor: 3, stat: { AV: -1 }, rel: { dorin: 4, helgra: 2, club: 2, aficion: 2 }, flag: "apotecarioParaDorin" }, msg: "Dorin vuelve al campo en el turno doce, cojeando, y manda la caja hasta el final. Tú juegas con el hombro colgando. No cura bien. Nunca. El vestuario lo sabe, y desde ese día te ponen la cerveza primero." },
        { txt: "Que te atienda a ti. El club te necesita entero.", fx: { Ambición: 1, Astucia: 1, rel: { dorin: -3, club: -1, helgra: -1, aficion: -2 }, flag: "apotecarioParaTi" }, msg: "El apotecario te arregla el hombro en diez minutos. Dorin no vuelve en tres meses. Cuando vuelve, el brazalete lo lleva un liniero, y a ti te lo pasan por delante sin ofrecértelo." },
        { txt: "Pedirle a Helgra la runa. La que no está en los libros.", req: { rel: ["helgra", 3] }, forzable: true, fx: { Astucia: 1, Honor: -1, rel: { helgra: 2, dorin: 2 }, flag: "runaDeHelgra" }, msg: "Helgra saca un clavo del banquillo y te graba algo en el hombro sin que nadie mire. Arde. El apotecario va a Dorin. Los dos volvéis en el turno doce. El hombro no te duele nunca más, y eso no es normal." },
      ] },
    grimnirBusca: { titulo: "El matatrolls busca su troll",
      texto: () => `Grimnir Barbarroja se tiñó la barba de naranja hace sesenta años por una deshonra que nadie recuerda, y desde entonces juega para morir bien: entra suelto en cada partido buscando al más grande del rival. No ha encontrado un troll en Segunda. Los Cascos Rotos tienen un minotauro, que casi vale. La noche antes, en el cuartel, afila un hacha que no puede llevar al campo y te dice: 'Mañana, cuando entre a por él, no me cubras. Un matatrolls no se cubre'.`,
      opciones: [
        { txt: "Prometerle que no le cubrirás.", fx: { Honor: 2, Voluntad: 1, rel: { grimnir: 3 }, flag: "promesaGrimnir" }, msg: "Lo prometes. Grimnir te da un trago de algo que no es cerveza. Mañana entrará al minotauro con toda la ventaja y la barba en alto, y tú mirarás. Es lo más difícil que te ha pedido nadie." },
        { txt: "Decirle que le cubrirás aunque no quiera.", fx: { Honor: 1, rel: { grimnir: -2, dorin: 1 }, flag: "cubrirasAGrimnir" }, msg: "Grimnir se enfada como se enfada un matatrolls: en silencio. Mañana, cuando entre al minotauro, tú estarás detrás con Romper defensas. Sobrevivirá. No te lo perdonará." },
        { txt: "Preguntarle cuál fue la deshonra.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 1, rel: { grimnir: 2 }, flag: "deshonraGrimnir" }, msg: "'Corrí', dice. 'Con el balón. Hasta la línea. En una final. Y ganamos, y el clan me echó igual'. Te mira la barba a ti. No dice más." },
      ] },
    descenso: { titulo: "El partido del descenso", partido: { rival: "Los Cascos Rotos de Karag", fuerza: 3, tipo: "remontada" },
      texto: (pj) => `Último partido de la temporada. Si perdéis, los Cascos de Hierro bajan a Tercera, donde nunca han estado. Los Cascos Rotos son enanos del Caos: caja contra caja, pero la suya lleva cuernos y un minotauro. ${pj.flags.promesaGrimnir ? "Grimnir ha entrado al minotauro en el turno tres y no le has cubierto. Sigue en pie los dos. Es un milagro que dura." : pj.flags.cubrirasAGrimnir ? "Grimnir ha entrado al minotauro y tú detrás. El minotauro está en el suelo. Grimnir no te mira." : ""} ${pj.flags.apotecarioParaDorin ? "Dorin manda la caja cojeando." : pj.flags.apotecarioParaTi ? "Dorin no está. La caja la manda un liniero que no sabe mandar." : ""} Turno quince. {marcador}. El balón en tus manos, la caja deshecha y la línea a cinco casillas.`,
      opciones: [
        { txt: "Rehacer la caja alrededor de ti y avanzar. Que no dé tiempo.", tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "Gritas las casillas como Dorin las gritaba. Los linieros vuelven. La caja se cierra y avanza dos, tres, y en el último turno un blitzer de ciento sesenta años cruza con el balón que le pones. Dos a uno. Los Cascos no bajan. La grada de piedra no aplaude: golpea el suelo con los pies.", fx: { fama: 8, Honor: 2, gol: 1, rel: { dorin: 2, durak: 2, club: 3, aficion: 3 }, flag: "salvasteALosCascos" } },
          ko: { txt: "Gritas las casillas y los linieros vuelven tarde: son viejos, y el minotauro está en medio. La caja se cierra a medias y no avanza. Silbato. Uno a uno. Los Cascos bajan a Tercera por diferencia de bajas. Durak recoge la tiza del suelo y se la guarda.", fx: { rel: { dorin: 1, club: 1 }, flag: "descendisteis" } } } },
        { txt: "Correr. Cinco casillas, dos turnos, sin caja.", tirada: { stat: "MA", obj: 9, riesgo: true,
          ok: { txt: "Corres. El minotauro se gira demasiado tarde y los cuernos pasan a un dedo. Cruzas en el turno dieciséis con el silbato. Dos a uno. Los Cascos no bajan, y lo ha hecho un enano corriendo. La Cristalvisión repite la jugada tres veces. Durak la ve una.", fx: { fama: 12, Ambición: 1, gol: 1, rel: { aficion: 4, club: 2, faelas: 1, durak: -1, dorin: -1 }, flag: "salvasteALosCascos", flags: ["corristeEnElDescenso"] } },
          ko: { txt: "Corres. Los cuernos no pasan a un dedo: pasan por ti. Te despiertas con el partido acabado, uno a uno, y los Cascos en Tercera. Alguien de la grada ha bajado a la banda a decirte algo. Helgra no le deja.", fx: { rel: { aficion: -2, durak: -2 }, flag: "descendisteis" } } } },
        { txt: "Pasar a Faelas, que está solo en la banda porque nadie le marca a un elfo enano.", req: { rel: ["faelas", 2] }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Un enano pasando. El balón va corto y feo. Faelas lo coge como cogen los elfos: en el aire, sin que se note. Cruza. Dos a uno. Los Cascos no bajan, y el touchdown lo ha hecho un elfo. Sesenta mil asientos de piedra deciden, uno a uno, aplaudir.", fx: { fama: 8, Honor: 1, gol: 1, rel: { faelas: 4, club: 2, aficion: 2, dorin: -1 }, flag: "salvasteALosCascos", flags: ["faelasSalvador"] } },
          ko: { txt: "Un enano pasando. El balón va corto y feo, y esta vez Faelas no llega. Lo recoge un Casco Roto y anota. Uno a dos. Tercera. El vestuario mira al elfo, no a ti. Tú sabes de quién fue el pase.", fx: { golRival: 1, rel: { faelas: 1, club: -1 }, flag: "descendisteis" } } } },
      ] },

    /* ---------- CAPÍTULO 3: EL MOTÍN ---------- */
    losJovenes: { titulo: "Los que quieren correr",
      texto: (pj) => `${pj.flags.descendisteis ? "Tercera División. Los Cascos de Hierro juegan contra equipos halfling y campos con vacas." : "Segunda otra vez, por los pelos, y con el vestuario más viejo del mundo un año más viejo."} Han fichado a tres enanos jóvenes que crecieron viéndote correr en la Cristalvisión: Nain, Skalf y Thrain, dos linieros y un blitzer con treinta años y sin barba entera. Te buscan en el cuartel una noche. Quieren jugar como tú. Quieren que la caja se abra. Quieren que hables con Durak. Dorin duerme en el catre de al lado, o finge.`,
      opciones: [
        { txt: "Decirles que primero se aprendan la caja. Después, ya veremos.", fx: { Honor: 1, Voluntad: 1, rel: { dorin: 2, durak: 1 }, flag: "jovenesEnCaja" }, msg: "Se la aprenden. Con tiza, contigo, tres noches. Al final saben dónde va cada bota, y siguen queriendo correr, pero ahora saben desde dónde." },
        { txt: "Entrenar con ellos el cruce de Faelas, a escondidas.", req: { flag: "jugadaFaelas" }, forzable: true, fx: { Astucia: 1, Ambición: 1, rel: { faelas: 2, dorin: -2, durak: -2 }, flag: "jovenesCorren" }, msg: "Cuatro enanos y un elfo, al amanecer, en el campo vacío. Helgra os pone la cerveza sin decir nada. Dorin lo sabe. Durak lo sabe. Nadie dice nada todavía." },
        { txt: "Contárselo a Dorin. Es su vestuario.", fx: { Honor: 2, rel: { dorin: 3, aficion: -1 }, flag: "jovenesDelatados" }, msg: "Dorin escucha con los ojos cerrados. 'Yo también quería correr', dice. 'Me duró un año'. Al día siguiente los tres jóvenes recogen balones con los reservas. Te miran. No como a un capitán." },
      ] },
    pizarra: { titulo: "La pizarra de Durak",
      texto: (pj) => `Durak Ojoferro te llama a su cuarto, que es una cueva con una pizarra y ochenta años de tiza. En la pizarra está la caja, y al lado, con otra tiza, más fina, ${pj.flags.jugadaRobada ? "el cruce de Faelas que le llevaste como tuyo" : "algo que parece el cruce de Faelas, copiado de lejos"}. 'Los elfos aprendieron a no chocar', dice. 'Yo tengo ochenta años para aprender lo contrario, y no los tengo'. Te ofrece la tiza. Es la primera vez en la historia del club que la tiza cambia de mano.`,
      opciones: [
        { txt: "Coger la tiza y dibujar la caja que se abre solo en el turno ocho.", req: { flag: "cajaAprendida" }, forzable: true, fx: { Astucia: 2, Honor: 1, rel: { durak: 4, dorin: 2, helgra: 1 }, flag: "cajaQueSeAbre" }, msg: "Dibujas la caja de Dorin durante siete turnos y en el octavo, la banda. Durak la mira mucho rato. 'Esto es enano', dice. Es la mayor alabanza que ha dado en ochenta años. Borra su dibujo y deja el tuyo." },
        { txt: "Coger la tiza y dibujar el cruce entero, sin caja.", req: { flag: "jugadaFaelas" }, forzable: true, fx: { Ambición: 2, rel: { durak: -2, faelas: 2, dorin: -3 }, flag: "cruceEnPizarra" }, msg: "Dibujas lo de Faelas. Durak lo mira y no borra nada. 'Esto es elfo', dice, y sale del cuarto. Dejas el dibujo en la pizarra. A la mañana siguiente alguien lo ha borrado con la manga. Dorin tiene tiza en la manga." },
        { txt: "No coger la tiza. La tiza es suya.", fx: { Honor: 2, Voluntad: 1, rel: { durak: 2, dorin: 1 } }, msg: "'Ya la cogerás', dice Durak, y la deja en el borde. Ahí se queda toda la temporada. La miras cada vez que pasas." },
      ] },
    motin: { titulo: "El partido del motín", partido: { rival: "Los Segadores de Kleinfeld", fuerza: 2 },
      texto: (pj) => `Contra los Segadores, humanos rápidos que en Tercera pasan por buenos. En el turno cinco Durak grita la casilla siguiente y Nain, el joven, no entra: se queda en la banda, mirándote. Skalf tampoco entra. La caja tiene dos agujeros y once enanos esperando a ver qué haces. ${pj.flags.jovenesCorren ? "Saben el cruce. Lo entrenaron contigo." : pj.flags.jovenesDelatados ? "Te miran como al que los delató, y esperan igual." : ""} ${pj.flags.cajaQueSeAbre ? "Durak, en la banda, tiene tu dibujo en la mano." : ""} Dorin, dentro, grita tu nombre. Helgra, en el banquillo, no señala nada. Es tu turno.`,
      opciones: [
        { txt: "Gritar las casillas. Cerrar la caja. Que los jóvenes entren o se queden fuera.", tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "Gritas como Dorin. Nain y Skalf entran, tarde, con la cara roja. La caja avanza y los humanos chocan, que es lo que hacen los humanos. Uno a cero en el turno dieciséis. Durak asiente. Nain no te habla en una semana. Dorin te da el brazalete para que lo sostengas. No te lo pide de vuelta.", fx: { Honor: 2, Voluntad: 1, gol: 1, rel: { dorin: 3, durak: 3, club: 2 }, flag: "cerrasteElMotin" } },
          ko: { txt: "Gritas. Nadie entra. Los humanos se cuelan por los agujeros y anotan dos veces mientras la caja se pelea consigo misma. Cero a dos. En el vestuario, Durak escribe en la pizarra un solo nombre: el tuyo. No sabes si es bueno.", fx: { golRival: 1, rel: { dorin: 1, durak: 1, club: -2 }, flag: "motinFallido" } } } },
        { txt: "Abrir la caja. Ahora. Nain por la banda, Skalf por dentro, tú al cruce.", req: { flag: "jovenesCorren" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "Gritas nombres, no casillas. La caja se abre como una flor de hierro. Nain corre por la banda y los humanos, que esperaban una caja, no entienden nada. Tres touchdowns en ocho turnos. Tres a cero. Durak no dice nada en todo el partido. Al acabar, en la pizarra, borra la caja.", fx: { fama: 15, Ambición: 2, gol: 1, rel: { faelas: 2, aficion: 4, club: 2, durak: -1, dorin: -4 }, flag: "abristeLaCaja" } },
          ko: { txt: "Gritas nombres. La caja se abre y los humanos, que son rápidos de verdad, entran por donde salís. Cero a tres. Dorin recoge el balón de la línea con ciento setenta años y lo lleva al centro andando, solo, sin caja, y nadie se atreve a tocarle. Es lo más triste que verás en un campo.", fx: { golRival: 1, rel: { dorin: -3, durak: -2, club: -2 }, flag: "motinFallido" } } } },
        { txt: "Ir a buscar a Nain, cogerle del casco y meterle en la caja.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Coges a Nain del casco delante de la grada y le metes en su casilla. Skalf entra solo. La caja se cierra con un ruido de hierro que oye hasta la Cristalvisión. Uno a cero. Nain, al acabar, te da las gracias. No sabes de qué.", fx: { Ferocidad: 2, gol: 1, rel: { dorin: 3, durak: 2, aficion: 2 }, flag: "nainPorElCasco" } },
          ko: { txt: "Vas a por Nain y Nain te esquiva: es joven, y tú tienes el hombro como lo tienes. La caja os mira pelear. Los humanos anotan dos. En el vestuario no habla nadie.", fx: { golRival: 1, rel: { club: -2 } } } } },
      ] },
    copaTercera: { titulo: "La Copa de las Cuevas", partido: { rival: "Los Yunques de Baraz Kadrin", fuerza: 3, torneo: "Copa de las Cuevas" },
      condicion: (pj) => pj.palmares.some((p) => p.cap === 3 && p.res === "Victoria"),
      texto: (pj) => `La Copa de las Cuevas es el único torneo que un club de Tercera puede ganar, y la final es contra los Yunques, otra vez, con Brokk en el centro de su caja. ${pj.flags.abristeLaCaja ? "Los Yunques saben que la caja de los Cascos se abre. Han venido a esperarte fuera." : pj.flags.cerrasteElMotin ? "Los Yunques saben que la caja de los Cascos volvió a cerrarse. Traen la suya." : ""} Turno dieciséis, {marcador}, el balón en tus manos y Brokk delante, con tres años más y tu misma sangre.`,
      opciones: [
        { txt: "Entrar en la caja y que empuje quien empuje.", tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "La caja empuja. La suya también. Alguien cae: es un Yunque. En el hueco, un liniero de los Cascos cruza con el balón que llevas tres turnos escondiendo. Copa. Brokk te da la mano. 'Sigues sin correr', dice, y sonríe.", fx: { fama: 10, Honor: 1, gol: 1, rel: { club: 3, aficion: 3, brokk: 1 } } },
          ko: { txt: "La caja empuja y la suya no cede. Silbato. Empate y la Copa se decide a bajas: han caído más Yunques. Es tuya por diferencia de enfermería. Brokk te la da él mismo. No sonríe.", fx: { fama: 6, gol: 1, rel: { club: 2, brokk: -1 } } } } },
        { txt: "Correr contra tu hermano.", tirada: { stat: "MA", obj: 10, riesgo: true,
          ok: { txt: "Sales y Brokk sale contigo, porque te conoce. Corréis los dos por la banda, a un paso, como en la galería de niños. Llegas antes por lo que siempre has llegado antes: ese medio paso que ningún enano tiene. Copa. Brokk se queda de rodillas en la línea y no se levanta un rato. Luego se levanta y te abraza.", fx: { fama: 15, Ambición: 1, gol: 1, rel: { aficion: 4, brokk: 3, club: 2 }, flag: "ganasteABrokk" } },
          ko: { txt: "Sales y Brokk sale contigo. Esta vez llega él, porque el hombro pesa y él lo sabe. Te tumba y lleva el balón a su caja. La Copa es de los Yunques. Brokk no lo celebra. Te levanta.", fx: { golRival: 1, rel: { brokk: 2, aficion: -1 } } } } },
      ] },
    durakDecide: { titulo: "Lo que Durak decide",
      texto: (pj) => `Fin de temporada. Durak te llama a la cueva de la pizarra. ${pj.flags.abristeLaCaja ? "La caja sigue borrada. No la ha vuelto a dibujar." : pj.flags.cajaQueSeAbre ? "Tu dibujo sigue en la pizarra, con la banda abierta en el turno ocho." : "La caja sigue en la pizarra, como siempre."} 'Hargrim quiere venderte', dice. 'Un club humano de Norburgo paga lo que vale un liniero de Primera. Los Cascos necesitan el oro'. Te mira. 'Yo no quiero. Pero no mando en el oro'. Es lo más largo que te ha dicho.`,
      opciones: [
        { txt: "Pedirle que luche por ti con Hargrim.", req: { rel: ["durak", 2] }, forzable: true, fx: { Honor: 1, rel: { durak: 2, club: 1 }, flag: "durakLucho" }, msg: "Lucha. Ochenta años de tiza contra un contrato. Pierde. Pero Hargrim, por primera vez, negocia: te venden con derecho de vuelta. Durak lo consiguió sin decírtelo." },
        { txt: "Decirle que te vendan. Quieres ver cómo se juega fuera de la caja.", fx: { Ambición: 2, Astucia: 1, rel: { durak: -1, dorin: -2, aficion: -2 }, flag: "quisisteIrte" }, msg: "Durak asiente. 'Vas a aprender', dice, y no suena a bendición. Dorin no va a despedirte. Helgra sí: con una jarra y sin palabras." },
        { txt: "Pedirle a Helgra que hable con Hargrim. Ella sabe cosas.", req: { flag: "helgraMaestra" }, forzable: true, fx: { Astucia: 2, rel: { helgra: 2, club: 1 }, flag: "helgraNegocio" }, msg: "Helgra sube al palco con dos jarras. Baja con una. Hargrim te vende igual, pero por el doble, y la mitad va al apotecario de Dorin. Nunca sabes qué le dijo." },
      ] },

    /* ---------- CAPÍTULO 4: EL MERCADO ---------- */
    laVenta: { titulo: "Los Grifos de Norburgo",
      texto: (pj) => `Los Grifos de Norburgo son humanos, juegan en Tercera y corren. Todos. El entrenador, un hombre de cuarenta años llamado Ansel Vogt que no ha visto una caja en su vida, te recibe con un balón en la mano: 'Nos han dicho que eres el único enano que corre. Aquí corre hasta el apotecario'. El vestuario tiene ventanas y huele a sudor de humano, que es distinto. ${pj.flags.durakLucho ? "En tu contrato hay una cláusula de vuelta que Durak consiguió sin decírtelo." : ""} Te dan el balón en el primer entrenamiento. Nadie te protege.`,
      opciones: [
        { txt: "Correr con ellos. Es lo que siempre quisiste.", fx: { Ambición: 1, stat: { MA: 1 }, rel: { club: 2 }, flag: "corristeConHumanos" }, msg: "Corres. Por primera vez en tu vida nadie te dice la casilla. Anotas en el tercer entrenamiento y los humanos aplauden como aplauden los humanos: mucho y sin saber por qué. Es maravilloso. Dura dos partidos." },
        { txt: "Pedirle a Vogt que te deje montar una caja con los linieros humanos.", req: { flag: "cajaAprendida" }, forzable: true, fx: { Astucia: 2, Honor: 1, rel: { club: 1 }, flag: "cajaHumana" }, msg: "Vogt se ríe. Luego te deja. Cuatro linieros humanos que no saben lo que es Romper defensas aprenden a cerrarse a tu alrededor. Es una caja mala. Es una caja. Vogt la llama 'la cosa enana' y la usa en el turno ocho." },
        { txt: "Entrenar solo, como Faelas en Baraz-Ankor.", fx: { Voluntad: 2, rel: { faelas: 1, club: -1 } }, msg: "Corres alrededor del campo antes de que lleguen los humanos y te vas después. Entiendes ahora al elfo en el banco del fondo. Le escribes. No contesta. Los elfos no contestan." },
      ] },
    fueraDeLaCaja: { titulo: "Lo que pasa fuera", partido: { rival: "Los Toros Rojos de Norburgo", fuerza: 3 },
      texto: (pj) => `Los Toros Rojos son el otro equipo de la ciudad: humanos grandes, lentos, que pegan. Contra los Grifos juegan a esperar. ${pj.flags.corristeConHumanos ? "Vogt te pone en la banda con el balón, sin nadie delante ni detrás." : pj.flags.cajaHumana ? "Vogt monta 'la cosa enana' en el turno ocho, y los Toros se ríen." : "Vogt te pone donde te pone a ti mismo: en cualquier sitio."} Turno cuatro. Tienes el balón, corres por la banda, y por primera vez en tu vida hay tres rivales que pueden alcanzarte y nadie que se lo impida.`,
      opciones: [
        { txt: "Correr igual. Con las piernas de siempre.", tirada: { stat: "MA", obj: 10, riesgo: true,
          ok: { txt: "Corres y no te alcanzan por medio paso. Cruzas. Los Grifos ganan dos a uno y Vogt te abraza, que en un humano es normal. Esa noche entiendes que fuera de la caja cada partido es una apuesta. Te gusta. Te da miedo.", fx: { fama: 10, Ambición: 1, gol: 1, rel: { club: 3, aficion: 1 } } },
          ko: { txt: "Corres y el tercero te alcanza por detrás, sin balón, con el árbitro mirando otra cosa. Notas la rodilla. Es la primera vez en tu vida que te rompen algo sin que once enanos lo hayan impedido antes. Los Toros ganan. Aprendes lo que vale una caja el día que no la tienes.", fx: { golRival: 1, stat: { MA: -1 }, rel: { club: 1 }, flag: "rodillaDeNorburgo" } } } },
        { txt: "Frenar, entregar el balón al lanzador humano y buscar un compañero para cerrarte.", tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Frenas. Entregas. Te pones al lado de un liniero humano como si fuera Dorin. Los Toros se frenan también, confundidos: un enano que espera. El lanzador anota en el turno seis. Vogt te pregunta qué has hecho. 'Enano', dices.", fx: { Astucia: 1, Honor: 1, gol: 1, rel: { club: 2 } } },
          ko: { txt: "Frenas y entregas, y el lanzador humano, que no espera un pase de enano, lo deja caer. Los Toros lo recogen y anotan. Vogt no te pregunta nada.", fx: { golRival: 1 } } } },
      ] },
    brokk: { titulo: "La carta de Brokk",
      texto: (pj) => `Llega una carta de Baraz Kadrin con la letra apretada de Brokk. Dice que los Yunques han visto el partido de los Toros en la Cristalvisión, que ${pj.flags.rodillaDeNorburgo ? "vieron cómo te rompían la rodilla sin caja" : "vieron cómo corrías sin caja"}, y que el vestuario entero se puso en pie, no sabe si de orgullo o de vergüenza. Dice que Dorin ha vuelto a jugar. Dice que los Cascos van últimos. Al final, con otra tinta: 'Vuelve. Corre allí donde te cubran'.`,
      opciones: [
        { txt: "Contestarle. Todo.", fx: { Honor: 2, rel: { brokk: 3, club: -1 }, flag: "cartaABrokk" }, msg: "Le escribes cuatro páginas sobre humanos, ventanas y lo que se siente cuando nadie te dice la casilla. Contesta con dos líneas: 'Ya. Vuelve'. Es la conversación más larga de vuestra vida." },
        { txt: "No contestar. No has terminado aquí.", fx: { Voluntad: 2, Ambición: 1, rel: { brokk: -1 } }, msg: "Guardas la carta en la bota. La lees antes de cada partido. No respondes. Brokk no vuelve a escribir. No hace falta." },
        { txt: "Mandarle la carta a Durak, sin nota.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, rel: { durak: 2, brokk: 1 }, flag: "cartaADurak" }, msg: "Durak recibe una carta de un corredor de Baraz Kadrin que dice 'vuelve'. Entiende. Al mes, Hargrim recibe una oferta de recompra que no sabe de dónde ha salido. Sale de un cuarto con pizarra." },
      ] },
    contraLosCascos: { titulo: "Contra los tuyos", partido: { rival: "Los Cascos de Hierro de Baraz-Ankor", fuerza: 2 },
      texto: (pj) => `Los Grifos juegan contra los Cascos de Hierro en Baraz-Ankor, en el estadio de piedra, con sesenta mil asientos y cuatro mil enanos que no saben si silbarte. Vogt te pone de titular 'porque los conoces'. Los conoces. Ves la caja formarse enfrente, con Dorin dentro cojeando y Grimnir suelto mirándote, y sabes dónde va a estar cada bota antes que ellos. ${pj.flags.jovenesCorren ? "Nain y Skalf están en las esquinas. Te miran como se mira a un desertor, o a un maestro." : ""} Turno seis. Tienes el balón y la caja de los Cascos viene hacia ti.`,
      opciones: [
        { txt: "Usar lo que sabes. Atacar la caja por donde se abre en el turno ocho.", req: { flag: "cajaAprendida" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Esperas dos turnos. En el octavo la caja se abre por la banda, como sabías, y tú ya estás allí. Robas el balón de las manos de un liniero de ciento sesenta años que te enseñó a atarte las botas. Anotas. Los Grifos ganan. El estadio de piedra no silba. No hace nada. Es peor.", fx: { fama: 10, Astucia: 2, gol: 1, rel: { club: 2, dorin: -3, durak: -1, aficion: -3 }, flag: "traicionasteLaCaja" } },
          ko: { txt: "Esperas el turno ocho y la caja no se abre: Durak ha cambiado la pizarra. Por ti. Te tragan. Los Cascos anotan uno a cero en el dieciséis. Grimnir te ayuda a levantarte y dice: 'Aprendió'.", fx: { golRival: 1, rel: { durak: 2, grimnir: 1 } } } } },
        { txt: "Jugar limpio y de frente. Que gane la caja si es mejor.", tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Vas de frente contra la caja, como un humano, y la caja te rompe, como debe. Pero los Grifos corren alrededor mientras tú chocas, y anotan dos. Los Cascos pierden. Dorin te busca al acabar y te da la mano: 'De frente. Bien'. Es lo único que dice.", fx: { fama: 6, Honor: 2, gol: 1, rel: { dorin: 3, aficion: 1, club: 1 } } },
          ko: { txt: "Vas de frente y la caja te rompe, como debe, y los Grifos no corren lo bastante. Cero a uno. Grimnir te levanta: 'Así se pierde'. Es un cumplido.", fx: { golRival: 1, rel: { dorin: 2, grimnir: 2 } } } } },
        { txt: "Dejarte tumbar en la primera jugada y ver el partido desde el suelo.", req: { Honor: 3 }, forzable: true, fx: { Honor: 1, fama: -5, golRival: 1, rel: { dorin: 3, durak: 3, aficion: 3, club: -3 }, flag: "teDejasteCaer" }, msg: "Te tumban en el turno uno y no te levantas hasta el dieciséis. Los Cascos ganan uno a cero. Vogt te sienta tres partidos. La grada de piedra, al salir, golpea el suelo con los pies. Sabes para quién." },
      ] },
    laLlamada: { titulo: "La llamada",
      texto: (pj) => `${pj.flags.durakLucho || pj.flags.cartaADurak ? "Hargrim ejerce la cláusula de recompra que no sabía que tenía." : "Hargrim llama. Los Cascos van últimos y el oro de tu venta se ha ido en el apotecario de Dorin."} Quiere que vuelvas. Vogt te ofrece renovar por el doble: 'Aquí eres alguien. Allí eres el que corre'. Hay una carta de Brokk sin abrir sobre el catre. ${pj.flags.teDejasteCaer ? "La grada de Baraz-Ankor ha mandado una petición con cuatro mil nombres. Los has leído todos." : ""}`,
      opciones: [
        { txt: "Volver a los Cascos.", fx: { Honor: 2, rel: { club: 3, durak: 2, dorin: 2, aficion: 2 }, flag: "volviste" }, msg: "Vuelves. Baraz-Ankor huele a piedra mojada y a cerveza de Helgra. En el vestuario, tu sitio tiene una jarra. Nadie dice nada. Es la bienvenida." },
        { txt: "Volver, pero con condiciones: la tiza es tuya.", req: { Ambición: 3 }, forzable: true, fx: { Ambición: 2, Astucia: 1, rel: { club: 1, durak: -2, dorin: -2 }, flag: "volvisteConTiza" }, msg: "Hargrim acepta. Durak lo lee en la Cristalvisión antes que de tu boca. Cuando llegas, la tiza está en el borde de la pizarra y Durak no está en el cuarto. Vuelve al día siguiente. No habla de ello." },
        { txt: "Quedarte en Norburgo. Aquí corres.", fx: { Ambición: 2, Voluntad: 1, oro: 60, rel: { club: 3, durak: -3, dorin: -3, aficion: -3, brokk: -2 }, flag: "quedasteEnNorburgo" }, msg: "Te quedas. Renuevas. Corres tres temporadas más entre humanos que aplauden mucho. Un día, en la Cristalvisión, ves a los Cascos bajar a Cuarta. Apagas el cristal. Vuelves al año siguiente, sin condiciones, por la mitad del sueldo." },
      ] },

    /* ---------- CAPÍTULO 5: EL REGRESO ---------- */
    capitania: { titulo: "El brazalete",
      texto: (pj) => `Dorin Yunquefirme te espera en el vestuario con el brazalete en la mano. Tiene ciento setenta y cuatro años, la cadera de hierro que le puso el apotecario y una voz que ya no llega a la esquina de la caja. 'No puedo gritar las casillas', dice. 'Tú sabes dónde van'. ${pj.flags.traicionasteLaCaja ? "Sabe lo del turno ocho en Baraz-Ankor. Te lo da igual. Eso es Dorin." : pj.flags.teDejasteCaer ? "Sabe lo del turno uno en Baraz-Ankor. Por eso te lo da." : ""} Nain, Skalf y Thrain miran desde el fondo. Faelas, desde el banco del desagüe, que ya no es del desagüe.`,
      opciones: [
        { txt: "Coger el brazalete y ponérselo a Dorin otra vez. Tú gritas, él manda.", fx: { Honor: 3, Voluntad: 1, rel: { dorin: 4, durak: 2, club: 3 }, flag: "capitanConDorin" }, msg: "Se lo pones. Dorin no dice nada durante un minuto entero. Luego: 'Grita'. Gritas las casillas con su voz y él manda con las manos. Es un capitán con dos cuerpos. La grada lo llama 'los Yunquefirme'." },
        { txt: "Coger el brazalete.", fx: { Ambición: 1, rel: { dorin: 2, club: 2, aficion: 2 }, flag: "capitan" }, msg: "Te lo pones. Pesa lo que pesan ciento setenta años de mandar botas. Dorin se sienta en el banco, por primera vez, y mira la caja desde fuera. Le tiembla la mano. No es la cadera." },
        { txt: "Coger el brazalete y dárselo a Faelas. Que el vestuario decida si es de los Cascos.", req: { rel: ["faelas", 3] }, forzable: true, fx: { Honor: 2, Astucia: 1, rel: { faelas: 4, club: -2, dorin: -2, aficion: -2 }, flag: "capitanFaelas" }, msg: "Faelas no lo coge. Lo deja sobre el banco. 'No es mío', dice, 'pero gracias'. Lo coges tú. El vestuario ha visto a un elfo rechazar el brazalete de los Cascos por respeto. Desde ese día le pasan el balón." },
      ] },
    dorinSeVa: { titulo: "El turno doce", partido: { rival: "Los Cascos Rotos de Karag", fuerza: 3 },
      texto: (pj) => `Contra los Cascos Rotos, otra vez, con su minotauro. Dorin ha pedido jugar. Durak ha dicho que sí, que es su vestuario. En el turno doce, uno a uno, Dorin cae en la caja sin que nadie le toque: se sienta, en medio del campo, con la cadera de hierro, y no se levanta. Mira el balón, que tienes tú. Levanta una mano. La deja caer. El árbitro no sabe qué pitar. ${pj.flags.capitanConDorin ? "Es tu voz la que grita las casillas. Y ahora nadie las manda." : ""}`,
      opciones: [
        { txt: "Parar el partido. Que se lo lleven con el brazalete puesto, andando si puede.", fx: { Honor: 3, rel: { dorin: 4, club: 3, aficion: 4, durak: 2 }, golRival: 1, flag: "dorinSeFueAndando" }, msg: "Paras el partido. El árbitro no pita nada. Dorin se levanta con Helgra y contigo, uno a cada lado, y sale del campo andando, despacio, por la banda entera, con el brazalete puesto. Sesenta mil asientos de piedra. Cuatro mil enanos de pie, golpeando el suelo. El minotauro también. Los Cascos Rotos anotan después. No le importa a nadie." },
        { txt: "Seguir jugando. Dorin querría que la caja avanzara.", tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "Gritas la casilla siguiente con la voz rota. La caja se cierra alrededor de Dorin, sentado, y avanza con él dentro, una casilla por turno, hasta la línea. Cruzáis todos. Dos a uno. Dorin, en la zona de anotación, sentado en el barro, con el balón en el regazo que le has puesto. Es el último touchdown de Dorin Yunquefirme y no lo ha corrido nadie.", fx: { fama: 15, Honor: 2, gol: 1, rel: { dorin: 5, club: 4, aficion: 5, durak: 3 }, flag: "dorinAnoto" } },
          ko: { txt: "Gritas la casilla y la caja no avanza: nadie quiere dejar a Dorin atrás. Se quedan alrededor de él, once enanos parados, hasta el silbato. Empate. Nadie lo llama derrota.", fx: { rel: { dorin: 3, club: 2, aficion: 2 }, flag: "cajaAlrededorDeDorin" } } } },
        { txt: "Sacar a Dorin en brazos tú mismo y volver a por el balón.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Lo levantas. Pesa lo que pesan ciento setenta años y una cadera de hierro. Lo llevas a la banda y vuelves. Coges el balón. La caja se rehace sin que grite nadie. Anotáis. Dorin, desde el banquillo, con Helgra, asiente una vez. Es suficiente.", fx: { fama: 10, Ferocidad: 1, gol: 1, rel: { dorin: 4, helgra: 2, club: 3, aficion: 3 }, flag: "dorinEnBrazos" } },
          ko: { txt: "Lo levantas, y no puedes con él, y Dorin se ríe, por primera vez en tu vida le oyes reír, y entre Grimnir y tú lo sacáis. El partido acaba en empate. Nadie lo recuerda así.", fx: { rel: { dorin: 3, grimnir: 2 }, flag: "dorinEnBrazos" } } } },
      ] },
    elTroll: { titulo: "El troll de Grimnir", partido: { rival: "Los Rompecráneos de Gorgomor", fuerza: 4 },
      texto: (pj) => `Un amistoso de pretemporada contra los Rompecráneos de Gorgomor, los orcos de Primera, porque Hargrim vende entradas. Traen un troll. Un troll de verdad, con la regeneración, el vómito y todo lo que sale en los libros. Grimnir lo ve desde el túnel y se le cae el hacha de las manos, que en un matatrolls es llorar. 'Sesenta años', dice. ${pj.flags.promesaGrimnir ? "Te mira. Sabe que prometiste." : pj.flags.cubrirasAGrimnir ? "Te mira. Sabe que cubrirás, y te lo pide con los ojos: hoy no." : ""} Turno tres. Grimnir entra al troll, solo, con la barba en alto. Tú estás a dos casillas.`,
      opciones: [
        { txt: "No cubrirle. Un matatrolls no se cubre.", fx: { Honor: 3, Voluntad: 2, rel: { grimnir: 5, club: 1 }, flags: ["grimnirMurio"], flag: "grimnirTuvoSuTroll" }, msg: "No te mueves. Grimnir entra con todo a favor. El troll cae. Grimnir cae encima. El troll se levanta, porque los trolls se levantan, y Grimnir no. Muere en el barro con la barba naranja en alto y una sonrisa que no le has visto nunca. Los Rompecráneos, al acabar, dejan un hacha en su banquillo. Es lo que hacen los orcos con quien muere bien." },
        { txt: "Cubrirle con Romper defensas. Que sobreviva, aunque no quiera.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Entras detrás de Grimnir sin que lo vea. El troll cae. Grimnir no. Se gira y te ve, y entiende, y por primera vez en sesenta años un matatrolls no sabe si está vivo por deshonra o por amigo. El troll no se levanta en tres turnos. Anotáis. Grimnir no te habla en un mes. Luego te da su hacha.", fx: { fama: 10, Ferocidad: 1, gol: 1, rel: { grimnir: -2, club: 2 }, flag: "grimnirVive" } },
          ko: { txt: "Entras detrás y el troll, que es un troll, os tumba a los dos con un brazo. Grimnir se levanta antes que tú, escupe barro y vuelve a entrar. Cae. No se levanta. Lo has cubierto y ha muerto igual. Peor: ha muerto tapado.", fx: { golRival: 1, rel: { grimnir: 1, club: -1 }, flags: ["grimnirMurio"], flag: "grimnirMurioTapado" } } } },
        { txt: "Robar el balón mientras el troll mira a Grimnir. Que muera por algo.", req: { Astucia: 4 }, forzable: true, tirada: { stat: "AG", obj: 10, riesgo: false,
          ok: { txt: "Todo el campo mira a Grimnir y al troll. Tú miras el balón, que tiene un orco distraído. Se lo quitas. Cruzas. Uno a cero. Detrás de ti, Grimnir cae y no se levanta, y cuando lo cuentan en Baraz-Ankor dicen que el matatrolls murió mientras los Cascos anotaban. Le hubiera gustado.", fx: { fama: 12, Astucia: 2, gol: 1, rel: { grimnir: 3, club: 2, aficion: 2 }, flags: ["grimnirMurio"], flag: "grimnirMurioAnotando" } },
          ko: { txt: "Miras el balón y el orco te ve mirar. Te tumba. Grimnir cae al mismo tiempo, a dos casillas, y os quedáis los dos en el barro, él muerto y tú no. Uno a cero para los orcos.", fx: { golRival: 1, rel: { grimnir: 1 }, flags: ["grimnirMurio"] } } } },
      ] },
    ascenso: { titulo: "El partido del ascenso", partido: { rival: "Las Espinas de Cythel", fuerza: 3 },
      texto: (pj) => `Último partido. Ganar es Primera, trescientos años después de la última vez que los Cascos tuvieron que subir a nada. Contra Cythel, los que no chocan, los que os bajaron. ${pj.flags.grimnirMurio ? "Sin Grimnir. Su hacha está en el banquillo, con Helgra." : "Grimnir está suelto, con el hacha que no puede llevar en la mirada."} ${pj.flags.cajaQueSeAbre ? "La pizarra de Durak tiene tu caja, la que se abre en el turno ocho." : pj.flags.abristeLaCaja ? "La pizarra de Durak está vacía. La caja la dibujas tú cada partido." : "La pizarra de Durak tiene la caja de siempre."} Turno ocho. {marcador}. La caja llega a la mitad del campo y los elfos bailan alrededor. Faelas está en la banda, sin marcar, porque los elfos de Cythel no marcan a un elfo enano. Nain está en la esquina, mirándote.`,
      opciones: [
        { txt: "Abrir la caja en el turno ocho. Tú por la banda, Nain por dentro, Faelas al fondo.", req: { flag: "cajaQueSeAbre" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "La caja se abre como en la pizarra. Los elfos, que esperaban una caja, se encuentran tres enanos y un elfo corriendo por sitios distintos. Bailan hacia el sitio equivocado. Anotáis dos. Tres a uno. Primera. El estadio de piedra golpea el suelo tan fuerte que la Cristalvisión pierde el cristal. Durak, en la banda, tiene la tiza en la mano y no la usa.", fx: { fama: 20, Astucia: 2, gol: 1, rel: { durak: 4, faelas: 3, club: 5, aficion: 5 }, flag: "ascendisteis" } },
          ko: { txt: "La caja se abre y Cythel, que ha visto la Cristalvisión, sabe que se abre. Cierran la banda. Te tumban. Uno a dos. Un año más en Segunda, y Durak borra la pizarra entera con la manga y la deja blanca. No sabes si es rendición o principio.", fx: { golRival: 1, rel: { durak: 1, club: 1 } } } } },
        { txt: "Caja cerrada hasta el dieciséis. Que bailen. Un enano no tiene prisa.", tirada: { stat: "ST", obj: 10, riesgo: false,
          ok: { txt: "La caja no se abre. Los elfos bailan ocho turnos alrededor de once enanos que no miran a nadie más que a su casilla. En el dieciséis, un liniero de ciento sesenta años cruza con el balón y los elfos siguen bailando en otro sitio. Dos a uno. Primera. Trescientos años de caja, y ha bastado.", fx: { fama: 12, Honor: 2, Voluntad: 2, gol: 1, rel: { dorin: 4, durak: 4, club: 4, aficion: 4 }, flag: "ascendisteis", flags: ["ascendisteisEnCaja"] } },
          ko: { txt: "La caja no se abre y los elfos, ocho turnos después, encuentran la grieta que siempre encuentran. Uno a dos. Segunda otra vez. Dorin, en el banquillo, dice: 'El año que viene'. Tiene ciento setenta y cinco años. Lo dice en serio.", fx: { golRival: 1, rel: { dorin: 2 } } } } },
        { txt: "Pasar a Faelas. Un pase largo, de enano, feo, al fondo del campo.", req: { rel: ["faelas", 3] }, forzable: true, tirada: { stat: "AG", obj: 10, riesgo: false,
          ok: { txt: "Un pase de cuarenta metros lanzado por un enano. Sale como sale: bajo, sin gracia, con efecto de piedra. Faelas lo coge porque los elfos cogen lo que les tiran. Cruza. Dos a uno. Primera, y el touchdown del ascenso es de un elfo con un pase de enano. La Cristalvisión no sabe qué titular poner.", fx: { fama: 15, Honor: 1, gol: 1, rel: { faelas: 5, club: 4, aficion: 3, durak: 1 }, flag: "ascendisteis", flags: ["faelasAscenso"] } },
          ko: { txt: "Un pase de cuarenta metros lanzado por un enano. Sale como sale. Lo intercepta un elfo de Cythel que ni siquiera salta. Uno a dos. Segunda. Faelas te busca al acabar: 'Otra vez el año que viene. Con más efecto'.", fx: { golRival: 1, rel: { faelas: 2 } } } } },
      ] },

    /* ---------- CAPÍTULO 6: PRIMERA ---------- */
    laViuda: { titulo: "La Viuda",
      texto: (pj) => `${pj.flags.ascendisteis ? "Primera División." : "Segunda, un año más, pero Hargrim ha decidido que da igual."} Hargrim ha comprado una Apisonadora: un artefacto de vapor con cuchillas, Golpe mortífero, Imparable, y un enano dentro que no ve el balón ni quiere verlo. La llaman La Viuda. El reglamento la considera arma secreta: puede jugar una entrada, y después el árbitro la expulsa, salvo que el árbitro se haya encontrado algo en la taquilla. Durak la mira como se mira una gotera. Helgra la mira como se mira una jarra grande. Tú eres el capitán y decides si sale.`,
      opciones: [
        { txt: "Que salga. Con soborno. Es la regla de los enanos: Sobornos y Corrupción.", fx: { Astucia: 1, Honor: -1, oro: -50, ventaja: 1, rel: { club: 2, durak: -1 }, flag: "viudaConSoborno" }, msg: "Cincuenta coronas en la taquilla visitante, sin nota. La Viuda sale, arrasa una entrada, y el árbitro, al ir a expulsarla, se acuerda de la taquilla. Segunda entrada también. Es lo más enano y lo menos honrado que has hecho, y las dos cosas a la vez." },
        { txt: "Que salga una entrada y se vaya. Sin soborno. Que el árbitro haga su trabajo.", fx: { Honor: 2, rel: { durak: 2, dorin: 1 }, flag: "viudaLimpia" }, msg: "La Viuda sale, deja tres rivales en la enfermería en ocho turnos, y cuando el árbitro la expulsa, el enano de dentro le saluda con la mano. Es el arma secreta mejor usada de la temporada y la más breve." },
        { txt: "Que no salga. Los Cascos ganan con la caja o no ganan.", req: { Honor: 3 }, forzable: true, fx: { Honor: 2, Voluntad: 1, rel: { durak: 4, dorin: 3, club: -3 }, flag: "viudaEnElGaraje" }, msg: "La Viuda se queda en el garaje toda la temporada. Hargrim no te habla. Durak, sí: te da la tiza sin que se la pidas. El enano de dentro de La Viuda se hace liniero. Es bueno." },
      ] },
    elfoOEnano: { titulo: "Lo que es Faelas",
      texto: (pj) => `Faelas lleva cinco temporadas en los Cascos. ${pj.flags.faelasAscenso ? "Anotó el touchdown del ascenso." : pj.flags.faelasSalvador ? "Anotó el touchdown que salvó al club de Tercera." : "Ha jugado más partidos con los Cascos que con los Brotes."} Las Hojas de Ellorien, el equipo de la corte, le ofrecen volver al bosque por lo que gana un mecenas. Lo cuenta en el vestuario, en voz baja, y once enanos dejan de mirar la pared. Nadie sabe qué decir. Faelas te mira a ti, capitán.`,
      opciones: [
        { txt: "Pedirle que se quede. Delante de todos. Con las palabras de un enano.", req: { rel: ["faelas", 3] }, forzable: true, fx: { Honor: 2, rel: { faelas: 4, club: 2, aficion: 1 }, flag: "faelasSeQueda" }, msg: "'Eres de los Cascos', dices, y es lo más que puede decir un enano. Faelas se queda. Once enanos golpean el suelo con los pies, despacio, que es lo que hacen cuando no saben aplaudir a un elfo." },
        { txt: "Decirle que se vaya. El bosque es su casa, y la caja no.", fx: { Honor: 1, rel: { faelas: 2, dorin: 1, club: -1 }, flag: "faelasSeVa" }, msg: "Se va. En la puerta del estadio, once enanos le dan la mano uno a uno, sin mirarle, mirando la piedra. Jugarás contra él en la final. Los dos lo sabéis." },
        { txt: "Que decida el vestuario. Con jarras. A votos.", req: { flag: "helgraMaestra" }, forzable: true, fx: { Astucia: 1, rel: { helgra: 2, club: 2, faelas: 1 }, flag: "faelasVotado", flags: ["faelasSeQueda"] }, msg: "Helgra pone once jarras. Diez se levantan. Dorin no levanta la suya: 'No hace falta votar lo que es'. Faelas se queda. Bebe de la jarra de Dorin." },
      ] },
    cristalvision: { titulo: "Diez segundos",
      texto: (pj) => `Un reportero de la Cristalvisión, con un cristal mágico flotando junto a la cabeza, te aborda en el túnel. 'Diez segundos. Di algo que se recuerde'. Es la víspera de la final. ${pj.flags.grimnirMurio ? "Todos quieren saber qué sientes por Grimnir." : ""} ${pj.flags.viudaConSoborno ? "Todos quieren saber qué había en la taquilla del árbitro." : ""} Detrás del cristal, medio Mundo Viejo y una montaña entera.`,
      opciones: [
        { txt: "'Aquí no se corre. Aquí se entra en la caja.'", fx: { fama: 10, Honor: 1, rel: { durak: 3, dorin: 2, aficion: 2 } }, msg: "Lo dices con la voz de Durak. La montaña entera lo repite en las tabernas. Durak lo oye en el cristal de su cueva y no dice nada. Al día siguiente hay una jarra en tu sitio que no ha puesto Helgra." },
        { txt: "'Corrimos cuando hacía falta. Eso también es enano.'", fx: { fama: 12, Ambición: 1, rel: { aficion: 3, faelas: 1, dorin: -1 } }, msg: "Lo dices y tiembla un poco. La Cristalvisión lo pone de titular. En Baraz Kadrin, Brokk lo oye en la taberna y pide otra." },
        { txt: "Dedicárselo a Dorin, a Grimnir y a la del banquillo, por su nombre.", fx: { fama: 8, Honor: 2, rel: { helgra: 4, dorin: 3, grimnir: 2, aficion: 2 } }, msg: "Dices 'Helgra' delante de medio mundo. Nadie fuera de Baraz-Ankor sabe quién es. Dentro, cuatro mil enanos se giran hacia el banquillo. Helgra sigue limpiando jarras. Se le cae una." },
      ] },
    final: { titulo: "El Cáliz de Barro", partido: { rival: "Las Hojas de Ellorien", fuerza: 4 },
      texto: (pj) => `La final. Las Hojas de Ellorien, los elfos de la corte, los que enseñaron a todos a no chocar. ${pj.flags.faelasSeVa ? "Faelas juega con ellos. Con la hoja verde. Os saludáis desde lejos." : pj.flags.faelasSeQueda || pj.flags.faelasVotado ? "Faelas juega con vosotros, con el casco de hierro. Los elfos de la corte no le miran." : ""} ${pj.flags.grimnirMurio ? "El hacha de Grimnir está en el banquillo." : "Grimnir está suelto, buscando algo grande que no hay."} ${pj.flags.dorinSeFueAndando || pj.flags.dorinAnoto ? "Dorin está en el banquillo, con Helgra, con el brazalete que ya no lleva." : ""} Turno dieciséis. {marcador}. El balón en tus manos, la caja a cuatro casillas de la línea, y las Hojas bailando alrededor como bailan.`,
      opciones: [
        { txt: "Cerrar la caja y avanzar. Cuatro casillas. Un turno. Que se acabe el tiempo dentro.", tirada: { stat: "ST", obj: 11, riesgo: true,
          ok: { txt: "Gritas las casillas con la voz de Dorin. Once enanos se cierran y avanzan cuatro casillas en un turno, que no se puede, y se puede. Cruzas dentro de la caja, sin que te toque nadie, con el silbato. Uno a cero. El Cáliz. Trescientos años de caja y una tarde en que la caja corrió. Durak, en la banda, se sienta. Es la primera vez en ochenta años que se sienta.", fx: { fama: 40, Honor: 2, Voluntad: 2, gol: 1, rel: { durak: 5, dorin: 5, club: 5, aficion: 5 }, flag: "campeon", flags: ["campeonEnCaja"] } },
          ko: { txt: "Gritas las casillas. La caja avanza tres. Faltaba una. Silbato. Empate y el Cáliz se decide a bajas: los elfos no se dejan pillar. Es de las Hojas. Once enanos se quedan en la caja después del silbato, sin moverse, como si el partido no hubiera acabado. La corte de Ellorien no sabe qué mirar.", fx: { golRival: 1, rel: { club: 2, aficion: 2, dorin: 1 } } } } },
        { txt: "Salir de la caja y correr. Como el primer día. Que sea lo último que hagas.", tirada: { stat: "MA", obj: 10, riesgo: true,
          ok: { txt: "Sales. Los elfos, que esperan cajas, tardan medio turno en entender que un enano corre. Medio turno es lo que tienes. Cruzas con el silbato, solo, sin caja, con sesenta mil asientos de piedra en pie. Uno a cero. El Cáliz. Durak, en la banda, tiene la tiza en la mano. La parte por la mitad. Te da una.", fx: { fama: 45, Ambición: 2, gol: 1, rel: { aficion: 5, durak: 3, club: 5, faelas: 2 }, flag: "campeon", flags: ["campeonCorriendo"] } },
          ko: { txt: "Sales. Los elfos, esta vez, esperaban justo eso: han visto la Cristalvisión. Te tumban en la banda, sin caja, con el balón rodando hacia el bosque. Anotan ellos con el silbato. Cero a uno. El Cáliz es de las Hojas. Te levantas solo. Nadie te dijo la casilla.", fx: { golRival: 1, rel: { aficion: 1, durak: -1 } } } } },
        { txt: "Helgra tiene cincuenta coronas en la jarra. El árbitro tiene una taquilla. Un turno más para la caja.", req: { oro: 50, flag: "helgraMaestra" }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Helgra sube al túnel con la jarra y baja sin ella. El árbitro mira su reloj de arena, lo gira 'por error', y hay un turno diecisiete que no existe. La caja lo usa como usa los turnos: una casilla. Cruzas dentro. Uno a cero. El Cáliz, con un turno de más y cincuenta coronas de menos. Es lo más enano que se ha hecho en una final, y en Ellorien tardarán un siglo en explicárselo.", fx: { fama: 35, Astucia: 2, Honor: -3, oro: -50, gol: 1, rel: { helgra: 4, club: 5, aficion: 4, dorin: 2 }, flag: "campeon", flags: ["campeonSobornando"] } },
          ko: { txt: "Helgra sube al túnel con la jarra. El árbitro es un elfo de la corte y no tiene taquilla. Gira el reloj de arena 'por error' hacia el otro lado: un turno menos. Silbato. Empate. Las Hojas se llevan el Cáliz a bajas y a Helgra se la llevan dos guardias. Vuelve al día siguiente. No dice qué pasó.", fx: { golRival: 1, oro: -50, rel: { helgra: 2, club: 1 } } } } },
        { txt: "Pasar a Faelas.", req: { flag: "faelasSeQueda" }, forzable: true, tirada: { stat: "AG", obj: 10, riesgo: false,
          ok: { txt: "El pase de enano, bajo y feo, cruza el campo. Los elfos de la corte lo miran como se mira una piedra que vuela. Faelas, el elfo de los Cascos, lo coge en el aire delante de su propia gente. Cruza. Uno a cero. El Cáliz. Las Hojas de Ellorien han perdido contra un elfo con casco de hierro, y la corte tardará un siglo en explicárselo.", fx: { fama: 40, Honor: 2, gol: 1, rel: { faelas: 5, club: 5, aficion: 4, durak: 2 }, flag: "campeon", flags: ["campeonConFaelas"] } },
          ko: { txt: "El pase de enano. Bajo. Feo. Un elfo de la corte lo intercepta sin saltar y anota con el silbato. Cero a uno. Faelas viene a por ti al centro del campo y no dice nada. Se sienta a tu lado. Os quedáis un rato.", fx: { golRival: 1, rel: { faelas: 3 } } } } },
      ] },

    /* ---------- CAPÍTULO 7: EL OCASO ---------- */
    durakMuere: { titulo: "La tiza",
      texto: (pj) => `Durak Ojoferro muere en su cueva, con ochenta y tres años de banquillo, sentado delante de la pizarra. ${pj.flags.campeonEnCaja ? "En la pizarra está la caja que avanzó cuatro casillas en un turno. La dibujó él, de memoria, esa noche." : pj.flags.campeonCorriendo ? "En la pizarra está la mitad de una tiza. La otra la tienes tú." : pj.flags.cajaQueSeAbre ? "En la pizarra está tu caja, la que se abre en el turno ocho. Nunca la borró." : "En la pizarra está la caja de siempre."} Hargrim quiere un entrenador para mañana. Helgra te mira desde la puerta con la jarra de Durak en la mano. Dorin, que tiene ciento setenta y siete años, no ha venido: no puede bajar la escalera.`,
      opciones: [
        { txt: "Coger la tiza. Ser el entrenador de los Cascos.", fx: { Voluntad: 2, Honor: 1, rel: { club: 4, helgra: 2, aficion: 2 }, flag: "entrenador" }, msg: "La coges. Pesa menos que el brazalete y más que el balón. Helgra deja la jarra de Durak en el borde de la pizarra. Ahí se queda." },
        { txt: "Pedir que el entrenador sea Dorin, aunque no baje la escalera.", req: { rel: ["dorin", 3] }, forzable: true, fx: { Honor: 3, rel: { dorin: 4, club: 2, helgra: 1 }, flag: "dorinEntrenador" }, msg: "Hargrim dice que no baja la escalera. Tú dices que la caja tampoco se mueve y gana. Dorin entrena desde un sillón en el palco, con un cuerno de cerveza por megáfono. Los Cascos ganan tres seguidos. Nadie sabe qué grita." },
        { txt: "Pedir que sea Helgra. Cuarenta años en el banquillo.", req: { flag: "helgraMaestra" }, forzable: true, fx: { Honor: 2, Astucia: 1, rel: { helgra: 5, club: 1, aficion: 1, durak: 1 }, flag: "helgraEntrenadora" }, msg: "Hargrim se ríe. Luego no. Helgra coge la tiza y dibuja, en un minuto, una caja que Durak no dibujó en ochenta años. Es la primera entrenadora de la historia del club, y juraste no echarla del banquillo. No la has echado. La has subido." },
      ] },
    elBanquillo: { titulo: "El joven que corre",
      texto: (pj) => `Fichan a un corredor de Baraz Kadrin: Thorek, sesenta años, que corre un poco más de lo que tú corrías a su edad. Es el sobrino de Brokk. Te mira como tú mirabas a Dorin, y corre como tú corrías, y ${pj.flags.entrenador ? "eres su entrenador" : "eres su capitán"}. El primer día, en el primer entrenamiento, recoge el balón y corre hasta la línea antes de que se forme la caja. Once enanos le miran. Te miran a ti.`,
      opciones: [
        { txt: "'Aquí no se corre. Aquí se entra en la caja.'", fx: { Honor: 2, Voluntad: 1, rel: { durak: 2, dorin: 2, club: 2 }, flag: "dijisteLaFrase" }, msg: "Lo dices, y te oyes, y es la voz de Durak saliendo de tu boca. Thorek te mira como tú miraste a Durak. Al día siguiente le pones a recoger balones con los reservas. Al tercero, con la tiza. Aprende la caja en tres noches. Sigue queriendo correr. Ahora sabe desde dónde." },
        { txt: "Enseñarle la caja que se abre en el turno ocho. Que corra desde dentro.", req: { flag: "cajaQueSeAbre" }, forzable: true, fx: { Astucia: 2, rel: { club: 3, aficion: 2 }, flag: "thorekAprendio" }, msg: "Le enseñas siete turnos de caja y uno de banda. Aprende más rápido que tú. Es lo que duele y lo que importa. En el primer partido abre la caja en el turno ocho sin que nadie se lo diga, y anota, y la grada golpea el suelo para él. Para él." },
        { txt: "Dejarle correr. Es mejor que tú, y lo sabes.", fx: { Honor: 1, Ambición: -1, rel: { club: 1, aficion: 1 }, flag: "thorekCorre" }, msg: "Le dejas. Corre tres temporadas sin caja, como tú en Norburgo, y en la cuarta le rompen la rodilla sin que once enanos lo impidan. Vuelve a la caja solo, sin que nadie se lo diga. Le das la tiza." },
      ] },
    ultimoPartido: { titulo: "El último partido", partido: { rival: "Los Yunques de Baraz Kadrin", fuerza: 3 },
      texto: (pj) => `Nadie ha dicho que sea el último, pero lo saben los sesenta mil asientos. Contra los Yunques, que entrena Brokk desde la banda con las manos en la barba. ${pj.flags.thorekAprendio || pj.flags.dijisteLaFrase ? "Thorek juega en el centro de la caja. Tú en la esquina, donde jugaba Dorin al final." : "Thorek juega en la banda. Tú en el centro, todavía."} Turno dieciséis, {marcador}, el balón en tus manos y el hombro diciendo que ya.`,
      opciones: [
        { txt: "Poner el balón en las manos de Thorek y cerrar la caja alrededor de él.", req: { flag: "thorekAprendio" }, forzable: true, fx: { Honor: 3, fama: 8, gol: 1, rel: { club: 4, aficion: 4, brokk: 2 }, flag: "paseFinal" }, msg: "Se lo pones en las manos y gritas la casilla, y once enanos se cierran alrededor del sobrino de tu hermano como se cerraron alrededor de ti. Cruza. Es su primer touchdown de Primera y tu último pase. Brokk, en la banda, se saca las manos de la barba y golpea el suelo." },
        { txt: "Correr. Una última vez. Desde la caja hasta la línea.", tirada: { stat: "MA", obj: 10, riesgo: true,
          ok: { txt: "Sales de la caja por última vez. El hombro aguanta. Los Yunques, que te conocen desde niño, llegan tarde por lo de siempre: ese medio paso de más. Cruzas. No te caes: un enano no cae. Te quedas de pie en la zona de anotación con el balón contra el pecho hasta que suena el silbato y hasta después, y nadie se atreve a moverte, y Brokk baja de la banda y se pone a tu lado, de pie, sin decir nada.", fx: { fama: 15, Voluntad: 2, gol: 1, rel: { aficion: 5, brokk: 4 }, flag: "ultimoTD" } },
          ko: { txt: "Sales de la caja y el hombro dice que no a medio camino. Caes a dos casillas de la línea. Un Yunque coge el balón, mira a Brokk en la banda, y te lo devuelve. Empate. Nadie de Baraz Kadrin se queja.", fx: { rel: { brokk: 4, aficion: 3 }, flag: "balonDevuelto" } } } },
        { txt: "Sentarte en la caja. Como Dorin. Que el partido acabe alrededor.", req: { flag: "dorinSeFueAndando" }, forzable: true, fx: { Honor: 3, Voluntad: 2, fama: 10, rel: { dorin: 3, aficion: 5, club: 3 }, flag: "teSentasteEnLaCaja" }, msg: "Te sientas en el barro, en medio de la caja, con el balón en el regazo. Once enanos se cierran alrededor y no avanzan. Los Yunques no atacan. El árbitro no pita. El silbato suena con un empate y sesenta mil asientos golpeando el suelo, y Brokk baja de la banda a levantarte, y no puede, y os reís." },
      ] },
    laMina: { titulo: "La galería de la caja",
      texto: (pj) => `Después del último partido bajas a la galería donde jugabas de niño con Brokk, con un casco viejo y dos vagonetas por portería. ${pj.flags.grimnirMurio ? "El hacha de Grimnir la has traído. Pesa." : ""} Hay dos críos jugando. Uno corre. El otro le grita las casillas. Ninguno sabe quién eres.`,
      opciones: [
        { txt: "Dejar el hacha de Grimnir apoyada en la vagoneta.", req: { flag: "grimnirMurio" }, forzable: true, fx: { Honor: 2, rel: { grimnir: 3 }, flag: "hachaEnLaGaleria" }, msg: "La dejas. Los críos la miran y no la tocan. Al mes ya no está. Alguien con la barba naranja la tiene, o la tendrá." },
        { txt: "Gritar las casillas con el que las grita, hasta que se apaguen las lámparas.", fx: { Honor: 1, Voluntad: 1, rel: { dorin: 2 }, flag: "gritasteCasillas" }, msg: "Gritas con él. El que corre, corre igual. Al final, los tres, formáis una caja de tres alrededor de un casco viejo y avanzáis una casilla por turno hacia una vagoneta. Es la mejor caja que has visto." },
        { txt: "Sentarte y mirar cómo corre el que corre.", fx: { Voluntad: 2 }, msg: "Miras. Corre mal, y luego menos mal. No le dices nada. Al salir, el otro crío te pregunta si tú eres tú. 'Yo era el que corría', le dices. 'Ahora grito casillas'." },
      ] },
    retiro: { titulo: "Cómo juegan los Cascos",
      texto: (pj) => `Las rodillas no aguantan y el hombro tampoco. ${pj.flags.campeon ? "El Cáliz de Barro está en la Sala de los Ancestros de Baraz-Ankor, y la caja que lo ganó está dibujada en la piedra al lado." : "El Cáliz de Barro nunca fue tuyo, y la caja que casi lo gana está dibujada en la piedra igual."} Hargrim, que ya no baja al vestuario, manda preguntar cómo van a jugar los Cascos cuando tú no corras. Helgra espera con dos jarras. Queda decidir qué haces con lo que queda de ti, y con la caja.`,
      opciones: [
        { txt: "Entrenar a los Cascos con la caja de siempre. Aquí no se corre.", req: { rel: ["durak", 3] }, forzable: true, fx: { Honor: 2, Voluntad: 1, rel: { club: 4, dorin: 3, aficion: 2 }, flag: "finCajaDeSiempre" }, msg: "Coges la tiza y dibujas la caja de Durak, sin banda, sin turno ocho. Once enanos jóvenes la aprenden en tres noches. Cuando uno corre, le pones a recoger balones. Los Cascos ganan uno a cero durante treinta años. Los elfos vuelven a aprender a no chocar, y tú, que lo sabes, no cambias nada. Es lo enano." },
        { txt: "Entrenar a los Cascos con la caja que se abre. Aquí se corre en el turno ocho.", req: { flag: "cajaQueSeAbre" }, forzable: true, fx: { Astucia: 2, Ambición: 1, rel: { club: 4, faelas: 2, aficion: 3 }, flag: "finCajaQueSeAbre" }, msg: "Dibujas siete turnos de caja y uno de banda. Los Cascos la juegan treinta años. Otros clubes enanos la copian y la llaman 'la caja de Baraz-Ankor', y en la corte de Ellorien la llaman 'la trampa'. Durak, en la piedra de la Sala de los Ancestros, tiene la boca cerrada. Tú decides que sonríe." },
        { txt: "Volver a la mina con Brokk. Que la caja la dibuje otro.", req: { rel: ["brokk", 3] }, forzable: true, fx: { Honor: 2, rel: { brokk: 4, club: -1 }, flag: "finMina" }, msg: "Vuelves a Baraz Kadrin con la bolsa. Brokk te espera en la galería con dos picos. Picáis treinta años uno al lado del otro, sin hablar, que es como hablan los enanos. Los domingos gritáis casillas a los críos. Ninguno os hace caso." },
        { txt: "Coger el hacha de Grimnir y teñirte la barba. Buscar el troll.", req: { flag: "grimnirMurio", Ferocidad: 4 }, forzable: true, fx: { Ferocidad: 3, Honor: 1, Voluntad: -1, rel: { grimnir: 5, club: -2, aficion: 3 }, flag: "finMatatrolls" }, msg: "Te tiñes la barba en la cervecería de Helgra, con su tinte y su silencio. Vuelves al campo como matatrolls, suelto, buscando algo grande. Lo encuentras en tu tercer partido. No te cubre nadie: lo has pedido. Es la muerte que Grimnir quería, y la tienes tú. Le habría dado rabia, y luego se habría reído." },
      ] },
  },
  epilogo: (pj, rasgo) => {
    const fin = pj.flags.finCajaDeSiempre ? "Entrenó a los Cascos treinta años con la caja de Durak. Murió en la cueva de la pizarra, con la tiza en la mano, y nadie la borró." :
      pj.flags.finCajaQueSeAbre ? "Entrenó a los Cascos treinta años con la caja que se abre en el turno ocho. Murió en la banda, gritando una casilla, y la grada golpeó el suelo tanto rato que hubo que parar el partido." :
      pj.flags.finMina ? "Murió en la galería de Baraz Kadrin, con el pico en la mano, al lado de Brokk, que siguió picando un rato antes de darse cuenta." :
      pj.flags.finMatatrolls ? "Murió como un matatrolls, contra algo grande, sin que nadie le cubriera. Le pusieron el hacha de Grimnir en el pecho." : "Nadie sabe cómo cerró su temporada.";
    return `${pj.nombre} fue ${rasgo}, y el único enano que corrió. ${pj.flags.campeon ? "Ganó el Cáliz de Barro con los Cascos de Hierro, trescientos años después del último." : "Nunca ganó el Cáliz de Barro con los Cascos, y estuvo a una casilla."} ${pj.rel.dorin >= 4 ? "Dorin Yunquefirme, con ciento ochenta años, bajó la escalera para su entierro. Fue lo último que bajó." : pj.rel.dorin <= -2 ? "Dorin Yunquefirme no fue a su entierro. Mandó el brazalete." : ""} ${pj.rel.helgra >= 4 ? "Helgra sirvió la última tanda y cerró el banquillo." : ""} ${pj.rel.faelas >= 4 ? "Faelas, el elfo de los Cascos, se quedó en la montaña hasta que se le olvidó el bosque." : ""} ${pj.muertes > 0 ? `Murió ${pj.muertes + 1} veces; solo la última contó.` : ""} ${fin}`;
  },
  recuerdos: {
    cajaAprendida: "Sabes dónde va cada bota antes que ellos.", insolencia: "Le dijiste a Dorin que la caja te sobraba.", helgraMaestra: "Helgra te enseñó con jarras. Juraste no echarla.",
    corristeEnElDerbi: "Un touchdown que no era de enano.", cajaConFinta: "Dos pasos a la banda y la caja avanzó tres.", manoAFaelas: "Le diste la mano al elfo delante de todos.", contraFaelas: "Dijiste que un elfo no entra en la caja.",
    jugadaFaelas: "El cruce de Faelas, al amanecer, a escondidas.", jugadaRobada: "Le llevaste a Durak la jugada del elfo como tuya.", cruceEnCythel: "Gritaste el nombre del elfo y Helgra le empujó al campo.", cazasteReceptora: "Esperaste a la receptora donde iba a caer.",
    apotecarioParaDorin: "El apotecario fue a Dorin. Tu hombro no curó.", apotecarioParaTi: "El apotecario fue a ti. Dorin no volvió en tres meses.", runaDeHelgra: "Una runa que no está en los libros, con un clavo del banquillo.",
    promesaGrimnir: "Prometiste no cubrir a Grimnir.", cubrirasAGrimnir: "Le dijiste a Grimnir que le cubrirías.", deshonraGrimnir: "'Corrí. Y ganamos. Y el clan me echó igual'.",
    salvasteALosCascos: "Los Cascos no bajaron.", descendisteis: "Tercera División, por primera vez en trescientos años.", corristeEnElDescenso: "Corriste entre los cuernos del minotauro.", faelasSalvador: "Un pase de enano y un elfo salvaron al club.",
    jovenesEnCaja: "Nain, Skalf y Thrain aprendieron la caja contigo.", jovenesCorren: "Cuatro enanos y un elfo, al amanecer.", jovenesDelatados: "Se lo contaste a Dorin.", cajaQueSeAbre: "Siete turnos de caja y uno de banda. 'Esto es enano'.", cruceEnPizarra: "'Esto es elfo', dijo Durak, y salió.",
    cerrasteElMotin: "Gritaste las casillas como Dorin.", abristeLaCaja: "La caja se abrió como una flor de hierro.", motinFallido: "Dorin llevó el balón al centro andando, solo.", nainPorElCasco: "Cogiste a Nain del casco delante de la grada.", ganasteABrokk: "Corristeis los dos por la banda, a un paso.",
    durakLucho: "Durak luchó por ti con Hargrim. Perdió, y te consiguió la vuelta.", quisisteIrte: "Quisiste ver cómo se juega fuera de la caja.", helgraNegocio: "Helgra subió al palco con dos jarras. Bajó con una.",
    corristeConHumanos: "Nadie te decía la casilla.", cajaHumana: "'La cosa enana', la llamaba Vogt.", rodillaDeNorburgo: "Te rompieron la rodilla sin que once enanos lo impidieran.", cartaABrokk: "Cuatro páginas. 'Ya. Vuelve'.", cartaADurak: "Una carta de Brokk en la mesa de Durak, sin nota.",
    traicionasteLaCaja: "Le robaste el balón a un liniero que te enseñó a atarte las botas.", teDejasteCaer: "Turno uno a dieciséis en el suelo. La grada golpeó el suelo para ti.", volviste: "Una jarra en tu sitio.", volvisteConTiza: "Volviste con la tiza.", quedasteEnNorburgo: "Viste a los Cascos bajar a Cuarta en un cristal.",
    capitanConDorin: "Un capitán con dos cuerpos.", capitan: "El brazalete pesa ciento setenta años.", capitanFaelas: "Faelas rechazó el brazalete por respeto.",
    dorinSeFueAndando: "Dorin salió andando por la banda entera, con el brazalete.", dorinAnoto: "El último touchdown de Dorin no lo corrió nadie.", dorinEnBrazos: "Levantaste ciento setenta años.",
    grimnirTuvoSuTroll: "No te moviste. Grimnir murió sonriendo.", grimnirVive: "Grimnir vivió tapado. Te dio su hacha.", grimnirMurioTapado: "Le cubriste y murió igual.", grimnirMurioAnotando: "Grimnir murió mientras los Cascos anotaban.",
    ascendisteis: "Primera, trescientos años después.", ascendisteisEnCaja: "Trescientos años de caja, y bastó.", faelasAscenso: "Un pase de enano, un elfo, Primera.",
    viudaConSoborno: "Cincuenta coronas en la taquilla. Lo más enano y lo menos honrado.", viudaLimpia: "La Viuda saludó al árbitro al irse.", viudaEnElGaraje: "La Viuda se quedó en el garaje.",
    faelasSeQueda: "'Eres de los Cascos'.", faelasSeVa: "Once enanos le dieron la mano mirando la piedra.", faelasVotado: "Diez jarras. Dorin no levantó la suya.",
    campeon: "El Cáliz de Barro, en la Sala de los Ancestros.", campeonSobornando: "Un turno diecisiete que no existe. Cincuenta coronas.", campeonEnCaja: "La caja avanzó cuatro casillas en un turno.", campeonCorriendo: "Durak partió la tiza por la mitad.", campeonConFaelas: "Un elfo con casco de hierro contra su propia corte.",
    entrenador: "La tiza pesa menos que el brazalete.", dorinEntrenador: "Dorin entrena desde el palco con un cuerno.", helgraEntrenadora: "Juraste no echarla. La subiste.",
    dijisteLaFrase: "'Aquí no se corre'. Con la voz de Durak.", thorekAprendio: "Thorek abrió la caja en el turno ocho sin que nadie se lo dijera.", thorekCorre: "Le dejaste correr. Volvió a la caja solo.",
    paseFinal: "Tu último pase fue el primer touchdown de Thorek.", ultimoTD: "De pie en la zona de anotación, con Brokk al lado.", balonDevuelto: "Un Yunque te devolvió el balón.", teSentasteEnLaCaja: "Once enanos alrededor, sin avanzar.",
    hachaEnLaGaleria: "El hacha de Grimnir, apoyada en una vagoneta.", gritasteCasillas: "Una caja de tres alrededor de un casco viejo.",
  },
};

const ENANO_ALIADOS = (pj, cap) => [
  { nombre: "Dorin Yunquefirme", ST: 4, AG: 1, AV: 10, si: cap <= 4 && !pj.flags.apotecarioParaTi || (cap === 5 && !pj.flags.dorinSeFueAndando && !pj.flags.dorinAnoto && !pj.flags.dorinEnBrazos && !pj.flags.cajaAlrededorDeDorin) },
  { nombre: "Grimnir Barbarroja", ST: 3, AG: 2, AV: 9, si: !pj.flags.grimnirMurio && cap !== 4 },
  { nombre: "Faelas", ST: 2, AG: 5, AV: 8, si: cap >= 2 && cap !== 4 && !pj.flags.faelasSeVa && (pj.rel.faelas >= 1 || cap >= 5) },
  { nombre: "Nain", ST: 3, AG: 2, AV: 10, si: cap >= 3 && cap !== 4 },
  { nombre: "Skalf", ST: 3, AG: 2, AV: 10, si: cap >= 3 && cap !== 4 },
  { nombre: "La Viuda", ST: 7, AG: 1, AV: 11, si: cap === 6 && (pj.flags.viudaConSoborno || pj.flags.viudaLimpia) },
  { nombre: "Thorek", ST: 3, AG: 3, AV: 9, si: cap === 7 },
  { nombre: "Linieros humanos", ST: 3, AG: 3, AV: 9, si: cap === 4 },
];
const ENANO_TRANSICIONES = {
  2: (pj) => `Pasa la primera temporada entera. Ochenta partidos de caja, o eso parece: en realidad son doce, y en cada uno avanzáis una casilla por turno y dejáis a tres rivales en la enfermería. Los Cascos acaban séptimos en Segunda, que es lo peor de su historia y lo mejor que nadie esperaba. ${pj.flags.corristeEnElDerbi ? "La Cristalvisión ha repetido tu touchdown del derbi tantas veces que Durak ha dejado de mirar cristales." : "Nadie fuera de la montaña sabe tu nombre, y dentro lo saben cuatro mil, uno a uno."} ${pj.rel.helgra >= 3 ? "Helgra te sirve la primera de cada tanda. Los viejos lo notan." : ""} Faelas ha jugado cero minutos.`,
  3: (pj) => `${pj.flags.descendisteis ? "Pasa el verano del descenso. Baraz-Ankor no habla de ello: los enanos no hablan de lo que duele, lo graban. En la puerta del estadio han grabado la fecha, sin más. Tercera División. Campos con vacas. Equipos halfling." : "Pasa el verano de la salvación. Baraz-Ankor tampoco habla de ello: los enanos no celebran no bajar. Pero Helgra ha abierto un barril que guardaba desde el último Cáliz, y eso lo dice todo."} ${pj.flags.apotecarioParaDorin ? "Tu hombro no ha curado. Se nota al recoger el balón." : ""} ${pj.flags.grimnirMurio ? "" : "Grimnir ha afilado el hacha todo el verano. No hay trolls en Tercera."} Han fichado a tres jóvenes que crecieron viéndote en el cristal.`,
  4: (pj) => `Pasan dos semanas de contrato y tres días de carro hasta Norburgo. ${pj.flags.quisisteIrte ? "Quisiste irte, y te fuiste." : "No quisiste irte, y te fuiste igual: el oro no pregunta."} La ciudad huele a río y a humanos, que huelen a prisa. En el carro repasas la caja de memoria, cada bota, y luego te das cuenta de que allí no hay caja, y que nadie te va a decir la casilla, y que eso es lo que querías, y que da miedo. ${pj.flags.helgraNegocio ? "La mitad de tu venta fue al apotecario de Dorin. Helgra no te ha dicho qué le dijo a Hargrim." : ""}`,
  5: (pj) => `Pasa una temporada en Norburgo${pj.flags.quedasteEnNorburgo ? ", y tres más, y una tarde ves a los Cascos bajar a Cuarta en un cristal" : ""}. Vuelves a Baraz-Ankor por el túnel grande, con la bolsa y ${pj.flags.rodillaDeNorburgo ? "una rodilla que crujió sin caja" : "las piernas intactas"}. El estadio de piedra está igual: sesenta mil asientos con nombre, cuatro mil enanos. Dorin ha cumplido ciento setenta y cuatro. Nain, Skalf y Thrain tienen barba entera. Faelas sigue en el banco, que ya no es del desagüe. Helgra tiene una jarra en tu sitio.`,
  6: (pj) => `${pj.flags.ascendisteis ? "Pasa el verano del ascenso. Trescientos años después, los Cascos de Hierro vuelven a Primera, y esta vez sí: Baraz-Ankor lo celebra. Golpeando el suelo. Tres días." : "Pasa el verano de la casilla que faltó. Segunda otra vez. Hargrim ha decidido que da igual y ha comprado algo con cuchillas."} ${pj.flags.grimnirMurio ? "El hacha de Grimnir está en el banquillo, junto a la cerveza. Helgra la limpia cada partido." : "Grimnir sigue buscando algo grande. Ha empezado a mirar a los árbitros."} ${pj.flags.dorinSeFueAndando ? "Dorin ya no juega. Se sienta con Helgra y manda con las manos." : ""} Eres el capitán. ${pj.flags.capitanConDorin ? "Con dos cuerpos." : ""}`,
  7: (pj) => `Pasan tres temporadas. ${pj.flags.campeon ? "El Cáliz está en la Sala de los Ancestros, y los enanos ya hablan de él como si fuera de hace siglos, que es como hablan de todo." : "El Cáliz se lo llevaron las Hojas, y en la piedra de la puerta hay grabada una casilla. Solo una."} Ganas menos partidos y más respeto, que en Baraz-Ankor es que la grada golpee el suelo más despacio. Te duele el hombro al recoger el saque y la rodilla al entrar en la caja. ${pj.flags.faelasSeQueda || pj.flags.faelasVotado ? "Faelas sigue en los Cascos. Lleva más años en la montaña que en el bosque." : ""} Durak ha cumplido ochenta y tres años de banquillo y ya no se levanta de la silla. En el vestuario hay caras nuevas que no saben quién fue Grimnir. Tú sí.`,
};
const ENANO_ENTREACTOS = [
  { id: "tizaDorin", caps: [2, 3], txt: "Noches con Dorin y la tiza, casilla a casilla.", req: { rel: ["dorin", 1] }, fx: { Astucia: 1, stat: { ST: 1 }, rel: { dorin: 1 } }, msg: "Dorin dibuja, tú memorizas. Al tercer mes sabes dónde va a estar cada bota antes que la bota." },
  { id: "jarrasHelgra", caps: [2, 3, 4, 5, 6], txt: "Tardes en el banquillo con Helgra y las jarras.", fx: { Astucia: 1, rel: { helgra: 2 } }, msg: "Helgra mueve jarras sobre la mesa y tú ves cajas que se abren y se cierran. Aprendes más que en la pizarra." },
  { id: "amanecerFaelas", caps: [2, 3, 5, 6], txt: "Amaneceres en el campo vacío con Faelas.", req: { rel: ["faelas", 1] }, fx: { stat: { AG: 1 }, rel: { faelas: 2 } }, msg: "Corréis el cruce antes de que llegue nadie. Nueve de cada diez sale. La décima te levanta él." },
  { id: "hachaGrimnir", caps: [2, 3, 5], txt: "Recibir placajes de Grimnir hasta que no duelan.", fx: { stat: { AV: 1 }, rel: { grimnir: 1 } }, msg: "Grimnir te pega con cariño, que es como pega un matatrolls. A la décima ya no caes." },
  { id: "escalerasEstadio", caps: [2, 3, 5, 6, 7], txt: "Subir y bajar los mil escalones del estadio de piedra.", fx: { stat: { MA: 1 } }, msg: "Al mes bajas sin pararte. Al segundo, subes igual. Un enano rápido en la montaña: escándalo." },
  { id: "cartaBrokk", caps: [2, 3, 4, 5, 6, 7], txt: "Escribir a Brokk, a Baraz Kadrin.", fx: { rel: { brokk: 2 }, Honor: 1 }, msg: "Le escribes cuatro líneas. Contesta con dos. Es una conversación larga, para enanos." },
  { id: "ventanasNorburgo", caps: [4], txt: "Correr por las murallas de Norburgo al amanecer, sin nadie.", fx: { stat: { MA: 1 }, Voluntad: 1 }, msg: "Corres hasta que la ciudad humana se despierta. Nadie te dice la casilla. Sigues corriendo." },
  { id: "tabernaHumana", caps: [4], txt: "Beber con los humanos de los Grifos.", fx: { rel: { club: 2 }, Astucia: 1 }, msg: "Los humanos beben deprisa y hablan más deprisa. Aprendes cómo piensan cuando corren: no piensan. Es útil." },
  { id: "salaAncestros", caps: [5, 6, 7], txt: "Sentarte en la Sala de los Ancestros, delante de la caja grabada en piedra.", fx: { Voluntad: 2, rel: { aficion: 1, durak: 1 } }, msg: "Miras la caja de hace trescientos años. Es la misma. Eso es lo que da miedo y lo que consuela." },
  { id: "descanso", caps: [6, 7], txt: "No hacer nada. Dormir. Curar.", fx: { Voluntad: 1, rel: { club: 1 } }, msg: "Duermes diez horas por primera vez en años. El hombro no lo agradece. La rodilla sí." },
];
const ENANO_TIEMPO = {};

/* ====================== ORCO ====================== */

/* ====================== ORCO — "DA BANDA" ====================== */
const ORCO = {
  nombre: "Orco", lema: "El más pequeño de la camada. Por ahora.",
  puesto: "Blitzer Orco", reglas: ["Brutos Brutales", "Capitán del Equipo"],
  base: { MA: 6, ST: 3, AG: 3, AV: 10, hab: ["Abrirse paso", "Placar"] },
  // Ficha de cría: la del cesto en el río. Sube a la del reglamento (base) cuando
  // Da Banda tiene campo y juega en Sexta (capítulo 2).
  fichaInicial: { MA: 5, ST: 2, AG: 2, AV: 9, hab: [] },
  firmaCap: 2,
  equipoInicial: "Da Banda",
  rel: { snotlig: "Snotlig, jefe goblin", gorka: "Ma Gorka, la ogra", grimgutz: "Grimgutz, el troll", wazzok: "Wazzok, el chamán", skabnik: "Skabnik, el fanático", banda: "Da Banda", aficion: "Los que apuestan", club: "El campo" },
  relInicial: { snotlig: 1, gorka: 0, grimgutz: 0, wazzok: 0, skabnik: 0, banda: 1, aficion: 0, club: 0 },
  portada: "Eres la cría más pequeña de la camada, y las charcas tiran a los pequeños al río en un cesto. Te recogen unos goblins carroñeros que viven de robar cascos a los equipos de Sexta. No tienes charca, ni jefe, ni nombre de equipo. Tienes cinco goblins, un cesto y hambre. Esta es la historia de cómo se construye una banda, pieza a pieza, hasta que Gorgomor entera se agacha, o hasta que te comen.",
  capitulos: [
    { id: 1, titulo: "El cesto", sub: "Sin división, sin campo, sin nombre", escenas: ["elRio", "snotlig", "losCascos", "rugir"] },
    { id: 2, titulo: "El campo", sub: "Sexta División, si hay dónde jugar", escenas: ["halflings", "quienPierdeSeVa", "maGorka", "primeroSexta", "wazzok"] },
    { id: 3, titulo: "El troll", sub: "Un fichaje que come árbitros", escenas: ["elPuente", "convencer", "conTroll", "snotligYElTroll", "skabnik"] },
    { id: 4, titulo: "El nombre", sub: "Quinta División, con nombre o sin él", escenas: ["nombre", "elGoblinMuerto", "snotligReta", "copaCharca"] },
    { id: 5, titulo: "El oro", sub: "Cuarta División y una deuda al doscientos por ciento", escenas: ["laDeuda", "cuatroDedos", "vender", "wazzokAcierta", "ascensoOrco"] },
    { id: 6, titulo: "El Rey", sub: "Gorgomor invita. Es una trampa.", escenas: ["invitacion", "laTrampa", "nocheEnGorgomor", "cristalvision", "finalOrco", "vestuarioFinalO"] },
    { id: 7, titulo: "La charca", sub: "Lo que dura una banda", escenas: ["grimgutzViejo", "snotligViejo", "ultimoPartido", "elCesto", "retiro"] },
  ],
  muertes: [
    { titulo: "Demasiado pequeño para morir", texto: "Te despiertas en el barro con Snotlig sentado en tu pecho, comiéndote una oreja. Le pegas. 'Vivo', dice, decepcionado. Los goblins ya se habían repartido tus botas. Ya no rebotas igual.", fx: { stat: { AV: -1 }, Ferocidad: 1, rel: { snotlig: 1 } } },
    { titulo: "El bastón de Wazzok", texto: "Wazzok te devuelve a golpes de bastón, con una seta en cada ojo. 'Gorg te quiere', dice. 'O Morg. He apostado por Gorg'. Una pierna no responde igual. Wazzok anota que acertó: no has muerto.", fx: { stat: { MA: -1 }, Voluntad: 1, rel: { wazzok: 2 } } },
    { titulo: "El guiso de Ma Gorka", texto: "Ma Gorka te da de comer algo que no preguntas. Vuelves lento, con la mano azul y una deuda nueva: el guiso cuesta. 'La última seta', dice. 'Ahora me debes la vida y el doscientos por ciento'.", fx: { stat: { AG: -1 }, Honor: -1, rel: { gorka: 1 }, oro: -30 } },
  ],
  escenas: {
    vestuarioFinalO: { titulo: "Bajo el puente, después",
      texto: (pj) => `No hay vestuario: hay el puente, el río, y una hoguera. ${pj.flags.campeon ? "El Cáliz de Barro está lleno de cerveza robada y pasa de mano en mano, de goblin en goblin. Nadie lo va a devolver." : "No hay Cáliz. Hay una hoguera y unos goblins que cuentan la historia de la banda que casi, y la cuentan mejor de como fue."} ${pj.flags.jefeSupremo ? "Rey Krug está muerto, o lejos, y Gorgomor entera sabe tu nombre esta noche." : ""} ${pj.rel.snotlig >= 3 ? "Snotlig está a tu derecha, con los doce cascos y una sonrisa que no le habías visto." : ""}`,
      opciones: (pj) => [
        { txt: "Contar la historia del cesto a los goblins jóvenes.", fx: { Honor: 1, rel: { banda: 3, snotlig: 2 } }, msg: "Les cuentas el río, la raíz, los cinco goblins que te sacaron. Grot, que ya no está. Los jóvenes escuchan como se escucha un mito. Para ellos lo eres." },
        { txt: "Beber del Cáliz y pasárselo a Snotlig.", req: { flag: "campeon" }, fx: { Honor: 2, rel: { snotlig: 3, banda: 2 } }, msg: "Bebes y se lo pasas a Snotlig, que bebe y se lo pasa al siguiente. El Cáliz de Barro, de mano en goblin, alrededor de una hoguera bajo un puente. Es la imagen que quedará." },
        { txt: "Sentarte solo en la orilla, a mirar el río.", fx: { Voluntad: 2, rel: { aficion: 1 } }, msg: "Te sientas donde se enganchó tu cesto. El río sigue igual. Piensas en las camadas que siguen tirando pequeños al agua, y en si vas a cambiar eso o no. Todavía no lo sabes." },
      ] },
    /* ---------- 1. EL CESTO ---------- */
    elRio: { titulo: "El río",
      texto: () => `Tienes tres días y un cesto. La charca de Gorgomor te ha tirado al río porque eres el más pequeño de veinte, y las charcas no crían pequeños: los tiran. El cesto se engancha en una raíz. Desde la orilla, cinco goblins con cascos robados te miran como se mira la comida. Uno, con un casco humano que le tapa los ojos, dice: 'Muerde'. Muerdes al primero que se acerca. Es Snotlig. Se ríe con la mano sangrando.`,
      opciones: [
        { txt: "Seguir mordiendo hasta que te suelten.", fx: { Ferocidad: 2, rel: { snotlig: 1, banda: 1 } }, msg: "Muerdes a tres. Snotlig decide que un orco que muerde a tres goblins a los tres días vale más que un guiso. Te llevan al cesto de los cascos. Eres el sexto." },
        { txt: "Dejar de morder y mirar. Contar cuántos son.", fx: { Astucia: 2, rel: { snotlig: 2 } }, msg: "Cuentas cinco. Snotlig te ve contar. 'Este cuenta', dice. Es la primera vez que un goblin dice algo bueno de un orco. Te llevan al cesto de los cascos como se lleva un tesoro." },
        { txt: "Comerte el casco humano del que te tapa los ojos.", fx: { Ferocidad: 1, Ambición: 1, rel: { snotlig: 1 }, flag: "cascoComido" }, msg: "Te comes medio casco. Snotlig se lo apunta: un orco que come metal a los tres días. 'Va a crecer', dice. Aciertas. Aciertan." },
      ] },
    snotlig: { titulo: "El jefe de los goblins",
      texto: (pj) => `Snotlig es el jefe de los cinco goblins y lleva doce cascos robados colgados del cinturón, uno por cada equipo de Sexta al que ha desvalijado. Viven bajo un puente, de robar equipamiento y venderlo a Ma Gorka, la ogra de la taberna. Te cría con lo que sobra. Creces igual: los orcos crecen con lo que hay. A los cinco años ya eres más grande que él, y Snotlig lo nota antes que tú. ${pj.flags.cascoComido ? "'Come cascos', dice de ti a los demás, con orgullo y con miedo." : ""}`,
      opciones: [
        { txt: "Seguir obedeciendo a Snotlig. Es tu jefe.", fx: { Honor: 2, Voluntad: 1, rel: { snotlig: 3, banda: 2 }, flag: "obedecisteASnotlig" }, msg: "Obedeces. Snotlig te enseña a robar un casco sin que el dueño se despierte, a contar goblins y a no comerte a los tuyos. Es lo más parecido a un padre que tendrá un orco." },
        { txt: "Hacerle saber que ya eres más grande. Sin pegarle.", req: { Ferocidad: 2 }, forzable: true, fx: { Ferocidad: 1, Ambición: 1, rel: { snotlig: -1, banda: 2 }, flag: "masGrandeQueSnotlig" }, msg: "Te pones de pie a su lado. Le sacas una cabeza. Snotlig lo ve y no dice nada. Los otros cuatro goblins lo ven también, y desde ese día te miran a ti antes de mirarle a él. Snotlig lo sabe. Empieza a dormir lejos." },
        { txt: "Proponerle un trato: tú creces, él manda. Los dos comemos.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 2, rel: { snotlig: 2, banda: 1 }, flag: "tratoConSnotlig" }, msg: "Snotlig lo piensa. 'Trato', dice, y escupe. Es la primera negociación de tu vida y la haces con un goblin. Aprendes que un jefe que piensa dura más que uno que muerde." },
      ] },
    losCascos: { titulo: "Los cascos de los Charcos", partido: { rival: "Los Charcos de Grünburg", fuerza: 1 },
      texto: (pj) => `Los Charcos de Grünburg, humanos de Sexta, tienen once cascos nuevos y un granero sin cerrojo. Snotlig quiere robarlos. Tú quieres otra cosa: retarles. 'Si ganáis, os quedáis los cascos'. Los humanos se ríen: cinco goblins y un orco de siete años contra once campesinos. Aceptan por reírse. Es tu primer partido. No hay árbitro. Hay una vaca. ${pj.flags.obedecisteASnotlig ? "Snotlig dice que es una tontería y juega igual." : "Snotlig juega porque los otros cuatro ya están en el campo."}`,
      opciones: [
        { txt: "Ir a por el más grande de los humanos. Que vean lo que muerde el pequeño.", tirada: { stat: "ST", obj: 8, riesgo: true,
          ok: { txt: "Vas a por un campesino de cien kilos que se llama Hans. Cae. Los otros diez humanos se paran a mirar, y en ese rato cinco goblins con cascos robados anotan por cinco sitios. Ganáis. Os lleváis los cascos y la vaca os sigue un rato.", fx: { fama: 5, Ferocidad: 1, gol: 1, rel: { banda: 3, snotlig: 2, aficion: 1 }, flag: "cascosGanados" } },
          ko: { txt: "Vas a por Hans y Hans, cien kilos, no cae. Te sienta encima. Los humanos anotan mientras te sacan de debajo. Perdéis. Snotlig roba los cascos esa noche igual, y no te lo perdona: 'Para esto no hacía falta jugar'.", fx: { golRival: 1, rel: { snotlig: -1, banda: 1 }, flag: "cascosRobados" } } } },
        { txt: "Que los goblins corran y tú te quedes en medio, quieto, tapando.", tirada: { stat: "ST", obj: 7, riesgo: false,
          ok: { txt: "Te plantas en medio del campo y once humanos chocan contigo por turnos porque no saben por dónde pasar. Los goblins corren alrededor con la bola. Anotan tres. Ganáis. Hans, al acabar, te da la mano: 'Raro'. Os lleváis los cascos.", fx: { fama: 4, Voluntad: 1, gol: 1, rel: { banda: 3, snotlig: 3 }, flag: "cascosGanados" } },
          ko: { txt: "Te plantas y los humanos te rodean, que es lo que hacen once contra uno. Los goblins corren sin bola. Perdéis. Snotlig roba los cascos esa noche. Tú aprendes que plantarse solo vale si hay alguien alrededor.", fx: { golRival: 1, rel: { banda: 1 }, flag: "cascosRobados" } } } },
      ] },
    rugir: { titulo: "Aprender a rugir",
      texto: (pj) => `Los orcos rugen. Tú, criado por goblins, chillas. Snotlig lo sabe y te lleva de noche a la orilla de la charca de Gorgomor, la que te tiró al río, a oír rugir a los jefes desde lejos. Rey Krug, Jefe Supremo, ruge desde su elefante muerto y la charca entera se agacha. ${pj.flags.cascosGanados ? "Llevas un casco humano ganado, no robado. Es el primero de la banda que se ganó." : ""} 'Prueba', dice Snotlig.`,
      opciones: [
        { txt: "Rugir. Con lo que hay.", tirada: { stat: "ST", obj: 7, riesgo: false,
          ok: { txt: "Ruges. Sale un ruido que no es de goblin ni de orco: es tuyo. En la charca, tres crías se agachan sin saber por qué. Snotlig se tapa los oídos y sonríe. 'Va a crecer'.", fx: { Ferocidad: 2, fama: 3, rel: { banda: 2, snotlig: 1 }, flag: "rugiste" } },
          ko: { txt: "Ruges. Sale un chillido. Desde el elefante, Rey Krug se gira y mira hacia la orilla, y no ve nada, y se ríe con la boca llena. Snotlig te saca de allí a rastras. 'Otro día'.", fx: { Voluntad: 1, rel: { snotlig: 1 } } } } },
        { txt: "No rugir. Mirar cómo se agacha la charca y aprender por qué.", fx: { Astucia: 2, rel: { snotlig: 1 }, flag: "mirasteALaCharca" }, msg: "Miras. La charca se agacha porque Krug come primero y pega segundo, en ese orden. Lo apuntas donde apuntan los orcos: en el estómago. Snotlig te mira mirar. 'Este cuenta', repite." },
        { txt: "Rugirle a Snotlig. A ver quién se agacha.", req: { flag: "masGrandeQueSnotlig" }, forzable: true, fx: { Ferocidad: 2, Ambición: 1, rel: { snotlig: -3, banda: 3 }, flag: "snotligSeAgacho" }, msg: "Le ruges a un goblin en la oscuridad. Se agacha. No por el ruido: por lo que viene después. Desde esa noche, la banda es tuya y Snotlig es tu segundo, y los dos sabéis que un día se lo cobrará." },
      ] },

    /* ---------- 2. EL CAMPO ---------- */
    halflings: { titulo: "Un campo con nabos",
      texto: () => `Para jugar en Sexta hace falta un campo. El único que hay sin dueño orco es el de los Panzudos de Molino Viejo, halflings, que juegan los domingos entre nabos y comen entre partidos. Snotlig quiere robarlo de noche. Ma Gorka, la ogra de la taberna, ofrece comprarlo por ti al doscientos por ciento. Y tú, que ya tienes diez años y eres más ancho que la puerta del puente, tienes otra idea: retarles. Quien pierde, se va.`,
      opciones: [
        { txt: "Retar a los halflings. Quien pierde se va del campo.", fx: { Honor: 2, Ferocidad: 1, rel: { banda: 2, aficion: 1 }, flag: "retasteHalflings" }, msg: "Los halflings aceptan porque son halflings: creen que perder es que se acabe la comida. Snotlig dice que es una tontería. Ma Gorka apuesta contra ti. Es la primera vez que alguien apuesta sobre tu banda." },
        { txt: "Robarlo de noche, como dice Snotlig.", fx: { Astucia: 1, Honor: -2, rel: { snotlig: 3, aficion: -1 }, flag: "campoRobado" }, msg: "Robáis el campo: las porterías, las líneas, los nabos. Los halflings lo descubren el domingo y lloran. Tenéis campo. Nadie apuesta por vosotros: los que apuestan no apuestan por ladrones." },
        { txt: "Pedir el oro a Ma Gorka. Al doscientos por ciento.", fx: { Astucia: 1, oro: -20, rel: { gorka: 2, snotlig: -1 }, flag: "deudaGorka" }, msg: "Ma Gorka te presta. Te apunta en una pared con una uña: 'El pequeño. Doscientos'. Compras el campo a los halflings, que lo venden llorando y comiendo. Tienes campo y tienes deuda. La segunda crece más rápido." },
      ] },
    quienPierdeSeVa: { titulo: "Quien pierde se va", partido: { rival: "Los Panzudos de Molino Viejo", fuerza: 1 },
      condicion: (pj) => pj.flags.retasteHalflings,
      texto: () => `Los Panzudos contra tu banda, en su campo, con todos los halflings de la comarca comiendo en la grada. Los halflings no placan: se caen solos y se levantan comiendo. Tienen un hombre-árbol, que es lo único que preocupa. Turno ocho. {marcador}. Tienes la bola, cinco goblins alrededor y el hombre-árbol delante, que tarda en moverse pero cuando se mueve, se mueve.`,
      opciones: [
        { txt: "Ir de frente contra el árbol. Un orco no rodea.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Vas de frente contra un árbol. No cae, pero se echa atrás, y un árbol que se echa atrás deja un hueco. Pasas. Anotas. Los halflings lloran, comen, y se van del campo con las porterías al hombro. Es vuestro. Ma Gorka paga la apuesta con cara de guiso.", fx: { fama: 6, Ferocidad: 2, gol: 1, rel: { banda: 3, aficion: 2, gorka: 1 }, flag: "campoGanado" } },
          ko: { txt: "Vas de frente contra un árbol. Un árbol. Te despiertas con los halflings comiendo alrededor y el campo todavía suyo. Snotlig lo roba esa noche. Los que apuestan apuntan: 'el pequeño va de frente contra árboles'.", fx: { golRival: 1, rel: { banda: 1 }, flag: "campoRobado" } } } },
        { txt: "Que los goblins tiren de la bola por los lados mientras tú entretienes al árbol.", tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Te pones delante del árbol y le dejas que te mire. Tarda un turno en decidir moverse. En ese turno, cinco goblins han anotado por dos sitios. Ganáis. Los halflings se van comiendo. El campo es vuestro y los que apuestan te apuntan: 'el pequeño piensa'.", fx: { fama: 6, Astucia: 2, gol: 1, rel: { banda: 3, snotlig: 2, aficion: 2 }, flag: "campoGanado" } },
          ko: { txt: "Te pones delante del árbol y el árbol, sin moverse, te coge con una rama. Los goblins corren sin bola. Perdéis. Os vais del campo. Snotlig lo roba esa noche igual.", fx: { golRival: 1, flag: "campoRobado" } } } },
      ] },
    maGorka: { titulo: "Ma Gorka",
      texto: (pj) => `Ma Gorka regenta la taberna-cueva donde se apuesta todo lo que se apuesta en Sexta. Mide tres metros, es madre de todos y de nadie, presta al doscientos por ciento y no olvida un nombre. ${pj.flags.deudaGorka ? "El tuyo está en su pared, con una uña." : pj.flags.campoGanado ? "Perdió una apuesta contigo. Lo apunta también." : "No ha apostado por ti nunca. Aún."} Te sirve un guiso que no preguntas y te dice: 'Una banda sin campo es un chiste. Una banda sin oro es un chiste corto. ¿Cuánto quieres?'`,
      opciones: [
        { txt: "Nada. Da Banda no debe.", req: { Voluntad: 2 }, forzable: true, fx: { Voluntad: 2, Honor: 1, rel: { gorka: 1, banda: 1 }, flag: "sinDeuda" }, msg: "Ma Gorka se ríe con toda la cueva. 'Todos deben'. No te apunta en la pared. Es la única banda de Sexta que no está en su pared, y eso, en Sexta, es un nombre." },
        { txt: "Lo justo para cascos de verdad. Y pagarlo con victorias.", fx: { Astucia: 1, oro: 40, rel: { gorka: 2, banda: 2 }, flag: "deudaGorka" }, msg: "Te presta. Te apunta. Los goblins estrenan cascos que no le han robado a nadie y no saben ponérselos. Ganáis dos partidos y Ma Gorka cobra el primero entero." },
        { txt: "Pedirle que apueste por Da Banda. Que se lo juegue.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, fama: 5, rel: { gorka: 3, aficion: 3 }, flag: "gorkaApuesta" }, msg: "Ma Gorka te mira largo rato. 'Por el pequeño', dice, y pone cien coronas sobre la mesa contra la cueva entera. Desde ese día, los que apuestan apuestan por ti, porque Ma Gorka nunca pierde. Es una presión que pesa tres metros." },
      ] },
    primeroSexta: { titulo: "El primer partido de liga", partido: { rival: "Los Pisapiedras de la Charca Negra", fuerza: 2 },
      texto: (pj) => `Sexta División, con campo, con cascos, sin nombre: en la clasificación os llaman 'Da Banda (sin nombre)'. Los Pisapiedras de la Charca Negra son orcos de charca de verdad, grandes, que no han visto nunca un orco con goblins de compañeros y se ríen desde el saque. ${pj.flags.gorkaApuesta ? "Ma Gorka ha apostado por vosotros. La cueva entera mira." : ""} Turno seis. {marcador}. Su capitán, que pesa el doble que tú, viene con la bola por el centro.`,
      opciones: [
        { txt: "Que los goblins le muerdan los tobillos y tú le entres cuando mire abajo.", tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Cinco goblins le muerden los tobillos. Mira abajo. Entras. Cae, y se oye. La bola sale rodando y Snotlig la coge y corre como corren los goblins: sin sentido y rápido. Anota. Empate, y luego dos más. Ganáis. La Charca Negra se va sin reírse.", fx: { fama: 8, Ferocidad: 1, gol: 1, rel: { banda: 3, snotlig: 2, aficion: 2 } } },
          ko: { txt: "Los goblins le muerden. No mira abajo: mira a ti, y te entra él primero. Te pasa por encima y anota. Cero a dos. Al acabar, los que apuestan se ríen menos que los Pisapiedras.", fx: { golRival: 1, rel: { aficion: -1 } } } } },
        { txt: "Plantarte delante y aguantar. Que se canse.", tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Te plantas. Choca. Rebota. Choca. Rebota. Al tercero se cansa, que es lo que hace un orco grande: cansarse. Le quitas la bola. Anotas tú. Empate, y luego más. Ganáis. Los Pisapiedras no entienden cómo.", fx: { fama: 6, Voluntad: 2, gol: 1, rel: { banda: 2, aficion: 2 } } },
          ko: { txt: "Te plantas y no rebota: te lleva por delante hasta la línea, contigo colgando. Anota. Cero a dos. Los goblins te sacan de debajo entre cinco.", fx: { golRival: 1 } } } },
      ] },
    wazzok: { titulo: "El chamán que se equivoca",
      texto: () => `Wazzok es un chamán con una seta en cada ojo que aparece en tu campo un martes y anuncia que morirás el domingo. No mueres. El domingo siguiente lo anuncia otra vez. Lleva cuatro semanas fallando y no se va: dice que Gorg le ha dicho que te siga. O Morg. Los goblins le tienen miedo. Snotlig quiere echarlo. Ma Gorka dice que un chamán que falla trae suerte, y ella nunca pierde.`,
      opciones: [
        { txt: "Quedártelo. Un chamán que falla es mejor que ninguno.", fx: { Astucia: 1, rel: { wazzok: 3, banda: 1 }, flag: "wazzokEnLaBanda" }, msg: "Se queda. Predice tu muerte cada domingo durante años. Falla cada domingo. Los goblins empiezan a creer que mientras Wazzok falle, no puedes morir. Tú también, un poco." },
        { txt: "Echarlo a bastonazos con su propio bastón.", fx: { Ferocidad: 1, rel: { wazzok: -3, snotlig: 2 }, flag: "wazzokEchado" }, msg: "Le echas. Se va cojeando y prediciendo. Snotlig está contento. El domingo siguiente, sin chamán, pierdes por primera vez en la liga. Es casualidad. Wazzok, desde lejos, no lo cree." },
        { txt: "Preguntarle qué ha apostado sobre ti.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 2, rel: { wazzok: 2, gorka: 1 }, flag: "wazzokApuesta" }, msg: "'Que llegas a Gorgomor', dice. 'Contra Ma Gorka. Al doscientos'. Un chamán que apuesta a que no mueres y dice cada domingo que sí. Aprendes que en Sexta todo el mundo tiene dos bocas." },
      ] },

    /* ---------- 3. EL TROLL ---------- */
    elPuente: { titulo: "Bajo el puente",
      texto: (pj) => `Grimgutz es un troll de río que vive bajo el puente de los goblins, que es donde vivíais antes de tener campo. Come viajeros, come árbitros cuando pasan, y come cualquier cosa que haga ruido. Es más grande que una puerta, regenera, y no ha jugado a nada en su vida. ${pj.flags.wazzokEnLaBanda ? "Wazzok dice que Gorg quiere que lo fiches. Falla en todo lo demás; en esto no lo sabes." : ""} Snotlig dice que un troll come goblins. Tú dices que un troll gana partidos. Los dos tenéis razón.`,
      opciones: [
        { txt: "Ir solo al puente. Con un árbitro.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 2, Honor: -2, rel: { grimgutz: 3, aficion: 1 }, flag: "arbitroParaGrimgutz" }, msg: "Le llevas un árbitro de Sexta, de los que cobran en dientes. Grimgutz se lo come entero y te mira con algo parecido a la gratitud. Te sigue al campo. La federación no pregunta: hay muchos árbitros." },
        { txt: "Ir con la banda entera. Que vea que somos muchos.", fx: { Ferocidad: 1, rel: { banda: 2, grimgutz: 1 } }, msg: "Vais los seis. Grimgutz sale de debajo del puente, mira a cinco goblins y un orco, y se come al goblin más cercano. Snotlig te mira. Es el primero de los tuyos que pierdes, y lo has perdido por un fichaje." },
        { txt: "Sentarte en el puente y esperar a que salga por hambre.", req: { Voluntad: 3 }, forzable: true, fx: { Voluntad: 2, rel: { grimgutz: 2 }, flag: "esperasteAGrimgutz" }, msg: "Esperas dos días. Sale. Te huele. No te come: eres pequeño y hueles a goblin, y los goblins, para un troll, son de la familia. Se sienta a tu lado. Os quedáis mirando el río. Es el fichaje más largo de tu vida." },
      ] },
    convencer: { titulo: "Cómo se convence a un troll",
      texto: (pj) => `Grimgutz está en tu campo y no sabe qué hacer. Le das una bola: se la come. Le das otra: la mira. ${pj.flags.arbitroParaGrimgutz ? "Cada domingo espera un árbitro. Hay que explicarle que no todos." : pj.flags.esperasteAGrimgutz ? "Te sigue a todas partes. Es como tener una montaña detrás." : ""} Snotlig se ha subido a una portería y no baja. ${pj.flags.wazzokEnLaBanda ? "Wazzok le habla al troll en un idioma que no existe. El troll asiente." : ""}`,
      opciones: [
        { txt: "Enseñarle una sola cosa: cuando alguien tenga la bola, siéntate encima.", fx: { Astucia: 1, Honor: 1, rel: { grimgutz: 3, banda: 2 }, flag: "grimgutzSeSienta" }, msg: "Aprende. Es la única jugada de su vida y la hace cada partido: se sienta encima del que tiene la bola. Los rivales de Sexta empiezan a soltar la bola cuando lo ven venir. Es táctica." },
        { txt: "Dejar que Wazzok le hable. Sea lo que sea lo que le dice.", req: { flag: "wazzokEnLaBanda" }, forzable: true, fx: { Astucia: 1, rel: { wazzok: 3, grimgutz: 2 }, flag: "wazzokYGrimgutz" }, msg: "Wazzok le habla en el idioma que no existe. Grimgutz asiente. Desde ese día, cuando Wazzok señala a alguien, Grimgutz va. Es un chamán con un troll a cuerda. Ma Gorka sube las apuestas." },
        { txt: "Pegarle hasta que entienda quién manda.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Le pegas. Un orco pegándole a un troll. Grimgutz se sorprende tanto que se sienta. Le pegas otra vez. Se ríe, que en un troll es un terremoto. Entiende. Manda el pequeño. La banda entera lo ha visto.", fx: { Ferocidad: 2, fama: 5, stat: { ST: 1 }, rel: { grimgutz: 2, banda: 3 }, flag: "pegasteAGrimgutz" } },
          ko: { txt: "Le pegas. Grimgutz te devuelve el golpe sin querer, y sin querer es peor que queriendo. Te despiertas en la taberna de Ma Gorka, que te ha cobrado la cama. El troll está fuera, esperándote, con cara de disculpa.", fx: { rel: { grimgutz: 1, gorka: -1 }, oro: -10 } } } },
      ] },
    conTroll: { titulo: "Con troll", partido: { rival: "Los Cascos Rotos de Karag", fuerza: 2 },
      texto: (pj) => `Los Cascos Rotos de Karag son enanos del Caos con cuernos, y en Sexta nadie les gana porque nadie tiene con qué. Vosotros tenéis a Grimgutz. ${pj.flags.grimgutzSeSienta ? "Sabe sentarse encima del que tiene la bola." : pj.flags.wazzokYGrimgutz ? "Wazzok le señala cosas." : "No sabe nada. Es grande."} Turno cinco. {marcador}. Su minotauro viene por el centro con la bola y la banda entera mira al troll, que mira una mosca.`,
      opciones: [
        { txt: "Gritarle al troll. Con el rugido, si lo tienes.", req: { flag: "rugiste" }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Ruges. Grimgutz deja la mosca, ve al minotauro, y se sienta encima de él. Con bola y todo. El minotauro no vuelve a levantarse en el partido. Los goblins recogen lo que queda y anotan dos. Ganáis. Los Cascos Rotos se van con los cuernos bajos.", fx: { fama: 10, Ferocidad: 1, gol: 1, rel: { grimgutz: 3, banda: 3, aficion: 3 }, flag: "trollSentoMinotauro" } },
          ko: { txt: "Ruges. Grimgutz se asusta del ruido y se sienta encima de Snotlig. El minotauro anota. Uno a dos. Snotlig sobrevive. No te habla en una semana.", fx: { golRival: 1, rel: { snotlig: -2, grimgutz: 1 } } } } },
        { txt: "Ir tú a por el minotauro y que el troll vea cómo se hace.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Vas de frente contra un minotauro. Un orco de once años. Le das donde Snotlig te enseñó a dar a los jabalíes de los goblins: en la pata de atrás. Cae. Grimgutz lo ve, entiende, y hace lo mismo con el siguiente. Ganáis. El troll ha aprendido mirando. Es más de lo que aprendió en cien años bajo un puente.", fx: { fama: 8, Ferocidad: 2, gol: 1, rel: { grimgutz: 3, banda: 2 }, flag: "trollAprendioMirando" } },
          ko: { txt: "Vas de frente contra un minotauro. Un minotauro. Te despiertas con Grimgutz mirándote y la mosca en tu nariz. Uno a tres. El troll, al menos, no se ha comido a nadie.", fx: { golRival: 1, rel: { grimgutz: 1 } } } } },
        { txt: "Dejar que Wazzok señale.", req: { flag: "wazzokYGrimgutz" }, forzable: true, tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Wazzok señala al minotauro con el bastón. Grimgutz va. El minotauro, que tiene cuernos y no tiene miedo, descubre el miedo. Grimgutz se lo come a medias. El árbitro no pita: tiene miedo también. Ganáis. Wazzok dice que lo predijo. Es la primera vez que acierta.", fx: { fama: 10, Astucia: 1, gol: 1, rel: { wazzok: 3, grimgutz: 2, aficion: 3 }, flag: "wazzokAcerto" } },
          ko: { txt: "Wazzok señala al minotauro. Grimgutz va al árbitro. Se lo come. El partido se suspende con uno a dos. Os dan la derrota y una multa. Wazzok dice que Gorg quería otra cosa.", fx: { golRival: 1, oro: -20, rel: { aficion: -1 } } } } },
      ] },
    skabnik: { titulo: "El fanático",
      texto: (pj) => `Skabnik es un goblin con una bola y cadena que gira sin parar y que no puede dejar de girar sin caerse. Es un fanático: un arma que anda, y que no distingue a los suyos. Llega a tu campo un domingo girando y tumba a dos rivales y a un goblin tuyo. Snotlig quiere matarlo. Ma Gorka ha apostado a que dura tres partidos. ${pj.flags.wazzokEnLaBanda ? "Wazzok dice que Skabnik es Morg. O Gorg." : ""}`,
      opciones: [
        { txt: "Ficharlo. Que gire lejos de los nuestros.", fx: { Ferocidad: 1, Astucia: 1, rel: { skabnik: 3, snotlig: -1, banda: 1 }, flag: "skabnikEnLaBanda" }, msg: "Le fichas. Lo pones en la banda del campo, lejos, y le dices 'gira hacia allí'. Gira hacia allí siete de cada diez veces. Las otras tres, la banda aprende a agacharse. Ganáis más de lo que perdéis." },
        { txt: "Ponerle una cadena más corta.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, rel: { skabnik: 2, banda: 2 }, flag: "cadenaCorta" }, msg: "Le acortas la cadena. Gira más despacio, tumba menos, y no alcanza a los goblins. Skabnik llora: era su cadena. Pero no llora ninguno de los tuyos. Snotlig te mira como se mira a un jefe." },
        { txt: "Echarlo antes de que mate a alguien.", fx: { Honor: 1, rel: { snotlig: 2, skabnik: -3, aficion: -1 }, flag: "skabnikEchado" }, msg: "Le echas. Se va girando. Tumba a dos viajeros en el camino. Los Cuatro Dedos lo fichan al mes. Le verás. Girando hacia ti." },
      ] },

    snotligYElTroll: { titulo: "Dónde duerme un goblin",
      texto: (pj) => `Snotlig no se acerca a Grimgutz. Se acuerda del goblin que se comió, o del que se pudo comer. ${pj.flags.esperasteAGrimgutz ? "Tú te sentaste dos días en el puente. Snotlig no habría durado dos minutos." : ""} Una noche de helada, los goblins duermen apretados y Snotlig se queda fuera, lejos del troll, temblando con los doce cascos puestos para el frío. Grimgutz, sin decir nada, se tumba de lado y deja un hueco caliente entre el brazo y la barriga. Snotlig lo mira. Tú miras a Snotlig.`,
      opciones: [
        { txt: "Empujar a Snotlig hacia el hueco. Con cuidado.", fx: { Honor: 2, rel: { snotlig: 3, grimgutz: 2, banda: 2 }, flag: "snotligDurmioConElTroll" }, msg: "Le empujas. Snotlig se queda rígido en el hueco caliente, con los cascos puestos, esperando que le coman. No le comen. Se duerme. Grimgutz ronca. Desde esa noche Snotlig duerme ahí, y el troll no se mueve hasta que el goblin se levanta." },
        { txt: "Dormir tú en el hueco. Que Snotlig vea que no come.", fx: { Voluntad: 1, rel: { grimgutz: 3, snotlig: 1 }, flag: "dormisteConElTroll" }, msg: "Duermes en el hueco. Es lo más caliente que has dormido. Snotlig lo ve desde fuera y al tercer día se acerca. Al cuarto duerme a tu lado, con el troll detrás de los dos. Es una banda apretada." },
        { txt: "Dejarle temblar. Un goblin que no confía en su troll no dura.", fx: { Ferocidad: 1, Honor: -1, rel: { snotlig: -2, grimgutz: 1 } }, msg: "Le dejas. Snotlig tiembla toda la noche y no se acerca nunca al troll. En el campo, tampoco: le deja solo. Grimgutz se sienta encima de quien tiene la bola sin nadie que le diga quién." },
      ] },

    /* ---------- 4. EL NOMBRE ---------- */
    nombre: { titulo: "Un nombre",
      texto: (pj) => `Da Banda sube a Quinta sin nombre, y en Quinta nadie apuesta por un equipo sin nombre: en la pizarra de Ma Gorka hay un hueco donde debería estar. ${pj.flags.gorkaApuesta ? "Ma Gorka dice que no puede apostar por un hueco." : ""} Snotlig quiere llamaros Los Cascos Robados. Grimgutz no quiere nada. ${pj.flags.wazzokEnLaBanda ? "Wazzok quiere algo con Gorg." : ""} Tú tienes ${pj.flags.cascoComido ? "un casco a medio comer desde los tres días" : "un cesto"}, y una idea.`,
      opciones: [
        { txt: "Los Cestos del Río. Por donde os tiraron.", fx: { Honor: 2, rel: { banda: 3, snotlig: 1 }, equipo: "Los Cestos del Río", flag: "nombreCesto" }, msg: "Los Cestos del Río. Los goblins pintan un cesto en los cascos robados. Ma Gorka lo escribe en la pizarra con la uña. Es el primer equipo de Quinta con nombre de basura, y en dos temporadas es el que más apuestas mueve." },
        { txt: "Los Cascos Robados. Como quiere Snotlig.", fx: { Astucia: 1, rel: { snotlig: 4, banda: 2, aficion: -1 }, equipo: "Los Cascos Robados", flag: "nombreCascos" }, msg: "Los Cascos Robados. Snotlig llora, que en un goblin es reírse mal. Doce equipos de Sexta reconocen sus cascos en vuestras cabezas y no dicen nada: perderían." },
        { txt: "Da Banda. Sin más. Que lo escriban así.", req: { Ferocidad: 3 }, forzable: true, fx: { Ferocidad: 1, Ambición: 1, fama: 5, rel: { banda: 2, aficion: 2 }, flag: "nombreDaBanda" }, msg: "Da Banda. Ma Gorka lo escribe sin uña: con carbón, grande. En Quinta empiezan a decir 'da banda' como se dice 'la charca'. Es un nombre porque tú lo dices. Es lo que hace un jefe." },
      ] },
    elGoblinMuerto: { titulo: "Grot",
      texto: (pj) => `Grot era el goblin más pequeño de los cinco que te sacaron del río, el del casco que le tapaba los ojos. ${pj.flags.skabnikEnLaBanda ? "Skabnik le alcanza girando en un entrenamiento. No se levanta." : pj.flags.cadenaCorta ? "Un blitzer de los Cuatro Dedos le pisa en un partido cuando el árbitro no mira. No se levanta." : "Un enano del Caos le pisa en un partido. No se levanta."} Es el primero de los tuyos que muere jugando. Snotlig no dice nada: se sienta con el cuerpo hasta que se hace de noche. Los otros tres goblins te miran a ti. Eres el jefe.`,
      opciones: [
        { txt: "Sentarte con Snotlig hasta que amanezca.", fx: { Honor: 3, Voluntad: 1, rel: { snotlig: 4, banda: 3 }, flag: "velasteAGrot" }, msg: "Te sientas. No habláis. Al amanecer Snotlig dice: 'Era el que te sacó del cesto'. No lo sabías. Enterráis a Grot bajo el puente, con su casco, que le sigue tapando los ojos." },
        { txt: "Echar a Skabnik esa misma noche.", req: { flag: "skabnikEnLaBanda" }, forzable: true, fx: { Honor: 2, rel: { snotlig: 3, skabnik: -4, banda: 2, aficion: -1 }, flag: "skabnikEchadoPorGrot" }, msg: "Echas a Skabnik girando hacia el camino. Perdéis un arma. Ganas tres goblins que vuelven a dormir cerca. Snotlig te mira como no te miraba desde que eras más pequeño que él." },
        { txt: "Colgar el casco de Grot en el poste. Y jugar el domingo.", fx: { Ferocidad: 1, Voluntad: 2, rel: { banda: 2, snotlig: 1, aficion: 1 }, flag: "cascoDeGrot" }, msg: "Cuelgas el casco. El domingo, cada uno de los tuyos lo toca al salir. Ganáis. Es lo que hacen los orcos con los muertos: jugar el domingo. Snotlig lo toca el último." },
      ] },
    snotligReta: { titulo: "Lo que se cobra un goblin",
      texto: (pj) => `Snotlig te espera una noche en el campo, solo, con los doce cascos del cinturón. ${pj.flags.snotligSeAgacho ? "Se agachó una vez. Ha venido a cobrarlo." : pj.flags.velasteAGrot ? "Ha venido a decirte algo, no a cobrar." : "Ha venido a saber quién manda, que en una banda se pregunta una vez."} 'Eres más grande', dice. 'Eres jefe. Pero la banda la hice yo. Quiero saber si lo sabes'.`,
      opciones: [
        { txt: "Decirle que lo sabes. Delante de los goblins, mañana.", fx: { Honor: 3, rel: { snotlig: 5, banda: 3 }, flag: "reconocisteASnotlig" }, msg: "Lo dices al día siguiente delante de todos: 'La banda la hizo Snotlig'. Los goblins no saben qué hacer con un orco que dice eso. Snotlig sí: se sienta a tu derecha para siempre. Un jefe con un goblin a la derecha. Gorgomor no lo entendería." },
        { txt: "Retarle. Que se sepa quién manda, de una vez.", req: { Ferocidad: 3 }, forzable: true, tirada: { stat: "ST", obj: 7, riesgo: false,
          ok: { txt: "Le retas y gana quien tenía que ganar. Snotlig acaba en el suelo, riéndose mal. 'Ya', dice. Se queda en la banda. A tu izquierda. Es distinto que a la derecha.", fx: { Ferocidad: 1, rel: { snotlig: 1, banda: 2 }, flag: "retasteASnotlig" } },
          ko: { txt: "Le retas y Snotlig, que lleva treinta años robando cascos, te tira un casco a la cara y te tumba con el pie. Un goblin tumbando a un orco. Los otros tres lo ven. 'Ya', dice, y se va a dormir a tu derecha.", fx: { Voluntad: 1, rel: { snotlig: 2, banda: 1 } } } } },
        { txt: "Darle la mitad. De todo. Para siempre.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, oro: -20, rel: { snotlig: 4, gorka: 1 }, flag: "mitadASnotlig" }, msg: "'La mitad', dices. Snotlig lo piensa y escupe. Trato. Un orco y un goblin a medias. Ma Gorka, cuando se entera, sube las apuestas: nunca ha visto una banda con dos cabezas que dure. Dura." },
      ] },
    copaCharca: { titulo: "La Copa de la Charca", partido: { rival: "Los Comebichos de la Charca Vieja", fuerza: 2, torneo: "Copa de la Charca" },
      condicion: (pj) => pj.palmares.some((p) => p.cap >= 2 && p.res === "Victoria"),
      texto: (pj) => `La Copa de la Charca es lo único que puede ganar un equipo de Quinta, y la final es contra los Comebichos, orcos de charca con un orco negro de capitán. ${pj.flags.cascoDeGrot ? "El casco de Grot está en el poste. Todos lo han tocado." : ""} ${pj.flags.trollSentoMinotauro || pj.flags.trollAprendioMirando ? "Grimgutz sabe lo que hace. Más o menos." : ""} Turno dieciséis. {marcador}. Tienes la bola y al orco negro delante, que pesa lo que pesan dos de ti.`,
      opciones: [
        { txt: "Pasar la bola a Snotlig y que corra como corren los goblins.", tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Pasas. Snotlig corre sin sentido y rápido, y el orco negro, que es grande y lento, no sabe qué es lo que se le escapa. Anota. La Copa. Es el primer trofeo de la banda y lo levanta un goblin de treinta años con doce cascos al cinturón. Se le cae. Lo levanta otra vez.", fx: { fama: 10, Honor: 1, gol: 1, rel: { snotlig: 4, banda: 3, aficion: 3 }, flag: "snotligLevantoLaCopa" } },
          ko: { txt: "Pasas. Snotlig la coge y un Comebichos, que es rápido para ser orco, le alcanza. Anotan. La Copa se va a la Charca Vieja. Snotlig se disculpa. No hace falta. Sí hace falta.", fx: { golRival: 1, rel: { snotlig: 1 } } } } },
        { txt: "Ir de frente contra el orco negro. Que vea Gorgomor lo que muerde el pequeño.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Vas de frente. El orco negro se ríe hasta que le das en la pata de atrás, como a los jabalíes. Cae. Cruzas por encima. La Copa. Los que apuestan pagan a Ma Gorka, y Ma Gorka, por primera vez, te da una parte sin que se la pidas.", fx: { fama: 12, Ferocidad: 2, gol: 1, rel: { banda: 3, aficion: 4, gorka: 2 }, flag: "tumbasteAlNegro" } },
          ko: { txt: "Vas de frente contra un orco negro. Un orco negro. Te despiertas con la Copa en otro sitio y Grimgutz mirándote. Ha comido. No preguntas qué.", fx: { golRival: 1, rel: { grimgutz: 1 } } } } },
        { txt: "Que Grimgutz se siente encima del orco negro.", req: { flag: "grimgutzSeSienta" }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Grimgutz ve al orco negro, entiende que tiene bola, y se sienta. Es la única jugada que sabe y basta. Coges la bola de debajo del troll y cruzas. La Copa. Los Comebichos exigen que se prohíba sentarse. La federación no encuentra la regla.", fx: { fama: 10, Astucia: 1, gol: 1, rel: { grimgutz: 4, banda: 2, aficion: 3 }, flag: "grimgutzCopa" } },
          ko: { txt: "Grimgutz ve al orco negro y decide, por primera vez en su vida, no sentarse. Mira una mosca. Anotan. La Copa se va. El troll no entiende por qué le gritas.", fx: { golRival: 1, rel: { grimgutz: -1 } } } } },
      ] },

    /* ---------- 5. EL ORO ---------- */
    laDeuda: { titulo: "El doscientos por ciento",
      texto: (pj) => `Cuarta División. Ma Gorka baja de su cueva, que no hace nunca, y se sienta en tu campo con la pared entera en una tabla. ${pj.flags.deudaGorka ? "Tu nombre lleva tres temporadas creciendo al doscientos." : pj.flags.sinDeuda ? "No le debes nada. Ha venido a cambiar eso: quiere una parte de la banda." : "Ha venido a cobrar lo que apostó por ti, que es más de lo que te prestó."} 'Cuarta cuesta', dice. 'Cascos de verdad, un apotecario, un chamán que no falle. Yo lo pongo. Tú me das la mitad de Da Banda'.`,
      opciones: [
        { txt: "Pagar lo que se debe y nada más. Con victorias.", req: { Voluntad: 3 }, forzable: true, fx: { Voluntad: 2, Honor: 2, oro: -40, rel: { gorka: 1, banda: 2 }, flag: "pagasteAGorka" }, msg: "Pagas. Hasta la última corona, con lo que gana la banda los domingos. Ma Gorka te tacha de la pared con la uña. Es la primera vez que tacha a alguien. La cueva entera lo ve." },
        { txt: "Darle la mitad. Una ogra en la banda es una ogra en el campo.", fx: { Astucia: 1, Honor: -1, oro: 80, rel: { gorka: 4, banda: -1, snotlig: -2 }, flag: "gorkaEnLaBanda" }, msg: "Le das la mitad. Ma Gorka ficha cascos, apotecario y un chamán que no falla, y los domingos se sienta en la banda con tres metros de silencio. Ganáis más. Snotlig dice que ya no es la banda. Tiene razón a medias." },
        { txt: "Robarle a Rey Krug para pagarle a Ma Gorka. Es lo que haría Snotlig.", req: { rel: ["snotlig", 3] }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "Snotlig y tú entráis en Gorgomor de noche, robáis los cascos de los Rompecráneos, los del Cáliz, y se los vendéis a Ma Gorka por lo que debéis. Ma Gorka paga y no pregunta. Rey Krug, al día siguiente, pregunta. Mucho.", fx: { Astucia: 2, Honor: -2, oro: 60, rel: { snotlig: 3, gorka: 2 }, flag: "robasteAKrug" } },
          ko: { txt: "Snotlig y tú entráis en Gorgomor de noche. Salís sin cascos y sin dos goblins, que se quedan en el elefante muerto. Rey Krug se los come. Ma Gorka cobra igual: al doscientos.", fx: { rel: { snotlig: 1, banda: -2 }, oro: -40, flag: "goblinsEnElElefante" } } } },
      ] },
    cuatroDedos: { titulo: "Los Cuatro Dedos", partido: { rival: "Los Cuatro Dedos", fuerza: 3 },
      texto: (pj) => `Los Cuatro Dedos son orcos de Cuarta con un blitzer, Uzgob, que tiene un cráneo de enano en cada hombro y viene de una charca donde comía primero. ${pj.flags.skabnikEchado || pj.flags.skabnikEchadoPorGrot ? "Skabnik gira en su banda. Hacia ti." : ""} ${pj.flags.gorkaEnLaBanda ? "Ma Gorka está en tu banquillo. Tres metros. No dice nada." : ""} Turno diez. {marcador}. Uzgob viene con la bola por el centro, sin mirar a los goblins, porque los orcos de charca no miran a los goblins.`,
      opciones: [
        { txt: "Que los goblins hagan lo que hacen los goblins mientras tú vas a Uzgob.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Tres goblins le muerden los tobillos y Uzgob, por primera vez en su vida, mira abajo. Entras. Cae con los cráneos rodando. Le quitas la bola. Anotas. Dos a dos, y luego tres. Uzgob, al acabar, te mira como se mira una cría que creció: con hambre.", fx: { fama: 12, Ferocidad: 1, gol: 1, rel: { banda: 3, aficion: 3 }, flag: "tumbasteAUzgob" } },
          ko: { txt: "Los goblins muerden. Uzgob no mira abajo: los aparta a patadas y te entra él. Te pasa por encima. Anota. Uno a tres. Un orco de charca contra un orco de goblins, y ha ganado la charca.", fx: { golRival: 1, rel: { banda: 1 } } } } },
        { txt: "Sentar a Grimgutz encima de Uzgob.", req: { flag: "grimgutzSeSienta" }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "Grimgutz ve la bola en manos de Uzgob y se sienta. Uzgob, debajo, ruge. Grimgutz no se entera. Coges la bola. Anotas. Dos a dos, y luego más. Uzgob sale de debajo del troll con un cráneo menos y una historia que no contará.", fx: { fama: 10, gol: 1, rel: { grimgutz: 3, banda: 2, aficion: 3 } } },
          ko: { txt: "Grimgutz va a sentarse y Skabnik, desde la banda rival, le alcanza girando. Un troll tumbado por un goblin con cadena. Uzgob anota. Uno a tres.", fx: { golRival: 1, rel: { skabnik: -2 } } } } },
      ] },
    vender: { titulo: "Vender al troll",
      texto: (pj) => `Los Diente-rotos, de Cuarta, ofrecen por Grimgutz lo que vale un campo entero. ${pj.flags.pagasteAGorka ? "No debes nada. El oro sería para cascos y apotecario." : pj.flags.gorkaEnLaBanda ? "Ma Gorka dice que la mitad es suya y que se vende." : "Es lo que le debes a Ma Gorka, exacto."} Grimgutz está en el río, mirando una mosca, sin saber que vale algo. Snotlig dice que un troll se vende. ${pj.flags.wazzokEnLaBanda ? "Wazzok dice que Gorg no quiere." : ""} Los goblins no dicen nada: se acuerdan del que se comió.`,
      opciones: [
        { txt: "No venderlo. Grimgutz es de la banda.", fx: { Honor: 3, rel: { grimgutz: 5, banda: 2, gorka: -2, snotlig: -1 }, flag: "grimgutzSeQueda" }, msg: "No lo vendes. Grimgutz no se entera de nada. Esa noche se sienta a tu lado en el río, como en el puente, y os quedáis mirando el agua. Vale un campo entero y mira moscas. Es tuyo." },
        { txt: "Venderlo. Con el oro, cascos, apotecario y un año sin deber nada.", fx: { Astucia: 1, Honor: -2, oro: 100, rel: { grimgutz: -5, banda: -2, gorka: 2, snotlig: 2 }, flag: "grimgutzVendido" }, msg: "Lo vendes. Se lo llevan con cuerdas y con una vaca de cebo. Se gira una vez, en el camino, y te mira sin entender. Los Diente-rotos ganan cuatro partidos seguidos. Da Banda, ninguno. El oro compra cascos. No compra lo otro." },
        { txt: "Alquilarlo. Un partido. Que vuelva.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, oro: 40, rel: { grimgutz: 1, gorka: 1 }, flag: "grimgutzAlquilado" }, msg: "Lo alquilas para un partido. Los Diente-rotos lo devuelven al día siguiente: se ha comido a su entrenador. Grimgutz vuelve al río contento. Cobras. Snotlig dice que es lo más listo que has hecho." },
      ] },
    ascensoOrco: { titulo: "El partido del ascenso", partido: { rival: "Los Diente-rotos", fuerza: 3 },
      texto: (pj) => `Último partido de Cuarta. Ganar es Tercera, y Tercera es donde empiezan los equipos con nombre de verdad. Contra los Diente-rotos, ${pj.flags.grimgutzVendido ? "que tienen a Grimgutz. Tu troll. Mira una mosca en su banda." : "que no tienen troll. Tú sí."} ${pj.flags.reconocisteASnotlig ? "Snotlig está a tu derecha." : ""} Turno dieciséis. {marcador}. Tienes la bola y delante ${pj.flags.grimgutzVendido ? "a Grimgutz, que te reconoce, o no" : "a su capitán, que no ha visto goblins en su vida"}.`,
      opciones: [
        { txt: "Ir de frente. Contra quien sea.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: pj => pj.flags.grimgutzVendido ? "Vas de frente contra tu propio troll. Grimgutz te mira, te huele, y se sienta. No encima de ti: al lado. Pasas. Anotas. Tercera. Los Diente-rotos no entienden qué le pasa a su troll. Tú sí: huele a goblin." : "Vas de frente contra su capitán y le das en la pata de atrás. Cae. Cruzas. Tercera. Los que apuestan cobran y Ma Gorka, por una vez, no.", fx: { fama: 12, Ferocidad: 2, gol: 1, rel: { banda: 3, aficion: 3, grimgutz: 2 }, flag: "ascendisteis" } },
          ko: { txt: "Vas de frente y no pasa. Anotan. Cuarta otra vez. Snotlig recoge la bola del suelo y dice 'el domingo que viene', que se lo oyó a un humano.", fx: { golRival: 1, rel: { snotlig: 1 } } } } },
        { txt: "Pasar a Snotlig. Siempre Snotlig.", req: { rel: ["snotlig", 3] }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Pasas a Snotlig, que tiene treinta y cinco años y doce cascos y corre como el primer día. Nadie le alcanza. Anota. Tercera. Levanta la bola con las dos manos y se le cae, y la levanta otra vez.", fx: { fama: 10, Honor: 1, gol: 1, rel: { snotlig: 5, banda: 3, aficion: 2 }, flag: "ascendisteis", flags: ["snotligAscenso"] } },
          ko: { txt: "Pasas a Snotlig. Un Diente-roto le pisa antes de que la coja. No se levanta rápido. Se levanta. Anotan ellos. Cuarta otra vez. Snotlig, cojeando: 'El domingo que viene'.", fx: { golRival: 1, rel: { snotlig: 2 } } } } },
      ] },

    wazzokAcierta: { titulo: "El domingo que acierta",
      condicion: (pj) => !!pj.flags.wazzokEnLaBanda,
      texto: (pj) => `Wazzok lleva ${pj.flags.wazzokAcerto ? "años prediciendo tu muerte cada domingo y acertando una vez, con el minotauro" : "años prediciendo tu muerte cada domingo y fallando cada domingo"}. Este domingo, antes del partido, no predice la tuya. Se sienta en la banda con las setas caídas y dice: 'Hoy muero yo'. Los goblins se ríen. Tú no. Wazzok nunca ha predicho nada de sí mismo. ${pj.flags.wazzokApuesta ? "Ma Gorka, en la grada, cierra la apuesta de que llegas a Gorgomor. La da por ganada." : ""}`,
      opciones: [
        { txt: "Sentarle en el banquillo. Que no juegue. Que no muera.", fx: { Honor: 2, rel: { wazzok: 3, banda: 1 }, flag: "wazzokEnElBanquillo" }, msg: "Le sientas. Wazzok protesta con el bastón. Juega la banda sin chamán y gana. Al acabar, Wazzok sigue en el banquillo, vivo, con cara de haber fallado otra vez. Es la primera vez que le alegra fallar. Predice tu muerte para el domingo siguiente, con voz nueva." },
        { txt: "Dejarle jugar. Un chamán decide sus domingos.", fx: { Voluntad: 1, rel: { wazzok: 2, banda: 2 }, flags: ["wazzokMurio"], flag: "wazzokJugo" }, msg: "Juega. En el turno nueve señala a un rival con el bastón, Grimgutz va, y en el hueco que deja el troll un blitzer pisa a Wazzok. No se levanta. Acertó. Los goblins entierran las setas con él. Grimgutz no vuelve a ir a donde nadie señala: se sienta encima de quien tiene la bola, que es lo que sabía antes." },
        { txt: "Preguntarle qué ve. Antes.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, rel: { wazzok: 3 }, flag: "loQueVioWazzok" }, msg: "'Un elefante muerto', dice, 'y tú encima. Y yo no'. Le sientas en el banquillo. Vive. Cuando llegues a Gorgomor y veas el elefante, sabrás que acertó dos veces. Es más que cualquier chamán." },
      ] },

    /* ---------- 6. EL REY ---------- */
    invitacion: { titulo: "Gorgomor invita",
      texto: (pj) => `Llega un mensajero de Rey Krug con un hueso: Gorgomor invita a Da Banda a jugar contra los Rompecráneos, en Primera, un amistoso 'por el Cáliz'. ${pj.flags.robasteAKrug ? "Krug sabe quién le robó los cascos. Lo dice en el hueso, rascado." : ""} ${pj.flags.tumbasteAUzgob ? "Uzgob, que dirige los Cuatro Dedos, ha dicho en la Cristalvisión que él te vio crecer y que Krug se arrepentirá. Suena casi a orgullo." : ""} Un equipo de ${pj.flags.ascendisteis ? "Tercera" : "Cuarta"} en Gorgomor. Es una trampa: todo el mundo lo sabe. Snotlig dice que no vayáis. Ma Gorka ha apostado a que vais. ${pj.flags.wazzokMurio ? "Wazzok no está para predecirlo. Acertó una vez, y fue la suya." : pj.flags.wazzokEnLaBanda ? "Wazzok dice que morirás el domingo. Lleva años diciéndolo." : ""}`,
      opciones: [
        { txt: "Ir. Con la banda entera. Que Gorgomor vea el cesto.", fx: { Ferocidad: 2, Ambición: 2, rel: { banda: 3, aficion: 3, snotlig: -1 }, flag: "fuisteAGorgomor" }, msg: "Vais. Seis goblins, un troll, un chamán que falla, un fanático si queda, y tú. Gorgomor entera sale a mirar. No se agacha. Todavía." },
        { txt: "Ir solo. Que la banda se quede a salvo.", req: { Honor: 3 }, forzable: true, fx: { Honor: 3, Voluntad: 1, rel: { banda: 2, snotlig: 3 }, flag: "fuisteSolo" }, msg: "Vas solo. Snotlig te sigue igual, a dos pasos, porque un goblin no obedece: acompaña. Gorgomor ve llegar a un orco y un goblin. Se ríe. Es la última vez." },
        { txt: "No ir. Mandar el hueso de vuelta con algo rascado.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, fama: 8, rel: { aficion: 2, snotlig: 2 }, flag: "noFuiste" }, msg: "Rascas en el hueso: 'Ven tú'. Krug lo lee. Gorgomor lo lee. Al mes, los Rompecráneos bajan a tu campo de nabos, con el Cáliz, porque un Jefe Supremo no puede no ir. Trampa al revés." },
      ] },
    laTrampa: { titulo: "El elefante muerto",
      texto: (pj) => `${pj.flags.noFuiste ? "Los Rompecráneos llegan a tu campo con el elefante muerto de Krug a cuestas. Lo plantan en la zona de anotación, al lado de la vaca." : "Gorgomor. El elefante muerto en medio de la plaza. Rey Krug encima, comiendo."} Krug baja del elefante, cuatro metros, y te mira como se mira a una cría que no debió salir del río. 'El pequeño', dice. Sabe quién eres. Lo sabía cuando te tiraron. 'Tu banda o tu cabeza. Elige antes del partido'.`,
      opciones: [
        { txt: "Rugirle. Con el rugido que aprendiste en su orilla.", req: { flag: "rugiste" }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "Ruges. Es el rugido de tu orilla, no el suyo. Gorgomor entera, que estaba mirando, se agacha un poco. Un poco es mucho. Krug deja de comer. 'Después del partido', dice, y sube al elefante. Ha oído algo.", fx: { Ferocidad: 2, fama: 12, rel: { banda: 3, aficion: 4 }, flag: "gorgomorSeAgacho" } },
          ko: { txt: "Ruges. Sale bien. Krug ruge encima y Gorgomor entera se agacha, incluidos tus goblins. Snotlig no. 'Después del partido', dice Krug. Sube al elefante. No ha oído nada.", fx: { Voluntad: 1, rel: { snotlig: 2 } } } } },
        { txt: "Ofrecerle la banda. Y cobrársela en el campo.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, Honor: -1, rel: { banda: -1, snotlig: 1 }, flag: "ofrecisteLaBanda" }, msg: "'La banda', dices. Krug se ríe con la boca llena y baja la guardia, que es lo que hace un Jefe Supremo cuando cree que ya tiene algo. Snotlig entiende. Los goblins entienden. Grimgutz mira una mosca. Después del partido, veremos qué banda." },
        { txt: "Decirle que la cabeza. Delante de Gorgomor. Y que se la cobre si puede.", req: { Ferocidad: 4 }, forzable: true, fx: { Ferocidad: 2, fama: 10, rel: { banda: 3, aficion: 3 }, flag: "ofrecisteLaCabeza" }, msg: "'La cabeza', dices. Gorgomor se calla. Krug baja del elefante y te huele. 'Después', dice. Ma Gorka, desde la grada, sube la apuesta. Nunca pierde." },
      ] },
    nocheEnGorgomor: { titulo: "La noche antes",
      texto: (pj) => `${pj.flags.noFuiste ? "La noche antes de la final, en tu campo, con el elefante muerto de Krug plantado junto a la vaca." : "La noche antes de la final, en Gorgomor, bajo el elefante muerto, que es donde os han dejado dormir por gracia."} Snotlig no duerme: cuenta los cascos del cinturón, doce, y luego los goblins, ${pj.flags.goblinsEnElElefante ? "y le faltan dos" : "y están todos"}. Ma Gorka ha apostado la cueva entera. ${pj.flags.wazzokMurio ? "Las setas de Wazzok están en una bolsa que lleva Snotlig." : pj.flags.wazzokEnLaBanda ? "Wazzok, por primera vez, no predice nada. Mira el elefante." : ""} ${pj.flags.grimgutzVendido ? "Donde dormía el troll no hay nada: un hueco frío del tamaño de un troll." : "Grimgutz mira una mosca del tamaño de un puño."}`,
      opciones: [
        { txt: "Contar los goblins con Snotlig. Con nombre. Los que están y los que no.", fx: { Honor: 2, rel: { snotlig: 3, banda: 3 }, flag: "contasteConSnotlig" }, msg: "Contáis. Grot. Los dos del elefante, si faltan. Los que quedan. Snotlig dice cada nombre como se dice un casco robado: con orgullo. Al acabar dice el tuyo. 'El pequeño'. Es el último de la lista y el primero de la banda." },
        { txt: "Ir a la orilla de la charca de Gorgomor y rugir. Que no duerma nadie.", req: { flag: "rugiste" }, forzable: true, fx: { Ferocidad: 2, rel: { aficion: 3 }, flag: "rugisteLaNoche" }, msg: "Ruges en la orilla donde te tiraron, a medianoche, y Gorgomor entera se despierta. Krug, desde el elefante, no responde. Es la primera vez que un Jefe Supremo no responde a un rugido. Mañana lo cobrarás, o lo pagarás." },
        { txt: "Dormir en el hueco del troll. Como aquella helada.", req: { flag: "snotligDurmioConElTroll", noflag: "grimgutzVendido" }, forzable: true, fx: { Voluntad: 2, rel: { grimgutz: 3, snotlig: 2 }, flag: "huecoEnGorgomor" }, msg: "Te metes en el hueco entre el brazo y la barriga de Grimgutz. Snotlig se mete al lado. Los goblins alrededor. Es la banda apretada bajo el elefante de un rey, y es lo más caliente que ha dormido nadie en Gorgomor." },
      ] },
    cristalvision: { titulo: "Diez segundos",
      texto: (pj) => `Un reportero de la Cristalvisión, con un cristal mágico flotando, te aborda en el túnel. 'Diez segundos. Di algo que se recuerde'. ${pj.flags.gorgomorSeAgacho ? "Todos quieren saber cómo un orco de goblins hizo agachar a Gorgomor." : "Todos quieren saber si un orco de goblins puede contar hasta diez."} Snotlig está detrás de ti, con los doce cascos.`,
      opciones: [
        { txt: "Contar los goblins. En voz alta. Con nombre.", fx: { fama: 12, Honor: 2, rel: { banda: 4, snotlig: 3, aficion: 2 } }, msg: "Cuentas: Snotlig, Grot que ya no está, Skab, Nik, Zog... Nueve segundos. El Mundo Viejo entero oye los nombres de unos goblins de debajo de un puente. Ma Gorka los escribe en la pizarra." },
        { txt: "Rugir al cristal hasta que se rompa.", fx: { fama: 8, Ferocidad: 1, rel: { aficion: 3, club: -1 } }, msg: "Ruges. El cristal se hace añicos. La Cristalvisión te cobra el cristal y te llama 'el Pequeño'. Gorgomor lo repite. Es un nombre." },
        { txt: "Que hable Snotlig.", req: { rel: ["snotlig", 3] }, forzable: true, fx: { fama: 10, Astucia: 1, rel: { snotlig: 4, banda: 2 }, flag: "snotligHablo" }, msg: "Snotlig habla diez segundos. Nadie entiende nada: los goblins hablan como roban, rápido y sin mirar. Al final dice: 'Le saqué del río'. Eso sí se entiende. Se repite en todas las charcas." },
      ] },
    finalOrco: { titulo: "El Cáliz de Barro", partido: { rival: "Los Rompecráneos de Gorgomor", fuerza: 4 },
      texto: (pj) => `${pj.flags.noFuiste ? "El Cáliz de Barro, en tu campo de nabos, con Gorgomor entera de pie entre los nabos y una vaca que no se mueve." : "El Cáliz de Barro, en la plaza de Gorgomor, con el elefante muerto de portería y cien mil orcos que no se sientan."} Los Rompecráneos son el mejor equipo del mundo. Vosotros sois un cesto. ${pj.flags.grimgutzSeQueda ? "Grimgutz está en el campo, mirando una mosca del tamaño de un puño." : pj.flags.grimgutzVendido ? "Grimgutz juega con ellos. Te huele desde lejos." : ""} ${pj.flags.reconocisteASnotlig ? "Snotlig está a tu derecha." : ""} Turno dieciséis. {marcador}. Tienes la bola, y delante a Rey Krug en persona, que ha bajado a jugar el último turno porque un Jefe Supremo no pierde desde la banda.`,
      opciones: [
        { txt: "Ir de frente contra Krug. Cuatro metros. Como a los jabalíes: en la pata de atrás.", tirada: { stat: "ST", obj: 11, riesgo: true,
          ok: { txt: "Vas de frente contra cuatro metros de Jefe Supremo. Le das en la pata de atrás, donde te enseñó un goblin a los cinco años. Cae. Un Jefe Supremo en el barro. Cien mil orcos se callan, y luego se agachan, uno a uno, hacia el pequeño que cruza la línea con la bola. El Cáliz. Krug, desde el suelo, te enseña la garganta. Gorgomor es tuya.", fx: { fama: 45, Ferocidad: 3, gol: 1, rel: { banda: 5, aficion: 5, snotlig: 3 }, flag: "campeon", flags: ["jefeSupremo"] } },
          ko: { txt: "Vas de frente contra cuatro metros. Cuatro metros. Krug te coge con una mano y te lleva hasta su línea como se lleva un cesto. Anota contigo debajo del brazo. Cien mil orcos rugen. Snotlig es el único que no.", fx: { golRival: 1, rel: { snotlig: 2 } } } } },
        { txt: "Pasar a Snotlig. Que corra por Gorgomor como corrió por el río.", req: { rel: ["snotlig", 3] }, forzable: true, tirada: { stat: "AG", obj: 10, riesgo: false,
          ok: { txt: "Pasas. Snotlig, cuarenta años, doce cascos, corre por la plaza de Gorgomor entre cien mil orcos que no saben qué es lo que se les escapa. Anota entre las patas del elefante muerto. El Cáliz. Un goblin ha ganado el Cáliz de Barro. La Cristalvisión no tiene titular. Ma Gorka sí: lo escribe con carbón, grande.", fx: { fama: 40, Honor: 2, gol: 1, rel: { snotlig: 5, banda: 5, aficion: 4 }, flag: "campeon", flags: ["snotligCaliz"] } },
          ko: { txt: "Pasas. Krug, que es Jefe Supremo por algo, intercepta la bola con una mano y se come a Snotlig con la otra, casi. Snotlig escapa sin dos cascos. Anotan. El Cáliz se queda en el elefante. Snotlig, cojeando: 'El domingo que viene'.", fx: { golRival: 1, rel: { snotlig: 3 } } } } },
        { txt: "Soltar a Skabnik. Que gire hacia Krug. Que gire hacia donde sea.", req: { flag: "skabnikEnLaBanda" }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "Le das a Skabnik un empujón y 'gira hacia allí'. Gira. Cruza la plaza de Gorgomor como una tormenta con cadena, tumba a tres Rompecráneos, y llega a Krug girando, y Krug, cuatro metros, recibe una bola de hierro en la rodilla, que es donde llega un goblin. Cae. Cruzas mientras Skabnik sigue girando hacia el elefante. El Cáliz. Skabnik no para hasta el día siguiente.", fx: { fama: 40, Astucia: 1, Ferocidad: 1, gol: 1, rel: { skabnik: 5, banda: 4, aficion: 5 }, flag: "campeon", flags: ["skabnikCaliz"] } },
          ko: { txt: "Le das a Skabnik un empujón. Gira hacia ti. Tumba a dos goblins, a Grimgutz, y a ti. Krug anota andando entre los cuerpos. Skabnik sigue girando. Nadie se atreve a pararle. El Cáliz se queda en el elefante.", fx: { golRival: 1, rel: { skabnik: -1, banda: -1 } } } } },
        { txt: "Que Grimgutz se siente encima de Rey Krug.", req: { flag: "grimgutzSeQueda" }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: false,
          ok: { txt: "Grimgutz ve la bola cerca de Krug y hace lo único que sabe: se sienta. Encima del Jefe Supremo de Gorgomor. Krug, debajo, no puede rugir. Coges la bola. Cruzas. El Cáliz. Cien mil orcos miran a un troll de río sentado sobre su rey, mirando una mosca. Gorgomor se agacha porque no sabe qué otra cosa hacer.", fx: { fama: 40, Astucia: 1, gol: 1, rel: { grimgutz: 5, banda: 5, aficion: 4 }, flag: "campeon", flags: ["grimgutzCaliz"] } },
          ko: { txt: "Grimgutz ve a Krug y, por primera vez, tiene miedo. Los trolls tienen miedo de una cosa: algo más grande. Se sienta lejos. Krug anota. El Cáliz se queda. Grimgutz no te mira en el camino de vuelta. No sabe por qué.", fx: { golRival: 1, rel: { grimgutz: 1 } } } } },
      ] },

    /* ---------- 7. LA CHARCA ---------- */
    grimgutzViejo: { titulo: "Los trolls no envejecen",
      texto: (pj) => `Pasan las temporadas. ${pj.flags.jefeSupremo ? "Eres Jefe Supremo de Gorgomor y juegas igual, porque un jefe que no juega es un elefante muerto." : "Da Banda juega en Primera y Gorgomor se agacha a medias, que es lo más que se agacha Gorgomor."} Los trolls no envejecen. Grimgutz sigue bajo el mismo puente, mirando la misma mosca. ${pj.flags.grimgutzVendido ? "Le compraste de vuelta a los Diente-rotos por una vaca. Volvió andando solo." : ""} Un día no se levanta para ir al partido. No está enfermo: está triste. Es la primera vez que un troll está triste, y no sabe qué hacer con eso.`,
      opciones: [
        { txt: "Sentarte con él bajo el puente hasta que se le pase. Días.", fx: { Honor: 3, Voluntad: 1, rel: { grimgutz: 5 }, flag: "puenteConGrimgutz" }, msg: "Tres días bajo el puente. No hablas: los trolls no hablan. Miras la mosca con él. Al tercer día se levanta, te coge con una mano y te lleva al campo. Se sienta encima del primero que tiene la bola. Se le ha pasado." },
        { txt: "Llevarle un árbitro. Lo de siempre.", req: { flag: "arbitroParaGrimgutz" }, forzable: true, fx: { Honor: -1, rel: { grimgutz: 3, aficion: 1 }, flag: "ultimoArbitro" }, msg: "Le llevas un árbitro. Se lo come despacio, sin ganas, por educación. Luego se levanta. La federación pone un aviso: 'Se buscan árbitros. Otra vez'." },
        { txt: "Dejarle bajo el puente. Un troll triste no juega.", fx: { Astucia: 1, rel: { grimgutz: -2, banda: 1 }, flag: "grimgutzBajoElPuente" }, msg: "Le dejas. Juega la banda sin troll y pierde, y gana, y aprende a jugar sin la montaña. Grimgutz se queda bajo el puente mirando la mosca hasta que se le olvida qué miraba. Los trolls olvidan. Es lo que tienen." },
      ] },
    snotligViejo: { titulo: "Cincuenta años de goblin",
      texto: (pj) => `Snotlig tiene cincuenta años, que en un goblin es ser un milagro, y doce cascos que ya no puede llevar al cinturón. ${pj.flags.snotligCaliz ? "Ganó el Cáliz de Barro con las manos. Se le cayó dos veces." : pj.flags.reconocisteASnotlig ? "Sigue a tu derecha. Duerme mucho." : "Sigue en la banda. A tu izquierda, o donde caiga."} Una noche te lleva al río, al sitio de la raíz donde se enganchó tu cesto. Sigue la raíz. 'Aquí', dice. 'Era más pequeño que el casco'.`,
      opciones: [
        { txt: "Darle el cinturón de jefe. Que la banda sea suya lo que le quede.", req: { rel: ["snotlig", 4] }, forzable: true, fx: { Honor: 3, rel: { snotlig: 5, banda: 3 }, flag: "cinturonASnotlig" }, msg: "Le das el cinturón. Snotlig manda la banda dos temporadas desde la banda, sentado, con los doce cascos en el regazo. Los goblins jóvenes le obedecen sin saber por qué. Tú sí: la banda la hizo él." },
        { txt: "Colgar sus doce cascos en el puente. Uno por uno. Con él.", fx: { Honor: 2, Voluntad: 1, rel: { snotlig: 4, banda: 2 }, flag: "cascosEnElPuente" }, msg: "Colgáis los doce cascos del puente, uno por cada equipo que desvalijó. Al acabar, Snotlig se sienta debajo y mira el río. 'Ahora sí', dice. No sabes a qué." },
        { txt: "Rugir en la orilla. Como aquella noche. Que la charca se agache.", req: { flag: "rugiste" }, forzable: true, fx: { Ferocidad: 1, rel: { snotlig: 3, aficion: 2 }, flag: "rugidoEnLaOrilla" }, msg: "Ruges en la orilla de la charca que te tiró al río. La charca entera se agacha. Snotlig no: se tapa los oídos y sonríe, como a los cinco años. 'Creció', dice. Es su última predicción, y la única que acertó del todo." },
      ] },
    ultimoPartido: { titulo: "El último partido", partido: { rival: "Los Cuatro Dedos", fuerza: 3 },
      texto: (pj) => `Nadie ha dicho que sea el último, pero lo saben los goblins. Contra los Cuatro Dedos, que dirige Uzgob desde la banda con los cráneos en los hombros, ${pj.flags.tumbasteAUzgob ? "y uno menos" : ""}. ${pj.flags.cinturonASnotlig ? "Snotlig manda desde la banda, sentado, con los cascos en el regazo." : "Snotlig juega. Cincuenta años. Corre despacio y sin sentido."} Turno dieciséis. {marcador}. Tienes la bola y el cuerpo diciendo que ya, que en un orco es que te duele comer.`,
      opciones: [
        { txt: "Pasar a un goblin joven. Uno que no sacó a nadie del río.", fx: { Honor: 3, fama: 8, gol: 1, rel: { banda: 4, aficion: 3, snotlig: 2 }, flag: "paseFinal" }, msg: "Pasas a Zig, un goblin de doce años que no sabe quién fue Grot. Corre como corren los goblins. Anota. Es su primer touchdown y tu último pase. Snotlig, en la banda, se le cae un casco del regazo. Lo deja en el suelo." },
        { txt: "Ir de frente. Una última vez. Contra quien sea.", tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Vas de frente contra el blitzer de los Cuatro Dedos, que es más joven, y le das en la pata de atrás. Cae. Cruzas. Te caes en la zona de anotación y muerdes el barro, que sabe a río, y ruges con la boca llena. Uzgob, en la banda, te enseña la garganta delante de su equipo. Cien goblins, que son tu grada, se agachan sin saber por qué.", fx: { fama: 15, Voluntad: 2, gol: 1, rel: { aficion: 5, banda: 3 }, flag: "ultimoTD" } },
          ko: { txt: "Vas de frente y el blitzer joven te para, porque es joven. Caes a dos pasos. Un Cuatro Dedos coge la bola, mira a Uzgob, y te la devuelve. Empate. Uzgob no dice por qué. No hace falta.", fx: { rel: { aficion: 3 }, flag: "balonDevuelto" } } } },
        { txt: "Sentarte en el barro con la bola. Que Grimgutz se siente al lado.", req: { flag: "puenteConGrimgutz" }, forzable: true, fx: { Honor: 2, Voluntad: 2, fama: 10, rel: { grimgutz: 4, banda: 3, aficion: 4 }, flag: "teSentasteConGrimgutz" }, msg: "Te sientas en el barro con la bola. Grimgutz viene y se sienta a tu lado, no encima, por primera vez. Los Cuatro Dedos no atacan: nadie ataca a un troll sentado. Silbato. Empate. Cien goblins se sientan también. Es la banda entera sentada en el barro, y nadie sabe qué es, y es lo mejor que ha hecho." },
      ] },
    elCesto: { titulo: "El cesto",
      texto: (pj) => `Vas al río, al sitio de la raíz. ${pj.flags.cascosEnElPuente ? "Los doce cascos de Snotlig cuelgan del puente." : ""} Hay un cesto enganchado. Dentro, una cría de orco, pequeña, de tres días, que te mira y te muerde el dedo. La charca sigue tirando a los pequeños. Nadie ha cambiado eso. Tú tampoco. ${pj.flags.jefeSupremo ? "Eres el Jefe Supremo y la charca sigue tirándolos. Podrías haberlo cambiado. No lo hiciste. Es lo que hacen las charcas, y lo que hacen los jefes." : ""}`,
      opciones: [
        { txt: "Sacarla del cesto. Como te sacaron.", fx: { Honor: 3, rel: { banda: 3, snotlig: 2 }, flag: "sacasteALaCria" }, msg: "La sacas. Muerde. Se la das a Snotlig, si queda, o a Zig, o al primer goblin que pasa. 'Muerde', dices. Es lo que dijeron de ti. Crecerá con lo que hay." },
        { txt: "Dejarla en el cesto y quedarte a ver si sobrevive.", req: { Voluntad: 4 }, forzable: true, fx: { Voluntad: 3, Astucia: 1, rel: { banda: 1 }, flag: "vigilasteElCesto" }, msg: "Te quedas en la orilla dos días. La cría muerde la raíz, muerde el cesto, muerde el agua. Al tercer día sale sola y te muerde a ti. Sobrevive. No la ayudas. La miras. Es lo que hizo Snotlig, en el fondo." },
        { txt: "Ir a la charca y decirles que no se tira a los pequeños. Con el rugido.", req: { flag: "jefeSupremo" }, forzable: true, fx: { Honor: 3, Ferocidad: 1, fama: 10, rel: { aficion: 3, banda: 3 }, flag: "cambiasteLaCharca" }, msg: "Vas a la charca y ruges que no se tira a los pequeños. La charca se agacha. Durante tres años no tiran a ninguno. Al cuarto, cuando no miras, vuelven. Las charcas son charcas. Pero hay tres camadas enteras que no saben lo que es un cesto, y eso es tuyo." },
      ] },
    retiro: { titulo: "Lo que dura una banda",
      texto: (pj) => `Un orco deja de crecer cuando deja de pelear. ${pj.flags.campeon ? "El Cáliz de Barro está bajo el puente, lleno de dientes, donde nadie lo busca." : "El Cáliz se quedó en el elefante, y da igual: Gorgomor se agacha igual, a medias."} ${pj.rel.snotlig >= 4 ? "Snotlig, si vive, duerme a tu derecha." : ""} ${pj.flags.grimgutzSeQueda || pj.flags.puenteConGrimgutz ? "Grimgutz mira la mosca." : ""} Queda decidir qué haces con lo que queda de ti, y con la banda.`,
      opciones: [
        { txt: "Ser Jefe Supremo hasta que te coman. Es lo que se hace.", req: { flag: "jefeSupremo" }, forzable: true, fx: { Ferocidad: 2, rel: { aficion: 3, banda: 2 }, flag: "finJefe" }, msg: "Mandas Gorgomor desde un elefante muerto, con un goblin a la derecha, hasta que uno más grande te tira. Te comen. Es lo que se hace. Pero durante veinte años Gorgomor tuvo un jefe que contaba goblins, y eso no se lo comen." },
        { txt: "Volver al puente. Que la banda la mande Snotlig, o Zig, o quien sea. Tú, con Grimgutz.", fx: { Honor: 3, rel: { grimgutz: 5, snotlig: 3, banda: 2 }, flag: "finPuente" }, msg: "Vuelves al puente. Grimgutz te hace sitio. Miráis el río. La banda juega los domingos sin ti y ganas o pierdes desde debajo del puente, oyéndolo. Un día llega un árbitro por el camino y Grimgutz te mira. Le dices que no. Se lo come igual, por costumbre." },
        { txt: "Montar un circo de goblins. Que la Cristalvisión pague por verlos girar.", req: { Astucia: 4 }, forzable: true, fx: { Astucia: 2, oro: 200, rel: { aficion: 2, banda: -1, skabnik: 3 }, flag: "finCirco" }, msg: "Montas el circo. Skabnik, si vive, es la estrella: gira. Los goblins roban al público mientras mira. Ma Gorka lleva las cuentas. Es lo más rentable que ha hecho un orco, y lo menos orco." },
        { txt: "Un partido más. De frente. Contra quien sea.", req: { Ferocidad: 5 }, forzable: true, fx: { Ferocidad: 1, fama: 10, rel: { banda: 2, aficion: 3 }, flag: "finBarro" }, msg: "Juegas uno más. Y otro. Con el cuerpo diciendo que ya. Un domingo vas de frente contra alguien más joven y no te levantas, y cien goblins se agachan, y Grimgutz viene y se sienta al lado, y te comen, como se hace, pero despacio." },
      ] },
  },
  epilogo: (pj, rasgo) => {
    const fin = pj.flags.finJefe ? "Mandó Gorgomor veinte años con un goblin a la derecha. Se lo comió uno más grande. Nadie se comió lo otro." :
      pj.flags.finPuente ? "Murió bajo el puente, mirando una mosca con Grimgutz. El troll se lo comió despacio, por educación." :
      pj.flags.finCirco ? "Murió rico, en un circo de goblins, mientras Skabnik giraba. Ma Gorka cerró las cuentas." :
      pj.flags.finBarro ? "Murió de frente, contra alguien más joven, con cien goblins agachados. Se lo comieron, como se hace." : "Nadie sabe dónde acabó. Probablemente bajo un puente.";
    return `${pj.nombre} fue ${rasgo}, y fue el pequeño de la camada, y le tiraron al río. ${pj.flags.campeon ? "Ganó el Cáliz de Barro con seis goblins, un troll de río y un chamán que fallaba." : "No ganó el Cáliz, y Gorgomor se agachó igual, a medias."} ${pj.flags.jefeSupremo ? "Fue Jefe Supremo de Gorgomor." : ""} ${pj.rel.snotlig >= 4 ? "Snotlig, que le sacó del cesto, durmió a su derecha hasta el final, que en un goblin es un milagro." : pj.rel.snotlig <= 0 ? "Snotlig se fue con sus doce cascos y no volvió." : ""} ${pj.flags.grimgutzSeQueda || pj.flags.puenteConGrimgutz ? "Grimgutz sigue bajo el puente, mirando la misma mosca." : ""} ${pj.flags.sacasteALaCria || pj.flags.cambiasteLaCharca ? "Hay al menos una cría que no sabe lo que es un cesto." : ""} ${pj.muertes > 0 ? `Murió ${pj.muertes + 1} veces; solo la última contó.` : ""} ${fin}`;
  },
  recuerdos: {
    cascoComido: "Medio casco a los tres días.", obedecisteASnotlig: "Snotlig te enseñó a no comerte a los tuyos.", masGrandeQueSnotlig: "Le sacaste una cabeza. Empezó a dormir lejos.", tratoConSnotlig: "'Trato'. Y un escupitajo.",
    cascosGanados: "Los cascos de los Charcos, ganados, no robados.", cascosRobados: "Snotlig los robó igual.", rugiste: "Un ruido que era tuyo.", mirasteALaCharca: "Krug come primero y pega segundo.", snotligSeAgacho: "Se agachó. Un día se lo cobra.",
    retasteHalflings: "Quien pierde se va.", campoRobado: "Los halflings lloraron comiendo.", deudaGorka: "Tu nombre en una pared, con una uña.", campoGanado: "El árbol se echó atrás.", sinDeuda: "La única banda que no está en la pared.", gorkaApuesta: "'Por el pequeño'. Cien coronas.",
    wazzokEnLaBanda: "Mientras Wazzok falle, no mueres.", wazzokEchado: "Se fue cojeando y prediciendo.", wazzokApuesta: "'Que llegas a Gorgomor'. Al doscientos.",
    arbitroParaGrimgutz: "Le llevaste un árbitro. Se lo comió entero.", esperasteAGrimgutz: "Dos días en el puente. Se sentó a tu lado.", grimgutzSeSienta: "La única jugada de su vida.", wazzokYGrimgutz: "Un chamán con un troll a cuerda.", pegasteAGrimgutz: "Le pegaste a un troll. Se rió.",
    trollSentoMinotauro: "Se sentó encima del minotauro. Con bola.", trollAprendioMirando: "Aprendió mirando. Más que en cien años.", wazzokAcerto: "La primera vez que acertó.",
    skabnikEnLaBanda: "'Gira hacia allí'. Siete de cada diez.", cadenaCorta: "Skabnik lloró. Ninguno de los tuyos.", skabnikEchado: "Se fue girando. Le verás.",
    nombreCesto: "Los Cestos del Río.", nombreCascos: "Los Cascos Robados. Snotlig lloró.", nombreDaBanda: "Da Banda. Con carbón, grande.",
    velasteAGrot: "'Era el que te sacó del cesto'.", skabnikEchadoPorGrot: "Los goblins volvieron a dormir cerca.", cascoDeGrot: "En el poste. Todos lo tocan.",
    reconocisteASnotlig: "'La banda la hizo Snotlig'. A tu derecha, para siempre.", retasteASnotlig: "A tu izquierda. Es distinto.", mitadASnotlig: "Una banda con dos cabezas. Dura.",
    snotligLevantoLaCopa: "Se le cayó. La levantó otra vez.", tumbasteAlNegro: "En la pata de atrás.", grimgutzCopa: "La federación no encontró la regla.",
    pagasteAGorka: "Te tachó de la pared. La primera vez.", gorkaEnLaBanda: "Tres metros de silencio en el banquillo.", robasteAKrug: "Los cascos del Cáliz, vendidos a Ma Gorka.", goblinsEnElElefante: "Dos goblins se quedaron en el elefante.",
    tumbasteAUzgob: "Uzgob miró abajo por primera vez.", grimgutzSeQueda: "Vale un campo. Mira moscas. Es tuyo.", grimgutzVendido: "Se giró una vez en el camino.", grimgutzAlquilado: "Se comió a su entrenador. Volvió contento.",
    ascendisteis: "Tercera. Donde empiezan los nombres.", snotligAscenso: "Levantó la bola. Se le cayó.",
    fuisteAGorgomor: "Gorgomor no se agachó. Todavía.", fuisteSolo: "Snotlig te siguió a dos pasos.", noFuiste: "'Ven tú'. Vinieron.", gorgomorSeAgacho: "Un poco es mucho.", ofrecisteLaBanda: "Krug bajó la guardia.", ofrecisteLaCabeza: "Gorgomor se calló.",
    snotligHablo: "'Le saqué del río'.", campeon: "El Cáliz, bajo el puente, lleno de dientes.", jefeSupremo: "Krug te enseñó la garganta desde el suelo.", snotligCaliz: "Un goblin ganó el Cáliz de Barro.", skabnikCaliz: "Una bola de hierro en la rodilla de un rey.", grimgutzCaliz: "Un troll sentado sobre un rey, mirando una mosca.",
    puenteConGrimgutz: "Tres días mirando una mosca.", ultimoArbitro: "Se lo comió despacio, por educación.", grimgutzBajoElPuente: "Los trolls olvidan.",
    cinturonASnotlig: "Snotlig mandó dos temporadas sentado.", cascosEnElPuente: "Doce cascos colgados. 'Ahora sí'.", rugidoEnLaOrilla: "'Creció'. La única que acertó.",
    paseFinal: "Tu último pase fue el primero de Zig.", ultimoTD: "Mordiste el barro. Sabía a río.", balonDevuelto: "Un Cuatro Dedos te la devolvió. Uzgob no dijo por qué.", teSentasteConGrimgutz: "La banda entera sentada en el barro.",
    snotligDurmioConElTroll: "Un hueco caliente entre el brazo y la barriga.", dormisteConElTroll: "Una banda apretada.", wazzokEnElBanquillo: "La primera vez que le alegró fallar.", wazzokJugo: "Acertó. Enterraron las setas con él.", loQueVioWazzok: "'Un elefante muerto, y tú encima. Y yo no'.", contasteConSnotlig: "'El pequeño'. El último de la lista y el primero.", rugisteLaNoche: "Krug no respondió.", huecoEnGorgomor: "Lo más caliente que ha dormido nadie en Gorgomor.",
    sacasteALaCria: "'Muerde'.", vigilasteElCesto: "Salió sola. Te mordió a ti.", cambiasteLaCharca: "Tres camadas sin saber lo que es un cesto.",
  },
};

const ORCO_ALIADOS = (pj, cap) => [
  { nombre: "Snotlig", ST: 1, AG: 4, AV: 7, si: pj.rel.snotlig >= 0 && !(cap === 7 && pj.flags.cinturonASnotlig) },
  { nombre: "Los goblins", ST: 2, AG: 4, AV: 7, si: true },
  { nombre: "Grimgutz", ST: 6, AG: 1, AV: 10, si: cap >= 3 && cap !== 5 && !pj.flags.grimgutzVendido && !pj.flags.grimgutzBajoElPuente || (cap === 5 && !pj.flags.grimgutzVendido && cap >= 3) },
  { nombre: "Skabnik", ST: 4, AG: 1, AV: 7, si: cap >= 3 && (pj.flags.skabnikEnLaBanda || pj.flags.cadenaCorta) && !pj.flags.skabnikEchadoPorGrot },
  { nombre: "Ma Gorka", ST: 5, AG: 1, AV: 9, si: cap >= 5 && pj.flags.gorkaEnLaBanda },
  { nombre: "Wazzok", ST: 1, AG: 3, AV: 6, si: cap >= 3 && pj.flags.wazzokEnLaBanda && !pj.flags.wazzokMurio },
  { nombre: "Zig", ST: 2, AG: 4, AV: 7, si: cap === 7 },
];
const ORCO_TRANSICIONES = {
  2: (pj) => `Pasan cinco años bajo el puente, que en un orco es hacerse entero. Creces con lo que hay: sobras de goblin, cascos robados, un río. ${pj.flags.cascosGanados ? "Los cascos de los Charcos, ganados, cuelgan en el puente como un trofeo." : ""} ${pj.rel.snotlig >= 3 ? "Snotlig te enseña a contar y a no comerte a los tuyos. Lo segundo cuesta." : "Snotlig duerme cada vez más lejos."} A los diez años eres más ancho que la puerta del puente y la banda entera, cinco goblins, te mira antes de mirarle a él.`,
  3: (pj) => `${pj.flags.campoGanado ? "Pasa una temporada en Sexta con campo propio, ganado a los halflings, que aún vienen los domingos a mirar desde fuera comiendo." : pj.flags.campoRobado ? "Pasa una temporada en Sexta con un campo robado. Los halflings no vuelven. Los que apuestan tampoco." : "Pasa una temporada en Sexta con un campo comprado al doscientos por ciento. Ma Gorka viene a cobrar cada luna."} Ganáis más de lo que nadie esperaba de seis criaturas con cascos de otros. ${pj.flags.wazzokEnLaBanda ? "Wazzok predice tu muerte cada domingo. Falla cada domingo." : ""} Bajo el puente viejo, dicen, vive un troll.`,
  4: (pj) => `Pasan dos temporadas. ${pj.flags.trollSentoMinotauro || pj.flags.trollAprendioMirando || pj.flags.wazzokAcerto ? "Con troll, la banda sube a Quinta como sube un río: sin preguntar." : "Con troll, o con lo que hay, la banda sube a Quinta a trompicones."} Grimgutz vive en el río al lado del campo y se sienta encima de quien tiene la bola, que es su única idea. ${pj.flags.skabnikEnLaBanda || pj.flags.cadenaCorta ? "Skabnik gira en la banda. La banda ha aprendido a agacharse." : ""} En la pizarra de Ma Gorka hay un hueco donde debería estar vuestro nombre.`,
  5: (pj) => `Pasan dos temporadas más. ${pj.flags.nombreCesto ? "Los Cestos del Río" : pj.flags.nombreCascos ? "Los Cascos Robados" : "Da Banda"} sube a Cuarta, y Cuarta cuesta: cascos de verdad, apotecario, campo con grada. ${pj.flags.velasteAGrot || pj.flags.cascoDeGrot ? "El casco de Grot sigue en el poste. Los goblins nuevos lo tocan sin saber de quién es." : ""} Ma Gorka baja de la cueva, que no hace nunca, con una tabla bajo el brazo. Es la pared.`,
  6: (pj) => `${pj.flags.ascendisteis ? "Pasa el verano del ascenso. Tercera División, donde los equipos tienen nombre de verdad, y el vuestro suena raro en la lista, y suena." : "Pasa un verano en Cuarta, y otro, y la banda gana lo bastante para que en Gorgomor alguien pregunte quiénes son esos."} ${pj.flags.grimgutzVendido ? "Sin Grimgutz. Los domingos, la banda mira al río por costumbre." : "Grimgutz mira la mosca. La mosca ha crecido."} Llega un mensajero de Gorgomor con un hueso.`,
  7: (pj) => `Pasan las temporadas, y luego más. ${pj.flags.campeon ? "El Cáliz de Barro está bajo el puente, lleno de dientes, y las charcas cuentan la historia de una banda de cesto que lo ganó, y cada charca la cuenta distinta." : "El Cáliz se quedó en el elefante, y las charcas cuentan la historia de la banda que casi, y la cuentan igual."} Los goblins de Snotlig tienen goblins. Grimgutz no envejece. Tú sí: te duele comer, que en un orco es lo primero que avisa. En el campo hay crías nuevas que no saben quién fue Grot. Tú sí.`,
};
const ORCO_ENTREACTOS = [
  { id: "cascosPuente", caps: [2, 3], txt: "Robar cascos con Snotlig, de noche, sin despertar a nadie.", req: { rel: ["snotlig", 1] }, fx: { stat: { AG: 1 }, rel: { snotlig: 1 }, Honor: -1 }, msg: "Aprendes a entrar y salir sin ruido. Snotlig dice que eres el orco más silencioso que ha visto. No hay otros." },
  { id: "jabalies", caps: [2, 3, 4], txt: "Cazar jabalíes a mano con los goblins. En la pata de atrás.", fx: { stat: { ST: 1 }, rel: { banda: 1 } }, msg: "Los jabalíes caen si les das en la pata de atrás. Todo cae si le das en la pata de atrás. Lo apuntas en el estómago." },
  { id: "guisoGorka", caps: [2, 3, 4, 5, 6], txt: "Comer en la cueva de Ma Gorka y escuchar quién apuesta qué.", fx: { Astucia: 1, rel: { gorka: 2 } }, msg: "Escuchas. En la cueva de Ma Gorka se sabe quién va a perder antes de que juegue. Aprendes a leer una pared." },
  { id: "rioGrimgutz", caps: [3, 4, 5, 6, 7], txt: "Sentarte en el río con Grimgutz a mirar la mosca.", req: { rel: ["grimgutz", 1] }, fx: { Voluntad: 2, rel: { grimgutz: 2 } }, msg: "Miráis la mosca. Horas. No pasa nada. Es lo más tranquilo que ha vivido un orco, y no lo cambiarías." },
  { id: "setasWazzok", caps: [3, 4, 5, 6], txt: "Dejar que Wazzok te prediga cosas a cambio de setas.", req: { rel: ["wazzok", 1] }, fx: { Astucia: 1, rel: { wazzok: 2 } }, msg: "Wazzok predice. Falla. Pero entre fallo y fallo dice cosas de los rivales que resultan ciertas. Es un espía con setas en los ojos." },
  { id: "pegarSkabnik", caps: [3, 4, 5], txt: "Practicar agacharse cuando Skabnik gira.", req: { rel: ["skabnik", 1] }, fx: { stat: { AV: 1 }, rel: { skabnik: 1 } }, msg: "Te agachas. Skabnik gira. Te agachas mejor. Al mes ya no te alcanza nadie que gire, ni nada que venga por arriba." },
  { id: "correrGoblins", caps: [2, 3, 4, 5, 6, 7], txt: "Correr detrás de los goblins hasta alcanzarlos.", fx: { stat: { MA: 1 } }, msg: "Los goblins corren sin sentido y rápido. Tú, al final, sin sentido y más rápido. Un orco que corre: escándalo." },
  { id: "rugirCharca", caps: [4, 5, 6, 7], txt: "Ir a la orilla de la charca a rugir. Que oigan.", req: { flag: "rugiste" }, fx: { Ferocidad: 1, fama: 5, rel: { aficion: 2 } }, msg: "Ruges en la orilla. Cada vez se agachan más crías. Un día, un jefe se gira. Es Krug. No se agacha. Todavía." },
  { id: "descanso", caps: [6, 7], txt: "No hacer nada. Dormir bajo el puente. Curar.", fx: { Voluntad: 1, rel: { banda: 1 } }, msg: "Duermes dos días bajo el puente. Nadie se atreve a despertarte. Grimgutz vigila la mosca por ti." },
];
const ORCO_TIEMPO = {};

/* ====================== ELFO ====================== */

/* ====================== ELFO — "LA CAÍDA DE AELINDRA" ====================== */
const ELFO = {
  nombre: "Elfo silvano", lema: "Empiezas arriba. Todo lo demás es bajar.",
  puesto: "Bailarín guerrero", reglas: [],
  base: { MA: 8, ST: 3, AG: 4, AV: 8, hab: ["Esquivar", "Placar", "Saltar"] },
  equipoInicial: "Las Hojas de Ellorien",
  rel: { maelis: "Maelis, tu hija", athanar: "Lord Athanar", berthold: "Berthold", poppy: "Poppy Manteca", lirael: "Lirael, la que pinta", corte: "La corte del Roble", aficion: "La grada", club: "Tu club" },
  relInicial: { maelis: 1, athanar: 1, berthold: 0, poppy: 0, lirael: 0, corte: 3, aficion: 3, club: 3 },
  portada: "Tienes trescientos años, eres bailarina guerrera de las Hojas de Ellorien, y esta noche has ganado el Cáliz de Barro. Todo lo que puede ganarse, lo tienes. Y en el último turno de la final le has roto el cuello a un orco a propósito, y la Cristalvisión lo tiene en el cristal. La Reina te ofrece olvidarlo. Esta es la historia de lo que queda de una elfa cuando deja de ser perfecta, contada de arriba abajo: de Primera al barro.",
  capitulos: [
    { id: 1, titulo: "La noche del Cáliz", sub: "Primera División · Las Hojas de Ellorien", escenas: ["ultimoTurno", "elCristal", "laReina", "maelis", "salida"] },
    { id: 2, titulo: "Cythel", sub: "Segunda División · Las Espinas de Cythel", escenas: ["cartel", "lirael", "vientos", "athanar1", "primeraDerrota"] },
    { id: 3, titulo: "Puerto Maren", sub: "Cuarta División · Los Estibadores", escenas: ["humanos", "poppy", "toros", "elGolpe", "placar"] },
    { id: 4, titulo: "Grünburg", sub: "Sexta División · Los Charcos", escenas: ["berthold", "linieros", "kleinfeld", "perder", "amistoso"] },
    { id: 5, titulo: "El borde", sub: "La oferta y la revancha", escenas: ["athanar2", "mortaigne", "laCarta", "decision"] },
    { id: 6, titulo: "La final de Sexta", sub: "Copa de los Nabos", escenas: ["visperas", "cristalvision", "finalNabos", "vestuarioFinalL"] },
    { id: 7, titulo: "Trescientos años más", sub: "Lo que dura un humano", escenas: ["bertholdMuere", "poppyVieja", "ultimoPartido", "elRoble", "retiro"] },
  ],
  muertes: [
    { titulo: "El curandero de la corte", texto: "Te despiertas bajo un sauce con la piel cosida con hilo de araña. El curandero no te mira: la corte manda curar a los suyos aunque ya no lo sean. 'Una', dice. La piel ya no cierra como antes.", fx: { stat: { AV: -1 }, Voluntad: 1, rel: { corte: -1 } } },
    { titulo: "El barril de Poppy", texto: "Vuelves con sabor a algo que Poppy Manteca no quiere explicar. 'Receta de mi abuela. Para cerdos'. Te ha traído de vuelta una halfling con un cucharón. Ya no corres igual, y no te importa tanto.", fx: { stat: { MA: -1 }, Voluntad: 1, rel: { poppy: 3 } } },
    { titulo: "El Roble", texto: "El Roble te devuelve. No sabes cómo. Vuelves con hojas en el pelo, una mano que no obedece del todo y una voz que es el bosque: 'La tercera. No hay cuarta'.", fx: { stat: { AG: -1 }, Honor: 1 } },
  ],
  escenas: {
    vestuarioFinalL: { titulo: "El granero, después",
      texto: (pj) => `No hay vestuario: hay el granero, la vaca, y dos platos en la mesa. ${pj.flags.copaNabos ? "La Copa de los Nabos, que es de latón y está torcida, en la repisa. Berthold no para de mirarla." : "No hay copa. Berthold pone dos platos igual, y sonríe igual, porque perder es lo que se hace entre victorias."} ${pj.flags.jonasCopa ? "Jonas, la elfa pequeña, sigue con las botas puestas: no quiere que se acabe." : pj.flags.hansCopa ? "Hans, cien kilos, tiene las manos en alto todavía, como cuando anotó." : ""} Poppy sirve guiso a once campesinos y a una elfa.`,
      opciones: (pj) => [
        { txt: "Comer el guiso de Poppy en el segundo plato.", fx: { Honor: 2, rel: { poppy: 2, berthold: 2, club: 1 } }, msg: "Comes del segundo plato, el que Berthold ponía para Marta. Nadie lo dice. Todos lo saben. Es la mejor comida de trescientos años." },
        { txt: "Salir a bailar sola en el campo de nabos, de noche, por última vez.", fx: { Voluntad: 2, Astucia: 1, rel: { aficion: 1 } }, msg: "Bailas con la vaca de público, con un tobillo remendado y barro hasta la rodilla. Trescientos años de baile en un campo de nabos. Es lo mejor que has bailado, y solo lo ve una vaca." },
        { txt: "Sentarte con Berthold y hablar de Marta.", req: { rel: ["berthold", 2] }, forzable: true, fx: { Honor: 2, rel: { berthold: 4 } }, msg: "Le preguntas por ella. Berthold habla una hora, la primera en años. Al final dice: 'Le habrías caído bien. A las dos os gusta perder de pie'. Es lo más cerca que llegaréis de decir lo que sentís." },
      ] },
    /* ---------- 1. LA NOCHE DEL CÁLIZ ---------- */
    ultimoTurno: { titulo: "Turno dieciséis", partido: { rival: "Los Rompecráneos de Gorgomor", fuerza: 4 },
      texto: () => `La final del Cáliz de Barro en el claro sagrado, con la corte entera en los árboles y la Reina en el Roble. Las Hojas contra los Rompecráneos de Gorgomor. Dos a dos. Último turno. Tienes la bola y delante a Gorbash, el blitzer orco que te ha buscado durante dieciséis turnos sin alcanzarte. Has bailado trescientos años. Sabes esquivarle con los ojos cerrados. Y sabes, porque lo sabes todo de este juego, que si entras a placarle de lado, ahora, con Saltar y Placar y el peso justo, no se levanta. Nunca.`,
      opciones: [
        { txt: "Esquivarle y cruzar. Es lo que eres.", tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "Bailas. Gorbash cierra los brazos sobre nada. Cruzas con el silbato y la corte no grita, porque la corte no grita: se levanta. Tres a dos. El Cáliz. Perfecta. Como siempre. Como hace trescientos años.", fx: { fama: 30, Astucia: 1, gol: 1, rel: { corte: 2, aficion: 2, maelis: 1 }, flag: "cruzasteLimpia" } },
          ko: { txt: "Bailas y, por primera vez en trescientos años, el orco adivina el paso. Te alcanza en el aire. La bola rueda y Gorbash anota con el silbato. Dos a tres. La corte no dice nada. Es lo peor que puede decir.", fx: { golRival: 1, rel: { corte: -2, aficion: -1 }, flag: "perdisteElCaliz" } } } },
        { txt: "Entrar a placarle de lado. Que no se levante.", tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Entras de lado, con el peso justo, y se oye un ruido que la corte no ha oído nunca en el claro. Gorbash no se levanta. Cruzas por encima. Tres a dos. El Cáliz. La corte se levanta y aplaude, y tú sabes, mientras levantas el trofeo, que un cristal de la Cristalvisión estaba a diez pasos, mirando.", fx: { fama: 30, Ferocidad: 2, Honor: -3, gol: 1, rel: { corte: 1, aficion: 3 }, flag: "cuelloRoto" } },
          ko: { txt: "Entras de lado y Gorbash, que es un orco, ni se entera: te aparta con el brazo y anota con el silbato. Dos a tres. Y el cristal de la Cristalvisión ha visto lo que intentabas. Eso también se recuerda.", fx: { golRival: 1, Honor: -2, rel: { corte: -3 }, flag: "cuelloIntentado" } } } },
        { txt: "Pasar a Maelis. Tu hija, sesenta años, su primera final, sola en la banda.", req: { rel: ["maelis", 1] }, forzable: true, tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "La bola vuela a la banda, donde nadie mira a una elfa de sesenta años. Maelis la coge como le enseñaste a cogerla: sin que se note. Cruza. Tres a dos. El Cáliz. Su primer touchdown es el que gana la final, y tú, por primera vez, no eres el nombre del cristal.", fx: { fama: 15, Honor: 2, gol: 1, rel: { maelis: 4, corte: 1, aficion: 2 }, flag: "maelisAnoto" } },
          ko: { txt: "La bola vuela y Maelis, sesenta años, su primera final, mira la bola y luego a ti, y en ese medio segundo Gorbash la tumba. Anota él. Dos a tres. Maelis no se levanta en un rato. No por el golpe.", fx: { golRival: 1, rel: { maelis: -2, corte: -2 }, flag: "perdisteElCaliz" } } } },
      ] },
    elCristal: { titulo: "Lo que vio el cristal",
      texto: (pj) => `El banquete de la victoria, en el claro, con la corte y con vino. Lord Athanar, maestro de ceremonias de la Reina, te lleva aparte con una copa y un cristal pequeño en la mano. Lo enciende. ${pj.flags.cuelloRoto ? "Se ve el placaje de lado. Se ve tu cara antes del placaje. Se ve que lo sabías." : pj.flags.cuelloIntentado ? "Se ve el placaje de lado que no salió. Se ve tu cara. Se ve que querías." : pj.flags.cruzasteLimpia ? "Se ve el cruce. Y antes del cruce, un segundo en que miras el cuello de Gorbash y decides que no. Ese segundo también está." : "Se ve el pase a Maelis. Y antes, un segundo en que miras el cuello del orco. Ese segundo está."} 'La Cristalvisión lo tiene', dice Athanar. 'La Reina puede pedir que no lo emitan. A cambio de nada. A cambio de que no haya pasado'.`,
      opciones: [
        { txt: "Aceptar que no haya pasado.", fx: { Astucia: 1, Honor: -2, rel: { athanar: 2, corte: 2, maelis: -1 }, flag: "olvido" }, msg: "Aceptas. El cristal se apaga. La Cristalvisión emite otra jugada. Nadie habla de ello nunca. Tú sí, cada noche, con los ojos cerrados." },
        { txt: "Pedir que lo emitan. Que se vea lo que hiciste, o lo que quisiste hacer.", req: { Honor: 2 }, forzable: true, fx: { Honor: 3, Voluntad: 1, fama: -20, rel: { athanar: -3, corte: -4, aficion: -2, maelis: 2 }, flag: "confesaste" }, msg: "Athanar te mira como se mira una hoja que cae en verano. Lo emiten. Medio mundo lo ve. La corte de Ellorien retira tu nombre del Roble esa misma noche, sin ceremonia, con una lima." },
        { txt: "Coger el cristal y romperlo contra el Roble.", req: { Ferocidad: 2 }, forzable: true, fx: { Ferocidad: 1, rel: { athanar: -2, corte: -2, aficion: 1 }, flag: "cristalRoto" }, msg: "Lo rompes. Athanar no se inmuta: hay más cristales. Pero la corte ha visto a su bailarina romper algo contra el Roble, y eso no se olvida con nada." },
      ] },
    laReina: { titulo: "Lo que ofrece la Reina",
      texto: (pj) => `La Reina te recibe en el Roble, de noche, y las hojas se mueven sin viento. Es hermosa de una forma que duele. ${pj.flags.olvido ? "'No ha pasado', dice, y te ofrece lo que ofrece a los que ya no puede perder: el dorsal de por vida, la vitrina, y el silencio." : pj.flags.confesaste ? "'Has hecho que la corte vea', dice. 'La corte no quiere ver. Puedes quedarte en el Roble, callada, sin dorsal. O irte con él'." : "'Ya', dice, y te ofrece quedarte, bailar, y no volver a mirar cuellos."} Detrás de ella, en la sombra, Maelis, con tu antiguo dorsal en las manos, sin saber si es suyo.`,
      opciones: [
        { txt: "Quedarte. Bailar. Callar.", req: { noflag: "confesaste" }, fx: { Voluntad: -2, oro: 100, rel: { corte: 3, athanar: 2, maelis: -2 }, flag: "quedasteEnLaCorte" }, msg: "Te quedas. Bailas dos partidos más con las Hojas. En el tercero, en el claro, miras el cuello de un elfo de Cythel y te vas del campo andando, sin balón, antes del silbato. La corte lo llama retiro. Tú lo llamas otra cosa." },
        { txt: "Irte. Con el dorsal, sin la corte.", fx: { Voluntad: 2, Honor: 1, rel: { corte: -3, athanar: -1, maelis: 1 }, flag: "teFuiste" }, msg: "Te vas esa noche, por el sendero grande, con una bolsa. La Reina no te detiene. Las hojas se cierran detrás de ti sin ruido. Maelis se queda en la sombra, con el dorsal en las manos." },
        { txt: "Pedirle que le dé el dorsal a Maelis, delante de la corte.", req: { rel: ["maelis", 2] }, forzable: true, fx: { Honor: 2, rel: { maelis: 4, corte: 1 }, flag: "dorsalAMaelis" }, msg: "La Reina sonríe con la boca cerrada. Al día siguiente, en el claro, Maelis sale con tu dorsal. Tú lo ves desde los árboles, sin nadie alrededor. Es la última vez que ves el claro desde dentro." },
      ] },
    maelis: { titulo: "Sesenta años",
      texto: (pj) => `Maelis te encuentra en el sendero, con la bolsa. Tiene sesenta años, que en un elfo es tener quince, y las piernas que le diste. ${pj.flags.maelisAnoto ? "Anotó el touchdown del Cáliz y nadie en la corte se lo ha dicho a la cara." : pj.flags.dorsalAMaelis ? "Lleva tu dorsal. No sabe cómo se lleva." : "Lleva el dorsal de reserva, el que no sale en los cristales."} 'Te vas', dice. No es pregunta. 'Y me quedo'. Tampoco.`,
      opciones: [
        { txt: "Decirle que se quede. La corte es su casa, y el dorsal es suyo.", fx: { Honor: 2, rel: { maelis: 3 }, flag: "maelisSeQueda" }, msg: "Se queda. Juega con las Hojas. Bailará contra ti dentro de unos años, con la hoja verde, y las dos lo sabéis en el sendero sin decirlo." },
        { txt: "Pedirle que venga contigo.", req: { rel: ["maelis", 3] }, forzable: true, fx: { rel: { maelis: -1, corte: -1 }, flag: "pedisteAMaelis" }, msg: "'No', dice. Sesenta años y ya sabe decir que no como su madre. 'Vuelve tú'. Se va por el sendero hacia el Roble. No mira atrás. Le enseñaste eso." },
        { txt: "Enseñarle el paso del cuello. El que no hay que dar.", req: { flag: "cuelloRoto" }, forzable: true, fx: { Honor: 1, Astucia: 1, rel: { maelis: 2 }, flag: "pasoEnsenado" }, msg: "Se lo enseñas en el sendero, despacio: el peso, el lado, el segundo antes. 'Esto es lo que no se hace', dices. Lo aprende. Sabes que lo aprenderá para no hacerlo, o para hacerlo. No depende de ti. Ya no." },
      ] },
    salida: { titulo: "El borde del bosque",
      texto: (pj) => `El sendero acaba donde acaba Ellorien, y fuera hay un camino de tierra con un cartel: Cythel, dos días. ${pj.flags.confesaste ? "Un carro de la Cristalvisión te espera con un reportero que quiere diez segundos. Le das cero." : ""} Tienes trescientos años, un Cáliz, ${pj.flags.olvido ? "un olvido que pesa" : "un cristal que medio mundo ha visto"}, y por primera vez en tu vida no sabes en qué equipo juegas mañana.`,
      opciones: [
        { txt: "Ir a Cythel andando. Sin carro, sin nombre.", fx: { Voluntad: 2, rel: { aficion: -1 }, flag: "andando" }, msg: "Dos días andando. Duermes bajo un sauce que no es de nadie. Llegas a Cythel con barro en las botas por primera vez en tres siglos. Te reconocen igual." },
        { txt: "Mandar aviso a las Espinas de Cythel. Que sepan quién llega.", fx: { Ambición: 1, fama: 5, oro: 30, rel: { club: 1 }, flag: "avisaste" }, msg: "Mandas aviso. Cythel manda un carro con flores. Llegas como una estrella, y las estrellas, en Segunda, se usan." },
        { txt: "Sentarte en el borde hasta que anochezca, mirando el bosque.", fx: { Voluntad: 1, Astucia: 1, rel: { corte: 1 } }, msg: "Anochece. El bosque no dice nada. O dice algo que ya no sabes oír. Te levantas con la primera estrella y caminas." },
      ] },

    /* ---------- 2. CYTHEL ---------- */
    cartel: { titulo: "La estrella de Cythel",
      texto: (pj) => `Las Espinas de Cythel juegan en Segunda, tienen espejos en el vestuario y una entrenadora, Ysolde, que te recibe con un contrato y un cartel: tu cara, tres metros, sobre la grada. 'No necesito tus piernas', dice. 'Necesito tu nombre'. ${pj.flags.confesaste ? "Debajo del cartel han pintado, de noche, la palabra 'cuello'. Ysolde no lo ha borrado: vende entradas." : ""} Te dan el mejor espejo. No te reflejas bien.`,
      opciones: [
        { txt: "Firmar y salir a la grada a saludar bajo el cartel.", fx: { Ambición: 1, fama: 10, oro: 50, rel: { club: 2, aficion: 2 }, flag: "cartelAceptado" }, msg: "Saludas. Tres mil elfos de Cythel aplauden a un cartel. Cobras. Es lo más parecido a la corte que hay fuera, y es exactamente igual de vacío." },
        { txt: "Firmar con una condición: nada de carteles. Juegas o te vas.", req: { Honor: 2 }, forzable: true, fx: { Honor: 2, Voluntad: 1, oro: 20, rel: { club: -1, aficion: 1 }, flag: "sinCartel" }, msg: "Ysolde quita el cartel con cara de quien pierde dinero. Te pone de titular por rabia. Juegas. Es lo que querías, y es Segunda: el barro llega más arriba." },
        { txt: "Pedir el banco del fondo, junto al desagüe. Y entrenar sola.", req: { Voluntad: 3 }, forzable: true, fx: { Voluntad: 2, Astucia: 1, rel: { club: -2, lirael: 1 }, flag: "bancoDelFondo" }, msg: "Te dan el banco del desagüe. Llegas antes que nadie y te vas después. En Cythel se comenta, en verso, que la estrella se esconde. No te escondes. Miras." },
      ] },
    lirael: { titulo: "La que pinta",
      texto: (pj) => `Lirael es receptora de las Espinas y pinta a sus compañeros en hojas de haya, que cuelga a secar en el vestuario. Te ha pintado antes de conocerte, desde la grada, hace años: sales bailando, perfecta, con el dorsal de las Hojas. Ahora te pinta otra vez. ${pj.flags.cuelloRoto ? "Sales de lado, con el peso justo, un segundo antes del placaje. No sonríes." : pj.flags.olvido ? "Sales con los ojos cerrados. No sabes cuándo te vio así." : "Sales de frente, mirando algo que no está en la hoja."} Cuelga las dos hojas juntas.`,
      opciones: [
        { txt: "Pedirle que descuelgue la vieja. La de las Hojas.", fx: { Voluntad: 1, rel: { lirael: 1 }, flag: "hojaViejaFuera" }, msg: "La descuelga sin preguntar. Se la guarda. 'Por si vuelves', dice. No sabes a qué." },
        { txt: "Pedirle que te pinte cada partido. Como salgas.", fx: { Honor: 2, Astucia: 1, rel: { lirael: 3 }, flag: "liraelTePinta" }, msg: "Te pinta cada partido. Cada hoja es peor que la anterior en la corte y mejor en Cythel: sales con barro, con un moratón, con una sonrisa que no conocías. Las guardas todas." },
        { txt: "Pintarla tú. Mal.", req: { Astucia: 2 }, forzable: true, fx: { Honor: 1, rel: { lirael: 3, club: 1 }, flag: "pintasteALirael" }, msg: "La pintas con los dedos, torcida, con la bola en las manos y una espina en el pelo. Se ríe hasta que se le corre la pintura. Lo cuelga en el centro. Desde ese día, en el campo, está siempre donde tú caes." },
      ] },
    vientos: { titulo: "Contra los Vientos", partido: { rival: "Los Vientos del Claro", fuerza: 3 },
      texto: (pj) => `Los Vientos del Claro son elfos de bosque como tú, juegan en Segunda para no jugar en Primera, y su bailarín, Caelith, lleva dos siglos queriendo que le veas. Hoy te ve él. ${pj.flags.cartelAceptado ? "Tu cara cuelga sobre la grada. Ysolde quiere touchdowns que se vean." : pj.flags.sinCartel ? "Ysolde te ha puesto de titular por rabia. Quiere que te equivoques." : ""} Turno diez. {marcador}. Caelith viene por tu banda con la bola y con esa cara de quien lleva doscientos años ensayando este cruce.`,
      opciones: [
        { txt: "Bailar delante de él hasta que se le acabe el cruce. Sin tocarle.", tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Bailas. Caelith baila. Doscientos años de ensayo contra trescientos de saber. Pierde la bola sin que le hayas tocado, y Lirael, detrás de ti, la recoge y anota. Dos a uno. Caelith se queda mirando sus manos vacías con cara de poema.", fx: { fama: 8, Astucia: 1, gol: 1, rel: { lirael: 2, club: 2, aficion: 2 } } },
          ko: { txt: "Bailas y Caelith, que ha visto todos tus cristales, sabe el paso. Se va por tu lado bueno y anota con un salto que Cythel comentará. Uno a dos. Te mira desde la línea. No sonríe. Es peor.", fx: { golRival: 1, rel: { aficion: -1 } } } } },
        { txt: "Placarle. De frente, no de lado. Que se note la diferencia.", tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Entras de frente. Caelith no lo espera: los elfos de bosque no placan de frente. Cae. Se levanta. Está entero. Recoges la bola y anotas. Dos a uno. Lirael te pinta esa noche placando de frente, y en la hoja, por primera vez, sales mirando al que placas.", fx: { fama: 8, Ferocidad: 1, Honor: 1, gol: 1, rel: { club: 2, lirael: 1 } , flag: "placasteDeFrente" } },
          ko: { txt: "Entras de frente y Caelith se echa a un lado, que es lo que hacen los elfos. Te pasa y anota. Uno a dos. Ysolde, en la banda, apunta algo. Es tu nombre, y una cruz.", fx: { golRival: 1, rel: { club: -1 } } } } },
        { txt: "Mirarle el cuello.", req: { flag: "cuelloRoto" }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Le miras el cuello y Caelith lo ve, y en ese medio segundo de miedo, que un elfo no debería tener, pierde el paso. No le tocas. No hace falta. Recoges la bola que suelta y anotas. Dos a uno. Sabes lo que has hecho. Lirael, esa noche, no te pinta.", fx: { fama: 8, Ferocidad: 1, Honor: -2, gol: 1, rel: { lirael: -2, aficion: 1 }, flag: "mirasteElCuello" } },
          ko: { txt: "Le miras el cuello y Caelith te mira a los ojos. 'Ya', dice, y te pasa, y anota. Uno a dos. La grada de Cythel, que ha visto el cristal, sabe lo que has hecho aunque no hayas hecho nada.", fx: { golRival: 1, Honor: -1, rel: { aficion: -2 } } } } },
      ] },
    athanar1: { titulo: "La primera visita",
      texto: (pj) => `Lord Athanar te espera en el vestuario de Cythel, sentado en tu banco, con una hoja sellada. Los espejos no lo reflejan bien; a él tampoco. 'La Reina te ofrece volver', dice. 'Ahora. El dorsal, la vitrina, ${pj.flags.maelisSeQueda ? "tu hija en la banda" : "un sitio en la banda"}. A cambio de dos cosas: silencio, y un cuello'. No dice cuál. 'Es la primera oferta. Cada una será más barata. Y peor'.`,
      opciones: [
        { txt: "Decir que no. Con la boca cerrada, como la Reina.", fx: { Voluntad: 2, Honor: 1, rel: { athanar: -1, corte: -1 }, flag: "rechazasteUna" }, msg: "Athanar asiente, se levanta, y deja la hoja sellada en el banco. 'Para cuando cambies'. No la abres. La guardas. Pesa." },
        { txt: "Preguntar qué cuello.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, rel: { athanar: 1 }, flag: "preguntasteElCuello" }, msg: "'El que haga falta cuando haga falta', dice. 'Las Hojas van segundas. Hay un bailarín de Cythel que corre demasiado'. Te mira. Sabes de quién habla. Caelith." },
        { txt: "Coger la hoja y firmar. Volver.", req: { Ambición: 3 }, forzable: true, fx: { Ambición: 2, Honor: -3, oro: 100, rel: { athanar: 3, corte: 3, lirael: -3, club: -3 }, flag: "volvisteEnCythel" }, msg: "Firmas. Athanar sonríe con la boca cerrada. Vuelves a las Hojas al día siguiente, y en el primer partido te ponen delante de Caelith, y sabes para qué. Bailas trescientos años más en la corte. La Reina no vuelve a mirarte: ya te tiene. Lirael guarda la hoja vieja. No la nueva." },
      ] },
    primeraDerrota: { titulo: "Lo que se aprende perdiendo", partido: { rival: "Los Yunques de Baraz Kadrin", fuerza: 3, tipo: "remontada" },
      condicion: (pj) => !pj.flags.volvisteEnCythel,
      texto: (pj) => `Los Yunques de Baraz Kadrin son enanos. Juegan en caja, una casilla por turno, y no persiguen a nadie: esperan. En trescientos años nunca has perdido contra enanos. Hoy vas perdiendo uno a cero en el turno catorce, porque no hay nadie a quien bailarle. ${pj.flags.liraelTePinta ? "Lirael, en la banda, tiene la hoja preparada." : ""} Turno quince. La caja avanza. Tienes dos turnos y a nadie enfrente que quiera moverse.`,
      opciones: [
        { txt: "Saltar por encima de la caja a por el balón.", tirada: { stat: "AG", obj: 10, riesgo: true,
          ok: { txt: "Saltas por encima de cuatro linieros enanos que miran hacia arriba con la boca abierta. Aterrizas sobre el corredor, le quitas el balón y sales por el otro lado. Empate. Los enanos no se enfadan: se lo apuntan en un libro.", fx: { fama: 10, Astucia: 1, gol: 1, rel: { aficion: 2, club: 2 } } },
          ko: { txt: "Saltas por encima de la caja y la caja, que es una caja, tiene tapa: un liniero de ciento sesenta años levanta el brazo sin mirar y te baja. Aterrizas dentro. Once enanos te miran con curiosidad. Uno a cero. Es tu primera derrota contra enanos en tres siglos, y la sientes en las costillas.", fx: { golRival: 1, rel: { aficion: -1 }, flag: "primeraDerrota" } } } },
        { txt: "Aceptar que hoy no. Jugar el turno y perder de pie.", fx: { Voluntad: 2, Honor: 1, golRival: 1, rel: { club: 1, lirael: 2 }, flag: "perdisteDePie" }, msg: "Juegas los dos turnos que quedan como se juegan: sin milagros. Uno a cero. Al acabar, Lirael te pinta perdiendo, de pie, mirando la caja. Es la hoja que más veces mirarás." },
        { txt: "Entrar en la caja de frente. Que se rompa lo que sea.", req: { flag: "placasteDeFrente" }, forzable: true, tirada: { stat: "ST", obj: 10, riesgo: true,
          ok: { txt: "Entras en una caja enana de frente, que no se hace. Un liniero cae porque no esperaba que nadie hiciera eso. Por el hueco, el balón. Lo coges. Empate. Los enanos, al acabar, te dan la mano uno a uno mirando la piedra. Uno dice: 'Raro'.", fx: { fama: 8, Ferocidad: 2, gol: 1, rel: { club: 2, aficion: 2 } } },
          ko: { txt: "Entras de frente y la caja hace lo que hacen las cajas: cerrarse. Se oye algo. Es tuyo. Uno a cero, y sales en camilla por primera vez en trescientos años, mirando el cielo de Cythel.", fx: { golRival: 1, flag: "primeraDerrota" } } } },
      ] },

    /* ---------- 3. PUERTO MAREN ---------- */
    humanos: { titulo: "Los Estibadores",
      texto: (pj) => `${pj.flags.perdisteDePie || pj.flags.primeraDerrota ? "Cythel te vende en invierno: una estrella que pierde no vende carteles." : "Cythel te vende en invierno: Ysolde dice que has 'devaluado'."} Los Estibadores de Puerto Maren, Cuarta División, humanos, huelen a sal y a pescado sin vender. El entrenador, Kasper Holt, tiene cuarenta años, que en un elfo es ser un niño con canas, y te recibe con un balón mojado: 'Aquí nadie baila. Aquí se choca y se sigue'. Los humanos del vestuario te miran como se mira un cuadro: de lejos, sin saber qué decir.`,
      opciones: [
        { txt: "Chocar. Es lo que hay.", fx: { Ferocidad: 1, Voluntad: 1, rel: { club: 2 }, flag: "chocasteConHumanos" }, msg: "Chocas en el primer entrenamiento con un liniero que pesa el doble. Cae él. Luego caes tú, porque no sabías que después de chocar hay que quedarse. Aprendes lo segundo en un mes." },
        { txt: "Enseñarles a bailar. A los que quieran.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 1, Honor: 1, rel: { club: 3 }, flag: "ensenasteABailar" }, msg: "Tres linieros quieren. Bailan como bailan los humanos: mal, con ganas. En el tercer partido uno esquiva a alguien por primera vez en su vida y llora. Holt no entiende nada. Lo apunta." },
        { txt: "Entrenar sola, en el muelle, antes de que lleguen.", fx: { Voluntad: 2, rel: { club: -1, poppy: 1 } }, msg: "Corres por el muelle al amanecer. Hay una halfling sentada en un barril, comiendo, que te mira cada día. El cuarto día te ofrece un bollo. Lo coges." },
      ] },
    poppy: { titulo: "Poppy Manteca",
      texto: (pj) => `Poppy Manteca es la cocinera de los Estibadores, mide lo que mide una halfling, y te sirve el guiso de la primera noche sin preguntar. ${pj.flags.olvido ? "'Vi el cristal', dice, con la boca llena. 'El que no emitieron'. Sabe cosas que la Reina no sabe que se saben." : pj.flags.confesaste ? "'Vi el cristal', dice, con la boca llena. 'Bien hecho. Lo de decirlo, digo. Lo otro no'." : "'Vi el cristal', dice. 'El segundo antes de la jugada. Nadie lo mira. Yo sí'."} Te cuenta a la cara, entre cucharadas, lo que la corte no te dijo en trescientos años.`,
      opciones: [
        { txt: "Escuchar. Hasta el final del guiso.", fx: { Honor: 2, Voluntad: 1, rel: { poppy: 3 }, flag: "escuchasteAPoppy" }, msg: "Escuchas. Poppy dice que la corte te hizo perfecta para no tener que quererte, y que perfecta no es una cosa que se pueda ser mucho tiempo sin romper algo. Te sirve más guiso. Comes." },
        { txt: "Decirle que una halfling no sabe lo que es la corte.", fx: { Ambición: 1, rel: { poppy: -2, club: -1 }, flag: "poppyHerida" }, msg: "'No', dice, 'sé lo que es la cocina'. Se lleva el plato. Al día siguiente te sirve igual. Los halflings no guardan rencor: guardan comida." },
        { txt: "Preguntarle qué haría ella con el segundo antes de la jugada.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 2, rel: { poppy: 3 }, flag: "poppySegundo" }, msg: "'Comer', dice. Luego, seria: 'Ese segundo es tuyo. La corte quiere que no exista. Yo quiero que sepas que existe'. Es la mejor entrenadora que has tenido y cocina." },
      ] },
    toros: { titulo: "Los Toros Rojos", partido: { rival: "Los Toros Rojos de Norburgo", fuerza: 3 },
      texto: (pj) => `Los Toros Rojos de Norburgo son humanos grandes que pegan y esperan. Contra elfos, no esperan: pegan. Holt te alinea en la banda y te dice 'choca y sigue'. ${pj.flags.chocasteConHumanos ? "Sabes quedarte después de chocar. Casi." : pj.flags.ensenasteABailar ? "Tres linieros humanos bailan mal a tu alrededor. Es hermoso." : ""} Turno cinco. Tienes el balón. Tres Toros vienen por la banda y por primera vez en tu vida no tienes espacio para bailar.`,
      opciones: [
        { txt: "Chocar con el primero y seguir. Como dice Holt.", tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Chocas. El Toro cae. Te quedas de pie, que es la parte que no sabías. Sigues. El segundo y el tercero se frenan: una elfa que choca no está en sus libros. Anotas. Holt, en la banda, se quita la gorra. Es la primera vez.", fx: { fama: 8, Ferocidad: 1, gol: 1, rel: { club: 3, aficion: 2 }, flag: "chocasteYSeguiste" } },
          ko: { txt: "Chocas. El Toro no cae: los Toros no caen al primero. El segundo llega y el tercero también. Te levantas tarde. Anotan. Holt apunta. Poppy, en el banquillo, sirve guiso a los que vuelven.", fx: { golRival: 1, rel: { club: 1 } } } } },
        { txt: "Bailar en el sitio que hay. Que es poco.", tirada: { stat: "AG", obj: 10, riesgo: true,
          ok: { txt: "Bailas en un palmo. Trescientos años sirven para eso: los tres Toros chocan entre sí. Anotas por el hueco que dejan. La grada de Puerto Maren, que no ha visto nunca a un elfo de cerca, se calla y luego grita como gritan los humanos: sin ritmo.", fx: { fama: 10, Astucia: 1, gol: 1, rel: { aficion: 3, club: 2 } } },
          ko: { txt: "Bailas en un palmo y el palmo no basta. El primer Toro te alcanza en el aire. Oyes algo que no habías oído nunca en tu cuerpo. Anotan. Sales en camilla y Poppy va detrás con el cucharón.", fx: { golRival: 1, flag: "golpeToros" } } } },
      ] },
    elGolpe: { titulo: "Lo que duele",
      texto: (pj) => `${pj.flags.golpeToros ? "El golpe de los Toros" : "Un placaje tardío en el entrenamiento del jueves"} te ha roto algo por dentro que en trescientos años no se había roto: el tobillo, y otra cosa que no tiene nombre. El apotecario humano dice tres meses. Holt dice que juegues cuando puedas. Poppy te sube el guiso a la rama, que aquí es un catre, cada noche. Duele. No sabías que dolía así. ${pj.rel.poppy >= 3 ? "Poppy se queda hasta que te duermes, contando cosas de su abuela." : "Nadie se queda."}`,
      opciones: [
        { txt: "Tres meses. Que duela. Aprender lo que es.", fx: { Voluntad: 3, Honor: 1, fama: -5, rel: { poppy: 2, club: 1 }, flag: "aprendisteElDolor" }, msg: "Tres meses en el catre. Aprendes lo que saben los humanos desde los seis años: que el cuerpo se acaba y por eso importa. Vuelves entera y distinta. Bailas peor. Juegas mejor." },
        { txt: "Jugar a las tres semanas, vendada. Los elfos no esperan.", fx: { Ambición: 1, stat: { MA: -1 }, fama: 5, rel: { club: 2 }, flag: "tobilloVendado" }, msg: "Juegas. Aguantas. El tobillo no vuelve a ser el que era, y por primera vez corres como corre cualquiera, ni más ni menos. Holt te pone de capitana un partido. 'Por cabezota', dice." },
        { txt: "Pedirle a Poppy la receta de su abuela. La de los cerdos.", req: { rel: ["poppy", 3] }, forzable: true, fx: { Astucia: 1, stat: { AV: 1 }, rel: { poppy: 3 }, flag: "recetaPoppy" }, msg: "Poppy te unta algo que huele a establo y a fiesta. A la semana andas. A las dos, corres. El tobillo queda más duro que antes. 'Para cerdos', dice Poppy. 'Y para elfos que chocan'." },
      ] },
    placar: { titulo: "Cómo placan los humanos", partido: { rival: "Los Arponeros de Puerto Maren", fuerza: 2 },
      texto: (pj) => `El derbi del puerto contra los Arponeros. Holt te ha enseñado en dos meses lo que la corte no te enseñó en tres siglos: a placar de frente, con el hombro, mirando al que placas, y a quedarte. ${pj.flags.tobilloVendado ? "El tobillo vendado no baila. Placa." : pj.flags.aprendisteElDolor ? "Sabes lo que cuesta un golpe. Por eso los das de frente." : ""} Turno doce. {marcador}. Su capitán, un arponero de dos metros, viene con el balón por el centro, sin esquivar a nadie, porque nunca ha tenido que hacerlo.`,
      opciones: [
        { txt: "Placarle de frente, con el hombro, como Holt.", tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Entras de frente. Dos metros de arponero caen hacia atrás con cara de no entender. Te quedas de pie. Coges el balón. Anotas. Holt grita algo que no es un consejo. Lirael, que ha venido desde Cythel, te pinta esa noche con el hombro por delante.", fx: { fama: 8, Ferocidad: 1, gol: 1, rel: { club: 3, aficion: 2, lirael: 1 }, hab: "Placaje defensivo", flag: "placasComoHumano" } },
          ko: { txt: "Entras de frente y dos metros de arponero no caen: te llevan por delante como un carro. Anotan. Te levantas sola. Holt no apunta nada: sabe que ya está aprendido.", fx: { golRival: 1, rel: { club: 1 } } } } },
        { txt: "Bailar delante y quitarle el balón sin tocarle. Lo de siempre.", tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Bailas delante del arponero, que se marea, y le quitas el balón de las manos como se le quita un bollo a un niño. Anotas. Holt, en la banda, dice: 'Bien. Pero la próxima, choca'.", fx: { fama: 6, Astucia: 1, gol: 1, rel: { aficion: 2, club: 1 } } },
          ko: { txt: "Bailas delante y el arponero, que no sabe bailar, te pasa por encima sin enterarse. Anotan. En Cuarta, bailar solo sirve si el otro sabe que bailas.", fx: { golRival: 1 } } } },
      ] },

    /* ---------- 4. GRÜNBURG ---------- */
    berthold: { titulo: "Los Charcos",
      texto: (pj) => `Los Estibadores te sueltan en verano: Holt dice que has aprendido todo lo que él sabe, y que es poco. Grünburg está a dos días, en Sexta, y los Charcos juegan en un campo de nabos con una vaca en la zona de anotación. Berthold, el entrenador, cincuenta años, viudo, te contrata porque no puede permitirse a nadie más y lo dice así: 'No puedo pagarte. Puedo darte un catre en el granero y la mitad de las apuestas del pueblo'. Su mujer llevaba el equipo. Murió el invierno pasado. Él sigue poniendo dos platos.`,
      opciones: [
        { txt: "Aceptar el catre y comerte el segundo plato.", fx: { Honor: 2, rel: { berthold: 3, club: 2 }, flag: "segundoPlato" }, msg: "Comes del segundo plato. Berthold no dice nada, pero al día siguiente hay dos platos otra vez, y uno es tuyo, y no vuelve a haber uno vacío." },
        { txt: "Aceptar a cambio de la vaca. Que la muevan.", fx: { Astucia: 1, rel: { berthold: 1, aficion: -1 }, flag: "vacaMovida" }, msg: "Berthold mueve la vaca. El pueblo entero lo comenta durante un mes: 'la elfa que movió a Berta'. Berta vuelve sola a la zona de anotación al tercer día. Nadie vuelve a moverla." },
        { txt: "Preguntarle por su mujer.", req: { Honor: 2 }, forzable: true, fx: { Honor: 1, Astucia: 1, rel: { berthold: 3 }, flag: "preguntastePorElla" }, msg: "'Se llamaba Marta. Sabía dónde ponía las botas cada uno de estos animales', dice, y señala el granero donde duermen once campesinos que juegan al Barro los domingos. 'Yo no. Yo pongo los platos'. Desde esa noche pone los platos y tú pones las botas." },
      ] },
    linieros: { titulo: "Once campesinos",
      texto: (pj) => `Los Charcos son once campesinos que pesan el doble que tú, corren la mitad y se caen solos. Berthold te pide que les enseñes 'lo que sabes'. Lo que sabes es bailar, y no sirve: un liniero de Grünburg que baila se tuerce un tobillo. ${pj.flags.placasComoHumano ? "Lo que sabes ahora, también, es placar de frente. Eso sí sirve." : ""} El primer día de entrenamiento, seis de ellos te miran como a un milagro y cinco como a una elfa.`,
      opciones: [
        { txt: "Enseñarles a placar de frente, como te enseñó Holt.", req: { flag: "placasComoHumano" }, forzable: true, fx: { Honor: 2, Astucia: 1, rel: { club: 3, berthold: 2 }, flag: "linierosPlacan" }, msg: "Placan de frente. Mal, con ganas, con el hombro. Al mes, los Charcos son el equipo de Sexta que más rivales deja en el suelo, y tú, que bailabas, lo has enseñado." },
        { txt: "Enseñarles a caer. Es lo primero.", fx: { Honor: 1, Voluntad: 1, rel: { club: 2 }, flag: "linierosCaen" }, msg: "Les enseñas a caer sin romperse, a levantarse, y a no estar donde llega el golpe. No aprenden lo tercero. Aprenden lo primero y lo segundo, y en Sexta eso es media liga." },
        { txt: "Elegir a uno. El que menos pesa. Enseñarle a bailar.", req: { Astucia: 2 }, forzable: true, fx: { Astucia: 2, rel: { club: 1, aficion: 1 }, flag: "unoQueBaila" }, msg: "Se llama Jonas, tiene diecisiete años y las piernas de alguien que ha huido de vacas. Baila. Mal, luego menos mal. Los otros diez le llaman 'la elfa pequeña'. Él no se ofende: se lo cree." },
      ] },
    kleinfeld: { titulo: "El derbi de los nabos", partido: { rival: "Los Segadores de Kleinfeld", fuerza: 1 },
      texto: (pj) => `Kleinfeld contra Grünburg, en un campo peor que el vuestro, con doscientas personas y un árbitro que es el herrero. ${pj.flags.linierosPlacan ? "Once campesinos que placan de frente forman a tu alrededor sin que se lo digas." : pj.flags.unoQueBaila ? "Jonas, la elfa pequeña, está en la banda, bailando en el sitio." : "Once campesinos te miran esperando el milagro."} Turno ocho. {marcador}. Tienes el balón y Berta, la vaca, en la zona de anotación, mirándote.`,
      opciones: [
        { txt: "Pasar a Jonas. Que anote la elfa pequeña.", req: { flag: "unoQueBaila" }, forzable: true, tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Pasas. Jonas coge el balón como le enseñaste, sin que se note, y esquiva a un segador que no sabía que se podía esquivar. Anota entre las patas de Berta. Doscientas personas gritan su nombre. Su madre llora. Tú no. Casi.", fx: { fama: 5, Honor: 2, gol: 1, rel: { club: 3, aficion: 3, berthold: 2 }, flag: "jonasAnoto" } },
          ko: { txt: "Pasas. Jonas mira el balón, mira a Berta, y se le cae. Un segador lo recoge y anota. Jonas se sienta en el barro. Le levantas. 'Otra vez', le dices. Es lo que te decían a ti.", fx: { golRival: 1, rel: { club: 1 } } } } },
        { txt: "Bailar hasta la línea. En Sexta, todavía puedes.", tirada: { stat: "AG", obj: 7, riesgo: false,
          ok: { txt: "Bailas y los segadores chocan entre sí y con Berta. Anotas. Doscientas personas no saben lo que han visto. Berthold sí: lo vio en un cristal hace años, y ahora está en su campo de nabos.", fx: { fama: 6, gol: 1, rel: { aficion: 2, berthold: 1 } } },
          ko: { txt: "Bailas y resbalas en un nabo. Es lo que hay en Sexta: nabos. Un segador recoge el balón y anota. Berta muge.", fx: { golRival: 1 } } } },
        { txt: "Dar el balón a un liniero y placar tú al que venga. Que anote un campesino.", tirada: { stat: "ST", obj: 8, riesgo: true,
          ok: { txt: "Das el balón a Hans, que pesa cien kilos, y placas de frente al primer segador que se acerca. Hans llega a la línea andando. Anota. Es su primer touchdown en once años de domingos. Se queda parado en la zona de anotación sin saber qué hacer con las manos.", fx: { fama: 4, Honor: 2, gol: 1, rel: { club: 4, berthold: 2, aficion: 2 }, flag: "hansAnoto" } },
          ko: { txt: "Das el balón a Hans y placas. El segador cae. Hans también, solo, sin que le toquen. El balón rueda hacia Berta. Berta lo pisa. Empate.", fx: { rel: { club: 2 } } } } },
      ] },
    perder: { titulo: "Perder",
      texto: (pj) => `Los Charcos pierden cuatro partidos seguidos. Nadie se sorprende: son los Charcos. Tú sí. En trescientos años nunca habías perdido cuatro seguidos. Berthold pone dos platos igual. Los campesinos vuelven al campo el domingo igual. ${pj.flags.escuchasteAPoppy ? "Poppy, desde Puerto Maren, manda un bollo por carro con una nota: 'Perder también se come'." : ""} Una noche, en el granero, Hans te pregunta si estás bien. Nadie te lo había preguntado nunca. En la corte no hacía falta.`,
      opciones: [
        { txt: "Decirle que no. Que no sabes perder.", fx: { Honor: 2, Voluntad: 1, rel: { club: 3, berthold: 1 }, flag: "noSabesPerder" }, msg: "'Nosotros sí', dice Hans. 'Te enseñamos'. Te enseñan los once. Se pierde así: se recoge el balón del suelo, se dice 'el domingo que viene', y se cena. Aprendes en un mes. Tardas más que en placar." },
        { txt: "Decirle que sí y salir a entrenar sola de noche.", fx: { Voluntad: 2, Ambición: 1, rel: { club: -1 }, flag: "entrenasteDeNoche" }, msg: "Corres alrededor del campo de nabos hasta que sale el sol. Berta te mira. Bailas mejor que hace un mes. Sigues sin saber perder." },
        { txt: "Sentarte con Berthold a poner los platos.", req: { rel: ["berthold", 2] }, forzable: true, fx: { Honor: 2, rel: { berthold: 4 }, flag: "platosConBerthold" }, msg: "Pones los platos con él. Él no habla de Marta. Tú no hablas del cristal. Al final del cuarto plato, Berthold dice: 'Perder es lo que hacemos entre victorias. Marta lo decía'. Es la única vez que la nombra." },
      ] },
    amistoso: { titulo: "Las Hojas en Grünburg", partido: { rival: "Las Hojas de Ellorien", fuerza: 4 },
      texto: (pj) => `Un carro con el sello del Roble llega a Grünburg: las Hojas de Ellorien ofrecen un amistoso a los Charcos, 'por caridad'. Es un mensaje de la Reina: mira lo que has perdido. Traen a Maelis. ${pj.flags.maelisSeQueda ? "Con tu dorsal, o el de reserva, según lo que le dejaste." : ""} Doscientas personas y una vaca ven bajar del carro a once elfos perfectos. Tus campesinos les miran como se mira un milagro. Tú les miras como se mira un cristal. Turno diez. {marcador}. Maelis viene por tu banda con la bola, y baila como le enseñaste.`,
      opciones: [
        { txt: "Bailar delante de tu hija hasta que se le acabe el cruce.", tirada: { stat: "AG", obj: 10, riesgo: false,
          ok: { txt: "Bailas delante de Maelis. Ella baila como tú. Trescientos años contra sesenta, y los sesenta son tuyos. Pierde la bola sin que la toques. Hans la recoge, ella no lo esquiva y anota Hans, cien kilos, entre once elfos perfectos. Uno a tres. Maelis te mira y se ríe. Es la primera vez que la ves reír en un campo.", fx: { fama: 10, Honor: 1, gol: 1, rel: { maelis: 3, club: 3, aficion: 3 }, flag: "bailasteConMaelis" } },
          ko: { txt: "Bailas delante de Maelis y Maelis, que ha estudiado todos tus cristales, hace el paso que le enseñaste para ganarte. Te pasa. Anota. Cero a cuatro. Desde la línea te mira: no sonríe. Le enseñaste eso también.", fx: { golRival: 1, rel: { maelis: 1 } } } } },
        { txt: "Placarla de frente. Como a cualquiera.", req: { flag: "placasComoHumano" }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Entras de frente con el hombro, como Holt. Maelis no lo espera: su madre no placa. Cae. Está entera. Se levanta con cara de haber aprendido algo que la corte no enseña. Hans anota. Uno a tres. Athanar, en el carro, apunta.", fx: { fama: 8, Ferocidad: 1, gol: 1, rel: { maelis: 2, corte: -2, club: 2 }, flag: "placasteAMaelis" } },
          ko: { txt: "Entras de frente y Maelis se echa a un lado como hacen los elfos, como le enseñaste, y anota. Cero a cuatro. Te levantas y ella te tiende la mano. La coges.", fx: { golRival: 1, rel: { maelis: 2 } } } } },
        { txt: "Dejarla pasar.", req: { rel: ["maelis", 3] }, forzable: true, fx: { Honor: -1, golRival: 1, rel: { maelis: 3, club: -2, aficion: -2 }, flag: "dejasteAMaelis" }, msg: "Te apartas. Maelis anota. Doscientas personas abuchean a su elfa. Maelis te abraza en la zona de anotación, delante de Berta, y nadie entiende nada. Vosotras sí." },
      ] },

    /* ---------- 5. EL BORDE ---------- */
    athanar2: { titulo: "La oferta más barata",
      texto: (pj) => `Lord Athanar baja del carro de las Hojas y entra en el granero como si fuera el Roble. Los espejos de Cythel no lo reflejaban; el granero no tiene espejos y lo refleja peor. 'Última oferta', dice. 'El dorsal, la vitrina, tu hija en la banda. A cambio: silencio, y romperle el cuello a Old Bones'. Old Bones es Gorbash, el orco de la final, que los nigromantes de Mortaigne levantaron y que juega, muerto, en los Cuervos. 'Ya no tiene cuello que romper', dice Athanar. 'Es fácil'. ${pj.flags.cuelloRoto ? "Sabe que ya lo hiciste una vez." : "Sabe que pensaste hacerlo."}`,
      opciones: [
        { txt: "Decir que no. En voz alta, delante de los campesinos.", fx: { Honor: 3, Voluntad: 2, rel: { athanar: -3, corte: -3, club: 3, berthold: 2 }, flag: "rechazasteAtodo" }, msg: "Lo dices en voz alta, en el granero, con once campesinos y una vaca escuchando. Athanar se va sin cerrar el carro. Hans te da una palmada que te dobla. Es el aplauso." },
        { txt: "Pedir tiempo. Hasta después de Mortaigne.", req: { Astucia: 3 }, forzable: true, fx: { Astucia: 2, rel: { athanar: 1 }, flag: "pedisteTiempo" }, msg: "'Hasta después', concede Athanar, y sonríe con la boca cerrada. Sabe que después de Mortaigne todo será más barato. O más caro. Tú también." },
        { txt: "Aceptar. Volver. Con Maelis.", req: { Ambición: 3 }, forzable: true, fx: { Ambición: 2, Honor: -3, rel: { athanar: 3, corte: 3, club: -4, berthold: -3, poppy: -2 }, flag: "aceptasteAtodo" }, msg: "Aceptas. Berthold pone un plato esa noche. Uno. Vuelves a las Hojas. En el primer partido contra Mortaigne te ponen delante de Old Bones, y sabes para qué, y lo haces, o no." },
      ] },
    mortaigne: { titulo: "Old Bones", partido: { rival: "Los Cuervos de Mortaigne", fuerza: 3 },
      texto: (pj) => `Los Cuervos de Mortaigne vienen a Grünburg, y con ellos Old Bones: Gorbash, muerto, con el cuello torcido ${pj.flags.cuelloRoto ? "en el ángulo en que lo dejaste" : "en un ángulo que no le pusiste tú, pero pudiste"}, jugando de blitzer con la mandíbula colgando. Te busca desde el saque. No como un orco: como un muerto, sin prisa. ${pj.flags.aceptasteAtodo ? "Juegas con las Hojas. Athanar está en el carro." : "Juegas con los Charcos. Berthold está en la banda, con dos platos preparados para después."} Turno once. {marcador}. Old Bones tiene el balón y viene por tu banda, despacio, mirándote con lo que le queda de ojos.`,
      opciones: [
        { txt: "Placarle de frente. A lo que queda de él. Como a cualquiera.", tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Entras de frente con el hombro, mirándole. Old Bones cae, hueso sobre hueso, y se queda mirando el cielo con la mandíbula abierta. No le has roto nada: ya estaba roto. Le has placado. Coges el balón. Anotas. Al levantarse, despacio, te hace un gesto con la cabeza torcida. Es lo más parecido a una paz que puede hacer un muerto.", fx: { fama: 12, Honor: 2, Ferocidad: 1, gol: 1, rel: { club: 3, aficion: 3, corte: -1 }, flag: "placasteAOldBones" } },
          ko: { txt: "Entras de frente y Old Bones, que no siente, no cae: te pasa por encima con el peso de un orco y el frío de una tumba. Anota. Se gira y te mira. No hay nada en la mirada. Eso es lo que te asusta.", fx: { golRival: 1, rel: { aficion: -1 } } } } },
        { txt: "Bailar. Que no te toque. Que no lo toques.", tirada: { stat: "AG", obj: 9, riesgo: false,
          ok: { txt: "Bailas y el muerto, que va despacio, no llega nunca. Le quitas el balón sin tocarle, como le quitabas todo a todos hace trescientos años. Anotas. Old Bones se queda parado en la banda, sin balón, y por primera vez un muerto parece triste.", fx: { fama: 8, Astucia: 1, gol: 1, rel: { club: 2, aficion: 2 } } },
          ko: { txt: "Bailas y Old Bones, que no tiene prisa ni miedo ni paso que adivinar, simplemente está donde vas a estar. Te tumba sin esfuerzo. Anota. Los muertos no se marean.", fx: { golRival: 1 } } } },
        { txt: "Romperle lo que le queda. Es lo que pide Athanar. Es fácil.", req: { flag: "pedisteTiempo" }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false,
          ok: { txt: "Entras de lado, con el peso justo, como en la final. El cuello de Old Bones se separa del resto con un ruido seco. No se levanta. Nunca. Anotas. Doscientas personas y una vaca han visto lo que la corte no quiso emitir. Athanar, desde el carro, aplaude con la boca cerrada. Berthold retira un plato.", fx: { fama: 10, Ferocidad: 2, Honor: -4, gol: 1, rel: { athanar: 3, corte: 2, club: -3, berthold: -3, poppy: -3, maelis: -2 }, flag: "rompisteAOldBones" } },
          ko: { txt: "Entras de lado y Old Bones, que ya lo vivió una vez, gira. Te pasa. Anota. Y no te mira. Un muerto que no te mira es un veredicto.", fx: { golRival: 1, Honor: -1, rel: { athanar: -1 } } } } },
      ] },
    laCarta: { titulo: "Una hoja de Maelis",
      texto: (pj) => `Llega una hoja de haya con la letra apretada de Maelis. ${pj.flags.bailasteConMaelis ? "Dice que se rió en Grünburg y que la corte le ha preguntado por qué. Que no ha sabido decirlo." : pj.flags.placasteAMaelis ? "Dice que le duele el hombro donde la placaste y que es la primera vez que le duele algo. Que no sabía." : pj.flags.dejasteAMaelis ? "Dice que la corte comenta que su madre la dejó pasar. Que ella sabe lo que fue." : "Dice que las Hojas van primeras y que la Reina la mira mucho. Que no sabe si es bueno."} Al final, con otra tinta: 'Athanar dice que vuelves. No vuelvas por mí. Vuelve si quieres. Yo estoy bien. Creo'.`,
      opciones: [
        { txt: "Contestarle. Todo. El cristal, el segundo antes, el guiso de Poppy.", fx: { Honor: 2, rel: { maelis: 4 }, flag: "cartaAMaelis" }, msg: "Cuatro hojas de haya. Se las manda Lirael por carro. Maelis contesta con una línea: 'Ya. Lo del segundo lo sabía. Te vi'. Es la conversación más larga de vuestra vida." },
        { txt: "No contestar. Que no tenga que elegir entre la corte y tú.", fx: { Voluntad: 2, rel: { maelis: -1 }, flag: "silencioAMaelis" }, msg: "Guardas la hoja. La lees antes de cada partido. No respondes. Maelis no vuelve a escribir. No hace falta." },
        { txt: "Mandarle la hoja de Lirael. La de perder de pie.", req: { flag: "perdisteDePie" }, forzable: true, fx: { Honor: 2, Astucia: 1, rel: { maelis: 3, lirael: 1 }, flag: "hojaAMaelis" }, msg: "Le mandas la hoja donde sales perdiendo, de pie, mirando una caja de enanos. Maelis la cuelga en su rama, en la corte. Athanar la ve. La Reina la ve. Nadie la descuelga." },
      ] },
    decision: { titulo: "Lo que decides en el borde",
      texto: (pj) => `Athanar espera la respuesta en el borde del bosque, donde acaba Ellorien y empieza el camino de tierra. ${pj.flags.rompisteAOldBones ? "Has hecho lo que pedía. Solo queda el silencio." : pj.flags.placasteAOldBones ? "Placaste a Old Bones de frente. Athanar dice que 'no cuenta'." : "No has hecho lo que pedía."} Detrás de ti, dos días de camino, un granero con dos platos. Delante, el Roble. 'Es la última vez que pregunto', dice. Lo es.`,
      opciones: [
        { txt: "Quedarte en el barro. Con los Charcos. Con Berthold y Poppy y Berta.", req: { noflag: "aceptasteAtodo" }, fx: { Honor: 3, Voluntad: 2, rel: { club: 4, berthold: 3, poppy: 2, corte: -3, athanar: -3, aficion: 2 }, flag: "quedasteEnElBarro" }, msg: "'No', dices, y te vuelves por el camino de tierra. Athanar no te sigue. Las hojas se cierran detrás. En Grünburg, Berthold ha puesto dos platos. Hans te pregunta si estás bien. 'Sí', dices. Es verdad." },
        { txt: "Volver a la corte. Con el silencio.", fx: { Ambición: 2, Honor: -2, oro: 150, rel: { corte: 4, athanar: 3, club: -4, berthold: -3, poppy: -3 }, flag: "volvisteALaCorte" }, msg: "Vuelves. El dorsal, la vitrina, la rama. Bailas en el claro con Maelis en la banda. Es perfecto. Cada noche, con los ojos cerrados, ves un granero con dos platos, y no sabes por qué te duele algo que no tiene nombre." },
        { txt: "Volver, pero sin silencio: que la Reina te oiga en el Roble.", req: { flag: "confesaste", Voluntad: 4 }, forzable: true, fx: { Honor: 3, Voluntad: 1, rel: { corte: -2, maelis: 3, athanar: -4 }, flag: "volvisteSinSilencio" }, msg: "Entras en la corte con barro en las botas y le dices a la Reina, delante del Roble, lo que hiciste, lo que pensaste, y lo que aprendiste en un granero. La Reina no dice nada. Maelis, en la sombra, sí: 'Mamá'. La corte te deja jugar en las Hojas. No te deja bailar en el claro. Es un trato." },
      ] },

    /* ---------- 6. LA FINAL DE SEXTA ---------- */
    visperas: { titulo: "La víspera",
      texto: (pj) => `${pj.flags.volvisteALaCorte || pj.flags.volvisteSinSilencio ? "Has vuelto a las Hojas, pero los Charcos han llegado a la final de la Copa de los Nabos, y Berthold ha mandado una hoja: 'Ven a verlos. No a jugar'. Vas. A jugar." : "Los Charcos de Grünburg han llegado a la final de la Copa de los Nabos por primera vez en su historia."} La víspera, Berthold no puede dormir y tú tampoco. Os sentáis en la puerta del granero con Berta. ${pj.flags.platosConBerthold ? "Berthold habla de Marta por segunda vez en su vida: 'Le habría gustado la elfa'." : "Berthold no habla. Tú tampoco. Berta rumia."} Poppy ha venido desde Puerto Maren con un barril y la receta de su abuela.`,
      opciones: [
        { txt: "Pedirle a Poppy la receta para los once. Que placan mejor.", req: { rel: ["poppy", 2] }, forzable: true, fx: { Astucia: 1, rel: { poppy: 3, club: 2 }, flag: "recetaParaTodos" }, msg: "Poppy unta a once campesinos con algo que huele a establo. A la mañana siguiente placan como carros. Berta se aleja de ellos por primera vez." },
        { txt: "Sentarte con Berthold y no decir nada hasta que amanezca.", fx: { Voluntad: 2, Honor: 1, rel: { berthold: 3 }, flag: "amanecerConBerthold" }, msg: "Amanece. Berthold dice: 'Gracias'. No sabes de qué. Sí sabes. Es la mejor conversación de tu vida, y en la corte no la habrías tenido." },
        { txt: "Ir al campo de noche y bailar sola, entera, por última vez con esas piernas.", fx: { Voluntad: 1, Astucia: 1, rel: { aficion: 1 }, flag: "bailasteDeNoche" }, msg: "Bailas en el campo de nabos, a oscuras, con Berta de público. Trescientos años de baile en un campo con una vaca. Es lo mejor que has bailado. Nadie lo ve. Lo ve todo." },
      ] },
    cristalvision: { titulo: "Diez segundos",
      texto: (pj) => `Un reportero de la Cristalvisión, con un cristal mágico flotando, te aborda en la puerta del granero. 'Diez segundos. Di algo que se recuerde'. ${pj.flags.olvido ? "Sabes que la Cristalvisión tiene un cristal que no emitió. Ellos también." : pj.flags.confesaste ? "Es el mismo reportero que emitió el cristal. Te mira con respeto, o con hambre." : ""} Detrás, medio Mundo Viejo y un campo de nabos.`,
      opciones: [
        { txt: "'Aprendí a perder en un granero. Tardé trescientos años.'", fx: { fama: 12, Honor: 2, rel: { aficion: 3, berthold: 2, corte: -1 } }, msg: "Lo dices sin rimar, a propósito. Se repite en todas las tabernas del Mundo Viejo. En la corte lo llaman vulgar y lo repiten. Berthold lo oye en el cristal de la taberna de Grünburg y pide otra." },
        { txt: "Pedir que emitan el cristal de la final. El que no emitieron.", req: { flag: "olvido" }, forzable: true, fx: { Honor: 4, fama: -10, Voluntad: 2, rel: { corte: -4, athanar: -4, maelis: 3, club: 2 }, flag: "cristalEmitidoTarde" }, msg: "Lo emiten. Años tarde. Medio mundo ve el placaje de lado y el segundo antes. La corte retira tu nombre del Roble con una lima. Maelis lo ve y manda una hoja: 'Ya era hora'. Once campesinos te dan una palmada cada uno. Te doblan once veces." },
        { txt: "Diez segundos de silencio, mirando al cristal.", fx: { Voluntad: 2, fama: 5, rel: { aficion: 2 } }, msg: "Diez segundos de una elfa mirando un cristal sin decir nada. La Cristalvisión no sabe qué hacer con eso. Lo emite entero. Es lo más comentado de la temporada." },
      ] },
    finalNabos: { titulo: "La Copa de los Nabos", partido: { rival: "Los Segadores de Kleinfeld", fuerza: 2, torneo: "Copa de los Nabos" },
      texto: (pj) => `La final, en el campo de Grünburg, con Berta en la zona de anotación y dos mil personas, que es toda la comarca. ${pj.flags.linierosPlacan ? "Once campesinos que placan de frente." : ""} ${pj.flags.unoQueBaila ? "Jonas en la banda, bailando en el sitio." : ""} ${pj.flags.recetaParaTodos ? "Todos huelen a establo y a fiesta." : ""} Berthold en la banda con dos platos en una cesta. Poppy con el barril. Turno dieciséis. {marcador}. El balón en tus manos, la línea a cuatro pasos y un segador de Kleinfeld delante, grande, mirándote el cuello, porque ha visto el cristal.`,
      opciones: [
        { txt: "Bailar. Como hace trescientos años. Peor. Mejor.", tirada: { stat: "AG", obj: 9, riesgo: true,
          ok: { txt: "Bailas. Con las piernas que te quedan, con un tobillo remendado a la halfling, con barro hasta la rodilla. El segador cierra los brazos sobre nada. Cruzas con el silbato entre las patas de Berta. La Copa de los Nabos. Dos mil personas gritan sin ritmo. Berthold levanta la cesta con los dos platos. Es el mejor trofeo que has levantado, y no lo levantas tú.", fx: { fama: 20, Astucia: 2, gol: 1, rel: { club: 5, berthold: 4, poppy: 3, aficion: 5 }, flag: "copaNabos", flags: ["campeon"] } },
          ko: { txt: "Bailas y resbalas en un nabo, que es lo que hay en Sexta. El segador recoge el balón y anota con el silbato. La Copa es de Kleinfeld. Once campesinos te levantan del barro y dicen 'el año que viene'. Cenas. Sabes perder.", fx: { golRival: 1, rel: { club: 3, berthold: 2 } } } } },
        { txt: "Placar al segador de frente y que anote Hans.", req: { flag: "linierosPlacan" }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: true,
          ok: { txt: "Entras de frente con el hombro, mirándole. El segador cae. Hans, cien kilos, coge el balón que le pones y anda hasta la línea entre las patas de Berta. La Copa de los Nabos. Hans se queda parado en la zona de anotación sin saber qué hacer con las manos, otra vez, y esta vez dos mil personas le enseñan: en alto.", fx: { fama: 15, Honor: 3, gol: 1, rel: { club: 5, berthold: 4, aficion: 5 }, flag: "copaNabos", flags: ["campeon", "hansCopa"] } },
          ko: { txt: "Entras de frente y el segador, que ha visto el cristal, se echa a un lado como un elfo. Te pasa. Anota. La Copa es de Kleinfeld. Hans te levanta: 'El domingo que viene'. No hay domingo que viene. Da igual.", fx: { golRival: 1, rel: { club: 3 } } } } },
        { txt: "Mirarle el cuello. Que se lo crea. Y pasar por el otro lado.", req: { Astucia: 4 }, forzable: true, tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Le miras el cuello al segador, despacio, como en el cristal. El segador, que ha visto el cristal, se lleva las manos al cuello sin querer. Es medio segundo. Pasas por el otro lado con la bola. Cruzas. La Copa de los Nabos, ganada con lo que hiciste una vez sin hacerlo esta. Poppy, en la banda, se ríe con la boca llena: 'Ese segundo era tuyo'.", fx: { fama: 15, Astucia: 3, Honor: 1, gol: 1, rel: { club: 4, poppy: 4, berthold: 3, aficion: 4 }, flag: "copaNabos", flags: ["campeon", "copaConElSegundo"] } },
          ko: { txt: "Le miras el cuello. El segador no se lo cree: es de Kleinfeld, y en Kleinfeld no hay cristales. Te placa de frente, como le enseñaste a Hans. Anota. La Copa es suya. Hans dice: 'Bien placado'. Tiene razón.", fx: { golRival: 1, rel: { club: 2 } } } } },
        { txt: "Pasar a Jonas. La elfa pequeña.", req: { flag: "unoQueBaila" }, forzable: true, tirada: { stat: "AG", obj: 8, riesgo: false,
          ok: { txt: "Pasas a la banda, donde nadie mira a un chico de diecisiete años que baila mal. Jonas la coge sin que se note, esquiva a un segador que no sabía que se podía, y anota entre las patas de Berta. La Copa de los Nabos. Su madre llora. Berthold llora. Tú, por primera vez en trescientos años, también.", fx: { fama: 12, Honor: 3, gol: 1, rel: { club: 5, berthold: 3, aficion: 4 }, flag: "copaNabos", flags: ["campeon", "jonasCopa"] } },
          ko: { txt: "Pasas a Jonas. La mira. La coge. La suelta. Un segador la recoge y anota con el silbato. Jonas se sienta en el barro y esta vez no le levantas: le dejas un rato. Luego sí. 'Otra vez'.", fx: { golRival: 1, rel: { club: 2 } } } } },
      ] },

    /* ---------- 7. TRESCIENTOS AÑOS MÁS ---------- */
    bertholdMuere: { titulo: "Lo que dura un humano",
      texto: (pj) => `Pasan veinte años, que en un elfo no son nada y en un humano lo son todo. Berthold muere en el granero, en invierno, con sesenta y ocho años, ${pj.flags.copaNabos ? "con la Copa de los Nabos en la repisa" : "sin Copa en la repisa"} y dos platos en la mesa. Es la primera vez que ves morir a alguien a quien has querido. En trescientos años. Los elfos no saben qué hacer con eso. Tú tampoco. Hans, que ya tiene canas, te trae la cesta de los platos.`,
      opciones: [
        { txt: "Poner dos platos esa noche. Y todas.", fx: { Honor: 3, Voluntad: 1, rel: { berthold: 4, club: 3 }, flag: "dosPlatos" }, msg: "Pones dos platos. Uno para ti, otro para nadie, o para Marta y Berthold, que es lo mismo. Los pones cada noche durante el resto de tu vida, que es larga." },
        { txt: "Enterrarle en la zona de anotación. Con Berta.", fx: { Honor: 2, rel: { club: 4, aficion: 3 }, flag: "bertholdEnLaLinea" }, msg: "Le entierras en la zona de anotación, donde Berta rumia. Cada touchdown de los Charcos, desde entonces, se hace encima de él. Le habría gustado. Marta lo decía." },
        { txt: "Volver al bosque a llorarle. Los elfos lloran a los árboles.", fx: { Voluntad: 2, rel: { corte: 1 }, flag: "llorasteAlRoble" }, msg: "Vas al borde y le lloras a un sauce que no es de nadie. El sauce no dice nada. Dice todo. Vuelves a Grünburg con hojas en el pelo. Hans no pregunta." },
      ] },
    poppyVieja: { titulo: "Poppy, vieja",
      texto: (pj) => `Poppy Manteca tiene noventa años, que en una halfling es ser vieja de verdad, y sigue cocinando en Puerto Maren. Vas a verla. Está en un barril, comiendo, como el primer día. ${pj.flags.recetaPoppy ? "'El tobillo', dice, sin saludar. 'Todavía de cerdo'." : "'La elfa', dice, sin saludar."} Te sirve guiso. Te cuenta, entre cucharadas, que la receta de su abuela la sabe solo ella y que se va a morir.`,
      opciones: [
        { txt: "Pedirle la receta. Para los Charcos. Para siempre.", fx: { Astucia: 1, Honor: 2, rel: { poppy: 4, club: 2 }, flag: "recetaHeredada" }, msg: "Te la da. Escrita en una hoja de col. Huele a establo. La guardas con las hojas de Lirael. Los Charcos placan como carros durante cien años sin saber por qué." },
        { txt: "Comer. Hasta el final del guiso. Como la primera noche.", fx: { Honor: 2, Voluntad: 1, rel: { poppy: 4 }, flag: "ultimoGuiso" }, msg: "Comes. Poppy habla de su abuela, de cerdos, de un elfo que llegó a Puerto Maren con la cara de un cristal. Al acabar el guiso dice: 'Ya está. Ya sabes perder'. Muere ese invierno. Vas al entierro con dos platos." },
        { txt: "Llevarla a Grünburg. Que cocine para los Charcos lo que le quede.", req: { rel: ["poppy", 3] }, forzable: true, fx: { Honor: 3, rel: { poppy: 5, club: 3 }, flag: "poppyEnGrunburg" }, msg: "Se viene. Cocina para once campesinos y una elfa durante dos años, en el granero, con Berta mirando. Muere en la cocina, con el cucharón en la mano, y los Charcos la entierran junto a Berthold. Hay tres platos en la mesa esa noche." },
      ] },
    ultimoPartido: { titulo: "El último partido", partido: { rival: "Las Hojas de Ellorien", fuerza: 4 },
      texto: (pj) => `Las Hojas vuelven a Grünburg, ${pj.flags.volvisteALaCorte ? "y tú vienes con ellas, por última vez, a jugar contra los Charcos" : "'por caridad', otra vez, y esta vez sin Athanar: la corte ha dejado de mandar mensajes"}. Maelis es la capitana. Tiene ochenta años. Baila como tú bailabas y placa de frente, con el hombro, como no le enseñaste. ${pj.flags.jonasCopa ? "Jonas, cuarenta años ya, está en tu banda." : ""} Turno dieciséis. {marcador}. Tienes el balón y Maelis delante, mirándote no el cuello: los ojos.`,
      opciones: [
        { txt: "Pasar a Hans, viejo, que no ha anotado desde la Copa.", req: { flag: "hansCopa" }, forzable: true, fx: { Honor: 3, fama: 8, gol: 1, rel: { club: 4, aficion: 4, maelis: 2 }, flag: "paseFinal" }, msg: "Pasas a Hans, sesenta años, cien kilos, que anda hasta la línea entre once elfos perfectos que no le placan porque no saben qué es. Anota. Es su segundo touchdown en la vida y tu último pase. Maelis, en la banda, aplaude sin ruido. Es lo que hace la corte. Ella lo hace mejor." },
        { txt: "Bailar delante de tu hija. Una última vez.", tirada: { stat: "AG", obj: 10, riesgo: true,
          ok: { txt: "Bailas. Con lo que queda: unas piernas remendadas, un tobillo de cerdo, trescientos veinte años. Maelis baila. Es mejor que tú. Lo sabéis. Y aun así pierde la bola por un paso que le enseñaste en un sendero hace mucho. Cruzas. Y te quedas quieta en la zona de anotación, con la bola en alto, tanto rato que nadie sabe si bailas o si has terminado de bailar para siempre. Maelis lo sabe. Viene y se queda quieta a tu lado.", fx: { fama: 15, Voluntad: 2, gol: 1, rel: { aficion: 5, maelis: 5 }, flag: "ultimoTD" } },
          ko: { txt: "Bailas y Maelis, que es mejor que tú, te pasa con el paso que le enseñaste. Anota. Y no cruza la línea: se para un paso antes, con la bola, y te la devuelve. La corte, desde el carro, no entiende. Tú sí.", fx: { rel: { maelis: 5, aficion: 3 }, flag: "balonDevuelto" } } } },
        { txt: "Soltar el balón y salir del campo andando, antes del silbato, por la banda entera.", req: { Voluntad: 5 }, forzable: true, fx: { Voluntad: 2, Honor: 2, fama: 10, rel: { aficion: 4, maelis: 3, club: 3 }, flag: "salisteAndando" }, msg: "Sueltas la bola. Sales andando por la banda con el tobillo de cerdo. Dos mil personas se levantan y no gritan. Once elfos perfectos se apartan para dejarte pasar. Maelis te da la mano al pasar, y no la suelta hasta el granero." },
      ] },
    elRoble: { titulo: "Cantarle al Roble",
      texto: (pj) => `Vas al Roble, de noche, por última vez. ${pj.flags.confesaste || pj.flags.cristalEmitidoTarde ? "Tu nombre está limado de la corteza. Se ve el hueco." : "Tu nombre sigue en la corteza. No lo miras."} Las hojas se mueven sin viento. Tienes trescientos veinte años, dos platos en Grünburg, una Copa de los Nabos o un hueco en la repisa, y la mano de tu hija hace un rato. El Roble espera lo que esperan los robles: nada, o todo.`,
      opciones: [
        { txt: "Cantarle lo que hiciste. Entero. El segundo antes también.", fx: { Honor: 3, Voluntad: 2, rel: { corte: 1, maelis: 2 }, flag: "cantasteAlRoble" }, msg: "Le cantas el placaje de lado, el cristal, el olvido o la confesión, el granero, los platos. Sale rota. Una hoja se gira hacia ti. Solo una. Es suficiente." },
        { txt: "Tocar el hueco donde estaba tu nombre. Y dejarlo así.", req: { flag: "confesaste" }, forzable: true, fx: { Voluntad: 3, Honor: 1, flag: "huecoEnElRoble" }, msg: "Tocas el hueco. Está liso. Alguien, con una lima, hizo un trabajo cuidadoso. No lo quieres de vuelta. Maelis, que te ha seguido, pone la mano encima de la tuya." },
        { txt: "Sentarte contra el tronco hasta que amanezca, como se sienta uno contra un granero.", fx: { Voluntad: 2, rel: { berthold: 1, corte: 1 } }, msg: "Amanece. El Roble no ha dicho nada. Un pequeño de la corte salta un tronco cerca. Mal. Otra vez. No le dices nada. Le miras hasta que lo hace bien." },
      ] },
    retiro: { titulo: "Lo que queda",
      texto: (pj) => `Los elfos no se retiran: dejan de ser vistos. ${pj.flags.copaNabos ? "La Copa de los Nabos está en la repisa del granero, junto a los platos." : "En la repisa del granero hay dos platos y un hueco."} ${pj.flags.dosPlatos ? "Sigues poniendo dos platos." : ""} Maelis manda una hoja cada luna. Hans tiene nietos que juegan los domingos. Berta murió hace años; hay otra Berta. Queda decidir dónde pasas los siguientes trescientos años.`,
      opciones: [
        { txt: "Quedarte en Grünburg. Entrenar a los Charcos hasta que se acabe el pueblo.", fx: { Honor: 3, rel: { club: 5, berthold: 3, aficion: 3 }, flag: "finGrunburg" }, msg: "Te quedas. Entrenas a los Charcos durante trescientos años. Cambian los campesinos, las vacas, los nabos. Tú no. Cada domingo pones dos platos y enseñas a once humanos a placar de frente y a perder, que es lo que se hace entre victorias." },
        { txt: "Volver a la corte. Echar raíces junto al Roble. Quieta.", req: { rel: ["corte", 0] }, forzable: true, fx: { Voluntad: -2, rel: { corte: 4, maelis: 2 }, flag: "finRaices" }, msg: "Vuelves y te quedas quieta junto al Roble tanto tiempo que la corte deja de saber si bailas o si eres un árbol. Lo segundo. Los pequeños saltan tu raíz. Mal. Otra vez. Maelis viene cada luna y te cuenta los partidos." },
        { txt: "Irte con Maelis, fuera del bosque y del barro. A ver qué hay.", req: { rel: ["maelis", 4] }, forzable: true, fx: { Honor: 2, Ambición: 1, rel: { maelis: 5, corte: -2 }, flag: "finMaelis" }, msg: "Maelis deja las Hojas. Os vais por el camino de tierra, las dos, con una bolsa cada una y dos platos en la de ella. Jugáis en equipos que no salen en cristales, en ciudades que no conocéis, durante mucho tiempo. Nadie os pide diez segundos." },
        { txt: "Un partido más. Con los Charcos. Con lo que queda.", req: { Ferocidad: 4 }, forzable: true, fx: { Ferocidad: 1, fama: 10, rel: { club: 3, aficion: 3 }, flag: "finBarro" }, msg: "Juegas uno más. Y otro. Con las piernas que te quedan y un tobillo remendado, entre campesinos que te llaman 'la elfa' y no saben que fuiste otra cosa. Un domingo no te levantas de un placaje de frente, en un campo de nabos, y una Berta te huele la cara, y está bien." },
      ] },
  },
  epilogo: (pj, rasgo) => {
    const fin = pj.flags.finGrunburg ? "Entrenó a los Charcos trescientos años. Cuando el pueblo se acabó, seguía poniendo dos platos." :
      pj.flags.finRaices ? "Echó raíces junto al Roble. Los pequeños de la corte saltan su raíz y ella, desde dentro, les dice 'mal, otra vez'." :
      pj.flags.finMaelis ? "Se fue con Maelis por el camino de tierra. Nadie sabe dónde juegan. Juegan." :
      pj.flags.finBarro ? "Murió en un campo de nabos, de un placaje de frente, con una vaca oliéndole la cara. Le pareció bien." : "Nadie en la corte recuerda cómo acabó. En Grünburg sí.";
    return `${pj.nombre} fue ${rasgo}, y fue perfecta hasta que dejó de serlo. ${pj.flags.cuelloRoto ? "Le rompió el cuello a un orco en una final, a propósito, y lo supo." : pj.flags.cruzasteLimpia ? "Miró el cuello de un orco en una final y decidió que no." : "Pasó la bola en una final cuando podía no pasarla."} ${pj.flags.confesaste || pj.flags.cristalEmitidoTarde ? "Pidió que se viera. La corte le limó el nombre del Roble." : pj.flags.olvido ? "Aceptó que no hubiera pasado. Cada noche pasaba." : ""} ${pj.flags.copaNabos ? "Ganó la Copa de los Nabos con once campesinos y una vaca, y fue el mejor trofeo que levantó, y no lo levantó ella." : ""} ${pj.rel.maelis >= 4 ? "Maelis, su hija, aprendió de ella a bailar y a placar de frente, y a devolver un balón." : pj.rel.maelis <= 0 ? "Maelis, su hija, jugó para la Reina hasta que dejó de ser vista." : ""} ${pj.rel.berthold >= 3 ? "Puso dos platos cada noche hasta el final." : ""} ${pj.muertes > 0 ? `Murió ${pj.muertes + 1} veces; solo la última contó.` : ""} ${fin}`;
  },
  recuerdos: {
    cruzasteLimpia: "Miraste el cuello y decidiste que no.", cuelloRoto: "Un ruido que la corte no había oído nunca.", cuelloIntentado: "Quisiste. El cristal lo vio.", maelisAnoto: "Su primer touchdown ganó el Cáliz.", perdisteElCaliz: "El Cáliz se quedó en Gorgomor.",
    olvido: "Aceptaste que no hubiera pasado.", confesaste: "Pediste que se emitiera. Te limaron el nombre.", cristalRoto: "Rompiste un cristal contra el Roble.",
    quedasteEnLaCorte: "Bailaste dos partidos más y te fuiste andando.", teFuiste: "Las hojas se cerraron sin ruido.", dorsalAMaelis: "Maelis salió con tu dorsal. Lo viste desde los árboles.",
    maelisSeQueda: "Se quedó. Bailará contra ti.", pedisteAMaelis: "'No'. Como su madre.", pasoEnsenado: "Le enseñaste el paso que no se da.",
    cartelAceptado: "Tres metros de cara sobre la grada.", sinCartel: "Nada de carteles. Juegas o te vas.", bancoDelFondo: "El banco del desagüe, a propósito.",
    hojaViejaFuera: "Lirael guarda la hoja de las Hojas. 'Por si vuelves'.", liraelTePinta: "Cada partido, una hoja peor para la corte.", pintasteALirael: "La pintaste con los dedos, torcida.",
    placasteDeFrente: "Placaste de frente. Se notó la diferencia.", mirasteElCuello: "Le miraste el cuello a Caelith. Lirael no te pintó.",
    rechazasteUna: "La hoja sellada, sin abrir, pesa.", preguntasteElCuello: "'El que haga falta'. Caelith.", volvisteEnCythel: "Firmaste. Volviste. Bailaste trescientos años.",
    primeraDerrota: "Enanos. Primera vez en tres siglos.", perdisteDePie: "Perdiste de pie, mirando una caja.",
    chocasteConHumanos: "Chocar y quedarse. Lo segundo cuesta.", ensenasteABailar: "Un liniero esquivó y lloró.", escuchasteAPoppy: "'Perfecta no es algo que se pueda ser sin romper algo'.", poppyHerida: "Los halflings no guardan rencor. Guardan comida.", poppySegundo: "'Ese segundo es tuyo'.",
    chocasteYSeguiste: "Holt se quitó la gorra.", golpeToros: "Un ruido nuevo en tu cuerpo.", aprendisteElDolor: "Tres meses en un catre. Lo que saben los humanos a los seis.", tobilloVendado: "Ahora corres como cualquiera.", recetaPoppy: "Un tobillo de cerdo.",
    placasComoHumano: "Con el hombro, mirando al que placas.",
    segundoPlato: "Comiste del segundo plato.", vacaMovida: "Moviste a Berta. Berta volvió.", preguntastePorElla: "Marta sabía dónde ponía las botas cada uno.",
    linierosPlacan: "Once campesinos que placan de frente.", linierosCaen: "Aprendieron a caer. Media liga.", unoQueBaila: "Jonas, la elfa pequeña.", jonasAnoto: "Anotó entre las patas de Berta.", hansAnoto: "Su primer touchdown en once años de domingos.",
    noSabesPerder: "Te enseñaron los once. Se cena.", entrenasteDeNoche: "Corriste alrededor de los nabos hasta el sol.", platosConBerthold: "'Perder es lo que hacemos entre victorias'.",
    bailasteConMaelis: "Maelis se rió en un campo.", placasteAMaelis: "Le dolió el hombro por primera vez.", dejasteAMaelis: "Te apartaste. Ella anotó. Os abrazasteis.",
    rechazasteAtodo: "Dijiste que no delante de una vaca.", pedisteTiempo: "Hasta después de Mortaigne.", aceptasteAtodo: "Berthold puso un plato.",
    placasteAOldBones: "Le placaste. No le rompiste. Ya estaba roto.", rompisteAOldBones: "Berthold retiró un plato.",
    cartaAMaelis: "'Ya. Lo del segundo lo sabía. Te vi'.", silencioAMaelis: "La hoja, en la bota, antes de cada partido.", hojaAMaelis: "Tu derrota de pie, colgada en la corte.",
    quedasteEnElBarro: "'No'. Y el camino de tierra.", volvisteALaCorte: "Perfecto. Cada noche, un granero.", volvisteSinSilencio: "Le dijiste todo a la Reina. 'Mamá'.",
    recetaParaTodos: "Once campesinos que huelen a establo.", amanecerConBerthold: "'Gracias'. Sabes de qué.", bailasteDeNoche: "Lo mejor que bailaste. Lo vio una vaca.",
    cristalEmitidoTarde: "Años tarde. 'Ya era hora'.", copaNabos: "El mejor trofeo. No lo levantaste tú.", copaConElSegundo: "Ese segundo era tuyo.", hansCopa: "Hans, con las manos en alto.", jonasCopa: "Lloraste. Primera vez en trescientos años.",
    dosPlatos: "Dos platos cada noche, para siempre.", bertholdEnLaLinea: "Cada touchdown, encima de él.", llorasteAlRoble: "Le lloraste a un sauce que no es de nadie.",
    recetaHeredada: "En una hoja de col. Huele a establo.", ultimoGuiso: "'Ya sabes perder'.", poppyEnGrunburg: "Tres platos esa noche.",
    paseFinal: "Tu último pase fue el segundo touchdown de Hans.", ultimoTD: "Quieta con la bola en alto. Maelis a tu lado.", balonDevuelto: "Maelis se paró un paso antes y te la devolvió.", salisteAndando: "Maelis no te soltó la mano hasta el granero.",
    cantasteAlRoble: "Una hoja se giró. Solo una.", huecoEnElRoble: "El hueco, liso. La mano de Maelis encima.",
  },
};

const ELFO_ALIADOS = (pj, cap) => [
  { nombre: "Maelis", ST: 2, AG: 5, AV: 8, si: cap === 1 && pj.rel.maelis >= 1 },
  { nombre: "Las Hojas", ST: 3, AG: 5, AV: 8, si: cap === 1 || (cap >= 5 && (pj.flags.aceptasteAtodo || pj.flags.volvisteALaCorte || pj.flags.volvisteSinSilencio)) },
  { nombre: "Lirael", ST: 2, AG: 5, AV: 8, si: cap === 2 && pj.rel.lirael >= 1 },
  { nombre: "Caelith", ST: 3, AG: 5, AV: 8, si: cap === 2 && pj.flags.volvisteEnCythel },
  { nombre: "Los linieros de Holt", ST: 3, AG: 3, AV: 9, si: cap === 3 },
  { nombre: "Hans", ST: 4, AG: 1, AV: 9, si: cap >= 4 && !pj.flags.aceptasteAtodo },
  { nombre: "Jonas", ST: 2, AG: 3, AV: 8, si: cap >= 4 && pj.flags.unoQueBaila && !pj.flags.aceptasteAtodo },
  { nombre: "Los Charcos", ST: 3, AG: 2, AV: 9, si: cap >= 4 && !pj.flags.aceptasteAtodo },
];
const ELFO_TRANSICIONES = {
  2: (pj) => `Pasan dos días de camino y una temporada entera de Segunda. Cythel tiene espejos y una entrenadora que vende entradas. ${pj.flags.olvido ? "Nadie habla del cristal. Tú, cada noche." : pj.flags.confesaste ? "Medio mundo ha visto el cristal. Cythel vende el doble de entradas." : ""} ${pj.flags.maelisSeQueda ? "Maelis juega con las Hojas. Lo lees en la Cristalvisión: 'la hija de'. Es su apellido ahora." : ""} Aprendes lo que es un vestuario donde nadie te debe nada.`,
  3: (pj) => `Pasa el invierno en que Cythel te vende y dos días de carro hasta un puerto que huele a sal. ${pj.flags.perdisteDePie || pj.flags.primeraDerrota ? "Has perdido contra enanos por primera vez en tres siglos, y el cuerpo se acuerda." : ""} Los humanos de los Estibadores tienen cuarenta años y canas, y te miran como a un cuadro. Hay una halfling en un barril que te mira cada mañana. ${pj.flags.liraelTePinta ? "Las hojas de Lirael viajan contigo, enrolladas." : ""}`,
  4: (pj) => `Pasa una temporada en Cuarta y un verano en que Holt dice que ya sabes lo que él sabe. ${pj.flags.aprendisteElDolor ? "Sabes lo que cuesta un golpe. Lo sabías de otros." : pj.flags.tobilloVendado ? "Ahora corres como corre cualquiera. Ni más ni menos." : ""} Grünburg está a dos días, en Sexta, y es un campo de nabos con una vaca. ${pj.rel.poppy >= 3 ? "Poppy te despide con un bollo y una nota: 'Come'." : ""} Es lo más abajo que se puede jugar, y vas.`,
  5: (pj) => `Pasan dos temporadas en Sexta. ${pj.flags.linierosPlacan ? "Once campesinos placan de frente y los Charcos suben puestos en la tabla por primera vez en su historia." : "Los Charcos siguen siendo los Charcos, pero pierden menos."} Berthold pone dos platos. ${pj.flags.bailasteConMaelis ? "Maelis se rió en tu campo, y la corte lo sabe." : ""} Las Hojas van primeras en Primera. La Reina manda carros. Los carros traen ofertas y las ofertas, cada vez, son más baratas.`,
  6: (pj) => `${pj.flags.quedasteEnElBarro ? "Pasa un año en el que no llegan carros. Athanar no vuelve. Las hojas se cerraron." : pj.flags.volvisteALaCorte ? "Pasa un año en la corte. Perfecto. Cada noche, un granero." : "Pasa un año raro, entre la corte y el barro, sin ser de ninguno."} Los Charcos, con o sin ti, ganan la liga de Sexta por primera vez en su historia y llegan a la final de la Copa de los Nabos. Berthold manda una hoja. Poppy manda un barril.`,
  7: (pj) => `Pasan veinte años. Para un elfo, un parpadeo. Para los Charcos, dos generaciones de campesinos: Hans tiene canas, Jonas tiene hijos, Berta murió y hay otra Berta. ${pj.flags.copaNabos ? "La Copa de los Nabos está en la repisa del granero y ya nadie la limpia, que es como se guardan las cosas que importan." : ""} Berthold tiene sesenta y ocho años y le tiemblan las manos al poner los platos. Tú tienes trescientos veinte y no te tiembla nada. Es lo que da miedo.`,
};
const ELFO_ENTREACTOS = [
  { id: "espejosCythel", caps: [2], txt: "Bailar delante de los espejos de Cythel hasta que te reflejen.", fx: { stat: { AG: 1 }, Voluntad: 1 }, msg: "Bailas hasta que el espejo te devuelve algo que reconoces. Tarda. Es una elfa con barro en las botas." },
  { id: "hojasLirael", caps: [2, 3, 4, 5, 6, 7], txt: "Mirar las hojas de Lirael, una a una.", req: { rel: ["lirael", 1] }, fx: { Astucia: 1, rel: { lirael: 1 } }, msg: "Miras las hojas. En cada una eres menos perfecta y más algo. No sabes qué. Lirael sí." },
  { id: "muelle", caps: [3], txt: "Correr por el muelle al amanecer, con la halfling mirando.", fx: { stat: { MA: 1 }, rel: { poppy: 1 } }, msg: "Corres. Poppy come. Al cuarto día te da un bollo. Al décimo, un consejo." },
  { id: "chocarHolt", caps: [3, 4], txt: "Chocar con los linieros de Holt hasta que te quedes de pie.", fx: { stat: { AV: 1 }, rel: { club: 1 } }, msg: "Chocas. Caes. Chocas. Caes menos. A la décima te quedas de pie y Holt no dice nada, que es su forma." },
  { id: "guisoPoppy", caps: [3, 4, 5, 6], txt: "Cenar con Poppy. Escuchar.", req: { rel: ["poppy", 1] }, fx: { Honor: 1, rel: { poppy: 2 } }, msg: "Poppy cocina y habla. Aprendes más de ti en un guiso que en trescientos años de corte." },
  { id: "platos", caps: [4, 5, 6, 7], txt: "Poner los platos con Berthold.", req: { rel: ["berthold", 1] }, fx: { Honor: 1, rel: { berthold: 2 } }, msg: "Pones los platos. Berthold no habla de Marta. Tú no hablas del cristal. Es una conversación." },
  { id: "nabosNoche", caps: [4, 5, 6, 7], txt: "Bailar sola en el campo de nabos, de noche, con Berta.", fx: { stat: { AG: 1 }, Voluntad: 1 }, msg: "Bailas para una vaca. Es el mejor público que has tenido: no espera nada." },
  { id: "campesinos", caps: [4, 5, 6, 7], txt: "Enseñar a los once a placar de frente, otra vez.", fx: { stat: { ST: 1 }, rel: { club: 2 } }, msg: "Placan. Mal, con ganas. Tú placas con ellos para enseñar. Se te pone el hombro de humano." },
  { id: "hojaMaelis", caps: [2, 3, 4, 5, 6, 7], txt: "Escribir una hoja a Maelis.", fx: { rel: { maelis: 2 }, Honor: 1 }, msg: "Le escribes tres líneas. Contesta con una. Es larga, para elfas." },
  { id: "descanso", caps: [6, 7], txt: "No hacer nada. Dormir. Curar el tobillo de cerdo.", fx: { Voluntad: 1, rel: { club: 1 } }, msg: "Duermes bajo un sauce hasta que cambia la luna. Berta te huele la cara al despertar." },
];
const ELFO_TIEMPO = {};

/* ====================== INTERLUDIOS Y ARCOS PROPIOS ====================== */

/* ---------- HUMANO ---------- */
Object.assign(HUMANO.escenas, {
  invierno: { titulo: "El invierno del Matadero",
    texto: (pj) => `El invierno en que cumples ocho años el Val se hiela y el matadero cierra dos semanas. No hay carne, no hay peniques, y tu madre, Marta, estira una sopa de huesos cuatro días. Liese, con cuatro años, aprende a contar con los dientes que le faltan a tu padre. Una noche te despiertas y él está sentado a oscuras, mirando sus manos.${pj.flags.mazo ? " Sabes lo que piensa: que el mazo pesa menos que la sopa." : ""}`,
    opciones: [
      { txt: "Sentarte con él, sin decir nada.", fx: { Voluntad: 1, rel: { familia: 2 }, flag: "silencioPadre" }, msg: "Os quedáis los dos a oscuras hasta que amanece. No dice nada. Tú tampoco. Es la conversación más larga que tendréis." },
      { txt: "Darle tu pan a Liese y decir que no tienes hambre.", fx: { Honor: 2, rel: { familia: 2 }, flag: "panLiese" }, msg: "Liese se lo come mirándote. Tu madre lo ve y aparta la cara. Tú aprendes lo que pesa el hambre cuando es de otro." },
      { txt: "Salir a la calle a buscar algo que vender.", fx: { Astucia: 1, Ambición: 1, oro: 3 }, msg: "Vuelves con tres peniques y un carámbano. Nadie pregunta de dónde. Aprendes que la ciudad siempre tiene algo si sabes mirar." },
    ] },
  muroVacio: { titulo: "El muro vacío",
    texto: (pj) => `Un día Ernst no viene al muro. Ni al siguiente. Lo encuentras en la pensión del Puente, en un catre, con la placa silbando cada vez que respira. ${pj.rel.ernst >= 3 ? "Te reconoce antes de abrir los ojos. 'Has llegado tarde a caer', dice, y se ríe hasta toser." : "Tarda en reconocerte. 'El del muro', dice al fin."} Tiene un cromo viejo bajo la almohada: él, hace veinte años, con dos piernas.`,
    opciones: [
      { txt: "Quedarte hasta el final.", fx: { Honor: 2, Voluntad: 1, rel: { ernst: 3 }, flag: "placaErnst", flags: ["ernstMuerto"] }, msg: "Muere de madrugada, sin ruido. Te deja la placa. Pesa más de lo que parece. La llevas en la bota el resto de tu vida." },
      { txt: "Pedirle que te enseñe una última cosa.", req: { rel: ["ernst", 2] }, forzable: true, fx: { Astucia: 1, stat: { AG: 1 }, rel: { ernst: 2 }, flag: "ultimaLeccion", flags: ["ernstMuerto"] }, msg: "'Cuando llegue el golpe, no estés'. Te lo dice tres veces. La cuarta ya no respira. Nunca vuelves a estar donde llega el golpe." },
      { txt: "Ir a los Halcones a decir que uno de los suyos se muere solo.", fx: { Ambición: 1, Honor: 1, fama: 3, rel: { ernst: 1 }, flags: ["ernstMuerto"] }, msg: "El portero del estadio no sabe quién es Ernst. Lo dices en voz alta hasta que alguien lo apunta. Un carro lleva su cuerpo al cementerio del club. Le hacen una placa. Otra." },
    ] },
  nocheGranero: { titulo: "La noche del granero",
    texto: (pj) => `Una noche de lluvia, Grimm no puede dormir por la placa y tú tampoco por la vaca. Os sentáis en la puerta del granero. Te cuenta sus tres partidos en Primera, jugada a jugada, como quien cuenta un funeral. ${pj.flags.robo ? "Luego te pregunta, sin mirarte, por qué nunca hablas de tu padre." : pj.flags.bizco ? "Luego te pregunta, sin mirarte, qué llevabas en los paquetes del puerto." : "Luego te pregunta, sin mirarte, qué te trajo aquí."}`,
    opciones: [
      { txt: "Contarle la verdad. Toda.", fx: { Honor: 2, Voluntad: 1, rel: { grimm: 3 }, flag: "grimmLoSabe" }, msg: "Se lo cuentas. Grimm no dice nada en un rato. Luego: 'Yo maté a un liniero en mi segundo partido. Sin querer. No se lo he dicho a nadie'. Ahora os debéis un secreto." },
      { txt: "Preguntarle si duele todavía.", fx: { Astucia: 1, rel: { grimm: 2 } }, msg: "'La placa no. Lo otro sí'. No te dice qué es lo otro. No hace falta." },
      { txt: "Escribir a Liese esa misma noche, a la luz del farol.", fx: { rel: { familia: 2 }, flag: "cartaGranero" }, msg: "Le escribes sobre Grimm y la vaca y la lluvia. No le cuentas que tienes miedo. Ella lo lee entre líneas y te contesta que también." },
    ] },
  laCasa: { titulo: "La casa del Matadero",
    texto: (pj) => `Te dan dos días entre partidos y los gastas en el camino a Valdoria. La casa es más pequeña de lo que recordabas. Tu madre está en la cama y tose como escribió Liese. Liese ya no es una niña: tiene las manos de tu padre y ${pj.flags.panLiese ? "te recibe con un trozo de pan, sin decir por qué" : pj.rel.familia <= 1 ? "te mira como a un desconocido con botas caras" : "te abraza como si pesaras"}. Mañana tienes partido. El carruaje sale al alba.`,
    opciones: [
      { txt: "Quedarte. Que jueguen sin ti.", fx: { Honor: 3, fama: -10, rel: { familia: 4, club: -2 }, flag: "quedasteConMadre", flags: ["madreMuerta"] }, msg: "Te quedas tres días. La tercera noche tu madre se muere con la mano en tu brazo, sin ruido, como todo lo que hacía. Liese te encuentra así al amanecer. El club te multa. No te importa." },
      { txt: "Pagar al mejor apotecario de la ciudad y volver al alba.", req: { oro: 50 }, fx: { oro: -50, rel: { familia: 2 }, flag: "apotecarioMadre" }, msg: "El apotecario tiene títulos de Norburgo y manos frías. Tu madre vive dos años más. Los dos te preguntas, cada vez, si fueron los cincuenta oros o la mano." },
      { txt: "Llevar a Liese al partido. Que vea lo que eres.", fx: { Ambición: 1, rel: { familia: 2, aficion: 1 }, flag: "lieseEnLaGrada" }, msg: "Liese te ve desde la grada de los pobres, donde te colabas tú. Al acabar no habla de la jugada: habla de cómo te levantaste después." },
    ] },
  elDesague: { titulo: "El desagüe",
    texto: (pj) => `La noche antes de la final bajas al desagüe por donde te colabas a los diez años. Está igual: la reja doblada, el olor. Hay un niño dentro, con una vejiga de cerdo bajo el brazo, aguantando la respiración para que no le oigas. ${pj.flags.placaErnst ? "Notas la placa de Ernst en la bota." : ""} ${pj.flags.lieseEnLaGrada ? "Es de tu barrio: tiene el acento del Matadero." : ""}`,
    opciones: [
      { txt: "Sentarte con él y contarle quién es Ernst.", fx: { Honor: 2, rel: { aficion: 2 }, flag: "chicoDesague" }, msg: "Le hablas del viejo de la placa hasta que se queda dormido. Al día siguiente, en la final, lo ves en la grada de los pobres, agarrado a la valla." },
      { txt: "Darle la placa de Ernst.", req: { flag: "placaErnst" }, forzable: true, fx: { Honor: 3, Voluntad: 1, rel: { ernst: 2, aficion: 2 }, flag: "placaEntregada" }, msg: "Le pones la placa en la mano. Pesa más de lo que parece. 'Cuando llegue el golpe, no estés', le dices. No entiende. Entenderá." },
      { txt: "Dejarle pasar y hacer como que no le has visto.", fx: { Astucia: 1, rel: { aficion: 1 } }, msg: "Sigues tu camino. El niño se cuela. Al día siguiente, en la final, no sabes cuál de los sesenta mil es, y por eso juegas para todos." },
    ] },
});
HUMANO.capitulos[0].escenas.splice(2, 0, "invierno");
HUMANO.capitulos[1].escenas.splice(1, 0, "muroVacio");
HUMANO.capitulos[2].escenas.splice(2, 0, "nocheGranero");
HUMANO.capitulos[3].escenas.splice(3, 0, "laCasa");
HUMANO.capitulos[4].escenas.splice(2, 0, "elDesague");
HUMANO.recuerdos = {
  mazo: "Todo lo que pesa más que tú cae igual.", bizco: "Tres noches de paquetes en el puerto.", robo: "La caja del matadero. Tu padre lo supo.",
  deudaKurt: "Kurt pagó la fiebre de Liese. 'Me lo debes'.", silencioPadre: "Una noche entera a oscuras con tu padre.", panLiese: "Tu pan, en las manos de Liese.",
  placaErnst: "La placa de Ernst, en tu bota.", ultimaLeccion: "'Cuando llegue el golpe, no estés'.", brauer: "Brauer cayó como una res.",
  favorGrimm: "Grimm te enseñó. Le debes un partido.", grimmLoSabe: "Grimm sabe la verdad. Tú sabes la suya.", cartaGranero: "Una carta a Liese bajo la lluvia.",
  quedasteConMadre: "Tres días con tu madre. El club te multó.", apotecarioMadre: "Cincuenta oros y unas manos frías.", lieseEnLaGrada: "Liese te vio levantarte.",
  kurtCaido: "Kurt en el barro, sin levantarse.", dejasteKurt: "Te apartaste. Kurt anotó.", chicoDesague: "Un niño en el desagüe, con una vejiga.", placaEntregada: "La placa de Ernst, en otra mano.", campeon: "El Cáliz de Barro.",
};

/* ---------- ENANO ---------- */


/* ---------- ORCO ---------- */


/* ---------- ELFO ---------- */


/* ====================== MOTOR ====================== */

const d6 = () => 1 + Math.floor(Math.random() * 6);

/* ====================== AMPLIACIÓN: QUINTA DIVISIÓN Y EL OCASO ====================== */

/* ---------- HUMANO ---------- */
Object.assign(HUMANO.escenas, {
  vestuarioFinalH: { titulo: "El vestuario, después",
    texto: (pj) => `El vestuario huele a barro, a cerveza y a lo que sea que echen los Halcones al agua de las duchas. ${pj.flags.campeon ? "El Cáliz está en el centro, sobre un banco, abollado. Nadie lo ha limpiado." : "No hay Cáliz. Hay silencio, y alguien que llora en las duchas sin querer que se oiga."} ${pj.flags.kurtCaido ? "Kurt no ha venido a daros la mano. La prensa, en el pasillo, ya te llama carnicero." : pj.flags.dejasteKurt ? "Kurt te ha buscado antes de irse: 'No sé si darte las gracias o pegarte'. Las dos cosas." : pj.flags.paseFinal ? "Tobias no suelta el balón de su primer touchdown. Lo mira como si no fuera suyo." : ""}`,
    opciones: (pj) => [
      { txt: "Sentarte en el banco y no decir nada, con el equipo.", fx: { Honor: 1, Voluntad: 1, rel: { club: 2 } }, msg: "Os quedáis en silencio hasta que llega el frío. No hace falta hablar. Es la primera vez que sientes que este es tu sitio." },
      { txt: "Ir a buscar a Kurt al pasillo.", req: { rel: ["kurt", -1] }, forzable: true, fx: { Honor: 2, rel: { kurt: 2 } }, msg: "Le encuentras poniéndose el abrigo. No decís gran cosa. Al final: 'Nos vemos el año que viene'. Es más de lo que esperabas." },
      { txt: "Salir a la grada vacía y mirar el desagüe por el que te colabas.", fx: { Voluntad: 2, rel: { aficion: 1 } }, msg: "La grada de los pobres, a oscuras. La reja doblada sigue ahí. Piensas en el niño que fuiste y en el que dejaste pasar la última vez que bajaste. Vuelves al vestuario con algo resuelto." },
    ] },
  anselm: { titulo: "El liniero que ronca",
    texto: (pj) => `Tu primer compañero de cuarto en Puerto Maren es Anselm, un liniero de Norburgo con manos de estibador y un ronquido que hace vibrar la ventana. No sabe leer. Tiene una hija en Norburgo a la que manda la mitad del sueldo y un dibujo de ella clavado en la pared con un clavo de herradura. ${pj.flags.cartaGranero ? "Te ve escribir una carta y se queda mirando." : "La primera noche te pregunta si sabes escribir."}`,
    opciones: [
      { txt: "Escribirle la carta a su hija. Y todas las que hagan falta.", fx: { Honor: 2, rel: { club: 2 }, flag: "cartasAnselm" }, msg: "Le escribes una carta cada semana. Él dicta despacio, mirando el dibujo. Firmas por él con una cruz que te enseña a hacer igual que la suya." },
      { txt: "Enseñarle a leer, con el cromo de Ernst como cartilla.", req: { flag: "placaErnst" }, forzable: true, fx: { Astucia: 1, Honor: 1, rel: { club: 2, ernst: 1 }, flag: "anselmLee" }, msg: "Tarda un invierno. La primera palabra que lee entera es 'Halcón'. La segunda, el nombre de su hija." },
      { txt: "Pedirle que cambie de cuarto. No has venido a hacer amigos.", fx: { Ambición: 1, rel: { club: -2 } }, msg: "Cambia sin protestar. Duermes bien. En el campo, cuando caes, es el primero en llegar igual. Nunca sabes por qué." },
    ] },
  primeroQuinta: { titulo: "El primer partido en Quinta", partido: { rival: "Los Toros Rojos de Norburgo", fuerza: 2 },
    texto: (pj) => `Quinta huele distinto: hay grada de verdad, un vendedor de salchichas y un árbitro con silbato en vez de con nabo. Los Toros de Norburgo son grandes y lentos. ${pj.flags.cartasAnselm ? "Anselm juega contra su ciudad y no ha dormido." : "Anselm está a tu lado en la línea, roncando despierto."} Primer turno: su capitán viene a por el balón, que tienes tú.`,
    opciones: [
      { txt: "Entregar el balón a Anselm y bloquear tú al capitán.", tirada: { stat: "ST", obj: 9, riesgo: true,
        ok: { txt: "Frenas al capitán con todo el cuerpo. Anselm, con el balón, avanza como un carro. Anota. Se queda mirando la grada de Norburgo hasta que le empujan.", fx: { fama: 8, Honor: 1, gol: 1, rel: { club: 3, aficion: 2 } } },
        ko: { txt: "El capitán te pasa por encima y le cae a Anselm con el balón. Los dos en el suelo. Norburgo anota.", fx: { golRival: 1 } } } },
      { txt: "Correr tú por la banda, como te enseñó Ernst.", tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "No estás donde llega el golpe. Nunca. Cruzas por la banda y anotas. Anselm te levanta en brazos, que es peligroso.", fx: { fama: 8, Astucia: 1, gol: 1, rel: { aficion: 2 } } },
        ko: { txt: "Estás justo donde llega el golpe. Sueltas el balón. Norburgo anota y el vendedor de salchichas se ríe.", fx: { golRival: 1 } } } },
    ] },
  laLesion: { titulo: "La rodilla",
    texto: (pj) => `Un placaje tardío, sin balón, con el árbitro mirando al vendedor de salchichas. ${pj.flags.brauer && pj.flags.brauerOjeador ? "Desde la banda, Brauer no aparta la vista. Sonríe con la nariz torcida: ha cobrado." : ""} La rodilla suena como una rama. El apotecario del club dice tres meses; el entrenador dice tres semanas; Kurt, capitán, dice que hay un chico de Talvia que juega tu posición. ${pj.flags.cartasAnselm || pj.flags.anselmLee ? "Anselm te sube la comida al cuarto cada noche y no ronca hasta que te duermes tú." : "Nadie sube al cuarto."}`,
    opciones: [
      { txt: "Jugar a las tres semanas, con la rodilla vendada.", fx: { Voluntad: 2, fama: 5, stat: { MA: -1 }, rel: { club: 2, kurt: 1 }, flag: "rodillaVendada" }, msg: "Juegas. Aguantas. La rodilla no vuelve a ser la misma, pero el chico de Talvia se vuelve a Talvia. Kurt te mira raro: respeto, o cálculo." },
      { txt: "Los tres meses enteros. Que juegue el de Talvia.", fx: { Honor: 1, Astucia: 1, fama: -5, rel: { club: -1 }, flag: "rodillaCurada" }, msg: "Tres meses mirando el techo. El de Talvia es bueno. Vuelves entero y le quitas el puesto en dos partidos. Él no te odia. Debería." },
      { txt: "Pagar a un curandero del puerto que no pregunta.", req: { oro: 40 }, fx: { oro: -40, Honor: -1, stat: { AV: 1 }, flag: "curanderoPuerto" }, msg: "El curandero huele a pescado y a otra cosa. Te unta algo que arde. A la semana corres. La piel de la rodilla es de otro color y no te duele nada. Nada. Es sospechoso." },
    ] },
  muerteAnselm: { titulo: "Lo que pesa un liniero",
    texto: (pj) => `Contra los Cuervos de Mortaigne, Anselm entra a placar y no se levanta. Nadie oye el golpe: la grada está cantando. Cuando llega el apotecario ya no hace falta. ${pj.flags.cartasAnselm ? "En su taquilla hay una carta a medio dictar. Sabes cómo sigue." : pj.flags.anselmLee ? "En su taquilla está el cromo de Ernst con el que aprendió a leer." : "En su taquilla hay un dibujo de una niña, clavado con un clavo de herradura."} El de Mortaigne que lo hizo se llama Bastien y se ríe en la banda.`,
    opciones: [
      { txt: "Llevar tú sus cosas a Norburgo. A su hija.", fx: { Honor: 3, Voluntad: 1, fama: -3, rel: { club: 3, familia: 1 }, flag: "hijaAnselm", flags: ["anselmMuerto"] }, msg: "Dos días de camino con una bolsa que pesa poco. La niña tiene los ojos de Anselm y no llora. Le lees la última carta. Le dejas tu dirección. Te escribe cada mes hasta que te retiras." },
      { txt: "Escribir el nombre de Bastien y esperar.", fx: { Ferocidad: 2, Astucia: 1, rel: { club: 2 }, flag: "bastien", flags: ["anselmMuerto"] }, msg: "Lo escribes en la pared, junto al dibujo. Kurt lo ve y no dice nada. Volveréis a jugar contra Mortaigne en tres semanas." },
      { txt: "Beber hasta olvidar su ronquido.", fx: { Voluntad: -1, Honor: -1, rel: { club: -1 }, flag: "bebiste", flags: ["anselmMuerto"] }, msg: "No se olvida. Lo peor es el silencio en el cuarto. Kurt te saca de la taberna la tercera noche y te dice que pierdes el puesto si vuelves. No vuelves." },
    ] },
  porAnselm: { titulo: "Mortaigne", partido: { rival: "Los Cuervos de Mortaigne", fuerza: 3 },
    texto: (pj) => `Los Cuervos de Mortaigne vuelven a Puerto Maren tres semanas después. Bastien es su blitzer y lleva el número de Anselm pintado en el casco, por gracia. ${pj.flags.bastien ? "Su nombre sigue en tu pared." : pj.flags.hijaAnselm ? "Su hija te ha escrito: 'No hagas nada que no haría él'." : ""} Turno 8. Bastien tiene el balón y viene por tu lado. Kurt grita que le dejes.`,
    opciones: [
      { txt: "Entrar a matar.", tirada: { stat: "ST", obj: 10, riesgo: true,
        ok: { txt: "El choque se oye por encima del canto de la grada, que se calla. Bastien no se levanta. Alguien le quita el casco con el número de Anselm y lo tira a la grada. Nadie lo devuelve.", fx: { fama: 12, Ferocidad: 2, gol: 1, rel: { club: 3, aficion: 3, kurt: -1 }, flag: "bastienCaido" } },
        ko: { txt: "Entras. Bastien no cae. Tú sí. Te pasa por encima y anota, y te mira con el número de Anselm en la frente.", fx: { golRival: 1, rel: { club: -1 } } } } },
      { txt: "Quitarle el balón sin tocarle, como haría Anselm. No: como haría Ernst.", tirada: { stat: "AG", obj: 9, riesgo: false,
        ok: { txt: "No estás donde llega el golpe. Estás donde está el balón. Se lo quitas de las manos y cruzas. Bastien se queda mirando sus manos vacías con el número de Anselm en la frente.", fx: { fama: 10, Astucia: 1, Honor: 1, gol: 1, rel: { club: 2, aficion: 2, ernst: 1 } } },
        ko: { txt: "Vas al balón. Bastien va a tu cara. Anota. El número de Anselm cruza la línea en su casco.", fx: { golRival: 1 } } } },
      { txt: "Hacerle una falta cuando caiga. Que no se levante.", req: { flag: "bastien" }, forzable: true, tirada: { stat: "ST", obj: 8, riesgo: false, falta: true,
        ok: { txt: "Cae en una jugada normal y tú estás allí. El árbitro está mirando al vendedor de salchichas, como siempre. Bastien no vuelve a jugar. Tu pared queda limpia. Tú no.", fx: { Honor: -2, Ferocidad: 2, fama: 5, gol: 1, rel: { club: 2, aficion: 1 }, flag: "bastienRoto" } },
        ko: { txt: "El árbitro, por una vez, mira. Expulsado. Bastien anota sin ti y te saluda desde la línea.", fx: { Honor: -1, golRival: 1, expulsion: true } } } },
    ] },
  elJoven: { titulo: "El chico del Matadero",
    texto: (pj) => `Fichan a un chico de tu barrio. Se llama Tobias, tiene diecisiete años, las manos de un matarife y corre como tú corrías. Te mira como tú mirabas a Ernst. ${pj.flags.chicoDesague ? "Es el niño del desagüe. Ha crecido." : ""} El entrenador le da tu posición en los entrenamientos 'para ir viendo'.`,
    opciones: [
      { txt: "Enseñarle todo. Lo de Ernst, lo de Grimm, lo tuyo.", fx: { Honor: 3, rel: { club: 2, aficion: 1 }, flag: "tobiasEnsenado" }, msg: "Le enseñas a no estar donde llega el golpe, a leer el choque, a caer. Aprende más rápido que tú. Es lo que duele y lo que importa." },
      { txt: "Quitarle el puesto en el próximo partido. Que aprenda mirando.", req: { Ferocidad: 4 }, forzable: true, fx: { Ferocidad: 1, Ambición: 1, fama: 5, rel: { club: -1 }, flag: "tobiasHumillado" }, msg: "Le ganas el puesto en un partido y lo celebras delante de él. Tobias no vuelve a mirarte como a Ernst. Te mira como tú mirabas a Kurt." },
      { txt: "Pedirle que te lleve a ver a tu madre. Ya no puedes solo.", req: { Voluntad: 4, noflag: "madreMuerta" }, forzable: true, fx: { Voluntad: 1, Honor: 1, rel: { familia: 3 }, flag: "tobiasYMadre" }, msg: "Tobias te sube por la escalera del Matadero como Anselm te subía la comida. Tu madre, que vive de milagro y de apotecario, le confunde contigo. No lo corriges." },
      { txt: "Pedirle que te lleve al cementerio de los pobres, con tu madre y tu padre.", req: { Voluntad: 4, flag: "madreMuerta" }, forzable: true, fx: { Voluntad: 1, Honor: 1, rel: { familia: 2 }, flag: "tobiasYTumba" }, msg: "Tobias te lleva y se queda a la puerta, como se hace. Liese ha dejado flores. Le dices a la piedra que el chico corre como tú corrías. No sabes si eso es bueno." },
    ] },
  lasRodillas: { titulo: "Lo que no vuelve",
    texto: (pj) => `Un día no puedes subir la escalera del vestuario sin pararte. El apotecario del club te ofrece 'una inyección de Norburgo' que quita el dolor un año y luego, dice, 'ya se verá'. ${pj.flags.rodillaVendada ? "La rodilla vendada de Puerto Maren es la primera en rendirse." : ""} Kurt, que ya es entrenador de Talvia, te ha escrito por primera vez en veinte años.`,
    opciones: [
      { txt: "La inyección. Un año más.", fx: { stat: { MA: 1 }, Honor: -1, Voluntad: -1, flag: "inyeccion" }, msg: "Un año sin dolor. Corres como a los veinte. El apotecario no vuelve a mirarte a los ojos, que es la parte de 'ya se verá'." },
      { txt: "Leer la carta de Kurt.", fx: { Honor: 1, rel: { kurt: 3 }, flag: "cartaKurt" }, msg: "Kurt escribe mal y corto. 'Me duelen las mismas rodillas. Ven a Talvia cuando acabes. Tengo sitio'. Es lo más largo que te ha dicho nunca." },
      { txt: "Aguantar con lo que hay.", fx: { Voluntad: 3, rel: { aficion: 1 } }, msg: "Subes la escalera parándote. Cada día. El público lo nota y te aplaude al subir, que es humillante y hermoso." },
    ] },
  ultimoPartido: { titulo: "El último partido", partido: { rival: "Las Picas de Talvia", fuerza: 3 },
    texto: (pj) => `Nadie ha dicho que sea el último, pero lo sabéis todos. Contra Talvia, que entrena Kurt Vogel desde la banda, con las manos en los bolsillos. ${pj.flags.tobiasEnsenado ? "Tobias juega a tu lado. Es mejor que tú. Le has enseñado tú." : pj.flags.tobiasHumillado ? "Tobias juega en Talvia. Kurt lo fichó. Claro." : ""} Último turno, empate, el balón en tus manos y la rodilla diciendo que no.`,
    opciones: [
      { txt: "Pasársela a Tobias.", req: { flag: "tobiasEnsenado" }, forzable: true, fx: { Honor: 3, fama: 5, gol: 1, rel: { club: 3, aficion: 3 }, flag: "paseFinal" }, msg: "Se la pasas. Anota. Es su primer touchdown y tu último pase. Kurt, en la banda, se quita las manos de los bolsillos y aplaude. A él o a ti. A los dos." },
      { txt: "Ir tú. Una última vez.", tirada: { stat: "MA", obj: 9, riesgo: true,
        ok: { txt: "La rodilla aguanta un turno más. Cruzas. Te caes en la zona de anotación y no te levantas porque no quieres. Sesenta mil personas y Kurt Vogel te ven ahí tumbado, riéndote.", fx: { fama: 15, Voluntad: 2, gol: 1, rel: { aficion: 4, kurt: 2 }, flag: "ultimoTD" } },
        ko: { txt: "La rodilla dice que no. Caes a un metro de la línea. Un jugador de Talvia coge el balón y no anota: te lo devuelve. Kurt le ha dicho algo desde la banda.", fx: { golRival: 0, rel: { kurt: 3, aficion: 2 }, flag: "balonDevuelto" } } } },
      { txt: "Dejar caer el balón y salir del campo andando, antes del silbato.", req: { Voluntad: 5 }, forzable: true, fx: { Voluntad: 2, Honor: 2, fama: 10, rel: { aficion: 4, kurt: 2 }, flag: "salisteAndando" }, msg: "Sueltas el balón. Sales andando por la banda con la rodilla rígida. La grada se levanta y no grita. Kurt te da la mano al pasar. El partido acaba en empate y nadie lo recuerda así." },
    ] },
  laTumba: { titulo: "El cementerio del club",
    texto: (pj) => `Después del último partido vas al cementerio de los Halcones, donde enterraron a Ernst. ${pj.flags.placaEntregada ? "Su placa la tiene otro. Está bien." : pj.flags.placaErnst ? "Su placa sigue en tu bota." : ""} ${pj.flags.hijaAnselm ? "La hija de Anselm ha venido. Tiene los ojos de su padre y un hijo que ronca." : ""} Hay flores de alguien que no conoces.`,
    opciones: [
      { txt: "Dejar tu cromo sobre la tumba.", fx: { Honor: 2, rel: { ernst: 2, aficion: 1 }, flag: "cromoEnTumba" }, msg: "Lo dejas apoyado en la piedra. A la semana ya no está. Alguien lo cambia por tres de Kurt, o lo guarda. Prefieres lo segundo." },
      { txt: "Contarle a Ernst que no estuviste donde llegaba el golpe.", req: { flag: "ultimaLeccion" }, forzable: true, fx: { Voluntad: 2, Honor: 1, rel: { ernst: 3 }, flag: "leDijisteAErnst" }, msg: "Se lo cuentas en voz alta. La placa silba en tu bota con el viento, o te lo parece. Es la conversación más larga que habéis tenido." },
      { txt: "Sentarte sin decir nada hasta que cierren.", fx: { Voluntad: 2, rel: { familia: 1 } }, msg: "Cierran al anochecer. El guarda te conoce del cromo y te deja un rato más. Al salir, en la puerta, un niño con una vejiga de cerdo te pregunta si tú eres tú. Le dices que fuiste." },
    ] },
});
HUMANO.capitulos = [
  HUMANO.capitulos[0], HUMANO.capitulos[1], HUMANO.capitulos[2],
  { id: 4, titulo: "Quinta División", sub: "Los Estibadores de Puerto Maren", escenas: ["anselm", "primeroQuinta", "laLesion", "muerteAnselm", "porAnselm"] },
  { ...HUMANO.capitulos[3], id: 5 },
  { ...HUMANO.capitulos[4], id: 6, escenas: [...HUMANO.capitulos[4].escenas.filter((e) => e !== "retiro"), "vestuarioFinalH"] },
  { id: 7, titulo: "El ocaso", sub: "Lo que no vuelve", escenas: ["elJoven", "lasRodillas", "ultimoPartido", "laTumba", "retiro"] },
];
Object.assign(HUMANO.recuerdos, { campeonLeyendo: "El troll giró medio cuerpo, como decía Grimm.", ernstMuerto: "Ernst murió en una pensión del Puente.", madreMuerta: "Tu madre ya no está.", anselmMuerto: "Anselm no se levantó.", capitan: "Capitán de los Estibadores.", capitanErwin: "Erwin, capitán. Tú, detrás.", taquillaAnselm: "La taquilla de Anselm, vacía para siempre.", brauerOjeador: "Brauer cobra por verte sangrar.", finVitalicio: "Subiste al carruaje negro.", finKurt: "Talvia. Kurt tenía sitio.", tobiasYTumba: "Tobias te llevó al cementerio de los pobres.", cartasAnselm: "Las cartas de Anselm a su hija, con tu letra.", anselmLee: "Anselm leyó 'Halcón'. Luego el nombre de su hija.", hijaAnselm: "Le leíste la última carta a la hija de Anselm.", bastienCaido: "Bastien en el barro, con el número de Anselm.", bastienRoto: "Bastien no volvió a jugar. Tu pared quedó limpia.", tobiasEnsenado: "Le enseñaste todo a Tobias. Aprendió más rápido.", cartaKurt: "'Me duelen las mismas rodillas. Ven a Talvia'.", paseFinal: "Tu último pase fue el primer touchdown de Tobias.", ultimoTD: "Tumbado en la zona de anotación, riéndote.", balonDevuelto: "Un jugador de Talvia te devolvió el balón.", salisteAndando: "Saliste andando antes del silbato.", leDijisteAErnst: "Se lo contaste a Ernst en voz alta." });

/* ---------- ENANO ---------- */


/* ---------- ORCO ---------- */


/* ---------- ELFO ---------- */


const HISTORIAS = { humano: HUMANO, enano: ENANO, orco: ORCO, elfo: ELFO };

// Tentación central de cada protagonista (hilo que el epílogo juzga)
const TENTACION = {
  humano: { nombre: "Ser alguien", flag: "cedisteALaTentacion", test: (pj) => pj.flags.quedasteEnNorburgo || pj.flags.vitalicio || pj.rel.familia <= 0 },
  enano: { nombre: "Romper la caja", flag: "cedisteALaTentacion", test: (pj) => pj.flags.abristeLaCaja || pj.flags.finCajaQueSeAbre || pj.flags.traicionasteLaCaja },
  orco: { nombre: "Ser rey", flag: "cedisteALaTentacion", test: (pj) => pj.flags.jefeSupremo || pj.flags.segundoSupremo || pj.flags.gorkaEnLaBanda },
  elfo: { nombre: "Olvidar la culpa", flag: "cedisteALaTentacion", test: (pj) => pj.flags.olvido || pj.flags.volvisteALaCorte || pj.flags.aceptasteAtodo },
};
// Imagen inolvidable al abrir cada capítulo (una línea evocadora)
const IMAGENES = {
  humano: { 1: "Una vejiga de cerdo tibia rodando por un callejón helado.", 2: "Un muro de piedra al amanecer, y un viejo con una placa que silba.", 3: "Una vaca en la zona de anotación de un campo de nabos.", 4: "Un catre vacío en un vestuario que huele a sal.", 5: "Una escalera de vestuario que ya no puedes subir sin pararte.", 6: "El Estadio Imperial visto desde el desagüe por el que te colabas.", 7: "Un cementerio de club al anochecer, con una placa de más." },
  enano: { 1: "Una caja de once enanos avanzando una casilla por turno hacia la nada.", 2: "Un elfo corriendo solo alrededor de un campo que practica la caja.", 3: "Una pizarra con ochenta años de tiza y una jugada de elfo dibujada al lado.", 4: "Una ciudad con ventanas donde nadie te dice la casilla.", 5: "Un capitán de ciento setenta años sentado en el barro con el balón en el regazo.", 6: "Una apisonadora de vapor con cuchillas a la que llaman La Viuda.", 7: "Una tiza partida por la mitad sobre una pizarra en blanco." },
  orco: { 1: "Un cesto enganchado en una raíz, con una cría dentro.", 2: "Un campo de nabos con una portería robada y una vaca que muge.", 3: "Un troll de río mirando una mosca del tamaño de un puño.", 4: "Doce cascos robados colgando del cinturón de un goblin.", 5: "Una pared de taberna con los nombres de todos los que deben, escritos con una uña.", 6: "Un elefante muerto usado de portería en la plaza de Gorgomor.", 7: "Un río, un cesto vacío, y una charca que sigue tirando pequeños." },
  elfo: { 1: "Un cristal de la Cristalvisión encendiéndose en un banquete.", 2: "Un cartel de tres metros con tu cara sobre una grada.", 3: "Una halfling en un barril, comiendo, que te mira cada mañana.", 4: "Dos platos en una mesa, y uno siempre vacío.", 5: "Un carro con el sello del Roble llegando a un campo de nabos.", 6: "Una copa de latón torcida en la repisa de un granero.", 7: "El hueco liso en la corteza del Roble donde estuvo tu nombre." },
};

/* ====================== PARTIDOS V2, TORNEOS Y CRISTALVISIÓN ====================== */

const ESTILOS = { brutal: "brutal", muro: "muro", esquivo: "esquivo", rapido: "rápido" };
const estiloDe = (rival, fuerza) => {
  const r = rival.toLowerCase();
  if (/rompecr|cuervos|mortaigne|charca negra|zarzas|cascos rotos|toros/.test(r)) return "brutal";
  if (/cascos de hierro|yunques|puñohierro|pisapiedras|muro/.test(r)) return "muro";
  if (/vientos|claro|espinas|sirenas|hojas/.test(r)) return "esquivo";
  if (/picas|cuatro dedos|martillos|estibadores/.test(r)) return "rápido";
  return fuerza >= 3 ? "brutal" : "rápido";
};

/* Compañeros de la historia que saltan al campo contigo (según capítulo y recuerdos) */
const ALIADOS = {
  humano: (pj, cap) => [
    { nombre: "Grimm", ST: 4, AG: 2, AV: 9, si: cap === 3 || (cap >= 5 && pj.flags.grimmContigo) },
    { nombre: "Anselm", ST: 4, AG: 1, AV: 8, si: cap === 4 && !pj.flags.hijaAnselm && !pj.flags.bastien && !pj.flags.bebiste },
    { nombre: "Erwin de Talvia", ST: 3, AG: 4, AV: 8, si: cap >= 5 && cap <= 6 && (pj.flags.capitanErwin || pj.flags.capitan || pj.flags.taquillaAnselm) },
    { nombre: "El liniero de tres ojos", ST: 3, AG: 3, AV: 8, si: cap === 6 },
    { nombre: "Tobias", ST: 3, AG: 4, AV: 8, si: cap === 7 && pj.flags.tobiasEnsenado },
  ],
  enano: ENANO_ALIADOS,
  orco: ORCO_ALIADOS,
  elfo: ELFO_ALIADOS,
};

/* Torneos: una final por capítulo si has ganado al menos un partido en él */
const TORNEOS = {
  humano: { 3: { nombre: "Copa de los Nabos", rival: "Los Segadores de Kleinfeld", fuerza: 2 }, 4: { nombre: "Copa del Puerto", rival: "Los Arponeros de Puerto Maren", fuerza: 2 }, 5: { nombre: "Copa del Reino del Val", rival: "Los Lobos de Montefrío", fuerza: 3 } },
  enano: {},
  orco: {},
  elfo: {},
};
const escenaTorneo = (raza, capId) => {
    const t = TORNEOS[raza][capId];
  if (!t) return null;
  return {
    titulo: `Final de la ${t.nombre}`,
    partido: { rival: t.rival, fuerza: t.fuerza, torneo: t.nombre },
    condicion: (pj) => pj.palmares.some((p) => p.cap === capId && p.res === "Victoria"),
    texto: (pj) => `Ganar te ha metido en la final de la ${t.nombre}. No es el Cáliz, pero hay un trofeo de verdad, público que ha pagado y un rival, ${t.rival}, que no ha venido a perder. ${pj.trofeos?.length ? `Ya tienes ${pj.trofeos.length} en la vitrina.` : "Sería el primero de tu vitrina."} Último turno, todo por decidir, y el balón en tus manos.`,
    opciones: [
      { txt: "Bajar la cabeza e ir por el centro.", tirada: { stat: "ST", obj: 9 + (t.fuerza >= 3 ? 1 : 0), riesgo: true,
        ok: { txt: "Nadie te para. Cruzas con dos rivales colgados y el trofeo, que es feo, es tuyo.", fx: { fama: 10, gol: 1, rel: { aficion: 2, club: 2 } } },
        ko: { txt: "Te paran. Con todo. Ves el trofeo desde el suelo, y ves cómo se lo llevan.", fx: { golRival: 1 } } } },
      { txt: "Buscar el hueco y rodear.", tirada: { stat: "AG", obj: 9 + (t.fuerza >= 3 ? 1 : 0), riesgo: false,
        ok: { txt: "Hay hueco. Siempre hay hueco si lo buscas. Cruzas sin que te rocen y el trofeo es tuyo.", fx: { fama: 10, gol: 1, rel: { aficion: 2, club: 2 } } },
        ko: { txt: "No hay hueco. Pierdes el balón y el trofeo se va con él.", fx: { golRival: 1 } } } },
      { txt: "Pasar al compañero que mejor colocado esté.", tirada: { stat: "AG", obj: 8, riesgo: false,
        ok: { txt: "El pase llega. Anota otro. El trofeo lo levanta el capitán, pero todos saben quién dio el pase.", fx: { fama: 6, Honor: 1, gol: 1, rel: { club: 3 } } },
        ko: { txt: "El pase se queda corto. Lo recogen ellos. Nadie levanta nada.", fx: { golRival: 1 } } } },
    ],
  };
};
for (const [raza, H] of Object.entries({ humano: HUMANO, enano: ENANO, orco: ORCO, elfo: ELFO })) {
  for (const capId of [3, 4, 5]) {
    const id = `torneo${capId}`;
    const esc = escenaTorneo(raza, capId);
    if (!esc) continue;
    H.escenas[id] = esc;
    const c = H.capitulos.find((x) => x.id === capId);
    if (c) c.escenas.splice(c.escenas.length - 1, 0, id);
  }
}


/* ====================== EL PUENTE: UN SOLO MUNDO, MUCHAS VIDAS ====================== */

/* Estrellas de otras historias que aparecen en la tuya */
const ESTRELLAS_RIVALES = {
  "Los Rompecráneos de Gorgomor": "Los manda Rey Krug, Jefe Supremo, cuatro metros, desde un elefante muerto; dicen que una cría a la que tiró al río en un cesto tiene una banda de goblins y viene a por él.",
  "Los Cascos de Hierro de Baraz-Ankor": "Juegan en caja, como hace trescientos años: cuatro linieros cerrando el balón, una casilla por turno, y un corredor que, dicen, es el único enano del mundo que corre.",
  "Las Hojas de Ellorien": "Su capitana es Maelis, sesenta años, que placa de frente como no placan los elfos; dicen que su madre, la mejor bailarina de la corte, le rompió el cuello a un orco en una final y se fue al barro.",
  "Los Halcones de Valdoria": "Su blitzer es Kurt Vogel, un rubio sin cejas de un barrio de mataderos; dicen que un chico del mismo callejón le persigue desde los seis años.",
  "Los Cuervos de Mortaigne": "Su blitzer es Bastien, un no-muerto con la mandíbula colgando que lleva pintados en el casco los números de todos los que ha matado. Hay muchos.",
};

/* Noticias del resto del Mundo Viejo: lo que pasa en las otras historias */
const NOTICIAS_ABSURDAS = [
  "El patrocinador de los Charcos de Grünburg, una fábrica de nabos, exige que el equipo anote 'con más entusiasmo por el nabo'.",
  "Un árbitro de Tercera admite haber pitado nueve partidos completamente borracho. La federación le asciende a Segunda 'por experiencia'.",
  "El apotecario de los Toros Rojos confunde una pierna con un brazo. El jugador afectado declara que 'ahora corre mejor'.",
  "La grada de Kleinfeld celebra durante veinte minutos un touchdown que resultó ser de su propio equipo en propia meta.",
  "Un patrocinador de cerveza retira los fondos a un club tras descubrir que sus jugadores 'beben demasiada cerveza'.",
  "La mascota de los Estibadores, un pulpo, se come al entrenador suplente. El club le da el puesto al pulpo.",
  "Un médico de campo trata una conmoción cerebral 'gritándole al paciente hasta que reacciona'. Funciona. Se lo recomienda a todos.",
  "Dos aficionados apuestan sus casas a un partido de Sexta. Ganan los dos. Nadie entiende cómo. Ma Gorka sí.",
  "La Cristalvisión estrena la repetición a cámara lenta. El primer uso es para revisar una pelea en la grada, no una jugada.",
];
const NOTICIAS_MUNDO = [
  "Kurt Vogel, de los Estibadores de Puerto Maren, ficha por Talvia por el doble de sueldo. En el barrio del Matadero de Valdoria nadie se sorprende.",
  "Los Cascos de Hierro de Baraz-Ankor, el club más antiguo del mundo, juegan en Segunda por primera vez en trescientos años. Durak Ojoferro, su entrenador: 'Aquí no se corre'.",
  "Dorin Yunquefirme, capitán de los Cascos de Hierro, cumple ciento setenta años en activo. Preguntado por su retiro: 'Un enano no se retira. Se para'.",
  "Una banda de goblins con un orco al frente sube a Quinta desde debajo de un puente. En la pizarra de Ma Gorka sigue sin tener nombre.",
  "La bailarina de las Hojas de Ellorien que ganó el Cáliz ficha por las Espinas de Cythel, en Segunda. La corte no hace declaraciones. La Cristalvisión guarda un cristal.",
  "Bastien, blitzer de los Cuervos de Mortaigne, suma otro nombre a su casco. La federación estudia si un muerto puede ser sancionado.",
  "Pipo Cazuelas, el agente halfling de tres dedos, dice representar a jugadores 'de todas las razas, hasta orcos'. Nadie ha visto a ninguno subir a Primera desde 2489.",
  "Ulrich Manoslargas, expulsado de la federación por cuarta vez, es readmitido por quinta. Su taquilla en el vestuario visitante sigue en uso.",
  "Un troll de río de Sexta se ha comido a su tercer árbitro esta temporada. La federación estudia si sentarse encima del portador es una acción de Placaje.",
  "Ottokar el Mediano, mago con el pelo quemado, ofrece 'mejoras' a clubes de Cuarta. Un liniero de Puerto Maren tiene ahora tres ojos y anota mejor.",
  "Graznido, el ogro de la cabina, y Lord Borchardt, que no come en las cenas, renuevan con la Cristalvisión. Graznido se comió el micrófono en la firma.",
];

/* La leyenda: alguien que jugaste antes vuelve en esta vida */
const escenaLeyenda = () => ({
  titulo: "Una cara de otra vida",
  condicion: (pj) => !!(pj.legado && pj.legado.length),
  texto: (pj) => {
    const L = (pj.legado || [])[0];
    if (!L) return "";
    if (L.muerto) return `En la taberna del club hay un cromo viejo clavado en la pared, sin nombre. Preguntas. "${L.nombre}", dice el tabernero. "${L.raza}. Murió cuatro veces. La cuarta, nadie fue a por él". Alguien deja una jarra debajo cada semana.`;
    if (/cabina/.test(L.texto)) return `El reportero de la Cristalvisión no viene solo: en la cabina, junto a Graznido, está ${L.nombre}, ${L.raza.toLowerCase()}, retirado hace años. Habla de ti sin haberte visto jugar. "Me recuerda a alguien", dice al cristal, y no dice a quién.`;
    return `En la grada hay un viejo ${L.raza.toLowerCase()} al que la gente saluda sin acercarse. ${L.nombre}. ${L.texto.split(". ")[0]}. Te está mirando a ti, y no como se mira a un jugador: como se mira un cromo propio.`;
  },
  opciones: [
    { txt: "Acercarte y preguntarle cómo se aguanta.", fx: { Astucia: 1, Honor: 1, flag: "bendicionLeyenda" }, msg: "Tarda en contestar. 'No se aguanta. Se sigue'. Te da una palmada que te dobla, o te mira sin tocarte, según de qué raza sea. En la final lo recordarás." },
    { txt: "Retarle a un turno, aquí, en el barro de detrás de la taberna.", req: { Ferocidad: 4 }, forzable: true, tirada: { stat: "ST", obj: 9, riesgo: false,
      ok: { txt: "Le tumbas. Se levanta despacio, riéndose. 'Yo también tumbé a alguien así una vez'. Te firma un cromo suyo. Vale más que el tuyo.", fx: { fama: 8, Ferocidad: 1, flag: "cromoLeyenda" } },
      ko: { txt: "Te tumba él. Viejo, cojo, lo que sea. 'Todavía'. Se va sin mirar atrás y tú te quedas en el barro entendiendo algo.", fx: { Voluntad: 2 } } } },
    { txt: "Dejarle en paz. Tiene derecho a ser un viejo.", fx: { Honor: 2, Voluntad: 1 }, msg: "No te acercas. Al acabar el partido, en la salida, alguien te ha dejado una jarra en la taquilla. No pregunta nadie de quién." },
  ],
});
for (const H of [HUMANO, ENANO, ORCO, ELFO]) {
  H.escenas.leyenda = escenaLeyenda();
  const c5 = H.capitulos.find((x) => x.id === 5);
  if (c5) c5.escenas.splice(2, 0, "leyenda");
  for (const id of Object.keys(H.escenas)) {
    const e = H.escenas[id];
    if (e.partido && ESTRELLAS_RIVALES[e.partido.rival] && !e._puente) {
      const t = e.texto; e._puente = true;
      e.texto = (pj) => `${t(pj)} ${ESTRELLAS_RIVALES[e.partido.rival]}`;
    }
  }
}


/* ====================== ENTREACTOS: EL TIEMPO ENTRE CAPÍTULOS ====================== */

const TRANSICIONES = {
  humano: {
    2: (pj) => `Pasan cuatro inviernos. Creces hacia arriba y hacia los hombros. ${pj.flags.mazo ? "Tu padre te deja el mazo cada vez más a menudo, y cada vez pesa menos." : "Tu padre trabaja doble y habla la mitad."} Liese aprende a leer con los carteles del mercado y te corrige. Kurt Vogel ya tiene barba y una banda. ${pj.rel.ernst >= 2 ? "Ernst te espera en el muro las tardes que no llueve, y algunas que sí." : "Ernst sigue en la grada de los pobres, silbando con la placa."} El barrio empieza a llamarte por tu nombre y no 'el de Josef'.`,
    3: (pj) => `Pasa un año entero de camino. Dejas Valdoria con una bolsa y ${pj.flags.placaErnst ? "una placa en la bota" : "las manos vacías"}. Grünburg está a dos días y a otro mundo: campos, vacas, un cielo que no habías visto entero. ${pj.rel.familia >= 3 ? "Liese te escribe cada semana; tu madre añade una línea al final." : "De Valdoria no llega nada."} Aprendes a dormir en un granero, a comer nabos de cinco formas y a que nadie sepa quién fue tu padre.`,
    4: (pj) => `Pasan dos temporadas. Puerto Maren huele a sal y a pescado que no se vendió. ${pj.flags.fiel ? "Tardaste un año más en llegar, y Grünburg te despidió con una sábana pintada." : "Llegaste en un carro con tu nombre mal escrito en el contrato."} Aprendes a jugar con grada de verdad y a que el público te silbe cuando fallas. ${pj.rel.grimm >= 3 ? "Grimm te escribe con faltas de ortografía y consejos que no pediste." : ""} Kurt Vogel es tu capitán y te mira cada mañana como quien cuenta monedas.`,
    5: (pj) => `Pasan dos temporadas más. El equipo sube, tú subes con él, y las ciudades se van pareciendo: Talvia, Montefrío, vestuarios con puerta y taquillas que no gotean. ${pj.flags.hijaAnselm ? "La hija de Anselm te escribe cada mes, con una letra que mejora." : pj.flags.bebiste ? "No has vuelto a beber. Kurt lo comprueba." : ""} Tu nombre sale en la Cristalvisión por primera vez, mal pronunciado. Tu madre lo oye en la taberna del Matadero.`,
    6: (pj) => `Pasa un verano de contratos, carruajes y una ciudad que te recibe por la puerta grande. ${pj.flags.rechazoAltdorf ? "No fuiste a Valdoria. Te quedaste, y la ciudad te hizo capitán. El Estadio Imperial te espera igual, como rival." : "Vuelves a Valdoria en un carruaje. Pasas por el callejón: ya no está el charco."} ${pj.flags.grimmEntrenador ? "Grimm entra contigo por la puerta de los entrenadores, veinte años tarde." : ""} La gente que te vio colarte por el desagüe ahora te pide cromos. ${pj.flags.madreMuerta && !pj.flags.quedasteConMadre ? "Tu madre murió ese mismo verano, en la casa del Matadero, sin que llegaras a tiempo. Liese te lo escribió en tres líneas. La carta llegó con el carruaje." : pj.flags.quedasteConMadre ? "Tu madre murió con tu mano en el brazo. Hay cosas que valen más que un partido, y esa es una." : pj.flags.apotecarioMadre ? "Tu madre sigue viva, de milagro y de apotecario, y lo ve todo desde una silla." : ""}`,
    7: (pj) => `Pasan tres temporadas. ${pj.flags.campeon ? "El Cáliz está en la vitrina y la gente ya habla de él en pasado." : "El Cáliz se lo llevó otro, y la gente ya habla de ti en pasado."} Ganas menos partidos y más respeto, que es lo que pasa cuando el cuerpo empieza a llegar tarde. Te duelen sitios que no sabías que tenías. ${pj.flags.madreMuerta && pj.flags.apotecarioMadre ? "Tu madre murió al fin, dos años después de lo que le tocaba, que fue lo que compraron los cincuenta oros. Liese dice que preguntó por ti hasta el final. " : ""}En el vestuario hay caras nuevas que no saben quién fue Ernst, ni Grimm, ni Anselm. Tú sí.`,
  },
  enano: ENANO_TRANSICIONES,
  orco: ORCO_TRANSICIONES,
  elfo: ELFO_TRANSICIONES,
};

/* Cómo gastas el tiempo entre capítulos: cada tarde es un entrenamiento o una persona */
const ENTREACTOS = {
  humano: [
    { id: "matadero", caps: [2, 3], txt: "Tardes en el matadero, con el mazo.", fx: { stat: { ST: 1 }, rel: { familia: 1 } }, msg: "Derribas reses hasta que el brazo no responde. Tu padre, o su recuerdo, asiente." },
    { id: "muro", caps: [2, 3], txt: "Tardes en el muro con Ernst, aprendiendo a caer.", req: { rel: ["ernst", 1] }, fx: { stat: { AG: 1 }, rel: { ernst: 1 } }, msg: "Caes cien veces. A la ciento una, no estás donde llega el golpe." },
    { id: "liese", caps: [2, 3, 4, 5], txt: "Tardes con Liese y tu madre.", fx: { rel: { familia: 2 }, Honor: 1 }, msg: "Liese te cuenta el barrio; tu madre te da de comer como si fueras a no volver. Cada vez tiene más razón." },
    { id: "kurt", caps: [2, 4, 5], txt: "Beber con Kurt y su gente.", fx: { rel: { kurt: 2 }, Astucia: 1, Honor: -1 }, msg: "Aprendes cómo piensa Kurt, que es útil y un poco sucio. Él aprende cómo piensas tú." },
    { id: "grimm", caps: [3, 4], txt: "Noches en el granero con Grimm, jugada a jugada.", req: { rel: ["grimm", 1] }, fx: { stat: { ST: 1 }, rel: { grimm: 1 } }, msg: "Grimm te enseña a leer el choque antes de que ocurra. La placa silba cada vez que aciertas." },
    { id: "puerto", caps: [4, 5, 6, 7], txt: "Entrenar solo en el puerto, contra sacos de arena.", fx: { stat: { AV: 1 } }, msg: "Los sacos no devuelven el golpe. Tú sí. Cada vez duele menos." },
    { id: "carrera", caps: [4, 5, 6, 7], txt: "Correr por las murallas al amanecer.", fx: { stat: { MA: 1 } }, msg: "Corres hasta que la ciudad se despierta. Las piernas se acuerdan de Ernst." },
    { id: "taberna", caps: [5, 6, 7], txt: "Dejarte ver en la taberna del club, firmar cromos.", fx: { fama: 8, rel: { aficion: 2 } }, msg: "Firmas hasta que se acaba la tinta. Un niño te pregunta si dolió. Le dices que sí." },
    { id: "descanso", caps: [6, 7], txt: "No hacer nada. Dormir. Curar.", fx: { Voluntad: 1, rel: { club: 1 } }, msg: "Duermes diez horas por primera vez en años. El entrenador lo nota en tu cara y no dice nada." },
  ],
  enano: ENANO_ENTREACTOS,
  orco: ORCO_ENTREACTOS,
  elfo: ELFO_ENTREACTOS,
};

/* Lo que el tiempo hace solo: muertes y consecuencias entre capítulos */
const TIEMPO = {
  humano: {
    3: (pj) => !pj.pro ? { fichaPro: true } : null, // firmas con los Charcos: ficha de profesional
    6: (pj) => (!pj.flags.apotecarioMadre && !pj.flags.madreMuerta) ? { flags: ["madreMuerta"] } : null,
    7: (pj) => !pj.flags.madreMuerta ? { flags: ["madreMuerta"] } : null,
  },
  enano: ENANO_TIEMPO,
  orco: { ...ORCO_TIEMPO, 2: (pj) => !pj.pro ? { fichaPro: true } : null }, // Da Banda tiene campo: ficha de profesional
  elfo: ELFO_TIEMPO,
};

/* Noticias de la Cristalvisión */
const pick1 = (a) => a[Math.floor(Math.random() * a.length)];
const noticiasPartido = (pj, H, partido, res, marcador, mvp, bajasTuyas, torneo) => {
  const n = [];
  const rivalNombre = Object.entries(H.rel).find(([k]) => !["familia", "aficion", "club", "clan", "banda", "corte", "madre", "helga", "ernst", "grimm", "borri", "gorbad", "ithilmar", "snik", "durak", "dorin", "helgra", "grimnir", "faelas", "maelis", "athanar", "berthold", "poppy", "lirael", "snotlig", "gorka", "grimgutz", "wazzok", "skabnik"].includes(k));
  const rivalRel = rivalNombre ? rivalNombre[1] : null;
  if (torneo) n.push(res === "Victoria" ? `${pj.equipo} levanta la ${torneo}. ${pj.nombre}, ${marcador[0]}-${marcador[1]}, y una grada que no se va.` : `${partido.rival} se lleva la ${torneo}. ${pj.equipo} se queda mirando el trofeo desde el otro lado.`);
  else if (res === "Victoria") n.push(pick1([`${pj.equipo} ${marcador[0]}-${marcador[1]} ${partido.rival}. ${pj.nombre} decide en el último turno.`, `Victoria de ${pj.equipo}. Graznido: "${pj.nombre} ha hecho hoy lo que otros no hacen en una vida".`, `${pj.equipo} gana ${marcador[0]}-${marcador[1]}. Lord Borchardt anota el nombre de ${pj.nombre} en su libreta. Otra vez.`]));
  else if (res === "Derrota") n.push(pick1([`${partido.rival} ${marcador[1]}-${marcador[0]} ${pj.equipo}. El vestuario no habla.`, `Derrota de ${pj.equipo}. Graznido: "Hay días en los que el barro gana". Borchardt no dice nada.`, `${pj.equipo} cae ${marcador[0]}-${marcador[1]}. ${pj.nombre} sale el último del campo.`]));
  else n.push(`Empate ${marcador[0]}-${marcador[1]} entre ${pj.equipo} y ${partido.rival}. Nadie contento, nadie hundido.`);
  const cab = (pj.legado || []).find((L) => /cabina/.test(L.texto) && !L.muerto);
  if (cab && Math.random() < 0.5) n.push(`${cab.nombre}, desde la cabina: "${res === "Victoria" ? "Yo hice eso una vez. Me costó una rodilla." : "Que no se hunda. Yo perdí más de las que gané y aquí estoy."}"`);
  if (mvp) n.push(`Jugador del partido: ${pj.nombre}, ${H.nombre.toLowerCase()} de ${pj.equipo}. ${pick1(["La grada coreó su nombre.", "Se fue sin declaraciones.", "Firmó cromos hasta que se hizo de noche."])}`);
  if (bajasTuyas > 0) n.push(`${partido.rival} pierde ${bajasTuyas === 1 ? "un jugador" : bajasTuyas + " jugadores"} por lesión. El apotecario rival pide un aumento.`);
  if (rivalRel && Math.random() < 0.4) n.push(pj.rel[rivalNombre[0]] >= 2 ? `${rivalRel}, preguntado por ${pj.nombre}: "Jugaría con él en cualquier equipo".` : pj.rel[rivalNombre[0]] <= -2 ? `${rivalRel}, preguntado por ${pj.nombre}: "Yo le enseñé todo. Que no lo olvide".` : `${rivalRel} declina hablar de ${pj.nombre}. "Cada uno a lo suyo".`);
  return n;
};
const noticiasCapitulo = (pj, H, cap) => {
  const n = [];
  if (pj.fama >= 60) n.push(`${pj.nombre} entre los diez nombres más repetidos en las tabernas del Mundo Viejo, según el sondeo anual de la Cristalvisión.`);
  else if (pj.fama >= 30) n.push(`${pj.nombre}, de ${pj.equipo}, empieza a sonar más allá de su división.`);
  else if (pj.fama >= 10) n.push(`Nota breve: ${pj.equipo} ficha a ${pj.nombre}. Nadie sabe pronunciar su nombre todavía.`);
  if (pj.flags.mutado || pj.flags.bendecido || pj.flags.runa) n.push(`Rumor: ${pj.nombre} ya no es del todo lo que era. Su club lo niega. Su club no le mira.`);
  if (pj.flags.sucio && cap.id >= 4) n.push(`La federación abre expediente a ${pj.nombre} por "conducta en el suelo". Su afición vende camisetas con la frase.`);
  if (pj.flags.bastienCaido || pj.flags.bastienRoto) n.push(`Bastien, de los Cuervos de Mortaigne, sigue sin jugar desde ${pj.nombre}. Su casco se subasta con todos los números.`);
  if (pj.flags.ratzComido) n.push(`La federación sigue buscando a Ratz, árbitro goblin. ${pj.nombre} declina comentar. Se limpia los dientes.`);
  if (pj.flags.centauro) n.push(`En la corte de Ellorien cuelga la cabeza de un centauro. Nadie dice quién la trajo. Todos lo saben.`);
  if (pj.muertes > 0) n.push(`La Cristalvisión confirma que ${pj.nombre} ha muerto ${pj.muertes} ${pj.muertes === 1 ? "vez" : "veces"} en el campo. Su club: "Está perfectamente".`);
  if (pj.trofeos?.length) n.push(`${pj.nombre} acumula ${pj.trofeos.length} ${pj.trofeos.length === 1 ? "título" : "títulos"}: ${pj.trofeos.join(", ")}.`);
  if (cap.id === 6) n.push(`${pj.equipo} llega a la final del Cáliz de Barro. Las apuestas de la Cristalvisión pagan ${pj.fama >= 50 ? "poco" : "mucho"} por ${pj.nombre}.`);
  if (cap.id === 1 && pj.legado && pj.legado.length) { const L = pj.legado[0]; n.push(L.muerto ? `Efemérides: hace años murió por cuarta vez ${L.nombre}, ${L.raza.toLowerCase()}. Nadie fue a por él. Un niño de la grada de los pobres aún pregunta quién era.` : `Efemérides: ${L.nombre}, ${L.raza.toLowerCase()}. ${L.texto.split(". ").slice(0, 2).join(". ")}.`); }
  n.push(NOTICIAS_MUNDO[(cap.id * 3 + (pj.nombre.length || 0)) % NOTICIAS_MUNDO.length]);
  if ((cap.id + (pj.nombre.length || 0)) % 2 === 0) n.push(NOTICIAS_ABSURDAS[(cap.id * 2 + (pj.nombre.length || 0)) % NOTICIAS_ABSURDAS.length]);
  return n;
};


const HABILIDADES = {
  "Placar": { cat: "G", desc: "Repites las tiradas de Fuerza (placajes, blitz) que fallen." },
  "Manos seguras": { cat: "G", desc: "Repites las tiradas de Agilidad sin riesgo (recoger, recibir)." },
  "Placaje defensivo": { cat: "G", desc: "+1 a las tiradas de Fuerza contra equipos esquivos, y +1 a placar sin riesgo." },
  "Furia": { cat: "G", desc: "+2 a las tiradas de Fuerza con riesgo; −1 de armadura si caes." },
  "Agallas": { cat: "G", desc: "+1 a las tiradas de Fuerza contra rivales de fuerza 3 o más." },
  "Profesional": { cat: "G", desc: "Una repetición extra por partido para cualquier tirada." },
  "Esquivar": { cat: "A", desc: "Repites las tiradas de Agilidad con riesgo (esquivar) que fallen." },
  "Esprintar": { cat: "A", desc: "+1 a las tiradas de Movimiento." },
  "Saltar": { cat: "A", desc: "+1 a las tiradas de Agilidad con riesgo." },
  "Atrapar": { cat: "A", desc: "+1 a las tiradas de Agilidad sin riesgo (recibir)." },
  "Romper defensas": { cat: "A", desc: "+1 a las tiradas de Fuerza sin riesgo: mantienes la caja cerrada." },
  "Pies firmes": { cat: "A", desc: "+1 a las tiradas de Movimiento con riesgo (forzar la marcha)." },
  "Golpe mortífero": { cat: "F", desc: "+1 a las tiradas de Fuerza con riesgo y más probabilidad de causar baja." },
  "Defensa": { cat: "F", desc: "+1 a las tiradas de Fuerza sin riesgo: siempre das apoyo." },
  "Mantenerse firme": { cat: "F", desc: "No te dejan KO al fallar una presión en el partido por turnos." },
  "Abrirse paso": { cat: "F", desc: "+1 a las tiradas de Agilidad con riesgo cuando tu Fuerza es 4 o más." },
  "Pasar": { cat: "P", desc: "+2 a las tiradas de Agilidad sin riesgo cuando lanzas." },
  "Precisión": { cat: "P", desc: "+1 a las tiradas de Agilidad sin riesgo." },
  "Jugar sucio": { cat: "T", desc: "+2 en las faltas." },
  "Furtivo": { cat: "T", desc: "Si te pillan en una falta, con 4+ en 1d6 no te expulsan." },
  "Cabeza dura": { cat: "R", desc: "Rasgo. Solo te dejan KO con un 9 en la tirada de heridas." },
};
const CATEGORIAS = { G: "General", A: "Agilidad", F: "Fuerza", P: "Pase", T: "Triquiñuelas", R: "Rasgo" };
const ACCESO = { humano: { p: ["G", "F"], s: ["A", "P", "T"] }, enano: { p: ["G", "A"], s: ["F", "P", "T"] }, orco: { p: ["G", "F"], s: ["A", "P", "T"] }, elfo: { p: ["A", "G"], s: ["F", "P", "T"] } };
const UMBRALES = [6, 14, 26, 42, 62, 92];
const NIVELES = ["Novato", "Experimentado", "Veterano", "Estrella emergente", "Estrella", "Superestrella", "Leyenda"];
const nivelDe = (spp) => 1 + UMBRALES.filter((u) => spp >= u).length;
// Puertas que se cierran para siempre: aliado muerto/ido/enemigo, expulsión de club
const PUERTAS = {
  // humano
  anselmMuerto: "Anselm murió. Ya no juega a tu lado.", kurtCaido: "Rompiste a Kurt en el campo. No vuelve.", bastienRoto: "Bastien no volverá a jugar.", ernstMuerto: "Ernst murió en una pensión del Puente.", madreMuerta: "Tu madre ya no está.", quedasteEnNorburgo: "Diste la espalda a los tuyos por oro.",
  // enano
  descendisteis: "Los Cascos bajaron a Tercera. No hay vuelta atrás fácil.", grimnirMurio: "Grimnir encontró su troll. Y su final.", faelasSeVa: "Faelas volvió al bosque. Juega para el otro lado.", durginMuerto: "Durgin no se levantó.",
  // orco
  grubnakMuerto: "Grubnak no se levantó.", grimgutzVendido: "Vendiste a Grimgutz. Se giró una vez en el camino.", wazzokMurio: "Wazzok acertó su última predicción.", skabnikEchado: "Echaste a Skabnik. Gira hacia ti.",
  // elfo
  confesaste: "Dijiste la verdad. La corte limó tu nombre del Roble.", liraelMuerta: "Lirael no se levantó.", bertholdEnLaLinea: "Berthold descansa en la zona de anotación.", rompisteAOldBones: "Rompiste a Old Bones. Athanar cobró.",
};
const brutos = (raza) => (HISTORIAS[raza].reglas || []).includes("Brutos Brutales");
// Resumen posterior al partido: qué pasó, quién salió tocado, qué rumor nace, frase para el Libro
const cronicaPartido = (pj, H, partido, res, marc, mvp, bajas, heridosTuyos, torneo, opTxt) => {
  const rival = partido.rival;
  const lineas = [];
  lineas.push({ k: "res", t: torneo && res === "Victoria" ? `Levantáis la ${torneo}: ${marc[0]}-${marc[1]} contra ${rival}.` : `${res}: ${marc[0]}-${marc[1]} contra ${rival}.` });
  if (mvp) lineas.push({ k: "fama", t: `La grada corea tu nombre. Jugador del partido.` });
  if (bajas) lineas.push({ k: "sangre", t: `${rival} pierde ${bajas === 1 ? "a un jugador" : bajas + " jugadores"} por lesión. En la enfermería no te tienen cariño.` });
  if (heridosTuyos && heridosTuyos.length) lineas.push({ k: "herido", t: `Sale tocado de los tuyos: ${heridosTuyos.join(", ")}. Alguien tendrá que cubrir su puesto.` });
  if (pj.flags.sucio) lineas.push({ k: "rumor", t: `En las gradas cuchichean: dicen que juegas sucio. A unos les gusta, a otros no.` });
  // rumor que nace
  const rumores = res === "Victoria"
    ? [`Nace un rumor: que este equipo, con este jugador, puede con cualquiera.`, `Se dice en las tabernas que hay que ir a ver jugar a ${pj.nombre}.`]
    : res === "Derrota" ? [`Nace un rumor: que a ${pj.nombre} le queda poco.`, `Alguien apuesta, en voz baja, a que el club busca recambio.`]
    : [`Nadie sabe qué pensar todavía. El rumor espera al próximo partido.`];
  lineas.push({ k: "rumor", t: rumores[Math.floor(Math.random() * rumores.length)] });
  // línea del rival central si el partido fue contra él
  const rc = {
    "Los Yunques de Baraz Kadrin": pj.rel.brokk >= 3 ? "Brokk, tu hermano, te busca al acabar y no dice nada: os dais la mano, que entre enanos es un discurso." : "Brokk, tu hermano, te mira desde la banda contraria. La sangre pesa más que el marcador.",
    "Los Cuatro Dedos": pj.rel.uzgob >= 3 ? "Uzgob te enseña la garganta desde su banquillo. Entre orcos, es respeto." : "Uzgob, que te vio crecer en la charca, te mira con hambre vieja.",
    "Las Hojas de Ellorien": pj.rel.maelis >= 3 ? "Maelis, tu hija, se para un paso antes de la línea y te mira. La corte no lo entiende. Tú sí." : "La Reina, desde el Roble, no aplaude. Es lo peor que puede hacer.",
    "Los Halcones de Valdoria": "Kurt Vogel te espera en el pasillo, o no. Depende de lo que le hicieras.",
  };
  if (rc[rival]) lineas.push({ k: "rival", t: rc[rival] });
  return lineas;
};

/* ===== POSOS DEL RESULTADO (Fase 4) =====
   El resultado deja huella sin escribir dos versiones de cada partido: mueve
   racha, récords, y un poco de fama y afición (modesto, escalado por división),
   y suelta titulares de racha. Muta q; devuelve {chips, noticias}. */
const pososPartido = (q, res, marc, div, torneo) => {
  const chips = [], noticias = [];
  const margen = Math.abs(marc[0] - marc[1]);
  q.records = { ...(q.records || {}) };
  const raAntes = q.racha || 0;
  // racha
  if (res === "Victoria") q.racha = raAntes > 0 ? raAntes + 1 : 1;
  else if (res === "Derrota") q.racha = raAntes < 0 ? raAntes - 1 : -1;
  else q.racha = 0;
  // ripples de fama/afición (pequeños; los ascensos de fama gordos siguen
  // viniendo de las opciones escritas y de los trofeos)
  const subeAficion = (n) => { q.rel = { ...q.rel, aficion: Math.max(-5, Math.min(5, (q.rel.aficion || 0) + n)) }; };
  if (res === "Victoria") {
    const famaGana = (div && div <= 2 ? 2 : 1) + (margen >= 2 ? 1 : 0);
    q.fama += famaGana; subeAficion(1);
    chips.push(`+${famaGana} fama (victoria)`);
  } else if (res === "Derrota" && margen >= 2) {
    subeAficion(-1);
    chips.push(`Afición −1 (derrota clara)`);
  }
  // récord: mayor victoria
  if (res === "Victoria" && margen >= 2 && margen > (q.records.mejorMargen || 0)) {
    q.records.mejorMargen = margen; q.records.mejorVictoria = `${marc[0]}-${marc[1]}`;
    chips.push(`Récord: mayor victoria (${marc[0]}-${marc[1]})`);
  }
  // hitos de racha
  if (q.racha > (q.records.rachaMax || 0)) q.records.rachaMax = q.racha;
  if (q.racha === 3) { noticias.push(`Tres victorias seguidas de ${q.equipo}. Las tabernas empiezan a decir el nombre de ${q.nombre} sin equivocarse.`); q.fama += 1; }
  else if (q.racha === 5) { noticias.push(`Quinta victoria seguida. La afición corea el nombre de ${q.nombre} antes del saque.`); q.fama += 2; subeAficion(1); chips.push("Racha de cinco: la afición te canta"); }
  else if (q.racha === -3) { noticias.push(`Tercera derrota seguida de ${q.equipo}. La grada empieza a silbar, y no al rival.`); subeAficion(-1); }
  return { chips, noticias };
};
const PE = (raza) => ({ td: brutos(raza) ? 2 : 3, baja: brutos(raza) ? 3 : 2, pase: 1, mvp: 4 });
const ordenDe = (H) => H.capitulos.flatMap((c) => c.escenas.map((e) => ({ cap: c.id, id: e })));

/* ============ POSICIÓN EMERGENTE (piloto del humano) ============
   La posición se ANCLA el día que firmas: la prueba de Grünburg deja una marca
   perfilX según cómo te presentaste (a base de pegar, correr, pasar o escuchar).
   Antes de firmar se estima la tendencia por atributos y habilidades, solo para
   el "en formación". No decide nada de la partida: solo etiqueta.
   Ver docs/posicion-emergente-piloto-humano.md. */
const PERFIL_POS = {
  Blitzer:  { desc: "Un ariete. Placas, presionas y dejas gente en el barro.", skills: ["Placar", "Placaje defensivo", "Golpe mortífero", "Furia", "Agallas", "Defensa", "Romper defensas"] },
  Receptor: { desc: "Velocidad y manos. Corres la banda y recibes lo imposible.", skills: ["Esquivar", "Atrapar", "Saltar", "Esprintar", "Pies firmes", "Abrirse paso"] },
  Lanzador: { desc: "La cabeza del equipo. Mueves la bola con el brazo.", skills: ["Pasar", "Manos seguras", "Precisión", "Nervios de acero"] },
};
const LINIERO = { clave: "Liniero", nombre: "Liniero", desc: "Un currante de línea. No brillas en nada concreto, y por eso estás en todo." };
const conDesc = (clave) => clave === "Liniero" ? LINIERO : { clave, nombre: clave, desc: PERFIL_POS[clave].desc };
// Devuelve { clave, nombre, desc }: la posición anclada al firmar, o la tendencia.
const puestoEmergente = (pj) => {
  const f = pj.flags || {};
  if (f.perfilBlitzer) return conDesc("Blitzer");
  if (f.perfilReceptor) return conDesc("Receptor");
  if (f.perfilLanzador) return conDesc("Lanzador");
  if (f.perfilLiniero) return LINIERO;
  // Aún sin firmar: tendencia por atributos narrativos + habilidades sueltas.
  const a = pj.atr || {};
  const s = { Blitzer: (a.Ferocidad || 0), Receptor: (a.Ambición || 0) * 0.6 + (a.Astucia || 0) * 0.3, Lanzador: (a.Astucia || 0) * 0.6 };
  for (const [pos, def] of Object.entries(PERFIL_POS)) for (const h of pj.hab) if (def.skills.includes(h)) s[pos] += 2;
  let mejor = null, max = 0;
  for (const [pos, v] of Object.entries(s)) if (v > max) { max = v; mejor = pos; }
  if (!mejor || max < 2) return LINIERO;
  return conDesc(mejor);
};

/* ===== LIGUILLA (Fase 3: contexto de campeonato, híbrida) =====
   Tu fila sale de tus resultados de verdad (palmarés en la división actual);
   los rivales están simulados alrededor, de forma estable. No es un simulador
   de temporada: es el contexto de "qué campeonato juegas y cómo vas". */
const DIV_NOMBRE = { 1: "Primera División", 2: "Segunda División", 3: "Tercera División", 4: "Cuarta División", 5: "Quinta División", 6: "Sexta División" };
// División que juega cada rama en cada capítulo (null = sin liga: infancia/ocaso).
const DIV_POR_CAP = {
  humano: { 3: 6, 4: 5, 5: 2, 6: 1 },
  enano: { 1: 2, 2: 2, 3: 3, 4: 3, 5: 2, 6: 1 },
  orco: { 2: 6, 3: 6, 4: 5, 5: 4, 6: 3 },
  elfo: { 1: 1, 2: 2, 3: 4, 4: 6, 5: 6, 6: 6 },
};
const divisionDe = (raza, cap) => (DIV_POR_CAP[raza] || {})[cap] || null;
const RIVALES_DIV = {
  1: ["Las Hojas de Ellorien", "Los Halcones de Valdoria", "Los Rompecráneos de Gorgomor", "Los Cuervos de Mortaigne", "Los Lobos de Kärngard", "Los Titanes de Ostwall", "Las Lanzas de Silbereck", "Los Reyes de Drakenhof"],
  2: ["Los Cascos de Hierro de Baraz-Ankor", "Las Espinas de Cythel", "Los Yunques de Baraz Kadrin", "Los Osos de Tannheim", "Los Mazos de Grauberg", "Los Grifos de Adlerstein", "Los Cuervos de Rabenfeld", "Los Bisontes de Wisent"],
  3: ["Los Yunques de Baraz Kadrin", "Los Segadores de Kleinfeld", "Los Toros Rojos de Norburgo", "Los Jabalíes de Ebersweil", "Los Martillos de Steinbach", "Los Zorros de Fuchsbau", "Los Tejones de Dachsloch", "Los Cuervos de Krähenberg"],
  4: ["Los Comebichos de la Charca Vieja", "Los Cuatro Dedos", "Los Diente-rotos", "Los Toros Rojos de Norburgo", "Los Sapos de Sumpfheim", "Los Buitres de Geierfels", "Las Sanguijuelas de Blutbach", "Los Perros de Hundsdorf"],
  5: ["Los Estibadores de Puerto Maren", "Los Arponeros de Puerto Maren", "Los Toros Rojos de Norburgo", "Las Botas de Altwasser", "Los Herreros de Eisenhutt", "Los Cerdos de Marktdorf", "Las Ratas de Sumpfloch", "Los Molineros de Mühlbach"],
  6: ["Los Cuervos de Kleinfeld", "Los Segadores de Kleinfeld", "Los Charcos de Grünburg", "Los Pisapiedras de la Charca Negra", "Los Panzudos de Molino Viejo", "Las Botas de Altwasser", "Los Cerdos de Marktdorf", "Las Ratas de Sumpfloch"],
};
// Barajado determinista (mismo orden en cada render de la misma partida).
const barajaDet = (arr, seed) => {
  const a = [...arr]; let s = seed;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 1103515245 + 12345) & 0x7fffffff; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const tablaLiga = (pj, cap) => {
  const raza = pj.raza, div = divisionDe(raza, cap.id);
  if (!div) return null;
  const mios = (pj.palmares || []).filter((p) => divisionDe(raza, p.cap) === div);
  const g = mios.filter((p) => p.res === "Victoria").length, e = mios.filter((p) => p.res === "Empate").length, per = mios.filter((p) => p.res === "Derrota").length;
  const jugados = g + e + per, total = 18;
  const jornada = Math.min(total - 1, Math.max(4, 5 + jugados * 4));
  // Proyección con "prior" de media de liga (≈1.4 pts/partido sobre 6 partidos),
  // para que una sola victoria no te ponga invicto toda la temporada.
  const ppg = (g * 3 + e + 8.4) / (jugados + 6);
  const misPts = Math.max(0, Math.min(jornada * 3, Math.round(ppg * jornada)));
  const seed = raza.length * 97 + div * 131 + cap.id * 17 + 3;
  const pool = barajaDet(RIVALES_DIV[div].filter((n) => n !== pj.equipo), seed).slice(0, 7);
  // Rivales con un reparto FIJO de puntos-por-partido (independiente de ti), para
  // que tus resultados te suban o te bajen de verdad en la tabla.
  const rivalPPG = [1.95, 1.65, 1.45, 1.25, 1.05, 0.85, 0.55];
  const filaDe = (nombre, pts, you) => { const gg = Math.min(jornada, Math.floor(pts / 3)); const ee = Math.min(jornada - gg, pts - gg * 3); return { nombre, pts, g: gg, e: ee, p: jornada - gg - ee, pj: jornada, you: !!you }; };
  const rivales = pool.map((nombre, i) => filaDe(nombre, Math.max(0, Math.min(jornada * 3, Math.round(rivalPPG[i] * jornada)))));
  const yo = filaDe(pj.equipo, misPts, true);
  const tabla = [...rivales, yo].sort((a, b) => b.pts - a.pts || (b.g - a.g));
  const rank = tabla.findIndex((t) => t.you) + 1;
  const nAsc = div > 1 ? 2 : 0, nDesc = div < 6 ? 2 : 0;
  let estado;
  if (nAsc && rank <= nAsc) estado = "Estáis en puestos de ascenso. Aguantar aquí es subir.";
  else if (nDesc && rank > tabla.length - nDesc) estado = "Estáis en descenso. Cada partido es la permanencia.";
  else if (nAsc && rank <= nAsc + 1) estado = "El ascenso está a un partido. Hay que apretar.";
  else if (nDesc && rank > tabla.length - nDesc - 1) estado = "El descenso respira en la nuca. No se puede fallar.";
  else estado = "A mitad de tabla, ni arriba ni abajo. Toca escalar.";
  return { div, divNombre: DIV_NOMBRE[div], jornada, total, tabla, rank, nAsc, nDesc, estado, real: { g, e, p: per, jugados } };
};

/* ===== PARTIDO "JUGADA A JUGADA" (Fase 1: pilotado en partidos con partido.nuevo) =====
   Sustituye los 5 turnos genéricos por 2-3 jugadas clave (pool compartido) que
   usan la FICHA REAL del pj (características + habilidades). La jugada decisiva
   sigue siendo la que cada partido ya tiene escrita (sus opciones). */
const ATRIB_PARTIDO = { ST: "Fuerza", AG: "Agilidad", MA: "Velocidad" };
const modDe = (pj, stat) => (stat === "MA" ? Math.floor(pj.MA / 3) : pj[stat]);
const rollKey = (pj, m, o) => {
  const has = (h) => pj.hab.includes(h);
  const clima = (m.clima === "Lluvioso" && o.stat === "AG") ? -1 : (m.clima === "Muy soleado" && o.stat === "AG") ? -1 : (m.clima === "Ventisca" && o.stat === "MA") ? -1 : 0;
  const mod = modDe(pj, o.stat) + clima + (pj.formaPend || 0) + (m.fatiga >= 3 ? -1 : 0) + (pj.flags.apaleado ? -1 : 0);
  let d = [d6(), d6()], tot = d[0] + d[1] + mod, rep = null;
  if (tot < o.obj && o.hab && has(o.hab)) { d = [d6(), d6()]; tot = d[0] + d[1] + mod; rep = o.hab; }
  else if (tot < o.obj && m.rerolls > 0) { m.rerolls--; d = [d6(), d6()]; tot = d[0] + d[1] + mod; rep = "2ª oportunidad"; }
  return { ok: tot >= o.obj, d, tecnico: `${ATRIB_PARTIDO[o.stat]} ${d[0]}+${d[1]}${mod >= 0 ? "+" : ""}${mod} = ${tot} vs ${o.obj}${rep ? " · repetida (" + rep + ")" : ""}` };
};
const PLAY_POOL = {
  saque: (pj, m) => ({ etq: "Saque", h: "La bola en tierra de nadie",
    situ: `El saque cae corto y la vejiga bota en el barro, en el centro, de nadie. Hay que ir a por ella antes que ${m.rivalCorto}.`,
    ops: [
      { txt: "Ir al choque y arrancársela a quien llegue", det: "El hombro por delante.", stat: "ST", obj: 8, riesgo: true, hab: "Placar",
        ok: { txt: "Llegas primero y con todo. Uno de ellos rueda; la bola es vuestra.", posesion: "propia" },
        ko: { txt: "Chocas y rebotas: son más grandes de lo que parecían. Para ellos.", posesion: "rival" } },
      { txt: "Colarte y recogerla en carrera", det: "Apareces donde no te esperan.", stat: "AG", obj: 8, hab: "Esquivar",
        ok: { txt: "Te cuelas, la recoges sin frenar y sales jugando. Vuestra.", posesion: "propia" },
        ko: { txt: "Llegas medio paso tarde. La asientan con la bota.", posesion: "rival" } },
      { txt: "Leer el bote y ponerte donde va a caer", det: "La cabeza antes que las piernas.", stat: "AG", obj: 8, hab: "Manos seguras",
        ok: { txt: "Apareces solo en el hueco que habías visto. Es vuestra.", posesion: "propia" },
        ko: { txt: "Nadie estaba donde tú creías. Para ellos.", posesion: "rival" } },
    ] }),
  ataque: (pj, m) => m.posesion === "propia" ? ({ etq: "Ataque", h: "Tienes la bola",
    situ: `Avanzáis. La caja de ${m.rivalCorto} se cierra a cuatro pasos de su línea; el hueco se abre y se cierra.`,
    ops: [
      { txt: "Pase raso a un compañero que está solo", det: "Ver el hueco antes de que exista.", stat: "AG", obj: 9, hab: "Pasar",
        ok: { txt: "Sueltas un pase raso que cruza el barro y cae en botas amigas. ¡Cruza! Touchdown.", gol: true, pase: true },
        ko: { txt: "El pase se va largo y lo cortan. Contraataque.", posesion: "rival" } },
      { txt: "Arrancar de frente y reventar la caja", det: "Bajar el hombro y no parar.", stat: "ST", obj: 10, riesgo: true, hab: "Placar",
        ok: { txt: "La caja cruje y cruzas con dos colgados de la camiseta. ¡Touchdown!", gol: true },
        ko: { txt: "La caja aguanta. Te tiran al barro y salen jugando ellos.", posesion: "rival" } },
      { txt: "Esprintar por fuera de la caja", det: "La banda es tuya.", stat: "MA", obj: 9, hab: "Esprintar",
        ok: { txt: "Tiras de velocidad por la banda, dejas a la caja mirando, y cruzas. ¡Touchdown!", gol: true },
        ko: { txt: "Te cierran la banda contra la cal. Saque para ellos.", posesion: "rival" } },
    ] }) : ({ etq: "Defensa", h: `${m.rivalCorto} sube`,
    situ: `${m.rivalCorto} sube con la bola, en bloque, buscando su línea. Hay que pararlos antes de que crucen.`,
    ops: [
      { txt: "Entrarle de frente al que lleva la bola", det: "Con todo. A ver quién cae.", stat: "ST", obj: 9, riesgo: true, hab: "Placar",
        ok: { txt: "Le entras en seco. Suelta la bola y se queda en el barro. Vuestra.", posesion: "propia", baja: true },
        ko: { txt: "Sigue de pie y avanzan.", posesion: "rival" } },
      { txt: "Perseguir y cerrarle la banda", det: "A base de piernas.", stat: "MA", obj: 9, hab: "Esprintar",
        ok: { txt: "Le corres al lado hasta que se le acaba el campo. No cruza.", posesion: "rival" },
        ko: { txt: "No llegas. Cruza vuestra línea. Touchdown suyo.", golRival: true } },
      { txt: "Anticipar el pase y salir a cortarlo", det: "Adivinar dónde va la bola.", stat: "AG", obj: 10, hab: "Manos seguras",
        ok: { txt: "Sabías dónde iba antes que él. Cortas el pase y sales con la bola.", posesion: "propia", pase: true },
        ko: { txt: "Te la juegan al hueco que dejaste. Touchdown suyo.", golRival: true } },
    ] }),
  // Guerra en el centro: fuerza pura, sin balón. El que gana el choque manda el resto.
  choque: (pj, m) => ({ etq: "Choque", h: "Guerra en el centro",
    situ: `Antes de que la bola importe, las dos líneas se buscan. ${m.rivalCorto} pega primero. Aquí se decide quién manda el barro el resto del partido.`,
    ops: [
      { txt: "Ir a por el más grande de todos", det: "Si cae el grande, caen todos.", stat: "ST", obj: 9, riesgo: true, hab: "Placar",
        ok: { txt: "Lo levantas del suelo y lo devuelves a él. Su línea se abre y la vuestra pisa. La bola cae de vuestro lado.", posesion: "propia", baja: true },
        ko: { txt: "Era más grande de lo que parecía. Rebotas y te pisan. Ellos mandan.", posesion: "rival" } },
      { txt: "Abrir un pasillo para los tuyos", det: "No tumbar: apartar.", stat: "ST", obj: 8, hab: "Romper defensas",
        ok: { txt: "Empujas dos casillas y los tuyos entran por el hueco. El campo es vuestro.", posesion: "propia" },
        ko: { txt: "No se mueven. La línea se traga a los vuestros.", posesion: "rival" } },
      { txt: "Plantarte y que se estrellen contra ti", det: "Aguantar, no avanzar.", stat: "ST", obj: 7, hab: "Mantenerse firme",
        ok: { txt: "Clavas los pies y su empuje se rompe contra ti. Nadie manda todavía, pero tampoco ceden.", posesion: "neutral" },
        ko: { txt: "Te llevan por delante. Ganan metros.", posesion: "rival" } },
    ] }),
  // El baile: agilidad pura, pasar entre ellos sin chocar. Sabor élfico.
  regate: (pj, m) => ({ etq: "Baile", h: "Pasar sin chocar",
    situ: `No hay que placar a nadie: hay que pasar entre ellos. ${m.rivalCorto} espera el choque que no vas a darle. La bola pide piernas y muñeca, no hombro.`,
    ops: [
      { txt: "Esquivar entre dos y salir por el hueco", det: "Donde ellos no están.", stat: "AG", obj: 8, riesgo: false, hab: "Esquivar",
        ok: { txt: "Pasas entre los dos como si no estuvieran y sales con la bola cosida al pie. Vuestra.", posesion: "propia" },
        ko: { txt: "Uno estira la mano donde no debía y te la quita. Para ellos.", posesion: "rival" } },
      { txt: "Recogerla en carrera sin frenar", det: "La cabeza va antes que las piernas.", stat: "AG", obj: 8, hab: "Manos seguras",
        ok: { txt: "La levantas del barro sin bajar el ritmo. Sigues, y la bola contigo.", posesion: "propia" },
        ko: { txt: "Se te va del pie en el bote malo. La cazan ellos.", posesion: "rival" } },
      { txt: "Pase largo por encima de la caja", det: "La bola vuela donde tú no llegas.", stat: "AG", obj: 9, hab: "Pasar",
        ok: { txt: "La cuelgas por encima de todos y cae en botas amigas al otro lado. Vuestra, y avanzada.", posesion: "propia", pase: true },
        ko: { txt: "El pase se queda corto y lo bajan ellos. Para ellos.", posesion: "rival" } },
    ] }),
  // A las puertas: la jugada de gol. Éxito = touchdown; fallo = se lo llevan.
  remate: (pj, m) => ({ etq: "Remate", h: "A las puertas",
    situ: `La línea de ${m.rivalCorto} está a un paso. Un movimiento más y cruzáis; si fallas, os quedáis con las manos vacías y ellos con la bola.`,
    ops: [
      { txt: "Pase a la esquina, donde no llega nadie", det: "La jugada de cabeza.", stat: "AG", obj: 9, hab: "Pasar",
        ok: { txt: "La dejas muerta en la esquina y un tuyo la cruza sin que nadie le toque. ¡Touchdown!", gol: true, pase: true },
        ko: { txt: "La lees mal y la esquina estaba cubierta. La cortan y salen jugando.", posesion: "rival" } },
      { txt: "Arrancar de frente y cruzar tú", det: "Con dos colgados si hace falta.", stat: "ST", obj: 10, riesgo: true, hab: "Placar",
        ok: { txt: "Bajas el hombro y cruzas la línea con medio equipo encima. ¡Touchdown tuyo!", gol: true },
        ko: { txt: "Te frenan a un paso y te tiran al barro. La bola se queda de su lado.", posesion: "rival" } },
      { txt: "Esprintar por fuera antes de que cierren", det: "La banda, otra vez la banda.", stat: "MA", obj: 9, hab: "Esprintar",
        ok: { txt: "Tiras de piernas por fuera y cruzas antes de que la banda se cierre. ¡Touchdown!", gol: true },
        ko: { txt: "Te cierran contra la cal en el último paso. Saque para ellos.", posesion: "rival" } },
    ] }),
  // Muralla: ellos tienen la bola y suben a por el gol. Fallar es encajar.
  defensa: (pj, m) => ({ etq: "Muralla", h: `${m.rivalCorto} va a por el gol`,
    situ: `${m.rivalCorto} sube con la bola y la línea a la vista. Si no los paras aquí, cruzan. No hay más red detrás de ti.`,
    ops: [
      { txt: "Entrar en seco al que la lleva", det: "Tumbarlo y que la suelte.", stat: "ST", obj: 9, riesgo: true, hab: "Placar",
        ok: { txt: "Le entras de frente, suelta la bola y se queda en el barro. La recuperáis vosotros.", posesion: "propia", baja: true },
        ko: { txt: "Te esquiva con el hombro y cruza la línea. Touchdown suyo.", golRival: true } },
      { txt: "Cerrar el hueco y esperar el error", det: "No entrar: tapar.", stat: "AG", obj: 8, hab: "Placaje defensivo",
        ok: { txt: "Le tapas el camino hasta que se le acaban las ideas y la bola muere. No cruzan.", posesion: "rival" },
        ko: { txt: "Encuentra el hueco que dejaste y se cuela. Touchdown suyo.", golRival: true } },
      { txt: "Anticipar el pase y cortarlo", det: "Adivinar dónde va la bola.", stat: "AG", obj: 10, hab: "Manos seguras",
        ok: { txt: "Sabías dónde iba antes que él. La cortas en el aire y sales corriendo con ella. Vuestra.", posesion: "propia", pase: true },
        ko: { txt: "Te la juegan al hueco que dejaste al saltar. Touchdown suyo.", golRival: true } },
    ] }),
};
/* ===== TIPOS DE PARTIDO (Fase 2) =====
   Cada partido elige un tipo; el tipo decide el arco (cuántas jugadas clave,
   de qué clase) y cómo empiezas (marcador, quién saca). La jugada decisiva
   siempre es la que el partido tiene escrita (sus opciones). Así, con ~9
   plantillas, los ~38 partidos se sienten distintos sin reescribirlos. */
const MATCH_TIPOS = {
  liga:       { plays: ["saque", "ataque"] },
  derbi:      { plays: ["saque", "ataque"] },
  caja:       { plays: ["choque", "ataque"] },
  bandada:    { plays: ["saque", "choque", "ataque"] },
  exhibicion: { plays: ["regate", "ataque"] },
  final:      { plays: ["saque", "ataque", "remate"] },
  remontada:  { plays: ["ataque", "remate"], marcInicial: [0, 1], bola: "rival" },
  muro:       { plays: ["defensa", "defensa"], marcInicial: [1, 0], bola: "rival" },
  ultima:     { plays: [] },
};
const razaDefaultTipo = { humano: "liga", enano: "caja", orco: "bandada", elfo: "exhibicion" };
const tipoDe = (p, raza) => p.tipo || (p.torneo ? "final" : (razaDefaultTipo[raza] || "liga"));
const MATCH_PLAYS = (tipo) => (MATCH_TIPOS[tipo] || MATCH_TIPOS.liga).plays;

const nuevoPj = (nombre, raza) => {
  const H = HISTORIAS[raza];
  const f = H.fichaInicial || H.base; // los que empiezan de crío arrancan con menos
  return { nombre, raza, atr: { Voluntad: 1, Astucia: 1, Ferocidad: 1, Honor: 1, Ambición: 1 },
    MA: f.MA, ST: f.ST, AG: f.AG, AV: f.AV, hab: [...f.hab], pro: !H.fichaInicial,
    rel: { ...H.relInicial }, oro: 0, fama: 0, pv: 2, muertes: 0, flags: {}, palmares: [], spp: 0, nivel: 1, mejorasPend: 0, trofeos: [], noticias: [], lesiones: 0, formaPend: 0,
    racha: 0, records: {}, division: 6, equipo: H.equipoInicial };
};

const cumple = (pj, req) => {
  if (!req) return true;
  for (const [k, v] of Object.entries(req)) {
    if (k === "flag") { if (!pj.flags[v]) return false; }
    else if (k === "noflag") { if (pj.flags[v]) return false; }
    else if (k === "hab") { if (!pj.hab.includes(v)) return false; }
    else if (k === "rel") { if (pj.rel[v[0]] < v[1]) return false; }
    else if (k === "fama" || k === "oro") { if (pj[k] < v) return false; }
    else if (pj.atr[k] < v) return false;
  }
  return true;
};

const textoReq = (req, REL) => Object.entries(req).map(([k, v]) => {
  if (k === "flag") return `recuerdo: ${v}`;
  if (k === "noflag") return `no haber: ${v}`;
  if (k === "hab") return `habilidad: ${v}`;
  if (k === "rel") return `${REL[v[0]]} ≥ ${v[1]}`;
  if (k === "fama") return `Fama ${v}`;
  if (k === "oro") return `${v} coronas`;
  return `${k} ${v}`;
}).join(", ");

const aplicar = (pj, fx) => {
  const RELACIONES = HISTORIAS[pj.raza].rel;
  const q = { ...pj, atr: { ...pj.atr }, rel: { ...pj.rel }, flags: { ...pj.flags }, hab: [...pj.hab] };
  const chips = [];
  for (const [k, v] of Object.entries(fx || {})) {
    if (ATRIBUTOS.includes(k)) { q.atr[k] = Math.max(0, q.atr[k] + v); chips.push(`${v > 0 ? "+" : ""}${v} ${k}`); if (k === "Voluntad" && v > 0) q.pv += v; }
    else if (k === "oro") { q.oro = Math.max(0, q.oro + v); chips.push(`${v > 0 ? "+" : ""}${v} coronas`); }
    else if (k === "oroTodo") { chips.push(`−${q.oro} coronas`); q.oro = 0; }
    else if (k === "oroMitad") { const m = Math.floor(q.oro / 2); q.oro -= m; chips.push(`−${m} coronas`); }
    else if (k === "fama") { q.fama = Math.max(0, q.fama + v); chips.push(`${v > 0 ? "+" : ""}${v} fama`); }
    else if (k === "rel") for (const [r, n] of Object.entries(v)) { if (n) { q.rel[r] = Math.max(-5, Math.min(5, q.rel[r] + n)); chips.push(`${RELACIONES[r]} ${n > 0 ? "+" : ""}${n}`); } }
    else if (k === "flag") { q.flags[v] = true; chips.push(`Recuerdo: ${v}`); }
    else if (k === "flags") { for (const f of v) q.flags[f] = true; }
    else if (k === "stat") for (const [s, n] of Object.entries(v)) {
      // De crío las subidas no pasan de la ficha del reglamento (base): así, al
      // firmar, tu ficha es exactamente la estándar, ni por encima.
      const tope = q.pro ? Infinity : (HISTORIAS[q.raza].base[s] ?? Infinity);
      const nuevo = Math.max(1, Math.min(tope, q[s] + n));
      if (nuevo !== q[s]) { chips.push(`${nuevo - q[s] > 0 ? "+" : ""}${nuevo - q[s]} ${s}`); q[s] = nuevo; }
      else if (n > 0) chips.push(`${s} ya al máximo antes de firmar`);
    }
    else if (k === "hab") { if (!q.hab.includes(v)) { q.hab.push(v); chips.push(`Habilidad: ${v}`); } }
    else if (k === "mut") { if (Math.random() < 0.5) { q.ST += 1; chips.push("Mutación: +1 ST"); } else { q.AG -= 1; chips.push("Mutación: −1 AG"); } }
    else if (k === "division") { q.division = v; chips.push(`División ${v}`); }
    else if (k === "equipo") { q.equipo = v; chips.push(`Fichas por ${v}`); }
    else if (k === "ventaja") { q.flags.ventaja = true; chips.push("El árbitro está comprado"); }
    else if (k === "forma") { q.formaPend = (q.formaPend || 0) + v; chips.push(`Forma: +${v} a tus tiradas del próximo partido`); }
    else if (k === "fichaPro") { // firmas: tu ficha sube (nunca baja) a la del reglamento
      const base = HISTORIAS[q.raza].base;
      ["MA", "ST", "AG", "AV"].forEach((s) => { if (base[s] > q[s]) { chips.push(`+${base[s] - q[s]} ${s} (profesional)`); q[s] = base[s]; } });
      for (const h of base.hab) if (!q.hab.includes(h)) { q.hab.push(h); chips.push(`Habilidad: ${h}`); }
      q.pro = true;
    }
  }
  return { q, chips };
};

export default function App() {
  const [fase, setFase] = useState("portada");
  const [raza, setRaza] = useState("humano");
  const [nombre, setNombre] = useState("");
  const [pj, setPj] = useState(null);
  const [idx, setIdx] = useState(0);
  const [panel, setPanel] = useState(null); // resultado tras elegir
  const [libro, setLibro] = useState(false);
  const [cronica, setCronica] = useState([]);
  const [muerteInfo, setMuerteInfo] = useState(null);
  const [mejora, setMejora] = useState(null);
  const [mt, setMt] = useState(null);
  const [prensa, setPrensa] = useState(false);
  const [liga, setLiga] = useState(false);
  const [entre, setEntre] = useState(null);
  const [guardada, setGuardada] = useState(() => leer(SAVE, null));
  const [vidas, setVidas] = useState(() => leer(VIDAS, []));

  useEffect(() => {
    if (!pj || ["portada", "epilogo", "muerteFinal"].includes(fase)) return;
    const s = { fase, raza, pj, idx, cronica, muerteInfo, panel, mejora, mt, entre };
    try { localStorage.setItem(SAVE, JSON.stringify(s)); } catch {}
  }, [fase, pj, idx, cronica, panel, muerteInfo, raza]);

  const continuarGuardada = () => {
    const s = guardada; if (!s) return;
    setRaza(s.raza); setPj({ spp: 0, nivel: 1, mejorasPend: 0, trofeos: [], noticias: [], racha: 0, records: {}, pro: true, ...s.pj }); setIdx(s.idx); setCronica(s.cronica || []); setMuerteInfo(s.muerteInfo || null); setPanel(s.panel || null); setMejora(s.mejora || null); setMt(s.mt || null); setEntre(s.entre || null); setFase(s.fase);
  };
  const guardarVida = (texto, muerto) => {
    const v = [{ nombre: pj.nombre, raza: HISTORIAS[pj.raza].nombre, texto, muerto, fecha: new Date().toLocaleDateString() }, ...vidas].slice(0, 20);
    setVidas(v); try { localStorage.setItem(VIDAS, JSON.stringify(v)); localStorage.removeItem(SAVE); } catch {}
    setGuardada(null);
  };

  const H = HISTORIAS[raza];
  const ORDEN = ordenDe(H);
  const ESCENAS = H.escenas, CAPITULOS = H.capitulos, MUERTES = H.muertes, RELACIONES = H.rel;
  const escena = idx < ORDEN.length ? ESCENAS[ORDEN[idx].id] : null;
  const partidoJugadas = !!(pj && escena && escena.partido && !escena.partido.clasico && MATCH_PLAYS(tipoDe(escena.partido, pj.raza)).length > 0);
  const cap = idx < ORDEN.length ? CAPITULOS.find((c) => c.id === ORDEN[idx].cap) : null;
  const laLiga = pj && cap ? tablaLiga(pj, cap) : null;
  const esPrimeraDeCap = cap && cap.escenas[0] === ORDEN[idx].id;

  const empezar = () => {
    const p = nuevoPj(nombre.trim() || { humano: "Josef hijo", enano: "Balin el Rápido", orco: "El Pequeño", elfo: "Aelindra" }[raza], raza);
    p.legado = vidas.slice(0, 3);
    setPj(p); setIdx(0); setCronica([]); setFase("capitulo");
  };

  const irA = (i, p0) => {
    const p = p0 || pj;
    while (i < ORDEN.length && ESCENAS[ORDEN[i].id].condicion && !ESCENAS[ORDEN[i].id].condicion(p)) i++;
    if (i >= ORDEN.length) { setFase("epilogo"); return; }
    setIdx(i); setMt(null);
    const c = CAPITULOS.find((x) => x.id === ORDEN[i].cap);
    if (c.escenas[0] === ORDEN[i].id) {
      setPj((q0) => {
        const ev = (TIEMPO[q0.raza] && TIEMPO[q0.raza][c.id]) ? TIEMPO[q0.raza][c.id](q0) : null;
        const q = ev ? aplicar(q0, ev).q : q0;
        return { ...q, pv: q.pv + 2, noticias: [...noticiasCapitulo(q, H, c), ...(q.noticias || [])].slice(0, 40) };
      });
      if (c.id > 1 && TRANSICIONES[p.raza][c.id]) { setEntre({ cap: c.id, hechas: [], panel: null }); setFase("entreacto"); }
      else setFase("capitulo");
    }
    else setFase("escena");
  };

  /* ---------- entreacto ---------- */
  const elegirEntreacto = (act) => {
    // Ya profesional (pj.pro): las tardes dejan de subir características y dan
    // "forma" (empujón temporal para el próximo partido), como el reglamento
    // (las características ya solo suben al subir de nivel). De crío suben
    // características, pero sin pasar de la ficha estándar (tope en aplicar).
    let fx = act.fx;
    if (pj.pro && fx.stat) {
      const n = Object.values(fx.stat).reduce((a, b) => a + b, 0);
      const { stat, ...resto } = fx;
      fx = { ...resto, forma: n };
    }
    const { q, chips } = aplicar(pj, fx);
    setPj(q);
    setCronica((c) => [...c, `Entre capítulos: ${act.txt}`]);
    setEntre({ ...entre, hechas: [...entre.hechas, act.id], panel: { texto: act.msg, chips } });
  };
  const seguirEntreacto = () => {
    if (entre.hechas.length >= 2) { setEntre(null); setFase("capitulo"); }
    else setEntre({ ...entre, panel: null });
  };

  /* ---------- partido por turnos ---------- */
  const iniciarPartido = () => {
    const p = escena.partido, capId = ORDEN[idx].cap;
    const aliados = ALIADOS[pj.raza](pj, capId).filter((a) => a.si).map((a) => ({ ...a, herido: false }));
    const estilo = estiloDe(p.rival, p.fuerza);
    const intro = [`Salta al campo ${pj.equipo}${aliados.length ? ` con ${aliados.map((a) => a.nombre).join(", ")}` : ", y no hay nadie en el campo a quien conozcas"}. Enfrente, ${p.rival}.`];
    const log = [];
    let clima = d6() + d6();
    const CLIMAS = { 2: ["Calor asfixiante", "un compañero se queda en el banquillo por el calor"], 3: ["Muy soleado", "−1 a los pases"], 11: ["Lluvioso", "−1 a recoger y recibir"], 12: ["Ventisca", "−1 a las carreras; solo pases cortos"] };
    const m = { turno: 1, max: 5, marcador: [0, 0], avance: 0, avanceRival: 0, fatiga: 0, ko: false, aliados, estilo, fuerza: p.fuerza, pe: 0, bajas: 0, tds: 0, pases: 0, cubiertos: [], fase: "turnos", rerolls: 2, apotecarioUsado: false, posesion: "neutral", log, intro };
    const aplicarClima = () => { m.clima = CLIMAS[clima] ? CLIMAS[clima][0] : "Clima perfecto"; if (CLIMAS[clima]) intro.push(`Clima: ${CLIMAS[clima][0]} (${CLIMAS[clima][1]}).`); if (clima === 2 && m.aliados.length) { const v = pick1(m.aliados); v.herido = true; intro.push(`${v.nombre} se queda en el banquillo con la lengua fuera.`); } };
    aplicarClima();
    const ev = d6() + d6();
    const EVENTOS_SAQUE = { 2: "Árbitro intimidado: hoy el árbitro no ve nada. Una falta gratis.", 3: "Tiempo muerto: el partido se acorta un turno.", 4: "Defensa sólida: el rival se coloca bien. Empiezan con ventaja.", 5: "Patada alta: recoges el saque en carrera. Empezáis avanzados.", 6: "Los hinchas animan: la grada empuja el primer choque.", 7: "Entrenador brillante: una segunda oportunidad extra.", 8: "Clima cambiante.", 9: "Anticipación: os adelantáis un paso antes del silbato.", 10: "¡A la carga!: el rival se lanza. Ganan terreno de salida.", 11: "Indigestión: a un compañero le ha sentado mal el aperitivo.", 12: "Invasión de campo: la grada entra. Empiezas el partido en el suelo." };
    intro.push(`Patada inicial: ${EVENTOS_SAQUE[ev]}`);
    if (ev === 2) m.faltaGratis = true; if (ev === 3) m.max = 4; if (ev === 4) { m.avanceRival = 2; m.posesion = "rival"; } if (ev === 5) { m.avance = 2; m.posesion = "propia"; } if (ev === 6) m.hinchas = true; if (ev === 7) m.rerolls = 3;
    if (ev === 8) { clima = d6() + d6(); aplicarClima(); }
    if (ev === 9) { m.avance = 1; m.posesion = "propia"; } if (ev === 10) { m.avanceRival = 3; m.posesion = "rival"; }
    if (ev === 11 && m.aliados.filter((a) => !a.herido).length) { const v = pick1(m.aliados.filter((a) => !a.herido)); v.herido = true; intro.push(`${v.nombre} sale corriendo hacia la letrina.`); }
    if (ev === 12) m.ko = true;
    if (pj.flags.apaleado) intro.push("Juegas apaleado: −1 a todo.");
    if (!p.clasico) {
      const tp = tipoDe(p, pj.raza), cfg = MATCH_TIPOS[tp] || MATCH_TIPOS.liga;
      m.modo = "jugadas"; m.tipo = tp; m.plays = [...cfg.plays]; m.jIdx = 0; m.ko = false;
      m.rivalCorto = p.rival.replace(/^Los |^Las /, "");
      const marc = p.marcInicial || cfg.marcInicial;
      if (marc) m.marcador = [...marc];
      const bola = p.bola || cfg.bola;
      if (bola) m.posesion = bola;
      if (m.plays.length === 0) m.fase = "clave";
    }
    setMt(m);
  };

  // frase de situación del partido (sin números)
  const situacionPartido = (m) => {
    const d = m.avance - m.avanceRival;
    if (m.marcador[0] > m.marcador[1]) return d >= 3 ? "Domináis y el rival no encuentra la manera." : "Vais por delante, pero el rival aprieta.";
    if (m.marcador[0] < m.marcador[1]) return d <= -3 ? "Os están comiendo el campo." : "Vais por detrás y hay que reaccionar.";
    return d >= 3 ? "Todo igualado, pero el campo es vuestro." : d <= -3 ? "Todo igualado, y el rival empuja más." : "Partido igualado, trabado, todavía por decidir.";
  };
  // qué está pasando al empezar el turno, según quién tiene la bola y el estilo rival
  const introTurno = (m) => {
    const rival = escena.partido.rival;
    const sano = m.aliados.filter((a) => !a.herido);
    const compa = sano.length ? pick1(sano).nombre : null;
    if (m.posesion === "rival") return `${rival} tiene la bola y ${m.estilo === "brutal" ? "avanza repartiendo" : m.estilo === "esquivo" ? "baila alrededor de vuestra línea" : m.estilo === "muro" ? "empuja casilla a casilla" : "corre por las bandas"}. Hay que quitársela.`;
    if (m.posesion === "propia") {
      if (m.avance > m.avanceRival + 2) return `Tenéis la bola cerca de su línea. ${compa ? compa + " pide el balón, libre." : "Hay un hueco delante."} Toca decidir cómo rematar.`;
      return `La bola es vuestra, pero lejos todavía. ${compa ? compa + " se ofrece por delante." : "Hay que avanzar como sea."} ${m.estilo === "brutal" ? "El rival os espera para repartir." : m.estilo === "esquivo" ? "El rival intentará robarla bailando." : m.estilo === "muro" ? "El rival se cierra en bloque." : "El rival presiona arriba."}`;
    }
    return `Bola suelta en el centro, de nadie. ${compa ? compa + " se coloca a tu lado." : "Estás solo delante de su línea."} ${m.estilo === "brutal" ? "El rival busca pelea por ella." : m.estilo === "esquivo" ? "El rival no quiere chocar: quiere quedársela sin tocar." : m.estilo === "muro" ? "El rival se cierra en bloque." : "El rival corre a por ella."}`;
  };
  // etiquetas de las opciones según el turno (a quién presionas, qué bola)
  const opcionesTurno = (m) => {
    const rival = escena.partido.rival;
    const sano = m.aliados.filter((a) => !a.herido);
    const compa = sano.length ? sano[0].nombre : null;
    const defensa = m.posesion === "rival";
    const suelta = m.posesion === "neutral";
    return {
      presionar: defensa
        ? { nombre: `Ir a por el que lleva la bola`, det: `Le entras de frente para tumbarle y cortar el ataque de ${rival}.` }
        : suelta
        ? { nombre: `Ganar la bola a golpes`, det: `Te abres paso a placajes hasta el balón suelto.` }
        : { nombre: `Abrir hueco a golpes`, det: `Bajas el hombro sobre su línea para que los tuyos pasen.` },
      bola: defensa
        ? { nombre: `Robar la bola`, det: `Te lanzas a por el balón antes de que ${rival} lo asiente.` }
        : suelta
        ? { nombre: `Recoger la bola y salir`, det: `Coges el balón suelto y sales jugando antes de que llegue el rival.` }
        : { nombre: compa ? `Jugarla con ${compa}` : `Buscar el hueco con la bola`, det: compa ? `Combinas con ${compa} por fuera de la defensa.` : `Cuelas la bola por donde no miran.` },
      correr: { nombre: `Correr por la banda`, det: `Coges el balón y tiras de velocidad, lejos del choque.` },
      aguantar: { nombre: `Plantarte y aguantar`, det: `Sujetas la línea y dejas que ${rival} se estrelle. Recuperas fuelle.` },
      cubrir: sano.length < m.aliados.length ? { nombre: `Cubrir a ${m.aliados.find((a) => a.herido).nombre}`, det: `Te pones delante hasta que se levanta. No avanzas, pero no le rematan.` } : null,
    };
  };

  const jugarTurno = (tac) => {
    const m = { ...mt, aliados: mt.aliados.map((a) => ({ ...a })), log: [...mt.log], marcador: [...mt.marcador], cubiertos: [...mt.cubiertos] };
    const rival = escena.partido.rival;
    const has = (h) => pj.hab.includes(h);
    // Posición emergente: tu perfil te da +1 en "tu" acción (lo que se te da bien).
    const miAccion = H.emergente ? { Blitzer: "presionar", Receptor: "correr", Lanzador: "bola", Liniero: "aguantar" }[puestoEmergente(pj).clave] : null;
    const sig = (a) => (miAccion === a ? 1 : 0);
    const defensa = m.posesion === "rival";
    const suelta = m.posesion === "neutral";
    const poder = m.aliados.filter((a) => !a.herido).reduce((t, a) => t + a.ST + a.AG, 0) / 4;
    const fat = (m.fatiga >= 3 ? -1 : 0) + (pj.flags.apaleado ? -1 : 0);
    const climaMod = (stat, riesgo) => (m.clima === "Lluvioso" && stat === "AG") ? -1 : (m.clima === "Muy soleado" && stat === "AG" && !riesgo) ? -1 : (m.clima === "Ventisca" && stat === "MA") ? -1 : 0;
    const linea = [];
    let tecnico = "";
    const tirar = (stat, obj, bonus, riesgo, habRel) => {
      const mod = (stat === "MA" ? Math.floor(pj.MA / 3) : pj[stat]) + bonus + fat + climaMod(stat, riesgo) + (pj.formaPend || 0);
      let d = [d6(), d6()], tot = d[0] + d[1] + mod, rep = null;
      if (tot < obj && habRel && has(habRel)) { d = [d6(), d6()]; tot = d[0] + d[1] + mod; rep = habRel; }
      else if (tot < obj && m.rerolls > 0) { m.rerolls--; d = [d6(), d6()]; tot = d[0] + d[1] + mod; rep = "2ª oportunidad"; }
      tecnico = `${stat === "MA" ? "Mov" : stat} ${d[0]}+${d[1]}${mod >= 0 ? "+" : ""}${mod} = ${tot} vs ${obj}${rep ? " · repetida (" + rep + ")" : ""}`;
      return { ok: tot >= obj };
    };
    const tabla = PE(pj.raza);
    if (m.ko) { m.ko = false; linea.push("Vuelves en ti tirado en el barro; este turno lo juega el equipo sin ti."); }
    else if (tac === "presionar") {
      const obj = 8 + m.fuerza + (m.estilo === "muro" ? 1 : 0) - (m.hinchas ? 1 : 0);
      m.hinchas = false;
      const r = tirar("ST", obj, (has("Golpe mortífero") ? 1 : 0) + (has("Furia") ? 2 : 0) + (has("Agallas") && m.fuerza >= 3 ? 1 : 0) + (has("Placaje defensivo") && m.estilo === "esquivo" ? 1 : 0) + sig("presionar"), true, "Placar");
      m.fatiga++;
      if (r.ok) {
        m.avance += 3;
        if (defensa) m.posesion = "neutral"; else if (suelta) m.posesion = "propia";
        if (Math.random() < 0.35 + (has("Golpe mortífero") ? 0.15 : 0)) { m.bajas++; m.pe += tabla.baja; linea.push(defensa ? `Le entras con todo y el que llevaba la bola se queda en el suelo. La suelta: uno menos de ${rival}.` : `Revientas la línea y uno de ${rival} sale en camilla. Se abre el campo.`); }
        else linea.push(defensa ? `Le paras en seco y ${rival} pierde el ataque; la bola queda suelta.` : `Empujas y su línea retrocede un paso.`);
      } else {
        linea.push(defensa ? `Le entras y rebotas: sigue de pie, con la bola.` : `Bajas el hombro y rebotas contra su línea.`);
        if (m.estilo === "brutal" && Math.random() < 0.4 && !has("Mantenerse firme")) { const arm = d6() + d6(); if (arm >= pj.AV - (has("Furia") ? 1 : 0)) { let her = d6() + d6(); if (her === 8 && has("Cabeza dura")) her = 7; if (her >= 8) { m.ko = true; linea.push("Te devuelven el golpe y te dejan KO."); } else linea.push("Te tiran al barro, pero te levantas."); } }
      }
    } else if (tac === "bola") {
      const obj = 7 + m.fuerza + (m.estilo === "esquivo" ? 1 : 0);
      const r = tirar("AG", obj, (has("Pasar") ? 1 : 0) + (has("Precisión") ? 1 : 0) + (has("Atrapar") ? 1 : 0) + sig("bola"), false, "Manos seguras");
      if (r.ok) { m.avance += 3; m.pe += tabla.pase; m.pases++; m.posesion = "propia"; linea.push(defensa ? `Te cuelas y le robas el balón de las manos. Ahora es vuestro.` : suelta ? `Recoges la bola suelta y sales jugando. Es vuestra.` : `Mueves la bola por donde no miran y ganáis metros.`); }
      else { m.avance = Math.max(0, m.avance - 2); m.avanceRival += 2; m.posesion = "rival"; linea.push(defensa ? `Llegas tarde al balón y ${rival} lo asienta.` : `Se te escurre la bola y ${rival} la recoge.`); }
    } else if (tac === "correr") {
      const r = tirar("MA", 8, (has("Esprintar") ? 1 : 0) + (has("Pies firmes") ? 1 : 0) + sig("correr"), true, null);
      if (r.ok) { m.avance += 2; m.posesion = "propia"; linea.push(`Tiras de velocidad por la banda y ganas metros sin que te toquen.`); } else linea.push(`Te cierran la banda y no pasas.`);
    } else if (tac === "aguantar") {
      const r = tirar("ST", 6 + m.fuerza, Math.floor(pj.atr.Voluntad / 3) + (has("Defensa") ? 1 : 0) + (has("Romper defensas") ? 1 : 0) + (has("Mantenerse firme") ? 1 : 0) + sig("aguantar"), false, "Placar");
      if (r.ok) { m.avanceRival = Math.max(0, m.avanceRival - 3); m.fatiga = Math.max(0, m.fatiga - 1); linea.push(`Plantas la línea y ${rival} se estrella una y otra vez. Recuperas aire.`); } else linea.push(`Aguantas a medias: te empujan un paso, pero no ceden del todo.`);
    } else if (tac === "cubrir") {
      const h = m.aliados.find((a) => a.herido);
      if (h) { h.herido = false; m.cubiertos.push(h.nombre); m.avanceRival = Math.max(0, m.avanceRival - 1); linea.push(`Te pones delante de ${h.nombre} hasta que se levanta. Vuelve al campo, y no lo olvidará.`); }
    }
    const eq = d6() + Math.round(poder);
    if (eq >= 6 + m.fuerza) { m.avance += 2; const a = m.aliados.filter((x) => !x.herido); if (a.length) linea.push(`${pick1(a).nombre} abre un hueco y el equipo avanza.`); }
    if (m.avance >= 10) { m.marcador[0]++; m.avance = 0; m.posesion = "rival"; if (["bola", "correr", "presionar"].includes(tac) && !m.ko) { m.tds++; m.pe += tabla.td; linea.push(`Cruzas la línea. ¡Touchdown vuestro!`); } else { const sanos = m.aliados.filter((x) => !x.herido); linea.push(`${sanos.length ? pick1(sanos).nombre : "Un compañero"} cruza. ¡Touchdown de ${pj.equipo}!`); } }
    const rv = d6() + m.fuerza + (m.estilo === "esquivo" ? 1 : 0);
    const def = 5 + Math.round(poder / 2) + (tac === "aguantar" ? 2 : 0);
    if (rv >= def) {
      m.avanceRival += m.estilo === "rápido" ? 4 : 3;
      if (m.posesion !== "propia") m.posesion = "rival";
      linea.push(pick1([`${rival} recupera y contraataca por el centro.`, `${rival} coge la bola y encuentra un hueco.`, `${rival} empuja con el balón y os gana terreno.`]));
      if (m.estilo === "brutal" && Math.random() < 0.3) { const sanos = m.aliados.filter((x) => !x.herido); if (sanos.length) { const v = pick1(sanos); v.herido = true; linea.push(`${v.nombre} cae herido en el choque.`); } }
    }
    if (m.avanceRival >= 10) { m.marcador[1]++; m.avanceRival = 0; m.posesion = "propia"; linea.push(`${rival} cruza vuestra línea. Touchdown suyo. Saque para vosotros.`); }
    m.log.push({ turno: m.turno, texto: linea.join(" "), tecnico });
    m.turno++;
    if (m.turno > m.max) { m.fase = "clave"; }
    setMt(m);
  };

  // Partido "jugada a jugada": cada jugada clave usa la ficha real del pj.
  // Sistema de heridas del reglamento (armadura → heridas → apotecario → D16),
  // compartido por la jugada decisiva escrita y por las jugadas clave. Muta q
  // (que ya llevas apaleado, herida persistente o −1 permanente) y dice si mueres.
  const tirarHerida = (q, m) => {
    const has = (h) => q.hab.includes(h);
    const chips = []; let texto = "", muerte = false;
    const arm = d6() + d6();
    const avEf = q.AV - (has("Furia") ? 1 : 0);
    if (arm >= avEf) {
      let her = d6() + d6() + (q.lesiones || 0);
      if (her === 8 && has("Cabeza dura")) her = 7;
      const apot = ORDEN[idx].cap >= 3 && m && !m.apotecarioUsado;
      if (her >= 8 && apot) { const her2 = d6() + d6() + (q.lesiones || 0), mejor = Math.min(her, her2); chips.push(`Apotecario: heridas ${her} → ${her2}${her2 > her ? " (se queda con la mejor: " + mejor + ")" : ""}`); her = mejor; if (m) m.apotecarioUsado = true; }
      if (her <= 7) texto = " Te dejan aturdido en el barro; te levantas dolorido.";
      else if (her <= 9) texto = " Te dejan KO. Ves el resto del partido desde el banquillo.";
      else {
        const les = 1 + Math.floor(Math.random() * 16);
        if (les <= 8) { chips.push("Lesión: magullado"); texto = " Sales en camilla. Magullado: nada que un barril no cure."; }
        else if (les <= 10) { chips.push("Lesión: apaleado (próximo partido a medias)"); q.flags.apaleado = true; texto = " Apaleado. El próximo partido lo juegas a medias."; }
        else if (les <= 12) { chips.push("Lesión grave: herida persistente"); q.flags.apaleado = true; q.lesiones = (q.lesiones || 0) + 1; texto = " Herida grave. Curará mal, y a partir de ahora cada golpe cuenta un poco más."; }
        else if (les <= 14) { const d = d6(); const st = d <= 2 ? "MA" : d <= 4 ? "AV" : d === 5 ? "AG" : "ST"; q[st] = Math.max(1, q[st] - 1); chips.push(`Herida permanente: −1 ${st}`); texto = ` Herida permanente. ${st === "MA" ? "Ya no corres igual." : st === "AV" ? "La armadura ya no cierra." : st === "AG" ? "Las manos no obedecen del todo." : "Te falta algo en los brazos."}`; }
        else { muerte = true; }
      }
    }
    return { chips, texto, muerte };
  };

  const jugarJugada = (o) => {
    const m = { ...mt, aliados: mt.aliados.map((a) => ({ ...a })), log: [...mt.log], marcador: [...mt.marcador] };
    const tabla = PE(pj.raza);
    const r = rollKey(pj, m, o);
    const res = r.ok ? o.ok : o.ko;
    if (res.posesion) m.posesion = res.posesion;
    if (res.gol) { m.marcador[0]++; m.tds++; m.pe += tabla.td; }
    if (res.baja) { m.bajas++; m.pe += tabla.baja; }
    if (res.pase) { m.pases++; m.pe += tabla.pase; }
    if (res.golRival) m.marcador[1]++;
    // Una opción arriesgada que falla te expone al golpe: armadura, heridas y,
    // si suena la flauta mala, la camilla, el −1 permanente o la muerte.
    let extra = "", herChips = [], muerte = false, herido = false;
    let q = pj;
    if (o.riesgo && !r.ok) {
      const qq = { ...pj, flags: { ...pj.flags }, hab: [...pj.hab] };
      const h = tirarHerida(qq, m);
      if (h.texto || h.muerte) { extra = h.texto; herChips = h.chips; muerte = h.muerte; herido = true; q = qq; }
    }
    m.log.push({ turno: m.jIdx + 1, texto: res.txt + extra, tecnico: r.tecnico, chips: herChips.length ? herChips : undefined });
    m.jIdx++;
    if (muerte) {
      // Mueres en el campo: se acaba el partido aquí y entra la muerte.
      m.fase = "clave"; setMt(m);
      const n = q.muertes + 1;
      setCronica((c) => [...c, `Cayó en el campo contra ${escena.partido.rival}. ${m.marcador[0]}-${m.marcador[1]}.`]);
      if (n > MAX_MUERTES) { setPj({ ...q, muertes: n }); setMt(null); setFase("muerteFinal"); guardarVida(`${pj.nombre} murió en el barro y nadie vino.`, true); return; }
      const md = MUERTES[n - 1];
      const { q: q2, chips } = aplicar({ ...q, muertes: n }, md.fx);
      setPj(q2); setMt(null); setMuerteInfo({ ...md, chips }); setFase("muerte");
      return;
    }
    if (herido) setPj(q);
    if (m.jIdx >= m.plays.length) m.fase = "clave";
    setMt(m);
  };

  const elegir = (op, forzada) => {
    let base = pj;
    if (forzada) base = { ...pj, pv: Math.max(0, pj.pv - 2) };
    if (op.tirada) { resolverTirada(op, base, forzada); return; }
    const { q, chips } = aplicar(base, op.fx);
    if (forzada) chips.unshift("−2 Voluntad (forzado)");
    setPj(q);
    setCronica((c) => [...c, `${escena.titulo}: ${op.txt}`]);
    setPanel({ texto: typeof op.msg === "function" ? op.msg(q) : op.msg, chips });
  };

  const situacionTexto = () => {
    if (!mt) return "con el partido por empezar";
    const [a, b] = mt.marcador;
    if (a === b) return a === 0 ? "con el marcador a cero" : `con el partido igualado a ${a === 1 ? "uno" : a}`;
    const diff = Math.abs(a - b), gana = a > b;
    const palabra = diff === 1 ? "por un tanto" : diff === 2 ? "por dos" : "por una goleada";
    return gana ? `con vuestro equipo por delante ${palabra}` : `con vuestro equipo por detrás ${palabra}`;
  };
  const conMarcador = (txt) => typeof txt === "string" ? txt.replace(/\{marcador\}/g, situacionTexto()) : txt;

  const conMarcadorMsg = (txt) => {
    if (!mt || typeof txt !== "string") return txt;
    const [a, b] = mt.marcador;
    const sit = a === b ? (a === 0 ? "con el marcador a cero" : `con el partido igualado`) : a > b ? "con los vuestros por delante" : "con los vuestros por detrás";
    return txt.replace(/\{marcador\}/g, sit);
  };
  const fraseLibro = (pj, esc, res, marc, opTxt) => {
    const rival = esc.partido.rival;
    const f = pj.flags;
    // frases especiales por lo que acabas de hacer
    if (f.kurtCaido) return `Ganaste el derbi, pero Kurt salió del campo sin mirarte.`;
    if (f.dejasteKurt) return `Dejaste pasar a Kurt. La grada te abucheó; él te abrazó. Nadie lo entendió.`;
    if (f.grimnirTuvoSuTroll) return `Ganaste, y Grimnir por fin encontró a quién morir bien.`;
    if (f.rompisteAOldBones) return `Rompiste lo que quedaba de Old Bones. Athanar aplaudió con la boca cerrada.`;
    if (f.dorinSeFueAndando) return `Dorin salió andando por la banda entera, con el brazalete puesto.`;
    if (f.snotligCaliz) return `Un goblin de debajo de un puente levantó el Cáliz.`;
    if (esc.partido.torneo && res === "Victoria") return `Levantaste la ${esc.partido.torneo}. Se recordará.`;
    if (res === "Victoria") return `${marc[0]}-${marc[1]} contra ${rival}. Ganaste, y algo cambió.`;
    if (res === "Derrota") return `${marc[0]}-${marc[1]} contra ${rival}. Perdiste de pie.`;
    return `${marc[0]}-${marc[1]} contra ${rival}. Un empate que nadie recuerda igual.`;
  };
  const resolverTirada = (op, base, forzada) => {
    const opTxt = op.txt;
    const t = op.tirada;
    const statMod = t.stat === "MA" ? Math.floor(base.MA / 3) : base[t.stat];
    const atrKey = t.stat === "ST" ? "Ferocidad" : t.stat === "AG" ? "Astucia" : "Voluntad";
    const atrMod = Math.floor(base.atr[atrKey] / 3);
    let mod = statMod + atrMod + ((base.flags.ventaja || (mt && mt.faltaGratis)) && t.falta ? 2 : 0) + (base.formaPend || 0);
    const llevas = ["cantoRoto", "placaEntregada", "cancionPuerta", "promesaBruk", "chicoDesague", "crioPuerta", "ojoEntregado", "jarraEntregada", "bendicionLeyenda", "cromoLeyenda", "grimnirTuvoSuTroll", "dorinSeFueAndando", "dorinAnoto", "contasteConSnotlig", "huecoEnGorgomor", "amanecerConBerthold", "bailasteDeNoche", "recetaParaTodos"].filter((f) => base.flags[f]);
    if (escena.partido && llevas.length) mod += 1;
    const ulrich = escena.partido && ORDEN[idx].cap === 6 && (base.flags.enemigoUlrich || base.flags.rencorUlrich);
    if (ulrich) mod -= 1;
    if (base.flags.apaleado && escena.partido) mod -= 1;
    const has = (h) => base.hab.includes(h);
    const habsUsadas = [];
    const bonusHab = (h, n) => { if (has(h)) { mod += n; habsUsadas.push(`${h} +${n}`); } };
    const estiloRival = escena.partido ? estiloDe(escena.partido.rival, escena.partido.fuerza) : "";
    if (t.stat === "ST") { if (t.riesgo) { bonusHab("Golpe mortífero", 1); bonusHab("Furia", 2); if ((escena.partido?.fuerza || 2) >= 3) bonusHab("Agallas", 1); if (estiloRival === "esquivo") bonusHab("Placaje defensivo", 1); } else { bonusHab("Defensa", 1); bonusHab("Romper defensas", 1); bonusHab("Placaje defensivo", 1); } }
    if (t.stat === "AG") { if (t.riesgo) { bonusHab("Saltar", 1); if (base.ST >= 4) bonusHab("Abrirse paso", 1); } else { bonusHab("Pasar", 2); bonusHab("Precisión", 1); bonusHab("Atrapar", 1); } }
    if (t.stat === "MA") { bonusHab("Esprintar", 1); if (t.riesgo) bonusHab("Pies firmes", 1); }
    if (t.falta) bonusHab("Jugar sucio", 2);
    const habRel = t.stat === "ST" ? "Placar" : t.stat === "AG" ? (t.riesgo ? "Esquivar" : "Manos seguras") : null;
    let dados = [d6(), d6()], total = dados[0] + dados[1] + mod, repetida = false;
    if (total < t.obj && habRel && has(habRel)) { dados = [d6(), d6()]; total = dados[0] + dados[1] + mod; repetida = habRel; }
    const exito = total >= t.obj;
    const rama = exito ? t.ok : t.ko;
    let { q, chips } = aplicar(base, rama.fx);
    if (forzada) chips.unshift("−2 Voluntad (forzado)");
    if (mt && mt.faltaGratis && t.falta) { chips.unshift("+2: el árbitro no ve nada"); mt.faltaGratis = false; }
    if (escena.partido && llevas.length) chips.unshift("+1 por lo que llevas contigo");
    if (ulrich) chips.unshift("−1: Ulrich Manoslargas arbitra y no ha olvidado");
    if (base.flags.apaleado && escena.partido) chips.unshift("−1: juegas apaleado");
    let texto = typeof rama.txt === "function" ? rama.txt(base) : rama.txt, muerte = false;
    if (!exito && t.riesgo) {
      const h = tirarHerida(q, mt);
      h.chips.forEach((c) => chips.push(c));
      texto += h.texto;
      if (h.muerte) muerte = true;
    }
    if (escena.partido) {
      const m = mt || { marcador: [0, 0], pe: 0, bajas: 0, tds: 0, pases: 0, aliados: [], cubiertos: [] };
      const tabla = PE(q.raza);
      let pe = m.pe;
      if (exito) { if (rama.fx.gol) pe += tabla.td; if (t.stat === "ST" && t.riesgo) pe += tabla.baja; if (t.stat === "AG" && !t.riesgo) pe += tabla.pase; }
      q.spp = (q.spp || 0) + pe; chips.push(`+${pe} PE`);
      const nv = nivelDe(q.spp);
      if (nv > (q.nivel || 1)) { q.mejorasPend = (q.mejorasPend || 0) + (nv - (q.nivel || 1)); q.nivel = nv; chips.push(`Subes a nivel ${nv}`); }
      const marc = [m.marcador[0] + (rama.fx.gol ? 1 : 0), m.marcador[1] + (rama.fx.golRival ? 1 : 0)];
      const res = marc[0] > marc[1] ? "Victoria" : marc[0] < marc[1] ? "Derrota" : "Empate";
      q.palmares = [...q.palmares, { rival: escena.partido.rival, res, marcador: `${marc[0]}-${marc[1]}`, cap: ORDEN[idx].cap }];
      chips.push(`${res} ${marc[0]}-${marc[1]} contra ${escena.partido.rival}`);
      // Fase 4: posos del resultado (racha, récords, fama/afición) y movimiento en la tabla.
      const divCap = divisionDe(q.raza, ORDEN[idx].cap);
      const rankAntes = cap ? (tablaLiga(pj, cap) || {}).rank : null;
      const posos = pososPartido(q, res, marc, divCap, escena.partido.torneo);
      posos.chips.forEach((c) => chips.push(c));
      const rankDespues = cap ? (tablaLiga(q, cap) || {}).rank : null;
      const movTabla = rankAntes && rankDespues ? { antes: rankAntes, despues: rankDespues } : null;
      const bajasTot = m.bajas + (exito && t.stat === "ST" && t.riesgo ? 1 : 0);
      if (bajasTot) chips.push(`${bajasTot} ${bajasTot === 1 ? "baja causada" : "bajas causadas"}`);
      // Jugador del partido: en S3 se sortea entre los nominados (1d6). Eres
      // candidato si hiciste algo (TD, baja o pase); luego el sorteo decide.
      const nominadoMvp = res !== "Derrota" && (m.tds + (rama.fx.gol ? 1 : 0) >= 1 || bajasTot >= 1 || (m.pases || 0) >= 1);
      const mvp = nominadoMvp && d6() >= 5;
      if (mvp) { q.spp += tabla.mvp; chips.push(`Jugador del partido, por sorteo (+${tabla.mvp} PE)`); }
      const cr = q.car || {};
      q.car = { pj: (cr.pj || 0) + 1, td: (cr.td || 0) + m.tds + (rama.fx.gol ? 1 : 0), baja: (cr.baja || 0) + bajasTot, pase: (cr.pase || 0) + (m.pases || 0), mvp: (cr.mvp || 0) + (mvp ? 1 : 0) };
      if (q.formaPend) { chips.push(`Forma gastada (+${q.formaPend} este partido)`); q.formaPend = 0; }
      if (q.flags.apaleado) { const f = { ...q.flags }; delete f.apaleado; q.flags = f; }
      if (m.cubiertos.length) { q.rel = { ...q.rel, club: Math.min(5, q.rel.club + 1) }; chips.push(`${RELACIONES.club} +1 (cubriste a ${m.cubiertos.join(", ")})`); }
      if (escena.partido.torneo && res === "Victoria") { q.trofeos = [...(q.trofeos || []), escena.partido.torneo]; chips.push(`Trofeo: ${escena.partido.torneo}`); q.fama += 10; }
      q.noticias = [...posos.noticias, ...noticiasPartido(q, H, escena.partido, res, marc, mvp, bajasTot, escena.partido.torneo), ...(q.noticias || [])].slice(0, 40);
      if (rama.fx.expulsion) {
        const sobornos = (HISTORIAS[q.raza].reglas || []).includes("Sobornos y Corrupción");
        if (has("Furtivo") && d6() >= 4) chips.push("Furtivo: el árbitro no lo ve. Sigues en el campo.");
        else if (sobornos && d6() >= 2) chips.push("Soborno: el árbitro se guarda la mano en el bolsillo. Sigues en el campo.");
        else chips.push("Expulsado");
      }
      if (q.flags.ventaja) { const f = { ...q.flags }; delete f.ventaja; q.flags = f; }
      // Datos para la ficha de después del partido
      const heridosTuyos = (m.aliados || []).filter((a) => a.herido).map((a) => a.nombre);
      const frase = fraseLibro(q, escena, res, marc, opTxt);
      q._postpartido = { partido: escena.partido, res, marc, mvp, bajas: bajasTot, heridosTuyos, frase, racha: q.racha, records: q.records, movTabla, divNombre: divCap ? DIV_NOMBRE[divCap] : null };
      setCronica((c) => [...c, frase]);
    }
    setPj(q);
    setCronica((c) => [...c, `${escena.titulo}: ${op.txt} (${exito ? "éxito" : "fallo"})`]);
    const expulsionReal = rama.fx.expulsion && chips.includes("Expulsado");
    texto = conMarcadorMsg(texto);
    setPanel({ texto, chips, tirada: { dados, mod, total, obj: t.obj, exito, repetida, habsUsadas }, muerte, expulsion: expulsionReal });
  };

  const continuar = () => {
    if (panel?.muerte) {
      const n = pj.muertes + 1;
      if (n > MAX_MUERTES) { setPj((p) => ({ ...p, muertes: n })); setPanel(null); setFase("muerteFinal"); guardarVida(`${pj.nombre} murió por cuarta vez y nadie vino.`, true); return; }
      const m = MUERTES[n - 1];
      const { q, chips } = aplicar({ ...pj, muertes: n }, m.fx);
      setPj(q); setMuerteInfo({ ...m, chips }); setPanel(null); setFase("muerte");
      setCronica((c) => [...c, `Murió en el campo. ${m.titulo} lo devolvió.`]);
      return;
    }
    setPanel(null); setMt(null);
    if (pj._postpartido) { setFase("postpartido"); return; }
    if (pj.mejorasPend > 0) { abrirMejora(pj); return; }
    irA(idx + 1);
  };
  const cerrarPostpartido = () => {
    setPj((p) => { const q = { ...p }; delete q._postpartido; return q; });
    if (pj.mejorasPend > 0) { abrirMejora(pj); return; }
    irA(idx + 1);
  };

  const abrirMejora = (p) => {
    const d = [d6(), d6()];
    const doble = d[0] === d[1], suma = d[0] + d[1];
    const acc = ACCESO[p.raza];
    const cats = doble ? [...acc.p, ...acc.s] : acc.p;
    const lista = Object.entries(HABILIDADES).filter(([h, v]) => cats.includes(v.cat) && v.cat !== "R" && !p.hab.includes(h)).map(([h]) => h);
    const stats = suma >= 12 ? ["ST", "AG"] : suma >= 10 ? ["MA", "AV"] : [];
    setMejora({ dados: d, doble, suma, lista, stats });
    setFase("mejora");
  };

  const elegirMejora = (tipo, valor) => {
    const q = { ...pj, hab: [...pj.hab], mejorasPend: pj.mejorasPend - 1 };
    if (tipo === "hab") q.hab.push(valor); else q[valor] += 1;
    setPj(q);
    setCronica((c) => [...c, tipo === "hab" ? `Aprendió ${valor}.` : `Mejoró su ${valor}.`]);
    setMejora(null);
    if (q.mejorasPend > 0) abrirMejora(q); else irA(idx + 1, q);
  };

  const reiniciar = () => { setFase("portada"); setPj(null); setIdx(0); setPanel(null); setLibro(false); setLiga(false); setPrensa(false); setCronica([]); setNombre(""); };

  /* ---------- epílogo ---------- */
  const epilogo = () => {
    if (!pj) return "";
    const a = pj.atr;
    const dom = ATRIBUTOS.reduce((m, k) => (a[k] > a[m] ? k : m), ATRIBUTOS[0]);
    const rasgo = { Voluntad: "alguien que nunca se rindió", Astucia: "el jugador más listo de su generación", Ferocidad: "el más temido del barro", Honor: "el último jugador honrado del Imperio", Ambición: "alguien que quería más de lo que el mundo ofrecía" }[dom];
    const f = pj.flags;
    const extra = [
      f.paseFinal ? "Su último pase fue el primer touchdown de otro." : f.ultimoTD ? "Cruzó la línea una última vez y no quiso levantarse." : f.salisteAndando ? "Salió del campo andando, antes del silbato, y nadie recuerda el resultado." : f.balonDevuelto ? "En su último partido, un rival le devolvió el balón. Nadie supo por qué." : "",
      (f.inyeccion || f.runaDolor || f.setaDolor || f.saviaDolor) ? "El año sin dolor se cobró lo suyo: murió antes de lo que le tocaba." : "",
      f.finVitalicio ? "" : f.vitalicio ? "El mecenas que no comía nunca canceló el contrato. Alguien, de noche, sigue visitando la tumba." : "",
    ].filter(Boolean).join(" ");
    const tent = TENTACION[pj.raza];
    const cayo = tent && tent.test(pj);
    const juicioTent = tent ? (cayo ? ` Al final cedió a lo que siempre quiso —${tent.nombre.toLowerCase()}—, y pagó el precio.` : ` Tuvo delante lo que siempre quiso —${tent.nombre.toLowerCase()}— y no lo cogió.`) : "";
    return H.epilogo(pj, rasgo) + (extra ? " " + extra : "") + juicioTent;
  };

  /* ---------- vistas ---------- */
  const Chips = ({ items }) => items.length > 0 && <div className="chips">{items.map((c, i) => <span key={i} className={`chip ${c.startsWith("−") || c.includes(" -") ? "neg" : c.startsWith("+") || c.includes(" +") ? "pos" : ""}`}>{c}</span>)}</div>;

  const Cabecera = () => pj && (
    <header className="cab" role="banner">
      <div>
        <div className="cab-nombre">{pj.nombre}</div>
        <div className="cab-sub">{cap ? `${cap.titulo} · ${pj.equipo}` : "Epílogo"}</div>
      </div>
      <nav className="cab-der" aria-label="Tu jugador y los paneles">
        <span>{NIVELES[Math.min(pj.nivel - 1, NIVELES.length - 1)]}</span>
        <span title="Puntos de voluntad para forzar decisiones">Voluntad {pj.pv}</span>
        <span>Fama {pj.fama}</span>
        <span aria-label={`${pj.oro} coronas`}>{pj.oro} co</span>
        {laLiga && <button className="lnk" aria-expanded={liga} onClick={() => { setLiga(!liga); setLibro(false); setPrensa(false); }}>{liga ? "Cerrar tabla" : "La tabla"}</button>}
        <button className="lnk" aria-expanded={libro} onClick={() => { setLibro(!libro); setPrensa(false); setLiga(false); }}>{libro ? "Cerrar libro" : "Libro del destino"}</button>
        <button className="lnk" aria-expanded={prensa} onClick={() => { setPrensa(!prensa); setLibro(false); setLiga(false); }}>{prensa ? "Cerrar" : "Cristalvisión"}</button>
      </nav>
    </header>
  );

  const Libro = () => (
    <div className="libro" role="region" aria-label="Libro del destino">
      <h3>Libro del destino</h3>
      <LineaDeVida />
      <div className="col2">
        <div>
          <p className="etq">Carácter</p>
          {ATRIBUTOS.map((k) => <div key={k} className="fila"><span>{k}</span><i aria-hidden="true" style={{ width: `${pj.atr[k] * 10}%` }} /><b>{pj.atr[k]}</b></div>)}
          <p className="etq">Jugador</p>
          <div className="statrow">{[["MA", pj.MA], ["ST", pj.ST], ["AG", `${7 - pj.AG}+`], ["AV", `${pj.AV}+`]].map(([s, v]) => <span key={s}><b>{v}</b>{s}</span>)}</div>
          {(pj.trofeos || []).length > 0 && <p className="texto">Vitrina: {pj.trofeos.join(", ")}.</p>}
          <p className="mini">{pj.pro ? (H.emergente ? `En formación · apuntas a ${puestoEmergente(pj).nombre}` : H.puesto) : "En formación · aún sin fichar"}{pj.pro && (H.reglas || []).length ? ` · ${H.reglas.join(", ")}` : ""}</p>
          <p className="mini">{NIVELES[Math.min(pj.nivel - 1, NIVELES.length - 1)]} · {pj.spp} PE · siguiente a {UMBRALES.find((u) => u > pj.spp) || "—"} PE{pj.lesiones ? ` · ${pj.lesiones} herida${pj.lesiones > 1 ? "s" : ""} persistente${pj.lesiones > 1 ? "s" : ""}` : ""}</p>
          {pj.hab.length ? pj.hab.map((h) => <p key={h} className="mini"><b>{h}</b>{HABILIDADES[h] ? ` — ${HABILIDADES[h].desc}` : ""}</p>) : <p className="mini">Sin habilidades aún</p>}
          <p className="mini">Muertes: {pj.muertes} de {MAX_MUERTES}</p>
          <p className="mini">Carrera: {(pj.palmares || []).length} partidos · {(pj.car || {}).td || 0} touchdowns · {(pj.car || {}).baja || 0} bajas · {(pj.car || {}).pase || 0} pases · {(pj.car || {}).mvp || 0} veces jugador del partido</p>
          {(pj.racha || (pj.records && (pj.records.mejorVictoria || pj.records.rachaMax))) ? <p className="mini">{pj.racha >= 2 ? `En racha: ${pj.racha} victorias seguidas. ` : pj.racha <= -2 ? `Mala racha: ${-pj.racha} derrotas seguidas. ` : ""}{pj.records?.mejorVictoria ? `Mayor victoria: ${pj.records.mejorVictoria}. ` : ""}{pj.records?.rachaMax >= 2 ? `Mejor racha: ${pj.records.rachaMax} seguidas.` : ""}</p> : null}
        </div>
        <div>
          <p className="etq">Relaciones</p>
          {Object.entries(RELACIONES).map(([k, n]) => <div key={k} className="fila"><span>{n}</span><b className={pj.rel[k] < 0 ? "neg" : ""}>{pj.rel[k] > 0 ? "+" : ""}{pj.rel[k]}</b></div>)}
          {Object.keys(pj.flags).some((f) => PUERTAS[f]) && <>
            <p className="etq">Lo que ya no tiene vuelta</p>
            {Object.keys(pj.flags).filter((f) => PUERTAS[f]).map((f) => <p key={f} className="mini puerta">{PUERTAS[f]}</p>)}
          </>}
          <p className="etq">Recuerdos</p>
          {Object.keys(pj.flags).filter((f) => f !== "ventaja").length === 0 && <p className="mini">Ninguno todavía</p>}
          {Object.keys(pj.flags).filter((f) => f !== "ventaja").map((f) => <p key={f} className="mini">{(H.recuerdos || {})[f] || { bendicionLeyenda: "'No se aguanta. Se sigue'.", cromoLeyenda: "Un cromo firmado por alguien de otra vida." }[f] || f}</p>)}
          {(pj.trofeos || []).length > 0 && <><p className="etq">Vitrina</p><p className="mini">{pj.trofeos.join(" · ")}</p></>}
          {pj.palmares.length > 0 && <><p className="etq">Partidos</p>{pj.palmares.map((p, i) => <p key={i} className="mini">{p.res}{p.marcador ? ` ${p.marcador}` : ""} contra {p.rival}</p>)}</>}
        </div>
      </div>
    </div>
  );

  const Liga = () => laLiga && (
    <div className="libro liga" role="region" aria-label="La tabla de la liga">
      <h3>La tabla</h3>
      <p className="mini liga-cab">{laLiga.divNombre} · jornada {laLiga.jornada} de {laLiga.total}</p>
      <table className="liga-tabla">
        <thead><tr><th>#</th><th className="eq">Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>Pts</th></tr></thead>
        <tbody>
          {laLiga.tabla.map((t, i) => {
            const pos = i + 1;
            const asc = laLiga.nAsc && pos <= laLiga.nAsc;
            const desc = laLiga.nDesc && pos > laLiga.tabla.length - laLiga.nDesc;
            return (
              <tr key={i} className={`${t.you ? "you" : ""} ${asc ? "asc" : ""} ${desc ? "desc" : ""}`}>
                <td className="pos">{pos}</td><td className="eq">{t.nombre.replace(/^Los |^Las /, "")}</td>
                <td>{t.pj}</td><td>{t.g}</td><td>{t.e}</td><td>{t.p}</td><td className="pts">{t.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="liga-zonas">
        {laLiga.nAsc > 0 && <span><i className="z a" aria-hidden="true" />Suben los {laLiga.nAsc} primeros</span>}
        {laLiga.nDesc > 0 && <span><i className="z d" aria-hidden="true" />Bajan los {laLiga.nDesc} últimos</span>}
      </div>
      <p className="liga-estado">{laLiga.estado}</p>
      <p className="mini">Vas {laLiga.rank}º. Tu puesto sale de tus resultados de verdad ({laLiga.real.g}G {laLiga.real.e}E {laLiga.real.p}P en esta división); los rivales están simulados alrededor.</p>
    </div>
  );

  const Prensa = () => (
    <div className="libro prensa" role="region" aria-label="Cristalvisión: lo que se dice de ti">
      <h3>Cristalvisión</h3>
      <p className="mini">Lo que se dice de ti en las tabernas del Mundo Viejo.</p>
      {(pj.noticias || []).length === 0 && <p className="mini">Nadie habla de ti todavía.</p>}
      {(pj.noticias || []).map((n, i) => <p key={i} className="noticia">{n}</p>)}
      {(pj.trofeos || []).length > 0 && <><p className="etq">Vitrina</p><p className="mini">{pj.trofeos.join(" · ")}</p></>}
    </div>
  );

  const Portada = () => (
    <div className="pag centro">
      <p className="etq">Una vida en el barro</p>
      <h1 className="titulo">Barro y Ceniza</h1>
      <p className="lead">La vida y el sufrimiento de un jugador del Barro.</p>
      <div className="razas" role="group" aria-label="Elige tu raza">
        {Object.entries(HISTORIAS).map(([id, h]) => (
          <button key={id} className={`raza ${raza === id ? "activa" : ""}`} aria-pressed={raza === id} onClick={() => setRaza(id)}>
            <b>{h.nombre}</b><small>{h.lema}</small>
            {(() => { const f = h.fichaInicial || h.base; return <span className="mini">{h.emergente ? "Posición: la forjas con tus decisiones" : h.puesto} · empiezas MA {f.MA} ST {f.ST} AG {7 - f.AG}+ AV {f.AV}+{h.fichaInicial ? " (de crío)" : ""}</span>; })()}
          </button>
        ))}
      </div>
      <p className="lead">{H.portada} Puedes morir tres veces. La cuarta no cuenta.</p>
      {vidas.length > 0 && <p className="mini">Es el mismo mundo: {vidas[0].nombre} sigue ahí, en una grada, en una cabina o en una tumba, y esta vida se cruzará con la suya.</p>}
      <label className="campo"><span>Tu nombre</span><input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={{ humano: "Josef hijo, Anselm, Ludo...", enano: "Balin, Thora, Brokk el joven...", orco: "El Pequeño, Zugrat, Morfang...", elfo: "Aelindra, Ithildae, Nimue..." }[raza]} /></label>
      <button className="btn" onClick={empezar}>Abrir el libro</button>
      {guardada && guardada.pj && <button className="btn secundario" onClick={continuarGuardada}>Continuar la vida de {guardada.pj.nombre}</button>}
      {vidas.length > 0 && <>
        <p className="etq">Vidas anteriores</p>
        {vidas.map((v, i) => <p key={i} className="mini vida"><b>{v.nombre}</b> ({v.raza}, {v.fecha}) — {v.texto}</p>)}
      </>}
    </div>
  );

  const Entreacto = () => {
    const acts = ENTREACTOS[pj.raza].filter((a) => a.caps.includes(entre.cap) && !entre.hechas.includes(a.id));
    return (
      <div className="pag">
        <p className="etq">Entre capítulos · el tiempo pasa</p>
        <p className="texto">{TRANSICIONES[pj.raza][entre.cap](pj)}</p>
        {entre.panel ? (
          <div className="panel">
            <p className="texto">{entre.panel.texto}</p>
            <Chips items={entre.panel.chips} />
            <button className="btn" onClick={seguirEntreacto}>{entre.hechas.length >= 2 ? `Abrir el capítulo ${entre.cap}` : "Otra tarde"}</button>
          </div>
        ) : (
          <>
            <p className="etq">{entre.hechas.length === 0 ? "Tienes dos tardes libres. ¿La primera?" : "Queda una tarde. ¿La última?"}</p>
            <div className="lista">
              {acts.map((a) => {
                const ok = cumple(pj, a.req);
                return (
                  <div key={a.id} className={`opcion ${!ok ? "bloq" : ""}`}>
                    <button disabled={!ok} onClick={() => elegirEntreacto(a)}>
                      <b>{a.txt}</b>
                      <span className="mini">{Object.entries(a.fx).map(([k, v]) => k === "stat" ? (pj.pro ? `+${Object.values(v).reduce((x, y) => x + y, 0)} forma (próximo partido)` : Object.entries(v).map(([st, n]) => `+${n} ${st}`).join(", ")) : k === "rel" ? Object.entries(v).map(([r, n]) => `${RELACIONES[r]} ${n > 0 ? "+" : ""}${n}`).join(", ") : k === "fama" ? `+${v} fama` : `${v > 0 ? "+" : ""}${v} ${k}`).join(" · ")}</span>
                      {a.req && !ok && <span className="req">Requiere: {textoReq(a.req, RELACIONES)}</span>}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  const Capitulo = () => (
    <div className="pag centro">
      <p className="etq">Capítulo {cap.id}</p>
      <h1 className="titulo">{cap.titulo}</h1>
      <p className="lead">{cap.sub}</p>
      {IMAGENES[raza] && IMAGENES[raza][cap.id] && <p className="imagen-cap">{IMAGENES[raza][cap.id]}</p>}
      <LineaDeVida />
      {(pj.noticias || []).slice(0, 3).map((n, i) => <p key={i} className="noticia">{n}</p>)}
      <p className="mini">+2 puntos de Voluntad</p>
      <button className="btn" onClick={() => setFase("escena")}>Seguir leyendo</button>
    </div>
  );

  const PartidoVista = () => {
    const rival = escena.partido.rival;
    const enJugadas = mt.modo === "jugadas";
    const ops = enJugadas ? {} : opcionesTurno(mt);
    const jplay = enJugadas && mt.fase === "turnos" ? PLAY_POOL[mt.plays[mt.jIdx]](pj, mt) : null;
    const miPuesto = !enJugadas && H.emergente ? puestoEmergente(pj) : null;
    const miAccionVista = miPuesto ? { Blitzer: "presionar", Receptor: "correr", Lanzador: "bola", Liniero: "aguantar" }[miPuesto.clave] : null;
    const arranque = mt.log.length === 0;
    const pos = mt.posesion;
    const propio = pj.equipo.replace(/^Los |^Las /, "");
    const rivalCorto = rival.replace(/^Los |^Las /, "");
    const posLabel = pos === "propia" ? propio : pos === "rival" ? rivalCorto : "suelto";
    const T = ({ id, o }) => o && (
      <div className="opcion"><button disabled={mt.ko} onClick={() => jugarTurno(id)}>
        <b>{o.nombre}{id === miAccionVista ? " · lo tuyo" : ""}</b><span className="mini">{o.det}</span>
      </button></div>
    );
    // Opción de jugada clave: muestra qué característica tuya decide y tu valor.
    const KJ = ({ o }) => (
      <div className="opcion"><button onClick={() => jugarJugada(o)}>
        <b>{o.txt}</b><span className="mini">{o.det}</span>
        <span className="mini kj-attr">{ATRIB_PARTIDO[o.stat]} · tú {modDe(pj, o.stat) >= 0 ? "+" : ""}{modDe(pj, o.stat)}{o.hab && pj.hab.includes(o.hab) ? ` · ${o.hab}` : ""}</span>
      </button></div>
    );
    // barra de dominio: -1 (rival) .. +1 (nosotros)
    const dom = Math.max(-10, Math.min(10, mt.avance - mt.avanceRival));
    const domPct = 50 + dom * 5;
    return (
      <div className="pag partido">
        {/* MARCADOR */}
        <div className="pm-marcador" role="status" aria-live="polite" aria-label={`Marcador: ${propio} ${mt.marcador[0]}, ${rivalCorto} ${mt.marcador[1]}. ${mt.fase === "turnos" ? (enJugadas ? `Jugada ${mt.jIdx + 1} de ${mt.plays.length}` : `Turno ${Math.min(mt.turno, mt.max)} de ${mt.max}`) : "Jugada final"}.`}>
          <div className="pm-eq" aria-hidden="true"><span className="pm-nom">{propio}</span><span className="pm-gol">{mt.marcador[0]}</span></div>
          <div className="pm-mid" aria-hidden="true">{mt.fase === "turnos" ? (enJugadas ? `jugada ${mt.jIdx + 1}/${mt.plays.length}` : `turno ${Math.min(mt.turno, mt.max)}/${mt.max}`) : "final"}{miPuesto ? ` · ${miPuesto.nombre}` : ""}</div>
          <div className="pm-eq" aria-hidden="true"><span className="pm-gol">{mt.marcador[1]}</span><span className="pm-nom">{rivalCorto}</span></div>
        </div>

        {/* BARRA DE DOMINIO + POSESIÓN */}
        {!enJugadas && <div className="pm-dominio" title="Quién domina el campo" aria-hidden="true">
          <div className="pm-domfill" style={{ width: `${domPct}%` }} />
        </div>}
        <div className="pm-estado">
          <span className={`pm-pos pm-pos-${pos}`}>● balón: {posLabel}</span>
          <span>{mt.clima}</span>
          <span>suerte: {mt.rerolls}</span>
          {mt.fatiga >= 3 && <span className="pm-alerta">agotado</span>}
          {mt.ko && <span className="pm-alerta">KO</span>}
        </div>

        {/* TU FICHA (partido jugada a jugada) */}
        {enJugadas && (
          <div className="pm-ficha">
            <span className="pm-tit">Tu ficha</span>
            <span className="pm-stat">MA {pj.MA}</span>
            <span className="pm-stat">ST {pj.ST}</span>
            <span className="pm-stat">AG {pj.AG}</span>
            <span className="pm-stat">AV {pj.AV}</span>
            {pj.hab.length > 0 && <span className="pm-habs">{pj.hab.join(" · ")}</span>}
          </div>
        )}

        {/* ALINEACIÓN */}
        {mt.aliados.length > 0 && (
          <div className="pm-alineacion">
            <span className="pm-tit">En el campo</span>
            <span className={`pm-jug pm-tu`}>Tú</span>
            {mt.aliados.map((a) => <span key={a.nombre} className={`pm-jug ${a.herido ? "pm-herido" : ""}`}>{a.nombre}{a.herido ? " ⛑" : ""}</span>)}
          </div>
        )}

        {/* CUADRO DE ACCIÓN */}
        <div className="pm-accion">
          {arranque && mt.intro
            ? mt.intro.map((l, i) => <p key={i} className={i === 0 ? "pm-acc-main" : "mini"}>{l}</p>)
            : <>
                <p className="pm-acc-prev">{mt.log[mt.log.length - 1]?.texto}</p>
                {mt.log[mt.log.length - 1]?.chips && <div className="pm-herida">{mt.log[mt.log.length - 1].chips.map((c, i) => <span key={i} className="pm-herida-chip">{c}</span>)}</div>}
                {mt.log[mt.log.length - 1]?.tecnico && <p className="mini tec">{mt.log[mt.log.length - 1].tecnico}</p>}
              </>}
          {mt.fase === "turnos" && (enJugadas
            ? <><p className="pm-acc-key">{jplay.h}</p><p className="pm-acc-main">{jplay.situ}</p></>
            : <p className="pm-acc-main">{introTurno(mt)}</p>)}
        </div>

        {/* BOTONES */}
        {mt.fase === "turnos" ? (
          enJugadas ? (
            <div className="lista">{jplay.ops.map((o, i) => <KJ key={i} o={o} />)}</div>
          ) : (
          <div className="lista">
            {mt.ko && <div className="opcion"><button onClick={() => jugarTurno("ko")}><b>Estás en el suelo</b><span className="mini">Esperas al siguiente minuto tirado en el barro.</span></button></div>}
            {!mt.ko && <>
              <T id="presionar" o={ops.presionar} />
              <T id="bola" o={ops.bola} />
              <T id="correr" o={ops.correr} />
              <T id="aguantar" o={ops.aguantar} />
              {ops.cubrir && <T id="cubrir" o={ops.cubrir} />}
            </>}
          </div>
          )
        ) : (
          <button className="btn" onClick={() => setMt({ ...mt, fase: "clave2" })}>Jugar la última jugada</button>
        )}

        {/* BITÁCORA */}
        {mt.log.length > 0 && (
          <details className="pm-bitacora">
            <summary>Bitácora del partido</summary>
            {mt.intro && mt.intro.map((l, i) => <p key={"i" + i} className="mini">{l}</p>)}
            {mt.log.map((l, i) => <p key={i} className="pm-bit-linea"><b>{enJugadas ? "jugada" : "turno"} {l.turno}.</b> {l.texto}{l.chips ? l.chips.map((c, j) => <span key={j} className="pm-herida-chip">{c}</span>) : ""}{l.tecnico ? <span className="tec"> · {l.tecnico}</span> : ""}</p>)}
          </details>
        )}
      </div>
    );
  };

  const Escena = () => escena.partido && mt && mt.fase !== "clave2" ? PartidoVista() : (
    <div className="pag">
      {escena.partido && <p className="etq">Partido · {pj.equipo} contra {escena.partido.rival}{escena.partido.torneo ? ` · ${escena.partido.torneo}` : ""}{mt ? ` · vais ${mt.marcador[0]}-${mt.marcador[1]}` : ""}</p>}
      <h2 className="h2">{escena.titulo}</h2>
      {escena.partido && !mt && !panel && partidoJugadas
        ? <p className="texto">Suena el silbato. Enfrente, {escena.partido.rival.replace(/^Los |^Las /, "")}. Lo que pase ahora lo decides tú, jugada a jugada, con la ficha que te has ganado. La jugada que lo decida todo llega al final.</p>
        : <p className="texto">{conMarcador(escena.texto(pj))}</p>}
      {escena.partido && !mt && !panel ? (
        <button className="btn" onClick={iniciarPartido}>Saltar al campo</button>
      ) : !panel ? (
        <div className="lista">
          {(typeof escena.opciones === "function" ? escena.opciones(pj) : escena.opciones).map((op, i) => {
            const ok = cumple(pj, op.req);
            const listaOpciones = typeof escena.opciones === "function" ? escena.opciones(pj) : escena.opciones;
            const hayJugable = listaOpciones.some((o) => cumple(pj, o.req) || (o.forzable && o.req && !o.req.oro && pj.pv >= 2));
            const forzable = !ok && op.forzable && !op.req.oro && (pj.pv >= 2 || !hayJugable);
            return (
              <div key={i} className={`opcion ${!ok && !forzable ? "bloq" : ""}`}>
                <button disabled={!ok && !forzable} onClick={() => elegir(op, !ok)}>
                  <b>{op.txt}</b>
                  {op.req && <span className={`req ${ok ? "ok" : ""}`}>{ok ? "Cumples: " : "Requiere: "}{textoReq(op.req, RELACIONES)}{!ok && forzable ? " · forzar por 2 Voluntad" : ""}</span>}
                  {op.tirada && <span className="mini">Tirada de {op.tirada.stat} contra {op.tirada.obj}{op.tirada.riesgo ? " · si fallas, lesión" : ""}{op.tirada.falta ? " · falta" : ""}</span>}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`panel ${panel.tirada ? (panel.tirada.exito ? "ok" : "ko") : ""}`} role="status" aria-live="polite">
          {panel.tirada && <div className="dados" role="img" aria-label={`Tirada: ${panel.tirada.dados[0]} y ${panel.tirada.dados[1]}, ${panel.tirada.mod >= 0 ? "más" : "menos"} ${Math.abs(panel.tirada.mod)}, total ${panel.tirada.total} contra ${panel.tirada.obj}. ${panel.tirada.exito ? "Éxito" : "Fallo"}.`}><span className="dado" aria-hidden="true">{panel.tirada.dados[0]}</span><span className="dado" aria-hidden="true">{panel.tirada.dados[1]}</span><span className="suma" aria-hidden="true">+{panel.tirada.mod} = <b>{panel.tirada.total}</b> <em>/ {panel.tirada.obj}</em></span>{panel.tirada.repetida && <em className="mini" aria-hidden="true">repetida con {panel.tirada.repetida}</em>}{panel.tirada.habsUsadas?.length > 0 && <em className="mini" aria-hidden="true">· {panel.tirada.habsUsadas.join(", ")}</em>}</div>}
          <p className="texto">{panel.texto}</p>
          {panel.muerte && <p className="texto muerte">No te levantas.</p>}
          <Chips items={panel.chips} />
          <button className="btn" onClick={continuar}>{panel.muerte ? "Oscuridad" : "Continuar"}</button>
        </div>
      )}
    </div>
  );

  const Mejora = () => (
    <div className="pag">
      <p className="etq">{NIVELES[Math.min(pj.nivel - 1, NIVELES.length - 1)]} · {pj.spp} PE</p>
      <h2 className="h2">Subes de nivel</h2>
      <div className="dados" role="img" aria-label={`Tirada de subida de nivel: ${mejora.dados[0]} y ${mejora.dados[1]}.`}><span className="dado" aria-hidden="true">{mejora.dados[0]}</span><span className="dado" aria-hidden="true">{mejora.dados[1]}</span>
        <span className="suma">{mejora.doble ? "Dobles: puedes elegir de tus categorías secundarias." : mejora.suma >= 10 ? "Tirada alta: puedes mejorar una característica." : "Elige una habilidad de tus categorías principales."}</span></div>
      <div className="lista">
        {mejora.stats.map((st) => <div key={st} className="opcion"><button onClick={() => elegirMejora("stat", st)}><b>+1 {st}</b><span className="mini">Mejora permanente de característica.</span></button></div>)}
        {mejora.lista.map((h) => <div key={h} className="opcion"><button onClick={() => elegirMejora("hab", h)}><b>{h}</b><span className="req ok">{CATEGORIAS[HABILIDADES[h].cat]}{ACCESO[pj.raza].s.includes(HABILIDADES[h].cat) ? " · secundaria" : ""}</span><span className="mini">{HABILIDADES[h].desc}</span></button></div>)}
      </div>
    </div>
  );

  const LineaDeVida = () => (
    <div className="linea">
      {CAPITULOS.map((c) => {
        const ini = ORDEN.findIndex((o) => o.cap === c.id);
        return (
          <div key={c.id} className={`tramo ${idx >= ini ? "vivido" : ""}`} style={{ flex: c.escenas.length }}>
            <div className="puntos">
              {c.escenas.map((e, i) => {
                const k = ini + i, esc = ESCENAS[e], hecho = k < idx || fase === "epilogo";
                const p = esc.partido && pj.palmares.find((x) => x.rival === esc.partido.rival);
                return <span key={e} title={esc.titulo} className={`punto ${esc.partido ? "partido" : ""} ${k === idx && fase !== "epilogo" ? "actual" : ""} ${hecho ? "hecho" : ""} ${p ? p.res.toLowerCase() : ""}`} />;
              })}
            </div>
            <small>{c.titulo}</small>
          </div>
        );
      })}
    </div>
  );

  const Postpartido = () => {
    const pp = pj._postpartido;
    const H2 = HISTORIAS[pj.raza];
    const lineas = cronicaPartido(pj, H2, pp.partido, pp.res, pp.marc, pp.mvp, pp.bajas, pp.heridosTuyos, pp.partido.torneo);
    const color = pp.res === "Victoria" ? "ok" : pp.res === "Derrota" ? "ko" : "";
    return (
      <div className="pag" role="status" aria-live="polite">
        <p className="etq">Final del partido</p>
        <div className={`pp-marcador ${color}`} aria-label={`${pp.res}: ${pj.equipo.replace(/^Los |^Las /, "")} ${pp.marc[0]}, ${pp.partido.rival.replace(/^Los |^Las /, "")} ${pp.marc[1]}`}>
          <span aria-hidden="true">{pj.equipo.replace(/^Los |^Las /, "")}</span>
          <b aria-hidden="true">{pp.marc[0]} — {pp.marc[1]}</b>
          <span aria-hidden="true">{pp.partido.rival.replace(/^Los |^Las /, "")}</span>
        </div>
        <div className="pp-cronica">
          {lineas.map((l, i) => <p key={i} className={`pp-linea pp-${l.k}`}>{l.t}</p>)}
        </div>
        {(() => {
          const huella = [];
          const r = pp.racha || 0;
          if (r >= 2) huella.push(`Racha: ${r} victorias seguidas.`);
          else if (r <= -2) huella.push(`Racha: ${-r} derrotas seguidas.`);
          if (pp.res === "Victoria" && pp.records && pp.records.mejorVictoria === `${pp.marc[0]}-${pp.marc[1]}` && Math.abs(pp.marc[0] - pp.marc[1]) >= 2) huella.push(`Récord de carrera: tu mayor victoria (${pp.records.mejorVictoria}).`);
          if (pp.movTabla && pp.movTabla.despues < pp.movTabla.antes) huella.push(`En la tabla${pp.divNombre ? ` de ${pp.divNombre}` : ""}: subes del ${pp.movTabla.antes}º al ${pp.movTabla.despues}º.`);
          else if (pp.movTabla && pp.movTabla.despues > pp.movTabla.antes) huella.push(`En la tabla${pp.divNombre ? ` de ${pp.divNombre}` : ""}: caes del ${pp.movTabla.antes}º al ${pp.movTabla.despues}º.`);
          else if (pp.movTabla) huella.push(`En la tabla${pp.divNombre ? ` de ${pp.divNombre}` : ""}: sigues ${pp.movTabla.despues}º.`);
          return huella.length > 0 && <div className="pp-huella"><p className="etq">La huella</p>{huella.map((h, i) => <p key={i} className="pp-huella-linea">{h}</p>)}</div>;
        })()}
        <div className="pp-frase">"{pp.frase}"<span className="mini"> — queda escrito en tu Libro del destino</span></div>
        <button className="btn" onClick={cerrarPostpartido}>Al vestuario</button>
      </div>
    );
  };

  const Muerte = () => (
    <div className="pag centro">
      <p className="etq">Muerte {pj.muertes} de {MAX_MUERTES}</p>
      <h1 className="titulo">{muerteInfo.titulo}</h1>
      <p className="lead">{muerteInfo.texto}</p>
      <Chips items={muerteInfo.chips} />
      <button className="btn" onClick={() => irA(idx + 1)}>Volver al barro</button>
    </div>
  );

  const MuerteFinal = () => (
    <div className="pag centro">
      <h1 className="titulo">La cuarta no cuenta</h1>
      <p className="lead">Nadie viene. Ni el apotecario, ni Ludo, ni el hombre de negro. El público aplaude un rato y luego mira el marcador. En la grada de los pobres, un niño pregunta quién eras.</p>
      <p className="etq">Crónica</p>
      <ol className="cronica">{cronica.map((c, i) => <li key={i}>{c}</li>)}</ol>
      <button className="btn" onClick={reiniciar}>Otra vida</button>
    </div>
  );

  useEffect(() => { if (fase === "epilogo" && pj && !vidas.some((v) => v.texto === epilogo())) guardarVida(epilogo(), false); }, [fase]);

  const Epilogo = () => (
    <div className="pag">
      <p className="etq">Epílogo</p>
      <h1 className="titulo">Lo que queda</h1>
      <LineaDeVida />
      <p className="lead">{epilogo()}</p>
      {H.emergente && (() => { const p = puestoEmergente(pj); return (
        <p className="lead"><b>Empezaste sin nombre y sin puesto, un crío del Matadero. Resultaste ser {p.clave === "Liniero" ? "un Liniero" : `un ${p.nombre}`}.</b> {p.desc}</p>
      ); })()}
      <p className="mini">Nivel {pj.nivel} · {pj.spp} PE · {pj.hab.length ? pj.hab.join(", ") : "sin habilidades"} · MA {pj.MA} ST {pj.ST} AG {pj.AG} AV {pj.AV}</p>
      <p className="mini">{(pj.palmares || []).length} partidos · {(pj.car || {}).td || 0} touchdowns · {(pj.car || {}).baja || 0} bajas causadas · {(pj.car || {}).pase || 0} pases completados · {(pj.car || {}).mvp || 0} veces jugador del partido · {pj.muertes} muertes</p>
      {Object.keys(pj.flags).some((f) => (H.recuerdos || {})[f]) && <>
        <p className="etq">Lo que se llevó</p>
        <p className="texto">{Object.keys(pj.flags).filter((f) => (H.recuerdos || {})[f]).map((f) => H.recuerdos[f]).join(" ")}</p>
      </>}
      <p className="etq">Crónica</p>
      <ol className="cronica">{cronica.map((c, i) => <li key={i}>{c}</li>)}</ol>
      <button className="btn" onClick={reiniciar}>Otra vida</button>
    </div>
  );

  return (
    <div className="app">
      <style>{CSS}</style>
      <a className="saltar" href="#contenido">Saltar al contenido</a>
      <Cabecera />
      {libro && pj && <Libro />}
      {prensa && pj && <Prensa />}
      {liga && pj && <Liga />}
      <main id="contenido">
        {fase === "portada" && Portada()}
        {fase === "entreacto" && entre && Entreacto()}
        {fase === "capitulo" && Capitulo()}
        {fase === "escena" && escena && Escena()}
        {fase === "postpartido" && pj && pj._postpartido && Postpartido()}
        {fase === "mejora" && mejora && Mejora()}
        {fase === "muerte" && Muerte()}
        {fase === "muerteFinal" && MuerteFinal()}
        {fase === "epilogo" && Epilogo()}
      </main>
    </div>
  );
}

const CSS = `
/* Tipografías incrustadas en el propio juego (subconjunto latino), para que
   funcione sin conexión y sin depender de Google. Licencia OFL. */
@font-face{font-family:'Alfa Slab One';font-style:normal;font-weight:400;font-display:swap;src:url(./fonts/alfaslabone-latin.woff2) format('woff2')}
@font-face{font-family:'Lora';font-style:normal;font-weight:400 600;font-display:swap;src:url(./fonts/lora-latin.woff2) format('woff2')}
@font-face{font-family:'Lora';font-style:italic;font-weight:400;font-display:swap;src:url(./fonts/lora-italic-latin.woff2) format('woff2')}
.app{--cuero:#241812;--parch:#ecdfc4;--tinta:#231a12;--sangre:#8a1e1e;--oro:#b8922e;--verde:#2f5a3a;
  height:100vh;height:100dvh;overflow-y:auto;-webkit-overflow-scrolling:touch;background:var(--cuero);color:var(--tinta);font-family:Lora,Georgia,serif;
  background-image:radial-gradient(120% 80% at 50% -10%,rgba(90,55,25,.28),transparent 55%),radial-gradient(120% 100% at 50% 120%,rgba(0,0,0,.55),transparent 60%),radial-gradient(ellipse at top,rgba(255,255,255,.04),transparent 60%)}
.app *{box-sizing:border-box}
.saltar{position:absolute;left:-9999px;top:0;z-index:100;background:var(--sangre);color:var(--parch);padding:.6rem 1rem;border-radius:0 0 4px 0;text-decoration:none;font-family:Lora,Georgia,serif}
.saltar:focus{left:0}
.pag{max-width:36rem;margin:1rem auto;color:var(--tinta);padding:1.7rem 1.5rem 2.2rem;border-radius:3px;border:7px solid #2b2420;
  background:radial-gradient(70% 45% at 18% 10%,rgba(120,30,20,.09),transparent 55%),radial-gradient(65% 45% at 88% 92%,rgba(40,25,10,.22),transparent 60%),radial-gradient(40% 30% at 60% 55%,rgba(70,45,20,.10),transparent 70%),linear-gradient(180deg,#e7d9b6,var(--parch) 45%,#c9b98f);
  box-shadow:0 10px 34px rgba(0,0,0,.6),inset 0 0 0 2px rgba(184,146,46,.5),inset 0 0 70px rgba(70,45,20,.26)}
.centro{text-align:center}
.titulo{font-family:'Alfa Slab One',Georgia,serif;font-size:2.2rem;line-height:1.02;margin:.2rem 0 1rem;color:var(--sangre);text-transform:uppercase;letter-spacing:.01em;text-shadow:1px 1px 0 rgba(255,248,225,.45)}
.h2{font-family:'Alfa Slab One',Georgia,serif;font-size:1.5rem;line-height:1.12;margin:.2rem 0 .9rem;text-transform:uppercase;letter-spacing:.01em}
.lead{font-size:1.05rem;line-height:1.7;margin:0 0 1.2rem}
.texto{line-height:1.7;margin:0 0 1.1rem;font-size:1.02rem}
.texto.muerte{font-family:'Alfa Slab One',serif;color:var(--sangre)}
.etq{text-transform:uppercase;letter-spacing:.14em;font-weight:600;color:var(--sangre);margin:1rem 0 .5rem;font-size:.74rem}
.mini{font-size:.84rem;opacity:.8;line-height:1.45;margin:.2rem 0}
.campo{display:block;margin:0 auto 1rem;max-width:22rem;text-align:left}.campo span{display:block;font-style:italic;color:var(--oro);margin-bottom:.3rem}
.campo input{width:100%;padding:.7rem .8rem;font:inherit;font-size:1.05rem;background:#fff8ea;color:var(--tinta);border:1px solid rgba(35,26,18,.3);border-radius:2px}
.lista{display:flex;flex-direction:column;gap:.55rem}
.razas{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin:.6rem 0 1rem;text-align:left}
.raza{background:#fff8ea;color:var(--tinta);border:1px solid rgba(35,26,18,.25);padding:.6rem .7rem;font:inherit;cursor:pointer;display:flex;flex-direction:column;gap:.15rem;border-radius:2px}
.raza b{font-weight:600}.raza small{font-size:.78rem;font-style:italic;opacity:.8}.raza.activa{border-color:var(--sangre);background:rgba(138,30,30,.08);box-shadow:inset 3px 0 0 var(--sangre)}
.opcion button{width:100%;text-align:left;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;touch-action:manipulation;background:#f6ead0;color:var(--tinta);border:1px solid rgba(35,26,18,.28);border-left:5px solid var(--sangre);
  padding:.8rem .9rem;font:inherit;cursor:pointer;display:flex;flex-direction:column;gap:.25rem;border-radius:2px}
.opcion button:disabled{cursor:not-allowed;opacity:.55;border-left-color:#999}
.opcion.bloq b{text-decoration:line-through;text-decoration-color:rgba(35,26,18,.4)}
.opcion b{font-weight:600;pointer-events:none}.opcion .mini{pointer-events:none}
.req{font-size:.8rem;color:var(--sangre);font-style:italic}.req.ok{color:var(--verde)}
.opcion button:focus-visible,.btn:focus-visible{outline:2px solid var(--oro);outline-offset:2px}
.secundario{background:transparent !important;color:var(--tinta) !important;border:1px solid var(--tinta) !important;margin-top:.6rem !important}
.vida{text-align:left;margin:.4rem 0}
.btn{font:inherit;cursor:pointer;border:0;border-radius:2px;padding:.85rem 1.2rem;font-weight:600;margin-top:1.2rem;width:100%;background:var(--sangre);color:var(--parch)}
.panel{padding:1rem;border:1px solid rgba(35,26,18,.25);border-left:4px solid var(--oro);background:#fff8ea;border-radius:2px}
.panel.ok{border-left-color:var(--verde)}.panel.ko{border-left-color:var(--sangre)}
.chips{display:flex;flex-wrap:wrap;gap:.35rem;margin:.6rem 0 .2rem}
.chip{font-size:.78rem;padding:.2rem .55rem;border-radius:2px;background:rgba(35,26,18,.08);border:1px solid rgba(35,26,18,.15)}
.chip.pos{background:rgba(47,90,58,.15);border-color:var(--verde)}.chip.neg{background:rgba(138,30,30,.12);border-color:var(--sangre)}
.dados{display:flex;align-items:center;gap:.5rem;margin-bottom:.7rem;flex-wrap:wrap}
.dado{width:2.4rem;height:2.4rem;display:grid;place-items:center;background:var(--tinta);color:var(--parch);border-radius:5px;font-family:'Alfa Slab One',serif;font-size:1.3rem;animation:cae .35s ease-out}
@keyframes cae{from{transform:translateY(-10px) rotate(-15deg);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){.dado{animation:none}}
.suma b{font-size:1.3rem;color:var(--sangre)}.suma em{opacity:.7;font-size:.85rem}
.cab{position:sticky;top:0;z-index:3;background:var(--tinta);color:var(--parch);display:flex;justify-content:space-between;align-items:center;gap:.6rem;padding:.55rem 1rem;flex-wrap:wrap;border-bottom:2px solid var(--oro)}
.cab-nombre{font-family:'Alfa Slab One',serif}.cab-sub{font-size:.72rem;font-style:italic;opacity:.85}
.cab-der{display:flex;gap:.8rem;align-items:center;font-size:.8rem}
.lnk{background:none;border:0;color:var(--oro);font:inherit;font-size:.8rem;cursor:pointer;text-decoration:underline;padding:0}
.libro{max-width:36rem;margin:1rem auto 0;background:#fff8ea;padding:1rem 1.2rem;border-radius:3px;border:1px solid var(--oro)}
.libro h3{font-family:'Alfa Slab One',serif;margin:0 0 .4rem;color:var(--sangre)}
.liga-cab{font-style:italic;color:var(--oro);margin:0 0 .6rem;font-size:.9rem}
.liga-tabla{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}
.liga-tabla thead th{font-size:.66rem;text-transform:uppercase;letter-spacing:.05em;color:rgba(35,26,18,.6);font-weight:600;padding:.25rem .3rem;border-bottom:2px solid rgba(35,26,18,.3);text-align:center}
.liga-tabla thead th.eq{text-align:left}
.liga-tabla tbody td{padding:.35rem .3rem;font-size:.82rem;text-align:center;border-bottom:1px solid rgba(35,26,18,.12)}
.liga-tabla td.pos{font-family:'Alfa Slab One',serif;color:rgba(35,26,18,.55);width:1.5rem}
.liga-tabla td.eq{text-align:left;font-weight:600}
.liga-tabla td.pts{font-family:'Alfa Slab One',serif;color:var(--sangre)}
.liga-tabla tr.you{background:rgba(138,30,30,.10);box-shadow:inset 3px 0 0 var(--sangre)}
.liga-tabla tr.you td.eq{color:var(--sangre)}
.liga-tabla tr.asc td.pos{color:var(--verde)}
.liga-tabla tr.desc td.pos{color:var(--sangre)}
.liga-zonas{display:flex;flex-wrap:wrap;gap:.9rem;margin:.6rem 0 .3rem;font-size:.7rem;text-transform:uppercase;letter-spacing:.03em;color:rgba(35,26,18,.7)}
.liga-zonas span{display:flex;align-items:center;gap:.35rem}
.liga-zonas i.z{width:.6rem;height:.6rem;border-radius:2px;display:inline-block}.liga-zonas i.z.a{background:var(--verde)}.liga-zonas i.z.d{background:var(--sangre)}
.liga-estado{font-size:.9rem;font-weight:600;margin:.5rem 0 .3rem;border-left:4px solid var(--sangre);padding-left:.6rem}
.col2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
@media (max-width:480px){.col2{grid-template-columns:1fr}.pag{margin:0 0 1rem;padding:1rem .9rem 2rem;border-radius:0}.titulo{font-size:1.7rem}.h2{font-size:1.3rem}.lead,.texto{font-size:.98rem;line-height:1.6}.razas{grid-template-columns:1fr 1fr;gap:.4rem}.raza{padding:.5rem .55rem}.raza small{font-size:.74rem}.cab{padding:.45rem .7rem}.cab-der{gap:.5rem;font-size:.74rem}}
.fila{display:flex;align-items:center;gap:.5rem;font-size:.85rem;margin:.15rem 0}.fila span{flex:0 0 7.5rem}.fila i{flex:1;height:5px;background:var(--oro);border-radius:3px;display:block}.fila b.neg{color:var(--sangre)}
.statrow{display:flex;gap:.9rem}.statrow span{display:flex;flex-direction:column;align-items:center;font-size:.65rem}.statrow b{font-family:'Alfa Slab One',serif;font-size:1.2rem;color:var(--sangre)}
.linea{display:flex;gap:.35rem;margin:.6rem 0 1rem;align-items:flex-end}
.tramo{display:flex;flex-direction:column;gap:.25rem;min-width:0}.tramo small{font-size:.6rem;font-style:italic;opacity:.55;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tramo.vivido small{opacity:.9;color:var(--sangre)}
.puntos{display:flex;gap:3px;align-items:center;height:12px;border-bottom:2px solid rgba(35,26,18,.2);padding-bottom:4px}
.tramo.vivido .puntos{border-bottom-color:var(--oro)}
.punto{width:6px;height:6px;border-radius:50%;background:rgba(35,26,18,.2);flex:1 0 4px;max-width:9px}
.punto.hecho{background:var(--oro)}.punto.actual{background:var(--sangre);box-shadow:0 0 0 2px rgba(138,30,30,.3)}
.punto.partido{border-radius:1px;transform:rotate(45deg);height:7px;width:7px}
.punto.partido.victoria{background:var(--verde)}.punto.partido.derrota{background:var(--sangre)}.punto.partido.empate{background:var(--oro)}
.marcador{display:flex;justify-content:space-between;align-items:center;background:var(--tinta);color:var(--parch);padding:.5rem .9rem;margin:0 0 .5rem;border-radius:2px}
.marcador span{font-family:'Alfa Slab One',serif;font-size:1.7rem;color:var(--oro)}.marcador small{font-size:.72rem;text-align:center;font-style:italic;line-height:1.3}
.avances{margin:.4rem 0 .6rem}.avances>div{display:flex;align-items:center;gap:.5rem;font-size:.72rem;margin:.2rem 0}.avances span{flex:0 0 6.5rem}
.avances i{display:block;height:7px;background:var(--verde);border-radius:3px;transition:width .3s;min-width:2px}.avances i.rival{background:var(--sangre)}
.ali{display:inline-block;margin:0 .35rem .2rem 0;padding:.05rem .4rem;border:1px solid rgba(35,26,18,.25);border-radius:2px}.ali.herido{border-color:var(--sangre);color:var(--sangre);text-decoration:line-through}
.log{background:rgba(35,26,18,.06);padding:.5rem .7rem;border-left:3px solid var(--oro);margin:.5rem 0 .8rem}.log p{margin:.25rem 0}
.partido .pm-marcador{display:flex;align-items:center;justify-content:space-between;background:var(--tinta);color:var(--parch);border-radius:3px;padding:.5rem .8rem;margin-bottom:.5rem}
.pm-eq{display:flex;align-items:center;gap:.5rem}.pm-eq:last-child{flex-direction:row-reverse}
.pm-nom{font-size:.8rem;font-style:italic;max-width:9rem;line-height:1.1}
.pm-gol{font-family:'Alfa Slab One',serif;font-size:2rem;color:var(--oro);min-width:1.4rem;text-align:center}
.pm-mid{font-size:.7rem;opacity:.7;text-transform:uppercase;letter-spacing:.05em}
.pm-dominio{height:8px;background:linear-gradient(90deg,rgba(138,30,30,.25),rgba(35,26,18,.15),rgba(47,90,58,.25));border-radius:4px;position:relative;overflow:hidden;margin-bottom:.35rem}
.pm-domfill{position:absolute;top:0;bottom:0;left:0;background:var(--verde);opacity:.35;transition:width .4s}
.pm-estado{display:flex;flex-wrap:wrap;gap:.6rem;font-size:.75rem;opacity:.85;margin-bottom:.6rem;align-items:center}
.pm-pos{font-weight:600}.pm-pos-propia{color:var(--verde)}.pm-pos-rival{color:var(--sangre)}.pm-pos-neutral{color:var(--oro)}
.pm-alerta{color:var(--sangre);font-weight:600;text-transform:uppercase;font-size:.68rem}
.pm-alineacion{display:flex;flex-wrap:wrap;gap:.35rem;align-items:center;margin-bottom:.6rem}
.pm-tit{font-size:.7rem;font-style:italic;color:var(--oro);margin-right:.2rem}
.pm-jug{font-size:.78rem;padding:.12rem .5rem;border:1px solid rgba(35,26,18,.25);border-radius:10px;background:rgba(35,26,18,.05)}
.pm-tu{border-color:var(--oro);background:rgba(184,146,46,.15);font-weight:600}
.pm-herido{color:var(--sangre);border-color:var(--sangre);text-decoration:line-through;opacity:.7}
.pm-accion{background:#fff8ea;border:1px solid rgba(35,26,18,.2);border-left:4px solid var(--oro);border-radius:2px;padding:.7rem .85rem;margin-bottom:.8rem}
.pm-acc-prev{margin:0 0 .4rem;padding-bottom:.4rem;border-bottom:1px dashed rgba(35,26,18,.2);line-height:1.55}
.pm-herida{display:flex;flex-wrap:wrap;gap:.35rem;margin:.1rem 0 .4rem}
.pm-herida-chip{display:inline-block;font-family:Oswald,sans-serif;font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.02em;color:#fff;background:var(--sangre);padding:.12rem .45rem;border-radius:3px;margin-left:.3rem}
.pm-acc-main{margin:.2rem 0 0;font-weight:600;line-height:1.55}
.pm-acc-key{margin:0 0 .35rem;font-family:'Alfa Slab One',Georgia,serif;text-transform:uppercase;letter-spacing:.03em;font-size:1.02rem;color:var(--sangre);line-height:1.1}
.pm-ficha{display:flex;flex-wrap:wrap;gap:.35rem;align-items:center;margin-bottom:.6rem}
.pm-stat{font-family:Oswald,sans-serif;font-size:.76rem;font-weight:600;padding:.1rem .45rem;border:1px solid rgba(35,26,18,.3);border-radius:3px;background:rgba(35,26,18,.05);font-variant-numeric:tabular-nums}
.pm-habs{font-size:.74rem;font-style:italic;color:var(--tinta);opacity:.85}
.kj-attr{display:block;margin-top:.25rem;font-family:Oswald,sans-serif;font-size:.72rem;letter-spacing:.02em;color:var(--oro);opacity:.95}
.pm-bitacora{margin-top:1rem;font-size:.85rem}
.pm-bitacora summary{cursor:pointer;color:var(--oro);font-style:italic}
.pm-bit-linea{margin:.3rem 0;line-height:1.5;opacity:.9}
.pp-marcador{display:flex;align-items:center;justify-content:center;gap:1.2rem;background:var(--tinta);color:var(--parch);border-radius:3px;padding:.9rem 1rem;margin-bottom:1rem}
.pp-marcador b{font-family:'Alfa Slab One',serif;font-size:2rem;color:var(--oro)}
.pp-marcador span{font-style:italic;font-size:.9rem;flex:1;text-align:center}
.pp-marcador.ok b{color:var(--verde)}.pp-marcador.ko b{color:var(--sangre)}
.pp-cronica{margin-bottom:1.2rem}
.pp-linea{line-height:1.6;margin:.4rem 0;padding-left:.8rem;border-left:2px solid rgba(35,26,18,.15)}
.pp-linea.pp-res{font-weight:600;border-left-color:var(--oro)}
.pp-linea.pp-sangre{border-left-color:var(--sangre)}
.pp-linea.pp-fama{border-left-color:var(--verde)}
.pp-linea.pp-rumor{font-style:italic;opacity:.85}
.pp-linea.pp-rival{border-left-color:var(--sangre);font-weight:600}
.pp-huella{margin-bottom:1rem;padding:.7rem .9rem;background:rgba(184,146,46,.10);border-left:4px solid var(--oro);border-radius:2px}
.pp-huella .etq{margin:0 0 .3rem}
.pp-huella-linea{font-size:.92rem;line-height:1.5;margin:.15rem 0}
.pp-frase{background:#fff8ea;border:1px solid var(--oro);border-radius:2px;padding:.9rem 1rem;font-style:italic;font-size:1.05rem;line-height:1.5}
.puerta{color:var(--sangre);font-style:italic}
.imagen-cap{font-style:italic;color:var(--oro);font-size:1.05rem;line-height:1.5;margin:.4rem auto 1rem;max-width:26rem}
.tec{opacity:.55;font-style:normal;font-family:monospace;font-size:.72rem;margin-top:.3rem}
.noticia{font-size:.88rem;line-height:1.5;margin:.35rem 0;padding-left:.7rem;border-left:2px solid var(--oro);font-style:italic}
.prensa{border-color:var(--tinta)}
.cronica{padding-left:1.2rem;line-height:1.55;font-size:.9rem}.cronica li{margin-bottom:.25rem}
`;
