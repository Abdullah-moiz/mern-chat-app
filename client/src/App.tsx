import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'

function App() {


  return (
    <Routes>
      <Route element={<Login />} path="/"  />
      <Route element={<Chat />} path="/chat"  />
      <Route element={<Register />} path="/register-account"  />

    </Routes>
  )
}

export default App
