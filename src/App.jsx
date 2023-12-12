import { useState, Component } from 'react'
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"


import { getDrawings } from './services/openAIService'

import './App.css'

function App() {
  const [ line1, setLine1 ] = useState('')
  const [ line2, setLine2 ] = useState('')
  const [ line3, setLine3 ] = useState('')
  const [ drawings, setDrawings ] = useState([])
  const [ loader, setLoader ] = useState(false)
  const [ reset, setReset ] = useState(false)

  const payload = [ line1, line2, line3 ]

  const handleChange = (e, func) => {
    func(e.target.value)
  }

  const handleClick = async() => {
    setLoader(true)
    const result = await getDrawings(payload)
    const urls = result.map(item => item[0].url)
    setLoader(false)
    setDrawings(urls)
  }

  const displayImages = () => {
    return drawings.map((drawing, idx) => {
      return (
        <div key={idx} className='drawing'>
          <img src={ drawing } className='picture'/>
          <p className="legend"> { payload[idx] } </p>
        </div>
      );
    })
  }

  const resetApp = () => {
    setReset(!reset)
  }

  return (
    <>
      {drawings.length === 0 ? (
        <>
          <h1>Story Generator</h1>
          <h2>Create your own story in 3 parts</h2>
          <section className="line-1">
            <h3>Line 1:</h3>
            <input type="text" onChange={(e) => handleChange(e, setLine1)} />
          </section>
          <section className="line-2">
            <h3>Line 2:</h3>
            <input type="text" onChange={(e) => handleChange(e, setLine2)} />
          </section>
          <section className="line-3">
            <h3>Line 3:</h3>
            <input type="text" onChange={(e) => handleChange(e, setLine3)} />
          </section>
          <button onClick={handleClick}>Submit</button>
          {loader && 
            <h1>
              Loading...
            </h1>
          }
        </>
      ) : (
        <>
          <Carousel>
            { displayImages() }
          </Carousel>
          <button onClick={resetApp}>Again</button>
        </>
      )}
    </>
  );
}

export default App
