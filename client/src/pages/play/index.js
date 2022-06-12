import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { games } from '../../assets/games'
import GameBar from '../../components/GameBar'
import './style.css'

export default function Play() {
  const [game, setGame] = useState(),
        [searchParams] = useSearchParams(),
        navigate = useNavigate()

  window.scrollTo(0, 0)
  
  // game Parameter aus URL holen und prüfen ob das Spiel verfügbar ist
  // wenn nicht auf Startseite mit entsprechendem dialog weiterleiten
  useEffect(() => {
    const uniqueGameName = searchParams.get('game')
    if (uniqueGameName && games[uniqueGameName]) {
      setGame(games[uniqueGameName])
    }
    else navigate('/?dialog=game-not-found')
  }, [setGame, searchParams, navigate])

  return (
    <div id="game-container">
      {game && [<GameBar game={game} key="gamebar" />, <game.component key="gameComponent" />]}
    </div>
  )
}

Play.defaultProps = {
  game: {
    name: 'Spielname',
    component: 'null'
  }
}
