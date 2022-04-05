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

    getAll(model){
        return new Promise((resolve, reject) => {
            let where = model.attributes.deleted !== undefined ? ` WHERE deleted = 0` : '';
            let query = `SELECT * FROM ? ${where}`;
            this.db.query(query, [model.table_name], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    getByID(model, id){
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ? WHERE id = ?`;
            this.db.query(query, [model.table_name, id], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    getByObject(model, object){
        return new Promise((resolve, reject) => {            
            let where =  Object.keys(object).map(item => {
                return `${item} = ?`;
            })
            let query = `SELECT * FROM ? WHERE ` + where.join(' AND ');
            this.db.query(query, [model.table_name, ...Object.values(object)], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    insert(item){
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ? SET`;
            let values = [];
            let keys = item.attributes.filter(item => {
                return item.value !== null;
            });
            keys = Object.keys(item.attributes).map((key) => {
                values.push(item.attributes[key]);
                return `${key} = ?`;
            });
            query += ` ${keys.join(', ')}`;
            this.db.query(query, [item.table_name, ...values], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    update(item){
        return new Promise((resolve, reject) => {
            let query = `UPDATE ? SET`;
            let values = [];
            let keys = item.attributes.filter(item => {
                return item.value !== null;
            });
            keys = Object.keys(item.attributes).map((key) => {
                values.push(item.attributes[key]);
                return `${key} = ?`;
            });
            query += ` ${keys.join(', ')}`;
            query += ` WHERE id = ?`;
            values.push(item.attributes.id);
            this.db.query(query, [item.table_name, ...values], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    update(item, where){
        return new Promise((resolve, reject) => {
            let query = `UPDATE ? SET`;
            let values = [];
            let keys = item.attributes.filter(item => {
                return item.value !== null;
            });
            keys = Object.keys(item.attributes).map((key) => {
                values.push(item.attributes[key]);
                return `${key} = ?`;
            });
            query += ` ${keys.join(', ')}`;
            query += ` WHERE `;
            let where_keys = Object.keys(where).map((key) => {
                values.push(where[key]);
                return `${key} = ?`;
            });
            query += where_keys.join(' AND ');
            this.db.query(query, [item.table_name, ...values], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    delete(model, id){
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM ? WHERE id = ?`;
            this.db.query(query, [model.table_name, id], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    delete(model, where){
        return new Promise((resolve, reject) => {
            let query = `DELETE FROM ? WHERE `;
            let values = [];
            let keys = Object.keys(where).map((key) => {
                values.push(where[key]);
                return `${key} = ?`;
            });
            query += keys.join(' AND ');
            this.db.query(query, [model.table_name, ...values], (err, result) => {
                if(err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = MysqlDBManager