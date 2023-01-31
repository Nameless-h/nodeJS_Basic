import express from "express";
import APIController from "../controller/APIController"
let router = express.Router();

const initAPIRoute = (app)=> {
    
    router.get('/users', APIController.getAllUsers);// METHOD GET -> read data
    router.post('/create-user',APIController.createNewUser)//METHOD POST -> create data
    router.put('/update-user',APIController.updateUser)//METHOD PUT -> update data
    router.delete('/delete-user/:id',APIController.deleteUser)//METHOD DELETE -> delete data

    return app.use('/api/v1/',router)//v1(version 1)
}

export default initAPIRoute;