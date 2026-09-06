// Genera el tablero de tarjetas (storyboard) de una rama, extrayendo el
// contenido desde src/App.jsx de forma fiable (no a mano) para que no se
// desincronice del juego. Uso: node tools/storyboard/build.mjs
// Salida: halfling-storyboard.html en la raíz del repo.
import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const TMP = path.join(HERE, ".tmp");
fs.mkdirSync(TMP, { recursive: true });

const src = fs.readFileSync(path.join(ROOT, "src", "App.jsx"), "utf8");
fs.writeFileSync(path.join(TMP, "App_export.jsx"),
  src + "\nexport { HALFLING, HALFLING_TRANSICIONES, HALFLING_ENTREACTOS, HALFLING_ALIADOS };\n");
fs.writeFileSync(path.join(TMP, "react-stub.js"),
  "export const useState=(v)=>[typeof v==='function'?v():v,()=>{}];export const useEffect=()=>{};export default {useState,useEffect};");

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
globalThis.document = { getElementById: () => null };
globalThis.window = globalThis;

await esbuild.build({
  entryPoints: [path.join(TMP, "App_export.jsx")],
  bundle: true, format: "esm", outfile: path.join(TMP, "bundle.mjs"),
  alias: { react: path.join(TMP, "react-stub.js") },
  loader: { ".jsx": "jsx" }, jsx: "transform", jsxFactory: "_h", jsxFragment: "_F",
  banner: { js: "const _h=()=>null,_F=null;" }, logLevel: "error",
});
const mod = await import(pathToFileURL(path.join(TMP, "bundle.mjs")).href + "?" + Date.now());
const { HALFLING: H, HALFLING_TRANSICIONES: TR, HALFLING_ENTREACTOS: EN, HALFLING_ALIADOS: AL } = mod;

const stub = {
  nombre: "Berto Migas", ...H.base, muertes: 0, fama: 0, pv: 10, pro: true,
  flags: {}, rel: { ...H.relInicial }, hab: [...(H.base.hab || [])],
  palmares: [], trofeos: [], records: {}, car: { td: 0, baja: 0, pase: 0, mvp: 0 }, racha: 0, nivel: 1, spp: 0,
};
const R = (v) => { try { return typeof v === "function" ? v(stub) : v; } catch (e) { return "[dinámico: " + e.message + "]"; } };
const ATRIB = ["Voluntad", "Astucia", "Ferocidad", "Honor", "Ambición"];

const cardDeEscena = (id) => {
  const e = H.escenas[id];
  if (!e) return { id, falta: true };
  const p = e.partido || null;
  return {
    id, titulo: typeof e.titulo === "function" ? R(e.titulo) : e.titulo,
    tipo: p ? "partido" : "escena", condicion: !!e.condicion,
    partido: p ? { rival: p.rival, fuerza: p.fuerza, torneo: p.torneo || null } : null,
    texto: R(e.texto),
    opciones: (e.opciones || []).map((o) => ({
      txt: o.txt, tira: !!o.tirada, stat: o.tirada?.stat, obj: o.tirada?.obj,
      req: o.req ? (Object.entries(o.req).filter(([k]) => ATRIB.includes(k)).map(([k, v]) => `${k} ${v}`).join(", ") || null) : null,
      forzable: !!o.forzable,
      ok: o.tirada?.ok ? R(o.tirada.ok.txt) : null, ko: o.tirada?.ko ? R(o.tirada.ko.txt) : null,
      msg: o.msg ? R(o.msg) : null,
    })),
  };
};
const capitulos = H.capitulos.map((c) => {
  const cards = [];
  if (c.id > 1 && TR[c.id]) cards.push({ id: `trans-${c.id}`, tipo: "transicion", titulo: "Entre capítulos (paso del tiempo)", texto: R(TR[c.id]) });
  const ents = EN.filter((a) => a.caps.includes(c.id));
  if (ents.length) cards.push({ id: `entre-${c.id}`, tipo: "entreacto", titulo: "Tardes libres (elige 2)", opciones: ents.map((a) => ({ txt: a.txt, msg: R(a.msg) })) });
  for (const sid of c.escenas) cards.push(cardDeEscena(sid));
  return { id: c.id, titulo: c.titulo, sub: c.sub, cards };
});
const data = {
  rama: "halfling", nombre: H.nombre, lema: H.lema, puesto: H.puesto, base: H.base, equipo: H.equipoInicial,
  portada: H.portada, capitulos,
  muertes: (H.muertes || []).map((m) => ({ titulo: m.titulo, texto: m.texto })),
  epilogo: R((pj) => H.epilogo(pj, "un pringado con suerte")),
  aliados: AL(stub, 2).map((a) => ({ nombre: a.nombre, ST: a.ST, AG: a.AG, AV: a.AV })),
};

