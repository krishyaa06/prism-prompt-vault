/* Prism Prompt Vault · core logic */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  const VAR = /\{\{\s*([\w.-]+)(?:\s*\|\s*([^}]*?))?\s*\}\}/g;
  function variables(tpl) {
    const seen = new Map();
    for (const m of String(tpl).matchAll(VAR)) if (!seen.has(m[1])) seen.set(m[1], { name: m[1], fallback: m[2] ?? "" });
    return [...seen.values()];
  }
  function fill(tpl, values = {}) {
    return String(tpl).replace(VAR, (_, k, fb) => (values[k] != null && values[k] !== "" ? values[k] : fb != null && fb !== "" ? fb : `{{${k}}}`));
  }
  function search(prompts, q = "", tag = "") {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return prompts.filter((p) => (!tag || (p.tags || []).includes(tag)) && terms.every((t) => `${p.title} ${p.body} ${(p.tags || []).join(" ")}`.toLowerCase().includes(t)))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || (b.uses || 0) - (a.uses || 0) || a.title.localeCompare(b.title));
  }
  const allTags = (prompts) => [...new Set(prompts.flatMap((p) => p.tags || []))].sort();
  const uid = () => Math.random().toString(36).slice(2, 10);
  function normalize(p) {
    if (!p || typeof p.title !== "string" || typeof p.body !== "string") return null;
    return { id: p.id || uid(), title: p.title.trim() || "Untitled", body: p.body, tags: Array.isArray(p.tags) ? p.tags.map(String).map((t) => t.trim().toLowerCase()).filter(Boolean) : [], pinned: !!p.pinned, uses: +p.uses || 0 };
  }
  function importJSON(text, existing = []) {
    const data = JSON.parse(text), list = Array.isArray(data) ? data : data.prompts;
    if (!Array.isArray(list)) throw new Error("Expected an array of prompts or { prompts: [...] }");
    const ids = new Set(existing.map((p) => p.id)), out = [...existing]; let added = 0;
    for (const raw of list) { const p = normalize(raw); if (!p) continue; if (ids.has(p.id)) p.id = uid(); out.push(p); added++; }
    return { prompts: out, added };
  }
  const exportJSON = (prompts) => JSON.stringify({ version: 1, prompts }, null, 2);
  function toMarkdown(prompts) {
    return prompts.map((p) => `## ${p.title}\n\n${p.tags.length ? p.tags.map((t) => `\`#${t}\``).join(" ") + "\n\n" : ""}\`\`\`\n${p.body}\n\`\`\``).join("\n\n");
  }
  return { variables, fill, search, allTags, normalize, importJSON, exportJSON, toMarkdown, uid };
});
