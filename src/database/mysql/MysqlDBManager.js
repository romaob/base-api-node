const mysql = require('mysql');
const Models = require("../../models/_models");

const DB_VERSION = 1;
const DB_FILE = '';

//Manager the connection with the MYSQL database
class MysqlDBManager{

    constructor(config){
        this.config = config;
        this.db = this.setup()        
    }

    setup(){
        let db = mysql.createConnection({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
        });
        db.connect(err => {
            if(err) throw err;
            console.log("Connected to the database");
        });
        return db;                        
    }

    migrate(db){
    }

}

module.exports = MysqlDBManager