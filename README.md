<!-- ═════════════ HEADER ═════════════ -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:07060f,50:B388FF,100:FF6B9A&height=200&section=header&text=Prism%20Prompt%20Vault&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=Prompt%20library%20with%20%7B%7Bvariables%7D%7D&descAlignY=58&descSize=16" width="100%" alt="Prism Prompt Vault" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=19&duration=2600&pause=800&color=B388FF&center=true&vCenter=true&width=680&lines=%7B%7Bfeature%7D%7D+%E2%86%92+filled+prompt;Tag%2C+pin%2C+search;Copy+into+Cursor+or+Claude;Import+%2F+export+JSON" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/krishyaa06/prism-prompt-vault/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/krishyaa06/prism-prompt-vault/ci.yml?branch=main&style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI" /></a>
  <a href="https://krishyaa06.github.io/prism-prompt-vault/"><img src="https://img.shields.io/badge/Live_Demo-Open-B388FF?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Vanilla-HTML%20%7C%20CSS%20%7C%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/dependencies-0-B388FF?style=for-the-badge" alt="Zero dependencies" />
  <a href="LICENSE"><img src="https://img.shields.io/github/license/krishyaa06/prism-prompt-vault?style=for-the-badge&color=FF6B9A" alt="License" /></a>
</p>

<p align="center">
  <img src="assets/screenshots/desktop.png" width="90%" alt="Prism Prompt Vault screenshot" />
</p>

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="" />

## ⚡ Overview

**Prism Prompt Vault** keeps the prompts you reuse every day in one place. Write templates with `{{variable}}` or `{{variable | default}}` placeholders, and the vault builds a fill-in form, shows the finished prompt with a token estimate, and copies it in one click. Prompts can be tagged, pinned, searched and ranked by how often you use them. Everything is saved in your browser and can be exported or imported as JSON.

## ✨ Features

- **Templates** with `{{var}}` and `{{var | default}}` placeholders
- **Auto-generated form** — multiline inputs for code/diff/error variables
- **Live preview** with character + token estimate, one-click copy
- **Tags, pins and search**; frequently used prompts rise to the top
- **Starter pack** of coding prompts (feature build, review, tests, debugging)
- **JSON import/export** — share a pack with your team

## 📸 Screenshots

<table>
  <tr>
    <td width="68%"><img src="assets/screenshots/desktop.png" width="100%" alt="Prism Prompt Vault on desktop" /></td>
    <td width="32%"><img src="assets/screenshots/mobile.png" width="100%" alt="Prism Prompt Vault on mobile" /></td>
  </tr>
</table>

## 🚀 Quick Start

**Use it online:** [https://krishyaa06.github.io/prism-prompt-vault/](https://krishyaa06.github.io/prism-prompt-vault/)

**Run locally:**

```bash
git clone https://github.com/krishyaa06/prism-prompt-vault.git
cd prism-prompt-vault
# open index.html in your browser, or serve it:
npx serve .
```

## 🛠️ Usage

1. Pick a prompt from the list or click **+ New**.
2. Edit the template; placeholders appear as form fields.
3. Fill them in and hit **Copy prompt**.

Share a pack with **Export** and load one with **Import**.

## 📁 Project Structure

```text
prism-prompt-vault/
├── assets/
│   ├── logo.png
│   └── logo.svg
├── css/
│   ├── app.css
│   └── prism.css
├── js/
│   ├── app.js   # library UI
│   ├── core.js   # template engine, search, import/export — tested in Node
│   └── prism.js
├── test/
│   └── core.test.js
├── .gitignore
├── LICENSE
├── README.md
├── index.html
└── package.json
```

## 🧪 Tests

```bash
npm test
```

Tests use the built-in `node:test` runner, so there is nothing to install. CI runs them on Node 20 and 22.

## 🤝 Contributing

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Make your change and add a test in `test/`
3. Run `npm test` and open a Pull Request

## 🔷 Part of Prism Protocol

Prism Prompt Vault is one of the open-source tools built by [Prism Protocol](https://dc.gg/prismprotocol), a tech community where young builders learn, ship and compete together.

## 👤 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/krishyaa06"><img src="https://github.com/krishyaa06.png" width="90" style="border-radius:50%" alt="Soumya Bhandare" /><br><b>Soumya Bhandare</b></a><br>
      <sub>Founder @ Prism Protocol</sub>
    </td>
    <td>
      <a href="https://dc.gg/prismprotocol"><img src="https://img.shields.io/badge/Discord-Prism%20Protocol-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a><br>
      <a href="https://instagram.com/prism_protocol_"><img src="https://img.shields.io/badge/Instagram-@prism__protocol__-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a><br>
      <a href="https://x.com/krishyaa06"><img src="https://img.shields.io/badge/X-@krishyaa06-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
    </td>
  </tr>
</table>

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center">
  <b>If you like this project, consider giving it a ⭐</b><br>
  <sub>"Build. Create. Compete." · Made with ⚡ by Prism Protocol</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FF6B9A,50:B388FF,100:07060f&height=110&section=footer" width="100%" alt="" />
