import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface GameTable {
  away_team_id: number
  away_team_score: number | null
  date: Timestamp
  game_number: number
  group_id: number
  home_team_id: number
  home_team_score: number | null
  id: Generated<number>
  location: string | null
}

export type Game = Selectable<GameTable>
export type NewGame = Insertable<GameTable>
export type GameDBUpdate = Updateable<GameTable>

export interface LeagueTable {
  age: string
  cup: Generated<boolean>
  event_id: number
  group_id: number
  id: Generated<number>
  name: string
}

export type League = Selectable<LeagueTable>
export type NewLeague = Insertable<LeagueTable>
export type LeagueUpdate = Updateable<LeagueTable>

export interface LeagueTableEntryTable {
  drawn: Generated<number>
  goal_difference: Generated<number>
  goals_against: Generated<number>
  goals_for: Generated<number>
  id: Generated<number>
  group_id: number
  team_id: number
  lost: Generated<number>
  played: Generated<number>
  points: Generated<number>
  position: number
  won: Generated<number>
}

export type LeagueTableEntry = Selectable<LeagueTableEntryTable>
export type NewLeagueTableEntry = Insertable<LeagueTableEntryTable>
export type LeagueTableEntryUpdate = Updateable<LeagueTableEntryTable>

export interface LeagueTeamTable {
  id: Generated<number>
  group_id: number
  team_id: number
}

export type LeagueTeam = Selectable<LeagueTeamTable>
export type NewLeagueTeam = Insertable<LeagueTeamTable>
export type LeagueTeamUpdate = Updateable<LeagueTeamTable>

export interface TeamTable {
  age: string
  bio: string | null
  crest: string | null
  id: number
  isownteam: Generated<boolean>
  name: string
  team_photo: string | null
}

export type Team = Selectable<TeamTable>
export type NewTeam = Insertable<TeamTable>
export type TeamUpdate = Updateable<TeamTable>

export interface TeamStaffTable {
  id: Generated<number>
  team_id: number
  role: string
  staff_id: number
}

export type TeamStaff = Selectable<TeamStaffTable>
export type NewTeamStaff = Insertable<TeamStaffTable>
export type TeamStaffUpdate = Updateable<TeamStaffTable>

export interface StaffTable {
  bio: string | null
  email: string | null
  id: Generated<number>
  image: string | null
  name: string
  title: string
}

export type Staff = Selectable<StaffTable>
export type NewStaff = Insertable<StaffTable>
export type StaffUpdate = Updateable<StaffTable>

export interface DB {
  game: GameTable
  league: LeagueTable
  league_table: LeagueTableEntryTable
  league_team: LeagueTeamTable
  team: TeamTable
  team_staff: TeamStaffTable
  staff: StaffTable
}

export interface Result {
  crest: string | null
  home: boolean
  date: Date
  home_team_score: number | null
  id: number
  home_team_id: number
  home_team_name: string
  home_team_crest: string | null
  away_team_id: number
  away_team_score: number | null
  away_team_name: string
  away_team_crest: string | null
}

export interface SheduledGameRecord {
  away_team_crest: string | null
  away_team_id: number
  away_team_name: string
  crest: string | null
  date: Date
  home_team_crest: string | null
  home_team_id: number
  home_team_name: string
  home: boolean
  id: number
  location: string | null
  opponent: string
}

export type TeamAndGroup = Team & LeagueTeam

export interface LeagueTableEntryAndTeam extends LeagueTableEntry {
  team: string
  crest: string | null
}
