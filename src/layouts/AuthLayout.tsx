import LangChangeButton from '@/components/ui/LangChangeButton'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
      <main className='min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden flex-col'>
        <Outlet />
        <LangChangeButton variant="light" className="mt-4" />
      </main>
    </div>
  )
}

export default AuthLayout