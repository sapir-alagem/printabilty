const { getClient } = require("../utils/mongo");

class Printer {
    constructor(name, company_id, status = 'active', createdAt = new Date()) {
        this.name = name;
        this.company_id = company_id;
        this.status = status;
        this.createdAt = createdAt;
    }
}

module.exports = Printer;
