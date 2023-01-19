import type { Request, Response } from 'express'
import { processResult } from '../utils/processResult'
import * as likesFunctions from '../funcs/likeFunctions'

// Создать новый комментарий
export const createNewLike = async (req: Request, res: Response) => {
  const { author_id, topic_id, comment_id } = req.body
  await processResult(
    () => {
      return likesFunctions.createLike({
        author_id: Number(author_id),
        comment_id: Number(comment_id),
        topic_id: Number(topic_id),
      })
    },
    res,
    'Что-то пошло не так'
  )
}

// Удалить комментарий
export const deleteLikeById = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return likesFunctions.deleteLike(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}
