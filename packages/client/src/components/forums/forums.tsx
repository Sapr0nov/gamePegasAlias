import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, AddForumModal } from './../../components'
import { useAppDispatch, useToggle } from '../../services/hooks'
import './forums.scss'
import { useQueryParams } from '../../services/hooks/useQueryParams'
import { useSelector } from 'react-redux'
import { getForumApi } from '../../services/store/forum'
import { getDate } from '../../utils/getDate'
import { RootState } from '../../services/store/reducer'
import { Comment, Topic } from '../../types/forum'
import { ForumState } from '../../services/store/forum/type'
import { wordsDeclention } from '../../utils'

export const Forums = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQueryParams()
  const queryPage: number = Number(query.get('page')) || 0
  const initialStateFilter: ForumState = {
    cursor: queryPage,
    limit: 10,
  }
  const [filter, setFilter] = useState(initialStateFilter)
  const topics: Array<Topic> = useSelector(
    (state: RootState) => state.forum.topics
  )
  const [value, toggleValue] = useToggle()
  const changeFilter = (filterName: string) => {
    navigate({
      pathname: '/forum',
      search: `?cursor=${filterName}`,
    })
  }
  const getComments = (comments: Array<Comment>): string =>
    comments.length
      ? `${comments.length} ` +
        wordsDeclention(comments.length, [
          'комментарий',
          'комментария',
          'комментариев',
        ])
      : ''

  useEffect(() => {
    setFilter({
      ...filter,
      cursor: queryPage,
    })
  }, [queryPage])

  useEffect(() => {
    if (!value) {
      dispatch(getForumApi(filter))
    }
  }, [filter, value])

  return (
    <div className="forums">
      <header className="forums__header">
        <Button
          text="Создать тему"
          events={{
            onClick: () => {
              toggleValue()
            },
          }}
        />
      </header>
      <div className="forums__list">
        {topics.map(topic => {
          return (
            <Link
              className="forums__item"
              key={topic.title + topic.topic_id}
              to={`/forum-detail?topic_id=${topic.topic_id}`}>
              <span className="forums__item-title">{topic.title}</span>
              <span className="forums__item-desc">{topic.question}</span>
              <div className="forums__item-info">
                <span className="forums__item-info-value">
                  {getComments(topic.Comments)}
                </span>
                <span className="forums__item-info-value">
                  {getDate(topic.createdAt)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      <AddForumModal isOpen={value} close={toggleValue} />
    </div>
  )
}
