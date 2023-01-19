import express from 'express'
import {
  getDescByWord,
  createWord
} from '../controllers/wordsController'

const router = express.Router()

// Получение описания слова
router.get('/:id', getDescByWord)

// Создание новой пары слово - описание
router.post('/', createWord)

export default router
