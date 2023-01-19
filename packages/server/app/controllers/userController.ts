import type { Request, Response } from 'express'
import { processResult } from '../utils/processResult'
import * as userFunctions from '../funcs/userFunctions'

// Получить тему по Id
export const getThemeByIdUser = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return userFunctions.getTheme(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}

// Переключить тему по Id
export const toggleTheme = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return userFunctions.toggleTheme(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}
// Создать пользователя
export const createUser = async (req: Request, res: Response) => {
  const { id } = req.body
  await processResult(
    () => {
      return userFunctions.createUser({
        author_id: Number(id),
      })
    },
    res,
    'Что-то пошло не так'
  )
}
