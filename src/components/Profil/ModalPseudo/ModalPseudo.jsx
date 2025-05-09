import './ModalPseudo.scss';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import close from '../../../assets/close.svg'

const ModalPseudo = ({onClose}) => {
  const {value1} = useContext(UserContext);
  const [details, setDetails] = value1;
  const [error, setError] = useState('');



  const PseudoChange = async (e) => {
    e.preventDefault();
    try{
      const newPseudo = e.target[0].value;
      await axios.patch(`https://game-den-back.onrender.com/api/users/${details.id}`, {Pseudo : newPseudo});
      setDetails((prevDetails) => ({...prevDetails, Pseudo : newPseudo}))
      onClose(); 
    }catch (error) {
      if(error.response && error.response.data){
      setError(error.response.data);
      }
    }
  }



  return (
    
    <div className="modal">
      <div className="modal__content">                      
        <button className="modal__close-button" onClick={onClose}><img className="modal__close-img" src={close} alt="close" /></button>
          <h2 className="modal__title">Change your Pseudo</h2>
          <form className="modal__form" action="submit" onSubmit={(e) => {PseudoChange(e)}}>
          <input className="modal__input" type="text" placeholder="New Pseudo"/>
          <button className="modal__button">Save</button>
          {error && <p className="modal__error">{error}</p>}
          </form>
      </div>
    </div>
  );
}

export default ModalPseudo;