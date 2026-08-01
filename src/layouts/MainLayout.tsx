import { Outlet, useLoaderData } from 'react-router'
import { useAuth } from '@/context/auth/useAuth'
import type { User } from '@/features/users/types'
import { useState } from 'react'
import ScrollToTop from '@/utils/ScrollToTop'
import SideBar from '../components/Sidebar'

const SIDEBAR_EXPANDED = 256
const SIDEBAR_COLLAPSED = 72

const MainLayout = () => {
  const loaderData = useLoaderData() as { user: User } | undefined
  const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed'>(
    localStorage.getItem('sidebarState') === 'expanded' ? 'expanded' : 'collapsed'
  )

  const { setUser } = useAuth()

  if (loaderData) {
    setUser(loaderData.user)
  }

  const handleSideBarToggle = () => {
    const newState = sidebarState === 'expanded' ? 'collapsed' : 'expanded'
    setSidebarState(newState)
    localStorage.setItem('sidebarState', newState)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-text-primary">
      <ScrollToTop />
      <div
        className="flex"
        style={
          {
            '--sidebar-width':
              sidebarState === 'expanded' ? `${SIDEBAR_EXPANDED}px` : `${SIDEBAR_COLLAPSED}px`,
          } as React.CSSProperties
        }
      >
        <SideBar
          collapsed={sidebarState}
          onToggle={handleSideBarToggle}
        />
        <main className="p-4 grow ml-(--sidebar-width)">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
