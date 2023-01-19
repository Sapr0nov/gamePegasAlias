import { createSlice } from '@reduxjs/toolkit'
import { GameProcess, RoundWord } from '../../../types/game'

const initialState: GameProcess = {
  roundCount: 1,
  activeTeamIndex: 0,
  activeWordIndex: 0,
  roundScore: 0,
  roundWords: [],
  winner: '',
  endGameScore: '',
}

const gameProcessSlice = createSlice({
  name: 'gameProcess',
  initialState,
  reducers: {
    setNextRound(state) {
      state.roundCount += 1
    },

    changeActiveTeam(state, action) {
      state.activeTeamIndex = action.payload
    },

    changeRoundScore(state, action) {
      state.roundScore = action.payload
    },

    changeEndGameScore(state, action) {
      state.endGameScore = action.payload
    },

    changeWord(state) {
      state.activeWordIndex += 1
    },

    addRoundWord(state, action) {
      state.roundWords.push(action.payload)
    },

    clearTeamProcess(state) {
      state.roundWords = []
      state.roundScore = 0
    },

    clearGameProcess(state) {
      clearTeamProcess()
      state.roundCount = 1
      state.activeTeamIndex = 0
      state.activeWordIndex = 0
      state.roundScore = 0
      state.roundWords = []
    },

    changeRoundWordScore(state, action) {
      const foundIndex = state.roundWords.findIndex(
        (item: RoundWord) => item.word === action.payload.word
      )
      const roundWords = state.roundWords.slice()
      roundWords[foundIndex] = action.payload
      state.roundWords = roundWords
      state.roundScore = roundWords.reduce((a: number, b: RoundWord) => {
        return a + b.wordScore
      }, 0)
    },

    setWinner(state, action) {
      state.winner = action.payload
    },
  },
})

export const {
  setNextRound,
  changeActiveTeam,
  changeRoundScore,
  changeWord,
  addRoundWord,
  changeRoundWordScore,
  clearTeamProcess,
  changeEndGameScore,
  setWinner,
  clearGameProcess,
} = gameProcessSlice.actions
export default gameProcessSlice.reducer
