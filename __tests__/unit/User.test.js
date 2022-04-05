const User = require("../../src/models/User");

describe('Testing the model User.js', () => {
    
    it('should test the encrypt and validation functions related to the password fo the user', () => {        
        const user = new User('New User Name', 'newuser@email.com', new Date());
        const password = '123456';
        const user_encrypted = user.encrypt(password);
        expect(user_encrypted.salt).toBeDefined();
        expect(user_encrypted.password_token).toBeDefined();
        expect(user_encrypted.password_token).not.toBe(password); 

        //user.attributes = user_encrypted;
        let valid = user.validatePassword(password);
        expect(valid).toBe(true);

        valid = user.validatePassword('1234567');
        expect(valid).toBe(false);
    });

    it('should test the generation and validation of the AccessToken functions', () => {
        const user = new User('New User Name', 'newuser@email.com', new Date());
        const token = user.generateAccessToken();
        expect(token).toBeDefined();
        expect(token).not.toBe(null);
        expect(token).not.toBe('');

        const valid = user.validateAccessToken(token);
        expect(valid).toBe(true);        
    })
});