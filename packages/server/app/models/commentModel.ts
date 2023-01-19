import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IComment {
  comment_id?: number
  message: string
  author_id: number
  author_name: string
  topic_id?: number | null
  bind_comment_id?: number | null
}

export const commentModel: ModelAttributes<Model, IComment> = {
  comment_id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
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
  topic_id: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  bind_comment_id: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
