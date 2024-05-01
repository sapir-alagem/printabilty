from flask import Flask, request, jsonify
import os
import requests
import cups
from print import get_printer_name

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
    if not data or 'file_url' not in data or 'printer_name' not in data:
        return jsonify({'error': 'Invalid JSON data. Required fields: file_url, printer_name'}), 400

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
        job_id = conn.printFile(printer_name, file_path, "Print Job", {})
        # Delete the file after printing
        os.remove(file_path)
        return jsonify({'message': f'Print job submitted. Job ID: {job_id}'}), 200
    except cups.IPPError as e:
        return jsonify({'error': f'Failed to print: {e}'}), 500


@app.route('/', methods=['GET'])
def check_alive():
    return jsonify({'message': 'it is alive'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=12345)
