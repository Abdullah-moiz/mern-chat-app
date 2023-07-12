
import {FaWhatsapp} from 'react-icons/fa'

export default function DummyChatCard() {
  return (
    <div className='w-full h-full hidden  text-white lg:flex items-center justify-center bg-slate-600 flex-col'>
        <FaWhatsapp className="text-4xl mb-4" />
        <h1 className='text-xl font-semibold tracking-wider'>Web Chat Application</h1>
        <p className='text-xs  my-1'>Explore, chat, connect, and conquer conversations!</p>
        

    </div>
  )
}
