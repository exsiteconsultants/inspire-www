import {
  Group,
  GroupTableEntryAndTeam,
  Result,
  SheduledGameRecord,
  SquadAndGroup,
} from '@/app/db/types'

export interface MenuItemData {
  title: string
  url?: string
  submenu?: MenuItemData[]
}

export interface AgeGroupData {
  lastPlayedGame?: Result | null
  group?: Group | null
  groupTableEntries?: GroupTableEntryAndTeam[]
  nextGame?: SheduledGameRecord | null
  squad: SquadAndGroup | null
}
