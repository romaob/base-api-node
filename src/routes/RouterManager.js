//This manager will be used in almost every route, to check and validate the requests
//It will have a basic validation funcion to handle the most opened routes
//Also it will have a primary validation funcion wich checks the headers, and app tokens, for restricted areas of the api that only applications can access
//And finally a validation funcion to check the auth of the user, and the level of access.

class RouterManager {

    constructor() {}

    checkRequestBasic(req) {
        return new Promise((resolve, reject) => { 
            //Check if the expected headers exists and are valid

                //Returns reject with 400 if they are invlid or not found
            
            //Check if the values are the expected

                //Returns reject 401 if they are not as expected

            //If everything is right, returns resolve with 202
        })
    }

    checkAppAuth(req) {
        return new Promise((resolve, reject) => { 
            //Check if the expected headers exists and are valid

                //Returns reject with 400 if they are invlid or not found

            //Find the secret key for the application

                //Returns reject with 404 if not found

            //Check and compare with the token of the request

                //Returns reject with 401 if they not match

            //If everything goes well, return resolve with 202
        })
    }

    checkUserAuth(req) {
        return new Promise((resolve, reject) => { 
            //Check if the expected headers exists and are valid

                //Returns reject with 400 if they are invlid or not found
            
            //Find the user on the database, based on the email
    
                //Returns reject with  404 if not found
    
            //Check the auth token and if it is expired
    
                //Returns reject with 401 if it is expired or not valid
    
            //Check the user access level
    
                //Returns reject with 401 if it not match with the database access level
    
            //If everything is fine, return resolve with the user object
        })
    }

}

module.exports = new RouterManager()