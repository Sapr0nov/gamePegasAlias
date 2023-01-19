import { FormField, Button } from '../../components'
import { Modal } from './modal'
import { Team } from '../../types/leaders'
import { wordsDeclention } from '../../utils'
import { ActiveTeam } from '../../types/game'
import { useAppDispatch, useAppSelector } from '../../services/hooks/useState'
import { addTeamsApi, deleteTeamsApi } from '../../services/store/game'
import { UserInfo } from '../../types/user'

interface IModal {
  isOpen: boolean
  close: () => void
  onAddTeam: (name: string) => void
  onRemovePlayedTeam: (name: string) => void
  activeTeams: ActiveTeam[]
  playedTeams: Team[]
}

import './../../scss/form/form.scss'
import './../team-cards/team-cards.scss'

export function AddTeamModal(props: IModal) {
  const dispatch = useAppDispatch()
  let teamName = ''
  let playedTeams: Team[]
  const user: UserInfo = useAppSelector(state => state.user.user)

  if (Array.isArray(props.playedTeams)) {
    playedTeams = props.playedTeams?.filter(playedTeam => {
      return !props.activeTeams.some(activeTeam => {
        return activeTeam.name === playedTeam.teamName
      })
    })
  } else {
    playedTeams = []
  }
  return (
    <Modal isOpen={props.isOpen} close={props.close}>
      <h2 className="modal__title">Добавить команду</h2>

      <form className="modal__form">
        <FormField
          placeholder="Название команды"
          onInput={(name: string) => {
            teamName = name
          }}
        />
        <Button
          text="Сохранить"
          type="button"
          events={{
            onClick: () => {
              if (teamName) {
                const team: Team = {
                  team_id: null,
                  teamName: teamName,
                  games: 0,
                  words: 0,
                  victories: 0,
                  player_id: user.id,
                }
                props.onAddTeam(teamName)
                dispatch(addTeamsApi(team))
              }
            },
          }}
        />
      </form>

      {!!playedTeams.length && (
        <div className="team-cards">
          <span className="team-cards__title">
            Выбрать ранее игравшую команду
          </span>
          {playedTeams &&
            playedTeams.map(team => {
              return (
                <div
                  className="team-cards__item"
                  key={team.teamName}
                  onClick={() => {
                    props.onAddTeam(team.teamName)
                  }}>
                  <span className="team-cards__item-title">
                    {team.teamName}
                  </span>
                  <div className="team-cards__item-labels">
                    <span className="team-cards__item-label team-cards__item-label--victories">
                      {team.victories}{' '}
                      {wordsDeclention(team.victories, [
                        'победа',
                        'победы',
                        'побед',
                      ])}
                    </span>
                    <span className="team-cards__item-label">
                      {team.words}{' '}
                      {wordsDeclention(team.words, ['слово', 'слова', 'слов'])}{' '}
                      отгадано
                    </span>
                  </div>
                  <Button
                    classes="button--icon button--white team-cards__item-delete"
                    events={{
                      onClick: e => {
                        e.stopPropagation()
                        e.preventDefault()
                        props.onRemovePlayedTeam(team.teamName)
                        dispatch(deleteTeamsApi(String(team.team_id)))
                      },
                    }}
                    icon={
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.5 6.25L8.275 11.5M5.725 11.5L5.5 6.25M2.5 3.25L3.12554 12.633C3.19558 13.6836 4.06818 14.5 5.12111 14.5H8.87889C9.93182 14.5 10.8044 13.6836 10.8745 12.633L11.5 3.25M2.5 3.25H4.75M2.5 3.25H1M11.5 3.25H13M11.5 3.25H9.25M9.25 3.25V3C9.25 1.89543 8.35457 1 7.25 1H6.75C5.64543 1 4.75 1.89543 4.75 3V3.25M9.25 3.25H4.75"
                          stroke="#E83A3A"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                  />
                </div>
              )
            })}
        </div>
      )}
    </Modal>
  )
}
