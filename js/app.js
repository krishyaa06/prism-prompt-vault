(() => {
  const { $, $$, copy, download, store, debounce, esc, toast } = Prism;
  const SEED = [
    { title: "Build a feature end-to-end", tags: ["coding", "agent"], pinned: true, body: "You are a senior {{stack | TypeScript + React}} engineer.\n\nImplement: {{feature}}\n\nConstraints:\n- Keep changes minimal and focused\n- Add or update tests\n- Don't touch unrelated files\n\nFirst list the files you will change, then write the code." },
    { title: "Explain this error", tags: ["debug"], body: "I got this error in {{language | JavaScript}}:\n\n```\n{{error}}\n```\n\nExplain the root cause in 2 sentences, then give the smallest fix." },
    { title: "Code review", tags: ["coding", "review"], body: "Review this diff like a strict senior engineer. Focus on bugs, security and edge cases, not style.\n\n```diff\n{{diff}}\n```\n\nReturn a numbered list: severity, file:line, issue, fix." },
    { title: "Write tests", tags: ["coding", "testing"], body: "Write {{framework | node:test}} tests for the function below. Cover happy path, edge cases and failure modes.\n\n```\n{{code}}\n```" },
    { title: "Landing page copy", tags: ["marketing"], body: "Write landing page copy for {{product}}, a tool for {{audience}}.\nTone: {{tone | confident, friendly}}.\nSections: hero (headline + subline), 3 features, FAQ (4 Qs), CTA." },
    { title: "Refactor for readability", tags: ["coding"], body: "Refactor this code for readability without changing behaviour. Explain each change in one line.\n\n```\n{{code}}\n```" },
  ].map((p) => Core.normalize(p));
  let P = store.get("vault:prompts", SEED), cur = P[0]?.id, tag = "", vals = {};
  const save = () => store.set("vault:prompts", P);
  const get = () => P.find((p) => p.id === cur);
  function renderList() {
    const tags = Core.allTags(P);
    $("#tags").innerHTML = tags.map((t) => `<button data-t="${esc(t)}" class="${t === tag ? "on" : ""}">#${esc(t)}</button>`).join("");
    $$("#tags button").forEach((b) => (b.onclick = () => { tag = tag === b.dataset.t ? "" : b.dataset.t; renderList(); }));
    const res = Core.search(P, $("#q").value, tag);
    $("#list").innerHTML = res.map((p) => `<button class="item ${p.id === cur ? "on" : ""}" data-id="${p.id}"><b>${p.pinned ? "📌 " : ""}${esc(p.title)}</b><small>${esc(p.body.slice(0, 80))}</small></button>`).join("") || `<p class="muted">No prompts match.</p>`;
    $$("#list .item").forEach((b) => (b.onclick = () => { cur = b.dataset.id; vals = {}; renderList(); renderEditor(); }));
  }
  function renderEditor() {
    const p = get(); if (!p) return;
    $("#title").value = p.title; $("#ptags").value = p.tags.join(", "); $("#body").value = p.body; $("#pin").textContent = p.pinned ? "Unpin" : "Pin";
    renderVars();
  }
  function renderVars() {
    const p = get(); const vs = Core.variables(p.body);
    $("#vars").innerHTML = vs.map((v) => `<label class="field"><span>${esc(v.name)}</span>${/code|diff|error/.test(v.name) ? `<textarea data-v="${esc(v.name)}" rows="3" placeholder="${esc(v.fallback)}">${esc(vals[v.name] || "")}</textarea>` : `<input data-v="${esc(v.name)}" placeholder="${esc(v.fallback)}" value="${esc(vals[v.name] || "")}" />`}</label>`).join("");
    $$("[data-v]").forEach((el) => (el.oninput = () => { vals[el.dataset.v] = el.value; renderOut(); }));
    renderOut();
  }
  function renderOut() { const t = Core.fill(get().body, vals); $("#out").textContent = t; $("#len").textContent = `${t.length} chars · ~${Math.ceil(t.length / 4)} tokens`; }
  const upd = debounce(() => { const p = get(); p.title = $("#title").value; p.tags = $("#ptags").value.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean); p.body = $("#body").value; save(); renderList(); renderVars(); }, 200);
  ["#title", "#ptags", "#body"].forEach((s) => $(s).addEventListener("input", upd));
  $("#q").addEventListener("input", debounce(renderList, 120));
  $("#new").onclick = () => { const p = Core.normalize({ title: "New prompt", body: "Describe the task for {{topic}}…", tags: [] }); P.unshift(p); cur = p.id; save(); renderList(); renderEditor(); $("#title").select(); };
  $("#del").onclick = () => { if (!confirm("Delete this prompt?")) return; P = P.filter((p) => p.id !== cur); if (!P.length) P = [Core.normalize({ title: "New prompt", body: "" })]; cur = P[0].id; save(); renderList(); renderEditor(); };
  $("#pin").onclick = () => { const p = get(); p.pinned = !p.pinned; save(); renderList(); renderEditor(); };
  $("#copy").onclick = () => { const p = get(); p.uses++; save(); copy($("#out").textContent); };
  $("#exp").onclick = () => download("prism-prompts.json", Core.exportJSON(P), "application/json");
  $("#imp").onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { const r = Core.importJSON(await f.text(), P); P = r.prompts; save(); renderList(); toast(`Imported ${r.added} prompts`); } catch (err) { toast(err.message); } };
  renderList(); renderEditor();
})();
