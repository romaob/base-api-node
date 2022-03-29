class User{
    constructor(
        id, name, email, date_birth
    ){
        this.table_name = "user";
        this.attributes = {
            id: id,
            name: name,
            email: email,
            date_birth: date_birth,
            session_token: null,
            password_token: null,
            salt: null,
            date_register: new Date(),
            deleted: null,        
            posts: [],
        }
    }
}

module.exports = User;