// import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotFound, ServerError, Winner } from './components'
import PageNavigation from './components/page-navigation/page-navigation'
import {
  Main,
  Login,
  SignUp,
  NewGame,
  Profile,
  Rules,
  Leaders,
  ForumPage,
  Round,
  ForumDetail,
} from './pages/'

import './scss/style.scss'

export function App() {
  // useEffect(() => {
  //   // Предустановка я.практикум:
  //   // const fetchServerData = async () => {
  //   //   const url = `http://localhost:${__SERVER_PORT__}`
  //   //   const response = await fetch(url)
  //   //   const data = await response.json()
  //   //   console.log(data)
  //   // }
  //   //
  //   // fetchServerData()
  // }, [])
  return (
    <div className="app">
      <Router>
        <PageNavigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<Login />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/round" element={<Round />} />
          <Route path="/forum-detail" element={<ForumDetail />} />
          <Route path="/505" element={<ServerError />} />
          <Route
            path="/winner"
            element={
              <Winner nameWinnerTeam="Мудрые черепахи" score="100:91:56" /> //Здесь пропсы указаны для примера
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}
