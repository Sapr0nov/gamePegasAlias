import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPublicData } from '../../services/http/game'
import { Button } from '../'
import './score-in-round.scss'
import { GameProcess, GameSettings } from '../../types/game'
import { useAppSelector } from '../../services/hooks'
import { useDispatch } from 'react-redux'
import { getDictionaryWords } from '../../services/store/game'
import { arrayShuffle } from '../../utils'

export const ScoreInRound: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game: GameSettings = useAppSelector(state => state.gameSettings)
  const process: GameProcess = useAppSelector(state => state.gameProcess)

  useEffect(() => {
    if (game.dictionary?.url && !game.dictionary?.words) {
      getPublicData(game.dictionary?.url).then(result => {
        if (result) {
          const shuffleDict = arrayShuffle(result.words)
          dispatch(getDictionaryWords(shuffleDict))
        }
      })
    }
  }, [dispatch])

  return (
    <div className="score-in-round">
      <div className="score-in-round__commands">
        {game.activeTeams.length &&
          game.activeTeams.map(team => (
            <div key={team.name} className="score-in-round__command">
              <p className="score-in-round__command_text">{team.name}</p>
              <p className="score-in-round__command_text">{team.score}</p>
            </div>
          ))}
      </div>
      <p className="score-in-round__info">
        Игра ведётся до {game.wordsToWin} очков
      </p>
      <p className="score-in-round__text">следующими играют</p>
      <p className="score-in-round__next-team">
        {game.activeTeams.length &&
          game.activeTeams[process.activeTeamIndex].name}
      </p>
      <Button
        text="Начать раунд"
        type="button"
        classes="button--score"
        events={{
          onClick: e => {
            e.preventDefault()
            navigate('/round-process')
          },
        }}
      />
    </div>
  )
}
