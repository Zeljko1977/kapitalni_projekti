import React , {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";


const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://undo-d00b3-default-rtdb.europe-west1.firebasedatabase.app",
  };
  
  const app = initializeApp(firebaseConfig);
  
  const dbRef = ref(getDatabase(app));

const Projekat = () => {
    const [nazivProjekta, setNazivProjekta]= useState('')
    const [budzetProjekta, setBudzetProjekta]= useState('')
    const [ciljProjekta, setCiljProjekta]= useState('')
    const [opisProjekta, setOpisProjekta]=useState('')
    const params = useParams();
    console.log(params.id);
    useEffect(() => {
        const fetchDocById = async () => {
            get(child(dbRef, `projekti/${params.id}`)).then((snapshot) => {
                console.log(snapshot)
                if (snapshot.exists()) {
                  console.log(snapshot.val());
                  setNazivProjekta(snapshot.val().enteredNaziv)
                  setBudzetProjekta(snapshot.val().enteredBudzet)
                  setCiljProjekta(snapshot.val().enteredCilj)
                  setOpisProjekta(snapshot.val().enteredOpis)
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              })
        }
        fetchDocById()
        
      }, [params.id]);

    return (
        <div>
            <h1>Projekat</h1>
            <h1>Naziv projekta:</h1>
            <h2>{nazivProjekta}</h2>
            <h1>Budzet projekta:</h1>
            <h2>{budzetProjekta}</h2>
            <h1>Cilj Projekta</h1>
            <h2>{ciljProjekta}</h2>
            <h1>Opis Projekta</h1>
            <h2>{opisProjekta}</h2>
            <Link to={'/projekti'}>
              <button>Nazad na projekte</button>
              </Link>
        </div>
    )
}

export default Projekat;