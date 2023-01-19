import React from 'react'
import './theme-btn.scss'
import { useAppSelector } from '../../services/hooks'
import { UserInfo } from '../../types/user'
import { toggleTheme } from '../../services/http/theme'

export function ThemeBtn() {
  const user: UserInfo = useAppSelector(state => state.user.user)

  function handleClick(): void {
    document.body.classList.toggle('theme-dark')
    if (user.id > 0) {
      toggleTheme(user.id)
    }
  }

  return (
    <button
      className="theme-btn"
      onClick={handleClick}
      title="Переключить тему">
      Переключить тему
    </button>
  )
}
