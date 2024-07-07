import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './Components/Loading'
import './App.scss'
import ProtectedRoutes from './Middleware/Protected.route'

const Home = lazy(() => import('./Pages/Home'))
const Login = lazy(() => import('./Pages/Login'))
const Signup = lazy(() => import('./Pages/Signup'))

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <Loading color={"rgba(1, 18, 34, 1)"} size={42} height={true} />
        }
      >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
