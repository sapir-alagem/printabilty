from flask import Flask, request, jsonify
import os
import requests
import cups
from print import get_printer_name
import websocket
from websocketHandler import start_websocket_client


app = Flask(__name__)
conn = cups.Connection()

# Function to download file from URL to local folder
def download_file(url, local_folder):
    filename = os.path.join(local_folder, os.path.basename(url))
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return filename

@app.route('/print', methods=['POST'])
def print_file():
    data = request.get_json()

    # Check if JSON data contains the required fields
    if not data or 'file_url' not in data:
        return jsonify({'error': 'Invalid JSON data. Required fields: file_url'}), 400

    file_url = data['file_url']
    #printer_name = data['printer_name']
    printer_name = get_printer_name(conn)
    # Define local folder to save the downloaded file
    local_folder = 'downloads'

    # Create the folder if it doesn't exist
    if not os.path.exists(local_folder):
        os.makedirs(local_folder)

    # Download the file from URL to local folder
    try:
        file_path = download_file(file_url, local_folder)
    except Exception as e:
        return jsonify({'error': f'Failed to download file: {e}'}), 500

    # Print the downloaded file
    try:
        # Extract values
        color_mode = data['color_mode']
        print_both_sides = data['print_both_sides']
        layout_mode = data['layout_mode']
        print_all_pages = data['print_all_pages']
        page_range_start = data['page_range_start']
        page_range_end = data['page_range_end']
        copies = data['copies']

        # Convert layout mode to the appropriate CUPS option
        orientation_requested = "3" if layout_mode == "portrait" else "4"  # 3 for portrait, 4 for landscape

        # Prepare options for print job
        options = {
            "ColorModel": color_mode,
            "sides": "one-sided" if not print_both_sides else "two-sided-long-edge",
            "orientation-requested": orientation_requested,
            "copies" : str(copies)
        }

        # Add page ranges if not printing all pages
        if not print_all_pages:
            options["page-ranges"] = f"{page_range_start}-{page_range_end}"

        print(options)

        job_id = conn.printFile(printer_name, file_path, "Print Job", options)
        # Delete the file after printing
        os.remove(file_path)
        return jsonify({'message': f'Print job submitted. Job ID: {job_id}'}), 200
    except cups.IPPError as e:
        return jsonify({'error': f'Failed to print: {e}'}), 500


@app.route('/', methods=['GET'])
def check_alive():
    return jsonify({'message': 'it is alive'}), 200



if __name__ == '__main__':
    # Connect to the WebSocket server
    start_websocket_client()
    # Start the Flask app
    app.run(port=12345)
