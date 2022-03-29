const fs = require('fs')

const models = require('../models/_models')

const DB_VERSION = 1;
const DB_FILE = '';

class MyJsonDBManager{

    constructor(){
        this.db = setup()

    }

    setup(){
        
    }

    defineDB(){

    }

    add(obj, autosave){
        //add
        if(autosave) this.saveDB()        
    }

    remove(obj, autosave){
        //remove
        if(autosave) this.saveDB()
    }

    update(obj, autosave){
        if(!obj || !obj.table || !obj.id) return false
        
        this.db.data[obj.table].find((item) => {
            return item.id === obj.id
        })


        if(autosave) 
            this.saveDB().catch(e => {
                console.log(`DB MANAGER - Failed to save db`)
                console.log(e)
            })
    }

    saveDB(){
        let data = this.db
        return new Promise((resolve, reject) => {
            let parsedData = ''
            try {
                parsedData = JSON.parse(data)    
            } catch (error) {
                return reject(error)                
            }            

            fs.writeFile(DB_FILE, parsedData, 'utf8', (err) => {
                if(err) return reject(err)
                return resolve()
            })
        })        
    }

    loadDB(){
        return new Promise((resolve, reject) => {
            fs.readFile(DB_FILE,(err, data) => {
                if(err) return reject(err)
                if(!data) return resolve(null)
                let db = JSON.parse(data)
                if(!db) return resolve(null)                    
                return resolve(db);
            })          
        })        
    }

    migrate(db){
        if(!db || !db.DB_VERSION) return false;
        if(this.db.DB_VERSION < DB_VERSION){
            if(this.db.DB_VERSION === 1){
                //Do migration stuff here
                this.db.DB_VERSION++                
            }            
            if(this.DB_VERSION === DB_VERSION){
                this.saveDB()
            }
        }
        return true;
    }

}