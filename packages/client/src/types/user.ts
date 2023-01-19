interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
  password: string
}

export interface IUserChangePassword {
  oldPassword: string
  newPassword: string
}

export type UserSignup = Omit<User, 'id' | 'avatar' | 'display_name'>

export type UserLogin = Pick<User, 'login' | 'password'>

export type UserInfo = Omit<User, 'password'>

export type UserEdit = Omit<User, 'id' | 'avatar' | 'password'>
