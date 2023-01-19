import { apiInstance } from './axios'

export const registerUser = async (data: Record<string, unknown>) => {
  return await apiInstance
    .post('/auth/signup', data)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const loginUser = async (data: Record<string, unknown>) => {
  return await apiInstance
    .post('/auth/signin', data)
    .then(response => response)
    .catch(error => {
      console.log(error)
    })
}

export const signUpYaOAuth = () => {
  return apiInstance
    .get('/oauth/yandex/service-id')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const signInYaOAuth = (data: Record<string, unknown>) => {
  return apiInstance
    .post('/oauth/yandex', data)
    .then(response => response)
    .catch(error => {
      console.log(error)
    })
}

export const logoutUser = async () => {
  return await apiInstance
    .post('/auth/logout')
    .then(response => response)
    .catch(error => {
      console.log(error)
    })
}
