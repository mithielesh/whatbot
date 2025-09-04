from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time, os

def inject_widget():
    # ------------------------------
    # Chrome Options
    # ------------------------------
    options = Options()
    options.add_argument(r"--user-data-dir=C:\selenium-profile")  
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--start-maximized")
    options.add_argument("--disable-software-rasterizer")
    options.binary_location = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

    # ------------------------------
    # ChromeDriver Service
    # ------------------------------
    chromedriver_path = os.path.join(os.path.dirname(__file__), "chromedriver.exe")
    service = Service(chromedriver_path)

    # ------------------------------
    # Start Chrome
    # ------------------------------
    driver = webdriver.Chrome(service=service, options=options)
    driver.get("https://web.whatsapp.com")

    # Wait for manual QR scan on first login
    input("Scan the QR code, then press Enter...")

    time.sleep(10)  # wait for page to fully load

    # ------------------------------
    # Inject widget.js
    # ------------------------------
    js_path = os.path.join(os.path.dirname(__file__), "static", "widget.js")
    with open(js_path, "r", encoding="utf-8") as f:
        script = f.read()
    driver.execute_script(script)

    print("Widget injected! WhatsApp Bot is ready.")
    return driver

if __name__ == "__main__":
    inject_widget()
