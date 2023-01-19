import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Intro } from '../components'
import { ButtonsNavigation } from '../components/buttons-navigation/buttons-navigation'
import { LOCAL_URL } from '../constants'
import { useAppDispatch, useAppSelector } from '../services/hooks'
import { signInYaOAuth } from '../services/http/login'
import { getUserApi } from '../services/store/user'
import { getTeamsApi } from '../services/store/game'
import { FilterState } from '../services/store/game/type'
import { authorization } from '../utils'
import { UserInfo } from '../types/user'

export const Main: React.FC = (): JSX.Element => {
  if (typeof window !== 'undefined') {
    const dispatch = useAppDispatch()
    const user: UserInfo = useAppSelector(state => state.user.user)
    const initialStateFilter: FilterState = {
      ratingFieldName: 'games',
      cursor: 0,
      status: '',
      limit: 100,
      player_id: Number(user.id),
    }
    dispatch(getTeamsApi(initialStateFilter))
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    const navigate = useNavigate()
    useEffect(() => {
      if (code) {
        signInYaOAuth({ code, redirect_uri: LOCAL_URL })
          .then(() => {
            dispatch(getUserApi())
            navigate('/')
          })
          .catch(e => console.log(e))
      }
    }, [code])
  }
  authorization()
  return (
    <main>
      <Intro />
      <ButtonsNavigation />
    </main>
  )
}
