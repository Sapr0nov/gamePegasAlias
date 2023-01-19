import React from 'react'
import './form-field.scss'
import { Field } from '../field/field'
import { UseFormRegisterReturn } from 'react-hook-form/dist/types'

interface IFormField {
  placeholder: string
  register?: UseFormRegisterReturn<string>
  errorText?: string
  type?: string
  value?: string
  onInput?: (param: string) => void
}

export function FormField(props: IFormField) {
  return (
    <div
      className={'form-field ' + (props.errorText ? 'form-field--error' : '')}>
      <Field {...props} onInput={props.onInput} />
      <span className="form-field__info">{props.errorText}</span>
    </div>
  )
}
