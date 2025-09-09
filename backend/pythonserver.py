from flask import Flask, send_from_directory
from flask_socketio import SocketIO
import time
import os
from threading import Thread

app = Flask(
    __name__,
    static_folder=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public')),
    static_url_path=''
)
socketio = SocketIO(app)

# Hier importieren Sie Ihre Python-Klasse, die die Daten bereitstellt
from python_server.hm64mem import HM64Mem

data_provider = HM64Mem()  # Annahme: Ihre Datenklasse

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

def emit_updated_data():
    json_data = data_provider.get_data() 
    socketio.emit("json-update", json_data)

def background_thread():
    while True:
        emit_updated_data()
        time.sleep(0.001)  # Send data every 5 seconds

@socketio.on('connect')
def handle_connect():
    if not hasattr(handle_connect, 'first_connect'):
        handle_connect.first_connect = True
        thread = Thread(target=background_thread)
        thread.daemon = True
        thread.start()

if __name__ == "__main__":
    socketio.run(app, debug=True)