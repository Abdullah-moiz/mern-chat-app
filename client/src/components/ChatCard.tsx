import React from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { setChatSelected } from '../slices/chatSlice';

export default function ChatCard() {
    const dispatch = useDispatch()


    return (
        <>
            <div className='w-full h-20 flex items-center justify-between bg-indigo-600 text-center'>
                <div className='flex '>

                <div className="avatar mx-4 placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <span className="text-xs">AA</span>
                    </div>
                </div>

                <h1 className='text-white/90 font-semibold tracking-widest '>Abdullah moiz</h1>
                </div>

                <button onClick={() => dispatch(setChatSelected(false))} className='btn btn-circle mx-4'><RxCross2 className="text-2xl" /></button>

            </div>



            <div className='w-full h-full px-4 py-2 overflow-y-auto'>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">It was you who would bring balance to the Force</div>
                </div>
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" />
                        </div>
                    </div>
                    <div className="chat-bubble">Not leave it in Darkness</div>
                </div>

            </div>

            <div className='h-20 flex items-center justify-start px-4'>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-full" />
                <button className='btn btn-circle btn-primary mx-3'><AiOutlineSend className="text-xl" /></button>
            </div>
        </>
    )
}
