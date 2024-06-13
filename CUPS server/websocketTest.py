import websocket
import json
import time

def on_message(ws, message):
    print(f"Received message from server: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print(f"Connection closed: {close_msg}")

def on_open(ws):
    print("Connection opened")
    site = "example_site"
    printer_id = "12345"
    data = {
        "site": site,
        "printerId": printer_id
    }
    ws.send(json.dumps(data))
    print(f"Sent data: {data}")

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:5000",
                                on_open=on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    
    ws.run_forever()
