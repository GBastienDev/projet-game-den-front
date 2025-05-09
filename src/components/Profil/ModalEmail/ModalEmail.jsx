import './ModalEmail.scss';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import close from '../../../assets/close.svg'

const ModalEmail = ({onClose}) => {
  const {value1} = useContext(UserContext);
  const [details, setDetails] = value1;
  const [error, setError] = useState('');

  const EmailChange = async (e) => {
    e.preventDefault();
    try{
      const newEmail = e.target[0].value;
      await axios.patch(`https://game-den-back.onrender.com/api/users/${details.id}`, {Email : newEmail});
      setDetails((prevDetails) => ({...prevDetails, Email : newEmail}))
      onClose();
    }catch (error) {
      if(error.response && error.response.data){
      setError(error.response.data);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close-button" onClick={onClose}><img className="modal__close-img" src={close} alt="close" /></button>
          <h2 className="modal__title">Change your email</h2>
          <form className="modal__form" action="submit" onSubmit={(e) => {EmailChange(e)}}>
          <input className="modal__input" type="text" placeholder="New email"/>
          <button className="modal__button" >Save</button>
          {error && <p className="modal__error">{error}</p>}
          </form>
      </div>
    </div>
  );
};

export default ModalEmail;
