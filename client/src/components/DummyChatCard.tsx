import React from 'react'
import { CgHello } from 'react-icons/cg'

export default function DummyChatCard() {
  return (
    <div className='w-full h-full hidden  text-white text-xl font-semibold lg:flex items-center justify-center bg-indigo-600 flex-col'>
        <CgHello className="text-4xl mb-4" />
        <h1>Select Any Conversation to start</h1>
    </div>
  )
}
