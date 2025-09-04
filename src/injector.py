from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os

def inject_widget():
    options = Options()
    options.add_argument(r"--user-data-dir=C:\selenium-profile")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-software-rasterizer")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-notifications")
    options.add_argument("--disable-background-networking")
    options.add_argument("--log-level=3")
    options.add_argument("--no-first-run")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument("--start-maximized")
    options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    chromedriver_path = os.path.join(os.path.dirname(__file__), "chromedriver.exe")
    service = Service(chromedriver_path)
    driver = webdriver.Chrome(service=service, options=options)

    driver.get("https://web.whatsapp.com")
    print("Loading WhatsApp Web...")

    # Wait for WhatsApp Web to fully load
    WebDriverWait(driver, 60).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )
    WebDriverWait(driver, 60).until(
        lambda d: d.execute_script("return !!document.body")
    )
    WebDriverWait(driver, 60).until(
        EC.presence_of_element_located((By.ID, "pane-side"))
    )
    print("WhatsApp Web loaded!")

    # Inject widget.js
    js_path = os.path.join(os.path.dirname(__file__), "static", "widget.js")
    if os.path.exists(js_path):
        with open(js_path, "r", encoding="utf-8") as f:
            script = f.read()
        try:
            driver.execute_script(script)
            print("Widget injected! Bot ready.")
        except Exception as e:
            print("Error injecting widget:", e)
    else:
        print("widget.js not found!")

    return driver

if __name__ == "__main__":
    driver = inject_widget()
    print("Press Enter to exit and close the bot...")
    input()  # Keeps Chrome open until you press Enter
