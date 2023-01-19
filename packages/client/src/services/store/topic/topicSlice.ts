import { createSlice } from '@reduxjs/toolkit'
import { getTopicApi } from './topicThunk'

const initialState = {
  topic: {
    Comments: [],
    author_id: 1,
    author_name: 'Автор',
    createdAt: '2022-12-07T20:50:47.885Z',
    updatedAt: '2022-12-07T20:50:47.885Z',
    question: 'Вопрос',
    title: 'Заголовок',
    topic_id: 1,
  },
  status: '',
}

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopicApi.pending, state => {
        state.status = 'loading'
      })
      .addCase(getTopicApi.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.topic = action.payload
      })
  },
})

export default topicSlice.reducer
