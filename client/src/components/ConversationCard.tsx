import { useDispatch, useSelector } from 'react-redux'
import { setChatSelected, setReceiverSelected } from '../slices/chatSlice'
import { userData } from '../types'
import React from 'react';



export interface ConversationCardProps {
    user: userData;
}

export default function ConversationCard({ user }: ConversationCardProps, onlineUsers: any) {
    const dispatch = useDispatch()
    const typingOn = useSelector((state: any) => state.Chat.typing)
    const TyperID = useSelector((state: any) => state.Chat.typerID)
    const [typing, setTyping] = React.useState(false)
    const handleClick = () => {
        dispatch(setChatSelected('basic'))
        dispatch(setReceiverSelected(user))
    }
    const isUserOnline = onlineUsers[user._id];


    console.log(isUserOnline)

    React.useEffect(() => {
        (TyperID?.senderId === user._id && TyperID?.receiverId !== user?._id && typingOn) ? setTyping(true) : setTyping(false);
    }, [TyperID, typingOn])



    return (
        <div onClick={handleClick} className='w-11/12 relative h-20 bg-slate-800 my-2 flex items-center cursor-pointer rounded-2xl px-4 mx-4 hover:bg-slate-700 text-white justify-start  transition-all duration-700'>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">{user.name.substring(0, 2)}</span>
                </div>
            </div>

            <h1 className='font-semibold tracking-widest '>{user.name}</h1>
            {
                typing && <p className='text-xs absolute bottom-2 left-20 text-white tracking-widest font-semibold'>Typing...</p>
            }
        </div>
    )
}
