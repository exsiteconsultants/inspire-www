export interface SourceTeam {
  teamId: number
  groupId: number
  name: string
  crestUrl: string
}

export interface JPLLeagueTableEntry {
  groupID: number
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

export interface JPLGame {
  groupID: number
  awayTeamId: number
  awayTeamName: string
  awayTeamScore?: number
  dateTime: Date
  homeTeamId: number
  homeTeamName: string
  homeTeamScore?: number
  location?: string
  gameNumber: number
}

export interface JPLTeamInput {
  /* The id of the league */
  eventID: number

  /* The id of the group within the league: e.g. 1234 = Blue */
  groupID: number

  /* The id of the team within the group: e.g. 1555 = Inspire Girls Academy */
  teamID: number
}
