export interface ScheduledGame {
  crest: string
  date: Date
  home: boolean
  location?: string
  team: string
}

export interface Result {
  awayTeam: string
  awayTeamScore: number
  crest: string
  date: Date
  home: boolean
  homeTeam: string
  homeTeamScore: number
}

export interface LeagueTableEntry {
  position: number
  crest: string
  team: string
  played: number
  goalDifference: number
  points: number
}

export interface StaffMember {
  name: string
  title: string
  bio: string
  image: string
  email?: string
}
