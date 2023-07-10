import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import ConversationCard from '../components/ConversationCard';
import ChatCard from '../components/ChatCard';
import { AiOutlineSend } from 'react-icons/ai';
import DummyChatCard from '../components/DummyChatCard';

export default function Chat() {
    const navigate = useNavigate();
    const chatSelected = useSelector((state: RootState) => state.Chat.chatSelected)
    const token = useSelector((state: RootState) => state.User.token)
    const userData = useSelector((state: RootState) => state.User.user)

    useEffect(() => {
        if (!token || !userData) {
            navigate('/')
        }
    }, [token, userData])


    return (
        <div className='w-full  min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='md:w-10/12 mx-2 w-full h-[600px]  flex '>

                <div className={`md:flex ${chatSelected ? "hidden" : "flex"} w-full md:w-4/12 h-full   flex-col`}>
                    <div className='w-full h-20 flex items-center justify-center bg-indigo-600 text-center'>
                        <h1 className='text-white/90 font-semibold tracking-widest'>Start Conversation</h1>
                    </div>
                    <div className={`  w-full h-full  overflow-y-auto   overflow-x-hidden py-2`}>

                        <ConversationCard />
                        <ConversationCard />
                        <ConversationCard />
                        <ConversationCard />
                        <ConversationCard />
                        <ConversationCard />
                        <ConversationCard />
                        <ConversationCard />


                    </div>
                </div>

                
                <div className={`${chatSelected ? "flex" : "hidden"} w-8/12 bg-red-500 h-full border md:flex hidden flex-col`}>

                    
                    {
                        chatSelected ? <ChatCard /> : <DummyChatCard />
                    }
                    



                   

                </div>

            </div>
        </div>
    )
}



