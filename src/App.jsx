import { useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getStory, getDrawings } from './services/openAIService'

import './App.css'

function App() {
  const [ideaGenerated, setIdeaGenerated] = useState(false)
  const [idea, setIdea] = useState('')

  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [line3, setLine3] = useState('')
  const [line4, setLine4] = useState('')
  const [line5, setLine5] = useState('')

  const [drawings, setDrawings] = useState([])
  const [loader, setLoader] = useState(false)

  const payload = [line1, line2, line3, line4, line5]

  const handleGenerateStory = async () => {
    setLoader(true)
    const { story } = await getStory(idea);
    console.log(story);
    [setLine1, setLine2, setLine3, setLine4, setLine5].forEach((setLine, idx) => setLine(story[idx] || ''));

    setLoader(false)
    setIdeaGenerated(true)
  }

  const handleGenerateDrawings = async () => {
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
          <p className="legend"> {payload[idx]} </p>
          <img src={drawing} className='picture' />
        </div>
      );
    })
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <>

      {!ideaGenerated && (
        <>
          <h1>Story Generator</h1>
          <h2>Create your own kid story</h2>
          <section className='section'>
            <input type="text" onChange={(e) => setIdea(e.target.value)} />
          </section>
          <button onClick={handleGenerateStory}>Generate Story</button>

        </>
      )}

      {ideaGenerated && drawings.length === 0 ? (
        <>
          <h1>Story Generator</h1>
          <h2>Edit the story</h2>

          <section className='section'>
            <input type="text" onChange={(e) => setLine1(e.target.value)} value={line1} />
          </section>

          <section>
            <input type="text" onChange={(e) => setLine2(e.target.value)} value={line2} />
          </section>

          <section >
            <input type="text" onChange={(e) => setLine3(e.target.value)} value={line3} />
          </section>

          <section>
            <input type="text" onChange={(e) => setLine4(e.target.value)} value={line4} />
          </section>

          <section >
            <input type="text" onChange={(e) => setLine5(e.target.value)} value={line5} />
          </section>

          <button onClick={handleGenerateDrawings}>Create Drawings</button>

          {loader &&
            <h1>
              Loading...
            </h1>
          }
        </>
      ) : (
        <>
          <p>Story Generator</p>
          <Carousel responsive={responsive}>
            {displayImages()}
          </Carousel>
        </>
      )}
    </>
  );
}

export default App
