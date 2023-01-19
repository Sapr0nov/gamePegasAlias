import React from 'react'
import { useAppDispatch, useAppSelector, useToggle } from '../../services/hooks'
import { CommentField } from '../comment-field/comment-field'
import './comment.scss'
import { getDateDMY } from '../../utils/getDate'
import { UserInfo } from '../../types/user'
import { IComment } from '../../services/store/topic/type'
import {
  createLikeApi,
  deleteCommentApi,
  deleteLikeApi,
  getTopicApi,
} from '../../services/store/topic'
import { useQueryParams } from '../../services/hooks/useQueryParams'

export function Comment(props: IComment) {
  const [commentOpen, toggleField] = useToggle()
  const query = useQueryParams()
  const topic_id = query.get('topic_id')
  const user: UserInfo = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const haveLike = props.Likes.find(item => item.author_id === user.id)
  const createDate = () => getDateDMY(props.createdAt)
  const deleteComment = (id: number) => {
    dispatch(deleteCommentApi(id)).then(() => {
      if (topic_id) {
        dispatch(getTopicApi(topic_id))
      }
    })
  }
  const toggleLike = () => {
    haveLike
      ? dispatch(deleteLikeApi(haveLike.like_id)).then(() => {
          if (topic_id) {
            dispatch(getTopicApi(topic_id))
          }
        })
      : dispatch(
          createLikeApi({
            topic_id: Number(topic_id),
            author_id: user.id,
            comment_id: props.comment_id,
          })
        ).then(() => {
          if (topic_id) {
            dispatch(getTopicApi(topic_id))
          }
        })
  }
  return (
    <div className="comment">
      <div className="comment__header">
        <span className="comment__author">{props.author_name}</span>
        <span className="comment__date">{createDate()}</span>
      </div>
      <div className="comment__body">
        <p className="comment__text">{props.message}</p>
        <div className="comment__actions">
          {!commentOpen && (
            <div className="comment__links">
              {!props.bind_comment_id && (
                <button
                  className="comment__link"
                  type="button"
                  onClick={toggleField}>
                  Ответить
                </button>
              )}
              {props.author_id === user.id && (
                <button
                  onClick={() => deleteComment(props.comment_id)}
                  className="comment__link comment__link--alert"
                  type="button">
                  Удалить
                </button>
              )}
            </div>
          )}
          {commentOpen && !props.bind_comment_id && (
            <div className="comment__form">
              <CommentField
                comment_id={props.comment_id}
                toggle={toggleField}
              />
            </div>
          )}
          <div className="comment__likes">
            <span
              onClick={() => toggleLike()}
              className={
                haveLike
                  ? 'comment__like-icon comment__like-icon--liked'
                  : 'comment__like-icon'
              }
            />
            <span className="comment__likes-count">{props.Likes.length}</span>
          </div>
        </div>

        {props?.Comments && (
          <div className="comment__replies">
            {props?.Comments.map(comment => {
              return <Comment {...comment} key={comment.comment_id} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}
