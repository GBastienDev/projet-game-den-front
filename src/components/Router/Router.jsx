import {Routes, Route, useLocation} from 'react-router-dom'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Error from '../Error/Error'
import Login from '../Login/Login'
import Profil from '../Profil/Profil'
import GameDetails from '../GameDetails/GameDetails'
import Favorites from '../Favorites/Favorites'
import SearchResult from '../SearchResult/SearchResult'
import { UserController } from '../../context/UserContext'
import { HomeController } from '../../context/HomeContext'
import { SearchController} from '../../context/SearchContext'
import { FilterController } from '../../context/FilterContext'


function Router() {

    //affichage du header et du footer sur toutes les pages sauf /login et /profil    
    const location = useLocation()

    const pathsWithoutHeader = ['/login', '/profil']
    const isPathWithoutHeader = pathsWithoutHeader.includes(location.pathname)

    return (
            <FilterController>
            <SearchController>
            <HomeController>
            <UserController>
            {!isPathWithoutHeader && <Header />}
            <Routes>
                <Route path="*" element={<Error />} />
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResult />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
            </UserController>
            </HomeController>
            </SearchController>
            </FilterController>
    )
}

export default Router