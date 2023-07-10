import express from 'express';
import { LoginUser, RegisterUser } from '../controller/index.js';
const Router = express.Router();

Router.post('/login-user', LoginUser)
Router.post('/register-user', RegisterUser)


Router.use('*' , (req, res) => {
    res.status(404).json({error: "Page Not Found"})
})

export default Router;
