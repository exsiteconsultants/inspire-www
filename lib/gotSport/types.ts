interface SourceGame {
  matchNumber: number
  dateTime: string
  location: string
  homeTeamId: number
  homeTeamScore: number
  awayTeamId: number
  awayTeamScore: number
}

export interface SourceTeam {
  teamId: number
  groupId: number
  name: string
  crestUrl: string
}

export interface LeagueTableEntry {
  position: number
  teamID: number
  played: number
  won: number
  lost: number
  drawn: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface JPLTeam {
  teamID: number
  eventID: number
  groupID: number
  name: string
  crest: string
}

export interface Fixture {
  groupID: number
  awayTeamId: number
  awayTeamScore?: number
  dateTime: Date
  homeTeamId?: number
  homeTeamScore?: number
  location?: string
  matchNumber: number
}

export interface JPLTeamInput {
  /* The id of the league */
  eventID: number

  /* The id of the group within the league: e.g. 1234 = Blue */
  groupID: number

  /* The id of the team within the group: e.g. 1555 = Inspire Girls Academy */
  teamID: number
}
