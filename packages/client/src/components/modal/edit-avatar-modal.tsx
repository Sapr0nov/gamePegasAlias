import React, { RefObject, useRef, useState } from 'react'
import { Button } from '../../components'
import { Modal } from './modal'
import './../../scss/form/form.scss'
import { changeProfileAvatarAPI } from '../../services/http/profile'
import { useAppDispatch } from '../../services/hooks/useState'
import { getUserApi } from '../../services/store/user'

interface IModal {
  isOpen: boolean
  close: () => void
}

export function EditAvatarModal(props: IModal) {
  const [name, setValue] = useState<string>()

  const changeFileName = (name: string) => {
    setValue(name)
  }

  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    changeFileName(fileObj.name)
  }

  const dispatch = useAppDispatch()

  const handleChangeAvatar = () => {
    if (inputRef !== null) {
      if (inputRef.current !== null) {
        if (inputRef.current.files !== null) {
          if (inputRef.current.files[0] !== null) {
            const formAvatar = document.getElementById(
              'ChangeAvatarForm'
            ) as HTMLFormElement
            const formData = new FormData(formAvatar)
            changeProfileAvatarAPI(formData)
              .then(res => {
                if (res) {
                  dispatch(getUserApi())
                  props.close()
                }
              })
              .catch(e => console.log(e))
          }
        }
      }
    }
  }
  return (
    <Modal isOpen={props.isOpen} close={props.close}>
      <h1 className="avatar__title">Поменять аватар</h1>
      <form id="ChangeAvatarForm">
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          name="avatar"
          onChange={handleFileChange}
        />
      </form>

      <Button
        events={{
          onClick: handleClick,
        }}
        classes="button--light mb-28"
        type="button"
        text="Выберите файл"
      />
      <Button
        classes="mb-28"
        text="Сохранить"
        events={{
          onClick: handleChangeAvatar,
        }}
      />
      <p>{name ?? 'Файл не выбран'}</p>
    </Modal>
  )
}
