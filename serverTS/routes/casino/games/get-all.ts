import Controller from '../../../database/controller'
import Scamino from '../../../lib/types'

var games: Scamino.Game[] = []
export function refreshGameList() {
  Controller.selectSpecificJoinLeft<Scamino.Game>('games', 'provider', 'providerId', 'id', ['games.name', 'games.image', 'provider.name as providerName'])
  .then(data => games = data)
  .catch(() => console.error('Spiele konnten nicht aus der Datenbank geladen werden.'))
}

export function getGames(req: any, res: any) {
  return res.send(games)
}

//alle ... Minuten wird die Spieleliste neu aus der DB geladen
const refreshTimeInMinutes = 10
setInterval(refreshGameList, refreshTimeInMinutes * 60 * 1000)
