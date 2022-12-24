import React, { useState } from 'react';
import './Home.css';
import Button from '../UI/Button/Button';
import ErrorModal from './ErrorModal';
import Valute from './Valute';


const Input = (props) => {
    const [enteredNaziv, setEnteredNaziv] = useState("");
    const [enteredBudzet, setEnteredBudzet] = useState("");
    const [enteredOpis, setEnteredOpis] = useState("");
    const [enteredCilj, setEnteredCilj] = useState("");
    const [error, setError] = useState();
   

    
    const addProjectHandler = async (event) => {
      event.preventDefault();
      if (enteredNaziv.trim().length === 0 || enteredBudzet.trim().length === 0 || enteredOpis.trim().length === 0 || enteredCilj.trim().length === 0) {
          setError({
              title: 'Invalid input',
              message: 'Unesite validne informacije (non-empty values).'
          });
          return;
      }

      if (+enteredBudzet <1) {
        setError({
            title: 'Invalid Budzet',
            message: 'Stavi normalan budzet (veci od 0)'
        });
        return;
    }
  //
      console.log(enteredNaziv, enteredBudzet, enteredOpis, enteredCilj);
      const response = await fetch('https://undo-d00b3-default-rtdb.europe-west1.firebasedatabase.app/projekti.json', {
      method: 'POST',
      body: JSON.stringify({enteredNaziv, enteredBudzet, enteredOpis, enteredCilj}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
      
      props.dodajProjekat(enteredNaziv, enteredBudzet, enteredCilj, enteredOpis)
      setEnteredNaziv("");
      setEnteredBudzet("");
      setEnteredOpis("");
      setEnteredCilj("");
    };
    const nazivChangeHandler = (event) => {
      setEnteredNaziv(event.target.value);
    };
    const budzetChangeHandler = (event) => {
      setEnteredBudzet(event.target.value);
    };
    const ciljChangeHandler = (event) => {
      setEnteredCilj(event.target.value);
    };
    const opisChangeHandler = (event) => {
      setEnteredOpis(event.target.value); 
    };

    const errorHandler = () => {
      setError(null);
  };
  

  
    return (
      <>
      <h1>Input polja</h1>
<div className='test'>    
  {error && <ErrorModal title={error.title} message={error.message} onDodajProjekat={errorHandler}/>}
<form onSubmit={addProjectHandler}>
  <input type="text" value={enteredNaziv} name="name" className="question" id="nme" onChange={nazivChangeHandler}  autoComplete="off" />
  <label htmlFor="nme"><span>Naziv projekta</span></label>
  <textarea name="message" value={enteredOpis} rows="2" className="question" id="msg" onChange={opisChangeHandler}  autoComplete="off"></textarea>
  <label htmlFor="msg"><span>Opis projekta</span></label>
  

  <input type="number" value={enteredBudzet} name="name" className="question" id="nme" onChange={budzetChangeHandler}  autoComplete="off" />
  <label htmlFor="nme"><span>Budzet</span> <Valute/></label>

  <textarea name="message" value={enteredCilj} rows="2" className="question" id="msg" onChange={ciljChangeHandler}  autoComplete="off"></textarea>
  <label htmlFor="msg"><span>Cilj projekta</span></label>

  <Button className='button , input' type='submit'>Dodajte projekat</Button>
  
  
</form>
</div>
</>
    );
};

export default Input;
