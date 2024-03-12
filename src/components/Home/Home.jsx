import './Home.scss';
import { useContext, useEffect, useState} from 'react';
import { HomeContext } from '../../context/HomeContext';
import {FilterContext} from '../../context/FilterContext';
import {UserContext} from '../../context/UserContext';
import {Link} from  'react-router-dom';
import Loader from '../Loader/Loader';
import Filter from '../Filter/Filter';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY

const Home = () => {
    const [popular] = useContext(HomeContext);
    const {filters} = useContext(FilterContext);
    const {value1, value2, value4, value7} = useContext(UserContext);
    const [details] = value1;
    const [getProfil] = value2;
    const [isAuthenticated, setIsAuthenticated] = value4;
    const [recoGames, setRecoGames] = value7;
    const [isLoading, setIsLoading] = useState(true);
    const [displayedPlatforms, setDisplayedPlatforms] = useState({});

    const recommendations = async () => {

        if(isAuthenticated){
           
                const GenreID = details.genres.map(id => id.GenreID);
                const userGenre = GenreID.join(',');
                const PlatformID = details.platforms.map(id => id.PlatformID);
                const userPlatform = PlatformID.join(',');
                const genreAndPlatformMatch = await axios.get(`https://game-den-back.onrender.com/api/ext/recommendations?genres=${userGenre}&platforms=${userPlatform}`);
                const reco = genreAndPlatformMatch.data;
                setIsLoading(false);
                setRecoGames(reco);
        }

    };

    useEffect(() => {
       recommendations();
    }, [isAuthenticated, details.genres, details.platforms]); 

     const filteredGames = popular && popular.filter((game) => {
        return (
            (!filters.platform || game.platforms.some((platform) => platform.name === filters.platform)) &&
            (!filters.genre || game.genres.some((genre) => genre.name === filters.genre))
        );
    });
    
    const gamesToDisplay = filters.platform || filters.genre ? filteredGames : popular;
   
     //affichage des recommandations - si utilisateur connecté
    return (
        <div className="home__container">
            
            {isAuthenticated ? (
                isLoading ? (
                    <Loader />
               ) :
               recoGames.length > 0 ? (
                <>
                    <h1 className="home__title">Recommendations</h1>
                    <div className="home__list">

                            {recoGames.map((game) => {
                                const displayedPlatformsInGame = [];
                                return (
                                    <div key={game.id} className="card">
                                        <Link className="card__img-container" to={`/game/${game.id}`}>
                                            <img className="card__img" src={game.cover} alt={game.name} />
                                        </Link>
                                        <div className="card__list-platforms">
                                                {game.platforms.map((platform, index) => {
                                                const platformFamily = platform.logo.split('.')[0];
                                                if (!displayedPlatformsInGame.includes(platformFamily)) {
                                                    displayedPlatformsInGame.push(platformFamily);
                                                    return (
                                                        <img key={`${game.id}-${platform.id}`} className="card__platforms" src={`/logo/${platform.logo}`} alt={platform.name} />
                                                    );
                                                } else {
                                                    return null;
                                                }
                                            })}
                                        </div>
                                        <h2 className="card__title">{game.name}</h2>
                                    </div>
                                );
                            })}
                        </div>
                    </>

                ) : (
                    <p className="error">No recommended games yet. Complete your profile !</p>
                )
            ) : (
                <>
                <Filter />
                    <h1 className="home__title">Popular games in 2023</h1>
                    <div className="home__list">

                        {gamesToDisplay && gamesToDisplay.map((game) => {
                            const displayedPlatformsInGame = [];
                            return (
                                <div key={game.id} className="card">
                                    <Link className="card__img-container" to={`/game/${game.id}`}>
                                        <img className="card__img" src={game.cover} alt={game.name} />
                                    </Link>
                                    <div className="card__list-platforms">
                                        {game.platforms.map((platform, index) => {
                                            const platformFamily = platform.logo.split('.')[0];
                                            if (!displayedPlatformsInGame.includes(platformFamily)) {
                                                displayedPlatformsInGame.push(platformFamily);
                                                return (
                                                    <img key={`${game.id}-${platform.id}`} className="card__platforms" src={`/logo/${platform.logo}`} alt={platform.name} />
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                    <h2 className="card__title">{game.name}</h2>

                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
            };

export default Home;