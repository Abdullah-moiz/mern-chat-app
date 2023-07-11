import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId


const ChatSchema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        required: [true, "Please provide a sender"],
    },
    receiver: {
        type: ObjectId,
        required: [true, "Please provide a receiver"],
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    typing : {
        type : Boolean,
        default : false
    },
    read : {
        type : Boolean,
        default : false
    },
    
    
},{timestamps : true});

const Chat = mongoose.models.chats ||  mongoose.model("chats", ChatSchema);

export default Chat;