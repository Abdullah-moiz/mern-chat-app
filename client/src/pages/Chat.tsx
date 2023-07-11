import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import ConversationCard from '../components/ConversationCard';
import ChatCard from '../components/ChatCard';
import DummyChatCard from '../components/DummyChatCard';
import { setAllUserData, setMessages } from '../slices/chatSlice';
import { getChatData, get_all_users } from '../services';
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
        } else {
            toast.error(res?.message)
        }

    }




    return (
        <div className='w-full  min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='md:w-10/12 mx-2 w-full h-[600px]  flex '>

                <div className={`md:flex ${chatSelected ? "hidden" : "flex"} w-full md:w-4/12 h-full   flex-col`}>
                    <div className='w-full h-[4.4rem] flex items-center justify-center bg-indigo-600 text-center'>
                        <h1 className='text-white/90 font-semibold tracking-widest'>Start Conversation</h1>
                    </div>
                    <div className={`  w-full h-full  overflow-y-auto   overflow-x-hidden py-2`}>

                        {
                            allUsers?.map((user, index) => {

                                return <ConversationCard key={user?._id+index} _id={user._id} name={user.name} email={user.email} phone={user.phone} />
                            })
                        }



                    </div>
                </div>


                <div className={`${chatSelected ? "flex w-full" : "hidden"} w-8/12  h-full  md:flex  flex-col`}>


                    {
                        chatSelected ? <ChatCard /> : <DummyChatCard />
                    }






                </div>

            </div>
            <ToastContainer />
        </div>
    )
}



