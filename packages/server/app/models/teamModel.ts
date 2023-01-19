import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ITeam {
  team_id?: number
  teamName: string
  victories: number
  games: number
  words: number
  player_id: number
}

export const teamModel: ModelAttributes<Model, ITeam> = {
  team_id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataType.STRING,
    allowNull: false,
  },
  victories: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  games: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  words: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  player_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
