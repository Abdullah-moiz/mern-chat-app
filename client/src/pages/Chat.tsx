import React , {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'

export default function Chat() {
    const navigate  = useNavigate();
    const token =  useSelector((state : RootState) => state.User.token)
    const userData =  useSelector((state : RootState) => state.User.user)

    useEffect(() => {
        if(!token || !userData){
            navigate('/')
        }
    }, [token , userData])
    

  return (
    <div>Chat</div>
  )
}
