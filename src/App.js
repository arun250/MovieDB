import {Switch, Route} from 'react-router-dom'

import './App.css'

import Home from './components/Home'

import TopratedMovies from './components/TopratedMovies'

import Upcoming from './components/Upcoming'

import SingleMovieDetail from './components/SingleMovieDetail'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/top-rated" component={TopratedMovies} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie/:id" component={SingleMovieDetail} />
    </Switch>
  </>
)

export default App
