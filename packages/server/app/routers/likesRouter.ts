import express from 'express'
import { createNewLike, deleteLikeById } from '../controllers/likeController'

const likesRouter = express.Router()

// Создание лайка
likesRouter.post('/', createNewLike)

// Удаление лайка
likesRouter.delete('/:id', deleteLikeById)

export default likesRouter
