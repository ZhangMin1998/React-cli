import React, { lazy, Suspense } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import About from './pages/About'
const Home = lazy(() => import(/* webpackChunkName: 'home' */'./pages/Home'))
const About = lazy(() => import(/* webpackChunkName: 'about' */'./pages/About'))



function App() {
  return (
    <>
      <h1>React cli</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App