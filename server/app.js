import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import OurRouter from './routes/Route.js'
import cors from "cors";
import dotenv from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";


dotenv.config();
const app = express();
const port = 8000;
const connectionUrl = process.env.ConnectionUrl;

const httpServer = createServer(app);




export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});







app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }));


mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Getting Error from DB connection" + err.message))



io.on("connection", (socket) => {

  

    socket.on('sendMsg', async (payload) => {
        io.emit('sendMsg', payload);
    });

    socket.on('userIsTyping', async (payload) => {
        const { senderId, receiverId } = payload;
        io.emit('userIsTyping', { senderId, receiverId });
    })

    socket.on('userStopTyping', async (payload) => {
        const { senderId, receiverId } = payload;
        io.emit('userStopTyping', { senderId, receiverId });
    })
});

app.use('/api/', OurRouter)







httpServer.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
})