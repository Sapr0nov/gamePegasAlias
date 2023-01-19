import React, { useRef } from 'react'

import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { FormField, Button, Avatar, BackLink } from '../components'
import { authorization, errorToString, pattern } from '../utils'

import './../scss/form/form.scss'
import { changePasswordAPI } from '../services/http/profile'
import { RootState } from '../services/store/reducer'

export const ChangePassword: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user.user)
  const { password } = pattern()

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<Record<string, string>>({
    mode: 'onBlur',
  })

  const passwordField = useRef({})
  passwordField.current = watch('newPassword', '')

  const navigate = useNavigate()

  const onSubmit = (data: Record<string, unknown>): void => {
    changePasswordAPI(data)
  }

  const onChangePasswordClick = (): void => {
    navigate('/profile')
  }

  authorization()
  return (
    <>
      <header>
        <BackLink text="Назад " />
      </header>
      <main>
        <Avatar />
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form__title">{user?.display_name ?? user?.login}</h2>

          <div className="form__fields">
            <FormField
              register={register('oldPassword', {
                required: 'Заполните поле',
              })}
              type="password"
              placeholder="Старый пароль"
              errorText={errorToString(errors?.oldPassword)}
            />

            <FormField
              register={register('newPassword', {
                required: 'Заполните поле',
                pattern: {
                  value: password,
                  message: 'Некорректно введен пароль',
                },
              })}
              type="password"
              placeholder="Новый пароль"
              errorText={errorToString(errors?.newPassword)}
            />

            <FormField
              register={register('complitePassword', {
                required: 'Заполните поле',
                validate: value =>
                  value === passwordField.current || 'Пароли не совпадают',
                pattern: {
                  value: password,
                  message: 'Некорректно введен пароль',
                },
              })}
              type="password"
              placeholder="Подтверждение пароля"
              errorText={errorToString(errors?.complitePassword)}
            />
          </div>

          <div className="form__buttons">
            <Button text="Сохранить" type="submit" />
            <Button
              classes="button--light"
              type="button"
              text="Изменить пароль"
              events={{
                onClick: onChangePasswordClick,
              }}
            />
          </div>
        </form>
      </main>
    </>
  )
}
