import './index.css'

const CastDetails = props => {
  const {castDetails} = props
  const {name, originalName, character, popularity, profilePath} = castDetails
  const imageUrl = `https://image.tmdb.org/t/p/w500/${profilePath}`
  return (
    <>
      <li className="movieDetailContainer">
        <img src={imageUrl} alt={name} className="moviePoster" />
        <div className="textContainer">
          <p className="movieName">{name}</p>
          <p className="movieName">{originalName}</p>
          <p className="movieName">{character}</p>
          <p className="movieName">{popularity}</p>
        </div>
      </li>
    </>
  )
}

export default CastDetails
