import {Component} from 'react'

import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import Header from '../Header'

import './index.css'

const diffStates = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Upcoming extends Component {
  state = {popularMovies: [], apiStatus: diffStates.initial}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: diffStates.inProgress})
    const apiKey = '6a1144345a77a76c325e17adc2407921'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    const fetchedData = data.results.map(eachItem => ({
      id: eachItem.id,
      posterPath: eachItem.poster_path,
      title: eachItem.title,
      voteAverage: eachItem.vote_average,
    }))

    this.setState({popularMovies: fetchedData, apiStatus: diffStates.success})
  }

  renderSuccessView = () => {
    const {popularMovies} = this.state
    return (
      <>
        <ul className="unorderedMovieList">
          {popularMovies.map(eachItem => (
            <MovieCard key={eachItem.id} popularMovies={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSwitchViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {popularMovies} = this.state
    console.log(popularMovies)
    return (
      <>
        <Header />
        {this.renderSwitchViews()}
      </>
    )
  }
}

export default Upcoming
