import os
import requests
import cups
import websocket
import json
import threading

from flask import Flask

app = Flask(__name__)

conn = cups.Connection()

websocketThreadEvent = threading.Event()

def get_company_id_from_user():
    company_id = None
    if not os.path.exists('company_id.txt'):
        company_id = input("Enter your company ID: ")
        with open('company_id.txt', 'w') as f:
            f.write(company_id)
    else:
        company_id = read_company_id()
    return company_id

def read_company_id():
    with open('company_id.txt', 'r') as f:
        return f.read().strip()

# Function to download file from URL to local folder
def download_file(url, local_folder):
    filename = os.path.join(local_folder, os.path.basename(url))
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return filename

def on_message(ws, message):
    print(f"Received message from server: {message}")
    if 'print_request' in message:
        response = on_print_request(message)
        #ws.send(response)

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print(f"Connection closed: {close_msg}")

def on_open(ws):
    print("Connection opened")
    company_id = get_company_id_from_user()
    data = {
        "company_id": company_id,
    }
    ws.send(json.dumps(data))
    print(f"Sent data: {data}")
    websocketThreadEvent.set()

def on_print_request(data):
    print("Received print request on WebSocket")


    # Check if JSON data contains the required fields
    if not data or 'file_url' not in data:
        return {'error': 'Invalid JSON data. Required fields: file_url'}

    data = json.loads(data)

    file_url = data['file_url']
    printer_name = data['printer_name']
    #printer_name = get_printer_name(conn)
    # Define local folder to save the downloaded file
    local_folder = 'downloads'

    # Create the folder if it doesn't exist
    if not os.path.exists(local_folder):
        os.makedirs(local_folder)

    # Download the file from URL to local folder
    try:
        file_path = download_file(file_url, local_folder)
    except Exception as e:
        return {'error': f'Failed to download file: {e}'}

    # Print the downloaded file
    try:
        # Extract values
        color_mode = data['color_mode']
        print_both_sides = data['print_both_sides']
        print_all_pages = data['print_all_pages']
        page_range_start = data['page_range_start']
        page_range_end = data['page_range_end']
        copies = data['copies']


        # Prepare options for print job
        options = {
            "ColorModel": "RGB" if color_mode == 'color' else 'Gray',
            "sides": "two-sided-long-edge" if print_both_sides else "None",
            "copies" : str(copies)
        }

        # Add page ranges if not printing all pages
        if not print_all_pages:
            options["page-ranges"] = f"{page_range_start}-{page_range_end}"

        print(options)

        job_id = conn.printFile(printer_name, file_path, "Print Job", options)
        # Delete the file after printing
        os.remove(file_path)
        return {'message': f'Print job submitted. Job ID: {job_id}'}
    except cups.IPPError as e:
        return {'error': f'Failed to print: {e}'}


    
def start_websocket_client():
    websocket.enableTrace(True)
    # Include an ID or data in the URL as a query parameter
    ws = websocket.WebSocketApp("ws://192.168.0.199:5000",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close,
                                on_open = on_open)
    ws.run_forever(reconnect=5)

@app.route('/')
def home():
    return "Hello, this is a response from the Flask server!"

if __name__ == '__main__':
    websocketThread = threading.Thread(target=start_websocket_client).start()
    #wait for websocket to connect
    websocketThreadEvent.wait()
    app.run(host='0.0.0.0', port=12345)

