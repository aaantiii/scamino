import './style.css'
import { useEffect, useState, useDeferredValue, useMemo } from 'react'
import Axios from 'axios'
import GameListElement from './GameListElement'
import { useNavigate } from 'react-router-dom'
import Input from '../Form/Input'
import components from '../../assets/lang/components.json'

components.gameExplorer.title = components.gameExplorer.title.toUpperCase()

export default function GameExplorer() {
  const [searchQuery, setSearchQuery] = useState(''),
        searchQueryDeferred = useDeferredValue(searchQuery),
        [visibleGames, setVisibleGames] = useState(),
        [allGames, setAllGames] = useState(),
        navigate = useNavigate()

  // Suchfunktion
  useEffect(() => {
    if (!allGames) return

    if (!searchQueryDeferred)
      return setVisibleGames(allGames)
    
    // strongMatching beginnt mit searchQuery, wird dem Nutzer als erstes angezeigt
    // lessMatching hat searchQuery irgendwo im Namen
    const strongMatchingGames = []
    const lessMatchingGames = []

    allGames.forEach(game => {
      const gameNameLowercase = game.name.toLowerCase()
      const providerNameLowercase = game.providerName.toLowerCase()

      if (!gameNameLowercase.includes(searchQueryDeferred) && !providerNameLowercase.includes(searchQueryDeferred))
        return
      
      if (gameNameLowercase.startsWith(searchQueryDeferred) || providerNameLowercase.startsWith(searchQueryDeferred))
        return strongMatchingGames.push(game)

      lessMatchingGames.push(game)
    })

    setVisibleGames(strongMatchingGames.concat(lessMatchingGames))
  }, [searchQueryDeferred, allGames])

  // Spiele bei Backend anfordern wenn nicht bereits getan
  useEffect(() => {
    if (allGames) return

    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/casino/games`)
    .then(res => {
      setAllGames(res.data)
      setVisibleGames(allGames)
    })
  }, [allGames, setAllGames, setVisibleGames])

  const gameList = useMemo(() => {
    if (!allGames)
      return <h4>{components.gameExplorer.noData}</h4>

    let keyVal = .43507
    return (
      <div key={keyVal++} id="game-list">
        {visibleGames && visibleGames.length > 0
          ? visibleGames.map(game => <GameListElement key={keyVal++} game={game}
                                      onClick={() => navigate(`/play?game=${game.name.toLowerCase().replace(' ', '-')}`)} />)
          : <h4>{components.gameExplorer.noSearchResults}</h4>}
      </div>
    )
  }, [visibleGames, allGames, navigate])

  return (
    <div id="game-explorer">
      <div id="title-row">
        <h2>{components.gameExplorer.title}</h2>
        <Input key="searchGamesInput" type="search" placeholder="Suchen" onChange={e => setSearchQuery(e.target.value.trim().toLowerCase())} />
      </div>
      {gameList}
    </div>
  )
}
