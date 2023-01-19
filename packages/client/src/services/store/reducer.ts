import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import leadersReducer from './leaders/leadersSlice'
import gameSettingsReducer from './game/gameSettingsSlice'
import gameProcessReducer from './game/gameProcessSlice'
import forumReducer from './forum/forumSlice'
import topicReducer from './topic/topicSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    leaders: leadersReducer,
    gameSettings: gameSettingsReducer,
    gameProcess: gameProcessReducer,
    forum: forumReducer,
    topic: topicReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
