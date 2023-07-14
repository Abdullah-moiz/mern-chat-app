import React, { useRef, useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setChatSelected, setGroupMessages, setMessages, setTyperID, setTyping } from '../slices/chatSlice';
import { socket } from '../App';
import { toast } from 'react-toastify';
import { RootState } from '../store/store';
import { send_group_message } from '../services';
import { createSelector } from '@reduxjs/toolkit';
import { groupMessges, receiverSelected } from '../types';






export default function GroupChatCard() {
    const dispatch = useDispatch()
    const [typing, setIsTyping] = useState(false);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const [sendMessage, setSendMessage] = React.useState('')
    const user = useSelector((state: RootState) => state.User.user)
    const receiver = useSelector((state: RootState) => state.Chat.groupSelected)
    const getGroupMessages = createSelector(
        (state: RootState) => state.Chat.groupMessages,
        (_: unknown, receiver: receiverSelected | null) => receiver?._id ?? '',
        (groupMessages: Record<string, groupMessges>, groupId: string) => {
            if (groupId && groupMessages[groupId]) {
                const messages = groupMessages[groupId].messages;
                return Array.isArray(messages) ? messages : [];
            }
            return [];
        }
    );

    const messages = useSelector((state: RootState) => getGroupMessages(state, receiver));
    const uniqueID = `${receiver?.users?.map(user => user?._id).join('-')}-${receiver?.createdBy?._id}`;



    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        if (!sendMessage || !user || !receiver) return toast.error('Please type something');
        const messageData = { message: sendMessage, senderId: user?._id, groupID: receiver?._id, receiverId: uniqueID }

        socket.emit('sendMsg', messageData);

        dispatch(setGroupMessages({ groupId: receiver?._id, messages: [messageData] }));

        const res = await send_group_message(messageData);
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
            if (data.groupID === receiver?._id) {
                const { groupId, messages } = data;
                const existingMessages = messages?.filter((message :any , state:RootState) =>
                    !state.Chat.groupMessages[groupId]?.messages.some((existingMessage) =>
                        existingMessage._id === message._id
                    )
                );
                if (existingMessages?.length > 0) {
                    dispatch(setGroupMessages({ groupId, messages: existingMessages }));
                }
            }
        });

        return () => {
            socket.off('sendMsg');
        };
    }, [receiver]);





    useEffect(() => {
        const handleUserIsTyping = () => {
            if (sendMessage !== '') {
                socket.emit('userIsTyping', { senderId: receiver?._id });
            } else {
                socket.emit('userStopTyping', { senderId: receiver?._id });
            }
        };

        const timeoutId = setTimeout(handleUserIsTyping, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [sendMessage]);


    useEffect(() => {
        const handleTyping = (data: any) => {
            const { senderId } = data;
            if (senderId === receiver?._id) {
                dispatch(setTyping(true))
                dispatch(setTyperID({ senderId }))
            }
        };

        socket.on('userIsTyping', handleTyping);

        return () => {
            socket.off('userIsTyping', handleTyping);
        };
    }, []);


    useEffect(() => {
        const handleUserStopTyping = () => {
            setIsTyping(false);
        };

        socket.on('userStopTyping', handleUserStopTyping);

        return () => {
            socket.off('userStopTyping', handleUserStopTyping);
        };
    }, []);









    return (
        <>
            <div className='w-full h-20 flex  items-center justify-between bg-slate-600 text-center'>
                <div className='flex '>

                    <div className="avatar mx-4 placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            <span className="text-xs">{receiver?.name.substring(0, 2)}</span>
                        </div>
                    </div>
                    <div className='flex flex-col   text-left py-2 '>
                        <h1 className='text-white/90 font-semibold tracking-widest text-sm uppercase'>{receiver?.name}</h1>
                        {
                            typing && <p className='text-xs text-white tracking-widest font-semibold'>Someone Typing...</p>
                        }
                    </div>
                </div>

                <button onClick={() => dispatch(setChatSelected(false))} className='text-white mx-4'><RxCross2 className="text-2xl" /></button>

            </div>



            <div ref={messageContainerRef} className='w-full bg-slate-600 h-full px-4 py-2 overflow-y-auto'>

                {
                    messages?.map((message: any, i: any) => {
                        const isSender = message?.receiver === user?._id;
                        const avatarText = isSender ? "Y" : "O";
                        const chatClass = isSender ? "chat-start" : "chat-end";
                        return (
                            <div key={i} className={`chat  ${chatClass}`}>
                                <div className="avatar chat-image mx-4 placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                        <span className="text-xs">{avatarText}</span>
                                    </div>
                                </div>
                                <div className="chat-bubble">{message.message}</div>
                            </div>
                        )
                    })
                }



            </div>

            <form onSubmit={handleSendMessage} className='h-20 bg-slate-600 flex items-center justify-start px-4'>
                <input value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} type="text" placeholder="Type here" className="input bg-slate-600 text-white input-bordered w-full max-w-full" />
                <button type='submit' className='btn btn-circle btn-primary mx-3'><AiOutlineSend className="text-xl" /></button>
            </form>

        </>
    )
}
