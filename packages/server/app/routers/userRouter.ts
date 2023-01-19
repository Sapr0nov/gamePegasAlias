import express from 'express'
import {
  getThemeByIdUser,
  createUser,
  toggleTheme,
} from '../controllers/userController'

const router = express.Router()

// Получение пользователя
router.get('/:id', getThemeByIdUser)

// Переключение темы по Id пользователя
router.get('/theme/:id', toggleTheme)

// Создание нового пользователя
router.post('/', createUser)

export default router
