import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely'

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface SquadTable {
  id: number
  name: string
  age: string
  bio: string | null
  photo: string | null
}

export type Squad = Selectable<SquadTable>
export type NewSquad = Insertable<SquadTable>
export type SquadUpdate = Updateable<SquadTable>

export interface TeamTable {
  id: Generated<number>
  name: string
  crest: string | null
  group_id: number
  squad_id: number | null
}

export type Team = Selectable<TeamTable>
export type NewTeam = Insertable<TeamTable>
export type TeamUpdate = Updateable<TeamTable>

export interface GroupTable {
  id: Generated<number>
  name: string
  age: string
  group_type: 'jpl_league' | 'jpl_cup' | 'hampshire_cup'
  event_id: number
}

export type Group = Selectable<GroupTable>
export type NewGroup = Insertable<GroupTable>
export type GroupUpdate = Updateable<GroupTable>

export interface GameTable {
  id: Generated<number>
  game_number: number
  date: Timestamp
  group_id: number
  home_team_id: number
  home_team_score: number | null
  away_team_id: number
  away_team_score: number | null
  location: string | null
}

export type Game = Selectable<GameTable>
export type NewGame = Insertable<GameTable>
export type GameDBUpdate = Updateable<GameTable>

export interface GroupTableTable {
  id: Generated<number>
  group_id: number
  team_id: number
  drawn: number
  goal_difference: number
  goals_against: number
  goals_for: number
  lost: number
  played: number
  points: number
  position: number
  won: number
}

export type GroupTableEntry = Selectable<GroupTableTable>
export type NewGroupTableEntry = Insertable<GroupTableTable>
export type GroupTableEntryUpdate = Updateable<GroupTableTable>

export interface StaffTable {
  id: Generated<number>
  name: string
  title: string
  bio: string | null
  email: string | null
  image: string | null
  squad_id: number | null
}

export type Staff = Selectable<StaffTable>
export type NewStaff = Insertable<StaffTable>
export type StaffUpdate = Updateable<StaffTable>

export interface DB {
  game: GameTable
  group: GroupTable
  group_table: GroupTableTable
  team: TeamTable
  squad: SquadTable
  staff: StaffTable
}

export interface Result {
  crest: string | null
  home: boolean
  date: Date
  home_team_score: number | null
  id: number
  home_team_id: number
  home_squad_id: number | null
  home_team_name: string
  home_team_crest: string | null
  away_team_id: number
  away_squad_id: number | null
  away_team_score: number | null
  away_team_name: string
  away_team_crest: string | null
  group_type: 'jpl_league' | 'jpl_cup' | 'hampshire_cup'
}

export interface SheduledGameRecord {
  away_team_crest: string | null
  away_team_id: number
  away_squad_id: number | null
  away_team_name: string
  crest: string | null
  date: Date
  home_team_crest: string | null
  home_team_id: number
  home_squad_id: number | null
  home_team_name: string
  home: boolean
  id: number
  location: string | null
  opponent: string
  group_type: 'jpl_league' | 'jpl_cup' | 'hampshire_cup'
}

export type SquadAndGroup = Squad & {
  team_id: number
  group_id: number
}

export interface GroupTableEntryAndTeam extends GroupTableEntry {
  team: string
  crest: string | null
}
