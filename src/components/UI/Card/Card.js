import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div>
      {" "}
      <li className={classes.item}>
      <div className={`${props.className}`}>
        {props.children}
      </div>
      </li>
    </div>
  );
};

export default Card;
