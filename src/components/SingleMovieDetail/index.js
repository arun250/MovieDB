import {Component} from 'react'

import Loader from 'react-loader-spinner'

import MovieDetail from '../MovieDetail'

import CastDetails from '../CastDetails'

import Header from '../Header'

import './index.css'

const diffStates = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class SingleMovieDetail extends Component {
  state = {
    singleMovieDetail: {},
    apiStatus: diffStates.initial,
    castDetails: {},
  }

  componentDidMount() {
    this.getSingleMovieDetail()
  }

  getSingleMovieDetail = async () => {
    this.setState({apiStatus: diffStates.inProgress})
    const apiKey = '6a1144345a77a76c325e17adc2407921'
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      const castApiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      const response = await fetch(apiUrl)
      const castResponse = await fetch(castApiUrl)
      const castData = await castResponse.json()
      console.log(castData)
      const data = await response.json()
      const updatedData = {
        adult: data.adult,
        backdropPath: data.backdrop_path,
        id: data.id,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        overview: data.overview,
        popularity: data.popularity,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        title: data.title,
        video: data.video,
        runtime: data.runtime,
        voteAverage: data.vote_average,
        voteCount: data.vote_count,
        tagline: data.tagline,
        genres: data.genres,
      }

      const updatedCastData = castData.cast.map(eachItem => ({
        castId: eachItem.cast_id,
        name: eachItem.name,
        originalName: eachItem.original_name,
        character: eachItem.character,
        popularity: eachItem.popularity,
        profilePath: eachItem.profile_path,
      }))
      console.log(updatedCastData)
      this.setState({
        singleMovieDetail: updatedData,
        castDetails: updatedCastData,
        apiStatus: diffStates.success,
      })
    } catch (error) {
      this.setState({apiStatus: diffStates.failure})
    }
  }

  renderSuccessView = () => {
    const {singleMovieDetail, castDetails} = this.state
    if (!singleMovieDetail) return null
    console.log(singleMovieDetail)
    if (!castDetails) return null
    console.log(castDetails)
    return (
      <>
        <ul className="unorderedMovieList">
          <MovieDetail singleMovieDetail={singleMovieDetail} />
          {castDetails.map(eachItem => (
            <CastDetails castDetails={eachItem} />
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
    const {singleMovieDetail} = this.state

    if (!singleMovieDetail) return null
    return (
      <>
        <Header />
        {this.renderSwitchViews()}
      </>
    )
  }
}

export default SingleMovieDetail
