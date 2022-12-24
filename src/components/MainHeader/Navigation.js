import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <a href="/projekti"><button>Projekti</button></a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <a href="/dodajprojekat"><button>Dodaj Projekat</button></a>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
