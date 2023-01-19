import { createAsyncThunk } from '@reduxjs/toolkit'
import { ForumState } from './type'
import { createNewTopic, getTopicsAPI } from '../../http/forum'

export const getForumApi = createAsyncThunk(
  'forum/getTopicsApi',
  async function (filter: ForumState) {
    return await getTopicsAPI(filter)
  }
)

export const createTopicApi = createAsyncThunk(
  'forum/postTopicApi',
  async function (data: any) {
    return await createNewTopic(data)
  }
)
