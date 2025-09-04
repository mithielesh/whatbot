(function() {
  if (document.getElementById("wa-bot-widget")) return;

  const box = document.createElement("div");
  box.id = "wa-bot-widget";
  box.innerHTML = `
    <div class="wa-header">WhatsApp Bot</div>
    <button id="toggle-btn">Auto-Reply: OFF</button>
    <button onclick="window.open('http://localhost:5000/schedule','_blank')">Scheduled</button>
    <button onclick="window.open('http://localhost:5000/bulk','_blank')">Bulk</button>
    <button onclick="window.open('http://localhost:5000/logs','_blank')">Logs</button>
  `;
  document.body.appendChild(box);

  const style = document.createElement("style");
  style.textContent = `
    #wa-bot-widget {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 180px;
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 10px;
      font-family: sans-serif;
      z-index: 99999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    #wa-bot-widget button {
      width: 100%;
      margin: 5px 0;
      padding: 5px;
      border: none;
      background: #25D366;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
    #wa-bot-widget .wa-header {
      font-weight: bold;
      text-align: center;
      margin-bottom: 8px;
    }
  `;
  document.head.appendChild(style);

  const btn = document.getElementById("toggle-btn");
  btn.addEventListener("click", async () => {
    await fetch("http://localhost:5000/toggle_auto_reply");
    const res = await fetch("http://localhost:5000/status");
    const data = await res.json();
    btn.textContent = "Auto-Reply: " + (data.auto_reply ? "ON" : "OFF");
  });

  fetch("http://localhost:5000/status").then(r => r.json()).then(data => {
    btn.textContent = "Auto-Reply: " + (data.auto_reply ? "ON" : "OFF");
  });
})();
