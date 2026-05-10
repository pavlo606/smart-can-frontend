import { Outlet, useLoaderData } from 'react-router'
// import { useAuth } from '@/context/AuthContext'
// import type { User } from '@/features/users/types'
import { useEffect, useState } from 'react'
import { AuthAPI } from '@/features/auth/api'
// import ScrollToTop from '@/utils/ScrollToTop'
// import SideBar from '../components/Sidebar'

const SIDEBAR_EXPANDED = 256
const SIDEBAR_COLLAPSED = 72

const MainLayout = () => {
  // const loaderData = useLoaderData() as { user: User }
  // const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed'>(
  //   localStorage.getItem('sidebarState') === 'expanded' ? 'expanded' : 'collapsed'
  // )

  // if (loaderData) {
  //   const { user: loadedUser } = loaderData
  //   const { setUser } = useAuth()

  //   useEffect(() => {
  //     setUser(loadedUser)
  //   }, [loadedUser])
  // }

  // const handleSideBarToggle = () => {
  //   const newState = sidebarState === 'expanded' ? 'collapsed' : 'expanded'
  //   setSidebarState(newState)
  //   localStorage.setItem('sidebarState', newState)
  // }

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-primary">
      {/* <ScrollToTop /> */}
      <div
        className="flex"
        // style={
        //   {
        //     '--sidebar-width':
        //       sidebarState === 'expanded' ? `${SIDEBAR_EXPANDED}px` : `${SIDEBAR_COLLAPSED}px`,
        //   } as React.CSSProperties
        // }
      >
        {/* <SideBar
          collapsed={sidebarState}
          onToggle={handleSideBarToggle}
        /> */}
        <button onClick={() => AuthAPI.logout()}>Logout</button>
        <main className="p-4 grow ml-(--sidebar-width)">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
