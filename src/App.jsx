import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/Signup'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {

  return (
      <>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </>
  )
}

export default App
