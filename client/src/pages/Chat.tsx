import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import ConversationCard from '../components/ConversationCard';
import ChatCard from '../components/ChatCard';
import DummyChatCard from '../components/DummyChatCard';
import { setAllUserData, setMessages } from '../slices/chatSlice';
import { getChatData, get_all_users } from '../services';
import { FaUserGroup } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';




export default function Chat() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const chatSelected = useSelector((state: RootState) => state.Chat.chatSelected)
    const token = useSelector((state: RootState) => state.User.token)
    const userData = useSelector((state: RootState) => state.User.user)
    const receiver = useSelector((state: RootState) => state.Chat.receiverSelected)
    const allUsers = useSelector((state: RootState) => state.Chat.allUsers)

    useEffect(() => {
        if (!token || !userData) {
            navigate('/')
        }
    }, [token, userData])


    const getDataOfAllUsers = async () => {
        const res = await get_all_users(userData?._id);
        if (res?.success) {
            dispatch(setAllUserData(res?.data))
        } else {
            toast.error(res?.message)
        }
    }

    useEffect(() => {
        getDataOfAllUsers()
    }, [])

    useEffect(() => {
        getChat()
    },[chatSelected , receiver])


    const getChat = async () => {

        const getMessages = { senderId: userData?._id, receiverId: receiver?._id } as unknown as string
        const res = await getChatData(getMessages);
        if (res?.success) {
            dispatch(setMessages(res?.data))
        } 

    }




    return (
        <div className='w-full  min-h-screen bg-gray-100 flex items-center justify-center'>

            <div className='lg:w-10/12 mx-2 w-full h-[600px]  flex '>

                <div className={`lg:flex ${chatSelected ? "hidden" : "flex"} w-full lg:w-4/12 h-full border bg-gray-300  flex-col`}>
                    <div className='w-full h-[4.4rem] flex items-center justify-center bg-indigo-600 text-center'>
                        <button className='text-white/90 btn btn-primary font-semibold tracking-widest flex items-center justify-center'>Create Group <FaUserGroup className=" ml-2 text-2xl" /></button>
                    </div>
                    <div className={`  w-full h-full  overflow-y-auto   overflow-x-hidden py-2`}>

                        {
                            allUsers?.map((user, index) => {

                                return <ConversationCard key={user?._id+index} _id={user._id} name={user.name} email={user.email} phone={user.phone} />
                            })
                        }



                    </div>
                    <button className='btn-'></button>
                </div>


                <div className={`${chatSelected ? "flex w-full" : "hidden"} w-8/12  h-full  lg:flex  flex-col`}>


                    {
                        chatSelected ? <ChatCard /> : <DummyChatCard />
                    }






                </div>

            </div>
            <ToastContainer />
        </div>
    )
}



