import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <nav className={classes.nav}>
      <ul>
        {props.isLoggedIn && (
          <li>
            <NavLink to="/projekti"><button>Projekti</button></NavLink>
          </li>
        )}
        {props.isLoggedIn && (
          <li>
            <NavLink to="/dodajprojekat"><button>Dodaj Projekat</button></NavLink>
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
