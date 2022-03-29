require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const MysqlDBManager = require("./database/mysql/MysqlDBManager");

//const LowDBManager = require("./database/LowDBManager")

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(morgan("dev"))

        //Seting the Database Manager
        //this.express.db = LowDBManager;
        let config = require("./database/mysql/mysql.config.json");
        this.express.db = new MysqlDBManager(config);
    }

    routes() {
        this.express.use(require("./router"));
    }
}

module.exports = new AppController().express