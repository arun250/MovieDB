const MovieDetail = props => {
  const {singleMovieDetail} = props
  const {
    runtime,
    title,
    voteAverage,
    voteCount,
    tagline,
    genres,
    posterPath,
    overview,
  } = singleMovieDetail
  const imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
  return (
    <>
      <li className="movieDetailContainer">
        <img src={imageUrl} alt={title} className="moviePoster" />
        <div className="textContainer">
          <p className="movieName">{title}</p>
          <p className="movieRating">{`${voteAverage.toFixed(1)}/10`}</p>
          <p className="movieName">{voteCount}</p>
          <p className="movieName">{runtime}</p>
          <p className="movieName">{overview}</p>
          Genres: {genres.map(genre => genre.name).join(', ')}
          <p className="movieName">{tagline}</p>
        </div>
      </li>
    </>
  )
}

export default MovieDetail
