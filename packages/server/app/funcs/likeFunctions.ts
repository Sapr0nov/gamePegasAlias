import { Like } from '../config/db.config'
import type { ILike } from '../models/likeModel'

// Создание комментария
export async function createLike(props: ILike) {
  return Like.create({ ...props })
}

// Удаление комментария по ID
export async function deleteLike(id: number) {
  return Like.destroy({
    where: { like_id: id },
  })
}
