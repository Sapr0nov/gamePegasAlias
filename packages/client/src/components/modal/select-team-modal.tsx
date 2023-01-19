import { Modal } from './modal'
import { ActiveTeam } from '../../types/game'

interface IModal {
  title: string
  isOpen: boolean
  close: () => void
  onSelectTeam: (name: string) => void
  activeTeams: ActiveTeam[]
}

import './../team-cards/team-cards.scss'

export function SelectTeamModal(props: IModal) {
  return (
    <Modal
      isOpen={props.isOpen}
      close={props.close}
      classes="modal--no-close modal--last-word">
      <h2 className="modal__title">{props.title}</h2>

      {!!props.activeTeams.length && (
        <div className="team-cards">
          {props.activeTeams &&
            props.activeTeams.map(team => {
              return (
                <div
                  className="team-cards__item team-cards__item--slim"
                  key={team.name}
                  onClick={() => {
                    props.onSelectTeam(team.name)
                  }}>
                  <span className="team-cards__item-title">{team.name}</span>
                </div>
              )
            })}
        </div>
      )}
    </Modal>
  )
}
