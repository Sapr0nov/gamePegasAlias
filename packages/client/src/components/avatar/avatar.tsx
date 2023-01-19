import React from 'react'
import { useAppSelector, useToggle } from '../../services/hooks'
import { EditAvatarModal } from '../index'

import './avatar.scss'
import logo from '../../assets/images/logo-round.png'
import editIcon from '../../assets/images/edit.svg'
import { UserInfo } from '../../types/user'

export const Avatar: React.FC = (): JSX.Element => {
  const [value, toggleValue] = useToggle()
  const user: UserInfo = useAppSelector(state => state.user.user)

  const onError = () => {
    const image = document.getElementById('AvatarImage') as HTMLImageElement
    image.src = logo
  }
  return (
    <>
      <div className="avatar">
        <div className="avatar__image">
          <img
            id="AvatarImage"
            src={'https://ya-praktikum.tech/api/v2/resources' + user.avatar}
            onError={onError}
            alt=""
          />
        </div>
        <div onClick={toggleValue} className="avatar__edit">
          <img src={editIcon} alt="" />
        </div>
      </div>
      <EditAvatarModal isOpen={value} close={toggleValue} />
    </>
  )
}
