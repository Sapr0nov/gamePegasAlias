import type { Request, Response } from 'express'
import { processResult } from '../utils/processResult'
import * as topicFunctions from '../funcs/topicsFunctions'

// Получить список тем
export const getTopics = async (req: Request, res: Response) => {
  await processResult(
    () => {
      return topicFunctions.getAllTopics({ ...req.body })
    },
    res,
    'Что-то пошло не так'
  )
}

// Получить тему по Id
export const getTopicById = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return topicFunctions.getTopicById(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}

// Создать новую тему
export const createTopic = async (req: Request, res: Response) => {
  const { title, question, author_id, author_name } = req.body
  await processResult(
    () => {
      return topicFunctions.createTopic({
        title: title,
        question: question,
        author_id: Number(author_id),
        author_name: author_name,
      })
    },
    res,
    'Что-то пошло не так'
  )
}
