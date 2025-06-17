import './index.css'

import {Link} from 'react-router-dom'

const PopularMovies = props => {
  const {popularMovies} = props
  const {id, title, posterPath, voteAverage} = popularMovies
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
    <>
      <Link to={`/movie/${id}`} className="movieLink">
        <li className="movieItemContainer">
          <img src={imageUrl} alt={posterPath} className="moviePoster" />
          <div className="textContainer">
            <p className="movieName">{title}</p>
            <p className="movieRating">{`${voteAverage.toFixed(1)}/10`}</p>
            <div>
              <button className="viewDetailsButton">View Details</button>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default PopularMovies
