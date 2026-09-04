# Referencia de reglas — base S3

> Base de reglas que adopta *Barro y Ceniza*, resumida del codex S3 que aportó
> el cliente (proyecto Blood Bowl Manager). Aquí solo están las **mecánicas** y
> las **fichas** que el librojuego necesita. **No** se copian nombres con marca
> (ni "Blood Bowl", ni jugadores estrella oficiales): el juego mantiene su
> disfraz (ver `CLAUDE.md`). Los guiños a leyendas van con nombres inventados
> —ver el documento de posición emergente.

## Formato de características

Cinco características, en el formato de la edición actual:

| Sigla | Qué es | Formato |
|---|---|---|
| **MV** | Movimiento | número (casillas) |
| **FU** | Fuerza | número |
| **AG** | Agilidad | objetivo "X+" (sacas X o más en 1d6) |
| **PA** | Pase | objetivo "X+" |
| **AR** | Armadura | objetivo "X+" (el rival necesita X+ para romperla) |

Cuanto **más bajo** el "X+", mejor (AG 2+ es mejor que AG 3+). AR más alta =
armadura más dura.

> **Nota de conversión respecto al juego actual:** hoy *Barro y Ceniza* mezcla
> ediciones (armadura en formato nuevo, pero agilidad clásica y sin PA). Alinear
> a S3 = pasar AG y PA a formato "X+" y añadir PA. No hay que "convertir" a ojo:
> se toman los números de las fichas de abajo tal cual.

## Motor de daño (ya coincide con lo que hace el juego)

1. **Armadura (2d6)**: se rompe si el resultado supera la AR.
2. **Heridas (2d6)**: 2–7 aturdido · 8–9 KO · 10–12 baja.
3. **Bajas graves (1d16)**: 1–8 magullado (falta este partido) · 9–10 apaleado
   (este y el siguiente) · 11–12 herida grave · 13–14 herida permanente (−1 a
   una característica) · **15–16 muerto**.

Apotecario: puede repetir la tirada y quedarse con la mejor (una vez por
partido). *Esto ya está implementado (arreglo 4).*

## Puntos de experiencia (PE / SPP) — también coincide

- Pase completado: **1**
- Baja causada / intercepción: **2**
- Touchdown: **3**
- Jugador del partido (MVP): **4** — **se sortea** (1d6 entre 6 nominados).
  *Hoy el juego lo da casi siempre; alinear a S3 = sortearlo.*
- Regla brutos: baja 3 / TD 2.

## Progresión (gastar PE)

| Tipo de mejora | Al azar | Elegida |
|---|---|---|
| Habilidad primaria | 3 PE | 6 PE |
| Habilidad secundaria | — | 12 PE |
| Característica | 14 PE (con 1d8) | — |

> Subir una característica es **caro** (14 PE), así que se hacen pocas por
> economía —no por un tope duro de "2 en la vida", como se dijo antes por error.

Habilidades de élite con recargo (+10.000 mo): Placar, Esquivar, Defensa,
Golpe mortífero.

## Tabla de patada inicial S3 (2d6)

Para cuando se decida "cuánto reglamento meter en el partido". **Ojo**: el
resultado **2** en S3 es *Árbitro Intimidado = +1 Soborno a ambos equipos*, no
la "falta gratis +2" que hoy implementa el juego (arreglo 5, basado en una tabla
vieja).

| Dado | Evento |
|---|---|
| 2 | Árbitro intimidado (+1 soborno a ambos) |
| 3 | Tiempo muerto (±1 al contador de turnos) |
| 4 | Defensa sólida (redespliegue del pateador) |
| 5 | Patada alta |
| 6 | Hinchas animan (apoyo en el primer placaje) |
| 7 | Entrenador brillante (+1 repetición ese drive) |
| 8 | Clima cambiante (nueva tirada de clima) |
| 9 | Anticipación |
| 10 | ¡A la carga! (blitz) |
| 11 | Indigestión (−1 MV/AR a un jugador) |
| 12 | Invasión de campo (aturdidos) |

## Retener el balón (stalling)

Si puedes anotar y no lo haces, al final de tu activación tiras 1d6: si el
resultado ≥ el turno de tu equipo, caes, hay pérdida de turno y sueltas el
balón. (Relevante para la decisión de "turnover" en el partido.)

---

## Ficha del humano en S3 (la que usa el piloto)

Cuatro tipos de jugador de campo. Son los cuatro finales posibles de la idea de
posición emergente:

| Posición | MV | FU | AG | PA | AR | Habilidades de inicio | Categorías primarias | Secundarias |
|---|---|---|---|---|---|---|---|---|
| **Liniero** (Línea) | 6 | 3 | 3+ | 4+ | 9+ | — | General | Agilidad, Fuerza |
| **Receptor** | 8 | 3 | 3+ | 4+ | 8+ | Atrapar, Esquivar | Agilidad, General | Fuerza, Pase |
| **Lanzador** | 6 | 3 | 3+ | 3+ | 9+ | Manos seguras, Pasar | General, Pase | Agilidad, Fuerza |
| **Blitzer** | 7 | 3 | 3+ | 4+ | 9+ | Placar, Placaje defensivo | Fuerza, General | Agilidad |

(El equipo humano completo lleva además Halfling y Ogro como posicionales, pero
el protagonista es un jugador humano de campo, así que solo importan estos
cuatro.)

Lo que separa a las cuatro fichas: **velocidad** (MV 6/8/6/7), **aguante**
(solo el receptor más blando), **brazo** (solo el lanzador mejor) y las
**habilidades de inicio**. Esas son las palancas que mueven las decisiones de la
historia.
