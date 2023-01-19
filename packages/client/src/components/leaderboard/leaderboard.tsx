import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '../../services/hooks/useQueryParams'
import { useAppDispatch, useAppSelector } from '../../services/hooks'

import { Button, RangeLine } from '../../components'
import { getLeadersApi } from '../../services/store/leaders/'
import { FilterState } from '../../services/store/leaders/type'
import { RootState } from '../../services/store/reducer'
import { Team } from '../../types/leaders'
import './leaderboard.scss'
import { wordsDeclention } from '../../utils'
import { UserInfo } from '../../types/user'

export function Leaderboard() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQueryParams()
  const queryFilter: string = query.get('filter') || 'victories'
  const queryPage: number = Number(query.get('page')) || 0
  const user: UserInfo = useAppSelector(state => state.user.user)
  const initialStateFilter: FilterState = {
    ratingFieldName: queryFilter,
    cursor: queryPage,
    limit: 20,
    player_id: Number(user.id),
  }
  const [filter, setFilter] = useState(initialStateFilter)
  const leaders: Array<Team> = useSelector(
    (state: RootState) => state.leaders.leaders
  )

  const changeFilter = (filterName: string) => {
    navigate({
      pathname: '/leaders',
      search: `?filter=${filterName}`,
    })
  }

  const isActiveButton = (filterName: string) => {
    return filterName === filter.ratingFieldName ? 'button--active' : ''
  }

  const getPercentOfVictories = (victories: number, games: number): number => {
    return (victories / games) * 100
  }

  useEffect(() => {
    setFilter({
      ...filter,
      ratingFieldName: queryFilter,
      cursor: queryPage,
    })
  }, [queryFilter, queryPage])

  useEffect(() => {
    dispatch(getLeadersApi({ ...filter, player_id: user.id }))
  }, [filter, user.id])

  return (
    <div className="leaderboard">
      <div className="leaderboard__sort">
        <span className="leaderboard__sort-title">Сортировать:</span>
        <div className="leaderboard__options">
          <Button
            events={{ onClick: () => changeFilter('victories') }}
            text="По количеству побед"
            classes={
              'button--light button--small ' + isActiveButton('victories')
            }
          />
          <Button
            events={{ onClick: () => changeFilter('games') }}
            text="По количеству игр"
            classes={'button--light button--small ' + isActiveButton('games')}
          />
          <Button
            events={{ onClick: () => changeFilter('words') }}
            text="По количеству отгаданных слов"
            classes={'button--light button--small ' + isActiveButton('words')}
          />
        </div>
      </div>
      <div className="leaderboard__results">
        {leaders &&
          Array.isArray(leaders) &&
          leaders.map(team => {
            return (
              <div className="leaderboard__result-item" key={team.teamName}>
                <span className="leaderboard__result-title">
                  {team.teamName}:
                </span>
                <div className="leaderboard__result-info">
                  <span className="leaderboard__result-value">
                    {team.games}{' '}
                    {wordsDeclention(team.games, ['игра', 'игры', 'игр'])},{' '}
                    {team.victories}{' '}
                    {wordsDeclention(team.victories, [
                      'победа',
                      'победы',
                      'побед',
                    ])}
                  </span>
                  <span className="leaderboard__result-value">
                    {team.words}{' '}
                    {wordsDeclention(team.words, ['слово', 'слова', 'слов'])}
                  </span>
                </div>
                <RangeLine
                  percent={getPercentOfVictories(team.victories, team.games)}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
