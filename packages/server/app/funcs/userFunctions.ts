import { User } from '../config/db.config'
import { IUser, userTheme } from '../models/userModel'
import { startApp } from '../config/db.config'

// Создать пользователя
export async function createUser(props: IUser) {
  if (props && props.author_id > 0) {
    startApp(props.author_id)
  }
  return User.create({ ...props })
}

// Получение темы по ID
export async function getTheme(id: number) {
  return User.findOne({
    where: {
      author_id: id,
    },
  })
}
// Переключение темы по ID
export async function toggleTheme(id: number) {
  const user: IUser | null | any = await User.findOne({
    where: {
      author_id: id,
    },
  })
  if (user) {
    if (user.theme === 'DARK') {
      user.theme = userTheme.LIGHT
    } else {
      user.theme = userTheme.DARK
    }
    user.save()
  }
  return user
}
