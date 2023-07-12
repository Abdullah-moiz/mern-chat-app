import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import ConversationCard from '../components/ConversationCard';
import ChatCard from '../components/ChatCard';
import DummyChatCard from '../components/DummyChatCard';
import { setAllUserData, setMessages } from '../slices/chatSlice';
import { getChatData, get_all_users } from '../services';
import { BiSearch } from 'react-icons/bi'
import { FaUserGroup } from 'react-icons/fa6'
import { toast, ToastContainer } from 'react-toastify';
import { MdOutlineGroupAdd, MdGroupAdd } from 'react-icons/md'




export default function Chat() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null)
    const [showName, setShowName] = useState(false)
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
    }, [chatSelected, receiver])


    const getChat = async () => {

        const getMessages = { senderId: userData?._id, receiverId: receiver?._id } as unknown as string
        const res = await getChatData(getMessages);
        if (res?.success) {
            dispatch(setMessages(res?.data))
        }

    }


    const useOutsideClick = (callback: () => void) => {
        const ref = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            const handleClick = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback();
                }
            };

            document.addEventListener('click', handleClick, true);

            return () => {
                document.removeEventListener('click', handleClick, true);
            };
        }, [ref]);

        return ref;
    };

    const handleClickOutside = () => {
        setShowName(false);
    };
    const showNameRef = useOutsideClick(handleClickOutside);

    return (
        <div className='w-full  min-h-screen bg-slate-600 flex items-center justify-center'>
            <div className='lg:w-10/12 mx-2 w-full h-[600px]  flex relative  '>

                <div className='w-20 h-full bg-slate-800 rounded-xl flex flex-col   items-center justify-start py-4 text-white gap-4'>

                    <div onClick={() => setShowName(true)} className="avatar placeholder tooltip tooltip-open tooltip-top">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                            <span>{userData?.name.substring(0, 2)}</span>
                        </div>
                    </div>
                    {
                        showName && <div ref={showNameRef} className='absolute z-50  left-16 top-10 text-center min-w-max chat-bubble   bg-slate-900 text-white px-3 py-4'>
                            <p className='text-xl '>{userData?.name}</p>
                        </div>
                    }

                    <FaUserGroup data-tip="Groups" className="cursor-pointer my-3 text-xl tooltip tooltip-open tooltip-top" />
                    <MdGroupAdd data-tip="Create Group" className="cursor-pointer my-3 text-xl tooltip tooltip-open tooltip-top" />


                </div>

                <div className={`lg:flex ${chatSelected ? "hidden" : "flex"} w-full py-2 lg:w-4/12 h-full   flex-col`}>
                    <div className='w-full h-[4.4rem] flex items-center justify-center  bg-slate-600 text-center'>
                        <div className='w-4/5 rounded-xl flex items-center justify-center bg-slate-800'>
                            < BiSearch className=" text-xl text-white mx-4" />
                            <input type="text" placeholder="Search..." className=" px-2 py-3 outline-none bg-transparent border-0 bg-slate-600 text-white  w-full max-w-full " ></input>
                        </div>

                    </div>
                    <div className={`  w-full h-full bg-slate-600  overflow-y-auto   overflow-x-hidden py-2`}>

                        {
                            allUsers?.map((user, index) => {

                                return <ConversationCard key={user?._id + index} _id={user._id} name={user.name} email={user.email} phone={user.phone} />
                            })
                        }



                    </div>
                    <button className='btn-'></button>
                </div>


                <div className={`${chatSelected ? "flex w-full" : "hidden"} w-8/12 rounded-xl h-full  lg:flex  flex-col`}>

                    {
                        chatSelected ? <ChatCard /> : <DummyChatCard />
                    }

                </div>

            </div>
            <ToastContainer />
            <p className='fixed bottom-2 lg:bottom-5 text-center text-white'>Created By Abdullah Moiz</p>
        </div>
    )
}



