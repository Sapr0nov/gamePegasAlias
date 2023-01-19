import express from 'express'
import {
  createNewTeam,
  deleteTeamById,
  getTeams,
  getLeaderBoard,
  updateTeams,
} from '../controllers/teamsController'

const teamsRouter = express.Router()

// Создание команды
teamsRouter.post('/', createNewTeam)

// Удаление команды
teamsRouter.delete('/:id', deleteTeamById)

// Получение всех команд
teamsRouter.get('/', getTeams)

// Обновление данных команды
teamsRouter.post('/update', updateTeams)

// Получение Списка ТОР 20
teamsRouter.get('/leaderboard', getLeaderBoard)

export default teamsRouter
