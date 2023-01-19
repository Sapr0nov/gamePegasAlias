import { UseFormRegisterReturn } from 'react-hook-form'
import './field.scss'

export interface IField {
  register?: UseFormRegisterReturn<string>
  type?: string
  placeholder?: string
  value?: string
  onInput?: (param: string) => void
}

export function Field(props: IField) {
  return (
    <input
      {...props.register}
      type={props.type}
      className={'field'}
      value={props.value}
      placeholder={props.placeholder}
      onInput={e => {
        const target = e.target as HTMLInputElement
        props.onInput ? props.onInput(target.value) : ''
      }}
    />
  )
}
