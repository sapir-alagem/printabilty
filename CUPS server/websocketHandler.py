import websocket


def on_message(ws, message):
    print(f"Received message: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    print("Connection opened...")
    # Here you can send messages to the server if needed using ws.send("Your message")

def start_websocket_client():
    websocket.enableTrace(True)
    # Include an ID or data in the URL as a query parameter
    ws = websocket.WebSocketApp("ws://your-websocket-server-url/?id=yourID",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()