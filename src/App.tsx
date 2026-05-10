import './App.css'
import { router } from './routes/AppRouter'
import { RouterProvider } from 'react-router'
import { ToastContainer } from 'react-toastify'



function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
