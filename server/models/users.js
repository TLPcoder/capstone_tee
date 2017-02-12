'use strict';
var bcrypt = require('bcrypt');

class User {
    constructor(hashed_password,email,image,zip,first_name, last_name, username) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.email = email;
        this.zip = zip;
        this.hashed_password = hashed_password;
        this.image = image;
        this.passwordHash(this.hashed_password);
    }
    passwordHash(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        this.hashed_password = hash;
    }
    unhashPassword(password) {
        console.log("your password works!", bcrypt.compareSync(password, this.hashed_password));
        return bcrypt.compareSync(password, this.hashed_password);
    }
}

module.exports = User;
