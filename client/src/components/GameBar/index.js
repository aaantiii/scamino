import './style.css'

export default function GameBar(props) {
  return (
    <div id="game-bar">
      <h2>{props.game.name}</h2>
      <a href="/#"><i className="fa-solid fa-xmark"></i></a>
    </div>
  )
}
