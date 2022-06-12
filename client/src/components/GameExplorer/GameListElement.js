export default function GameListElement({ game, onClick }) {
  let keyVal = .29643
  return (
    <div className="game-list-element" onClick={onClick}>
      <img key={keyVal++} src={`/img/games/${game.image}`} alt="Spiel Vorschaubild" loading="lazy" />
      <h4 key={keyVal++}>{game.name}</h4>
      <p key={keyVal++}>{game.providerName.toUpperCase()}</p>
    </div>
  )
}

GameListElement.defaultProps = {
  title: 'Fehler beim Laden'
}
