import User from "../models/User.js";

export const getAllUsers = async (payload) => {
    const id =  payload;
    try {
        const getUsers = await User.find({ _id: { $ne: id } });
        return getUsers;
    } catch (error) {
        console.log(error.message)
    }
}