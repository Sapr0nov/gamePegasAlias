import React, { useEffect, useState } from 'react'
import { Button, SelectTeamModal } from '../../components/'
import './round-board.scss'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GameProcess, GameSettings, RoundWord } from '../../types/game'
import { useAppSelector, useToggle } from '../../services/hooks'
import { wordsDeclention, decodeHtml } from '../../utils'
import {
  changeRoundWordScore,
  changeActiveTeam,
  clearTeamProcess,
  changeEndGameScore,
  setWinner,
  clearGameProcess,
  setNextRound,
  changeWord,
  changeTeamScore,
  clearGameSettings,
  changeRoundScore,
} from '../../services/store/game'
import { LOCAL_URL } from '../../constants'

import checkIcon from './../../assets/images/check.svg'
import questionIcon from './../../assets/images/question.svg'
import crossIcon from './../../assets/images/cross-red.svg'
import deleteIcon from './../../assets/images/trash-gray.svg'
import { WordExplanationModal } from '../modal/word-explanation-modal'
import { getPublicData } from '../../services/http/game'
import { Team } from '../../types/leaders'

const nullTeamValue = 'Никто'
const explanationTestWord = 'машина'
const DESC_API_PATH = '/api/v1/desc/'

type GetUsersResponse = {
  data: string
}

async function updateTeam(team: Team) {
  try {
    const { data } = await axios.post<GetUsersResponse>(
      '/api/teams/update/',
      team,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('unexpected error: ', error)
      return 'An unexpected error occurred'
    }
  }
}

