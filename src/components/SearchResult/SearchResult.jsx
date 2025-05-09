import './SearchResult.scss'
import { useContext,useState } from 'react'
import {Link} from  'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import {FilterContext} from '../../context/FilterContext'
import Filter from '../Filter/Filter'
import Loader from '../Loader/Loader'

const SearchResult = () => {

    const [search, setSearch, fetchSearch, isLoading, setIsLoading, fetchResult] = useContext(SearchContext)
    const { filters } = useContext(FilterContext);

    const gamesToDisplay = fetchResult;

    return (
        <div className="search__container">
            <Filter />
            <h1 className="search__title">Results</h1>
            <div className="search__list">
                {gamesToDisplay && gamesToDisplay.map((game) => (
                    <>
                        <div key={game.id} className="card">
                            <Link className="card__img-container" to={`/game/${game.id}`}>
                                <img className="card__img" src={game.cover} alt={game.name} />
                            </Link>
                            <div className="card__list-platforms">
                                {game.platforms && game.platforms.map((platform, index) => {
                                    const platformFamily = platform.logo.split('.')[0];
                                    if (index === 0 || !game.platforms.some((p, idx) => idx < index && p.logo.split('.')[0] === platformFamily)) {
                                        return (
                                            <img key={platform.id} className="card__platforms" src={`/logo/${platform.logo}`} alt={platform.name} />
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                            <h2 className="card__title">{game.name}</h2>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default SearchResult