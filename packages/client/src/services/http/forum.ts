import { serverInstance } from './axios'
import { ForumState } from '../store/forum/type'

export const getTopicsAPI = (filter: ForumState) => {
  return serverInstance
    .get('/api/topics', { params: filter })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const createNewTopic = (data: any) => {
  return serverInstance
    .post('/api/topics', data)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}
