import React, {  useState, Fragment, useRef, useEffect } from 'react'
import './App.css'
import ml5 from 'ml5'
import useInterval from './components/useInterval'

import Circles from './components/Circles'
import Line from './components/Line'
import LineWithAxes from './components/LineWithAxes'
import AnimatedBarChart from './components/AnimatedBarChart'
import InteractiveBarChart from './components/InteractiveBarChart'
import ResponsiveBarChart from './components/ResponsiveBarChart'
import GaugeChart from './components/GaugeChart'

let classifier 

function App() {

  // const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75])
  const [gaugeData, setGaugeData] = useState([0.5, 0.5]) // Confidence initialised to 50% for both there and not there
  const [shouldClassify, setShouldClassify] = useState(false)
  const videoRef = useRef()

  useEffect(() => {
    classifier = ml5.imageClassifier('./my-model/model.json', () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        })
    })
  }, [])

  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.log(error)
          return
        }
        results.sort((a, b) => b.label.localeCompare(a.label))
        setGaugeData(results.map(entry => entry.confidence))
      })
    }
  }, 500)
 
  return (
    <Fragment>
      {/* <Circles data={data} /> */}
      {/* <Line data={data} /> */}
      {/* <LineWithAxes data={data} /> */}
      {/* <AnimatedBarChart data={data} /> */}
      {/* <InteractiveBarChart data={data} /> */}
      {/* <ResponsiveBarChart data={data}/> */}
      {/* <br/>
      <br/>
      <button onClick={() => setData(data.map(value => value +5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter(value=> value < 35))}>
        Filter Data
      </button>
      <button onClick={() => setData([...data, Math.floor(Math.random() * 100)])}>
        Add Data
      </button>  */}
      {/* Math.Random generates a random number between 0 and 1 e.g 0.4356475, if you want to generate a number between 0 and 100 have to times by 100. If you dont want the decimal places and want a whole number, pass it into math.floor(), this ronuds down to nearest whole numb*/}
      <h1>Is Mana there?
        <br/>
        <small>
          [{gaugeData[0].toFixed(2)}, {gaugeData[1].toFixed(2)}] 
          {/* .toFixed() can be used to format a number with a specific number of digits to the right of the decimal. */}
        </small>
      </h1>
      <GaugeChart data={gaugeData}/>
      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? 'stop classifying' : 'start classifying'}
      </button>
      <video
        ref={videoRef}
        style={{ transform: 'scale(-1, 1)' }}
        width='300'
        height='150'
      />
    </Fragment>
  )
}

export default App







