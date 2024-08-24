class User {
  constructor(email, password, role) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
  }
}

module.exports = User;
