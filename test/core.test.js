const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
test("variables with defaults, deduped", () => {
  assert.deepEqual(C.variables("Hi {{name}}, use {{ lang | JS }} and {{name}}"), [{ name: "name", fallback: "" }, { name: "lang", fallback: "JS" }]);
});
test("fill uses value, then default, else keeps placeholder", () => {
  assert.equal(C.fill("{{a}} {{b|x}} {{c}}", { a: "1" }), "1 x {{c}}");
});
test("search by terms + tag, pinned first", () => {
  const ps = [C.normalize({ title: "Review", body: "diff", tags: ["code"] }), C.normalize({ title: "Copy", body: "landing", tags: ["mkt"], pinned: true }), C.normalize({ title: "Tests", body: "code tests", tags: ["code"] })];
  assert.deepEqual(C.search(ps, "", "code").map((p) => p.title), ["Review", "Tests"]);
  assert.deepEqual(C.search(ps, "").map((p) => p.title)[0], "Copy");
  assert.deepEqual(C.search(ps, "code tests").map((p) => p.title), ["Tests"]);
  assert.deepEqual(C.allTags(ps), ["code", "mkt"]);
});
test("import/export roundtrip", () => {
  const a = [C.normalize({ id: "x", title: "A", body: "b" })];
  const r = C.importJSON(C.exportJSON(a), a);
  assert.equal(r.added, 1); assert.equal(r.prompts.length, 2); assert.notEqual(r.prompts[1].id, "x");
  assert.throws(() => C.importJSON('{"nope":1}'));
});
test("markdown export", () => { assert.match(C.toMarkdown([C.normalize({ title: "T", body: "B", tags: ["x"] })]), /## T\n\n`#x`\n\n```\nB\n```/); });
