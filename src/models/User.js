var crypto = require('crypto');

class User{
    constructor(
        name, email, date_birth
    ){
        this.table_name = "user";
        this.attributes = {
            id: null,
            name: name,
            email: email,
            date_birth: date_birth,
            session_token: null,
            password_token: null,
            salt: null,
            date_registration: null,
            deleted: null,        
            posts: [],
        }
    }

    /*    
    *   @param {string} password
    *   @return {Object} the user object with the hash related attributes
    *   @description: hashes the password and sets the salt and password_token
    */
    encrypt(password){
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(this.attributes.email+password+salt, salt, 1000, 64, 'sha512').toString('hex');                
        this.attributes.salt = salt;
        this.attributes.password_token = hash;
        return this.attributes;
    }

    /*
    *   @param {string} password
    *   @return {boolean} true if the password is correct, false otherwise
    *  @description: compares the password with the hash
    *  */
    validatePassword(password){
        const hash = crypto.pbkdf2Sync(this.attributes.email+password+this.attributes.salt, this.attributes.salt, 1000, 64, 'sha512').toString('hex');        
        return this.attributes.password_token === hash;
    }

    generateAccessToken(){
        const token = crypto.randomBytes(16).toString('hex');
        this.attributes.session_token = token;
        return token;
    }

    /*
    *   @param {string} token
    *   @return {boolean} true if the token is correct, false otherwise
    *   @description: compares the token with the session_token
    * */
    validateAccessToken(token){
        return this.attributes.session_token === token;
    }
}

module.exports = User;