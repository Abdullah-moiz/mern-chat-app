import React, { useRef, useEffect } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setChatSelected, setMessages } from '../slices/chatSlice';
import { socket } from '../App';
import { toast } from 'react-toastify';
import { RootState } from '../store/store';
import { send_message } from '../services';




export default function ChatCard() {
    const dispatch = useDispatch()
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [sendMessage, setSendMessage] = React.useState('')
    const user = useSelector((state: RootState) => state.User.user)
    const receiver = useSelector((state: RootState) => state.Chat.receiverSelected)
    const messages = useSelector((state: RootState) => state.Chat.messages)

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        if (!sendMessage || !user || !receiver) return toast.error('Please type something');
        const messageData = { message: sendMessage, senderId: user?._id, receiverId: receiver?._id }

        socket.emit('sendMsg', messageData);


        const res = await send_message(messageData);
        if (res?.success) {
            toast.success(res?.message)
        } else {
            toast.error(res?.message)
        }
        setSendMessage("")
    }



    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages])


    useEffect(() => {
        socket.on('sendMsg', (data) => {
            dispatch(setMessages(data));
        });

        return () => {
            socket.off('sendMsg');
        };
    }, [])


    return (
        <>
            <div className='w-full h-20 flex items-center justify-between bg-indigo-600 text-center'>
                <div className='flex '>

                    <div className="avatar mx-4 placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            <span className="text-xs">AA</span>
                        </div>
                    </div>

                    <h1 className='text-white/90 font-semibold tracking-widest '>{receiver?.name}</h1>
                </div>

                <button onClick={() => dispatch(setChatSelected(false))} className='btn btn-circle mx-4'><RxCross2 className="text-2xl" /></button>

            </div>



            <div ref={messageContainerRef} className='w-full h-full px-4 py-2 overflow-y-auto'>

                {
                    messages.map((message, i) => {
                        return (
                            <div key={i} className={`chat ${message.sender === user?._id ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <span>{message.sender === user?._id ? "You" : "Other"}</span>
                                    </div>
                                </div>
                                <div className="chat-bubble">{message.message}</div>
                            </div>
                        )
                    })
                }



            </div>

            <form onSubmit={handleSendMessage} className='h-20 flex items-center justify-start px-4'>
                <input value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-full" />
                <button type='submit' className='btn btn-circle btn-primary mx-3'><AiOutlineSend className="text-xl" /></button>
            </form>
        </>
    )
}
