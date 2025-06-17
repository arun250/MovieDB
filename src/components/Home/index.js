import {Component} from 'react'

import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import SearchedMovies from '../SearchedMovies'

import Header from '../Header'

import './index.css'

const diffStates = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Home extends Component {
  state = {
    popularMovies: [],
    apiStatus: diffStates.initial,
    searchName: '',
    searchedMovies: [],
    isSearched: false,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  resetSearch = () => {
    this.setState({
      isSearched: false,
      searchedMovies: [],
      searchName: '',
      apiStatus: diffStates.success,
    })
  }
  componentWillUnmount() {
    this.resetSearch()
  }

  onClickSearchButton = () => {
    const {searchName} = this.state
    if (searchName.trim() !== '') {
      this.getSearchedMovies()
    }
  }

  onChangeSearchName = event => {
    const value = event.target.value
    this.setState({
      searchName: value,
    })
  }

  getSearchedMovies = async () => {
    this.setState({apiStatus: diffStates.inProgress})
    const {searchName} = this.state
    const apiKey = '6a1144345a77a76c325e17adc2407921'
    const searchedApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchName}&page=1`
    const response = await fetch(searchedApiUrl)
    const data = await response.json()

    const fetchedSearchedData = data.results.map(eachItem => ({
      posterPath: eachItem.poster_path,
      title: eachItem.title,
      voteAverage: eachItem.vote_average,
      id: eachItem.id,
    }))
    console.log(fetchedSearchedData)
    this.setState({
      searchedMovies: fetchedSearchedData,
      apiStatus: diffStates.success,
      isSearched: true,
      searchName: '',
    })
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: diffStates.inProgress})

    const apiKey = '6a1144345a77a76c325e17adc2407921'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    const fetchedData = data.results.map(eachItem => ({
      posterPath: eachItem.poster_path,
      title: eachItem.title,
      voteAverage: eachItem.vote_average,
      id: eachItem.id,
    }))
    this.setState({popularMovies: fetchedData, apiStatus: diffStates.success})
  }

  renderSuccessView = () => {
    const {popularMovies, searchedMovies, isSearched} = this.state
    if (!searchedMovies) return null

    console.log(searchedMovies)
    return (
      <>
        <ul className="unorderedMovieList">
          {(isSearched ? searchedMovies : popularMovies).map(eachItem =>
            isSearched ? (
              <SearchedMovies key={eachItem.id} searchedMovies={eachItem} />
            ) : (
              <MovieCard key={eachItem.id} popularMovies={eachItem} />
            ),
          )}
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
    const {popularMovies, searchName} = this.state
    console.log(popularMovies)
    return (
      <>
        <Header
          searchName={searchName}
          onChangeSearchName={this.onChangeSearchName}
          onClickSearchButton={this.onClickSearchButton}
        />
        {this.renderSwitchViews()}
      </>
    )
  }
}

export default Home
