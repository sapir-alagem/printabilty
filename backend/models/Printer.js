const { getClient } = require("../utils/mongo");

class Printer {
  constructor(name, company_id) {
    this.name = name;
    this.company_id = company_id;
  }
}

module.exports = Printer;
