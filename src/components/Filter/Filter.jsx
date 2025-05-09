import { FilterContext } from '../../context/FilterContext'
import './Filter.scss'
import {useContext, useState, useEffect} from 'react'

const Filter = () => {
    const { genres, platforms, setFilters } = useContext(FilterContext);
    const [selectedFilters, setSelectedFilters] = useState({ platform: '', genre: '' });

    useEffect(() => {
        const storedFilters = JSON.parse(localStorage.getItem('filters'));
        if (storedFilters) {
            setSelectedFilters(storedFilters);
        }
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [name]: prevFilters[name] === value ? '' : value,
        }));
    };

    useEffect(() => {
        setFilters(selectedFilters);
        localStorage.setItem('filters', JSON.stringify(selectedFilters));
    }, [selectedFilters, setFilters]);

    return (
        <div className="filter">
            <select className="filter__title" name="platform" value={selectedFilters.platform} onChange={handleFilterChange}>
                <option value="">Platform</option>
                {platforms &&
                    platforms.map((platform) => (
                        <option key={platform.id} className="filter__option" value={platform.name}>
                            {platform.name}
                        </option>
                    ))}
            </select>

            <select className="filter__title" name="genre" value={selectedFilters.genre} onChange={handleFilterChange}>
                <option value="">Genre</option>
                {genres &&
                    genres.map((genre) => (
                        <option key={genre.id} className="filter__option" value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default Filter;