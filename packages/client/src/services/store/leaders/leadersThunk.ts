import { createAsyncThunk } from '@reduxjs/toolkit'
import { getLeadersAPI } from '../../http/leaders'
import { FilterState } from './type'

export const getLeadersApi = createAsyncThunk(
  'leader/getLeadersApi',
  async function (filter: FilterState) {
    return await getLeadersAPI(filter)
  }
)
