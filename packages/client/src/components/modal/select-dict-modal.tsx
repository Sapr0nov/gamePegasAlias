import { Modal } from './modal'
import { IDictionary, levelsMap } from '../../dictionaries'
import { wordsDeclention } from '../../utils/'

import './../../scss/form/form.scss'
import './../dictionary-cards/dictionary-cards.scss'

interface IModal {
  isOpen: boolean
  close: () => void
  onSelect: (dict: IDictionary) => void
  dictionaries: IDictionary[]
}

export function SelectDictModal(props: IModal) {
  return (
    <Modal isOpen={props.isOpen} close={props.close}>
      <h2 className="modal__title">Выбрать словарь</h2>

      <div className="dictionary-cards">
        {props.dictionaries &&
          props.dictionaries.map(dict => {
            return (
              <div
                className="dictionary-cards__item"
                key={dict.name}
                onClick={() => {
                  props.onSelect(dict)
                }}>
                <span className="dictionary-cards__item-title">
                  {dict.name}
                </span>
                <p className="dictionary-cards__item-desc">{dict.desc}</p>
                <div className="dictionary-cards__item-labels">
                  <span
                    className={
                      'dictionary-cards__item-label dictionary-cards__item-label--' +
                      dict.level
                    }>
                    {levelsMap[dict.level]}
                  </span>
                  <span className="dictionary-cards__item-label">
                    {dict.wordsCount}{' '}
                    {wordsDeclention(dict.wordsCount, [
                      'слово',
                      'слова',
                      'слов',
                    ])}
                  </span>
                </div>
              </div>
            )
          })}
      </div>
    </Modal>
  )
}
