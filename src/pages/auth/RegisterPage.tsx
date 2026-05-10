import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { AuthAPI } from '@/features/auth/api'
import { Button } from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { Eye, EyeClosed } from 'lucide-react'

export default function Register() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [username, setUsername] = useState('fucking user')
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('StrongPass123')
  const [confirmPassword, setConfirmPassword] = useState('StrongPass123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords didn't match")
      return
    }

    setError(null)
    setLoading(true)

    AuthAPI.register(email, username, password)
      .then(() => {
        const redirect = params.get('redirect') || '/'

        navigate(redirect, { replace: true })
      })
      .catch((err) => {
        if (err.status === 409) {
          setError('Email is already used')
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
      <h1 className="text-2xl font-semibold text-gray-800 text-center">{t('register.title')}</h1>
      <p className="text-sm text-gray-500 text-center mt-2">{t('register.subtitle')}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('register.placeholers.email')}
          />
        </div>

        <div>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('register.placeholers.username')}
          />
        </div>

        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('register.placeholers.password')}
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

        <div className='relative'>
          <input
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('register.placeholers.passwordRepeat')}
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

        <Button className="w-full font-semibold">
          {loading ? t('register.actions.loading') : t('register.actions.register')}
        </Button>
      </form>

      {error && <div className="mt-4 text-sm text-red-600 text-center">{error}</div>}

      <div className="text-center mt-4">
        <Link
          to={`/auth/login?redirect=${params.get('redirect') || '/'}`}
          className="text-emerald-600"
        >
          {t('register.actions.haveAccount')}
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SolarHub
      </div>
    </div>
  )
}
