import type { IComment } from '../models/commentModel'
import { Comments } from '../config/db.config'

// Создание комментария
export async function createComment(props: IComment) {
  return Comments.create({ ...props })
}

// Удаление комментария по ID
export async function deleteComment(id: number) {
  return Comments.destroy({
    where: { comment_id: id },
  })
}
