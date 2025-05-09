import './Loader.scss'
import {Puff} from 'react-loader-spinner'

const Loader = () => {

    return(
        <div className="loader">
            <div className="symbol">
                <div className="symbol__triangle"></div>
            </div>
            <div className="symbol">
                <div className="symbol__circle"></div>
            </div>
            <div className="symbol">
                <div className="symbol__cross"></div>
            </div>
            <div className="symbol">
                <div className="symbol__square"></div>
            </div>
        </div>
    )
}

export default Loader

