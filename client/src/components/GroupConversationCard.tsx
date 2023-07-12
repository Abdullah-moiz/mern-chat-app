import { useDispatch } from 'react-redux'
import { groupData } from '../types';
import { setChatSelected, setGroupSelected } from '../slices/chatSlice';

export interface GroupConversationCardProps {
    group: groupData;
  }
  

export default function GroupConversationCard({ group }: GroupConversationCardProps) {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(setChatSelected('group'))
       dispatch(setGroupSelected(group))
    }

    return (
        <div onClick={handleClick} className='w-11/12  h-20 bg-slate-800 my-2 flex items-center cursor-pointer rounded-2xl px-4 mx-4 hover:bg-slate-700 text-white justify-start  transition-all duration-700'>
            <div className="avatar mx-4 placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                    <span className="text-xs">{group.name.substring(0,2)}</span>
                </div>
            </div>

            <h1 className= 'font-semibold tracking-widest '>{group.name}</h1>
        </div>
    )
}
