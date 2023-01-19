import { Modal } from './modal'
import DOMPurify from 'dompurify'

interface IModal {
  title: string
  explanation: string
  isOpen: boolean
  close: () => void
}

import '../word-explanation/word-explanation.scss'

export function WordExplanationModal(props: IModal) {
  const cleanDescription = DOMPurify.sanitize(props.explanation, {
    USE_PROFILES: { html: true },
  })

  return (
    <Modal isOpen={props.isOpen} close={props.close}>
      <h2 className="modal__title">{props.title}</h2>
      <div
        className="word-explanation"
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      />
    </Modal>
  )
}
