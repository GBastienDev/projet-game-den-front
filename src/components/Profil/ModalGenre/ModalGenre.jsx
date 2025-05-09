import './ModalGenre.scss'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import close from '../../../assets/close.svg';


const ModalGenre = ({onClose}) => {
    const {value1, value8} = useContext(UserContext);
    const [details, setDetails] = value1;
    const [genres, setGenres] = useState([]);
    const [userGenres, setUserGenres] = value8;

    const allGenres = async () => {
        const response = await axios.get(`https://game-den-back.onrender.com/api/genre`);
        const genres = response.data;
        setGenres(genres);
    }
    useEffect(() => {
        allGenres();
    }, []);

    const addGenre = async (e) => {
        const newGenre = e.target.id;
  
        await axios.post(`https://game-den-back.onrender.com/api/users/${details.id}/genre`, {genreId : newGenre});
        savedGenres((prevUserGenres) => [...prevUserGenres, newGenre]);
    }
    
    const removeGenre = async (e) => {
        const newGenre = e.target.id;
        await axios.delete(`https://game-den-back.onrender.com/api/users/${details.id}/genre`, {data: { genreId: newGenre }});
        savedGenres((prevUserGenres) => prevUserGenres.filter((userGenre) => userGenre.id !== newGenre));
    }


    const savedGenres = async () => {
        const response = await axios.get(`https://game-den-back.onrender.com/api/users/${details.id}`);
        const userGenres = response.data.genres;
        setUserGenres(userGenres);
    }
    useEffect(() => {
        savedGenres();
    }, []);

    return(
        <fieldset className="modal-checkbox">
            <button className="modal__close-button" onClick={onClose}><img className="modal__close-img" src={close} alt="close" /></button>
        
            <div className="modal-checkbox__content">
            <h2 className="modal-checkbox__title">Your Genres</h2> 
            {genres.map((genre) => (    
                <div key={genre.id} className="modal-checkbox__input">
                    <input type="checkbox" id={genre.id} name={genre.Name}
                    checked={userGenres.some((userGenre) => userGenre.id === genre.id)}
                    onChange={(e) => {e.target.checked ? addGenre(e):removeGenre(e)}}/>
                    <label htmlFor={genre.Name}>{genre.Name}</label>
                </div>
            ))}
            </div>
        </fieldset>
    )
}


export default ModalGenre;