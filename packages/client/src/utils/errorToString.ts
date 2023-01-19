import { FieldError } from 'react-hook-form'

export type ErrorMessage = FieldError | undefined

export const errorToString = (value: ErrorMessage): string => {
  if (!value) {
    return ''
  }
  return value.message || 'Ошибка'
}
