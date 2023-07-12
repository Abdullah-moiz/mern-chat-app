import { useDispatch } from 'react-redux'
import { setChatSelected, setReceiverSelected } from '../slices/chatSlice'
import { userData } from '../types'


export interface ConversationCardProps {
    user: userData;
}

export default function ConversationCard({ user }: ConversationCardProps) {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setChatSelected('basic'))
        dispatch(setReceiverSelected(user))
    }


    return (
        <div onClick={handleClick} className='w-11/12  h-20 bg-slate-800 my-2 flex items-center cursor-pointer rounded-2xl px-4 mx-4 hover:bg-slate-700 text-white justify-start  transition-all duration-700'>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">{user.name.substring(0, 2)}</span>
                </div>
            </div>

            <h1 className='font-semibold tracking-widest '>{user.name}</h1>
        </div>
    )
}
