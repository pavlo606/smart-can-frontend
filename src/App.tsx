import './App.css'
import { router } from './routes/AppRouter'
import { AuthProvider } from './context/auth/AuthProvider'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </div>
  )
}

export default App
