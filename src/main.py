from flask import Flask, jsonify, render_template
import json, os

app = Flask(__name__, template_folder="templates")

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "..", "config.json")
LOG_PATH = os.path.join(os.path.dirname(__file__), "..", "logs", "chat_log.json")

def load_config():
    with open(CONFIG_PATH, "r") as f:
        return json.load(f)

def save_config(data):
    with open(CONFIG_PATH, "w") as f:
        json.dump(data, f, indent=4)

@app.route("/status")
def status():
    return jsonify(load_config())

@app.route("/toggle_auto_reply")
def toggle_auto_reply():
    cfg = load_config()
    cfg["auto_reply"] = not cfg["auto_reply"]
    save_config(cfg)
    return jsonify({"auto_reply": cfg["auto_reply"]})

@app.route("/logs")
def logs():
    try:
        with open(LOG_PATH, "r") as f:
            logs = json.load(f)
    except:
        logs = []
    return render_template("logs.html", logs=logs)

if __name__ == "__main__":
    app.run(debug=True)
