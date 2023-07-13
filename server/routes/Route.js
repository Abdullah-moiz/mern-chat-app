import express from 'express';
import { LoginUser, RegisterUser } from '../controller/index.js';
import { getAllUsers, getChat, sendMessage, createGroup, getAllGroups, sendGroupMessage, getGroupChat } from '../controller/chat.js';
const Router = express.Router();


Router.post('/login-user', LoginUser)
Router.post('/register-user', RegisterUser)
Router.get('/get-all-users', getAllUsers)
Router.get('/get-user-chat', getChat)
Router.post('/send-user-message', sendMessage)


Router.post('/create-group', createGroup)
Router.get('/get-user-group', getAllGroups)
Router.post('/send-group-message', sendGroupMessage)
Router.get('/get-group-chat', getGroupChat)






Router.use('*', (req, res) => {
    res.status(404).json({ error: "Page Not Found" })
})

export default Router;
