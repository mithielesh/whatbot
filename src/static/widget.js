(function() {
  // Prevent duplicate widget injection
  if (document.getElementById("wa-bot-widget")) return;

  // Create widget container
  const box = document.createElement("div");
  box.id = "wa-bot-widget";
  box.innerHTML = `
    <div class="wa-header">WhatsApp Bot</div>
    <button id="toggle-btn">Auto-Reply: OFF</button>
    <button id="scheduled-btn">Scheduled</button>
    <button id="bulk-btn">Bulk</button>
    <button id="logs-btn">Logs</button>
  `;
  document.body.appendChild(box);

  // Internal CSS for compact dark mode
  const style = document.createElement("style");
  style.textContent = `
    #wa-bot-widget {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 180px;
      background: #121B22; /* WhatsApp dark background */
      color: #ECECEC; /* light gray text */
      border: 1px solid #2A3945;
      border-radius: 10px;
      padding: 8px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 99999;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    }
    #wa-bot-widget .wa-header {
      font-weight: bold;
      text-align: center;
      margin-bottom: 6px;
      color: #ECECEC;
      font-size: 14px;
    }
    #wa-bot-widget button {
      width: 100%;
      margin: 4px 0;
      padding: 6px;
      border: none;
      background: #25D366; /* toned down green */
      color: #ECECEC;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 13px;
      transition: background 0.2s ease, transform 0.1s ease;
    }
    #wa-bot-widget button:hover {
      background: #1DA851;
      transform: translateY(-1px);
    }
    #wa-bot-widget button:active {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Buttons
  const toggleBtn = document.getElementById("toggle-btn");
  const scheduledBtn = document.getElementById("scheduled-btn");
  const bulkBtn = document.getElementById("bulk-btn");
  const logsBtn = document.getElementById("logs-btn");

  // Auto-Reply toggle
  toggleBtn.addEventListener("click", async () => {
    await fetch("http://localhost:5000/toggle_auto_reply");
    const res = await fetch("http://localhost:5000/status");
    const data = await res.json();
    toggleBtn.textContent = "Auto-Reply: " + (data.auto_reply ? "ON" : "OFF");
  });

  // Initial status fetch
  fetch("http://localhost:5000/status")
    .then(r => r.json())
    .then(data => {
      toggleBtn.textContent = "Auto-Reply: " + (data.auto_reply ? "ON" : "OFF");
    });

  // Open feature pages
  scheduledBtn.addEventListener("click", () => window.open("http://localhost:5000/schedule", "_blank"));
  bulkBtn.addEventListener("click", () => window.open("http://localhost:5000/bulk", "_blank"));
  logsBtn.addEventListener("click", () => window.open("http://localhost:5000/logs", "_blank"));

})();
