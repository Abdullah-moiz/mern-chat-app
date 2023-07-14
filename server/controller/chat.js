import User from "../models/User.js";
import Chat from "../models/Chat.js";
import { sendMessageSchemaValidation } from "../validations/index.js";
import GroupChat from "../models/GroupChat.js";

export const getAllUsers = async (req, res) => {
    const id = req.query.id;
    if(id === 'undefined' ||  !id) return 
    try {
        const getUsers = await User.find({ _id: { $ne: id } });
        return res.status(200).json({ data: getUsers, success: true });
    } catch (error) {
        console.log('error in server getAllUsers', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}

export const getAllGroups = async (req, res) => {
    const id = req.query.id;
    if(!id || id === 'undefined') return res.status(400).json({ success: false, message: 'id is required' })
    const query = {
        $or: [
            { createdBy: id },
            { users: id }
        ]
    };

    try {
        const getGroupofThisUser = await GroupChat.find(query).populate('users').select('-password').populate('createdBy');
        return res.status(200).json({ data: getGroupofThisUser, success: true });
    } catch (error) {
        console.log('error in server getAllGroups', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}


export const createGroup = async (req, res) => {
    const { name, users, createdBy } = req.body;


    if (!name || !users || !createdBy) return res.status(400).json({ success: false, message: 'name , users and createdBy are required' })

    try {
        const newGroup = new GroupChat({ name, users, createdBy });
        await newGroup.save();
        return res.status(200).json({ success: true, message: 'Group created successfully' })
    } catch (error) {
        console.log('error in server createGroup', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })

    }
}


export const getChat = async (req, res) => {
    const { senderId, receiverId } = req.query;
    if (!senderId || !receiverId) return res.status(400).json({ success: false, message: 'senderId and receiverId are required' })
    try {
        const getChat = await Chat.find({
            $or: [
                { $and: [{ sender: senderId }, { receiver: receiverId }] },
                { $and: [{ sender: receiverId }, { receiver: senderId }] }
            ]
        })
        return res.status(200).json({ data: getChat, success: true });
    } catch (error) {
        console.log('error in server getChat', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }

}


export const getGroupChat = async (req, res) => {
    const { senderId, receiverId } = req.query;
    console.log('senderId, receiverId', senderId, receiverId)
    if (!senderId || !receiverId) return res.status(400).json({ success: false, message: 'senderId and receiverId are required' })
    try {
        const getChat = await Chat.find({receiver: receiverId});
        return res.status(200).json({ data: getChat, success: true });
    } catch (error) {
        console.log('error in server getGroupChat', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }

}



export const sendMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    const { error } = sendMessageSchemaValidation.validate({ senderId, receiverId, message });

    if (error) return res.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const newMessage = new Chat({ sender: senderId, receiver: receiverId, message });
        await newMessage.save();
        return res.status(200).json({ success: true, message: 'Message sent successfully' })
    } catch (error) {
        console.log('error in server sendMessage', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}

export const sendGroupMessage = async (req, res) => {
    const { senderId, receiverId, message, groupID } = req.body;
    const { error } = sendMessageSchemaValidation.validate({ senderId, receiverId, message });

    if (error) return res.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const newMessage = new Chat({ sender: senderId, receiver: receiverId, message });
        await newMessage.save();

        if (newMessage) {
            const saveInGroup = await GroupChat.findOneAndUpdate({ _id: groupID }, { $push: { messages: newMessage._id } }, { new: true });
            return res.status(200).json({ success: true, message: 'Message sent successfully' })
        }


    } catch (error) {
        console.log('error in server sendMessage', error.message)
        return res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}





