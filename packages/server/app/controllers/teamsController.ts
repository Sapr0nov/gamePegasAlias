import type { Request, Response } from 'express'
import { processResult } from '../utils/processResult'
import * as teamFunctions from '../funcs/teamsFunctions'

// Получить список команд
export const getTeams = async (req: Request, res: Response) => {
  await processResult(
    () => {
      return teamFunctions.getAllTeams(req.query)
    },
    res,
    'Что-то пошло не так'
  )
}

// Получить команду по Id
export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return teamFunctions.getTeamById(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}

// Создать новую команду
export const createNewTeam = async (req: Request, res: Response) => {
  const { teamName, victories, games, words, player_id } = req.body.params
  await processResult(
    () => {
      return teamFunctions.createNewTeam({
        teamName: teamName,
        victories: Number(victories),
        games: Number(games),
        words: Number(words),
        player_id: Number(player_id),
      })
    },
    res,
    'Что-то пошло не так'
  )
}

export const updateTeams = async (req: Request, res: Response) => {
  const { teamName, words, victories } = req.body
  await processResult(
    () => {
      return teamFunctions.updateTeams(teamName, words, victories)
    },
    res,
    'Что-то пошло не так'
  )
}

// Удалить команду
export const deleteTeamById = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(
    () => {
      return teamFunctions.deleteTeamById(Number(id))
    },
    res,
    'Что-то пошло не так'
  )
}

// Получить список TOP 20
export const getLeaderBoard = async (req: Request, res: Response) => {
  await processResult(
    () => {
      return teamFunctions.getLeaderBoard(req.query)
    },
    res,
    'Что-то пошло не так'
  )
}
