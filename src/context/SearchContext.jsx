import { createContext, useState, useEffect} from "react";
import Loader from "../components/Loader/Loader";
import axios from 'axios'; 

export const SearchContext = createContext()

export const SearchController = ({children}) => {

    const [search, setSearch] = useState('')
    const [fetchResult, setFetchResult] = useState([{}])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const API_KEY = import.meta.env.VITE_API_KEY

    const fetchSearch = async (search) => {
        try{
            setIsLoading(true)
            const apiCall = await axios.get(`https://game-den-back.onrender.com/api/ext/search?search=${search}`)
            
            const sortedResults = apiCall.data.sort((a, b) => {
                const releaseDateA = (a.first_release_date)|| 0;
                const releaseDateB = (b.first_release_date)|| 0;
                return releaseDateB - releaseDateA;
                
            });
            setFetchResult(apiCall.data);
        } 
        catch (error){
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
    }


    useEffect(() =>{
        fetchSearch()
    }, [])

    return(
        <SearchContext.Provider value={[search, setSearch, fetchSearch, isLoading, setIsLoading, fetchResult]}>
            {isLoading ? ( <Loader />) : (children)}
         </SearchContext.Provider>
     )

}