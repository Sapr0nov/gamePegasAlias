import { serverInstance } from './axios'

export const getThemeByIdUser = (id: number) => {
  return serverInstance
    .get(`/api/user/${id.toString()}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const toggleTheme = (id: number) => {
  return serverInstance
    .get(`/api/user/theme/${id.toString()}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const createUser = (id: number) => {
  return serverInstance
    .post('/api/user', { id })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}
