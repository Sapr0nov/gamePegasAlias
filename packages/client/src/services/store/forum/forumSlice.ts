import { createSlice } from '@reduxjs/toolkit'
import { getForumApi } from './forumThunk'

const initialState = {
  topics: [],
  status: '',
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getForumApi.pending, state => {
        state.status = 'loading'
      })
      .addCase(getForumApi.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.topics = action.payload.rows
      })
  },
})

export default forumSlice.reducer
