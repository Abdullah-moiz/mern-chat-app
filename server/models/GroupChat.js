import mongoose from "mongoose";


const GroupChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chats",
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },    
}, {timestamps : true});

const GroupChat = mongoose.models.groupchats ||  mongoose.model("groupchats", GroupChatSchema);

export default GroupChat;
