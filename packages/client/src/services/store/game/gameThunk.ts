import { createAsyncThunk } from '@reduxjs/toolkit'
import { getTeamsAPI, addTeamsAPI, deleteTeamsAPI } from '../../http/game'
import { FilterState } from './type'
import { Team } from '../../../types/leaders'

export const getTeamsApi = createAsyncThunk(
  'games/getTeamsApi',
  async function (filter: FilterState) {
    const response = await getTeamsAPI(filter)
    return response
  }
)

export const addTeamsApi = createAsyncThunk(
  'games/addTeamsApi',
  async function (team: Team) {
    const response = await addTeamsAPI(team)
    return response
  }
)

export const deleteTeamsApi = createAsyncThunk(
  'games/delteTeamsApi',
  async function (id: string) {
    const response = await deleteTeamsAPI(id)
    return response
  }
)
