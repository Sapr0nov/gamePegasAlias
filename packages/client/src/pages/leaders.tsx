import React from 'react'
import { BackLink, Leaderboard } from '../components'
import { authorization } from '../utils'

export const Leaders: React.FC = (): JSX.Element => {
  authorization()
  return (
    <>
      <header>
        <BackLink text="Таблица лидеров" />
      </header>
      <main>
        <Leaderboard />
      </main>
    </>
  )
}
