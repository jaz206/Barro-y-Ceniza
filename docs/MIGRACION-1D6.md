# Migración a 1D6 — hoja de ruta

**Decisión (2026-09-06):** el juego adopta el motor de la **biblia de sistema**
(`docs/biblia-sistema.md`, v1.19), que pasa a ser **normativa**. El cambio de
fondo es el **motor de dados**: se abandona el `2d6 + característica` actual y se
va al **1D6 contra número objetivo** de la biblia (sección 2).

Regla de trabajo (igual que todo el proyecto): **fases chicas, nunca romper el
juego, verificar de verdad (build + navegador) antes de dar nada por hecho.**

## Qué cambia de fondo (biblia §2, §3, §6)

- **Tirada:** 1D6 contra objetivo. AG/PS son números objetivo (3+ = aciertas con
  3 o más). Fuerza: objetivo 4+ con ±1 por punto de FU de ventaja/desventaja.
  Un 1 natural siempre falla; un 6 natural siempre acierta.
- **Los atributos de carácter NUNCA suman al dado** (§0.3). Hoy sí lo hacen
  (`atrMod` en `resolverTirada`). Su papel pasa a ser solo abrir/cerrar opciones.
- **Modificadores de situación con tope ±2** (§2.3).
- **Repeticiones** (§2.4), en orden y una por acción: habilidad apropiada →
  segunda oportunidad de equipo (según `rel.equipo`) → Voluntad.
- **Daño** (§3): 2D6 vs AR, 2D6 heridas (2-7 aturdido / 8-9 KO / 10-12 lesión),
  1D16 en la tabla de lesiones (muerte en 15-16). Es casi lo que ya hay.
- **Fichas S3** (§6) con notación MV/FU/AG+/PS+/AR+ y **ficha de debut** rebajada
  en los capítulos 1-2, con escena de firma al pasar a profesional.

## Fases

- [x] **Fase 0 — Documentos y decisión.** Biblia y 7 capítulos + duelo en
  `docs/`. Biblia declarada normativa en `CLAUDE.md`. Esta hoja de ruta.
- [ ] **Fase 1 — Piloto halfling a 1D6.** Solo el halfling (el resto sigue en
  2d6 mientras tanto, ramificando por raza, como se hizo con el pool de jugadas).
  Incluye: ficha S3 del halfling (pro 5/2/3+/4+/7+, **debut** 4/2/4+/5+/6+ en
  caps 1-2) + escena de firma; motor 1D6 para sus jugadas y su jugada decisiva;
  objetivos del pool convertidos a números objetivo; atributos fuera del dado;
  repeticiones (habilidad / equipo por `rel.equipo` / Voluntad). Verificar con
  simulación (letalidad §3.5 ≈ 1,5 %) y recorrido en navegador. **Que el cliente
  lo juegue y valide el tacto antes de seguir.**
- [ ] **Fase 2 — Extender 1D6 a las otras cuatro razas**, una a una, con sus
  fichas S3 (§6) y su ficha de debut donde corresponda. Al terminar, se retira el
  motor 2d6 y el ramal por raza.
- [ ] **Fase 3 — Memoria del halfling (biblia §23, auditoría).** Conectar las
  marcas mudas del "montón 1": `prometisteGanar`/`prometisteSobrevivir` leídas en
  la final; `vengasteLaPalmada` cerrada en el cap 7 (espejo del carnicero); las
  tres lecturas de Pipo; las tres de equipo (incluida la repetición de equipo);
  y el **duelo de la abuela** (`escena-duelo-abuela.md`, ya escrito) metido en el
  juego tras `laAbuela`.
- [ ] **Fase 4 — Rama Mortaigne completa (cap 4 cruce → cap 5 rama B).** Serrault,
  Drache, Kessler; "la olla" y "la cena"; la camiseta negra (objeto); reconverge
  en la final. Sin castigo moral (§18.2): desde Mortaigne se puede ganar.
- [ ] **Fase 5 — Objetos, economía, némesis, limpieza.** Objetos sin ventaja
  (§5: la copa, el dedo); economía (§8: sueldo humillante, deuda con Pipo,
  recomprar a Roblerto); némesis formal (§17.9); **renombrar `ramon*` → `roblerto*`**
  (§20, los nombres internos deben coincidir con el texto); revisar los ~14 flags
  que se leen y no se crean en la ruta halfling (condiciones muertas).

## Calibración de Fase 1 (simulada, 200k tiradas)

- **Letalidad por fallo de riesgo (halfling pro, AR efectiva 6 con Escurridizo):
  1,56 %.** Clava el 1,5 % de la biblia §3.5. La cadena de daño actual
  (`tirarHerida`: 2d6 armadura / 2d6 heridas / D16) ya es compatible; solo hay
  que aplicar Escurridizo (−1 a la armadura del halfling).
- **Umbral de gol del rival = 7** (el rival marca si `d6 + FU_rival ≥ 7`) da la
  curva "difícil pero posible":
  - crío en debut vs FU3 (liga): V 52 % · E 35 % · D 14 % (suda cada partido).
  - pro vs FU3 (liga): V 64 % · E 30 % · D 6 % (gana casi siempre, pero sudando).
  - pro vs FU4 (final): V 56 % · E 33 % · D 10 % (una final de verdad).
  Es el equivalente 1D6 del "ganar con sudor" que ya buscábamos.

## AVISO de implementación: la AG cambia de sentido

En el motor actual (2d6) la AG guardada es "más alto, mejor" (el modificador es
`AG − 3`). En S3/1D6 la AG es un **número objetivo**: "más bajo, mejor" (3+ es
mejor que 4+). Al migrar el halfling hay que:

- guardar la AG como objetivo S3 (pro 3, debut 4) y **mostrarla como `AG+`**, no
  con la conversión `7 − AG` de hoy;
- revisar la lógica de "la subida sube, nunca baja" en `aplicar`: con la AG al
  revés, pasar de debut (4) a pro (3) es **bajar el número**, que esa lógica
  hoy rechazaría. La ficha de debut→pro del halfling necesita tratar la AG (y
  PS) como objetivos, no como valores brutos.

Esto es la causa de que la migración no sea "cambiar el dado y ya": el número de
la ficha significa lo contrario. Se resuelve en el motor 1D6 del halfling, sin
tocar a las otras cuatro razas (que siguen en 2d6 hasta la Fase 2).

## Decisiones de la biblia pendientes de cerrar (§24) que tocan Fase 1

1. **Armadura: ¿se rompe con "mayor" o "mayor o igual" que AR?** La tabla de
   letalidad (§3.5) está calculada con **mayor o igual**. Hay que fijarlo.
2. **Ficha de debut** (caps 1-2): es invención y no está probada. La Fase 1 la
   estrena; se valida jugando el capítulo 1.
3. **Reconversión de tiradas una a una a 1D6** (esta migración).
4. **Umbral de la segunda oportunidad de equipo** según `rel.equipo`: calibrar.

## Nota de método

El motor de tirada es compartido por las cinco razas. Para no romper el juego,
Fase 1 ramifica por raza (el halfling entra en 1D6; los demás siguen en 2d6)
igual que ya hace `poolDe(pj)` con las jugadas. Cuando las cinco estén migradas
(fin de Fase 2), se borra el motor viejo y el ramal, y queda solo 1D6.
