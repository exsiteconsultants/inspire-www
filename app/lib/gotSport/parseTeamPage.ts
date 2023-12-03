import jsdom from 'jsdom'
import { JPLGame, JPLTeam, JPLTeamInput, JPLLeagueTableEntry } from './types'

const { JSDOM } = jsdom

const gotoSportRoolUrl = 'https://system.gotsport.com'

const leagueTableRowsSelector =
  '#app-main > div:nth-child(1) > section > div > div:nth-child(3) > div > div > div > div:nth-child(6) > div > div.panel.panel-gs-custom > div.panel-body > div > div > div > table > tbody > tr'

export async function getTeamCrestUrl({
  eventID,
  teamID,
}: {
  eventID: number
  teamID: number
}) {
  const logoCSSPath =
    '#app-main > div:nth-child(1) > section > div > div:nth-child(3) > div > div > div > div:nth-child(1) > div > div > div.col-md-2.col-xs-3 > img'

  const teamPage = await getTeamPage({ eventID, teamID })
  const dom = new JSDOM(teamPage)
  const document = dom.window.document
  const logo = document.querySelector(logoCSSPath)
  const crestUrl = logo?.getAttribute('src')

  // figure out the file extension
  // const extension = logoUrl.split('.').pop()

  return crestUrl
}

/**
 * Fetch the team page from the JPL Warrior site and parse it into a HTML Document that can be manipulated
 */
async function getTeamPage({
  eventID,
  teamID,
}: {
  eventID: number
  teamID: number
}) {
  const url = `${gotoSportRoolUrl}/org_event/events/${eventID}/schedules?team=${teamID}`
  const response = await fetch(url)
  const html = await response.text()
  return html
}

/**
 * Parse the team page to get a list of teams in the league from
 * the league table and then go fetch their crest url
 */
async function getTeams({
  document,
  eventID,
  groupID,
}: {
  document: Document
  eventID: number
  groupID: number
}): Promise<JPLTeam[]> {
  //Get the table rows that contain the league table

  const leagueTableRows = document.querySelectorAll(leagueTableRowsSelector)

  const teams = Array.from(leagueTableRows).map((row) => {
    const cells = row.querySelectorAll('td')
    const href = cells[1]?.querySelector('a')?.getAttribute('href') || ''

    const teamID = parseInt(href?.split('=')[1], 10)
    const name =
      cells[1]?.querySelector('a')?.textContent?.replace('\n', '').trim() || ''

    return {
      teamID,
      eventID,
      groupID,
      name,
      crest: '',
    } as JPLTeam
  })

  for (const team of teams) {
    const crest = await getTeamCrestUrl({ eventID, teamID: team.teamID })
    team.crest = `${gotoSportRoolUrl}${crest}`
  }

  return teams
}

/**
 * Parse the team page to get a list of games in the league from
 * the schedule
 */
function parseGames({
  document,
  groupID,
}: {
  document: Document
  teamID: number
  groupID: number
}): JPLGame[] {
  const gamesSectionSelector =
    '#app-main > div:nth-child(1) > section > div > div:nth-child(3) > div > div > div > div:nth-child(6) > div > div.row > div'
  const gameSectionSelector = '.hidden-xs'

  const gamesSection = document.querySelector(gamesSectionSelector)

  if (!gamesSection) {
    return []
  }

  const gameSections = gamesSection.querySelectorAll(gameSectionSelector)

  if (!gameSections || gameSections.length === 0) {
    return []
  }

  const games = Array.from(gameSections).map((section) => {
    const cells = section.querySelectorAll('td')

    const gameNumber = parseInt(cells[0].textContent || '', 10)
    const dateTimeStr = section
      .querySelector('h4')
      ?.textContent?.replace('\n', '')
      .trim()

    const dateTime = new Date(dateTimeStr || '')

    const awayTeamId = parseInt(
      cells[4]?.querySelector('a')?.getAttribute('href')?.split('=').pop() ||
        '',
      10
    )

    const homeTeamId = parseInt(
      cells[2]?.querySelector('a')?.getAttribute('href')?.split('=').pop() ||
        '',
      10
    )

    // Get the content of the score cell and trim the start and end
    const scoreCellContent = cells[3]?.textContent?.replace('\n', '').trim()
    const splitScore = scoreCellContent?.split('-')

    let homeTeamScore: number | undefined
    let awayTeamScore: number | undefined

    if (
      splitScore &&
      splitScore.length === 2 &&
      splitScore[0] !== '' &&
      splitScore[1] !== ''
    ) {
      homeTeamScore = parseInt(splitScore[0].trim(), 10)
      awayTeamScore = parseInt(splitScore[1].trim(), 10)
    }

    let location = cells[5]?.textContent?.replace('\n', '').trim()
    if (location && location.length === 0) {
      location = undefined
    }

    // Instead of storing home and away teams just store the opposition and if the game is home or away
    // this will make it easier to pick the crest and we know who WE are

    const game = {
      gameNumber,
      groupID,
      awayTeamId,
      awayTeamScore,
      dateTime,
      homeTeamId,
      homeTeamScore,
      location,
    }

    return game
  })

  return games
}

/**
 * Parse the team page to get a list of teams in the league from
 * the league table
 */
function parseLeagueTable({
  document,
  groupID,
}: {
  document: Document
  groupID: number
}): JPLLeagueTableEntry[] {
  //Get the table rows that contain the league table
  const leagueTableRows = document.querySelectorAll(leagueTableRowsSelector)

  const results = Array.from(leagueTableRows)
    .filter((row) => {
      const cells = row.querySelectorAll('td')
      return cells !== null && cells.length > 0
    })
    .map((row): JPLLeagueTableEntry => {
      const cells = row.querySelectorAll('td')

      const position = parseInt(cells[0].textContent || '', 10)

      const href = cells[1].querySelector('a')!.getAttribute('href')
      const teamID = parseInt(href!.split('=')[1], 10)
      const played = parseInt(cells[2].textContent || '', 10)
      const won = parseInt(cells[3].textContent || '', 10)
      const lost = parseInt(cells[4].textContent || '', 10)
      const drawn = parseInt(cells[5].textContent || '', 10)
      const goalsFor = parseInt(cells[6].textContent || '', 10)
      const goalsAgainst = parseInt(cells[7].textContent || '', 10)
      const goalDifference = parseInt(cells[8].textContent || '', 10)
      const points = parseInt(cells[9].textContent || '', 10)

      return {
        groupID,
        teamID,
        position,
        played,
        won,
        lost,
        drawn,
        goalsFor,
        goalsAgainst,
        goalDifference,
        points,
      }
    })

  return results
}

/**
 * Parse the team page to get the league table, schedule and teams
 */
export async function parseTeamPage(sourceTeam: JPLTeamInput) {
  const { eventID, groupID, teamID } = sourceTeam

  // Fetch the team page from the JPL Warrior site and parse it into a HTML Document that can be manipulated
  const html = await getTeamPage({ eventID, teamID })
  const dom = new JSDOM(html)
  const document = dom.window.document

  // Extract the league table from the page
  const leagueTable = parseLeagueTable({ document, groupID })

  // Parse all the games in the schedule
  const games = parseGames({ document, teamID, groupID })

  // Get all the teams and their associated Crests URL
  const teams = await getTeams({ document, eventID, groupID })

  return {
    leagueTable,
    games,
    teams,
  }
}

export default parseTeamPage
