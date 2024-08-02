class QrCode {
    constructor(value, printer_id, company_id) {
        this.value = value;
        this.printer_id = printer_id;
        this.company_id = company_id;
        this.obsolete = false;
        this.createdAt = new Date();
    }
}

module.exports = QrCode;
