<h1 align="center">🪞 Quote Note</h1>

<p align="center">
  <i>A minimal glass-style sticky quote app built with Electron + React</i><br><br>
  <img src="./QUOTE%20NOTE%20UI.png" alt="Quote Note UI Preview" width="600" style="border-radius: 10px;">
</p>

---

<h2>🌤️ About</h2>

<p>
  <b>Quote Note</b> is a lightweight desktop application designed to gently display your favorite quotes in a beautiful, 
  semi-transparent glass interface. It’s perfect for keeping positive reminders or personal affirmations visible 
  throughout your day — without distraction or clutter.
</p>

---

<h2>✨ Features</h2>

<ul>
  <li>🧠 Add, edit, and delete quotes easily</li>
  <li>💾 Persistent local storage (saved with <code>electron-store</code>)</li>
  <li>🪟 Semi-transparent glass UI with blur and rounded corners</li>
  <li>⚙️ Settings window to manage quote rotation time and preferences</li>
  <li>⏱️ Auto-rotating quotes (custom interval options)</li>
  <li>🧷 Compact “sticky note” size window, always on top</li>
  <li>💡 Works fully offline — your quotes stay private</li>
</ul>

---

<h2>⚙️ Tech Stack</h2>

<table>
  <tr><td>Frontend</td><td>React (Vite)</td></tr>
  <tr><td>Desktop Framework</td><td>Electron</td></tr>
  <tr><td>Storage</td><td>electron-store (JSON file)</td></tr>
  <tr><td>Styling</td><td>TailwindCSS / Custom CSS</td></tr>
  <tr><td>Platform</td><td>Windows</td></tr>
</table>

---

<h2>🚀 Installation</h2>

<pre>
git clone https://github.com/&lt;your-username&gt;/quote-note.git
cd quote-note
npm install
npm start
</pre>

---

<h2>📂 Folder Structure</h2>

<pre>
quote-note/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── QuoteDisplay.jsx
│   │   ├── SettingsWindow.jsx
│   │   └── AddedQuotes.jsx
│   ├── App.jsx
│   ├── main.js
│   └── index.js
├── main/
│   └── electron.js
├── package.json
└── README.md
</pre>

---

<h2>💬 Example Default Quotes</h2>

<pre>
[
  { "quote": "Do what you can, with what you have, where you are.", "author": "Theodore Roosevelt" },
  { "quote": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt" },
  { "quote": "You are stronger than you think.", "author": "Unknown" }
]
</pre>

---

<h2>🪶 Credits</h2>

<p>
  <b>Developed by:</b> Gagana Yushan <br>
  A personal creation born from reflection
</p>
