import React from 'react'
import { BackLink, Winner } from '../components'
import { GameProcess } from '../types/game'
import { useAppSelector } from '../services/hooks'

export const WinnerPage: React.FC = (): JSX.Element => {
  const process: GameProcess = useAppSelector(state => state.gameProcess)

  return (
    <>
      <header>
        <BackLink text="Есть победитель!" />
      </header>
      <main>
        <Winner nameWinnerTeam={process.winner} score={process.endGameScore} />
      </main>
    </>
  )
}
