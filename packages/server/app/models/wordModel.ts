import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IWord {
  word_id?: number
  word: string
  description?: string
}

export const wordModel: ModelAttributes<Model, IWord> = {
  word_id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  word: {
    type: DataType.STRING,
    allowNull: false,
  },
  description: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "",
  },
}
