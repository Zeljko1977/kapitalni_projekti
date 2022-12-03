import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Projekti from './components/Home/projekti';

function App() {

  const [mojiProjekti, setMojiProjekti] = useState([])
  
  const addProjectHandler = (noviNaziv, noviBudzet, noviCilj, noviOpis) => {
    setMojiProjekti((prevMojiProjekti)=>{
      return [...prevMojiProjekti, {naziv: noviNaziv, budzet: noviBudzet, cilj: noviCilj, opis: noviOpis }]
    })
  }

  //Matijin komentar
  //Savin komentar

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect( () => {
    async function fetchData() {
      const response = await fetch('https://undo-d00b3-default-rtdb.europe-west1.firebasedatabase.app/projekti.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      if (data) {
        const arr = Object.keys(data).map(item=>{
          return {naziv:data[item].enteredNaziv, budzet: data[item].enteredBudzet, cilj: data[item].enteredCilj, opis: data[item].enteredOpis, key: item
           }
        })
        console.log(arr)
        setMojiProjekti(arr)
      }
      
    }
    fetchData();
    
    

    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home dodajProjekat={addProjectHandler} onLogout={logoutHandler}/>}
        {isLoggedIn && <Projekti projekti={mojiProjekti} onLogout={logoutHandler}/>}
      </main>
    </>
  );
}



export default App;
