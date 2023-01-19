import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ITopic {
  topic_id?: number
  title: string
  question: string
  author_id: number
  author_name: string
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  topic_id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  question: {
    type: DataType.STRING,
    allowNull: false,
  },
  author_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  author_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
