import React, { Fragment, useEffect, useState} from "react";
import { Route, Switch,  Redirect} from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import Projekti from "./components/Home/projekti";
import Projekat from "./components/Home/Projekat";

function App() {
  const [mojiProjekti, setMojiProjekti] = useState([]);

  const addProjectHandler = (noviNaziv, noviBudzet, noviCilj, noviOpis) => {
    setMojiProjekti((prevMojiProjekti) => {
      return [
        ...prevMojiProjekti,
        {
          naziv: noviNaziv,
          budzet: noviBudzet,
          cilj: noviCilj,
          opis: noviOpis,
        },
      ];
    });
  };

  //Matijin komentar
  //Savin komentar

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://undo-d00b3-default-rtdb.europe-west1.firebasedatabase.app/projekti.json"
      );
      if (!response.ok) {
        // throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);
      if (data) {
        const arr = Object.keys(data).map((item) => {
          return {
            naziv: data[item].enteredNaziv,
            budzet: data[item].enteredBudzet,
            cilj: data[item].enteredCilj,
            opis: data[item].enteredOpis,
            key: item,
          };
        });
        console.log(arr);
        setMojiProjekti(arr);
      }
    }
    fetchData();

    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />

      <Switch>
        {!isLoggedIn && (
          <Route path="/login">
            <Login onLogin={loginHandler} />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/dodajprojekat">
            {" "}
            <Home dodajProjekat={addProjectHandler} onLogout={logoutHandler} />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/projekti" exact>
            <Projekti projekti={mojiProjekti} onLogout={logoutHandler} />
          </Route>
        )}
        <Route path='/' exact>
        <Redirect to='/login' />
      </Route>

      <Route path='/projekti/:id' exact>
            <Projekat />
          </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
