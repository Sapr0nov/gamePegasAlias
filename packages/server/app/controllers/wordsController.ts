import type { Request, Response } from 'express'
import { processResult } from '../utils/processResult'
import * as wordFunctions from '../funcs/wordFunctions'

// Получить тему по Id
export const getDescByWord = async (req: Request, res: Response) => {
  const { word } = req.params
  await processResult(
    () => {
      return wordFunctions.getDesc(String(word))
    },
    res,
    'Что-то пошло не так'
  )
}

// Создать пользователя
export const createWord = async (req: Request, res: Response) => {
  const { word, desc } = req.body
  await processResult(
    () => {
      return wordFunctions.createWord({
        word: String(word),
        description: String(desc)
      })
    },
    res,
    'Что-то пошло не так'
  )
}
