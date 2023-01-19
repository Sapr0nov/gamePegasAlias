import { apiInstance } from './axios'

export const getUserAPI = async () => {
  return await apiInstance
    .get('/auth/user')
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const changeProfileAPI = (data: Record<string, unknown>) => {
  return apiInstance
    .put('/user/profile', data)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const changePasswordAPI = (data: Record<string, unknown>) => {
  return apiInstance
    .put('/user/password', data)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const changeProfileAvatarAPI = (data: FormData) => {
  return apiInstance
    .put('/user/profile/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data;',
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}
