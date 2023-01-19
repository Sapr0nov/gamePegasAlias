import { Team } from './leaders'
import { IDictionary } from '../dictionaries'

export type Dictionary = {
  name: string
  words: number
  level: 'easy' | 'medium' | 'hard'
  url: string
}

export type GameSettings = {
  activeTeams: ActiveTeam[]
  playedTeams: Team[]
  status: string
  roundDuration: number
  wordsToWin: number
  lastWordForAll: boolean
  dictionary: IDictionary | null
}

export type ActiveTeam = {
  name: string
  score: 0
}

export type GameProcess = {
  roundCount: number
  activeTeamIndex: number
  activeWordIndex: number
  roundScore: number
  winner: string
  endGameScore: string
  roundWords: RoundWord[]
}

export type RoundWord = {
  word: string
  wordScore: -1 | 0 | 1
  isForAllWordWinner?: string
}
