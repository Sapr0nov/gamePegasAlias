import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ILike {
  like_id?: number
  author_id: number
  comment_id: number
  topic_id: number
}

export const likeModel: ModelAttributes<Model, ILike> = {
  like_id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  comment_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  topic_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
