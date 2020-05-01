// Stacked Area Chart with Stacked Bar Chart
import React, { useState, Fragment } from 'react'
import './App.css'
import StackedBarChart from './components/StackedBarChart'
import StackedAreaChart from './components/StackedAreaChart'


const initialData = [
  {
    year: 1980,
    '🥑': 10,
    '🍌': 20,
    '🍆': 30,
  },
  {
    year: 1990,
    '🥑': 20,
    '🍌': 40,
    '🍆': 60,
  },
  {
    year: 2000,
    '🥑': 30,
    '🍌': 45,
    '🍆': 80,
  },
  {
    year: 2010,
    '🥑': 40,
    '🍌': 60,
    '🍆': 100,
  },
  {
    year: 2020,
    '🥑': 50,
    '🍌': 80,
    '🍆': 120,
  }
]

const allKeys = ['🥑','🍌','🍆']

const colors = {
  '🥑': 'green',
  '🍌': 'orange',
  '🍆': 'purple',
}


function App() {
  
  const [keys, setKeys] = useState(allKeys)
  const [data, setData] = useState(initialData)

  return (
    <Fragment>
      <h2>Stacked Bar Chart With D3</h2>
      <StackedAreaChart data={data} keys={keys} colors={colors} />
      <StackedBarChart data={data} keys={keys} colors={colors} />

      <div className='fields'>
        {allKeys.map(key => (
          <div key={key} className='field'>
            <input
              id={key}
              type='checkbox'
              checked={keys.includes(key)}
              onChange={ event => {
                if (event.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])))
                } else {
                  setKeys(keys.filter(_key => _key !== key))
                }
              }}
            />
            <label for={key} style={{ color: colors[key]}}>
              {key}
            </label>
          </div>
        ))}
      </div>
      
      <button
        onClick={() =>
          setData([
            ...data,
            {
              year: Math.max(...data.map(d => d.year)) + 10,
              '🥑': Math.round(Math.random() * 100),
              '🍌': Math.round(Math.random() * 125),
              '🍆': Math.round(Math.random() * 150)
            }
          ])
        }
      >
        Add Data
      </button>
    </Fragment>
  )
}

export default App







// // Circles, InteractiveBarChart, AnimatedBarChart, Line, LineWithAxes, ResponsiveBarChart

// import React, {  useState, Fragment, useRef, useEffect } from 'react'
// import './App.css'

// import Circles from './components/Circles'
// import Line from './components/Line'
// import LineWithAxes from './components/LineWithAxes'
// import AnimatedBarChart from './components/AnimatedBarChart'
// import InteractiveBarChart from './components/InteractiveBarChart'
// import ResponsiveBarChart from './components/ResponsiveBarChart'

// function App() {

//   const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75])
 
//   return (
//     <Fragment>
//       {/* <Circles data={data} /> */}
//       {/* <Line data={data} /> */}
//       {/* <LineWithAxes data={data} /> */}
//       {/* <AnimatedBarChart data={data} /> */}
//       {/* <InteractiveBarChart data={data} /> */}
//       {/* <ResponsiveBarChart data={data}/> */}
//       <br/>
//       <br/>
//       <button onClick={() => setData(data.map(value => value +5))}>
//         Update Data
//       </button>
//       <button onClick={() => setData(data.filter(value=> value < 35))}>
//         Filter Data
//       </button>
//       <button onClick={() => setData([...data, Math.floor(Math.random() * 100)])}>
//         Add Data
//       </button> 
//       {/* Math.Random generates a random number between 0 and 1 e.g 0.4356475, if you want to generate a number between 0 and 100 have to times by 100. If you dont want the decimal places and want a whole number, pass it into math.floor(), this ronuds down to nearest whole numb*/}
     
//     </Fragment>
//   )
// }

// export default App











// // Gauge chart

// import React, {  useState, Fragment, useRef, useEffect } from 'react'
// import './App.css'
// import ml5 from 'ml5'
// import useInterval from './components/useInterval'


// import GaugeChart from './components/GaugeChart'


// let classifier 

// function App() {

//   // const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75])
//   const [gaugeData, setGaugeData] = useState([0.5, 0.5]) // Confidence initialised to 50% for both there and not there
//   const [shouldClassify, setShouldClassify] = useState(false)
//   const videoRef = useRef()

//   useEffect(() => {
//     classifier = ml5.imageClassifier('./my-model/model.json', () => {
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: false })
//         .then(stream => {
//           videoRef.current.srcObject = stream
//           videoRef.current.play()
//         })
//     })
//   }, [])

//   useInterval(() => {
//     if (classifier && shouldClassify) {
//       classifier.classify(videoRef.current, (error, results) => {
//         if (error) {
//           console.log(error)
//           return
//         }
//         results.sort((a, b) => b.label.localeCompare(a.label))
//         setGaugeData(results.map(entry => entry.confidence))
//       })
//     }
//   }, 500)
 
