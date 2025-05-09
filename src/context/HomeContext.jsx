import { createContext, useState, useEffect} from "react";
import Loader from "../components/Loader/Loader";
import axios from 'axios'; 


export const HomeContext = createContext('')

export const HomeController = ({children}) => {
    
    const [popular, setPopular] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const API_KEY = import.meta.env.VITE_API_KEY

    const fetchPopular = async () => {
    
        try{
            setIsLoading(true)
            const apiCall = await axios.get(`https://game-den-back.onrender.com/api/ext/popular`)
            const popularGames = apiCall.data
            setPopular(popularGames)
        } catch (err) {
            setError(err)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    
    useEffect(()=>{
        fetchPopular()
    }, [])


    return(
        <HomeContext.Provider value={[popular, setPopular, fetchPopular]}>
            {isLoading ? ( <Loader />) : (children)}
         </HomeContext.Provider>
     )

}

