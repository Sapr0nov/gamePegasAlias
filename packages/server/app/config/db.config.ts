import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { topicModel } from '../models/topicModel'
import { commentModel } from '../models/commentModel'
import { likeModel } from '../models/likeModel'
import { teamModel } from '../models/teamModel'
import { userModel } from '../models/userModel'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_1_PORT_5432_TCP_ADDR,
} = process.env

export const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_1_PORT_5432_TCP_ADDR || 'localhost',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  dialect: 'postgres',
  port: Number(POSTGRES_PORT),
  ssl: false,
  dialectOptions: {},
}

export const sequelize = new Sequelize(sequelizeOptions)
export const Topics = sequelize.define('Topics', topicModel, {
  tableName: 'topics',
  initialAutoIncrement: '100',
})

export const Comments = sequelize.define('Comments', commentModel, {
  tableName: 'comments',
  initialAutoIncrement: '1000',
})

export const Like = sequelize.define('Like', likeModel, {
  tableName: 'like',
  initialAutoIncrement: '100000',
})

export const User = sequelize.define('User', userModel, {
  tableName: 'user',
  initialAutoIncrement: '0',
})

export const Teams = sequelize.define('Teams', teamModel, {
  tableName: 'teams',
  initialAutoIncrement: '100',
})

Topics.hasMany(Comments, { foreignKey: 'topic_id' })

Comments.hasMany(Comments, { foreignKey: 'bind_comment_id' })

Comments.hasMany(Like, { foreignKey: 'comment_id' })

export async function dbConnect() {
  const isDropTable = false
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: isDropTable })
    console.log('Connection has been established successfully')
  } catch (e) {
    console.error('Unable to connect to the database: ', e)
  }
}

export function startApp(player_id: number) {
  dbConnect().then(() => {
    Teams.create({
      teamName: 'Не звонят, а звонят',
      victories: 0,
      games: 10,
      words: 10,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Цыплята',
      victories: 5,
      games: 30,
      words: 100,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Школоло',
      victories: 10,
      games: 40,
      words: 200,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Общага',
      victories: 25,
      games: 50,
      words: 400,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Девочки',
      victories: 30,
      games: 50,
      words: 300,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Пацаны',
      victories: 30,
      games: 50,
      words: 300,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Эрудиты',
      victories: 45,
      games: 60,
      words: 500,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Магистры',
      victories: 55,
      games: 70,
      words: 800,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Лингвомонстры',
      victories: 75,
      games: 80,
      words: 1000,
      player_id: player_id,
    })
    Teams.create({
      teamName: 'Сверхразумы',
      victories: 100,
      games: 100,
      words: 1500,
      player_id: player_id,
    })
  })
}
