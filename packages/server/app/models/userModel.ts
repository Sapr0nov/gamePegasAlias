import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export enum userTheme {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}
export interface IUser {
  user_id?: number
  author_id: number
  theme?: userTheme
}

export const userModel: ModelAttributes<Model, IUser> = {
  user_id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  theme: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: userTheme.LIGHT,
  },
}
