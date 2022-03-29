
/*
    - Setup
    - Manager
    - Adapter
*/
/*
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const models = require('../models/_models')

class LowDBManager {
    constructor() {
        this.setup()
    }

    setup(){
        const __dirname = dirname(fileURLToPath(import.meta.url));

        // Use JSON file for storage
        const file = join(__dirname, 'db.json')
        const adapter = new JSONFile(file)
        const db = new Low(adapter)

        // Read data from JSON file, this will set db.data content
        await db.read()

        // If file.json doesn't exist, db.data will be null
        this.defineScheme(db)

        // Finally write db.data content to file
        await db.write()

        return db
    }

    //Define the scheme using all models in _models and their attributes
    defineScheme(db) {        
        if(!db) return      //return if there is no db return
        if(db.data) return  //return if the data scheme is already defined

        let scheme = {}
        Object.keys(models).forEach(item => {
            scheme[item] = models[item].attributes
        })
        db.data = scheme
    }

}

module.exports = new LowDBManager()
*/