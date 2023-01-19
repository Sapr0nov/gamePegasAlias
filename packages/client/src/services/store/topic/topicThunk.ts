import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createNewComment,
  createNewLike,
  deleteComment,
  deleteLike,
  getTopicAPI,
} from '../../http/topic'

export const getTopicApi = createAsyncThunk(
  'topic/getTopicApi',
  async function (id: string) {
    return await getTopicAPI(id)
  }
)

export const createCommentApi = createAsyncThunk(
  'topic/postCommentApi',
  async function (data: any) {
    return await createNewComment(data)
  }
)

export const deleteCommentApi = createAsyncThunk(
  'topic/deleteCommentApi',
  async function (id: number) {
    return await deleteComment(id)
  }
)
export const createLikeApi = createAsyncThunk(
  'topic/postLikeApi',
  async function (data: any) {
    return await createNewLike(data)
  }
)

export const deleteLikeApi = createAsyncThunk(
  'topic/deleteLikeApi',
  async function (id: number) {
    return await deleteLike(id)
  }
)
