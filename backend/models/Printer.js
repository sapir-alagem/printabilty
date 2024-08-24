const { getClient } = require('../utils/mongo'); 

class Printer {
    constructor(name, company_id, status = 'active') {
        this.name = name;
        this.company_id = this.company_id;
        this.status = status;
    }
}

module.exports = Printer;