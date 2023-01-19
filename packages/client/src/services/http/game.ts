import { serverInstance } from './axios'
import { FilterState } from '../store/leaders/type'
import { Team } from '../../types/leaders'

export const getPublicData = async (url: string) => {
  return await serverInstance
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error(error)
    })
}

export const getTeamsAPI = (filter: FilterState) => {
  return serverInstance
    .get('/api/teams', { params: filter })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const addTeamsAPI = (teamParams: Team) => {
  return serverInstance
    .post('/api/teams', { params: teamParams })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

export const deleteTeamsAPI = (id: string) => {
  return serverInstance
    .delete(`/api/teams/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}
