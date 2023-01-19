import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addTeam,
  removeTeam,
  removeTeamFromPlayed,
  changeDictionary,
  changeRoundDuration,
  changeWordsToWin,
  toggleLastWordForAll,
} from '../services/store/game'

import {
  Button,
  BackLink,
  CheckBox,
  AddTeamModal,
  SelectDictModal,
} from '../components'
import { useToggle } from '../services/hooks'
import { useAppSelector } from '../services/hooks'
import { useNavigate } from 'react-router-dom'
import { GameSettings } from '../types/game'
import { DICTIONARIES, IDictionary } from '../dictionaries'

import crossIcon from '../assets/images/cross-red.svg'
import plusIcon from '../assets/images/plus-accent.svg'
import bookIcon from '../assets/images/book-accent.svg'
import './../scss/form/form.scss'

export const GameStart: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isDictsModalOpen, toggleDictsModal] = useToggle()
  const [isAddTeamModalOpen, toggleAddTeamModal] = useToggle()
  const game: GameSettings = useAppSelector(state => state.gameSettings)
  const navigate = useNavigate()

  return (
    <>
      <header>
        <BackLink text="Новая игра" />
      </header>
      <main>
        <form className="form">
          <div className="form__fields">
            <Button
              classes="button--light button--icon-l button--select"
              text={
                game.dictionary && game.dictionary.name
                  ? game.dictionary.name
                  : 'Выберите словарь'
              }
              events={{
                onClick: e => {
                  e.preventDefault()
                  toggleDictsModal()
                },
              }}
              icon={<img src={bookIcon} alt="Изменить словарь" />}
            />
            <h2 className="form__section-title">Команды</h2>
            {game.activeTeams &&
              game.activeTeams.map(team => {
                return (
                  <div className="form__cancel-field" key={team.name}>
                    <span className="form__cancel-field-text">{team.name}</span>
                    <button
                      className="form__cancel-btn"
                      onClick={e => {
                        e.preventDefault()
                        dispatch(removeTeam(team.name))
                      }}>
                      <img src={crossIcon} alt="Удалить словарь" />
                    </button>
                  </div>
                )
              })}
            <Button
              classes="button--light button--icon-l"
              text="Добавить команду"
              events={{
                onClick: e => {
                  e.preventDefault()
                  toggleAddTeamModal()
                },
              }}
              icon={<img src={plusIcon} alt="Добавить команду" />}
            />
            <h2 className="form__section-title">Правила</h2>
          </div>

          <div className="form__fields form__fields--center">
            <p className="form__section-subtitle">Длина раунда</p>
            <h2 className="form__attention">{game.roundDuration} секунд</h2>
            <div className="form__buttons-row">
              <Button
                classes="button--light button--square"
                text="-10 сек"
                events={{
                  onClick: e => {
                    e.preventDefault()
                    dispatch(changeRoundDuration(game.roundDuration - 10))
                  },
                }}
              />
              <Button
                classes="button--light button--square"
                text="+10 сек"
                events={{
                  onClick: e => {
                    e.preventDefault()
                    dispatch(changeRoundDuration(game.roundDuration + 10))
                  },
                }}
              />
            </div>

            <p className="form__section-subtitle">Количество слов для победы</p>
            <h2 className="form__attention">{game.wordsToWin}</h2>
            <div className="form__buttons-row">
              <Button
                classes="button--light button--square"
                text="-10 слов"
                events={{
                  onClick: e => {
                    e.preventDefault()
                    dispatch(changeWordsToWin(game.wordsToWin - 10))
                  },
                }}
              />
              <Button
                classes="button--light button--square"
                text="+10 слов"
                events={{
                  onClick: e => {
                    e.preventDefault()
                    dispatch(changeWordsToWin(game.wordsToWin + 10))
                  },
                }}
              />
            </div>
            <CheckBox
              text="Последнее слово для всех"
              isChecked={game.lastWordForAll}
              onToggle={() =>
                dispatch(toggleLastWordForAll(!game.lastWordForAll))
              }
            />
            <Button
              classes="button--wide"
              text="Начать игру"
              type="submit"
              events={{
                onClick: e => {
                  e.preventDefault()
                  navigate('/score-in-round')
                },
              }}
              disabled={!game.dictionary || game.activeTeams.length < 2}
            />
          </div>
        </form>
      </main>
      <SelectDictModal
        isOpen={isDictsModalOpen}
        close={toggleDictsModal}
        dictionaries={DICTIONARIES}
        onSelect={(dict: IDictionary) => {
          dispatch(changeDictionary(dict))
          toggleDictsModal()
        }}
      />
      <AddTeamModal
        isOpen={isAddTeamModalOpen}
        close={toggleAddTeamModal}
        playedTeams={game.playedTeams}
        activeTeams={game.activeTeams}
        onAddTeam={(name: string) => {
          dispatch(addTeam(name))
          toggleAddTeamModal()
        }}
        onRemovePlayedTeam={(name: string) => {
          dispatch(removeTeamFromPlayed(name))
        }}
      />
    </>
  )
}
