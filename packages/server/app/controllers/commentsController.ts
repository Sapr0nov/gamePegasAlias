import type { Request, Response } from 'express'
import { processResult } from '../utils/processResult'
import * as commentsFunctions from '../funcs/commentsFunctions'

// Создать новый комментарий
export const createNewComment = async (req: Request, res: Response) => {
  const { author_name, author_id, message, topic_id, bind_comment_id } =
    req.body
  await processResult(
    () => {
      return commentsFunctions.createComment({
        author_name: author_name,
        author_id: Number(author_id),
        message: message,
        topic_id: topic_id ? Number(topic_id) : null,
        bind_comment_id: bind_comment_id ? Number(bind_comment_id) : null,
      })
    },
    res,
    'Что-то пошло не так'
  )
}

// Удалить комментарий
export const deleteCommentById = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return commentsFunctions.deleteComment(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}
