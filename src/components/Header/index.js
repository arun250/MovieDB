import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {searchName, onChangeSearchName, onClickSearchButton} = props
  return (
    <>
      <nav className="navSection">
        <div className="linkSection">
          <Link className="navbarLinks" to="/">
            <h1 className="websiteLogo">movieDB</h1>
          </Link>
          <Link className="navbarLinks" to="/">
            <h1>Popular</h1>
          </Link>
          <Link className="navbarLinks" to="/top-rated">
            <h1>Top Rated</h1>
          </Link>
          <Link className="navbarLinks" to="/upcoming">
            <h1>Upcoming</h1>
          </Link>
        </div>
        <div className="searchSection">
          <input
            type="search"
            id="searchBar"
            placeholder="search"
            className="userInput"
            role="searchbox"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <button className="searchButton" onClick={onClickSearchButton}>
            Search
          </button>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Header)
