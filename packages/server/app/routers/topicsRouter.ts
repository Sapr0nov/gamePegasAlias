import express from 'express'
import {
  createTopic,
  getTopicById,
  getTopics,
} from '../controllers/topicsController'

const topicsRouter = express.Router()

// Получение списка всех тем
topicsRouter.get('/', getTopics)

// Получение темы по Id
topicsRouter.get('/:id', getTopicById)

// Создание новой темы
topicsRouter.post('/', createTopic)

export default topicsRouter
