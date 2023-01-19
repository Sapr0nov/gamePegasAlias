import { Words } from '../config/db.config'
import type { IWord } from '../models/wordModel'

// Сохранить описание слова
export async function createWord(props: IWord) {
  if (props) {

  }
  return Words.create({ ...props })
}

// Получение описания слова
export async function getDesc(word: string) {
  return Words.findOne({
    where: {
      word: word,
    },
  })
}
