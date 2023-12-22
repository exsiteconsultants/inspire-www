import jsdom from 'jsdom'
import { JPLGame, JPLTeam, JPLTeamInput } from './types'

const { JSDOM } = jsdom

const gotoSportRoolUrl = 'https://system.gotsport.com'

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
  games,
  eventID,
  groupID,
}: {
  games: JPLGame[]
  eventID: number
  groupID: number
}): Promise<JPLTeam[]> {
  const teamsHash: Record<number, JPLTeam> = {}

  games.forEach((game) => {
    teamsHash[game.awayTeamId] = {
      teamID: game.awayTeamId,
      eventID: eventID,
      groupID: groupID,
      name: game.awayTeamName,
      crest: '',
    }

    teamsHash[game.homeTeamId] = {
      teamID: game.homeTeamId,
      eventID: eventID,
      groupID: groupID,
      name: game.homeTeamName,
      crest: '',
    }
  })

  // Now turn it into a unique list of teams
  return Object.values(teamsHash)
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
  const gamesSectionSelectorAlt =
    '#app-main > div:nth-child(1) > section > div > div:nth-child(2) > div > div > div > div:nth-child(6) > div > div.row > div'

  const gameSectionSelector = '.hidden-xs'

  let gamesSection = document.querySelector(gamesSectionSelector)

  // Some teams have a bug in the Gosport page so need an alternative selector
  if (!gamesSection) {
    gamesSection = document.querySelector(gamesSectionSelectorAlt)
  }

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

    const awayTeamName = cells[4]?.querySelector('a')?.textContent?.trim() || ''

    const homeTeamId = parseInt(
      cells[2]?.querySelector('a')?.getAttribute('href')?.split('=').pop() ||
        '',
      10
    )

    const homeTeamName = cells[2]?.querySelector('a')?.textContent?.trim() || ''

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
      awayTeamName,
      awayTeamScore,
      dateTime,
      homeTeamId,
      homeTeamName,
      homeTeamScore,
      location,
    }

    return game
  })

  return games.filter(
    (game) =>
      game.awayTeamId !== undefined &&
      game.homeTeamId !== undefined &&
      !Number.isNaN(game.awayTeamId) &&
      !Number.isNaN(game.homeTeamId)
  )
}

/**
 * Parse the team page to get the league table, schedule and teams
 */
export async function parseCupTeamPage(sourceTeam: JPLTeamInput) {
  const { eventID, groupID, teamID } = sourceTeam

  if (teamID === 1840614) {
    console.log('here')
  }

  // Fetch the team page from the JPL Warrior site and parse it into a HTML Document that can be manipulated
  const html = await getTeamPage({ eventID, teamID })
  const dom = new JSDOM(html)
  const document = dom.window.document

  // Parse all the games in the schedule
  const games = parseGames({ document, teamID, groupID })

  // Get all the teams and their associated Crests URL
  const teams = await getTeams({
    games,
    eventID,
    groupID,
  })

  return {
    games,
    teams,
  }
}

export default parseCupTeamPage
