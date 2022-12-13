import { serverInstance } from './axios'
import { FilterState } from '../store/leaders/type'

export const getLeadersAPI = (filter: FilterState) => {
  return serverInstance
    .get('/api/teams/leaderboard', { params: filter })
    .then(response => { 
      console.log(response, response.data)
      return response.data } )
    .catch(error => {
      console.log(error)
    })
}

