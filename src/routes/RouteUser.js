const express = require('express');
const User = require('../models/User');
const router = express.Router();

const manager = require('./RouterManager');

const name = "User";
exports.name = name;

const url = "/user";
exports.url = url;

/*
    Get all users from database
*/
router.get("/", async (req, res) => {
    //Check the user requesting
    let err, usr = await manager.checkUserAuth(req, res).catch(e => {
        err = e; return null;
    })
    if(!usr) return;

    //Get all users
    let data = await req.db.getAll(new User()).catch(e => {
        err = e; return null;
    })
    if(err) {
        console.log(err)
        return res.status(500);
    }
    return res.json(data);
})

router.get("/:id", async (req, res) => {
    //Check the user requesting
    let err, usr = await manager.checkUserAuth(req, res).catch(e => {
        err = e; return null;
    })
    if(!usr) return;

    //Get the user by id
    let data = await req.db.getByID(new User(), req.params.id).catch(e => {
        err = e; return null;
    })
    if(err) {
        console.log(err)
        return res.status(500);
    }
    return res.json(data);
})

router.post("/", async (req, res) => {
    //Check the request and the application requesting
    let err, valid = await manager.processRequest(req, res).catch(e => {
        err = e; return null;
    })
    if(!valid) return;

    //Check the data
    if(
        !req.body.email || req.body.email === "" ||
        !req.body.password || req.body.password === "" ||
        !req.body.name || req.body.name === "" ||
        !req.body.date_birth || req.body.date_birth === ""
    ){
        return res.status(400);
    }

    //Create the user
    let user = new User(req.body.email, req.body.name, new Date(req.body.date_birth));
    user.encrypt(req.body.password);
    await req.db.insert(user).catch(e => {
        err = e; return null;
    })
    if(err) {
        console.log(err)
        return res.status(500);
    }
    return res.status(201);
})

router.put("/:id", async (req, res) => {
    //Check the user requesting
    let err, usr = await manager.checkUserAuth(req, res).catch(e => {
        err = e; return null;
    })
    if(!usr) return;

    //Check the data
    if(
        !req.body.name || req.body.name === "" ||
        !req.body.date_birth || req.body.date_birth === ""
    ){
        return res.status(400);
    }

    //Check if the user is the same
    if(usr.attributes.id !== req.params.id){
        return res.status(401);
    }

    //Get the user by id   
    usr.attributes.date_birth = new Date(req.body.date_birth);
    usr.attributes.name = req.body.name;
    await req.db.update(usr).catch(e => {
        err = e; return null;
    })
    if(err) {
        console.log(err)
        return res.status(500);
    }
    return res.status(200);
})

router.delete("/:id", async (req, res) => {
    //Check the user requesting
    let err, usr = await manager.checkUserAuth(req, res).catch(e => {
        err = e; return null;
    })
    if(!usr) return;

    //Check if the user is the same
    if(usr.attributes.id !== req.params.id){
        return res.status(401);
    }

    //Delete the user
    usr.attributes.deleted = true;
    await req.db.update(usr).catch(e => {
        err = e; return null;
    })
    if(err) {
        console.log(err)
        return res.status(500);
    }
    return res.status(200);
})