//   return (
//     <Fragment>
//       <h1>Is Mana there?
//         <br/>
//           <small>
//             [{gaugeData[0].toFixed(2)}, {gaugeData[1].toFixed(2)}] 
//             {/* .toFixed() can be used to format a number with a specific number of digits to the right of the decimal. */}
//           </small>
//       </h1>
//       <GaugeChart data={gaugeData}/>
//       <button onClick={() => setShouldClassify(!shouldClassify)}>
//       {shouldClassify ? 'stop classifying' : 'start classifying'}
//       </button>
//       <video
//         ref={videoRef}
//         style={{ transform: 'scale(-1, 1)' }}
//         width='300'
//         height='150'
//       />
      
//     </Fragment>
//   )
// }

// export default App











// // Timeline 

// import React, {  useState, Fragment, useEffect } from 'react'
// import './App.css'
// import Timeline from './components/Timeline'


// function App() {

//   const [bbCharacterData, setBbCharacterData] = useState([])
//   const [bbEpisodeData, setBbEpisodeData] = useState([])
//   const [highlight, setHighlight] = useState()
 
 
  
//   useEffect(() => {
//     const getBbCharacterData = async () => {
//         try {
//           const response = await fetch( 'https://www.breakingbadapi.com/api/characters?category=Breaking+Bad')
//           const characters = await response.json()
  
//           console.warn(characters)
//           setBbCharacterData(characters)

//         } catch (error) {
//           console.log(error)
//         }
//     }

//     getBbCharacterData()

//   }, [])

//   useEffect(() => {
//     fetch('https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad')
//       .then(response => response.ok && response.json())
//       .then(episodes => {
//         console.warn(episodes)
//         setBbEpisodeData(episodes)
//       })
//       .catch(console.error) // This is short hand for:
//       // .catch(error => {
//       //   console.log(error)
//       // })
//   }, [])


  
//   return (
//     <Fragment>
//       <h1>Breaking Bad Timeline</h1>
//       <Timeline data={bbEpisodeData} highlight={highlight}/>

//       <h2>Select your character</h2>
//       <select
//         value={highlight}
//         onChange={event => setHighlight(event.target.value)}
//         >
//         <option>Select character</option>
//         {bbCharacterData.map(character => (
//           <option key={character.name}>{character.name}</option>
//         ))}
//       </select>
      
//     </Fragment>
//   )
// }

// export default App











// // Racing Bar Char:

// import React, {  useState, Fragment, useRef, useEffect } from 'react'
// import './App.css'
// import RacingBarChart from './components/RacingBarChart'
// import useInterval from './components/useInterval'


// function App() {

//   const [iteration, setIteration] = useState(0)
//   const [start, setStart] = useState(false)
//   const [data, setData] = useState([
//     {
//       name: "alpha",
//       value: 10,
//       color: '#f4efd3'
//     },
//     {
//       name: 'beta',
//       value: 15,
//       color: '#cccccc'
//     },
//     {
//       name: 'charlie',
//       value: 20,
//       color: '#c2b0c9'
//     },
//     {
//       name: 'delta',
//       value: 25,
//       color: '#9656a1'
//     },
//     {
//       name: 'echo',
//       value: 30,
//       color: '#fa697c'
//     },
//     {
//       name: 'foxtrot',
//       value: 35,
//       color: '#fcc169'
//     }
//   ])

//   //sort data:
//   data.sort((a, b) => b.value - a.value)

//   const getRandomIndex = array => Math.floor(Math.random() * array.length)

//   useInterval(() => {
//     if (start) {
//       const randomIndex = getRandomIndex(data)
//       setData(
//         data.map((entry, index) => 
//           index === randomIndex
//             ? {
//               ...entry,
//               value: entry.value + 10
//               }
//             : entry
//           )
//       )
//       setIteration(iteration + 1)
//     }
//   }, 500)
  
//   return (
//     <Fragment>
//       <h1>Racing Bar Chart</h1>
//       <RacingBarChart data={data}/>
//       <button onClick={() => setStart(!start)}>
//         {start ? 'Stop the race' : 'Start the race!'}
//       </button>
//       <p>Iteration: {iteration}</p>
//     </Fragment>
//   )
// }

// export default App













// // Tree Chart 

// import React, {  useState, Fragment } from 'react'
// import './App.css'
// import TreeChart from './components/TreeChart'


// function App() {

//   const initialData = {
//     name: 'aziz',
//     children: [
//       {
//         name: 'Fatemeh',
//         children: [
//           {
//             name: 'Mona'
//           },
//           {
//             name: 'Mana'
//           },
//           {
//             name: 'Maryam'
//           }
//         ]
//       },
//       {
//         name: 'Farzaneh'
//       }
//     ]
//   }

//   const [data, setData] = useState(initialData)


//   return (
//     <Fragment>
//       <h1>Animated Tree Chart</h1>
//       <TreeChart data={data} />
//       <button onClick={() => setData(initialData.children[0])}>
//         Update Data 
//       </button>
//     </Fragment>
//   )
// }

// export default App










// // Force Tree Chart and Tree Chart

