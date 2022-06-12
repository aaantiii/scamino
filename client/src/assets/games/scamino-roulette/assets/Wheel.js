import { useMemo } from 'react'

// Insgesamt 6x15 Zahlen im Rad; Die ersten 4x15 sind nur Platzfüller für die Animation
// dann kommen 15 Zahlen die wirklich als Ergebnis kommen können
// und dann nochmal 15 als Platzfüller hinten
const numbersPerSegment = 15          // 1x Grün, 7x Schwarz & Rot
const placefillerSegmentsBefore = 4   // 4x15 Nummern Platzfüller davor

// 0 = Grün; Gerade Zahlen = Rot; Ungerade Zahlen = Schwarz
export default function Wheel() {
  function NumberElement(props) {
    function getNumberCSSColor(x) {
      return x === 0
        ? 'var(--theme-color)'
        : x % 2 === 0
          ? 'red'
          : 'black'
    }
  
    return (
      <div className="number-element" style={{ background: getNumberCSSColor(props.number) }} rollable={props.rollable}>
        <span>{props.number}</span>
      </div>
    )
  }

  //Erzeuge 6x15 Nummern
  function Numbers() {
    let elements = []
    let keyVal = .23495787

    //Erste 4x15 Platzfüller
    for (let i = 0; i < placefillerSegmentsBefore; i++) {
      for (let j = 0; j < numbersPerSegment; j++) {
        elements.push(<NumberElement number={j} key={keyVal++} />)
      }
    }

    //Ergebnis Zahlen (Attribut "rollable")
    for (let i = 0; i < numbersPerSegment; i++) {
      elements.push(<NumberElement number={i} rollable="true" key={keyVal++} />)
    }

    //Letzte 1x15 Platzfüller
    for (let i = 0; i < numbersPerSegment; i++) {
      elements.push(<NumberElement number={i} key={keyVal++} />)
    }

    return elements
  }

  const numbers = useMemo(() => {
    return <Numbers />
  }, [])

  return (
    <div id="wheel">
      {numbers}
    </div>
  )
}