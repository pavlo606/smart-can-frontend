import { NavLink, useLocation, useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/auth/useAuth'
import { useTranslation } from 'react-i18next'
import LangChangeButton from './ui/LangChangeButton'
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserCog,
  Car,
} from 'lucide-react'

interface SidebarParams {
  collapsed?: 'expanded' | 'collapsed'
  onToggle?: () => void
}

const Sidebar = ({ onToggle, collapsed }: SidebarParams) => {
  const { t } = useTranslation(['sidebar', 'common'])
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: <LayoutDashboard size={16} />, label: t('pages.dashboard'), to: '/' },
    { icon: <Car size={16} />, label: t('pages.cars'), to: '/cars' },
    { icon: <UserCog size={16} />, label: t('pages.profile'), to: '/profile' },
  ]

  const handleLogout = async () => {
    await logout()
    navigate(`/auth/login?redirect=${location.pathname}`)
  }

  return (
    <aside className="flex h-screen w-(--sidebar-width) flex-col bg-gray-900 text-gray-200 fixed left-0">
      <div className={cn("flex pt-6", collapsed === 'expanded' ? "pl-4" : "justify-center")}>
        <button className="hover:text-gray-400" onClick={onToggle}>
          <Menu />
        </button>
      </div>

      <div className="border-b border-gray-800 px-6 py-4">
        {collapsed === 'expanded' && (
          <>
            <div className="text-lg font-semibold text-white">SmartCan</div>
            <div className="text-xs text-gray-400">{t('subName')}</div>
          </>
        )}
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems
            .map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-md px-3 py-2 text-sm transition-colors gap-5',
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                      collapsed === 'collapsed' && 'justify-center'
                    )
                  }
                >
                  {item.icon}
                  {collapsed === 'expanded' && item.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <div className="mt-auto pb-4 flex justify-center">
        <LangChangeButton isVertical={collapsed === "collapsed"} />
      </div>
      <div className="border-t border-gray-800 px-4 py-4">
        {user ? (
          <>
            {collapsed === 'expanded' && (
              <div className="mb-3">
                <div className="text-sm font-medium text-white">{user?.username}</div>
                <div className="text-xs text-gray-400">{user?.email}</div>
              </div>
            )}

            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start text-gray-300 hover:text-gray-800',
                collapsed === 'collapsed' && 'p-0 justify-center'
              )}
              onClick={handleLogout}
              Icon={LogOut}
            >
              {collapsed === 'expanded' && t('common:actions.logout')}
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            className={cn('w-full', collapsed === 'collapsed' && 'p-0 justify-center')}
            onClick={() => navigate('/auth/login')}
            Icon={LogIn}
          >
            {collapsed === 'expanded' && t('common:actions.login')}
          </Button>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