export const RoundBoard: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game: GameSettings = useAppSelector(state => state.gameSettings)
  const process: GameProcess = useAppSelector(state => state.gameProcess)
  const wordList: JSX.Element[] | null | undefined = []
  const activeTeam = game.activeTeams[process.activeTeamIndex]
  const [isSelectTeamModalOpen, toggleSelectTeamModal] = useToggle()
  const [isWordDescModalOpen, toggleWordDescModal] = useToggle()

  const wordForAllOptions = game.activeTeams.slice()
  const wordForAllInitial: RoundWord = {
    word: '',
    wordScore: 0,
    isForAllWordWinner: '',
  }
  const wordDescriptionInitial = {
    word: '',
    explanation: '',
    explanationError: false,
  }

  wordForAllOptions.push({
    name: nullTeamValue,
    score: 0,
  })
  const [wordForAll, setLastWordWinner] = useState(wordForAllInitial)
  const [wordDesc, setWordDesc] = useState(wordDescriptionInitial)
  const [isExplanationConnected, toggleExplanationConnected] = useState(false)

  useEffect(() => {
    if (game.lastWordForAll) {
      const wordForAll = process.roundWords.filter(word => {
        return word.isForAllWordWinner
      })[0]
      setLastWordWinner(wordForAll)
    }
  }, [])

  useEffect(() => {
    dispatch(changeWord())
  }, [])

  useEffect(() => {
    getPublicData(LOCAL_URL + DESC_API_PATH + explanationTestWord).then(
      (result: { word: string; explanation: string }) => {
        if (result && result.explanation) {
          toggleExplanationConnected(true)
        } else {
          toggleExplanationConnected(false)
        }
      }
    )
  }, [])

  // Возвращает css-класс состояния очков [http://joxi.ru/KAxQy8wCw1ongr]
  const getWordClass = (score: number, isForAll?: boolean): string => {
    let result = isForAll
      ? 'round-board__word round-board__word--for-all'
      : 'round-board__word'
    if (score === -1) {
      result += ' round-board__word--minus'
    } else if (score === 0) {
      result += ' round-board__word--zero'
    } else if (score === 1) {
      result += ' round-board__word--plus'
    }
    return result
  }

  function changeWordScore(
    e: Event | React.MouseEvent,
    item: RoundWord,
    score: 1 | 0 | -1
  ): void {
    e.preventDefault()
    dispatch(
      changeRoundWordScore({
        word: item.word,
        wordScore: score,
      })
    )
  }

  function onFinishRound(e: Event): void {
    e.preventDefault()
    dispatch(
      changeTeamScore({
        name: activeTeam.name,
        score: process.roundScore,
      })
    )

    // Если есть не игравшая команда в раунде, продолжаем раунд
    if (game.activeTeams[process.activeTeamIndex + 1]) {
      dispatch(changeActiveTeam(process.activeTeamIndex + 1))
      navigate('/score-in-round')
    } else {
      const maxScoreTeam = game.activeTeams.reduce((prev, current, index) => {
        const currentTeam = {
          name: current.name,
          score: current.score,
        }
        if (index === process.activeTeamIndex) {
          currentTeam.score += process.roundScore
        }
        return currentTeam.score > prev.score ? currentTeam : prev
      })

      // Конец раунда. Если победа достигнута, показать победителя, записать результаты команд в игравшие
      if (maxScoreTeam.score >= game.wordsToWin) {
        let endGameScore = ''
        game.activeTeams.forEach((team, index) => {
          let score = team.score
          if (index === process.activeTeamIndex) {
            score += process.roundScore
          }

          updateTeam({
            teamName: team.name,
            games: 1,
            victories: team.name == maxScoreTeam.name ? 1 : 0,
            team_id: 0,
            words: score,
            player_id: 0,
          })

          endGameScore += score + ' : '
        })
        dispatch(setWinner(maxScoreTeam.name))
        dispatch(changeEndGameScore(endGameScore.slice(0, -2)))
        dispatch(clearGameProcess())
        dispatch(clearGameSettings())
        setTimeout(() => {
          navigate('/winner')
        })
      }
      // Иначе сменить раунд и начать с первой команды
      else {
        dispatch(setNextRound())
        dispatch(changeActiveTeam(0))
        navigate('/score-in-round')
      }
    }

    dispatch(clearTeamProcess())
  }

  process.roundWords.forEach(item => {
    if (!item.isForAllWordWinner) {
      wordList.push(
        <div className={getWordClass(item.wordScore)} key={item.word}>
          <div className="round-board__word-value">{item.word}</div>
          <div className="round-board__word-score">{item.wordScore}</div>
          <div className="round-board__word-actions">
            <Button
              classes="button--icon button--white round-board__check-button"
              icon={<img src={checkIcon} alt="+1" />}
              events={{
                onClick: e => changeWordScore(e, item, 1),
              }}
            />
            <Button
              classes="button--icon button--white round-board__delete-button"
              icon={<img src={crossIcon} alt="-1" />}
              events={{
                onClick: e => changeWordScore(e, item, -1),
              }}
            />
            <Button
              classes="button--icon button--white round-board__trash-button"
              icon={<img src={deleteIcon} alt="0" />}
              events={{
                onClick: e => changeWordScore(e, item, 0),
              }}
            />
            {isExplanationConnected && (
              <Button
                classes="button--icon button--white round-board__question-button"
                icon={<img src={questionIcon} alt="Узнать значение" />}
                events={{
                  onClick: e => {
                    e.preventDefault()
                    getPublicData(LOCAL_URL + DESC_API_PATH + item.word).then(
                      (result: { word: string; explanation: string }) => {
                        if (result && result.explanation) {
                          setWordDesc({
                            word: result.word,
                            explanation: decodeHtml(result.explanation),
                            explanationError: false,
                          })
                          toggleWordDescModal()
                        } else {
                          if (e.target) {
                            ;(e.target as HTMLElement).classList.add(
                              'button--disabled'
                            )
                          }
                        }
                      }
                    )
                  },
                }}
              />
            )}
          </div>
        </div>
      )
    }
  })

  return (
    activeTeam &&
    process && (
      <form className="round-board">
        <div className="round-board__header">
          <h2 className="round-board__title">{activeTeam.name}</h2>
          <span className="round-board__subtitle">
            {process.roundCount} раунд
          </span>
        </div>
        <div className="round-board__words">
          {wordList}

          {wordForAll.wordScore ? (
            <div
              className={getWordClass(wordForAll.wordScore, true)}
              key={wordForAll.word + '_forAll'}
              onClick={e => {
                e.preventDefault()
                toggleSelectTeamModal()
              }}>
              <div className="round-board__word-value">{wordForAll.word}</div>
              <div className="round-board__word-team">
                {wordForAll.isForAllWordWinner !== nullTeamValue
                  ? 'Отгадали ' + wordForAll.isForAllWordWinner
                  : 'Никто не отгадал'}
              </div>
              <div className="round-board__word-actions">
                {isExplanationConnected && (
                  <Button
                    classes="button--icon button--white round-board__question-button"
                    icon={<img src={questionIcon} alt="Узнать значение" />}
                    events={{
                      onClick: e => {
                        e.preventDefault()
                        e.stopPropagation()
                        getPublicData(
                          LOCAL_URL + DESC_API_PATH + wordForAll.word
                        ).then(
                          (result: { word: string; explanation: string }) => {
                            if (result && result.explanation) {
                              setWordDesc({
                                word: result.word,
                                explanation: decodeHtml(result.explanation),
                                explanationError: false,
                              })
                              toggleWordDescModal()
                            } else {
                              if (e.target) {
                                ;(e.target as HTMLElement).classList.add(
                                  'button--disabled'
                                )
                              }
                            }
                          }
                        )
                      },
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <p className="round-board__summary">
          {activeTeam.name} заработали {process.roundScore}{' '}
          {wordsDeclention(process.roundScore, ['очко', 'очка', 'очков'])}
        </p>
        <Button
          text="Далее"
          classes="round-board__next"
          events={{
            onClick: onFinishRound,
          }}
        />

        <SelectTeamModal
          isOpen={isSelectTeamModalOpen}
          close={() => false}
          title={`Кто отгадал слово "${wordForAll.word}"`}
          activeTeams={wordForAllOptions}
          onSelectTeam={(name: string) => {
            const newWordWinner = {
              word: wordForAll.word,
              wordScore: wordForAll.wordScore,
              isForAllWordWinner: name,
            }
            // Если клик по ранее выбранной команде, закрываем окно
            if (wordForAll.isForAllWordWinner === name) {
              toggleSelectTeamModal()
            }

            // Если изменяем отгадавшую команду, это команда текущего круга
            else if (name === activeTeam.name) {
              if (wordForAll.isForAllWordWinner !== nullTeamValue) {
                dispatch(
                  changeTeamScore({
                    name: wordForAll.isForAllWordWinner,
                    score: -1,
                  })
                )
              }

              setLastWordWinner(newWordWinner)
              dispatch(changeRoundScore(process.roundScore + 1))
              toggleSelectTeamModal()
            } else {
              // Если изменяем на команду НЕ текущего круга, ранее была выбрана команда текущего круга
              if (wordForAll.isForAllWordWinner === activeTeam.name) {
                dispatch(changeRoundScore(process.roundScore - 1))
                setLastWordWinner(newWordWinner)
              }

              // Если изменяем на команду НЕ текущего круга, ранее была выбрана команда НЕ текущего круга
              else if (wordForAll.isForAllWordWinner !== nullTeamValue) {
                dispatch(
                  changeTeamScore({
                    name: wordForAll.isForAllWordWinner,
                    score: -1,
                  })
                )
              }
              setLastWordWinner(newWordWinner)
              if (name !== nullTeamValue) {
                dispatch(
                  changeTeamScore({
                    name: name,
                    score: 1,
                  })
                )
              }
              toggleSelectTeamModal()
            }
          }}
        />

        <WordExplanationModal
          isOpen={isWordDescModalOpen}
          close={() => toggleWordDescModal()}
          title={`Значение слова "${wordDesc.word}"`}
          explanation={wordDesc.explanation}
        />
      </form>
    )
  )
}
