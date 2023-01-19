import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './services/store/reducer'
import { useAppDispatch, useAppSelector } from './services/hooks'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Main,
  Login,
  SignUp,
  Profile,
  Rules,
  Leaders,
  ChangePassword,
  ForumPage,
  ScoreInRoundPage,
  GameStart,
  ForumDetail,
  ServerErrorPage,
  RoundProcess,
  WinnerPage,
  NotFoundPage,
  RoundEnd,
} from './pages'
import { AppSettings } from './components'

import './scss/style.scss'
import { getUserApi } from './services/store/user'
import { UserInfo } from './types/user'
import {
  createUser,
  getThemeByIdUser,
  toggleTheme,
} from './services/http/theme'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const user: UserInfo = useAppSelector(state => state.user.user)
  useEffect(() => {
    dispatch(getUserApi())
  }, [dispatch])

  useEffect(() => {
    if (user.id > 0) {
      getThemeByIdUser(user.id)
        .then(res => {
          if (res) {
            if (
              (res.theme === 'LIGHT' &&
                document.body.classList.contains('theme-dark')) ||
              (res.theme === 'DARK' &&
                !document.body.classList.contains('theme-dark'))
            ) {
              document.body.classList.toggle('theme-dark')
            }
          } else {
            createUser(user.id)
              .then(res => {
                if (document.body.classList.contains('theme-dark')) {
                  toggleTheme(res.data.author_id)
                }
              })
              .catch(e => console.log(e))
          }
        })
        .catch(e => console.log(e))
    }
  }, [user.id])

  // Set correct app min-height on mobile for existing browser address bar
  const calcAppHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', calcAppHeight)
  calcAppHeight()

  return (
    <div className="app">
      <Provider store={store}>
        <Router>
          <AppSettings />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/leaders" element={<Leaders />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/score-in-round" element={<ScoreInRoundPage />} />
            <Route path="/game-start" element={<GameStart />} />
            <Route path="/forum-detail" element={<ForumDetail />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="/round-process" element={<RoundProcess />} />
            <Route path="/winner" element={<WinnerPage />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/round-process" element={<RoundProcess />} />
            <Route path="/round-end" element={<RoundEnd />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}