const tpl = fs.readFileSync(path.join(HERE, "template.html"), "utf8");
fs.writeFileSync(path.join(ROOT, "halfling-storyboard.html"), tpl.replace("__DATA__", JSON.stringify(data)));

// --- Markdown descargable: la historia entera, legible en cualquier sitio ---
const clean = (s) => (s || "").replace(/\{marcador\}/g, "[marcador]").trim();
const TIPO = { partido: "Partido", escena: "Escena", transicion: "Paso del tiempo", entreacto: "Tardes libres", muerte: "Muerte" };
const md = [];
md.push(`# Los Comepasteles — Guion (rama halfling de *Barro y Ceniza*)`, "");
md.push(`> *"${data.lema}"* · ${data.puesto} · ${data.equipo}  `);
md.push(`> Ficha: MA ${data.base.MA} · ST ${data.base.ST} · AG ${data.base.AG} · AV ${data.base.AV} · ${(data.base.hab || []).join(", ")}  `);
md.push(`> **Borrador pendiente de revisión** — toda esta rama la escribió Claude imitando la voz del cliente. Los textos salen en su versión por defecto (sin decisiones tomadas).`, "");
md.push(`## Portada`, "", clean(data.portada), "");
const opBlock = (ops) => {
  if (!ops || !ops.length) return;
  md.push("", "**Opciones:**");
  for (const o of ops) {
    const meta = [o.tira ? `se juega con ${({ ST: "Fuerza", AG: "Agilidad", MA: "Velocidad" })[o.stat] || o.stat}` : "", o.req ? `pide ${o.req}${o.forzable ? ", forzable" : ""}` : ""].filter(Boolean).join("; ");
    md.push(`- **${o.txt}**${meta ? ` _(${meta})_` : ""}`);
    if (o.ok) md.push(`  - *Éxito:* ${clean(o.ok)}`);
    if (o.ko) md.push(`  - *Fallo:* ${clean(o.ko)}`);
    if (o.msg && !o.ok) md.push(`  - ${clean(o.msg)}`);
  }
};
for (const c of data.capitulos) {
  md.push("", "---", "", `## Capítulo ${c.id} · ${c.titulo}`, `*${c.sub || ""}*`, "");
  for (const card of c.cards) {
    let head = `### [${TIPO[card.tipo] || card.tipo}] ${card.titulo}`;
    if (card.partido) head += ` — vs ${card.partido.rival} (fuerza ${card.partido.fuerza}${card.partido.torneo ? `, ${card.partido.torneo}` : ""})`;
    if (card.condicion) head += ` _(escena condicional)_`;
    md.push(head, "");
    if (card.texto) md.push(clean(card.texto));
    if (card.tipo === "entreacto") { md.push("", "**Actividades:**"); for (const o of card.opciones) md.push(`- **${o.txt}** — ${clean(o.msg)}`); }
    else opBlock(card.opciones);
    md.push("");
  }
}
md.push("---", "", `## Las tres muertes`, "");
data.muertes.forEach((m, i) => md.push(`### Muerte ${i + 1} · ${m.titulo}`, "", clean(m.texto), ""));
md.push("---", "", `## Epílogo`, "", clean(data.epilogo), "");
fs.writeFileSync(path.join(ROOT, "halfling-guion.md"), md.join("\n"));

fs.rmSync(TMP, { recursive: true, force: true });
const nEsc = capitulos.reduce((a, c) => a + c.cards.filter((x) => x.tipo === "escena").length, 0);
const nPar = capitulos.reduce((a, c) => a + c.cards.filter((x) => x.tipo === "partido").length, 0);
console.log(`OK · halfling-storyboard.html · ${capitulos.length} capítulos · ${nEsc} escenas · ${nPar} partidos`);
