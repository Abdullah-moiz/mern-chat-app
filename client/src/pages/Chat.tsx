import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import ConversationCard from '../components/ConversationCard';
import ChatCard from '../components/ChatCard';
import DummyChatCard from '../components/DummyChatCard';
import { socket } from '../App';
import { setAllUserData } from '../slices/chatSlice';




export default function Chat() {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const chatSelected = useSelector((state: RootState) => state.Chat.chatSelected)
    const token = useSelector((state: RootState) => state.User.token)
    const userData = useSelector((state: RootState) => state.User.user)
    const allUsers = useSelector((state: RootState) => state.Chat.allUsers)

    useEffect(() => {
        if (!token || !userData) {
            navigate('/')
        }
    }, [token, userData])
    

    useEffect(() => {
        if(userData) socket.emit('getAllUsers', userData?._id)
        socket.on('getAllUsers', (data) => {
            console.log(data)
            dispatch(setAllUserData(data))
        })
        return () => {
            socket.off('getAllUsers')
        }
    },[])

   

    return (
        <div className='w-full  min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='md:w-10/12 mx-2 w-full h-[600px]  flex '>

                <div className={`md:flex ${chatSelected ? "hidden" : "flex"} w-full md:w-4/12 h-full   flex-col`}>
                    <div className='w-full h-[4.4rem] flex items-center justify-center bg-indigo-600 text-center'>
                        <h1 className='text-white/90 font-semibold tracking-widest'>Start Conversation</h1>
                    </div>
                    <div className={`  w-full h-full  overflow-y-auto   overflow-x-hidden py-2`}>

                        {
                            allUsers?.map((user) => {
                                
                                return <ConversationCard key={user._id } _id={user._id} name={user.name} email={user.email} phone={user.phone}  />
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
        </div>
    )
}



