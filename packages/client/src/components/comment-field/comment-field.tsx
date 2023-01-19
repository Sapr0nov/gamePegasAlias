import React from 'react'
import { Field } from '../field/field'
import './comment-field.scss'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { useForm } from 'react-hook-form'
import { UserInfo } from '../../types/user'
import { createCommentApi, getTopicApi } from '../../services/store/topic'
import { useQueryParams } from '../../services/hooks/useQueryParams'

type bindComment = {
  comment_id?: number
  toggle?: () => void
}
export function CommentField(props: bindComment | null) {
  const dispatch = useAppDispatch()
  const user: UserInfo = useAppSelector(state => state.user.user)
  const { register, handleSubmit, reset } = useForm()
  const query = useQueryParams()
  const topic_id = query.get('topic_id')
  const onSubmit = (data: any) => {
    if (topic_id) {
      dispatch(
        createCommentApi({
          ...data,
          topic_id: Number(query.get('topic_id')),
          bind_comment_id: props?.comment_id ? props.comment_id : null,
          author_id: user.id,
          author_name: user.login,
        })
      ).then(() => {
        if (props?.toggle) {
          props.toggle()
        }
        reset()
        dispatch(getTopicApi(topic_id))
      })
    }
  }
  return (
    <form className="comment-field" onSubmit={handleSubmit(onSubmit)}>
      <button className="comment-field__sticker-btn">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.0008 27.8677C11.5881 27.8677 8.31516 26.512 5.902 24.0988C3.48885 21.6857 2.13316 18.4127 2.13316 15C2.13316 11.5873 3.48885 8.31436 5.902 5.90121C8.31516 3.48806 11.5881 2.13236 15.0008 2.13236C18.4135 2.13236 21.6865 3.48806 24.0996 5.90121C26.5128 8.31436 27.8685 11.5873 27.8685 15C27.8685 18.4127 26.5128 21.6857 24.0996 24.0988C21.6865 26.512 18.4135 27.8677 15.0008 27.8677ZM15.0008 29.7059C18.901 29.7059 22.6415 28.1565 25.3994 25.3986C28.1573 22.6408 29.7067 18.9003 29.7067 15C29.7067 11.0998 28.1573 7.35927 25.3994 4.60138C22.6415 1.84349 18.901 0.294128 15.0008 0.294128C11.1006 0.294128 7.36006 1.84349 4.60218 4.60138C1.84429 7.35927 0.294922 11.0998 0.294922 15C0.294922 18.9003 1.84429 22.6408 4.60218 25.3986C7.36006 28.1565 11.1006 29.7059 15.0008 29.7059Z"
            fill="#3B4F7D"
          />
          <path
            d="M8.17242 17.8805C8.38353 17.7586 8.6344 17.7256 8.86985 17.7887C9.1053 17.8518 9.30605 18.0058 9.42794 18.2169C9.99248 19.1955 10.8049 20.008 11.7833 20.5728C12.7618 21.1375 13.8717 21.4345 15.0015 21.4338C16.1312 21.4345 17.2412 21.1375 18.2196 20.5728C19.1981 20.008 20.0105 19.1955 20.575 18.2169C20.6349 18.1115 20.7151 18.0191 20.8109 17.9448C20.9067 17.8705 21.0162 17.8159 21.1332 17.7842C21.2502 17.7524 21.3723 17.7441 21.4925 17.7597C21.6127 17.7754 21.7286 17.8146 21.8336 17.8752C21.9385 17.9358 22.0305 18.0166 22.1041 18.1129C22.1777 18.2092 22.2316 18.3191 22.2626 18.4363C22.2936 18.5534 22.3011 18.6756 22.2846 18.7957C22.2682 18.9158 22.2282 19.0315 22.1669 19.136C21.441 20.394 20.3966 21.4386 19.1387 22.1647C17.8808 22.8908 16.4539 23.2727 15.0015 23.2721C13.5491 23.2727 12.1221 22.8908 10.8642 22.1647C9.60634 21.4386 8.5619 20.394 7.83603 19.136C7.71415 18.9249 7.68112 18.6741 7.74421 18.4386C7.80729 18.2031 7.96133 18.0024 8.17242 17.8805ZM13.1632 12.2426C13.1632 13.7647 12.3397 15 11.325 15C10.3103 15 9.48676 13.7647 9.48676 12.2426C9.48676 10.7206 10.3103 9.48529 11.325 9.48529C12.3397 9.48529 13.1632 10.7206 13.1632 12.2426ZM20.5162 12.2426C20.5162 13.7647 19.6926 15 18.6779 15C17.6632 15 16.8397 13.7647 16.8397 12.2426C16.8397 10.7206 17.6632 9.48529 18.6779 9.48529C19.6926 9.48529 20.5162 10.7206 20.5162 12.2426Z"
            fill="#3B4F7D"
          />
        </svg>
      </button>
      <Field
        type="text"
        placeholder="Введите сообщение"
        register={register('message')}
      />
      <button className="comment-field__send-btn" type="submit">
        <svg
          width="22"
          height="22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.97 10.692 1.366.862a.375.375 0 0 0-.532.424l2.02 8.255a.37.37 0 0 0 .244.265l3.462 1.188-3.46 1.188a.367.367 0 0 0-.24.265L.832 20.714a.376.376 0 0 0 .532.424l19.606-9.774a.386.386 0 0 0 .169-.166.38.38 0 0 0-.17-.506ZM3.145 18.365l1.18-4.818 6.918-2.375a.188.188 0 0 0 0-.356L4.323 8.444l-1.174-4.8 14.719 7.38-14.724 7.341Z"
            fill="#3B4F7D"
          />
        </svg>
      </button>
    </form>
  )
}