// import React, {  useState, Fragment } from 'react'
// import './App.css'
// import ForceTreeChart from './components/ForceTreeChart'
// import TreeChart from './components/TreeChart'


// function App() {

//   const initialData = {
//     name: 'aziz',
//     children: [
//       {
//         name: 'Fatemeh',
//         children: [
//           {
//             name: 'Mona'
//           },
//           {
//             name: 'Mana'
//           },
//           {
//             name: 'Maryam'
//           }
//         ]
//       },
//       {
//         name: 'Farzaneh'
//       }
//     ]
//   }

//   const [data, setData] = useState(initialData)


//   return (
//     <Fragment>
//       <h1>🪐D3 Force Layout</h1>
//       <ForceTreeChart data={data} />
//       <h1>Animated Tree Chart</h1>
//       <TreeChart data={data}/>
//       <button onClick={() => setData(initialData.children[0])}>
//         Update Data 
//       </button>
//     </Fragment>
//   )
// }

// export default App









// // Geo Chart

// import React, {  useState, Fragment } from 'react'
// import './App.css'
// import GeoChart from './components/GeoChart'
// import data from './GeoChart.world.geo.json'


// function App() {

//   const [property, setProperty] = useState('pop_est')
//   return (
//     <Fragment>
//       <h2>World Map with d3-geo</h2>
//       <GeoChart data={data} property={property}/>
//       <h2>Select property to highlight</h2>
//       <select
//         value={property}
//         onChange={event => setProperty(event.target.value)}
//       >
//         <option value='pop_est'>Population</option>
//         <option value='name_len'>Name Length</option>
//         <option value='gdp_md_est'>GDP</option>
//       </select>

//     </Fragment>
//   )
// }

// export default App











// // Brush Chart Part 1
// import React, { Fragment, useState } from 'react'
// import './App.css'
// import BrushChart from './components/BrushChart'


// function App() {

//   const [data, setData] = useState([10, 25, 30, 40, 25, 60])
//   const onAddDataClick = () => {
//     setData([...data, Math.round(Math.random() * 100)])
//   }
//   return (
//     <Fragment>
//       <h2>Sub-selections with d3-brush</h2>

//       <BrushChart data={data} />
//       <button onClick={onAddDataClick}>
//         Add Data
//       </button>

//     </Fragment>
//   )
// }

// export default App












// //Brush Chart Part 2 
// import React, { useState, Fragment } from 'react'
// import './App.css'

// import BrushChartPartTwo from './components/BrushChartPartTwo'
// import BrushChartChild from './components/BrushChartChild'


// function App() {

//   const [data, setData] =useState(
//     Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100 ))
//   )

//   const onAddDataClick = () => 
//     setData([...data, Math.round(Math.random() * 100)])
  
//   return (
//     <Fragment>
//       <h2>Visually filtering data with d3-brush</h2>
      
//       <BrushChartPartTwo data={data}>
//         {selection => <BrushChartChild data={data} selection={selection} />} 
//         {/* {(selection) => <h1>Hello {selection.join(', ')}</h1>} */}
//       </BrushChartPartTwo>

//       <button onClick={onAddDataClick}>Add data</button>
//     </Fragment>
//   )
// }

// export default App













// //StackedBarChart

// import React, { useState, Fragment } from 'react'
// import './App.css'
// import StackedBarChart from './components/StackedBarChart'


// const data = [
//   {
//     year: 1980,
//     '🥑': 10,
//     '🍌': 20,
//     '🍆': 30,
//   },
//   {
//     year: 1990,
//     '🥑': 20,
//     '🍌': 40,
//     '🍆': 60,
//   },
//   {
//     year: 2000,
//     '🥑': 30,
//     '🍌': 45,
//     '🍆': 80,
//   },
//   {
//     year: 2010,
//     '🥑': 40,
//     '🍌': 60,
//     '🍆': 100,
//   },
//   {
//     year: 2020,
//     '🥑': 50,
//     '🍌': 80,
//     '🍆': 120,
//   }
// ]

// const allKeys = ['🥑','🍌','🍆']

// const colors = {
//   '🥑': 'green',
//   '🍌': 'orange',
//   '🍆': 'purple',
// }


// function App() {
  
//   const [keys, setKeys] = useState(allKeys)

//   return (
//     <Fragment>
//       <h2>Stacked Bar Chart With D3</h2>
//       <StackedBarChart data={data} keys={keys} colors={colors} />

//       <div className='fields'>
//         {allKeys.map(key => (
//           <div key={key} className='field'>
//             <input
//               id={key}
//               type='checkbox'
//               checked={keys.includes(key)}
//               onChange={ event => {
//                 if (event.target.checked) {
//                   setKeys(Array.from(new Set([...keys, key])))
//                 } else {
//                   setKeys(keys.filter(_key => _key !== key))
//                 }
//               }}
//             />
//             <label for={key} style={{ color: colors[key]}}>
//               {key}
//             </label>
//           </div>
//         ))}
//       </div>
//     </Fragment>
//   )
// }

// export default App



