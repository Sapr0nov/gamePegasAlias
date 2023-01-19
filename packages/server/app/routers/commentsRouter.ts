import express from 'express'
import {
  createNewComment,
  deleteCommentById,
} from '../controllers/commentsController'

const commentsRouter = express.Router()

// Создание комментария
commentsRouter.post('/', createNewComment)

// Удаление комментария
commentsRouter.delete('/:id', deleteCommentById)

export default commentsRouter
