import React from "react";
import Card from '../UI/Card/Card'
import classes from './projekti.module.css';
import DeleteButton from "../UI/Button/Delete";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove } from "firebase/database";


const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://undo-d00b3-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);




const deleteHandler = (key) => {
  console.log(key)
  remove(ref(database, 'projekti/' + key))
  .then(() => {
    // Data saved successfully!
  })
  .catch((error) => {
    
    // The write failed...
  });


}

const Projekti = (props) => {
  return (
    <>
    <h1>Lista Projekata</h1>
    <Card className={classes.projekti}>
    <ul>
      {props.projekti.map((projekt, index) => (
        <li key={index}>
            <div>Naziv projekta: </div>{projekt.naziv}
            <div>Budzet: </div>{projekt.budzet} 
            <div>Opis projekta: </div>{projekt.opis}
            <div>Cilj projekta: </div>{projekt.cilj}
            <button onClick={()=>deleteHandler(projekt.key)}>delete</button>
        </li>
      ))}
    </ul>
    
    </Card>
    </>
  );
};

export default Projekti;
