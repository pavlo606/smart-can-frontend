import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/cn'

type LangButtonVariant = 'dark' | 'light'

interface LangChangeButtonProps {
  className?: string
  variant?: LangButtonVariant
  isVertical?: boolean
}

const LangChangeButton = ({
  className,
  variant = 'dark',
  isVertical = false,
}: LangChangeButtonProps) => {
  const { i18n } = useTranslation()
  const currentLang = i18n.resolvedLanguage

  const changeLang = (lang: 'en' | 'uk') => {
    if (lang !== currentLang) {
      i18n.changeLanguage(lang)
    }
  }

  const isDark = variant === 'dark'

  return (
    <div className="inline-flex max-w-full overflow-hidden">
      <div
        className={cn(
          'inline-flex items-center gap-0.5 rounded-[12.25px] p-0.5 border',
          isDark ? 'border-white/20 bg-white/5' : 'border-gray-300 bg-white',
          isVertical ? 'flex-col' : 'flex-row',
          className
        )}
      >
        <button
          onClick={() => changeLang('en')}
          className={cn(
            'px-2 py-0.5 text-[11px] rounded-full transition',
            currentLang === 'en'
              ? isDark
                ? 'bg-white text-black'
                : 'bg-gray-900/80 text-white'
              : isDark
                ? 'text-white/70 hover:bg-white/10 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-black'
          )}
        >
          EN
        </button>

        <button
          onClick={() => changeLang('uk')}
          className={cn(
            'px-2 py-0.5 text-[11px] rounded-full transition',
            currentLang === 'uk'
              ? isDark
                ? 'bg-white text-black'
                : 'bg-gray-900/80 text-white'
              : isDark
                ? 'text-white/70 hover:bg-white/10 hover:text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-black'
          )}
        >
          UA
        </button>
      </div>
    </div>
  )
}

export default LangChangeButton
