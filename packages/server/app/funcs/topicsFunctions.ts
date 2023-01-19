import type { ITopic } from '../models/topicModel'
import { Comments, Like, Topics } from '../config/db.config'

// Создание топика
export async function createTopic(props: ITopic) {
  return Topics.create({ ...props })
}

// Получение топика по Id
export async function getTopicById(id: number) {
  return Topics.findOne({
    where: {
      topic_id: id,
    },
    include: [
      {
        model: Comments,
        order: [['createdAt', 'DESC']],
        attributes: [
          'message',
          'author_name',
          'author_id',
          'createdAt',
          'updatedAt',
          'topic_id',
          'comment_id',
          'bind_comment_id',
        ],
        include: [
          {
            model: Comments,
            order: [['createdAt', 'DESC']],
            attributes: [
              'message',
              'author_name',
              'author_id',
              'createdAt',
              'updatedAt',
              'topic_id',
              'comment_id',
              'bind_comment_id',
            ],
            include: [
              {
                model: Like,
                attributes: [
                  'author_id',
                  'createdAt',
                  'updatedAt',
                  'topic_id',
                  'like_id',
                ],
              },
            ],
          },
          {
            model: Like,
            attributes: [
              'author_id',
              'createdAt',
              'updatedAt',
              'topic_id',
              'like_id',
            ],
          },
        ],
      },
    ],
  })
}

type pager = {
  offset?: number
  limit?: number
}

// Получить все топики форума и связанные комменты, для определения последнего
export async function getAllTopics(props: pager) {
  const { offset, limit } = props
  return Topics.findAndCountAll({
    offset: offset || 0,
    limit: limit || 10,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Comments,
        attributes: [
          'message',
          'author_name',
          'author_id',
          'createdAt',
          'updatedAt',
          'topic_id',
        ],
      },
    ],
  })
}
