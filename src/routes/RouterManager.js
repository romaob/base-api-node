/*
    The RouterManager is responsible for validate and process almost every request before its proper route
*/

const User = require("../models/User");

/*
    The default request readers
*/
const DEFAULT_REQ_HEADERS = {
    USER_EMAIL: "user-email",
    USER_PASSWORD: "user-password",
    USER_TOKEN: "user-token",
    APPLICATION: "application",
    APPLICATION_TOKEN: "application-token",
    APPLICATION_SECRET: "application-secret",    
}
exports.DEFAULT_REQ_HEADERS = DEFAULT_REQ_HEADERS;


/*
    Function to process and validade the request
*/
const processRequest = (req, res) => {
    return new Promise((resolve, reject) => {
        // TODO: implement the validations for the requests
        return resolve(true);      
    })    
}

exports.processRequest = processRequest;

/*
    Function to validate and check the usr authentication before processing further
*/
const checkUserAuth = (req, res) => {
    return new Promise((resolve, reject) => {
        let email = req.headers[DEFAULT_REQ_HEADERS.USER_EMAIL];
        let access_token = req.headers[DEFAULT_REQ_HEADERS.USER_TOKEN];

        if(!email || email === "" || !access_token || access_token === ""){
            reject("Invalid user headers");
            return res.status(400);;
        }

        let user = new User();
        user.attributes = req.db.getByObject(user, {email: email});
        if(!user.attributes || Object.keys(user.attributes).length === 0){
            reject("Invalid user");
            return res.status(401);
        }

        let valid = user.validateAccessToken(access_token);
        if(!valid){
            reject("Unauthorized user token");
            return res.status(401);
        }
        return resolve(user);
    })    
}
exports.checkUserAuth = checkUserAuth;

