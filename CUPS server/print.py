import cups

def get_printer_status(conn, printer_name):
    printer_state = conn.getPrinterAttributes(printer_name, requested_attributes=["printer-state-reasons"])
    return printer_state

def get_print_job_status_message(conn, job_id):
    job_attributes = conn.getJobAttributes(job_id)
    return job_attributes["job-state-reasons"]

def get_print_job_status(conn, job_id):
    status = conn.getJobAttributes(job_id)["job-state"]
    return status

def get_printer_name(conn):
    printers = conn.getPrinters()
    printer_name = conn.getDefault()  # Convert dict_keys object to a list and choose the first printer
    return printer_name

if __name__ == "__main__":
        
    # Get a connection to the CUPS server
    conn = cups.Connection()

    # Get a list of available printers
    printers = conn.getPrinters()

    # Choose a printer
    printer_name = list(printers.keys())[0]  # Convert dict_keys object to a list and choose the first printer

    # Specify the file to print
    file_path = '/home/idan/Desktop/test'

    # Print the file
    job_id = conn.printFile(printer_name, file_path, "Print Job", {})
    print("Print job submitted. Job ID:", job_id)

    while get_print_job_status(conn, job_id) != 9:
        print(get_print_job_status_message(conn, job_id))
