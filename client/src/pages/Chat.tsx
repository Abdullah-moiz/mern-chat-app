import React, { useEffect, useState, useRef, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import ConversationCard from '../components/ConversationCard';
import ChatCard from '../components/ChatCard';
import DummyChatCard from '../components/DummyChatCard';
import GroupConversationCard from '../components/GroupConversationCard';
import { setAllGroups, setAllUserData, setGroupMessages, setMessages, setTyperID, setTyping, setUserMessageLoading } from '../slices/chatSlice';
import { create_group, getChatData, getGroupChatData, get_all_users, get_user_group } from '../services';
import { BiSearch } from 'react-icons/bi'
import { FaUserGroup } from 'react-icons/fa6'
import { toast, ToastContainer } from 'react-toastify';
import { MdGroupAdd } from 'react-icons/md'
import { PiChatsFill } from 'react-icons/pi'
import Select from "react-select";
import GroupChatCard from '../components/GroupChatCard';
import Loading from '../components/Loading';
import { socket } from '../App';


export default function Chat() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [showConversationBox, setShowConversationBox] = useState('basic')
    const [searchTerm, setSearchTerm] = useState('');
    const [showName, setShowName] = useState(false)
    const chatSelected = useSelector((state: RootState) => state.Chat.chatSelected)
    const token = useSelector((state: RootState) => state.User.token)
    const userData = useSelector((state: RootState) => state.User.user)
    const receiver = useSelector((state: RootState) => state.Chat.receiverSelected)
    const group = useSelector((state: RootState) => state.Chat.groupSelected);
    const allUsers = useSelector((state: RootState) => state.Chat.allUsers)
    const [createGroup, setCreateGroup] = useState(false)
    const [groupName, setGroupName] = useState('')
    const someoneTyping = useSelector((state: RootState) => state.Chat.someOneTyping);
    const [selectedGroupUsers, setSelectedGroupUsers] = useState<string[]>([]);
    const allGroups = useSelector((state: RootState) => state.Chat.allGroups)
    const loading = useSelector((state: RootState) => state.Chat.userMessageLoading)
    const uniqueID = `${group?.users?.map(user => user?._id).join('-')}-${group?.createdBy?._id}`;
    const typingOn = useSelector((state: RootState) => state.Chat.typing)

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

    const getDataOfAllGroupsOFThisUser = async () => {
        const res = await get_user_group(userData?._id);
        if (res?.success) {
            dispatch(setAllGroups(res?.data))
        } else {
            toast.error(res?.message)
        }

    }







    useEffect(() => {
        getDataOfAllUsers()
        getDataOfAllGroupsOFThisUser()
    }, [showConversationBox])

    useEffect(() => {
        if (receiver) {
            getChat();
        } else if (group) {
            getGroupChat();
        } else {
            return
        }

    }, [receiver, group])


    const getChat = async () => {
        dispatch(setUserMessageLoading(true))
        if (!userData || !receiver) return dispatch(setUserMessageLoading(false));
        const getMessages = { senderId: userData?._id, receiverId: receiver?._id } as unknown as string
        const res = await getChatData(getMessages);
        if (res?.success) {
            dispatch(setUserMessageLoading(false))
            dispatch(setMessages(res?.data))
        } else {
            dispatch(setUserMessageLoading(false))
        }

    }

    // const getGroupChat = async () => {
    //     dispatch(setUserMessageLoading(true))
    //     const uniqueID = `${group?.users?.map(user => user?._id).join('-')}-${group?.createdBy?._id}`;
    //     if (!uniqueID) return dispatch(setUserMessageLoading(false));
    //     const getMessages = { senderId: userData?._id, receiverId: uniqueID } as unknown as string
    //     const res = await getGroupChatData(getMessages);
    //     console.log(res)
    //     if (res?.success) {
    //         dispatch(setMessages(res?.data))
    //         dispatch(setUserMessageLoading(false))
    //     } else {
    //         dispatch(setUserMessageLoading(false))
    //     }

    // }

    const getGroupChat = async () => {
        dispatch(setUserMessageLoading(true));
        const uniqueID = `${group?.users?.map(user => user?._id).join('-')}-${group?.createdBy?._id}`;
        if (!uniqueID) return dispatch(setUserMessageLoading(false));

        if (group) {
            dispatch(setGroupMessages({ groupId: group?._id, messages: [] }));
        }

        const getMessages = { senderId: userData?._id, receiverId: uniqueID } as unknown as string;
        const res = await getGroupChatData(getMessages);
        if (res?.success) {
            dispatch(setGroupMessages({ groupId: group?._id, messages: res?.data }));
            dispatch(setUserMessageLoading(false));
        } else {
            dispatch(setUserMessageLoading(false));
        }
    };


    const useOutsideClick = (callback: () => void) => {
        const ref = useRef<HTMLDivElement>(null);

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
        setCreateGroup(false)
    };

    const showNameRef = useOutsideClick(handleClickOutside);


    const throttle = <T extends any[]>(func: (...args: T) => void, delay: number) => {
        let timeoutId: ReturnType<typeof setTimeout>;

        return function (this: any, ...args: T) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const throttledFilter = throttle<string[]>(filterItems, 500);

    function filterItems(searchTerm: string) {
        if (showConversationBox === 'basic') {
            return allUsers?.filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
            return allGroups?.filter((group) =>
                group.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    }

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        throttledFilter(e.target.value);
    };



    const selectUsers = allUsers.map((user) => ({ value: user._id, label: user.name }))



    const handleCreateGroup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(setUserMessageLoading(true))
        if (groupName === '' || selectedGroupUsers.length === 0) {
            dispatch(setUserMessageLoading(false))
            toast.error('Please fill all the fields')
            return
        }

        const finalData = { name: groupName, users: selectedGroupUsers, createdBy: userData?._id }

        const res = await create_group(finalData);
        if (res?.success) {
            dispatch(setUserMessageLoading(false))
            toast.success(res?.message)
            setCreateGroup(false)
        } else {
            dispatch(setUserMessageLoading(false))
            toast.error(res?.message)
        }

    }


    useEffect(() => {
        const handleUserIsTyping = () => {
            if (someoneTyping) {
                socket.emit('userIsTyping', { senderId: userData?._id, receiverId: receiver?._id });
            } else {
                socket.emit('userStopTyping', { senderId: userData?._id, receiverId: receiver?._id });
            }
        };

        const timeoutId = setTimeout(handleUserIsTyping, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [someoneTyping]);



    useEffect(() => {
        const handleTyping = (data: any) => {
            const { senderId, receiverId } = data;
            if (senderId !== receiver?._id) {
                dispatch(setTyping(true))
                dispatch(setTyperID({ senderId, receiverId }))
            }
        };

        socket.on('userIsTyping', handleTyping);

        return () => {
            socket.off('userIsTyping', handleTyping);
        };
    }, [someoneTyping]);


    useEffect(() => {
        const handleUserStopTyping = () => {
            dispatch(setTyping(false))
        };

        socket.on('userStopTyping', handleUserStopTyping);

        return () => {
            socket.off('userStopTyping', handleUserStopTyping);
        };
    }, [someoneTyping]);






    return (
        <div className='w-full  min-h-screen bg-slate-950 flex items-center justify-center'>
            {loading && <Loading />}
            <div className='lg:w-10/12 mx-2 w-full h-[600px] shadow bg-gray-600 rounded-xl flex relative  '>

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
                    {
                        createGroup && <div ref={showNameRef} className='absolute z-50 flex-col items-center justify-center left-16 top-60 text-center w-96 flex  bg-slate-800 text-white px-3 py-4'>
                            <form onSubmit={handleCreateGroup} className='w-full h-full flex flex-col items-center justify-center'>
                                <div className='flex flex-col text-start px-2 w-full mb-2'>
                                    <label htmlFor="name" className='mb-2'>Group Name</label>
                                    <input onChange={(e) => setGroupName(e.target.value)} required type="text" id='name' placeholder="Group Name here" className="bg-transparent outline-none border rounded-xl px-3 border-slate-600 py-2 text-white w-full" />
                                </div>
                                <Select
                                    onChange={(e) => setSelectedGroupUsers(e.map((user: any) => user.value))}
                                    defaultValue={[]}
                                    isMulti
                                    name="colors"
                                    options={selectUsers}
                                    className=" w-full bg-slate-900 text-white mb-2"
                                    classNamePrefix="Select members"
                                />
                                <button type='submit' className='btn btn-wide btn-primary'>Create Group</button>
                            </form>


                        </div>
                    }

                    <PiChatsFill onClick={() => setShowConversationBox('basic')} data-tip="Groups" className="cursor-pointer my-3 text-xl tooltip tooltip-open tooltip-top" />
                    <FaUserGroup onClick={() => setShowConversationBox('group')} data-tip="Groups" className="cursor-pointer my-3 text-xl tooltip tooltip-open tooltip-top" />
                    <MdGroupAdd onClick={() => setCreateGroup(true)} data-tip="Create Group" className="cursor-pointer my-3 text-xl tooltip tooltip-open tooltip-top" />


                </div>

                <div className={`lg:flex ${chatSelected ? "hidden" : "flex"} w-full py-2 lg:w-4/12 h-full   flex-col`}>
                    <div className='w-full h-[4.4rem] flex items-center justify-center  bg-slate-600 text-center'>
                        <div className='w-4/5 rounded-xl flex items-center justify-center bg-slate-800'>
                            < BiSearch className=" text-xl text-white mx-4" />
                            <input onChange={handleSearchInputChange} type="text" placeholder="Search..." className=" px-2 py-3 outline-none bg-transparent border-0 bg-slate-600 text-white  w-full max-w-full " ></input>
                        </div>

                    </div>
                    <div className={`  w-full h-full bg-slate-600  overflow-y-auto   overflow-x-hidden py-2`}>

                        {
                            showConversationBox === 'basic' ?
                                <>
                                    {filterItems(searchTerm)?.map((user, index) => (
                                        <ConversationCard key={user?._id + index} user={user} />
                                    ))}
                                </>
                                :
                                <>
                                    {
                                        filterItems(searchTerm)?.map((group, index) => (
                                            <GroupConversationCard key={group?._id + index} group={group} />
                                        )
                                        )
                                    }

                                </>

                        }

                    </div>

                </div>


                <div className={`${chatSelected ? "flex w-full" : "hidden"} w-8/12 rounded-xl h-full  lg:flex  flex-col`}>

                    {chatSelected === 'basic' ? (
                        <ChatCard />
                    ) : chatSelected === 'group' ? (
                        <GroupChatCard />
                    ) : (
                        <DummyChatCard />
                    )}

                </div>

            </div>
            <ToastContainer />
            <p className='fixed bottom-2 lg:bottom-5 text-center text-white'>Created By Abdullah Moiz</p>
        </div>
    )
}



