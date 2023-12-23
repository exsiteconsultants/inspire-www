import jsdom from 'jsdom'
import { getDB } from '@/app/db/db'
import { NewGame, NewTeam } from '@/app/db/types'

const { JSDOM } = jsdom

interface ParsedGame {
  date: Date
  game_number: number
  home_team_name: string
  home_team_score: number | null
  away_team_name: string
  away_team_score: number | null
}

const addTeamAndGroup =
  ({ group_id, id, name }: { group_id: number; name: string; id: number }) =>
  async (game: ParsedGame): Promise<NewGame> => {
    let home_team_id: number
    let away_team_id: number

    if (game.home_team_name === name) {
      home_team_id = id
    } else {
      home_team_id = await getTeamId({
        group_id,
        teamName: game.home_team_name,
      })
    }

    if (game.away_team_name === name) {
      away_team_id = id
    } else {
      away_team_id = await getTeamId({
        group_id,
        teamName: game.away_team_name,
      })
    }

    return {
      ...game,
      group_id,
      location: null,
      home_team_id,
      away_team_id,
    }
  }

async function getTeamId({
  group_id,
  teamName,
}: {
  group_id: number
  teamName: string
}) {
  const db = getDB()

  const team = await db
    .selectFrom('team')
    .select(['team.id'])
    .where((eb) =>
      eb.and([
        eb('team.name', '=', teamName),
        eb('team.group_id', '=', group_id),
      ])
    )
    .executeTakeFirst()

  // If there is a match, return that team's id
  if (team) {
    return team.id
  }

  // If there is no match then create a new team
  const newTeam: NewTeam = {
    name: teamName,
    group_id,
  }

  const insertedTeam = await db
    .insertInto('team')
    .values(newTeam)
    .returning(['id'])
    .executeTakeFirstOrThrow()

  return insertedTeam.id
}

async function getTeamPage(age: string) {
  const ageStr = age.substring(1, 3).toLocaleLowerCase()
  const url = `https://www.hampshirefa.com/county-cups/cups/2023-2024/girls-under-${ageStr}s-cup/fixtures`
  const response = await fetch(url)
  const html = await response.text()
  return html
}

function parseDate(dateElements: NodeListOf<Element>) {
  const date = dateElements[0]?.textContent?.trim() || ''
  const time = dateElements[1]?.textContent?.trim() || ''

  // parse the date (dd/mm/yy) and time (hh:mm) into a Date object
  const dateParts = date.split('/')
  const timeParts = time.split(':')
  const year = parseInt(dateParts[2], 10) + 2000
  const month = parseInt(dateParts[1], 10) - 1
  const day = parseInt(dateParts[0], 10)
  const hour = parseInt(timeParts[0], 10)
  const minute = parseInt(timeParts[1], 10)
  const dateObj = new Date(year, month, day, hour, minute)

  return dateObj
}

function parseGameElement(gameElement: Element): ParsedGame {
  const home_team_name =
    gameElement
      .querySelector('.cfa-match-accordion__team--home')
      ?.textContent?.trim() || ''

  const away_team_name =
    gameElement
      .querySelector('.cfa-match-accordion__team--away')
      ?.textContent?.trim() || ''

  const dateElements = gameElement.querySelectorAll(
    '.cfa-match-accordion__date span'
  )
  const dateObj = parseDate(dateElements)

  const game_number = parseInt(
    gameElement
      .querySelector('.cfa-match-accordion__fixture-number')
      ?.textContent?.trim() || '',
    10
  )

  const results = gameElement
    .querySelector('.cfa-match-accordion__box')
    ?.textContent?.trim()

  const home_team_score = results?.includes('-')
    ? parseInt(results?.split('-')[0]?.trim(), 10)
    : null

  const away_team_score = results?.includes('-')
    ? parseInt(results?.split('-')[1]?.trim())
    : null

  const game = {
    date: dateObj,
    game_number,
    home_team_name,
    home_team_score,
    away_team_name,
    away_team_score,
  }

  return game
}

const stripNewGameFields = ({
  game_number,
  date,
  group_id,
  home_team_id,
  home_team_score,
  away_team_id,
  away_team_score,
  location,
}: NewGame): NewGame => ({
  game_number,
  date,
  group_id,
  home_team_id,
  home_team_score,
  away_team_id,
  away_team_score,
  location,
})

export async function parseCupGamesPage({
  age,
  group_id,
  id,
  name,
}: {
  age: string
  group_id: number
  id: number
  name: string
}): Promise<NewGame[]> {
  const html = await getTeamPage(age)
  const dom = new JSDOM(html)
  const document = dom.window.document

  const gameElements = document.querySelectorAll('.cfa-match-accordion__head')

  // Filter all the game elements by those that contain the team name
  const inspireGames = Array.from(gameElements)
    .filter((gameElement) => {
      return (
        gameElement.querySelector('.cfa-match-accordion__team--home') !== null
      )
    })
    .filter((gameElement) => {
      return gameElement.textContent?.trim().includes(name)
    })

  // Parse the games off the page then add associated team ids and group details
  const games = await Promise.all(
    inspireGames
      .map(parseGameElement)
      .map(addTeamAndGroup({ group_id, id, name }))
  )

  return games.map(stripNewGameFields)
}
