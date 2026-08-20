// import type { Translations } from "@/i18n/i18n.types"
// import { useTranslation } from "react-i18next"

// interface FormErrorMsgParams<T extends keyof Translations> {
interface FormErrorMsgParams {
  message?: string,
  // ns: T
  ns: any
}

export const FormErrorMsg = ({ message }: FormErrorMsgParams) => {
  // const { t } = useTranslation<T>(ns)

  if (!message) {
    return null
  }

  return (
    // <p className="text-red-600 text-sm">{t(message as any) as string}</p>
    <p className="text-red-600 text-sm">{message}</p>
  )
}
