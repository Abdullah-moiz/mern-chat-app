import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {


  return (
    <Routes>
      <Route element={<Login />} path="/"  />
      <Route element={<Register />} path="/register-account"  />
    </Routes>
  )
}

export default App
