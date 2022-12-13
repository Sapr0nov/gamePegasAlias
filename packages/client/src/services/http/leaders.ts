import { serverInstance } from './axios'
import { FilterState } from '../store/leaders/type'

export const getLeadersAPI = (filter: FilterState) => {
  return serverInstance
    .get('/api/team/leaderboard', { params: filter })
    .then(response => response.data)
    .catch(error => {
      console.log(error)
    })
}

