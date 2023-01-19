import { serverInstance } from './axios'

export const getTopicAPI = (id: string) => {
  return serverInstance
    .get(`/api/topics/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const createNewComment = (data: any) => {
  return serverInstance
    .post('/api/comments', data)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const deleteComment = (id: number) => {
  return serverInstance
    .delete(`/api/comments/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const createNewLike = (data: any) => {
  return serverInstance
    .post('/api/likes', data)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const deleteLike = (id: number) => {
  return serverInstance
    .delete(`/api/likes/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}
