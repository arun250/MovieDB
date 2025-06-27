import './index.css'

const SearchedMovies = props => {
  const {searchedMovies} = props
  const {id, title, posterPath, voteAverage} = searchedMovies
  const imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
  return (
    <>
      <li className="movieDetailContainer">
        <img src={imageUrl} alt={title} className="moviePoster" />
        <div className="textContainer">
          <h1 className="movieName">{title}</h1>
          <p className="movieRating">{`${voteAverage.toFixed(1)}/10`}</p>
          <div>
            <button className="viewDetailsButton">View Details</button>
          </div>
        </div>
      </li>
    </>
  )
}

export default SearchedMovies
