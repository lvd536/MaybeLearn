import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Auth/SignUp.tsx'
import SignIn from './pages/Auth/SignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App/>}/>
        <Route path={'/register'} element={<SignUp/>}/>
        <Route path={'/login'} element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
