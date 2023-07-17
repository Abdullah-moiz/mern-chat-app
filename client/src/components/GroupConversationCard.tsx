import { useDispatch, useSelector } from 'react-redux'
import { groupData } from '../types';
import { setChatSelected, setGroupSelected } from '../slices/chatSlice';
import React from 'react';
import { RootState } from '../store/store';

export interface GroupConversationCardProps {
    group: groupData;
}


export default function GroupConversationCard({ group }: GroupConversationCardProps) {
    const dispatch = useDispatch()
    const typingOn = useSelector((state: any) => state.Chat.typing)
    const theme = useSelector((state : RootState) => state.User.themeLight)
    const TyperID = useSelector((state: any) => state.Chat.typerID)
    const [typing , setTyping] = React.useState(false)

    const handleClick = () => {
        dispatch(setChatSelected('group'))
        dispatch(setGroupSelected(group))
    }


    React.useEffect(() => {
        if (typingOn && TyperID?.senderId === group._id   ) {
            setTyping(true)
        } else {
            setTyping(false)
        }
    }, [typingOn, TyperID])

    return (
        <div onClick={handleClick} className={`w-11/12 relative h-20  ${theme === 'on' ?  'bg-white  hover:bg-gray-300 text-black' : "bg-slate-800   hover:bg-slate-950 text-white"}  my-2 flex items-center cursor-pointer rounded-2xl px-4 mx-4 justify-start  transition-all duration-700`}>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">{group.name.substring(0, 2)}</span>
                </div>
            </div>

            <h1 className='font-semibold tracking-widest '>{group.name}</h1>
            {
                typing && <p className={`text-xs absolute bottom-2 left-20 ${theme === 'on' ? 'text-black' : 'text-white'}  tracking-widest font-semibold`}>Typing...</p>
            }
        </div>
    )
}
