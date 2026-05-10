import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { AuthAPI } from '@/features/auth/api'
import { Button } from '@/components/ui/Button'
import { Eye, EyeClosed } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('StrongPass123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    AuthAPI.login(email, password)
      .then(() => {
        const redirect = params.get('redirect') || '/'

        navigate(redirect, { replace: true })
      })
      .catch((err) => {
        if (err.status === 401) {
          setError('Invalid credentionals')
        } else {
          setError('Something went wrong')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setError(null)
  }, [email, password])

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-4">
      <h1 className="text-2xl font-semibold text-gray-800 text-center">{t('login.title')}</h1>
      <p className="text-sm text-gray-500 text-center mt-2">{t('login.subtitle')}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('login.placeholers.email')}
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('login.placeholers.password')}
          />
          <Button
            type="button"
            variant="noBg"
            Icon={showPassword ? EyeClosed : Eye}
            size="sm"
            className="absolute inset-y-0 right-0 h-full focus:ring-0"
            onClick={() => setShowPassword((v) => !v)}
          />
        </div>

        <Button type="submit" className="w-full font-semibold">
          {loading ? t('login.actions.loading') : t('login.actions.login')}
        </Button>
      </form>

      {error && <div className="mt-4 text-sm text-red-600 text-center">{error}</div>}

      <div className="text-center mt-4">
        <Link
          to={`/auth/register?redirect=${params.get('redirect') || '/'}`}
          className="text-emerald-600"
        >
          {t('register.actions.haveAccount')}
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SmartCAN
      </div>
    </div>
  )
}
