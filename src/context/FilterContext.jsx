import { createContext, useState, useEffect} from "react";
import axios from 'axios';

export const FilterContext = createContext('')

export const FilterController = ({children}) => {
    
    const [genres,setGenres]= useState([])
    const [platforms, setPlatforms] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [filters, setFilters] = useState({ platform: '', genre: '' });
    
    const API_KEY = import.meta.env.VITE_API_KEY
    
    const fetchGenres = async () =>{

        try{
            const apiCall = await axios.get(`https://game-den-back.onrender.com/api/ext/genres`)
            
            setGenres(apiCall.data)
        } catch (error) {
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const fetchPlatforms = async () =>{

        try{
            const apiCall = await axios.get(`https://game-den-back.onrender.com/api/ext/platforms`)
            setPlatforms(apiCall.data)
            
        } catch (error) {
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGenres()
        fetchPlatforms()
    }, [])

 
    return(
        <FilterContext.Provider value={{genres, platforms, filters, setFilters}}>
            {children}
         </FilterContext.Provider>
     )

}
