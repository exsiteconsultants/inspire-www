import { League, LeagueTableEntryAndTeam, Result, SheduledGameRecord, TeamAndGroup } from "@/app/db/types"

export interface MenuItemData {
  title: string
  url?: string
  submenu?: MenuItemData[]
}

export interface AgeGroupData {
  lastPlayedGame?: Result | null
  league?: League | null
  leagueTableEntries?: LeagueTableEntryAndTeam[]
  nextGame?: SheduledGameRecord | null
  team: TeamAndGroup | null
}
